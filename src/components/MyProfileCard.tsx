import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

type MyProfileCardProps = {
  profile: any;
  onEdit: (profile: any) => void;
  onDelete: (profileId: string) => void;
};

const MyProfileCard: React.FC<MyProfileCardProps> = ({ profile, onEdit, onDelete }) => {
  const genderValue = (profile.gender || '').trim().toLowerCase();

  let avatarSource;
  if (genderValue === 'female' || genderValue === 'f') {
    avatarSource = require('../images/female.jpg');
  } else if (genderValue === 'male' || genderValue === 'm') {
    avatarSource = require('../images/male.jpg');
  } 

  return (
    <View style={styles.card}>
      <Image source={avatarSource} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{profile.fullName || 'PROFILE'}</Text>
        <Text style={styles.details}>Age: {profile.age} | Gender: {profile.gender}</Text>
        <Text style={styles.details}>Zone: {profile.zone}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(profile)}>
          <Image source={require('../images/edit.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(profile.id || profile._id)}>
          <Image source={require('../images/delete.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  details: { fontSize: 14, color: '#555' },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 12,
    tintColor: '#5B7CFA',
  },
});

export default MyProfileCard;