export const colors = {
  primary: {
    normal: '#FA6027',
    strong: '#E8551E',
    heavy: '#CF4D1D',
  },
  secondary: {
    normal: '#FFAD31',
    strong: '#F8A232',
    heavy: '#E79035',
  },
  label: {
    normal: '#171719',
    strong: '#000000',
    neutral: 'rgba(46, 47, 51, 0.88)',
    alternative: 'rgba(55, 56, 60, 0.61)',
    assistive: 'rgba(55, 56, 60, 0.28)',
    disable: 'rgba(55, 56, 60, 0.16)',
  },
  backgroundNormal: {
    normal: '#FFFFFF',
    alternative: '#F7F7F8',
  },
  backgroundElevated: {
    normal: '#FFFFFF',
    alternative: '#F7F7F8',
  },
  interaction: {
    inactive: '#989BA2',
    disable: '#F4F4F5',
  },
  lineNormal: {
    normal: 'rgba(112, 115, 124, 0.22)',
    neutral: 'rgba(112, 115, 124, 0.16)',
    alternative: 'rgba(112, 115, 124, 0.08)',
    strong: 'rgba(112, 115, 124, 0.52)',
  },
  lineSolid: {
    normal: '#E1E2E4',
    neutral: '#EAEBEC',
    alternative: '#F4F4F5',
    string: '#AEB0B6',
  },
  fill: {
    normal: 'rgba(112, 115, 124, 0.08)',
    strong: 'rgba(112, 115, 124, 0.16)',
    alternative: 'rgba(112, 115, 124, 0.05)',
  },
  status: {
    positive: '#00BF40',
    cautionary: '#FFAD31',
    nagative: '#FF4242',
  },
  static: {
    white: '#FFFFFF',
    black: '#000000',
  },
  accent: {
    lime: '#58CF04',
    cyan: '#00BDDE',
    lightBlue: '#00AEFF',
    violet: '#6541F2',
    purple: '#CB59FF',
    pink: '#F553DA',
  },

  material: {
    dimmer: 'rgba(23, 23, 25, 0.52)',
  },
  materialDimmer: {
    alert: 'rgba(23, 23, 25, 0.52)',
    sheet: 'rgba(23, 23, 25, 0.28)',
  },
};

const breakpoints = {
  xs: '768px', // 0 ~ 768px 모바일
  sm: '991px', // 768px ~ 991px 테블릿 세로
  md: '1200px', // 991px ~ 1200px 테블릿 가로
  lg: '1280px', // 1200px ~ 데스크탑
};

const boxShadow = {
  normal: {
    boxShadow:
      '0px 1px 2px 0px rgba(0, 0, 0, 0.12), 0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)',
  },
  emphasize: {
    boxShadow:
      '0px 2px 8px 0px rgba(0, 0, 0, 0.12), 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.08)',
  },
  strong: {
    boxShadow:
      '0px 6px 12px 0px rgba(0, 0, 0, 0.12), 0px 4px 8px 0px rgba(0, 0, 0, 0.08), 0px 0px 4px 0px rgba(0, 0, 0, 0.08)',
  },
  heavy: {
    boxShadow:
      '0px 16px 20px 0px rgba(0, 0, 0, 0.12), 0px 8px 16px 0px rgba(0, 0, 0, 0.08), 0px 0px 8px 0px rgba(0, 0, 0, 0.08)',
  },
};

const theme = {
  colors,
  breakpoints,
  boxShadow,
};

export default theme;

export type Theme = typeof theme;
export type Breakpoints = typeof breakpoints;
export type BoxShadow = typeof boxShadow;
export type ColorType = keyof typeof colors;
