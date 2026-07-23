export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1440px',
  ultrawide: '1920px',
};
export type BreakpointToken = keyof typeof breakpoints;
