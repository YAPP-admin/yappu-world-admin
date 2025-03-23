// Palette.ts

export type CommonKey = 'common-0' | 'common-100';
export const Common: Record<CommonKey, string> = {
  'common-0': '#000000',
  'common-100': '#FFFFFF',
} as const;

export type NeutralKey =
  | 'neutral-99'
  | 'neutral-95'
  | 'neutral-90'
  | 'neutral-80'
  | 'neutral-70'
  | 'neutral-60'
  | 'neutral-50'
  | 'neutral-40'
  | 'neutral-30'
  | 'neutral-22'
  | 'neutral-20'
  | 'neutral-15'
  | 'neutral-10'
  | 'neutral-5';

export const Neutral: Record<NeutralKey, string> = {
  'neutral-99': '#F7F7F7',
  'neutral-95': '#DCDCDC',
  'neutral-90': '#C4C4C4',
  'neutral-80': '#B0B0B0',
  'neutral-70': '#9B9B9B',
  'neutral-60': '#8A8A8A',
  'neutral-50': '#737373',
  'neutral-40': '#5C5C5C',
  'neutral-30': '#474747',
  'neutral-22': '#303030',
  'neutral-20': '#2A2A2A',
  'neutral-15': '#1C1C1C',
  'neutral-10': '#171717',
  'neutral-5': '#0F0F0F',
} as const;

export type CoolNeutralKey =
  | 'coolNeutral-99'
  | 'coolNeutral-98'
  | 'coolNeutral-97'
  | 'coolNeutral-96'
  | 'coolNeutral-95'
  | 'coolNeutral-90'
  | 'coolNeutral-80'
  | 'coolNeutral-70'
  | 'coolNeutral-60'
  | 'coolNeutral-50'
  | 'coolNeutral-40'
  | 'coolNeutral-30'
  | 'coolNeutral-25'
  | 'coolNeutral-23'
  | 'coolNeutral-22'
  | 'coolNeutral-20'
  | 'coolNeutral-17'
  | 'coolNeutral-15'
  | 'coolNeutral-10'
  | 'coolNeutral-7'
  | 'coolNeutral-5';

export const CoolNeutral: Record<CoolNeutralKey, string> = {
  'coolNeutral-99': '#F7F7F8',
  'coolNeutral-98': '#F4F4F5',
  'coolNeutral-97': '#EAEBEC',
  'coolNeutral-96': '#E1E2E4',
  'coolNeutral-95': '#DBDCDF',
  'coolNeutral-90': '#C2C4C8',
  'coolNeutral-80': '#AEB0B6',
  'coolNeutral-70': '#989BA2',
  'coolNeutral-60': '#878A93',
  'coolNeutral-50': '#70737C',
  'coolNeutral-40': '#5A5C63',
  'coolNeutral-30': '#46474C',
  'coolNeutral-25': '#37383C',
  'coolNeutral-23': '#333438',
  'coolNeutral-22': '#2E2F33',
  'coolNeutral-20': '#292A2D',
  'coolNeutral-17': '#212225',
  'coolNeutral-15': '#1B1C1E',
  'coolNeutral-10': '#171719',
  'coolNeutral-7': '#141415',
  'coolNeutral-5': '#0F0F10',
} as const;

export type BlueKey =
  | 'blue-99'
  | 'blue-95'
  | 'blue-90'
  | 'blue-80'
  | 'blue-70'
  | 'blue-60'
  | 'blue-55'
  | 'blue-50'
  | 'blue-45'
  | 'blue-40'
  | 'blue-30'
  | 'blue-20'
  | 'blue-10';

export const Blue: Record<BlueKey, string> = {
  'blue-99': '#F7FBFF',
  'blue-95': '#EAF2FE',
  'blue-90': '#C9DEFE',
  'blue-80': '#9EC5FF',
  'blue-70': '#69A5FF',
  'blue-60': '#3385FF',
  'blue-55': '#1A75FF',
  'blue-50': '#0066FF',
  'blue-45': '#005EEB',
  'blue-40': '#0054D1',
  'blue-30': '#003E9C',
  'blue-20': '#002966',
  'blue-10': '#001536',
} as const;

export type RedKey =
  | 'red-99'
  | 'red-95'
  | 'red-90'
  | 'red-80'
  | 'red-70'
  | 'red-60'
  | 'red-50'
  | 'red-40'
  | 'red-30'
  | 'red-20'
  | 'red-10';

export const Red: Record<RedKey, string> = {
  'red-99': '#FFFAFA',
  'red-95': '#FEECEC',
  'red-90': '#FED5D5',
  'red-80': '#FFB5B5',
  'red-70': '#FF8C8C',
  'red-60': '#FF6363',
  'red-50': '#FF4242',
  'red-40': '#E52222',
  'red-30': '#B00C0C',
  'red-20': '#730303',
  'red-10': '#3B0101',
} as const;

export type GreenKey =
  | 'green-99'
  | 'green-95'
  | 'green-90'
  | 'green-80'
  | 'green-70'
  | 'green-60'
  | 'green-50'
  | 'green-40'
  | 'green-30'
  | 'green-20'
  | 'green-10';

export const Green: Record<GreenKey, string> = {
  'green-99': '#F2FFF6',
  'green-95': '#D9FFE6',
  'green-90': '#ACFCC7',
  'green-80': '#7DF5A5',
  'green-70': '#49E57D',
  'green-60': '#1ED45A',
  'green-50': '#00BF40',
  'green-40': '#009632',
  'green-30': '#006E25',
  'green-20': '#004517',
  'green-10': '#00240C',
} as const;

export type YellowKey =
  | 'yellow-99'
  | 'yellow-95'
  | 'yellow-90'
  | 'yellow-80'
  | 'yellow-70'
  | 'yellow-60'
  | 'yellow-50'
  | 'yellow-45'
  | 'yellow-40'
  | 'yellow-30'
  | 'yellow-20'
  | 'yellow-10';

export const Yellow: Record<YellowKey, string> = {
  'yellow-99': '#FFFBF6',
  'yellow-95': '#FFF7EA',
  'yellow-90': '#FFEBCE',
  'yellow-80': '#FFDCA6',
  'yellow-70': '#FFCB7D',
  'yellow-60': '#FFBC56',
  'yellow-50': '#FFAD31',
  'yellow-45': '#F8A232',
  'yellow-40': '#E79035',
  'yellow-30': '#B56A27',
  'yellow-20': '#7F4A1C',
  'yellow-10': '#39210D',
} as const;

export type OrangeKey =
  | 'orange-99'
  | 'orange-95'
  | 'orange-90'
  | 'orange-80'
  | 'orange-70'
  | 'orange-60'
  | 'orange-50'
  | 'orange-45'
  | 'orange-40'
  | 'orange-30'
  | 'orange-20'
  | 'orange-10';

export const Orange: Record<OrangeKey, string> = {
  'orange-99': '#FFF8F5',
  'orange-95': '#FFFEF9',
  'orange-90': '#FED9CB',
  'orange-80': '#FDBBA2',
  'orange-70': '#FC9B77',
  'orange-60': '#FB7D4E',
  'orange-50': '#FA6027',
  'orange-45': '#E8551E',
  'orange-40': '#CF4D1D',
  'orange-30': '#9D3F1B',
  'orange-20': '#732F16',
  'orange-10': '#34150A',
} as const;

export type LimeKey =
  | 'lime-99'
  | 'lime-95'
  | 'lime-90'
  | 'lime-80'
  | 'lime-70'
  | 'lime-60'
  | 'lime-50'
  | 'lime-40'
  | 'lime-30'
  | 'lime-20'
  | 'lime-10';

export const Lime: Record<LimeKey, string> = {
  'lime-99': '#F8FFF2',
  'lime-95': '#E6FFD4',
  'lime-90': '#CCFCA9',
  'lime-80': '#AEF779',
  'lime-70': '#88F03E',
  'lime-60': '#6BE016',
  'lime-50': '#58CF04',
  'lime-40': '#48AD00',
  'lime-30': '#347D00',
  'lime-20': '#225200',
  'lime-10': '#112900',
} as const;

export type CyanKey =
  | 'cyan-99'
  | 'cyan-95'
  | 'cyan-90'
  | 'cyan-80'
  | 'cyan-70'
  | 'cyan-60'
  | 'cyan-50'
  | 'cyan-40'
  | 'cyan-30'
  | 'cyan-20'
  | 'cyan-10';

export const Cyan: Record<CyanKey, string> = {
  'cyan-99': '#F7FEFF',
  'cyan-95': '#DEFAFF',
  'cyan-90': '#B5F4FF',
  'cyan-80': '#8AEDFF',
  'cyan-70': '#57DFF7',
  'cyan-60': '#28D0ED',
  'cyan-50': '#00BDDE',
  'cyan-40': '#0098B2',
  'cyan-30': '#006F82',
  'cyan-20': '#004854',
  'cyan-10': '#00252B',
} as const;

export type LightBlueKey =
  | 'lightBlue-99'
  | 'lightBlue-95'
  | 'lightBlue-90'
  | 'lightBlue-80'
  | 'lightBlue-70'
  | 'lightBlue-60'
  | 'lightBlue-50'
  | 'lightBlue-40'
  | 'lightBlue-30'
  | 'lightBlue-20'
  | 'lightBlue-10';

export const LightBlue: Record<LightBlueKey, string> = {
  'lightBlue-99': '#F7FDFF',
  'lightBlue-95': '#E5F6FE',
  'lightBlue-90': '#C4ECFE',
  'lightBlue-80': '#A1E1FF',
  'lightBlue-70': '#70D2FF',
  'lightBlue-60': '#3DC2FF',
  'lightBlue-50': '#00AEFF',
  'lightBlue-40': '#008DCF',
  'lightBlue-30': '#006796',
  'lightBlue-20': '#004261',
  'lightBlue-10': '#002130',
} as const;

export type VioletKey =
  | 'violet-99'
  | 'violet-95'
  | 'violet-90'
  | 'violet-80'
  | 'violet-70'
  | 'violet-60'
  | 'violet-50'
  | 'violet-40'
  | 'violet-30'
  | 'violet-20'
  | 'violet-10';

export const Violet: Record<VioletKey, string> = {
  'violet-99': '#FBFAFF',
  'violet-95': '#F0ECFE',
  'violet-90': '#DBD3FE',
  'violet-80': '#C0B0FF',
  'violet-70': '#9E86FC',
  'violet-60': '#7D5EF7',
  'violet-50': '#6541F2',
  'violet-40': '#4F29E5',
  'violet-30': '#3A16C9',
  'violet-20': '#23098F',
  'violet-10': '#11024D',
} as const;

export type PurpleKey =
  | 'purple-99'
  | 'purple-95'
  | 'purple-90'
  | 'purple-80'
  | 'purple-70'
  | 'purple-60'
  | 'purple-50'
  | 'purple-40'
  | 'purple-30'
  | 'purple-20'
  | 'purple-10';

export const Purple: Record<PurpleKey, string> = {
  'purple-99': '#FEFBFF',
  'purple-95': '#F9EDFF',
  'purple-90': '#F2D6FF',
  'purple-80': '#E9BAFF',
  'purple-70': '#DE96FF',
  'purple-60': '#D478FF',
  'purple-50': '#CB59FF',
  'purple-40': '#AD36E3',
  'purple-30': '#861CB8',
  'purple-20': '#580A7D',
  'purple-10': '#290247',
} as const;

export type PinkKey =
  | 'pink-99'
  | 'pink-95'
  | 'pink-90'
  | 'pink-80'
  | 'pink-70'
  | 'pink-60'
  | 'pink-50'
  | 'pink-40'
  | 'pink-30'
  | 'pink-20'
  | 'pink-10';

export const Pink: Record<PinkKey, string> = {
  'pink-99': '#FFFAFE',
  'pink-95': '#FEECFB',
  'pink-90': '#FED3F7',
  'pink-80': '#FFB8F3',
  'pink-70': '#FF94ED',
  'pink-60': '#FA73E3',
  'pink-50': '#F553DA',
  'pink-40': '#D331B8',
  'pink-30': '#A81690',
  'pink-20': '#730560',
  'pink-10': '#3D0133',
} as const;
