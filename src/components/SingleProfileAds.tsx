import React from 'react';
import { View, Image, StyleSheet, Text, FlatList } from 'react-native';
import ProfileCard from './ProfileCard';

const adsBetweenProfiles = [
  { id: 'ad1', image: { uri: 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' } },
  { id: 'ad2', image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s' } },
  { id: 'ad3', image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGgF2jB8Ni3TCaExbN20__46pSvf1pQhBAXQ&s' } },
];

type Props = {
  profiles: any[];
  onProfilePress: (profile: any) => void;
};

type DataWithAdsItem =
  | { type: 'profile'; data: any }
  | { type: 'ad'; id: string; image: { uri: string } };

const SingleProfileAds: React.FC<Props> = ({ profiles, onProfilePress }) => {
  const dataWithAds: DataWithAdsItem[] = [];
  let adIndex = 0;
  for (let i = 0; i < profiles.length; i++) {
    dataWithAds.push({ type: 'profile', data: profiles[i] });
    if ((i + 1) % 5 === 0 && adsBetweenProfiles.length > 0) {
      dataWithAds.push({ type: 'ad', ...adsBetweenProfiles[adIndex % adsBetweenProfiles.length] });
      adIndex++;
    }
  }

  return (
    <FlatList
      snapToInterval={180} // height of one card+margin (adjust as needed)
      decelerationRate="normal" // or try "normal" for slower
      data={dataWithAds}
      keyExtractor={(item, idx) =>
        item.type === 'profile'
          ? item.data.id?.toString() || item.data._id?.toString() || idx.toString()
          : item.id?.toString() || `ad-${idx}`
      }
      renderItem={({ item }) => {
        if (item.type === 'profile') {
          const profile = item.data;
          return (
            <ProfileCard
              name={profile.fullName}
              age={profile.age}
              gender={profile.gender}
              zone={profile.zone}
              onPress={() => onProfilePress(profile)}
            />
          );
        } else if (item.type === 'ad') {
          return (
            <View style={styles.adContainer}>
              <Image
                source={item.image}
                style={styles.adImage}
                resizeMode="cover"
              />
            </View>
          );
        }
        return null;
      }}
      ListEmptyComponent={
        <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>
          No profiles found.
        </Text>
      }
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    />
  )
};

const styles = StyleSheet.create({
  adContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  adImage: {
    width: '90%',
    height: 100,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#3AB6FF',
  },
});

export default SingleProfileAds;