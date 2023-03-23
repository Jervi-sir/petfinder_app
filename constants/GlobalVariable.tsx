import { colors } from "./colors";

export const GlobalVariable = {
  isLoggedIn: false,
  username: '',
  email: '',
  authToken: '2|rxRcVMvU23BjrUk6V8lkYOrHFkHj4Q6HiZ5HgKYv',

  GenderList: [
    { id: 0, text: 'Male', fillColor: colors.maleText, style: {flexDirection: 'column'},textStyle: {textAlign: 'center', textDecorationLine: 'none', marginLeft: -15}},
    { id: 1, text: 'Female', fillColor: colors.femaleText, style: {flexDirection: 'column'},textStyle: {textAlign: 'center', textDecorationLine: 'none', marginLeft: -15}},
    { id: 2, text: 'Unknown', fillColor: colors.unkownBackground, style: {flexDirection: 'column'},textStyle: {textAlign: 'center', textDecorationLine: 'none', marginLeft: -15}},
  ],

  GenderBackgroundColor: [colors.maleBackground, colors.femaleBackground, colors.unkownBackground],
  GenderTextColor: [colors.maleText, colors.femaleText, colors.unkownText],
  GenderText: ['male', 'female', 'unknown'],

  TypeOfferList: [
    { id: 0, text: 'Adoption', fillColor: colors.menu,  style: {flexDirection: 'column'}, textStyle: {textAlign: 'center', textDecorationLine: 'none', marginLeft: -15} },
    { id: 1, text: 'Sale', fillColor: colors.menu,  style: {flexDirection: 'column'}, textStyle: {textAlign: 'center', textDecorationLine: 'none', marginLeft: -15} },
    { id: 2, text: 'Rent', fillColor: colors.menu,  style: {flexDirection: 'column'}, textStyle: {textAlign: 'center', textDecorationLine: 'none', marginLeft: -15} },
  ],
  TypeOfferText: ['adoption', 'sale', 'rent'],

};