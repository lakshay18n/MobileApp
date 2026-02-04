          // ****TODO****
// 1) Link the number to resource  
// 2) Get all resource associated with the logedin person on account screen 
// 3) Remove the chat button on the resources for the person who had created it 

import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileProvider } from './src/context/ProfileContext';
import { Alert, Image, View } from 'react-native';
import axios from 'axios';

import HomeStackScreen from './src/screens/HomeStackScreen';
import ChatStackScreen from './src/screens/ChatStackScreen';
import Badge from './src/components/Badge';
import AddProfileStackScreen from './src/screens/AddProfileStackScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import AccountScreen from './src/screens/AccountScreen';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Define a type for user
  type User = {
    phone: string;
    password: string;
    firstName: string;
    lastName: string;
    [key: string]: any; // Add other fields as needed
  };


  // Handle signup: save user and login
  const handleSignup = (user: User) => {
    // setRegisteredUser(user);
    // setIsLoggedIn(true);
  };

  // Handle login: check credentials
  const handleLogin = (phone: string) => {
    setRegisteredUser(phone);
    //  Alert.alert(` sign in number ${registeredUser}`)
    setIsLoggedIn(true);
  };

  // Fetch unread message count
  // React.useEffect(() => {
  //   if (registeredUser) {
  //     const fetchUnreadCount = async () => {
  //       try {
  //         const response = await axios.get(`http://10.0.2.2:3000/api/chat/unread/${registeredUser}`);
  //         setUnreadCount(response.data.count || 0);
  //       } catch (error) {
  //         console.error('Error fetching unread count:', error);
  //         setUnreadCount(0);
  //       }
  //     };

  //     fetchUnreadCount();
      
  //     // Update unread count every 10 seconds
  //     const interval = setInterval(fetchUnreadCount, 10000);
  //     return () => clearInterval(interval);
  //   }
  // }, [registeredUser]);

  return (
    <ProfileProvider>
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator
            screenOptions={{
              tabBarShowLabel: false,
              tabBarStyle: {
                backgroundColor: '#5B7CFA',
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                borderBottomRightRadius: 40,
                borderBottomLeftRadius: 40,
                height: 70,
                position: 'absolute',
                left: 10,
                right: 10,
                bottom: 10,
                elevation: 5,
                marginLeft: 6,
                marginRight: 6,
              },
              tabBarActiveTintColor: '#fff',
              tabBarInactiveTintColor: '#d1d1d1',
              headerShown: false,
            }}
          >
            <Tab.Screen
              name="Home"
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <Image
                    source={require('./src/images/Home.png')}
                    style={{
                      width: focused ? 38 : 30,
                      height: focused ? 38 : 30,
                      marginTop: 25,
                      tintColor: color,
                      alignSelf: 'center',
                    }}
                    resizeMode="contain"
                  />
                ),
              }}
            >
              {(props) => (
                <HomeStackScreen
                  {...props}
                  registeredUser={registeredUser}
                />
              )}
            </Tab.Screen>

            <Tab.Screen
              name="Chat"
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <View>
                    <Image
                      source={require('./src/images/Chat.png')}
                      style={{
                        width: focused ? 38 : 30,
                        height: focused ? 38 : 30,
                        marginTop: 25,
                        tintColor: focused ? '#fff' : '#d1d1d1',
                        alignSelf: 'center',
                      }}
                      resizeMode="contain"
                    />
                    <Badge count={unreadCount} />
                  </View>
                ),
              }}
            >
              {(props) => (
                <ChatStackScreen
                  {...props}
                  registeredUser={registeredUser}
                />
              )}
            </Tab.Screen>

            <Tab.Screen
              name="Plus"
              // component={AddProfileStackScreen}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <Image
                    source={require('./src/images/Plus.png')}
                    style={{
                      width: focused ? 38 : 30,
                      height: focused ? 38 : 30,
                      marginTop: 25,
                      tintColor: focused ? '#fff' : '#d1d1d1',
                    }}
                    resizeMode="contain"
                  />
                ),
              }}
            >
               {(props) => (
                <AddProfileStackScreen
                  {...props}
                  registeredUser={registeredUser}
                />
              )}
            </Tab.Screen>
            <Tab.Screen
              name="Details"
              component={DetailsScreen}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <Image
                    source={require('./src/images/Details.png')}
                    style={{
                      width: focused ? 38 : 30,
                      height: focused ? 38 : 30,
                      marginTop: 25,
                      tintColor: focused ? '#fff' : '#d1d1d1',
                    }}
                    resizeMode="contain"
                  />
                ),
              }}
            />

            <Tab.Screen
              name="Account"
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <Image
                    source={require('./src/images/Account.png')}
                    style={{
                      width: focused ? 38 : 30,
                      height: focused ? 38 : 30,
                      marginTop: 25,
                      tintColor: focused ? '#fff' : '#d1d1d1',
                    }}
                    resizeMode="contain"
                  />
                ),
              }}
            >
              {(props) =>
                registeredUser ? (
                  <AccountScreen
                    {...props}
                    user={registeredUser}
                    onLogout={() => setIsLoggedIn(false)}
                  />
                ) : null
              }
            </Tab.Screen>
          </Tab.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">
              {(props) => (
                <Login
                  {...props}
                  onLogin={handleLogin}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Signup">
              {(props) => (
                <Signup
                  {...props}
                  onSignup={handleSignup}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </ProfileProvider>
  );
}



// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';

// import { ProfileProvider } from './src/context/ProfileContext';
// import { Alert, Image, View } from 'react-native';
// import axios from 'axios';

// import HomeStackScreen from './src/screens/HomeStackScreen';
// // import ChatScreen from './src/screens/ChatScreen';
// import ChatStackScreen from './src/screens/ChatStackScreen';
// import Badge from './src/components/Badge';
// import AddProfileStackScreen from './src/screens/AddProfileStackScreen';
// // import AddProfileScreen from './src/screens/AddProfileScreen';
// import DetailsScreen from './src/screens/DetailsScreen';
// import AccountScreen from './src/screens/AccountScreen';
// import Login from './src/screens/Login';
// import Signup from './src/screens/Signup';

// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();


// export default function App() {
//   // Auth state
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [registeredUser, setRegisteredUser] = useState<string | null>(null);
//   const [unreadCount, setUnreadCount] = useState(0);
//   // Define a type for user
//   type User = {
//     phone: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     [key: string]: any; // Add other fields as needed
//   };


//   // Handle signup: save user and login
//   const handleSignup = (user: User) => {
//     // setRegisteredUser(user);
//     // setIsLoggedIn(true);
//   };

//   // Handle login: check credentials
//   const handleLogin = (phone: string) => {

//     setRegisteredUser(phone);
//     setIsLoggedIn(true);
//   };

//   // React.useEffect(() => {
//   //   if (registeredUser) {
//   //     axios.get(`http://10.0.2.2:3000/api/chats/unread/${registeredUser}`)
//   //       .then(res => setUnreadCount(res.data.count))
//   //       .catch(() => setUnreadCount(0));
//   //   }
//   // }, [registeredUser]);

//   return (
//     <ProfileProvider>
//       <NavigationContainer>
//         {isLoggedIn ? (
//           <Tab.Navigator
//             screenOptions={{
//               tabBarShowLabel: false,
//               tabBarStyle: {
//                 backgroundColor: '#5B7CFA',
//                 borderTopLeftRadius: 40,
//                 borderTopRightRadius: 40,
//                 borderBottomRightRadius: 40,
//                 borderBottomLeftRadius: 40,
//                 height: 70,
//                 position: 'absolute',
//                 left: 10,
//                 right: 10,
//                 bottom: 10,
//                 elevation: 5,
//                 marginLeft: 6,
//                 marginRight: 6,
//               },
//               tabBarActiveTintColor: '#fff',

//               tabBarInactiveTintColor: '#d1d1d1',
//               headerShown: false,
//             }}
//           >

//             <Tab.Screen
//               name="Home"
//               component={HomeStackScreen}
//               options={{
//                 tabBarIcon: ({ color, size, focused }) => (
//                   <Image
//                     source={require('./src/images/Home.png')}
//                     style={{
//                       width: focused ? 38 : 30,
//                       height: focused ? 38 : 30,
//                       marginTop: 25,
//                       tintColor: color,
//                       alignSelf: 'center',
//                     }}
//                     resizeMode="contain"
//                   />
//                 ),
//               }}
//             />

//              <Tab.Screen
//               name="Chat"
//               component={ChatStackScreen}
//               options={{
//                 tabBarIcon: ({ color, size, focused }) => (
//                   <View>
//                     <Image
//                       source={require('./src/images/Chat.png')}
//                       style={{
//                         width: focused ? 38 : 30,
//                         height: focused ? 38 : 30,
//                         marginTop: 25,
//                         tintColor: focused ? '#fff' : '#d1d1d1',
//                         alignSelf: 'center',
//                       }}
//                       resizeMode="contain"
//                     />
//                     <Badge count={unreadCount} />
//                   </View>
//                 ),
//               }}
//             />


//             <Tab.Screen
//               name="Plus"
//               component={AddProfileStackScreen}
//               options={{
//                 tabBarIcon: ({ color, size, focused }) => (

//                   <Image
//                     source={require('./src/images/Plus.png')}
//                     style={{
//                       width: focused ? 38 : 30,   // Bigger when active
//                       height: focused ? 38 : 30,  // Bigger when active
//                       marginTop: 25,
//                       tintColor: focused ? '#fff' : '#d1d1d1', // tint for color change
//                     }}
//                     resizeMode="contain"
//                   />
//                 ),
//               }}
//             />
//             <Tab.Screen
//               name="Details"
//               component={DetailsScreen}
//               options={{
//                 tabBarIcon: ({ color, size, focused }) => (
//                   <Image
//                     source={require('./src/images/Details.png')}
//                     style={{
//                       width: focused ? 38 : 30,   // Bigger when active
//                       height: focused ? 38 : 30,  // Bigger when active
//                       marginTop: 25,
//                       tintColor: focused ? '#fff' : '#d1d1d1', // tint for color change
//                     }}
//                     resizeMode="contain"
//                   />
//                 ),
//               }}
//             />
//             <Tab.Screen
//               name="Account"
//               options={{
//                 tabBarIcon: ({ color, size, focused }) => (
//                   <Image
//                     source={require('./src/images/Account.png')}
//                     style={{
//                       width: focused ? 38 : 30,   // Bigger when active
//                       height: focused ? 38 : 30,  // Bigger when active
//                       marginTop: 25,
//                       tintColor: focused ? '#fff' : '#d1d1d1', // This tints the image
//                     }}
//                     resizeMode="contain"
//                     />
//                 ),
//               }}
//               >
//               {props =>
//                 registeredUser ? (
//                   <AccountScreen
//                     {...props}
//                     user={registeredUser}
//                     onLogout={() => setIsLoggedIn(false)}
//                   />
//                 ) : null
//               }
//             </Tab.Screen>
//           </Tab.Navigator>
//         ) : (
//           <Stack.Navigator screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="Login">
//               {props => (
//                 <Login
//                   {...props}
//                   onLogin={handleLogin}
//                 />
//               )}
//             </Stack.Screen>
//             <Stack.Screen name="Signup">
//               {props => (
//                 <Signup
//                   {...props}
//                   onSignup={handleSignup}
//                 />
//               )}
//             </Stack.Screen>

//           </Stack.Navigator>
//         )}
//       </NavigationContainer>
//     </ProfileProvider>
//   );
// }
//   {/* <Tab.Screen
//    name="Home"
//    options={{
//      tabBarIcon: ({ color, size, focused }) => (
//        <Image
//          source={require('./src/images/Home.png')}
//          style={{
//            justifyContent: 'center',
//            width: focused ? 38 : 30,
//            height: focused ? 38 : 30,
//            marginTop: 25,
//            alignSelf: 'center',
//            tintColor: focused ? '#fff' : '#d1d1d1',
//          }}
//          resizeMode="contain"
//        />
//      ),
//    }}
//  >
//    {props => (
//      <HomeStackScreen
//        {...props}
//        registeredUser={registeredUser}
//      />
//    )}
//  </Tab.Screen> */}

//    {/* <Tab.Screen
//      name="Chat"
//      component={HomeStackScreen}
//      options={{
//        tabBarIcon: ({ color, size, focused }) => (
//          <View>
//            <Image
//              source={require('./src/images/Chat.png')}
//              style={{
//                width: focused ? 38 : 30,   // Bigger when active
//                height: focused ? 38 : 30,  // Bigger when active
//                marginTop: 25,
//                tintColor: focused ? '#fff' : '#d1d1d1', // tint for color change
//                alignSelf: 'center', // <-- Add this
//              }}
//              resizeMode="contain"
//            />

//            <Badge count={unreadCount} />
//          </View>
//        ),
//      }}
//    /> */}