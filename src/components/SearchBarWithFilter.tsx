import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert, Text } from 'react-native';
import axios from 'axios';
import FilterModal from './FilterModal';

const SearchBarWithFilter = ({ onFilterApply , profileCount,onClearAll,filterActive }: any) => {
  const [filterVisible, setFilterVisible] = useState(false);

  const handleFilterApply = async (filters: any) => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/api/getdata/filter', filters);
      if (onFilterApply) onFilterApply(response.data); // send data back to Home screen
      setFilterVisible(false); // hide modal
    } catch (err) {
      Alert.alert('Error', 'Error fetching filtered profiles');
      setFilterVisible(false);
    }
  };

  return (
     <View style={styles.wrapper}>
      {/* Top Row: Single pill with overlapping Search button */}
      <View style={styles.outerPillRow}>
        <View style={styles.outerPill}>
          <Text style={styles.pillText}>Find Your Match</Text>
          <TouchableOpacity style={styles.searchButton} onPress={() => setFilterVisible(true)}>
            <Text style={styles.searchText}>Search</Text>
            <Image source={require('../images/Search.png')} style={styles.searchIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Row */}
      {filterActive && (
        <View style={styles.row}>
          <View style={styles.pillLeft}>
            <Text style={styles.pillText}>Profiles</Text>
            <View style={styles.countCircle}>
              <Text style={styles.countText}>{profileCount}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.pillRight} onPress={onClearAll}>
            <Text style={styles.pillText}>Clear All</Text>
            <Text style={styles.clearX}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={handleFilterApply}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  outerPillRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  outerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF1FF',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#3AB6FF',
    height: 38,
    width: '100%',
    minWidth: 260,
    paddingLeft: 22,
    paddingRight: 0,
    position: 'relative',
    elevation: 4,
    shadowColor: '#5B7CFA',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  pillText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 20,
    marginRight: 6,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF1FF',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#3AB6FF',
    height: 38,
    paddingHorizontal: 18,
    position: 'absolute',
    right: -2, // Overlap the outer border
    // top: 2,
    zIndex: 2,
    elevation: 2,
    shadowColor: '#5B7CFA',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  searchText: {
    color: '#111',
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 6,
  },
  searchIcon: {
    width: 22,
    height: 22,
    tintColor: '#3AB6FF',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pillLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF1FF',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#3AB6FF',
    paddingHorizontal: 22,
    height: 35,
    marginRight: 10,
    width: 180,
  },
  pillRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF1FF',
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#3AB6FF',
    paddingHorizontal: 22,
    height: 35,
    width: 145,
  },
  countCircle: {
    backgroundColor: '#3AB6FF',
    borderRadius: 12,
    width: 50,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  countText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clearX: {
    color: '#3AB6FF',
    fontWeight: '900',
    fontSize: 22,
    marginLeft: 8,
  },
});


export default SearchBarWithFilter;