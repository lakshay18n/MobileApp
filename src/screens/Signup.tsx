import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import axios from 'axios';
import CustomHeader from '../components/CustomHeader';

interface SignupProps {
  navigation: {
    navigate: (screen: string) => void;
  };
  onSignup?: (data: { phone: string; password: string; firstName: string; lastName: string }) => void;
}

const Signup: React.FC<SignupProps> = ({ navigation, onSignup }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validatePassword = (pass: string) => {
    // At least 8 chars, 1 capital, 1 number, 1 special char
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}```math```:;"'\\|,.<>\/?]).{8,}$/;
    return regex.test(pass);
  };

  const handleSignup = async () => {
    if (!firstName || !lastName || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 8 characters, include a capital letter, a number, and a symbol.'
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    const signupData = {
      firstName,
      lastName,
      phone,
      password,
    };

    try {
      // Replace 'YOUR_API_URL' with your actual API endpoint
      const response = await axios.post('http://10.0.2.2:3000/api/account/signup', signupData);

      // Handle success (e.g., navigate to login, show message, etc.)

      if (response.status === 200) {
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
        Alert.alert(`With Code ${response.status}`)

      }
      if (response.status === 400) {
        Alert.alert('User Already exist from same number');
        Alert.alert(`With Code ${response.status}`)

      }
      if (response.status === 500) {
        Alert.alert('DataBase issue!!!!!');
        Alert.alert(`With Code ${response.status}`)

      }

    } catch (error: any) {
      // Handle error
      Alert.alert(`Signup failed with data ${signupData.firstName}`);
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
            source={require('../images/signup.jpg')}
            style={styles.avatar}
          />
          <View style={styles.form}>
            <TextInput
              style={styles.inputArea}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.inputArea}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <TextInput
              style={styles.inputArea}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={10}
            />
            <TextInput
              style={styles.inputArea}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.inputArea}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;

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
    backgroundColor: '#f7f7f7',
    elevation: 3,
    alignItems: 'center',
    marginBottom:50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  form: {
    width: '100%',
  },
  inputArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginText: {
    color: '#007bff',
    marginTop: 20,
    textAlign: 'center',
  },
});