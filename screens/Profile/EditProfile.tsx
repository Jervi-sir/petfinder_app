import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { TextInput } from 'react-native-paper';
import { HeaderSearch } from "../../components/HeaderSearch";
import { StatusBar } from "../../components/StatusBar";
import { colors } from "../../constants/colors";
import { icons } from "../../constants/icons";

export const EditProfile = () => {
  return (
    <>
      <StatusBar />
      <View style={{margin: 20, }}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
          <TouchableOpacity style={{}}>
            <Image source={icons.BACK} style={{ width: 50, height: 50 }}/>
          </TouchableOpacity>
          <Text style={{marginHorizontal: 20, fontSize: 20, color: colors.menu}}>Edit My Profile</Text>
        </View>
        <View></View>
        <ScrollView>
          <View style={{backgroundColor: colors.white, borderRadius: 13, overflow: 'hidden'}}>
            <View style={{padding: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{backgroundColor: colors.menu, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}}>
                  <Text style={{color: colors.white, fontSize: 15}}>choose image</Text>
                </TouchableOpacity>
                <View >
                  <View style={{backgroundColor: colors.emptyImg1, width: 100, height: 100, borderRadius: 10}}></View>
                </View>
              </View>
              <View style={{marginTop: 20}}>
                <TextInput
                  style={styles.inputField}
                  label="Name"
                />
                <TextInput
                  style={styles.inputField}
                  label="Location"
                />
                <TextInput
                  style={styles.inputField}
                  label="Phone Number"
                />
              </View>
            </View>
            <TouchableOpacity style={{backgroundColor: colors.menu, padding:10}}>
              <Text style={{color: colors.white, fontSize: 15, textAlign: 'center'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity style={{padding:10, marginTop: 20}}>
          <Text style={{color: colors.menu, fontSize: 15, textAlign: 'center'}}>reset password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding:10, marginTop: 40}}>
          <Text style={{color: colors.red, fontSize: 15, textAlign: 'center'}}>delete account</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: colors.background,
    marginBottom: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

});