import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Alert
} from 'react-native';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';

import type { StackNavigationProp } from '@react-navigation/stack';

type LoginProps = {
  navigation: StackNavigationProp<any>;
  onLogin?: (phone: string) => void;
};

const Login: React.FC<LoginProps> = ({ navigation, onLogin }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const loginData = {
      phone,
      password,
    };

    try {
      // Replace 'YOUR_API_URL' with your actual API endpoint
      const response = await axios.post('http://10.0.2.2:3000/api/account/login', loginData);

      // Handle success (e.g., navigate to login, show message, etc.)

      if (response.status === 200) {
        Alert.alert('Success', 'Loged in   successfully!');
        if (onLogin) {
          onLogin(loginData.phone); // tells App.tsx to show Tab.Navigator
        }
        // Alert.alert(`With Code ${response.status}`)

      }
      if (response.status === 400) {
        Alert.alert('User Already exist from same number');
        // Alert.alert(`With Code ${response.status}`)

      }
      if (response.status === 500) {
        Alert.alert('DataBase issue!!!!!');
        // Alert.alert(`With Code ${response.status}`)

      }

    } catch (error: any) {
      // Handle error
      Alert.alert(`Signup failed with data ${loginData.phone}`);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        showNotification={false}
        onTranslatePress={() => {/* translation logic */ }}
      />
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Image
            source={require('../images/login_image.jpg')}
            style={styles.avatar}
          />
          <View style={styles.form}>
            <TextInput
              style={styles.inputArea}
              placeholder="Enter phone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.inputArea}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>
              Don't have an account? Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  formContainer: {
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    elevation: 2,
    marginBottom:50,
  },
  avatar: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 50,
  },
  form: {
    marginBottom: 20,
  },
  inputArea: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  signupText: {
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
  },
});



//  const handleLogin = () => {
//     if (onLogin) {
//       onLogin({ phone, password });
//     }
//   };