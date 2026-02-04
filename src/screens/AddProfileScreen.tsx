import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import AddProfileForm from '../components/AddProfileForm';
import { useProfiles } from '../context/ProfileContext';
import MyProfileCard from '../components/MyProfileCard';
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';



const AddProfileScreen = ({ route, navigation }: any) => {
  const profileId = route.params?.loginUser ?? ''

  // const [modalVisible, setModalVisible] = useState(false);
  const [myProfiles, setMyProfiles] = useState<any[]>([]);
  const currentUserPhone = profileId; // Get from context or props


  useEffect(() => {

    loadResource()
  }, [profileId]);

  const loadResource = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/apis/getResources/${profileId}`);
      Alert.alert("respose fro the end point is", JSON.stringify(response.data))
      setMyProfiles(response.data);
      console.log(response.data)
    }
    catch (error: any) {
      Alert.alert("error in getting the response")
      console.log(error);

    }

    return 0
  }

  // Delete profile
  const handleDelete = async (profileId: string) => {
    try {
      await axios.delete(`http://10.0.2.2:3000/api/add/deleteprofile/${profileId}`);
      setMyProfiles(prev => prev.filter(p => p.id !== profileId && p._id !== profileId));
      Alert.alert('Profile deleted!');
    } catch (err) {
      Alert.alert('Error', 'Failed to delete profile.');
    }
  };
  return (
    <View style={styles.container}>
      <CustomHeader />
      {/* My Profiles List */}
      <Text style={styles.sectionTitle}>My Profiles</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {myProfiles.length > 0 ? (
          myProfiles.map((profile, index) => (
            <MyProfileCard
              key={profile._id || profile.id || index.toString()}   // ✅ fallback if _id missing
              profile={profile}
              onEdit={(profile) => navigation.navigate('AddProfileForm', { profile })}
              onDelete={(profileId) => {
                handleDelete(profileId)
                // TODO: Call backend to delete profile, then update state/context
              }}
            />
          ))
        ) : (
          <Text style={{ textAlign: 'center', color: '#888', marginTop: 6 }}>
            No profiles created by you yet.
          </Text>
        )}
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddProfileForm')}
      >
        <Image
          source={require('../images/Plus.png')}
          style={{ width: 50, height: 50 }}

        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  text: { fontSize: 20, textAlign: 'center', marginTop: 40 },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 90,
    backgroundColor: '#5B7CFA',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 10, // Make sure it's above ScrollView
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
    color: '#5B7CFA',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 10,
    maxHeight: '80%',
  },
});

export default AddProfileScreen;