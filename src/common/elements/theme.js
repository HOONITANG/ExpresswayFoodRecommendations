import { Dimensions } from "react-native";
import { normalize } from "./helpers"

const { width, height } = Dimensions.get("window");

export const COLORS = {
  // default font color
  font: "#000000",
  // base colors
  primary: "#57CC99",
  secondary: "#FFFAE3",
  tertiary: "#F7567C",

  // non-colors
  black: "#000020",
  white: "#FFFFFF",
  
  // color variations
  gray: "#C2C9D1",
  error: "#F03738",
  success: "#3CC13B",
  
  // favorite colors
  yellow: "#FFE358",
  skyblue: "#4DA1FF",

  // 500 번이 기존 색깔 입니다.
  // 번호가 높을 수록 색이 어두워 집니다.
  // primary
  "color_primary_100": "#DFFCE4",
  "color_primary_200": "#C0F9CF",
  "color_primary_300": "#9DEFBB",
  "color_primary_400": "#7FE0AC",
  "color_primary_500": "#57CC99",
  "color_primary_600": "#3FAF89",
  "color_primary_700": "#2B927A",

  //secondary
  "color_secondary_100": "#D9FAEF",
  "color_secondary_200": "#B4F6E6",
  "color_secondary_300": "#89E3D6",
  "color_secondary_400": "#65C9C2",
  "color_secondary_500": "#38A3A5",
  "color_secondary_600": "#28838D",
  "color_secondary_700": "#1C6576",

  // tertiary
  "color_tertiary_100": "#FFF7F9",
  "color_tertiary_200": "#FEEEF2",
  "color_tertiary_300": "#FDD5DE",
  "color_tertiary_400": "#FBAABE",
  "color_tertiary_500": "#F7567C",  
  "color_tertiary_600": "#B9405D",
  "color_tertiary_700": "#7C2B3E",
  // success
  "color_success_100": "#F5FCF5",
  "color_success_200": "#EBF9EB",
  "color_success_300": "#CEF0CE",
  "color_success_400": "#9EE09D",
  "color_success_500": "#3CC13B",  
  "color_success_600": "#2D912C",
  "color_success_700": "#1E601D",
  // warning
  "color_warning_100": "#FEFCF4",
  "color_warning_200": "#FEF8E8",
  "color_warning_300": "#FCEEC6",
  "color_warning_400": "#F9DD8D",
  "color_warning_500": "#F3BB1C", 
  "color_warning_600": "#B68C15",
  "color_warning_700": "#7A5E0E",
  // Error
  "color_error_100": "#FEF5F5",
  "color_error_200": "#FEEBEB",
  "color_error_300": "#FBCDCD",
  "color_error_400": "#F89B9C",
  "color_error_500": "#F03738", 
  "color_error_600": "#B4292A",
  "color_error_700": "#781C1C",
  // Gray
  "color_gray_100": "#FCFCFD",
  "color_gray_200": "#F9FAFA",
  "color_gray_300": "#F0F2F4",
  "color_gray_400": "#E0E4E8",
  "color_gray_500": "#C2C9D1", 
  "color_gray_600": "#91979D",
  "color_gray_700": "#616469",
  // Black
  "color_black_1": "#F2F2F2",
  "color_black_2": "#E5E5E5",
  "color_black_3": "#BFBFBF",
  "color_black_4": "#808080",
  "color_black_5": "#000000",
  // White
  "color_white_1": "#404040",
  "color_white_2": "#595959",
  "color_white_3": "#808080",
  "color_white_4": "#B3B3B3",
  "color_white_5": "#FFFFFF",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 16,
  radius: 4,

  // font sizes
  h1: 34,
  h2: 24,
  h3: 20,
  subtitle: 14,

  display: 36,
  headLine: 24,
  title: 20,
  subHeader: 16,
  body: 14,
  caption: 12,
  small: 10,

  // app dimensions
  width,
  height,
};

export const WEIGHTS = {    
  bold: "bold",
  semibold: "500", 
  medium: "400",
  light: "300"
};

export const FONTS = {
  displayHeavy: { fontSize: normalize(SIZES.display), fontWeight: WEIGHTS.bold },
  displayLight: { fontSize: normalize(SIZES.display), fontWeight: WEIGHTS.light },
  headLineHeavy: { fontSize: normalize(SIZES.headLine), fontWeight: WEIGHTS.bold },
  headLineLight: { fontSize: normalize(SIZES.headLine), fontWeight: WEIGHTS.light },
  titleHeavy: { fontSize: normalize(SIZES.title), fontWeight: WEIGHTS.bold },
  titleLight: { fontSize: normalize(SIZES.title), fontWeight: WEIGHTS.light },
  subHeaderHeavy: { fontSize: normalize(SIZES.subHeader), fontWeight: WEIGHTS.bold },
  subHeaderLight: { fontSize: normalize(SIZES.subHeader), fontWeight: WEIGHTS.light },
  bodyHeavy: { fontSize: normalize(SIZES.body), fontWeight: WEIGHTS.bold },
  bodyLight: { fontSize: normalize(SIZES.body), fontWeight: WEIGHTS.light },
  captionHeavy: { fontSize: normalize(SIZES.caption), fontWeight: WEIGHTS.bold },
  captionLight: { fontSize: normalize(SIZES.caption), fontWeight: WEIGHTS.light },
  smallHeavy: { fontSize: normalize(SIZES.small), fontWeight: WEIGHTS.bold },
  smallLight: { fontSize: normalize(SIZES.small), fontWeight: WEIGHTS.light },
};

export default { COLORS, SIZES, FONTS, WEIGHTS };