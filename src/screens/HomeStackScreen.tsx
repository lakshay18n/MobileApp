// src/screens/HomeStackScreen.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ViewProfile from './ViewProfile';
import ChatWindow from './ChatWindow';

type HomeStackScreenProps = {
  registeredUser: string | null;
};

const Stack = createStackNavigator();

const HomeStackScreen = ({ registeredUser }: HomeStackScreenProps) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ViewProfile">
        {(props) => (
          <ViewProfile
            {...props}
            registeredUser={registeredUser}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ChatWindow" component={ChatWindow} />
    </Stack.Navigator>
  );
};

export default HomeStackScreen;















// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import HomeScreen from './HomeScreen';
// import ViewProfile from './ViewProfile';
// // import ChatScreen from './ChatScreen';


// // type HomeStackScreenProps = {
// //   registeredUser: string | null;
// // };

// const Stack = createStackNavigator();

// const HomeStackScreen = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
//       <Stack.Screen name="ViewProfile" component={ViewProfile}></Stack.Screen>
//     </Stack.Navigator>
//   );
// };

// export default HomeStackScreen;



  