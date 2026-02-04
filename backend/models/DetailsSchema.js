const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: String,
  dob: String,
  age: String,
  height: String,
  maritalStatus: String,
  profileCreatedBy: String,
  caste: String,
  gotra: String,
  location: String,
  zone: String,
  mpZone: String,
  rajasthanZone: String,
  village: String,
  contactNumber: String,
  email: String,

  // Education & Profession
  highestQualification: String,
  educationDetails: String,
  occupation: String,
  organization: String,
  annualIncome: String,
  workLocation: String,

  // Family
  fatherOccupation: String,
  motherOccupation: String,
  siblings: String,
  familyType: String,

  // Partner Preferences
  preferredAgeRange: String,
  preferredReligionCaste: String,
  preferredEducation: String,
  preferredLocation: String,
  otherPreferences: String,
  createdByUserPhone: { type: String, required: true },
  // Additional Info
  aboutMe: String,
  manglik: String,
}, { collection: 'profiles', timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
