import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

type Props = {
  name: string;
  age: string;
  gender: string;
  zone: string;
  onPress: () => void;
};

const ProfileCard: React.FC<Props> = ({ name, age, gender, zone, onPress }) => {

  const genderValue = (gender || '').trim().toLowerCase();

  let avatarSource;
  if (genderValue === 'female' || genderValue === 'f') {
    avatarSource = require('../images/female.jpg');
  } else if (genderValue === 'male' || genderValue === 'm') {
    avatarSource = require('../images/male.jpg');
  }

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={avatarSource} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.details}>Age: {age} | Gender: {gender}</Text>
        <Text style={styles.details}>Zone: {zone}</Text>
      </View>
    </TouchableOpacity>
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
  },
  Image: {
    padding: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: 12,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  details: { fontSize: 14, color: '#555' },
});

export default ProfileCard;





// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// type ProfileCardProps = {
//   name: string;
//   avatar?: string; // URL or local image path
//   onPress: () => void;
// };

// const ProfileCard: React.FC<ProfileCardProps> = ({ name, avatar, onPress }) => {
//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
//       <View style={styles.avatarContainer}>
//         {avatar ? (
//           <Image source={{ uri: avatar }} style={styles.avatar} />
//         ) : null}
//       </View>
//       <View style={styles.info}>
//         <Text style={styles.name}>{name}</Text>
//         {/* You can add more info here, like age, city, etc. */}
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#3AB6FF',
//     borderRadius: 20,
//     alignItems: 'center',
//     padding: 16,
//     marginHorizontal: 16,
//     marginVertical: 8,
//     elevation: 2,
//   },
//   avatarContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: '#e0e0e0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   avatar: {
//     width: 56,
//     height: 56,
//     borderRadius: 28,
//     resizeMode: 'cover',
//   },
//   info: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   name: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default ProfileCard;