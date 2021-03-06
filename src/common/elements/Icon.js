import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
// import PropTypes from './node_modules/prop-types';
// import { ThemeContext } from '../../constants/theme';
import { getIconType } from './helpers';

// Possible icon set supported by this Icon component
export const IconTypes = [
  'zocial',
  'octicon',
  'material',
  'material-community',
  'ionicon',
  'foundation',
  'evilicon',
  'entypo',
  'font-awesome',
  'font-awesome-5',
  'fontisto',
  'simple-line-icon',
  'feather',
  'antdesign',
];

// const propTypes = {
//   /**
//    * Name of the icon to be shown
//    *
//    * Search here: https://oblador.github.io/react-native-vector-icons/
//    */
//   name: PropTypes.string,
//   /**
//    * type of icon set. Available Icon set are
//    * - material
//    * - material-community
//    * - font-awesome
//    * - font-awesome-5
//    * - octicon
//    * - ionicon
//    * - foundation
//    * - evilicon
//    * - simple-line-icon
//    * - zocial
//    * - entypo
//    * - feather
//    * - antdesign
//    * - fontisto
//    *
//    * Default value is 'material'
//    */
//   type: PropTypes.oneOf(IconTypes),
//   /**
//    * size of icon (optional)
//    */
//   size: PropTypes.number,
//   /**
//    * color of icon (optional)
//    *
//    * If provided, it will be used for icon and Image tint color, if not, then default theme.iconColor for only icon
//    */
//   color: PropTypes.string,
//   /**
//    * Callback to call when Icon is clicked
//    */
//   onPress: PropTypes.func,
//   /**
//    * If true, the onPress callback won't be called
//    */
//   disabled: PropTypes.bool,
//   /**
//    * additional styling to icon (optional)
//    */
//   style: Text.propTypes.style,
// };

const defaultProps = {
  name: '',
  type: 'material',
  onPress: null,
  disabled: false,
  size: 25,
  color: null,
  style: {},
};

const Icon = ({ name, type, size, color, style, onPress, disabled }) => {
  // const { theme } = useContext(ThemeContext);

  const Component = onPress ? TouchableOpacity : React.Fragment;

  const IconComponent = getIconType(type);

  return (
    <Component
      {...(onPress && {
        onPress,
        disabled,
      })}
    >
      <IconComponent
        size={size}
        name={name}
        color={disabled ? 'grey' : color || 'black'}
        style={StyleSheet.flatten([styles.iconStyle, style])}
      />
    </Component>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    backgroundColor: 'transparent',
  },
});

// Icon.propTypes = propTypes;

Icon.defaultProps = defaultProps;

export default Icon;