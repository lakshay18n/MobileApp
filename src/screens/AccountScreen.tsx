import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useProfiles } from '../context/ProfileContext';
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';
import SquareAd from '../components/SquareAd';


type User = {
  firstName: string;
  lastName: string;
  phone: string;
};

type AccountScreenProps = {
  user: string;
  onLogout: () => void;
};

const AccountScreen: React.FC<AccountScreenProps> = ({ user, onLogout }) => {
  const { profiles } = useProfiles();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);



  // Fetch latest user details from backend
  useEffect(() => {
    axios.get(`http://10.0.2.2:3000/api/account/user/${user}`)

      .then(res => {
        Alert.alert(`The information is ${res.data}`)
        setUserDetails(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // Count profiles created by this user (by phone)
  const myProfiles = profiles.filter(
    profile => profile.contactNumber === user
  );

  return (
    <View>
      <CustomHeader />
      <View style={styles.container}>
        <Text style={styles.heading}>Account Details</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#5B7CFA" />
        ) : userDetails ? (
          <>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>
                {userDetails.firstName} {userDetails.lastName}
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{userDetails.phone}</Text>
            </View>
            {/* <View style={styles.infoBox}>
              <Text style={styles.label}>Profiles Created:</Text>
              <Text style={styles.value}>{myProfiles.length}</Text>
            </View> */}
          </>
        ) : (
          <Text style={{ color: 'red' }}>User not found</Text>
        )}
      </View>
      <SquareAd />
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

    </View>
  );
};

export default AccountScreen;

// ...styles remain the same

const styles = StyleSheet.create({
  container: {
    width: 380,
    height: 130,
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    alignSelf: 'center',
    marginTop: 30,

  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5B7CFA',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  infoBox: {
    flexDirection: 'row',
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',

  },
  label: {
    fontWeight: 'bold',
    fontSize: 17,
    width: 60,
    color: '#333',
  },
  value: {
    fontSize: 17,
    color: '#5B7CFA',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#5B7CFA',
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});