import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { motion } from './motion';
import { shadows } from './shadows';
import { breakpoints } from './breakpoints';

// Single Source of Truth Design Token System
export const tokens = {
  colors,
  spacing,
  typography,
  motion,
  shadows,
  breakpoints,
  safeArea: {
    desktop: '48px',
    tablet: '32px',
    mobile: '20px',
  }
};

export type DesignTokens = typeof tokens;
export default tokens;
