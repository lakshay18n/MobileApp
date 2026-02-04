import React from 'react';
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const AD_SIZE = width * 0.85; // 85% of screen width

const SquareAd: React.FC = () => {
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGgF2jB8Ni3TCaExbN20__46pSvf1pQhBAXQ&s' }}
                style={styles.image}
                resizeMode="cover"
            />
            <View style={styles.textContainer}>
                <Text style={styles.sponsoredText}>Sponsored By XYZ</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: AD_SIZE,
        height: AD_SIZE,
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
        marginTop: 24,
    },
    image: {
        width: '90%',
        height: '75%',
        borderRadius: 16,
        backgroundColor: '#f0f0f0',
    },
    textContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    sponsoredText: {
        fontSize: 20,
        color: '#3b3b3b',
        fontWeight: 'bold',
        textAlign: 'center',

    },
});

export default SquareAd;