import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type BadgeProps = {
  count: number;
};

const Badge: React.FC<BadgeProps> = ({ count }) => {
  if (!count || count < 1) return null;
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -2,
    top: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    zIndex: 99,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Badge;