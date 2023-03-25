import moment from 'moment';
import { Linking } from 'react-native';

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
  //console.log(`tel:${phoneNumber}`);
  Linking.openURL(`tel:${phoneNumber}`);
}