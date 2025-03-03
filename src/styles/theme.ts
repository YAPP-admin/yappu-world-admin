const colors = {
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

const typography = {
  display1Bold: {
    fontSize: '56px',
    lineHeight: '72px',
    letterSpacing: '-1.786px',
    fontWeight: 700,
  },
  display2Bold: {
    fontSize: '40px',
    lineHeight: '52px',
    letterSpacing: '-1.128px',
    fontWeight: 700,
  },
  title1Bold: {
    fontSize: '36px',
    lineHeight: '48.02px',
    letterSpacing: '-0.972px',
    fontWeight: 700,
  },
  title2Bold: {
    fontSize: '28px',
    lineHeight: '38.02px',
    letterSpacing: '-0.661px',
    fontWeight: 700,
  },
  title3Bold: {
    fontSize: '24px',
    lineHeight: '32.01px',
    letterSpacing: '-0.552px',
    fontWeight: 700,
  },
  heading1Bold: {
    fontSize: '22px',
    lineHeight: '30px',
    letterSpacing: '-0.427px',
    fontWeight: 600,
  },
  heading2Bold: {
    fontSize: '20px',
    lineHeight: '28px',
    letterSpacing: '-0.24px',
    fontWeight: 600,
  },
  headline1Bold: {
    fontSize: '18px',
    lineHeight: '26.01px',
    letterSpacing: '-0.004px',
    fontWeight: 600,
  },
  headline2Bold: {
    fontSize: '17px',
    lineHeight: '24px',
    letterSpacing: '-0.004px',
    fontWeight: 600,
  },
  body1Normal: {
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.091px',
    fontWeight: 400,
  },
  body1Reading: {
    fontSize: '16px',
    lineHeight: '26px',
    letterSpacing: '0.091px',
    fontWeight: 400,
  },
  body2Normal: {
    fontSize: '15px',
    lineHeight: '22px',
    letterSpacing: '0.144px',
    fontWeight: 400,
  },
  body2Reading: {
    fontSize: '15px',
    lineHeight: '24px',
    letterSpacing: '0.144px',
    fontWeight: 400,
  },
  label1Normal: {
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.203px',
    fontWeight: 600,
  },
  label1Reading: {
    fontSize: '14px',
    lineHeight: '22px',
    letterSpacing: '0.203px',
    fontWeight: 600,
  },
  label1Regular: {
    fontSize: '13px',
    lineHeight: '18px',
    letterSpacing: '0.252px',
    fontWeight: 400,
  },
  caption1Regular: {
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.302px',
    fontWeight: 400,
  },
  caption2Regular: {
    fontSize: '11px',
    lineHeight: '14px',
    letterSpacing: '0.342px',
    fontWeight: 400,
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
  typography,
  breakpoints,
  boxShadow,
};

export default theme;

export type Theme = typeof theme;
export type Typography = typeof typography;
export type Breakpoints = typeof breakpoints;
export type BoxShadow = typeof boxShadow;
