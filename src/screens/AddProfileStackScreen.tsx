import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddProfileScreen from './AddProfileScreen';
import AddProfileFormScreen from './AddProfileFormScreen';

interface AddProfileStackScreenProps {
  registeredUser: string | null;
}
const Stack = createStackNavigator();

// const AddProfileStackScreen = () => (
const AddProfileStackScreen: React.FC<AddProfileStackScreenProps> = ({ registeredUser }) => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GetProfiles"> 
         {(props) => (
          <AddProfileScreen
          {...props}
          route={{
            ...props.route,
            params: {
              loginUser: registeredUser,
            }
          }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="AddProfileForm">
         {(props) => (
          <AddProfileFormScreen
          {...props}
          route={{
            ...props.route,
            params: {
              loginUser: registeredUser,
            }
          }}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>







  )
};


export default AddProfileStackScreen;