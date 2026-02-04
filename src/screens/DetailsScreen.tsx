import React from 'react';
import { View, Text, StyleSheet, ScrollView ,Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomHeader from '../components/CustomHeader';

const DetailsScreen = () => {
  return (
    <View
    >   <CustomHeader />
      <ScrollView contentContainerStyle={styles.container}>

        {/* Creators */}
        <View style={[styles.card, { backgroundColor: '#EAF1FF', }]}>
          <Text style={creatorStyles.heading}>Developers</Text>
          <View style={creatorStyles.row}>
            {/* Creator 1 */}
            <View style={creatorStyles.creatorCard}>
              <Image
                source={require('../images/antim.jpg')}
                style={creatorStyles.avatar}
              />
              <Text style={creatorStyles.creatorName}>ANTIM NAGDA</Text>
              <Text style={creatorStyles.fatherName}>s/o Kailash Nagda</Text>
            </View>
            {/* Creator 2 */}
            <View style={creatorStyles.creatorCard}>
              <Image
                source={require('../images/lucky.jpg')}
                style={creatorStyles.avatar}
              />
              <Text style={creatorStyles.creatorName}>LAKSHAY NAGDA</Text>
              <Text style={creatorStyles.fatherName}>s/o Nagesh Nagda</Text>
            </View>
          </View>
        </View>

        {/* About App */}
        <View style={styles.card}>
          
          <Text style={styles.heading}>About the App</Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Matrimony App</Text> is your trusted platform to find the perfect life partner within your community. Create your profile, search, and connect with ease and privacy.
          </Text>
        </View>

        {/* How to Use */}
        <View style={styles.card}>
         
          <Text style={styles.heading}>How to Use</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}><Text style={styles.bulletDot}>•</Text> Create your profile with all details.</Text>
            <Text style={styles.bullet}><Text style={styles.bulletDot}>•</Text> Search and filter for suitable matches.</Text>
            <Text style={styles.bullet}><Text style={styles.bulletDot}>•</Text> View detailed profiles and connect.</Text>
            <Text style={styles.bullet}><Text style={styles.bulletDot}>•</Text> Add and manage your own profiles anytime.</Text>
          </View>
        </View>

        {/* Contact & Support */}
        <View style={styles.card}>
         
          <Text style={styles.heading}>Contact & Support</Text>
          <Text style={styles.text}>
            For queries or support, email:{'\n'}
            <Text style={styles.email}>support@matrimonyapp.com</Text>
          </Text>
        </View>

        {/* Disclaimer */}
        <View style={[styles.card, { backgroundColor: '#FFF6E5' }, { marginBottom: 200 }]}>
          
          <Text style={[styles.heading, { color: '#FFA726' }]}>Disclaimer</Text>
          <Text style={[styles.text, { color: '#A67C00' }]}>
            This app is for community use only. Please verify all information independently. The creators are not responsible for any misuse.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F5F8FF',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 3,
    shadowColor: '#5B7CFA',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#5B7CFA',
    marginBottom: 6,
    marginTop: 2,
  },
  text: {
    fontSize: 15,
    color: '#333',
    marginBottom: 4,
    lineHeight: 22,
  },
  bulletList: {
    marginLeft: 8,
    marginTop: 2,
    marginBottom: 4,
  },
  bullet: {
    fontSize: 15,
    color: '#333',
    marginBottom: 2,
    lineHeight: 22,
  },
  bulletDot: {
    color: '#5B7CFA',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 4,
  },
  creatorName: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
    marginBottom: 2,
    marginLeft: 8,
  },
  email: {
    color: '#5B7CFA',
    fontWeight: 'bold',
  },
});

const creatorStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  creatorCard: {
    width: 180,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 28,
    borderWidth: 4,
    borderColor: '#3AB6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    elevation: 2,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 30,
    marginBottom: 5,
    backgroundColor: '#e0e0e0',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#5B7CFA',
    marginBottom: 6,
    marginTop: 2,
  },
  creatorName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111',
    textAlign: 'center',
    marginBottom: 2,
    marginTop: 2,
  },
  fatherName: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#111',
    textAlign: 'center',
  },
});

export default DetailsScreen;