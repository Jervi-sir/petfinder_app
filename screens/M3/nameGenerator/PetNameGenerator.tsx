/* Components */
import { FloatingDropdown } from '@components/FloatingDropdown';
import { MultiselectDropdown } from '@components/MultiselectDropdown';
import { GlobalVariable } from '@constants/GlobalVariable';
import { colors } from '@constants/colors';
import { icons } from '@constants/icons';
import { useHelper } from '@context/HelperContext';
import { formatColorList, formatRacesJson, formatWilayasJson } from '@functions/helpers';
import { useNavigation } from '@react-navigation/native';
import Api from '@utils/Api';
import axios from 'axios';
import { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import BouncyCheckboxGroup, { ICheckboxButton } from 'react-native-bouncy-checkbox-group';
import LottieView from 'lottie-react-native';
import checkmark1 from '@assets/animations/checkmark1.json';
import loading1 from '@assets/animations/loading1.json';
/* Screens */
/* packages */
/* constants */
/* useContexts */
/*--------------*/


export const PetNameGenerator = () => {
  const animationRef = useRef(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const { wilayaHelper, racesHelper, updateWilaya, updateRaces, updateColors, colorsHelper } = useHelper();
  const [gender, setGender] = useState(1);
  const [race_id, setRace] = useState('');
  const [subRace, setSubRace] = useState('');
  const [color, setColor] = useState('');
  const [generatedName, setGeneratedName] = useState('');
  /* from server */
  const [RaceList, setRaceList] = useState([]);
  const [SubRaceList, setSubRaceList] = useState([]);
  const [ColorList, setColorList] = useState([]);

  useEffect(() => {
    if (wilayaHelper == null || racesHelper == null || colorsHelper == null) {
      console.log("they are null");
      axios.get(Api.Server + Api.addPetHelpers)
        .then(response => {
          const data = response.data;

          updateWilaya(formatWilayasJson(data.wilayas));
          updateRaces(formatRacesJson(data.races));
          updateColors(formatColorList(data.races));

          setRaceList(formatRacesJson(data.races));
          setColorList(formatColorList(data.colors));

        })
    } else {
      setRaceList(racesHelper)
      setColorList(colorsHelper)
    }

    let timer;
    if (isDisabled && countdown > 0) {
      // Update the countdown every second
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      // Enable the button when the countdown reaches zero
      setIsDisabled(false);
    }

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [countdown]);


  const handlePress = () => {
    console.log("Press")
    setIsDisabled(true); // Disable the button
    setCountdown(5); // Start countdown from 5 seconds
  };


  const generateName = () => {
    if(race_id === '' || ColorList.length === 0 || isDisabled) return ;
    setIsLoading(true);
    const data = {
      gender, race_id, color, subRace
    };

    axios.post(Api.Server + Api.generatePetName, data, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        handlePress();
        setGeneratedName(response.data.names)
        setIsLoading(false);
        //setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setTimeout(() => {
            //handleRefresh();
          }, 100)
        }, 2345);

      })
      .catch(error => {
        setIsLoading(false);
        setSuccess(false);
        //console.error(error.response.data);
      });
  }
  return (
    <>
      {/* Species */}
      {/* gender */}
      <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'center', height: 55, }}>

      <TouchableOpacity onPress={() => { navigation.goBack() }} style={{ position: 'absolute', top: 2, left: 2 }}>
              <Image source={icons.BACK} style={{ width: 50, height: 50 }} />
            </TouchableOpacity>
            <Text style={{textAlign:'center', color: colors.menu, fontWeight: '600', fontSize: 16}}>Generate a Name for your Pet</Text>
      </View>
      <View style={{width: '80%', flexDirection: 'column', justifyContent: 'center', alignSelf: 'center'}}>
        <View style={{justifyContent:'center', flexDirection: 'row', paddingBottom: 20, paddingTop: 10}}> 
          <View style={{
            width: '80%', height: 100, borderWidth: 1, borderColor: colors.menu, borderRadius: 7, justifyContent: 'center', paddingHorizontal: 10,
            flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', alignContent: 'center'
          }}>
              <Text style={{ color: colors.menu }}>{generatedName[0]}</Text>
              <Text>,{' '}</Text>
              <Text style={{ color: colors.menu }}>{generatedName[1]}</Text>
              <Text>,{' '}</Text>
              <Text style={{ color: colors.menu }}>{generatedName[2]}</Text>
              <Text>,{' '}</Text>
              <Text style={{ color: colors.menu }}>{generatedName[3]}</Text>
              <Text>,{' '}</Text>
              <Text style={{ color: colors.menu }}>{generatedName[4]}</Text>
          </View>
        </View>
        <View>
          <BouncyCheckboxGroup
            data={GlobalVariable.GenderList}
            initial={1}
            style={{ justifyContent: 'space-between', paddingHorizontal: 20 }}
            onChange={(selectedItem: ICheckboxButton) => {
              setGender(selectedItem.id);
            }}
          />
          <View style={{ marginTop: 5, marginBottom: 5 }}></View>
          <FloatingDropdown select='Race' required={true} data={RaceList} onItemSelected={(e) => { setRace(e); }} setItemSelected={e => setSubRaceList(e)} />
          {race_id ? (
            <FloatingDropdown select='Sub Race' required={true} data={SubRaceList} onItemSelected={(e) => { setSubRace(e) }} />
            //<TextInput label="Sub Race" onChangeText={text => setSubRace(text)} style={styles.inputField} />
          ) : (
            null
          )}
          <MultiselectDropdown
            select='Colors'
            data={ColorList}
          />

          <TouchableOpacity
            style={{ backgroundColor: colors.button, borderRadius: 5, padding: 12, paddingHorizontal: 30 }}
            onPress={generateName} 
          >
            <Text style={{ color: colors.white, textAlign: 'center' }}>{isDisabled ? `Cooling down... Please wait (${countdown})` : 'Generate'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {success ? (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, marginTop: -69 }}>
            <LottieView
              ref={animationRef}
              style={{ width: 100, height: 100 }}
              source={checkmark1}
              autoPlay
              duration={3000}
              loop={false}
            />
          </View>
        </View>
      ) : null}
      {isLoading ? (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, marginTop: -69, width: 100, height: 100 }}>
            <LottieView
              ref={animationRef}
              style={{ width: 100, height: 100 }}
              source={loading1}
              autoPlay
              loop={true}
            />
          </View>
        </View>
      ) : null}

      {/* theme: nature, food, historical, pop culture */}
      {/* name origin: english, french, spanish, chinses */}
      {/* style: clssic, trendy, cute, unique */}
      {/* randomized */}
    </>
  )
}