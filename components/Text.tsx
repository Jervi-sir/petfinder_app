import { Text as TT } from "react-native"

export const Text = ({ weight = '500', size = 14, color = 'black', style = {}, children, ...props }) => {
  let fontName = 'Poppins-Regular';
  switch(weight) {
    case '800': fontName = 'Poppins-Black'; break;
    case '700': fontName = 'Poppins-Bold'; break;
    case '600': fontName = 'Poppins-Medium'; break;
    case '500': fontName = 'Poppins-Regular'; break;
    case '400': fontName = 'Poppins-Light'; break;
    case '300': fontName = 'Poppins-Thin'; break;
    default:  // code block
  }

  return (
    <TT style={[{ fontSize: size, color: color }, style]} {...props}>
      {children}
    </TT>
  );
};