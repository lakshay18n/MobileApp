// src/screens/ViewProfile.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image,Alert } from 'react-native';
import CustomHeader from '../components/CustomHeader';

const ViewProfile = ({ route, navigation, registeredUser }: any) => {
  const { profile } = route.params;
  
  const handleChatPress = () => {
    
    Alert.alert(` sign in number ${registeredUser}, profile number ${profile.contactNumber}`)
    navigation.navigate('ChatWindow', {
      senderPhone: registeredUser,
      receiverPhone: profile.contactNumber, // or profile.phone
      receiverName: profile.fullName
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f8ff' }}>
      <CustomHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{profile.fullName}</Text>

        {/* Basic Info Block */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Basic Information</Text>
          <Text style={styles.field}><Text style={styles.label}>Gender:</Text> {profile.gender}</Text>
          <Text style={styles.field}><Text style={styles.label}>DOB:</Text> {profile.dob}</Text>
          <Text style={styles.field}><Text style={styles.label}>Age:</Text> {profile.age}</Text>
          <Text style={styles.field}><Text style={styles.label}>Height:</Text> {profile.height}</Text>
          <Text style={styles.field}><Text style={styles.label}>Marital Status:</Text> {profile.maritalStatus}</Text>
          <Text style={styles.field}><Text style={styles.label}>Profile Created By:</Text> {profile.profileCreatedBy}</Text>
          <Text style={styles.field}><Text style={styles.label}>Caste:</Text> {profile.caste}</Text>
          <Text style={styles.field}><Text style={styles.label}>Gotra:</Text> {profile.gotra}</Text>
          <Text style={styles.field}><Text style={styles.label}>Location:</Text> {profile.location}</Text>
          <Text style={styles.field}><Text style={styles.label}>Zone:</Text> {profile.zone}</Text>
          <Text style={styles.field}><Text style={styles.label}>Village:</Text> {profile.village}</Text>
          <Text style={styles.field}><Text style={styles.label}>Contact Number:</Text> {profile.contactNumber}</Text>
          <Text style={styles.field}><Text style={styles.label}>Email:</Text> {profile.email}</Text>
        </View>

        {/* Education & Profession Block */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Education & Profession</Text>
          <Text style={styles.field}><Text style={styles.label}>Highest Qualification:</Text> {profile.highestQualification}</Text>
          <Text style={styles.field}><Text style={styles.label}>Education Details:</Text> {profile.educationDetails}</Text>
          <Text style={styles.field}><Text style={styles.label}>Occupation:</Text> {profile.occupation}</Text>
          <Text style={styles.field}><Text style={styles.label}>Organization:</Text> {profile.organization}</Text>
          <Text style={styles.field}><Text style={styles.label}>Annual Income:</Text> {profile.annualIncome}</Text>
          <Text style={styles.field}><Text style={styles.label}>Work Location:</Text> {profile.workLocation}</Text>
        </View>

        {/* Family Details Block */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Family Details</Text>
          <Text style={styles.field}><Text style={styles.label}>Father's Occupation:</Text> {profile.fatherOccupation}</Text>
          <Text style={styles.field}><Text style={styles.label}>Mother's Occupation:</Text> {profile.motherOccupation}</Text>
          <Text style={styles.field}><Text style={styles.label}>Siblings:</Text> {profile.siblings}</Text>
          <Text style={styles.field}><Text style={styles.label}>Family Type:</Text> {profile.familyType}</Text>
        </View>

        {/* Partner Preferences Block */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Partner Preferences</Text>
          <Text style={styles.field}><Text style={styles.label}>Preferred Age Range:</Text> {profile.preferredAgeRange}</Text>
          <Text style={styles.field}><Text style={styles.label}>Preferred Religion/Caste:</Text> {profile.preferredReligionCaste}</Text>
          <Text style={styles.field}><Text style={styles.label}>Preferred Education:</Text> {profile.preferredEducation}</Text>
          <Text style={styles.field}><Text style={styles.label}>Preferred Location:</Text> {profile.preferredLocation}</Text>
          <Text style={styles.field}><Text style={styles.label}>Other Preferences:</Text> {profile.otherPreferences}</Text>
        </View>

        {/* Additional Information Block */}
        <View style={styles.block}>
          <Text style={styles.blockTitle}>Additional Information</Text>
          <Text style={styles.field}><Text style={styles.label}>About Me:</Text> {profile.aboutMe}</Text>
          <Text style={styles.field}><Text style={styles.label}>Manglik:</Text> {profile.manglik}</Text>
        </View>

        {/* Chat Now Button */}
        <TouchableOpacity
          style={styles.chatBtn}
          onPress={handleChatPress}
        >
          <Image source={require('../images/Chat.png')} style={{ width: 22, height: 22, marginRight: 8 }} />
          <Text style={styles.chatBtnText}>Chat Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f8ff',
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5B7CFA',
    marginBottom: 18,
    alignSelf: 'center',
    letterSpacing: 1,
  },
  block: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    elevation: 2,
    shadowColor: '#5B7CFA',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5B7CFA',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  field: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
    lineHeight: 22,
  },
  label: {
    fontWeight: 'bold',
    color: '#222',
  },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B7CFA',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginTop: 10,
    marginBottom: 50,
    alignSelf: 'center',
    elevation: 2,
  },
  chatBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ViewProfile;




















// import React from 'react';
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import CustomHeader from '../components/CustomHeader';

// const ViewProfile = ({ route, navigation, registeredUser }: any) => {
//   const { profile } = route.params;

//   return (
//     <View style={{ flex: 1, backgroundColor: '#f5f8ff' }}>
//       <CustomHeader />
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.title}>{profile.fullName}</Text>

//         {/* Basic Info Block */}
//         <View style={styles.block}>
//           <Text style={styles.blockTitle}>Basic Information</Text>
//           <Text style={styles.field}><Text style={styles.label}>Gender:</Text> {profile.gender}</Text>
//           <Text style={styles.field}><Text style={styles.label}>DOB:</Text> {profile.dob}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Age:</Text> {profile.age}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Height:</Text> {profile.height}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Marital Status:</Text> {profile.maritalStatus}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Profile Created By:</Text> {profile.profileCreatedBy}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Caste:</Text> {profile.caste}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Gotra:</Text> {profile.gotra}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Location:</Text> {profile.location}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Zone:</Text> {profile.zone}</Text>
//           {/* <Text style={styles.field}><Text style={styles.label}>MP Zone:</Text> {profile.mpZone}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Rajasthan Zone:</Text> {profile.rajasthanZone}</Text> */}
//           <Text style={styles.field}><Text style={styles.label}>Village:</Text> {profile.village}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Contact Number:</Text> {profile.contactNumber}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Email:</Text> {profile.email}</Text>
//         </View>

//         {/* Education & Profession Block */}
//         <View style={styles.block}>
//           <Text style={styles.blockTitle}>Education & Profession</Text>
//           <Text style={styles.field}><Text style={styles.label}>Highest Qualification:</Text> {profile.highestQualification}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Education Details:</Text> {profile.educationDetails}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Occupation:</Text> {profile.occupation}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Organization:</Text> {profile.organization}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Annual Income:</Text> {profile.annualIncome}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Work Location:</Text> {profile.workLocation}</Text>
//         </View>

//         {/* Family Details Block */}
//         <View style={styles.block}>
//           <Text style={styles.blockTitle}>Family Details</Text>
//           <Text style={styles.field}><Text style={styles.label}>Father’s Occupation:</Text> {profile.fatherOccupation}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Mother’s Occupation:</Text> {profile.motherOccupation}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Siblings:</Text> {profile.siblings}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Family Type:</Text> {profile.familyType}</Text>
//         </View>

//         {/* Partner Preferences Block */}
//         <View style={styles.block}>
//           <Text style={styles.blockTitle}>Partner Preferences</Text>
//           <Text style={styles.field}><Text style={styles.label}>Preferred Age Range:</Text> {profile.preferredAgeRange}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Preferred Religion/Caste:</Text> {profile.preferredReligionCaste}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Preferred Education:</Text> {profile.preferredEducation}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Preferred Location:</Text> {profile.preferredLocation}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Other Preferences:</Text> {profile.otherPreferences}</Text>
//         </View>

//         {/* Additional Information Block */}
//         <View style={styles.block}>
//           <Text style={styles.blockTitle}>Additional Information</Text>
//           <Text style={styles.field}><Text style={styles.label}>About Me:</Text> {profile.aboutMe}</Text>
//           <Text style={styles.field}><Text style={styles.label}>Manglik:</Text> {profile.manglik}</Text>
//         </View>

//         {/* Chat Now Button */}
//         <TouchableOpacity
//           style={styles.chatBtn}
//           onPress={() =>
//             navigation.navigate('Chat', {
//               senderPhone: registeredUser,   // from login/session
//               receiverPhone: profile.phone        // from profile object
//             })
//           }
//         >
//           <Image source={require('../images/Chat.png')} style={{ width: 22, height: 22, marginRight: 8 }} />
//           <Text style={styles.chatBtnText}>Chat Now</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );

// };


// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#f5f8ff',
//     paddingBottom: 40,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#5B7CFA',
//     marginBottom: 18,
//     alignSelf: 'center',
//     letterSpacing: 1,
//   },
//   block: {
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 18,
//     elevation: 2,
//     shadowColor: '#5B7CFA',
//     shadowOpacity: 0.08,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//   },
//   blockTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#5B7CFA',
//     marginBottom: 10,
//     letterSpacing: 0.5,
//   },
//   field: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 6,
//     lineHeight: 22,
//   },
//   label: {
//     fontWeight: 'bold',
//     color: '#222',
//   },
//   chatBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#5B7CFA',
//     borderRadius: 25,
//     paddingVertical: 14,
//     paddingHorizontal: 30,
//     marginTop: 10,
//     marginBottom: 50,
//     alignSelf: 'center',
//     elevation: 2,
//   },
//   chatBtnText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });

// export default ViewProfile;





// // import React from 'react';
// // import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
// // import { useProfiles } from '../context/ProfileContext';
// // import CustomHeader from '../components/CustomHeader';

// // const ViewProfile = ({ route, navigation }: any) => {
// //   const { profileId } = route.params;
// //   const { profiles } = useProfiles();
// //   const profile = profiles.find((p) => p.id === profileId);

// //   if (!profile) {
// //     return (
// //       <View style={styles.container}>
// //         <CustomHeader />
// //         <Text>Profile not found.</Text>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={{ flex: 1, backgroundColor: '#fff' }}>
// //       <CustomHeader />
// //       <ScrollView contentContainerStyle={styles.container}>
// //         <Text style={styles.title}>{profile.fullName}</Text>
// //         <Text style={styles.label}>Gender: <Text style={styles.value}>{profile.gender}</Text></Text>
// //         <Text style={styles.label}>DOB: <Text style={styles.value}>{profile.dob}</Text></Text>
// //         <Text style={styles.label}>Age: <Text style={styles.value}>{profile.age}</Text></Text>
// //         <Text style={styles.label}>Height: <Text style={styles.value}>{profile.height}</Text></Text>
// //         <Text style={styles.label}>Marital Status: <Text style={styles.value}>{profile.maritalStatus}</Text></Text>
// //         <Text style={styles.label}>Profile Created By: <Text style={styles.value}>{profile.profileCreatedBy}</Text></Text>
// //         <Text style={styles.label}>Caste: <Text style={styles.value}>{profile.caste}</Text></Text>
// //         <Text style={styles.label}>Gotra: <Text style={styles.value}>{profile.gotra}</Text></Text>
// //         <Text style={styles.label}>Location: <Text style={styles.value}>{profile.location}</Text></Text>
// //         <Text style={styles.label}>Zone: <Text style={styles.value}>{profile.zone}</Text></Text>
// //         <Text style={styles.label}>MP Zone: <Text style={styles.value}>{profile.mpZone}</Text></Text>
// //         <Text style={styles.label}>Rajasthan Zone: <Text style={styles.value}>{profile.rajasthanZone}</Text></Text>
// //         <Text style={styles.label}>Village: <Text style={styles.value}>{profile.village}</Text></Text>
// //         <Text style={styles.label}>Contact Number: <Text style={styles.value}>{profile.contactNumber}</Text></Text>
// //         <Text style={styles.label}>Email: <Text style={styles.value}>{profile.email}</Text></Text>
// //         <Text style={styles.section}>Education & Profession</Text>
// //         <Text style={styles.label}>Highest Qualification: <Text style={styles.value}>{profile.highestQualification}</Text></Text>
// //         <Text style={styles.label}>Education Details: <Text style={styles.value}>{profile.educationDetails}</Text></Text>
// //         <Text style={styles.label}>Occupation: <Text style={styles.value}>{profile.occupation}</Text></Text>
// //         <Text style={styles.label}>Organization: <Text style={styles.value}>{profile.organization}</Text></Text>
// //         <Text style={styles.label}>Annual Income: <Text style={styles.value}>{profile.annualIncome}</Text></Text>
// //         <Text style={styles.label}>Work Location: <Text style={styles.value}>{profile.workLocation}</Text></Text>
// //         <Text style={styles.section}>Family Details</Text>
// //         <Text style={styles.label}>Father’s Occupation: <Text style={styles.value}>{profile.fatherOccupation}</Text></Text>
// //         <Text style={styles.label}>Mother’s Occupation: <Text style={styles.value}>{profile.motherOccupation}</Text></Text>
// //         <Text style={styles.label}>Siblings: <Text style={styles.value}>{profile.siblings}</Text></Text>
// //         <Text style={styles.label}>Family Type: <Text style={styles.value}>{profile.familyType}</Text></Text>
// //         <Text style={styles.section}>Partner Preferences</Text>
// //         <Text style={styles.label}>Preferred Age Range: <Text style={styles.value}>{profile.preferredAgeRange}</Text></Text>
// //         <Text style={styles.label}>Preferred Religion/Caste: <Text style={styles.value}>{profile.preferredReligionCaste}</Text></Text>
// //         <Text style={styles.label}>Preferred Education: <Text style={styles.value}>{profile.preferredEducation}</Text></Text>
// //         <Text style={styles.label}>Preferred Location: <Text style={styles.value}>{profile.preferredLocation}</Text></Text>
// //         <Text style={styles.label}>Other Preferences: <Text style={styles.value}>{profile.otherPreferences}</Text></Text>
// //         <Text style={styles.section}>Additional Information</Text>
// //         <Text style={styles.label}>About Me: <Text style={styles.value}>{profile.aboutMe}</Text></Text>
// //         <Text style={styles.label}>Manglik: <Text style={styles.value}>{profile.manglik}</Text></Text>

// //         {/* Chat Now Button */}
// //         <TouchableOpacity
// //           style={styles.chatBtn}
// //           onPress={() => {
// //             // TODO: Call backend to create/find chat and get chatId if needed
// //             navigation.navigate('Chat', {
// //               screen: 'ChatWindow',
// //               params: {
// //                 otherUserPhone: profile.contactNumber,
// //                 otherUserName: profile.fullName,
// //                 // chatId: chatId, // If you have chatId from backend
// //               }
// //             });
// //           }}
// //         >
// //           <Image source={require('../images/Chat.png')} style={{ width: 22, height: 22, marginRight: 8 }} />
// //           <Text style={styles.chatBtnText}>Chat Now</Text>
// //         </TouchableOpacity>
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { padding: 20, backgroundColor: '#fff' },
// //   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#5B7CFA' },
// //   section: { fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#5B7CFA' },
// //   label: { fontWeight: 'bold', marginTop: 8 },
// //   value: { fontWeight: 'normal', color: '#333' },
// //   chatBtn: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     backgroundColor: '#5B7CFA',
// //     borderRadius: 25,
// //     paddingVertical: 12,
// //     paddingHorizontal: 24,
// //     marginTop: 30,
// //     marginBottom: 30,
// //     alignSelf: 'center',
// //     elevation: 2,
// //   },
// //   chatBtnText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //     fontSize: 16,
// //   },
// // });

// // export default ViewProfile;


















// // import React from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Image
// // } from 'react-native';
// // import { RouteProp, NavigationProp } from '@react-navigation/native';
// // import { StackNavigationProp } from '@react-navigation/stack';
// // import CustomHeader from '../components/CustomHeader';

// // // ✅ Profile interface
// // // interface Profile {
// // //   fullName: string;
// // //   gender: string;
// // //   dob: string;
// // //   age: number;
// // //   height: string;
// // //   maritalStatus: string;
// // //   profileCreatedBy: string;
// // //   caste: string;
// // //   gotra: string;
// // //   location: string;
// // //   zone: string;
// // //   village: string;
// // //   contactNumber: string;
// // //   phone: string;
// // //   email: string;
// // //   highestQualification: string;
// // //   educationDetails: string;
// // //   occupation: string;
// // //   organization: string;
// // //   annualIncome: string;
// // //   workLocation: string;
// // //   fatherOccupation: string;
// // //   motherOccupation: string;
// // //   siblings: string;
// // //   familyType: string;
// // //   preferredAgeRange: string;
// // //   preferredReligionCaste: string;
// // //   preferredEducation: string;
// // //   preferredLocation: string;
// // //   otherPreferences: string;
// // //   aboutMe: string;
// // //   manglik: string;
// // // }




// // const ViewProfile= ({ route, navigation, registeredUser }:any) => {
// //   const { profile } = route.params;

// //   return (
// //     <View style={{ flex: 1, backgroundColor: '#f5f8ff' }}>
// //       <CustomHeader />
// //       <ScrollView contentContainerStyle={styles.container}>
// //         <Text style={styles.title}>{profile.fullName}</Text>

// //         {/* Basic Info Block */}
// //         <View style={styles.block}>
// //           <Text style={styles.blockTitle}>Basic Information</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Gender:</Text> {profile.gender}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>DOB:</Text> {profile.dob}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Age:</Text> {profile.age}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Height:</Text> {profile.height}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Marital Status:</Text> {profile.maritalStatus}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Profile Created By:</Text> {profile.profileCreatedBy}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Caste:</Text> {profile.caste}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Gotra:</Text> {profile.gotra}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Location:</Text> {profile.location}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Zone:</Text> {profile.zone}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Village:</Text> {profile.village}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Contact Number:</Text> {profile.contactNumber}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Email:</Text> {profile.email}</Text>
// //         </View>

// //         {/* Education & Profession Block */}
// //         <View style={styles.block}>
// //           <Text style={styles.blockTitle}>Education & Profession</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Highest Qualification:</Text> {profile.highestQualification}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Education Details:</Text> {profile.educationDetails}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Occupation:</Text> {profile.occupation}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Organization:</Text> {profile.organization}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Annual Income:</Text> {profile.annualIncome}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Work Location:</Text> {profile.workLocation}</Text>
// //         </View>

// //         {/* Family Details Block */}
// //         <View style={styles.block}>
// //           <Text style={styles.blockTitle}>Family Details</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Father’s Occupation:</Text> {profile.fatherOccupation}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Mother’s Occupation:</Text> {profile.motherOccupation}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Siblings:</Text> {profile.siblings}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Family Type:</Text> {profile.familyType}</Text>
// //         </View>

// //         {/* Partner Preferences Block */}
// //         <View style={styles.block}>
// //           <Text style={styles.blockTitle}>Partner Preferences</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Preferred Age Range:</Text> {profile.preferredAgeRange}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Preferred Religion/Caste:</Text> {profile.preferredReligionCaste}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Preferred Education:</Text> {profile.preferredEducation}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Preferred Location:</Text> {profile.preferredLocation}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Other Preferences:</Text> {profile.otherPreferences}</Text>
// //         </View>

// //         {/* Additional Information Block */}
// //         <View style={styles.block}>
// //           <Text style={styles.blockTitle}>Additional Information</Text>
// //           <Text style={styles.field}><Text style={styles.label}>About Me:</Text> {profile.aboutMe}</Text>
// //           <Text style={styles.field}><Text style={styles.label}>Manglik:</Text> {profile.manglik}</Text>
// //         </View>

// //         {/* Chat Button */}
// //         <TouchableOpacity
// //           style={styles.chatBtn}
// //           onPress={() =>
// //             navigation.navigate('Chat', {
// //               senderPhone: registeredUser,
// //               receiverPhone: profile.phone
// //             })
// //           }
// //         >
// //           <Image
// //             source={require('../images/Chat.png')}
// //             style={{ width: 22, height: 22, marginRight: 8 }}
// //           />
// //           <Text style={styles.chatBtnText}>Chat Now</Text>
// //         </TouchableOpacity>
// //       </ScrollView>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 16,
// //     backgroundColor: '#f5f8ff',
// //     paddingBottom: 40
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     color: '#5B7CFA',
// //     marginBottom: 18,
// //     alignSelf: 'center',
// //     letterSpacing: 1
// //   },
// //   block: {
// //     backgroundColor: '#fff',
// //     borderRadius: 16,
// //     padding: 16,
// //     marginBottom: 18,
// //     elevation: 2,
// //     shadowColor: '#5B7CFA',
// //     shadowOpacity: 0.08,
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowRadius: 8
// //   },
// //   blockTitle: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#5B7CFA',
// //     marginBottom: 10,
// //     letterSpacing: 0.5
// //   },
// //   field: {
// //     fontSize: 16,
// //     color: '#333',
// //     marginBottom: 6,
// //     lineHeight: 22
// //   },
// //   label: {
// //     fontWeight: 'bold',
// //     color: '#222'
// //   },
// //   chatBtn: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     backgroundColor: '#5B7CFA',
// //     borderRadius: 25,
// //     paddingVertical: 14,
// //     paddingHorizontal: 30,
// //     marginTop: 10,
// //     marginBottom: 50,
// //     alignSelf: 'center',
// //     elevation: 2
// //   },
// //   chatBtnText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //     fontSize: 18
// //   }
// // });

// // export default ViewProfile;
































// // // import React from 'react';
// // // import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
// // // import CustomHeader from '../components/CustomHeader';

// // // const ViewProfile = ({ route, navigation, registeredUser }: any) => {
// // //   const { profile } = route.params;

// // //   return (
// // //     <View style={{ flex: 1, backgroundColor: '#f5f8ff' }}>
// // //       <CustomHeader />
// // //       <ScrollView contentContainerStyle={styles.container}>
// // //         <Text style={styles.title}>{profile.fullName}</Text>

// // //         {/* Basic Info Block */}
// // //         <View style={styles.block}>
// // //           <Text style={styles.blockTitle}>Basic Information</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Gender:</Text> {profile.gender}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>DOB:</Text> {profile.dob}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Age:</Text> {profile.age}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Height:</Text> {profile.height}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Marital Status:</Text> {profile.maritalStatus}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Profile Created By:</Text> {profile.profileCreatedBy}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Caste:</Text> {profile.caste}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Gotra:</Text> {profile.gotra}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Location:</Text> {profile.location}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Zone:</Text> {profile.zone}</Text>
// // //           {/* <Text style={styles.field}><Text style={styles.label}>MP Zone:</Text> {profile.mpZone}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Rajasthan Zone:</Text> {profile.rajasthanZone}</Text> */}
// // //           <Text style={styles.field}><Text style={styles.label}>Village:</Text> {profile.village}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Contact Number:</Text> {profile.contactNumber}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Email:</Text> {profile.email}</Text>
// // //         </View>

// // //         {/* Education & Profession Block */}
// // //         <View style={styles.block}>
// // //           <Text style={styles.blockTitle}>Education & Profession</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Highest Qualification:</Text> {profile.highestQualification}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Education Details:</Text> {profile.educationDetails}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Occupation:</Text> {profile.occupation}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Organization:</Text> {profile.organization}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Annual Income:</Text> {profile.annualIncome}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Work Location:</Text> {profile.workLocation}</Text>
// // //         </View>

// // //         {/* Family Details Block */}
// // //         <View style={styles.block}>
// // //           <Text style={styles.blockTitle}>Family Details</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Father’s Occupation:</Text> {profile.fatherOccupation}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Mother’s Occupation:</Text> {profile.motherOccupation}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Siblings:</Text> {profile.siblings}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Family Type:</Text> {profile.familyType}</Text>
// // //         </View>

// // //         {/* Partner Preferences Block */}
// // //         <View style={styles.block}>
// // //           <Text style={styles.blockTitle}>Partner Preferences</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Preferred Age Range:</Text> {profile.preferredAgeRange}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Preferred Religion/Caste:</Text> {profile.preferredReligionCaste}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Preferred Education:</Text> {profile.preferredEducation}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Preferred Location:</Text> {profile.preferredLocation}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Other Preferences:</Text> {profile.otherPreferences}</Text>
// // //         </View>

// // //         {/* Additional Information Block */}
// // //         <View style={styles.block}>
// // //           <Text style={styles.blockTitle}>Additional Information</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>About Me:</Text> {profile.aboutMe}</Text>
// // //           <Text style={styles.field}><Text style={styles.label}>Manglik:</Text> {profile.manglik}</Text>
// // //         </View>

// // //         {/* Chat Now Button */}
// // //         <TouchableOpacity
// // //           style={styles.chatBtn}
// // //           onPress={() =>
// // //             navigation.navigate('Chat', {
// // //               senderPhone: registeredUser,   // from login/session
// // //               receiverPhone: profile.phone        // from profile object
// // //             })
// // //           }
// // //         >
// // //           <Image source={require('../images/Chat.png')} style={{ width: 22, height: 22, marginRight: 8 }} />
// // //           <Text style={styles.chatBtnText}>Chat Now</Text>
// // //         </TouchableOpacity>
// // //       </ScrollView>
// // //     </View>
// // //   );

// // // };


// // // const styles = StyleSheet.create({
// // //   container: {
// // //     padding: 16,
// // //     backgroundColor: '#f5f8ff',
// // //     paddingBottom: 40,
// // //   },
// // //   title: {
// // //     fontSize: 28,
// // //     fontWeight: 'bold',
// // //     color: '#5B7CFA',
// // //     marginBottom: 18,
// // //     alignSelf: 'center',
// // //     letterSpacing: 1,
// // //   },
// // //   block: {
// // //     backgroundColor: '#fff',
// // //     borderRadius: 16,
// // //     padding: 16,
// // //     marginBottom: 18,
// // //     elevation: 2,
// // //     shadowColor: '#5B7CFA',
// // //     shadowOpacity: 0.08,
// // //     shadowOffset: { width: 0, height: 2 },
// // //     shadowRadius: 8,
// // //   },
// // //   blockTitle: {
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //     color: '#5B7CFA',
// // //     marginBottom: 10,
// // //     letterSpacing: 0.5,
// // //   },
// // //   field: {
// // //     fontSize: 16,
// // //     color: '#333',
// // //     marginBottom: 6,
// // //     lineHeight: 22,
// // //   },
// // //   label: {
// // //     fontWeight: 'bold',
// // //     color: '#222',
// // //   },
// // //   chatBtn: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     backgroundColor: '#5B7CFA',
// // //     borderRadius: 25,
// // //     paddingVertical: 14,
// // //     paddingHorizontal: 30,
// // //     marginTop: 10,
// // //     marginBottom: 50,
// // //     alignSelf: 'center',
// // //     elevation: 2,
// // //   },
// // //   chatBtnText: {
// // //     color: '#fff',
// // //     fontWeight: 'bold',
// // //     fontSize: 18,
// // //   },
// // // });

// // // export default ViewProfile;





// // // import React from 'react';
// // // import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
// // // import { useProfiles } from '../context/ProfileContext';
// // // import CustomHeader from '../components/CustomHeader';

// // // const ViewProfile = ({ route, navigation }: any) => {
// // //   const { profileId } = route.params;
// // //   const { profiles } = useProfiles();
// // //   const profile = profiles.find((p) => p.id === profileId);

// // //   if (!profile) {
// // //     return (
// // //       <View style={styles.container}>
// // //         <CustomHeader />
// // //         <Text>Profile not found.</Text>
// // //       </View>
// // //     );
// // //   }

// // //   return (
// // //     <View style={{ flex: 1, backgroundColor: '#fff' }}>
// // //       <CustomHeader />
// // //       <ScrollView contentContainerStyle={styles.container}>
// // //         <Text style={styles.title}>{profile.fullName}</Text>
// // //         <Text style={styles.label}>Gender: <Text style={styles.value}>{profile.gender}</Text></Text>
// // //         <Text style={styles.label}>DOB: <Text style={styles.value}>{profile.dob}</Text></Text>
// // //         <Text style={styles.label}>Age: <Text style={styles.value}>{profile.age}</Text></Text>
// // //         <Text style={styles.label}>Height: <Text style={styles.value}>{profile.height}</Text></Text>
// // //         <Text style={styles.label}>Marital Status: <Text style={styles.value}>{profile.maritalStatus}</Text></Text>
// // //         <Text style={styles.label}>Profile Created By: <Text style={styles.value}>{profile.profileCreatedBy}</Text></Text>
// // //         <Text style={styles.label}>Caste: <Text style={styles.value}>{profile.caste}</Text></Text>
// // //         <Text style={styles.label}>Gotra: <Text style={styles.value}>{profile.gotra}</Text></Text>
// // //         <Text style={styles.label}>Location: <Text style={styles.value}>{profile.location}</Text></Text>
// // //         <Text style={styles.label}>Zone: <Text style={styles.value}>{profile.zone}</Text></Text>
// // //         <Text style={styles.label}>MP Zone: <Text style={styles.value}>{profile.mpZone}</Text></Text>
// // //         <Text style={styles.label}>Rajasthan Zone: <Text style={styles.value}>{profile.rajasthanZone}</Text></Text>
// // //         <Text style={styles.label}>Village: <Text style={styles.value}>{profile.village}</Text></Text>
// // //         <Text style={styles.label}>Contact Number: <Text style={styles.value}>{profile.contactNumber}</Text></Text>
// // //         <Text style={styles.label}>Email: <Text style={styles.value}>{profile.email}</Text></Text>
// // //         <Text style={styles.section}>Education & Profession</Text>
// // //         <Text style={styles.label}>Highest Qualification: <Text style={styles.value}>{profile.highestQualification}</Text></Text>
// // //         <Text style={styles.label}>Education Details: <Text style={styles.value}>{profile.educationDetails}</Text></Text>
// // //         <Text style={styles.label}>Occupation: <Text style={styles.value}>{profile.occupation}</Text></Text>
// // //         <Text style={styles.label}>Organization: <Text style={styles.value}>{profile.organization}</Text></Text>
// // //         <Text style={styles.label}>Annual Income: <Text style={styles.value}>{profile.annualIncome}</Text></Text>
// // //         <Text style={styles.label}>Work Location: <Text style={styles.value}>{profile.workLocation}</Text></Text>
// // //         <Text style={styles.section}>Family Details</Text>
// // //         <Text style={styles.label}>Father’s Occupation: <Text style={styles.value}>{profile.fatherOccupation}</Text></Text>
// // //         <Text style={styles.label}>Mother’s Occupation: <Text style={styles.value}>{profile.motherOccupation}</Text></Text>
// // //         <Text style={styles.label}>Siblings: <Text style={styles.value}>{profile.siblings}</Text></Text>
// // //         <Text style={styles.label}>Family Type: <Text style={styles.value}>{profile.familyType}</Text></Text>
// // //         <Text style={styles.section}>Partner Preferences</Text>
// // //         <Text style={styles.label}>Preferred Age Range: <Text style={styles.value}>{profile.preferredAgeRange}</Text></Text>
// // //         <Text style={styles.label}>Preferred Religion/Caste: <Text style={styles.value}>{profile.preferredReligionCaste}</Text></Text>
// // //         <Text style={styles.label}>Preferred Education: <Text style={styles.value}>{profile.preferredEducation}</Text></Text>
// // //         <Text style={styles.label}>Preferred Location: <Text style={styles.value}>{profile.preferredLocation}</Text></Text>
// // //         <Text style={styles.label}>Other Preferences: <Text style={styles.value}>{profile.otherPreferences}</Text></Text>
// // //         <Text style={styles.section}>Additional Information</Text>
// // //         <Text style={styles.label}>About Me: <Text style={styles.value}>{profile.aboutMe}</Text></Text>
// // //         <Text style={styles.label}>Manglik: <Text style={styles.value}>{profile.manglik}</Text></Text>

// // //         {/* Chat Now Button */}
// // //         <TouchableOpacity
// // //           style={styles.chatBtn}
// // //           onPress={() => {
// // //             // TODO: Call backend to create/find chat and get chatId if needed
// // //             navigation.navigate('Chat', {
// // //               screen: 'ChatWindow',
// // //               params: {
// // //                 otherUserPhone: profile.contactNumber,
// // //                 otherUserName: profile.fullName,
// // //                 // chatId: chatId, // If you have chatId from backend
// // //               }
// // //             });
// // //           }}
// // //         >
// // //           <Image source={require('../images/Chat.png')} style={{ width: 22, height: 22, marginRight: 8 }} />
// // //           <Text style={styles.chatBtnText}>Chat Now</Text>
// // //         </TouchableOpacity>
// // //       </ScrollView>
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: { padding: 20, backgroundColor: '#fff' },
// // //   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#5B7CFA' },
// // //   section: { fontWeight: 'bold', marginTop: 16, marginBottom: 8, color: '#5B7CFA' },
// // //   label: { fontWeight: 'bold', marginTop: 8 },
// // //   value: { fontWeight: 'normal', color: '#333' },
// // //   chatBtn: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     backgroundColor: '#5B7CFA',
// // //     borderRadius: 25,
// // //     paddingVertical: 12,
// // //     paddingHorizontal: 24,
// // //     marginTop: 30,
// // //     marginBottom: 30,
// // //     alignSelf: 'center',
// // //     elevation: 2,
// // //   },
// // //   chatBtnText: {
// // //     color: '#fff',
// // //     fontWeight: 'bold',
// // //     fontSize: 16,
// // //   },
// // // });

// // // export default ViewProfile;