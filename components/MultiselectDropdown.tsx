import React, { useState } from 'react';
  import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
  import { MultiSelect } from 'react-native-element-dropdown';
  import Entypo from '@expo/vector-icons/Entypo';
  import { colors } from '@constants/colors';

  /*const data = [
    {label: "Black", value: "black", french: "Noir", arabic: "أسود", color: "#000000"},
    {label: "White", value: "white", french: "Blanc", arabic: "أبيض", color: "#FFFFFF"},
    {label: "Brown", value: "brown", french: "Marron", arabic: "بني", color: "#A52A2A"},
    {label: "Tan", value: "tan", french: "Fauve", arabic: "أصفر بُنيّ", color: "#D2B48C"},
    {label: "Cream", value: "cream", french: "Crème", arabic: "كريمي", color: "#FFFDD0"},
    {label: "Grey", value: "grey", french: "Gris", arabic: "رمادي", color: "#808080"},
    {label: "Red", value: "red", french: "Rouge", arabic: "أحمر", color: "#FF0000"},
    {label: "Gold", value: "gold", french: "Or", arabic: "ذهبي", color: "#FFD700"},
    {label: "Blue", value: "blue", french: "Bleu", arabic: "أزرق", color: "#0000FF"},
    {label: "Bicolor", value: "bicolor", french: "Bicolore", arabic: "ثنائي اللون", color: "#FFFFFF"}, // A default color, bicolor would be a mix
    {label: "Tricolor", value: "tricolor", french: "Tricolore", arabic: "ثلاثي الألوان", color: "#FFFFFF"}, // A default color, tricolor would be a mix
    {label: "Tuxedo", value: "tuxedo", french: "Smoking", arabic: "بدلة", color: "#000000"}, // Often black and white
    {label: "Tortoiseshell", value: "tortoiseshell", french: "Écaille de tortue", arabic: "صدفة السلحفاة", color: "#8A2BE2"}, // A mix, but often a dark multicolor
    {label: "Calico", value: "calico", french: "Calicot", arabic: "القط السعداني", color: "#FFFFFF"}, // A default color, calico would be a mix
    {label: "Tabby", value: "tabby", french: "Tigré", arabic: "مخطط", color: "#C0C0C0"}, // A default color, tabby would vary
    {label: "Brindle", value: "brindle", french: "Bringé", arabic: "بريندل", color: "#A52A2A"}, // A mix, often a form of brown or tan
    {label: "Merle", value: "merle", french: "Merle", arabic: "ميرل", color: "#1C39BB"}, // A mix, but with a distinctive pattern
    {label: "Harlequin", value: "harlequin", french: "Arlequin", arabic: "هارلكين", color: "#FFFFFF"}, // A default color, harlequin would be a mix
    {label: "Spotted", value: "spotted", french: "Tacheté", arabic: "منقط", color: "#54626F"}, // A default color, spotted would vary
    {label: "Roan", value: "roan", french: "Rouan", arabic: "روان", color: "#B0C4DE"}, // A mix, a specific texture
    {label: "Pointed", value: "pointed", french: "Colourpoint", arabic: "مدبب اللون", color: "#C0C0C0"} // A default color, pointed patterns would vary
  ];
  */
  export const MultiselectDropdown = ({ select = 'title', required = false, data, hasSearch = false, setItemSelected = null }) => {
    const [selected, setSelected] = useState([]);
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

    const renderItem = item => {
      return (
        <View style={{flexDirection: 'row', alignItems: 'center', height: 40, paddingHorizontal: 10}}>
          <View style={{ width: 20, height: 20, backgroundColor: item.color}}></View>
          <Text style={styles.selectedTextStyle}>{item.label}</Text>
          <Text style={styles.selectedTextStyle}>{item.arabic}</Text>
        </View>
      );
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <MultiSelect
          style={[styles.dropdown, isFocus && { borderBottomColor: '#4a148c', borderBottomWidth: 2 }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          activeColor={colors.background}
          data={data}
          search={hasSearch}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select ' + select + (required ? ' *' : '') : '...'}
          value={selected}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          searchPlaceholder="Search..."
          onChange={item => {
            setSelected(item);
            setIsFocus(false);
          }}

          renderItem={renderItem}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles.selectedStyle}>
                <View style={{ width: 20, height: 20, backgroundColor: item.color}}></View>
                <Entypo color="black" name="cross" size={17} />
              </View>
            </TouchableOpacity>
          )}
          alwaysRenderSelectedItem
        />
      </View>
    );
  };

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
    selectedStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 7,
      borderColor: 'white',
      borderWidth: 1,
      shadowColor: '#000',
      marginVertical: 4,
      marginLeft: 12,
      paddingHorizontal: 8,
      paddingVertical: 6,

      elevation: 2,
    },
    textSelectedStyle: {
      marginRight: 5,
      fontSize: 16,
    },

  });
