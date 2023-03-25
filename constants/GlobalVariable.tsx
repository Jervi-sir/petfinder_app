import { colors } from "./colors";

export const GlobalVariable = {
  isLoggedIn: false,
  username: '',
  email: '',
  authToken: '1|j6IkdUCiNa2aomR5fAV1xjP8yV0NOlTwqK5Yla2A',

  GenderList: [
    { id: 0, text: 'Male', fillColor: colors.maleText, style: { flexDirection: 'column' }, textStyle: { textAlign: 'center', textDecorationLine: 'none', marginLeft: -15 } },
    { id: 1, text: 'Female', fillColor: colors.femaleText, style: { flexDirection: 'column' }, textStyle: { textAlign: 'center', textDecorationLine: 'none', marginLeft: -15 } },
    { id: 2, text: 'Unknown', fillColor: colors.unkownBackground, style: { flexDirection: 'column' }, textStyle: { textAlign: 'center', textDecorationLine: 'none', marginLeft: -15 } },
  ],

  GenderBackgroundColor: [colors.maleBackground, colors.femaleBackground, colors.unkownBackground],
  GenderTextColor: [colors.maleText, colors.femaleText, colors.unkownText],
  GenderText: ['male', 'female', 'unknown'],

  TypeOfferList: [
    { id: 0, text: 'Adoption', fillColor: colors.menu, style: { flexDirection: 'column' }, textStyle: { textAlign: 'center', textDecorationLine: 'none', marginLeft: -15 } },
    { id: 1, text: 'Sale', fillColor: colors.menu, style: { flexDirection: 'column' }, textStyle: { textAlign: 'center', textDecorationLine: 'none', marginLeft: -15 } },
    { id: 2, text: 'Rent', fillColor: colors.menu, style: { flexDirection: 'column' }, textStyle: { textAlign: 'center', textDecorationLine: 'none', marginLeft: -15 } },
  ],
  TypeOfferText: ['adoption', 'sale', 'rent'],

};