
/**
 * Usage:
 *  Shadow
 * -   
<Block card width={100} height ={100} shadow white >

</Block> 
 */


import React from "react";
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from "react-native";

import expoTheme from "./theme";
import { mergeTheme, getMargins, getPaddings } from "./helpers";

const Block = (props) => {
  const {
    flex = false,
    noflex = false,
    row = false,
    column = false,
    center = false,
    middle = false,
    around = false,
    left = false,
    right = false,
    top = false,
    bottom = false,
    card = false,
    shadow = null,
    shadow2 = null,
    shadow3 = null,
    shadow4 = null,
    // colors
    color = null,
    primary = false,
    secondary = false,
    tertiary = false,
    black = false,
    white = false,
    gray = false,
    error = false,
    warning = false,
    success = false,
    info = false,
    // size & positioning
    width = null,
    height = null,
    space = null,
    radius = null,
    wrap = false,
    // custom styling
    style = {},
    theme = {},
    // variations
    animated = false,
    safe = false,
    scroll = false,
    children = null,
    // sizing props
    margin,
    marginHorizontal,
    marginVertical,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    padding,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    // extra props
    ...rest
  } = props;
  const { SIZES, COLORS } = mergeTheme(expoTheme, theme);
  const marginSpacing = getMargins({
    margin,
    marginHorizontal,
    marginVertical,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    defaultValue: SIZES.base
  });
  const paddingSpacing = getPaddings({
    padding,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
    defaultValue: SIZES.base
  });

  const blockStyles = StyleSheet.flatten([
    styles.block,
    flex && { flex: flex === true ? 1 : flex },
    (!flex || noflex) && { flex: 0 },
    row && styles.row,
    column && styles.column,
    center && styles.center,
    middle && styles.middle,
    around && styles.around,
    left && styles.left,
    right && styles.right,
    top && styles.top,
    bottom && styles.bottom,
    marginSpacing,
    paddingSpacing,
    wrap && styles.wrap,
    shadow && { shadowColor: "#000", shadowOffset: { width: 0, height: 2,}, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 4 },
    shadow2 && { shadowColor: "#000", shadowOffset: { width: 0, height: 3,}, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6 },
    shadow3 && { shadowColor: "#000", shadowOffset: { width: 0, height: 4,}, shadowOpacity: 0.30, shadowRadius: 4.65, elevation: 8 },
    shadow4 && { shadowColor: "#000", shadowOffset: { width: 0, height: 5,}, shadowOpacity: 0.34, shadowRadius: 6.27, elevation: 10 },
    space && { justifyContent: `space-${space}` },
    card && { borderRadius: SIZES.radius },
    radius && { borderRadius: radius },
    // color shortcuts
    primary && { backgroundColor: COLORS.primary },
    secondary && { backgroundColor: COLORS.secondary },
    tertiary && { backgroundColor: COLORS.tertiary },
    black && { backgroundColor: COLORS.black },
    white && { backgroundColor: COLORS.white },
    gray && { backgroundColor: COLORS.gray },
    error && { backgroundColor: COLORS.error },
    warning && { backgroundColor: COLORS.warning },
    success && { backgroundColor: COLORS.success },
    color && { backgroundColor: color }, // custom backgroundColor
    row && { flex: 0 },
    width && { width },
    height && { height },
    style // rewrite predefined styles
  ]);

  if (scroll) {
    return (
      <ScrollView {...rest} style={blockStyles}>
        {children}
      </ScrollView>
    );
  }

  if (animated) {
    return (
      <Animated.View {...rest} style={blockStyles}>
        {children}
      </Animated.View>
    );
  }

  if (safe) {
    return (
      <SafeAreaView {...rest} style={blockStyles}>
        {children}
      </SafeAreaView>
    );
  }

  return (
    <View {...rest} style={blockStyles}>
      {children}
    </View>
  );
};

export default Block;

export const styles = StyleSheet.create({
  block: {
    flex: 1
  },
  row: {
    flexDirection: "row"
  },
  column: {
    flexDirection: "column"
  },
  center: {
    alignItems: "center"
  },
  middle: {
    justifyContent: "center"
  },
  around: {
    justifyContent: "space-around"
  },
  left: {
    justifyContent: "flex-start"
  },
  right: {
    justifyContent: "flex-end"
  },
  top: {
    justifyContent: "flex-start"
  },
  bottom: {
    justifyContent: "flex-end"
  },
  wrap: { flexWrap: "wrap" }
});