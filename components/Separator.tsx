import DashedLine from 'react-native-dashed-line';
import { colors } from '../constants/colors';

export const Separator = () => {
  return (
    <>
      <DashedLine dashLength={10} dashThickness={2} dashGap={7} dashColor={colors.dash} />
    </>
  )
}