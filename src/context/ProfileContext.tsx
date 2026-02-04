import React, { createContext, useState, useContext } from 'react';

type Profile = {
  id: string;
  fullName: string;
  gender: string;
  dob: string;
  age: string;
  height: string;
  maritalStatus: string;
  profileCreatedBy: string;
  caste: string;
  gotra: string;
  location: string;
  zone: string;
  mpZone: string;
  rajasthanZone: string;
  village: string;
  contactNumber: string;
  email: string;
  highestQualification: string;
  educationDetails: string;
  occupation: string;
  organization: string;
  annualIncome: string;
  workLocation: string;
  fatherOccupation: string;
  motherOccupation: string;
  siblings: string;
  familyType: string;
  preferredAgeRange: string;
  preferredReligionCaste: string;
  preferredEducation: string;
  preferredLocation: string;
  otherPreferences: string;
  aboutMe: string;
  manglik: string;
  avatar?: string;
  createdByUserPhone: string;
};

type ProfileContextType = {
  profiles: Profile[];
  addProfile: (profile: Profile) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const addProfile = (profile: Profile) => setProfiles(prev => [...prev, profile]);

  return (
    <ProfileContext.Provider value={{ profiles, addProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfiles = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
};