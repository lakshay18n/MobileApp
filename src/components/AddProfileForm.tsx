// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

// type AddProfileFormProps = {
//   onSubmit: (profile: any) => void;
//   onClose: () => void;
// };

// const AddProfileForm: React.FC<AddProfileFormProps> = ({ onSubmit, onClose }) => {
//   // 1. Basic Information
//   const [fullName, setFullName] = useState('');
//   const [gender, setGender] = useState('');
//   const [dob, setDob] = useState('');
//   const [age, setAge] = useState('');
//   const [height, setHeight] = useState('');
//   const [maritalStatus, setMaritalStatus] = useState('');
//   const [profileCreatedBy, setProfileCreatedBy] = useState('');
//   const [caste, setCaste] = useState('');
//   const [gotra, setGotra] = useState('');
//   const [location, setLocation] = useState('');
//   const [zone, setZone] = useState('');
//   const [mpZone, setMpZone] = useState('');
//   const [rajasthanZone, setRajasthanZone] = useState('');
//   const [village, setVillage] = useState('');
//   const [contactNumber, setContactNumber] = useState('');
//   const [email, setEmail] = useState('');
//   // 2. Education & Profession
//   const [highestQualification, setHighestQualification] = useState('');
//   const [educationDetails, setEducationDetails] = useState('');
//   const [occupation, setOccupation] = useState('');
//   const [organization, setOrganization] = useState('');
//   const [annualIncome, setAnnualIncome] = useState('');
//   const [workLocation, setWorkLocation] = useState('');
//   // 3. Family Details
//   const [fatherOccupation, setFatherOccupation] = useState('');
//   const [motherOccupation, setMotherOccupation] = useState('');
//   const [siblings, setSiblings] = useState('');
//   const [familyType, setFamilyType] = useState('');
//   // 4. Partner Preferences
//   const [preferredAgeRange, setPreferredAgeRange] = useState('');
//   const [preferredReligionCaste, setPreferredReligionCaste] = useState('');
//   const [preferredEducation, setPreferredEducation] = useState('');
//   const [preferredLocation, setPreferredLocation] = useState('');
//   const [otherPreferences, setOtherPreferences] = useState('');
//   // 5. Additional Information
//   const [aboutMe, setAboutMe] = useState('');
//   const [manglik, setManglik] = useState('');

//   const handleSubmit = () => {
//     if (!fullName) return Alert.alert('Validation Error', 'Please enter full name');
//     // Add more validation as needed

//     onSubmit({
//       id: Date.now().toString(),
//       fullName,
//       gender,
//       dob,
//       age,
//       height,
//       maritalStatus,
//       profileCreatedBy,
//       caste,
//       gotra,
//       location,
//       zone,
//       mpZone,
//       rajasthanZone,
//       village,
//       contactNumber,
//       email,
//       highestQualification,
//       educationDetails,
//       occupation,
//       organization,
//       annualIncome,
//       workLocation,
//       fatherOccupation,
//       motherOccupation,
//       siblings,
//       familyType,
//       preferredAgeRange,
//       preferredReligionCaste,
//       preferredEducation,
//       preferredLocation,
//       otherPreferences,
//       aboutMe,
//       manglik,
//     });
//     onClose();
//   };

//   return (
//     <ScrollView>
//       <Text style={styles.sectionTitle}>Basic Information</Text>
//       <View style={styles.formGroup}><Text style={styles.label}>Full Name</Text><TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Enter full name" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Gender</Text><TextInput style={styles.input} value={gender} onChangeText={setGender} placeholder="Enter gender" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Date of Birth</Text><TextInput style={styles.input} value={dob} onChangeText={setDob} placeholder="YYYY-MM-DD" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Age</Text><TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Enter age" keyboardType="numeric" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Height</Text><TextInput style={styles.input} value={height} onChangeText={setHeight} placeholder="Enter height" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Marital Status</Text><TextInput style={styles.input} value={maritalStatus} onChangeText={setMaritalStatus} placeholder="Never Married, Divorced, etc." /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Profile Created By</Text><TextInput style={styles.input} value={profileCreatedBy} onChangeText={setProfileCreatedBy} placeholder="Self, Parent, etc." /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Caste / Community</Text><TextInput style={styles.input} value={caste} onChangeText={setCaste} placeholder="Nagda, Menariya, etc." /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Gotra</Text><TextInput style={styles.input} value={gotra} onChangeText={setGotra} placeholder="Rajguru, Purohit, etc." /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Location</Text><TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Enter location" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Zone</Text><TextInput style={styles.input} value={zone} onChangeText={setZone} placeholder="Enter zone" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>MP Zone</Text><TextInput style={styles.input} value={mpZone} onChangeText={setMpZone} placeholder="Neemuch, Indore, etc." /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Rajasthan Zone</Text><TextInput style={styles.input} value={rajasthanZone} onChangeText={setRajasthanZone} placeholder="Chittorgarh, Nimbahera, etc." /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Village / Locality</Text><TextInput style={styles.input} value={village} onChangeText={setVillage} placeholder="Enter village/locality" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Contact Number</Text><TextInput style={styles.input} value={contactNumber} onChangeText={setContactNumber} placeholder="Enter contact number" keyboardType="phone-pad" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Email</Text><TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter email" keyboardType="email-address" /></View>

//       <Text style={styles.sectionTitle}>Education & Profession</Text>
//       <View style={styles.formGroup}><Text style={styles.label}>Highest Qualification</Text><TextInput style={styles.input} value={highestQualification} onChangeText={setHighestQualification} placeholder="Enter qualification" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Education Details</Text><TextInput style={styles.input} value={educationDetails} onChangeText={setEducationDetails} placeholder="Degree, Institution" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Occupation</Text><TextInput style={styles.input} value={occupation} onChangeText={setOccupation} placeholder="Enter occupation" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Organization / Company Name</Text><TextInput style={styles.input} value={organization} onChangeText={setOrganization} placeholder="Enter organization" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Annual Income</Text><TextInput style={styles.input} value={annualIncome} onChangeText={setAnnualIncome} placeholder="Enter annual income" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Work Location</Text><TextInput style={styles.input} value={workLocation} onChangeText={setWorkLocation} placeholder="Enter work location" /></View>

//       <Text style={styles.sectionTitle}>Family Details</Text>
//       <View style={styles.formGroup}><Text style={styles.label}>Father’s Occupation</Text><TextInput style={styles.input} value={fatherOccupation} onChangeText={setFatherOccupation} placeholder="Enter father's occupation" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Mother’s Occupation</Text><TextInput style={styles.input} value={motherOccupation} onChangeText={setMotherOccupation} placeholder="Enter mother's occupation" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Number of Siblings</Text><TextInput style={styles.input} value={siblings} onChangeText={setSiblings} placeholder="Brothers/Sisters, Married/Unmarried" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Family Type</Text><TextInput style={styles.input} value={familyType} onChangeText={setFamilyType} placeholder="Joint, Nuclear" /></View>

//       <Text style={styles.sectionTitle}>Partner Preferences</Text>
//       <View style={styles.formGroup}><Text style={styles.label}>Preferred Age Range</Text><TextInput style={styles.input} value={preferredAgeRange} onChangeText={setPreferredAgeRange} placeholder="Enter age range" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Preferred Religion / Caste</Text><TextInput style={styles.input} value={preferredReligionCaste} onChangeText={setPreferredReligionCaste} placeholder="Enter religion/caste" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Preferred Education</Text><TextInput style={styles.input} value={preferredEducation} onChangeText={setPreferredEducation} placeholder="Enter education" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Preferred Location</Text><TextInput style={styles.input} value={preferredLocation} onChangeText={setPreferredLocation} placeholder="Enter location" /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Other Preferences</Text><TextInput style={styles.input} value={otherPreferences} onChangeText={setOtherPreferences} placeholder="Diet, Lifestyle, etc." /></View>

//       <Text style={styles.sectionTitle}>Additional Information</Text>
//       <View style={styles.formGroup}><Text style={styles.label}>About Me</Text><TextInput style={styles.input} value={aboutMe} onChangeText={setAboutMe} placeholder="Short bio" multiline /></View>
//       <View style={styles.formGroup}><Text style={styles.label}>Manglik / Non-Manglik</Text><TextInput style={styles.input} value={manglik} onChangeText={setManglik} placeholder="Optional" /></View>

//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Add Profile</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={onClose} style={{ marginTop: 10 }}>
//         <Text style={{ color: '#5B7CFA', textAlign: 'center' }}>Cancel</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionTitle: { fontWeight: 'bold', fontSize: 16, marginTop: 16, marginBottom: 8, color: '#5B7CFA' },
//   formGroup: { marginBottom: 12 },
//   label: { fontWeight: 'bold', marginBottom: 4 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 8,
//     fontSize: 16,
//     backgroundColor: '#f9f9f9',
//   },
//   button: {
//     backgroundColor: '#5B7CFA',
//     padding: 12,
//     borderRadius: 8,
//     marginTop: 16,
//   },
//   buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
// });

// export default AddProfileForm;