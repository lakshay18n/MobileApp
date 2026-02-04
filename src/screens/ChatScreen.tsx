import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { RouteProp, NavigationProp } from '@react-navigation/native';
import io from 'socket.io-client';
import axios from 'axios';

// ✅ Connect to your backend Socket.IO server
const socket = io('http://10.0.2.2:3000');

type Message = {
  _id: string;
  senderPhone: string;
  receiverPhone: string;
  message: string;
  timestamp: string;
  isRead: boolean;
};

type ChatItem = {
  phoneNumber: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isRead: boolean;
};

const ChatScreen = ({ route, navigation }: any) => {
  const senderPhone = route.params?.senderPhone ?? '';
  
  const [chatList, setChatList] = useState<ChatItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  console.log('🔍 route.params:', route.params);

  useEffect(() => {
    if (senderPhone) {
      // ✅ Load chat list from database when component mounts
      loadChatList();
      
      // ✅ Join the sender's room
      socket.emit('join_room', { userPhone: senderPhone });

      // ✅ Listen for real-time messages
      socket.on('receive_message', (message: Message) => {
        console.log('📨 Received message:', message);
        updateChatList(message);
      });
    }

    return () => {
      socket.off('receive_message');
    };
  }, [senderPhone]);

  // ✅ NEW: Load chat list from database
  const loadChatList = async () => {
  try {
    setLoading(true);
    const response = await axios.get(`http://10.0.2.2:3000/api/chat/list/${senderPhone}`);
    
    if (response.data.success) {
  const transformed = response.data.chatUsers.map((chat: any) => ({
    phoneNumber: chat._id,             // map backend `_id` → phoneNumber
    lastMessage: chat.lastMessage,
    timestamp: chat.lastTimestamp,     // map → timestamp
    unreadCount: 0,                    // default until unread counts are stored
    isRead: true
  }));
  setChatList(transformed);
}

    // if (response.data.success) {
    //   setChatList(response.data.chatUsers); // Use chatUsers since that's what your backend returns
    // } else {
    //   console.error('Failed to load chat list:', response.data.message);
    // }
  } catch (error:any) {
    if (error.response) {
      // Server responded with error status
      console.error('Server error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
  } finally {
    setLoading(false);
  }
};

  const updateChatList = (message: Message) => {
    setChatList(prevList => {
      const otherPersonPhone = message.senderPhone === senderPhone 
        ? message.receiverPhone 
        : message.senderPhone;

      const existingChatIndex = prevList.findIndex(
        chat => chat.phoneNumber === otherPersonPhone
      );

      const newChatItem: ChatItem = {
        phoneNumber: otherPersonPhone,
        lastMessage: message.message,
        timestamp: message.timestamp,
        unreadCount: message.senderPhone !== senderPhone ? 1 : 0,
        isRead: message.senderPhone === senderPhone ? true : false
      };

      if (existingChatIndex >= 0) {
        // ✅ Update existing chat
        const updatedList = [...prevList];
        const existingChat = updatedList[existingChatIndex];
        
        updatedList[existingChatIndex] = {
          ...existingChat,
          lastMessage: message.message,
          timestamp: message.timestamp,
          unreadCount: message.senderPhone !== senderPhone 
            ? existingChat.unreadCount + 1 
            : existingChat.unreadCount,
          isRead: message.senderPhone === senderPhone ? true : false
        };

        // ✅ Move to top and sort by timestamp
        updatedList.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        
        return updatedList;
      } else {
        // ✅ Add new chat and sort by timestamp
        const newList = [newChatItem, ...prevList];
        return newList.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      }
    });
  };

  const openChat = async (receiverPhone: string) => {
    // ✅ Mark messages as read in database
    try {
      await fetch('http://10.0.2.2:3000/api/messages/read', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderPhone: senderPhone,
          receiverPhone: receiverPhone
        })
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }

    // ✅ Update local state
    setChatList(prevList => 
      prevList.map(chat => 
        chat.phoneNumber === receiverPhone 
          ? { ...chat, unreadCount: 0, isRead: true }
          : chat
      )
    );

    // ✅ Navigate to ChatWindow
    navigation.navigate('Chat', {
      senderPhone: senderPhone,
      receiverPhone: receiverPhone,
      receiverName: receiverPhone
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity 
      style={[
        styles.chatItem,
        !item.isRead && styles.unreadChatItem
      ]}
      onPress={() => openChat(item.phoneNumber)}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
  {(item.phoneNumber ?? "").toString().slice(-2) || "??"}
  {/* {item.phoneNumber ? item.phoneNumber.slice(-2) : "??"} */}
</Text>

        </View>
      </View>

      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={[
            styles.phoneNumber,
            !item.isRead && styles.unreadText
          ]}>
            {item.phoneNumber}
          </Text>
          <Text style={styles.timestamp}>
            {formatTime(item.timestamp)}
          </Text>
        </View>

        <View style={styles.messageRow}>
          <Text 
            style={[
              styles.lastMessage,
              !item.isRead && styles.unreadText
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>
                {item.unreadCount > 99 ? '99+' : item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredChats = chatList.filter(chat =>
  (chat.phoneNumber ?? '').toLowerCase().includes(searchText.toLowerCase())
);


  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search chats..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Chat List */}
      {/* // keyExtractor={(item) => item.phoneNumber} */}
      <FlatList
        data={filteredChats}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => item.phoneNumber || `chat-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshing={loading}
        onRefresh={loadChatList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No chats yet</Text>
            <Text style={styles.emptySubText}>
              Start a conversation to see chats here
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flex: 1,
    backgroundColor: '#f5f8ff',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  listContainer: {
    flexGrow: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  unreadChatItem: {
    backgroundColor: '#f8f9ff',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#5B7CFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  unreadText: {
    fontWeight: 'bold',
    color: '#333',
  },
  unreadBadge: {
    backgroundColor: '#5B7CFA',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});



// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   TextInput,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Alert
// } from 'react-native';
// import { RouteProp, NavigationProp } from '@react-navigation/native';
// import io from 'socket.io-client';

// // ✅ Connect to your backend Socket.IO server
// const socket = io('http://10.0.2.2:3000');

// type Message = {
//   _id: string;
//   senderPhone: string;
//   receiverPhone: string;
//   message: string;
//   timestamp: string;
//   isRead: boolean;
// };

// type ChatItem = {
//   phoneNumber: string;
//   lastMessage: string;
//   timestamp: string;
//   unreadCount: number;
//   isRead: boolean;
// };

// const ChatScreen = ({ route, navigation }: any) => {
//   const senderPhone = route.params?.senderPhone ?? '';
  
//   const [chatList, setChatList] = useState<ChatItem[]>([]);
//   const [searchText, setSearchText] = useState('');

//   console.log('🔍 route.params:', route.params);

//   useEffect(() => {
//     // ✅ Join the sender's room (room is the sender's phone number)
//     socket.emit('join_room', { userPhone: senderPhone });

//     // ✅ Listen for real-time messages
//     socket.on('receive_message', (message: Message) => {
//       console.log('📨 Received message:', message);
      
//       // ✅ Update chat list with new message
//       updateChatList(message);
//     });

//     return () => {
//       socket.off('receive_message');
//     };
//   }, [senderPhone]);

//   const updateChatList = (message: Message) => {
//     setChatList(prevList => {
//       const otherPersonPhone = message.senderPhone === senderPhone 
//         ? message.receiverPhone 
//         : message.senderPhone;

//       const existingChatIndex = prevList.findIndex(
//         chat => chat.phoneNumber === otherPersonPhone
//       );

//       const newChatItem: ChatItem = {
//         phoneNumber: otherPersonPhone,
//         lastMessage: message.message,
//         timestamp: message.timestamp,
//         unreadCount: message.senderPhone !== senderPhone ? 1 : 0,
//         isRead: message.senderPhone === senderPhone ? true : false
//       };

//       if (existingChatIndex >= 0) {
//         // ✅ Update existing chat
//         const updatedList = [...prevList];
//         const existingChat = updatedList[existingChatIndex];
        
//         updatedList[existingChatIndex] = {
//           ...existingChat,
//           lastMessage: message.message,
//           timestamp: message.timestamp,
//           unreadCount: message.senderPhone !== senderPhone 
//             ? existingChat.unreadCount + 1 
//             : existingChat.unreadCount,
//           isRead: message.senderPhone === senderPhone ? true : false
//         };

//         // ✅ Move to top and sort by timestamp
//         updatedList.sort((a, b) => 
//           new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
//         );
        
//         return updatedList;
//       } else {
//         // ✅ Add new chat and sort by timestamp
//         const newList = [newChatItem, ...prevList];
//         return newList.sort((a, b) => 
//           new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
//         );
//       }
//     });
//   };

//   const openChat = (receiverPhone: string) => {
//     // ✅ Mark as read when opening chat
//     setChatList(prevList => 
//       prevList.map(chat => 
//         chat.phoneNumber === receiverPhone 
//           ? { ...chat, unreadCount: 0, isRead: true }
//           : chat
//       )
//     );

//     // ✅ Navigate to ChatWindow
//     navigation.navigate('Chat', {
//       senderPhone: senderPhone,
//       receiverPhone: receiverPhone,
//       receiverName: receiverPhone // Using phone as name for now
//     });
//   };

//   const formatTime = (timestamp: string) => {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

//     if (diffInHours < 24) {
//       return date.toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true
//       });
//     } else {
//       return date.toLocaleDateString('en-US', {
//         month: 'short',
//         day: 'numeric'
//       });
//     }
//   };

//   const renderChatItem = ({ item }: { item: ChatItem }) => (
//     <TouchableOpacity 
//       style={[
//         styles.chatItem,
//         !item.isRead && styles.unreadChatItem
//       ]}
//       onPress={() => openChat(item.phoneNumber)}
//     >
//       <View style={styles.avatarContainer}>
//         <View style={styles.avatar}>
//           <Text style={styles.avatarText}>
//             {item.phoneNumber.slice(-2)}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.chatInfo}>
//         <View style={styles.chatHeader}>
//           <Text style={[
//             styles.phoneNumber,
//             !item.isRead && styles.unreadText
//           ]}>
//             {item.phoneNumber}
//           </Text>
//           <Text style={styles.timestamp}>
//             {formatTime(item.timestamp)}
//           </Text>
//         </View>

//         <View style={styles.messageRow}>
//           <Text 
//             style={[
//               styles.lastMessage,
//               !item.isRead && styles.unreadText
//             ]}
//             numberOfLines={1}
//           >
//             {item.lastMessage}
//           </Text>
//           {item.unreadCount > 0 && (
//             <View style={styles.unreadBadge}>
//               <Text style={styles.unreadBadgeText}>
//                 {item.unreadCount > 99 ? '99+' : item.unreadCount}
//               </Text>
//             </View>
//           )}
//         </View>
//       </View>
//     </TouchableOpacity>
//   );

//   const filteredChats = chatList.filter(chat =>
//     chat.phoneNumber.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search chats..."
//           value={searchText}
//           onChangeText={setSearchText}
//         />
//       </View>

//       {/* Chat List */}
//       <FlatList
//         data={filteredChats}
//         renderItem={renderChatItem}
//         keyExtractor={(item) => item.phoneNumber}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.listContainer}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>No chats yet</Text>
//             <Text style={styles.emptySubText}>
//               Start a conversation to see chats here
//             </Text>
//           </View>
//         }
//       />
//     </View>
//   );
// };

// export default ChatScreen;

// const styles = StyleSheet.create({
//   container: {
//     marginTop:100,
//     flex: 1,
//     backgroundColor: '#f5f8ff',
//   },
//   searchContainer: {
//     padding: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   searchInput: {
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 20,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     backgroundColor: '#f9f9f9',
//   },
//   listContainer: {
//     flexGrow: 1,
//   },
//   chatItem: {
//     flexDirection: 'row',
//     padding: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   unreadChatItem: {
//     backgroundColor: '#f8f9ff',
//   },
//   avatarContainer: {
//     marginRight: 12,
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: '#5B7CFA',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   avatarText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   chatInfo: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   chatHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   phoneNumber: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   timestamp: {
//     fontSize: 12,
//     color: '#666',
//   },
//   messageRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   lastMessage: {
//     fontSize: 14,
//     color: '#666',
//     flex: 1,
//     marginRight: 8,
//   },
//   unreadText: {
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   unreadBadge: {
//     backgroundColor: '#5B7CFA',
//     borderRadius: 12,
//     minWidth: 24,
//     height: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 6,
//   },
//   unreadBadgeText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 100,
//   },
//   emptyText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//   },
//   emptySubText: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//   },
// });












