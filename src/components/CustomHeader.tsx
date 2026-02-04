import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';

type CustomHeaderProps = {
  showNotification?: boolean; // default true
  showTranslation?: boolean;  // default true
  onTranslatePress?: () => void;
  onNotificationPress?: () => void;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  showNotification = true,
  showTranslation = true,
  onTranslatePress,
  onNotificationPress,
}) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.header}>
      <Text style={styles.title}>Matrimony</Text>
      <View style={styles.icons}>
        {showNotification && (
          <TouchableOpacity onPress={onNotificationPress}>
            <Image
              source={require('../images/Bell.png')}
              style={styles.avatar}
            />
          </TouchableOpacity>
        )}
        {showTranslation && (
          <TouchableOpacity onPress={onTranslatePress}>
            <Image
              source={require('../images/Language.png')}
              style={styles.avatar}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#5B7CFA',
  },
  header: {
    backgroundColor: '#5B7CFA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginTop: 20,
  },
  avatar: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomHeader;


// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const CustomHeader = () => (
//   <SafeAreaView style={styles.safeArea}>
//     <View style={styles.header}>
//       <Text style={styles.title}>Matrimony</Text>
//       <View style={styles.icons}>
//         <TouchableOpacity>
//           <Image
            
//             source={require('../images/Bell.png')}
//             style={styles.avatar}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Image
//             source={require('../images/Language.png')}
//             style={styles.avatar}
//           />
//         </TouchableOpacity>
//       </View>
//     </View>
//   </SafeAreaView>
// );

// const styles = StyleSheet.create({
//   safeArea: {
//     backgroundColor: '#5B7CFA',
//   },
//   header: {
//     backgroundColor: '#5B7CFA',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     marginTop: 20,
//   },
//   avatar: {
//         width: 30,
//         height: 30,
//     },
//   title: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
//   icons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap:15
//   },
// });

// export default CustomHeader;