import { AccessibilityInfo, Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const isTablet = SCREEN_WIDTH >= 600;

const BASE_WIDTH = isTablet ? 750 : 414; // iPad vs iPhone 8 width
const BASE_HEIGHT = isTablet ? 1334 : 896; // iPad vs iPhone 8 height

const scaleFactorWidth = SCREEN_WIDTH / BASE_WIDTH;
const scaleFactorHeight = SCREEN_HEIGHT / BASE_HEIGHT;

// Combine both width and height for average scaling
const combinedScaleFactor = (scaleFactorWidth + scaleFactorHeight) / 2;

// Clamp to avoid too large/small sizes
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const safeScaleFactor = clamp(combinedScaleFactor, 0.85, 1.15);

// Type for choosing scale mode
export type ScaleMode = 'width' | 'height' | 'average';

const getScaleFactor = (mode: ScaleMode = 'average') => {
  if (mode === 'width') return scaleFactorWidth;
  if (mode === 'height') return scaleFactorHeight;
  return safeScaleFactor;
};

// Core scale function
const scaleBy = (size: number, mode: ScaleMode = 'average') => Math.round(size * getScaleFactor(mode) * 100) / 100;

const identity = (size: number) => size;

// Handle font scaling accessibility
let isFontScalingAllowed = true;
AccessibilityInfo.isReduceMotionEnabled().then(reduceMotionEnabled => {
  isFontScalingAllowed = !reduceMotionEnabled;
});

// Font scaling function
const scaleFontNative = (size: number) => {
  const base = scaleBy(size, 'width');
  const final = isFontScalingAllowed ? PixelRatio.roundToNearestPixel(base) : base;
  return Math.round(final);
};

// Round to integer
const scaleInteger = (size: number) => Math.round(Platform.OS === 'web' ? size : scaleBy(size, 'average'));

// Exported scale functions
export const scale = Platform.OS === 'web' ? identity : scaleBy;
export const scaleFont = Platform.OS === 'web' ? identity : scaleFontNative;
export const scaleInt = scaleInteger;
