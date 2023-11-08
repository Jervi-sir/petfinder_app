import moment from 'moment';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native'

export const calculateAge = (date) => {
  let dob;
  let age;

  const dateArray = date.split('/');
  const year = dateArray[0];
  const month = dateArray[1];
  const day = dateArray[2];

  const selectedDate = moment(`${year}-${month + 1}-${day}`, 'YYYY-MM-DD');
  dob = (selectedDate.format('DD-MM-YYYY'));
  const ageInYears = moment().diff(selectedDate, 'years');
  selectedDate.add(ageInYears, 'years');
  const ageInMonths = moment().diff(selectedDate, 'months');
  selectedDate.add(ageInMonths, 'months');
  const ageInDays = moment().diff(selectedDate, 'days');

  age = (`${ageInYears} years, ${ageInMonths} months, ${ageInDays} days`);

  const stringYears = ageInYears == 0 ? '' : (ageInYears + ' Years, ');
  const stringMonths = ageInMonths == 0 ? '' : (ageInMonths + ' Months, ');
  const stringDays = ageInDays == 0 ? '' : (ageInDays + ' Days');

  return stringYears + stringMonths + stringDays;
};

export const makePhoneCall = (phoneNumber) => {
  phoneNumber = phoneNumber.replaceAll('(', '').replaceAll(')', '').replaceAll('-', '').replaceAll(' ', '');
  if (Platform.OS === 'ios') {
    phoneNumber = `telprompt:${phoneNumber}`;
  }
  else {
    phoneNumber = `tel:${1234567890}`;
  }
  Linking.openURL(phoneNumber);
}

export const displayAge = (date) => {
  let dob;
  let age;

  const dateArray = date.split('/');
  const year = dateArray[0];
  const month = dateArray[1];
  const day = dateArray[2];

  const selectedDate = moment(`${year}-${month + 1}-${day}`, 'YYYY-MM-DD');
  dob = (selectedDate.format('DD-MM-YYYY'));
  const ageInYears = moment().diff(selectedDate, 'years');
  selectedDate.add(ageInYears, 'years');
  const ageInMonths = moment().diff(selectedDate, 'months');
  selectedDate.add(ageInMonths, 'months');
  const ageInDays = moment().diff(selectedDate, 'days');

  age = (`${ageInYears} years, ${ageInMonths} months, ${ageInDays} days`);

  const stringYears = ageInYears == 0 ? '' : (ageInYears + ' y, ');
  const stringMonths = ageInMonths == 0 ? '' : (ageInMonths + ' m, ');
  const stringDays = ageInDays == 0 ? '' : (ageInDays + ' d');

  return stringYears + stringMonths + (ageInYears > 0 ? '' : stringDays);
};


export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const isValidPassword = (password) => {
  const passwordRegex = /^.{8,}$/;
  return passwordRegex.test(password);
};

export const formatPhoneNumber = (input) => {
  input = input.replace(/[^\d]/g, '');
  input = input.substring(0, 10);
  let formatted = '';
  for (let i = 0; i < input.length; i++) {
    const digit = input[i];
    if (i === 0) { formatted += '('; }
    if (i === 4) { formatted += ') '; }
    if (i === 6 || i === 8) { formatted += ' '; }
    formatted += digit;
  }
  return formatted;
};

/* the json from server should be like so: [id, name, number] */
export const formatWilayasJson = (data) => {
  return data.map(item => ({
    label: item.number + ' - '+ item.label + ' - '+ item.arabic,
    value: item.number
  }));
}

/* the json from server should be like so: [id, name, number] */
export const formatRacesJson = (data) => {
  return data.map(item => ({
    label: item.french + ' - ' + item.arabic,
    value: item.id,
    subRaces: item.sub_races.map(sub => ({
      label: sub.label + ' - ' + sub.arabic,
      value: sub.id
    }))
  }));
}

export const formatColorList = (data) => {
  return data.map(item => ({
    label: item.label,
    value: item.value,
    french: item.french,
    arabic: item.arabic,
    color: item.color,
  }));
}

