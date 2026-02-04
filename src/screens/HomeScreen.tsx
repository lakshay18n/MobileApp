import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import AdsSliderRectangle from '../components/AdsSliderRectangle';
import SearchBarWithFilter from '../components/SearchBarWithFilter';
import ProfileCard from '../components/ProfileCard';
import SingleProfileAds from '../components/SingleProfileAds';
// import { useProfiles } from '../context/ProfileContext'; // <-- import context

const HomeScreen = ({ navigation }: any) => {

    const [filterActive, setFilterActive] = useState(false);
    const [filteredProfiles, setFilteredProfiles] = useState<any[]>([]);




    const handleFilterApply = (profiles: any[]) => {
        setFilteredProfiles(profiles);
        setFilterActive(true);
    };

    // // Show profiles only if search is not empty or filter is active
    // const shouldShowProfiles = search.trim().length > 0 || filterActive;

    return (
        <View style={styles.container}>
            <CustomHeader />
            <AdsSliderRectangle />
            <SearchBarWithFilter onFilterApply={handleFilterApply}
                profileCount={filteredProfiles.length}
                onClearAll={() => {
                    setFilteredProfiles([]);
                    setFilterActive(false);
                }}
                filterActive={filterActive}
            />
            {filterActive && (
                // <ScrollView style={{ marginTop: 16, marginBottom: 100 }}>
                //     {filteredProfiles.length > 0 ? (
                //         filteredProfiles.map(profile => (
                //             <ProfileCard
                //                 key={profile.id || profile._id}
                //                 name={profile.fullName}
                //                 age={profile.age}
                //                 gender={profile.gender}
                //                 zone={profile.zone}
                //                 onPress={() =>
                //                     // Alert.alert(`your profiledard tages and profiles is ${profile}`)
                //                     // navigation.navigate('ViewProfile') // pass entire profile
                //                     // navigation.navigate('Home', { screen: 'ViewProfile', params: { profile } })
                //                     navigation.navigate('ViewProfile', { profile })
                //                 }
                //             />
                //         ))
                //     ) : (
                //         <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>
                //             No profiles found.
                //         </Text>
                //     )}
                // </ScrollView>

                // <ScrollView style={{ marginTop: 16, marginBottom: 100 }}>
                    <SingleProfileAds
                        profiles={filteredProfiles}
                        onProfilePress={(profile: any) => navigation.navigate('ViewProfile', { profile })}
                    />
                

                
            )}
            <View style={styles.content}>
                <Text></Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;