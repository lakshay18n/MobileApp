// src/screens/ChatStackScreen.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './ChatScreen';
import ChatWindow from './ChatWindow';
import{Alert} from 'react-native';

interface ChatStackScreenProps {
  registeredUser: string | null;
}

const Stack = createStackNavigator();



const ChatStackScreen: React.FC<ChatStackScreenProps> = ({ registeredUser }) => {
    

  return (
    
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatList">
        {(props) => (
          <ChatScreen
          {...props}
          route={{
            ...props.route,
            params: {
              senderPhone: registeredUser,
              receiverPhone: null 
            }
          }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Chat" component={ChatWindow} />
    </Stack.Navigator>
  );
};

export default ChatStackScreen;







// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { Alert, Image ,View } from 'react-native';
// import { Text } from 'react-native-gesture-handler';
// import ChatScreen from './ChatScreen';
// import ChatWindow from './ChatWindow';

// const Stack = createStackNavigator();

// const ChatStackScreen = () => (

   
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="ChatList" component={ChatScreen} />
//     <Stack.Screen name="ChatWindow" component={ChatWindow} />
//   </Stack.Navigator>
// );

// export default ChatStackScreen;