const colors = {
  common100: '#ffffff',
  common0: '#000000',
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

const theme = {
  colors,
  typography,
};

export default theme;

export type Theme = typeof theme;
export type Typography = typeof typography;
