import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { colors } from '@constants/colors';


export const FloatingDropdown = ({ select = 'title', required = false, data, onItemSelected, hasSearch = false, setItemSelected = null }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: '#4a148c' }]}>
          {select}
          {required ? (<Text style={{ color: colors.red }}> *</Text>) : null}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderBottomColor: '#4a148c', borderBottomWidth: 2 }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search={hasSearch}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select ' + select + (required ? ' *' : '') : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          onItemSelected(item.value);
          if(setItemSelected){
            setItemSelected(item.subRaces)
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingTop: 9,
    paddingHorizontal: 0,
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dropdown: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    paddingLeft: 5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: 10,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 13,
    opacity: 0.7,
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: 13,
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingLeft: 13,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
