import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { io } from 'socket.io-client';
import CustomHeader from '../components/CustomHeader';

interface Message {
  _id: string;
  senderPhone: string;
  receiverPhone: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const socket = io('http://10.0.2.2:3000');

const ChatWindow = ({ route }: any) => {
  const { senderPhone, receiverPhone, receiverName } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // ✅ Load existing messages from database
    loadMessages();
    
    // ✅ Connect and join personal room
    socket.emit('join_room', { userPhone: senderPhone });

    // ✅ Listen for incoming messages
    socket.on('receive_message', (msg: any) => {
  const normalized = {
    _id: msg._id,
    senderPhone: msg.sender || msg.senderPhone,
    receiverPhone: msg.receiver || msg.receiverPhone,
    message: msg.text || msg.message,
    timestamp: msg.timestamp,
    isRead: false,
  };

  if (
    (normalized.senderPhone === senderPhone && normalized.receiverPhone === receiverPhone) ||
    (normalized.senderPhone === receiverPhone && normalized.receiverPhone === senderPhone)
  ) {
    setMessages((prev) => [...prev, normalized]);
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }
});

    return () => {
      socket.off('receive_message');
    };
  }, [senderPhone, receiverPhone]);

  // ✅ NEW: Load messages from database
  const loadMessages = async () => {
  try {
    setLoading(true);
    const response = await fetch(
      `http://10.0.2.2:3000/api/messages/conv/${senderPhone}/${receiverPhone}`
    );
    const data = await response.json();

    if (response.ok) {
      // 🔥 Convert backend fields to frontend format
      const normalized = data.map((msg: any) => ({
        _id: msg._id,
        senderPhone: msg.sender,
        receiverPhone: msg.receiver,
        message: msg.text,   // map text -> message
        timestamp: msg.timestamp,
        isRead: false,
      }));

      setMessages(normalized);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: false });
      }, 100);
    } else {
      console.error('Failed to load messages:', data.error);
    }
  } catch (error) {
    console.error('Error loading messages:', error);
  } finally {
    setLoading(false);
  }
};


  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData: Message = {
      _id: Date.now().toString(), // Temporary ID, will be replaced by database ID
      senderPhone,
      receiverPhone,
      message: newMessage.trim(),
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    // ✅ Emit message to server (server will save to database)
    socket.emit('send_message', messageData);

    // ✅ Immediately add to chat UI (optimistic UI)
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setNewMessage('');
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMyMessage = item.senderPhone === senderPhone;

    return (
      <View style={[
        styles.messageContainer,
        isMyMessage ? styles.myMessage : styles.otherMessage
      ]}>
        <Text style={[
          styles.messageText,
          isMyMessage ? styles.myMessageText : styles.otherMessageText
        ]}>
          {item.message}
        </Text>
        <Text style={[
          styles.timeText,
          isMyMessage ? styles.myTimeText : styles.otherTimeText
        ]}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
    );
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <CustomHeader />
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={renderMessage}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        refreshing={loading}
        // onRefresh={loadMessages}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message..."
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f8ff' },
  messagesList: { flex: 1, backgroundColor: '#f5f8ff' },
  messagesContainer: { padding: 16, paddingBottom: 20 },
  messageContainer: { maxWidth: '80%', marginVertical: 4, padding: 12, borderRadius: 16 },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#5B7CFA', borderBottomRightRadius: 4 },
  otherMessage: {
    alignSelf: 'flex-start', backgroundColor: '#fff', borderBottomLeftRadius: 4,
    elevation: 1, shadowColor: '#000', shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 }, shadowRadius: 2,
  },
  messageText: { fontSize: 16, lineHeight: 20, marginBottom: 4 },
  myMessageText: { color: '#fff' },
  otherMessageText: { color: '#333' },
  timeText: { fontSize: 12, opacity: 0.7 },
  myTimeText: { color: '#fff', textAlign: 'right' },
  otherTimeText: { color: '#666', textAlign: 'left' },
  inputContainer: {
    flexDirection: 'row', padding: 16, backgroundColor: '#fff',
    alignItems: 'flex-end', borderTopWidth: 1, borderTopColor: '#e0e0e0', marginBottom: 70,
  },
  textInput: {
    flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 12, marginRight: 12,
    maxHeight: 100, fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#5B7CFA', borderRadius: 20,
    paddingHorizontal: 20, paddingVertical: 12,
    justifyContent: 'center', alignItems: 'center',
  },
  sendButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default ChatWindow;


// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { io } from 'socket.io-client';
// import CustomHeader from '../components/CustomHeader';

// interface Message {
//   _id: string;
//   senderPhone: string;
//   receiverPhone: string;
//   message: string;
//   timestamp: string;
//   isRead: boolean;
// }



// const socket = io('http://10.0.2.2:3000'); // ✅ Use your backend IP

// const ChatWindow = ({ route }: any) => {
//   const { senderPhone, receiverPhone, receiverName } = route.params;
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState('');
//   const flatListRef = useRef<FlatList>(null);


//   useEffect(() => {
//   setMessages([
//     {
//       _id: '1',
//       senderPhone,
//       receiverPhone,
//       message: 'Hello test!',
//       timestamp: new Date().toISOString(),
//       isRead: false,
//     },
//   ]);
// }, []);


//   useEffect(() => {
//     // ✅ Connect and join personal room
//     socket.emit('join_room', { userPhone: senderPhone });

//     // ✅ Listen for incoming messages
//     socket.on('receive_message', (msg: Message) => {
//       setMessages((prevMessages) => [...prevMessages, msg]);
//       setTimeout(() => {
//         flatListRef.current?.scrollToEnd({ animated: true });
//       }, 100);
//     });

//     return () => {
//       socket.off('receive_message');
//     //   socket.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;

//     const messageData: Message = {
//       _id: Date.now().toString(),
//       senderPhone,
//       receiverPhone,
//       message: newMessage.trim(),
//       timestamp: new Date().toISOString(),
//       isRead: false,
//     };

//     // ✅ Emit message to server
//     socket.emit('send_message', messageData);

//     // ✅ Immediately add to chat UI (optimistic UI)
//     setMessages((prevMessages) => [...prevMessages, messageData]);
//     setNewMessage('');
//     setTimeout(() => {
//       flatListRef.current?.scrollToEnd({ animated: true });
//     }, 100);
//   };

  
//   const renderMessage = ({ item }: { item: Message }) => {
    
//     const isMyMessage = item.senderPhone === senderPhone;

//     return (
//       <View style={[
//         styles.messageContainer,
//         isMyMessage ? styles.myMessage : styles.otherMessage
//       ]}>
//         <Text style={[
//           styles.messageText,
//           isMyMessage ? styles.myMessageText : styles.otherMessageText
//         ]}>
//           {item.message}
//         </Text>
//         <Text style={[
//           styles.timeText,
//           isMyMessage ? styles.myTimeText : styles.otherTimeText
//         ]}>
//           {formatTime(item.timestamp)}
//         </Text>
//       </View>
//     );
//   };

//   const formatTime = (timestamp: string) => {
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <CustomHeader />
//       <FlatList
//         ref={flatListRef}
//         data={messages}
//         keyExtractor={(item) => item._id}
//         renderItem={renderMessage}
//         style={styles.messagesList}
//         contentContainerStyle={styles.messagesContainer}
//       />

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.textInput}
//           value={newMessage}
//           onChangeText={setNewMessage}
//           placeholder="Type your message..."
//           multiline
//           maxLength={500}
//         />
//         <TouchableOpacity
//           style={styles.sendButton}
//           onPress={sendMessage}
//         >
//           <Text style={styles.sendButtonText}>Send</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   // Same styles as before
//   container: { flex: 1, backgroundColor: '#f5f8ff' },
//   messagesList: { flex: 1, backgroundColor: '#f5f8ff' },
//   messagesContainer: { padding: 16, paddingBottom: 20 },
//   messageContainer: { maxWidth: '80%', marginVertical: 4, padding: 12, borderRadius: 16 },
//   myMessage: { alignSelf: 'flex-end', backgroundColor: '#5B7CFA', borderBottomRightRadius: 4 },
//   otherMessage: {
//     alignSelf: 'flex-start', backgroundColor: '#fff', borderBottomLeftRadius: 4,
//     elevation: 1, shadowColor: '#000', shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 1 }, shadowRadius: 2,
//   },
//   messageText: { fontSize: 16, lineHeight: 20, marginBottom: 4 },
//   myMessageText: { color: '#fff' },
//   otherMessageText: { color: '#333' },
//   timeText: { fontSize: 12, opacity: 0.7 },
//   myTimeText: { color: '#fff', textAlign: 'right' },
//   otherTimeText: { color: '#666', textAlign: 'left' },
//   inputContainer: {
//     flexDirection: 'row', padding: 16, backgroundColor: '#fff',
//     alignItems: 'flex-end', borderTopWidth: 1, borderTopColor: '#e0e0e0',marginBottom: 70,
//   },
//   textInput: {
//     flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 20,
//     paddingHorizontal: 16, paddingVertical: 12, marginRight: 12,
//     maxHeight: 100, fontSize: 16,
//   },
//   sendButton: {
//     backgroundColor: '#5B7CFA', borderRadius: 20,
//     paddingHorizontal: 20, paddingVertical: 12,
//     justifyContent: 'center', alignItems: 'center',
//   },
//   sendButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
// });

// export default ChatWindow;





