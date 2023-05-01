import { createContext } from "react";
import { colors } from "./colors";

export const GlobalVariable = {
  isLoggedIn: false,
  username: '',
  email: '',
  phone_number: '',
  GenderList: [
    { id: 1, text: 'Male', fillColor: colors.maleText, style: { flexDirection: 'column' }, textStyle: { textAlign: 'center', textDecorationLine: 'none', marginLeft: -15 } },
    { id: 2, text: 'Female', fillColor: colors.femaleText, style: { flexDirection: 'column' }, textStyle: { textAlign: 'center', textDecorationLine: 'none', marginLeft: -15 } },
    { id: 3, text: 'Unknown', fillColor: colors.unkownBackground, style: { flexDirection: 'column' }, textStyle: { textAlign: 'center', textDecorationLine: 'none', marginLeft: -15 } },
  ],

  GenderBackgroundColor: [colors.maleBackground, colors.femaleBackground, colors.unkownBackground],
  GenderTextColor: [colors.maleText, colors.femaleText, colors.unkownText],
  GenderText: ['male', 'female', 'unknown'],

  TypeOfferList: [
    { id: 1, text: 'Adoption', fillColor: colors.menu, style: { flexDirection: 'column' }, textStyle: { textAlign: 'center', textDecorationLine: 'none', marginLeft: -15 } },
    { id: 2, text: 'Sale', fillColor: colors.menu, style: { flexDirection: 'column' }, textStyle: { textAlign: 'center', textDecorationLine: 'none', marginLeft: -15 } },
    { id: 3, text: 'Rent', fillColor: colors.menu, style: { flexDirection: 'column' }, textStyle: { textAlign: 'center', textDecorationLine: 'none', marginLeft: -15 } },
    { id: 4, text: 'Coupling', fillColor: colors.menu, style: { flexDirection: 'column' }, textStyle: { textAlign: 'center', textDecorationLine: 'none', marginLeft: -15 } },
  ],
  TypeOfferText: ['Adoption', 'Sale', 'Rent', 'Coupling'],

};
