import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApply }) => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(25);
  const [gotra, setGotra] = useState('');
  const [zone, setZone] = useState('');
  const [minPreferredAgeRange, setminPreferredAgeRange] = useState(25);
  const [maxPreferredAgeRange, setmaxPreferredAgeRange] = useState(25);
  const [manglik, setManglik] = useState('');

  const handleApply = () => {
    onApply({
      gender,
      age,
      gotra,
      zone,
      minPreferredAgeRange,
      maxPreferredAgeRange,
      manglik,
    });
    onClose();
  };





  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.filterTitle}>Filter</Text>

          <Text style={styles.label}>Gender</Text>
          <Picker
            selectedValue={gender}
            onValueChange={setGender}
            style={styles.picker}
          >
            <Picker.Item label="Any" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>

          <Text style={styles.label}>Your Gotra</Text>
          <Picker
            selectedValue={gotra}
            onValueChange={setGotra}
            style={styles.picker}
          >
            <Picker.Item label="Any" value="" />
            <Picker.Item label="Rajguru" value="Rajguru" />
            <Picker.Item label="Purohit" value="Purohit" />
          </Picker>

          <Text style={styles.label}>Zone</Text>
          <Picker
            selectedValue={zone}
            onValueChange={setZone}
            style={styles.picker}
          >
            <Picker.Item label="All" value="All" />
            <Picker.Item label="MP zone" value="MP zone" />
            <Picker.Item label="Udaipur zone" value="Udaipur zone" />
            <Picker.Item label="Girva zone" value="Girva zone" />
          </Picker>

          <Text style={styles.label}>Select Required Age:</Text>
          <Text style={styles.label}>Minimum Age: {minPreferredAgeRange}</Text>
          <Slider
            minimumValue={18}
            maximumValue={60}
            value={minPreferredAgeRange}
            onValueChange={setminPreferredAgeRange}
            step={1}
            style={{ width: '100%' }}
          />
          <Text style={styles.label}>Maximum Age: {maxPreferredAgeRange}</Text>
          <Slider
            minimumValue={18}
            maximumValue={60}
            value={maxPreferredAgeRange}
            onValueChange={setmaxPreferredAgeRange}
            step={1}
            style={{ width: '100%' }}
          />

          <Text style={styles.label}>Manglik</Text>
          <Picker
            selectedValue={manglik}
            onValueChange={setManglik}
            style={styles.picker}
          >
            <Picker.Item label="No" value="No" />
            <Picker.Item label="Yes" value="Yes" />

          </Picker>

          <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
            <Text style={styles.applyBtnText}>Apply</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={{ color: '#5B7CFA', textAlign: 'center', marginTop: 10, }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    elevation: 10,
    maxHeight: '90%',
  },
  filterTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 16, textAlign: 'center' },
  label: { fontWeight: 'bold', marginTop: 10 },
  picker: { backgroundColor: '#f9f9f9', borderRadius: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  applyBtn: { backgroundColor: '#5B7CFA', borderRadius: 8, padding: 12, marginTop: 16 },
  applyBtnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default FilterModal;