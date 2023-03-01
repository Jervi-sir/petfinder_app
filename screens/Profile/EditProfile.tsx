import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { HeaderSearch } from "../../components/HeaderSearch"
import { StatusBar } from "../../components/StatusBar"
import { COLORS } from "../../constants"
import { TextInput } from 'react-native-paper';


export const EditProfile = () => {
  return (
    <>
      <StatusBar />
      <View style={{margin: 20, }}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
          <TouchableOpacity style={{}}>
            <Image source={require('../../assets/icons/back.png')} style={{ width: 50, height: 50 }}/>
          </TouchableOpacity>
          <Text style={{marginHorizontal: 20, fontSize: 20, color: COLORS.menu}}>Edit My Profile</Text>
        </View>
        <View></View>
        <ScrollView>
          <View style={{backgroundColor: COLORS.white, borderRadius: 13, overflow: 'hidden'}}>
            <View style={{padding: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{backgroundColor: COLORS.menu, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10}}>
                  <Text style={{color: COLORS.white, fontSize: 15}}>choose image</Text>
                </TouchableOpacity>
                <View >
                  <View style={{backgroundColor: COLORS.emptyImg1, width: 100, height: 100, borderRadius: 10}}></View>
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
            <TouchableOpacity style={{backgroundColor: COLORS.menu, padding:10}}>
              <Text style={{color: COLORS.white, fontSize: 15, textAlign: 'center'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <TouchableOpacity style={{padding:10, marginTop: 20}}>
          <Text style={{color: COLORS.menu, fontSize: 15, textAlign: 'center'}}>reset password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding:10, marginTop: 40}}>
          <Text style={{color: COLORS.red, fontSize: 15, textAlign: 'center'}}>delete account</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: COLORS.background,
    marginBottom: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

});