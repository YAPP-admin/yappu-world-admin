import { hexWithAlpha } from '@utils/hexWithAlpha';

import {
  Blue,
  Common,
  CoolNeutral,
  Cyan,
  Green,
  LightBlue,
  Lime,
  Orange,
  Pink,
  Purple,
  Red,
  Violet,
} from './pallette';

export type StaticColorKey = 'static-white' | 'static-black';

export const Static = {
  'static-white': Common['common-100'],
  'static-black': Common['common-0'],
} as const;

export type PrimaryColorKey =
  | 'primary-normal'
  | 'primary-strong'
  | 'primary-heavy';

export const Primary = {
  'primary-normal': Blue['blue-50'],
  'primary-strong': Blue['blue-45'],
  'primary-heavy': Blue['blue-40'],
} as const;

export type LabelColorKey =
  | 'label-normal'
  | 'label-strong'
  | 'label-neutral'
  | 'label-alternative'
  | 'label-assistive'
  | 'label-disable';

export const Label = {
  'label-normal': CoolNeutral['coolNeutral-10'],
  'label-strong': Common['common-0'],
  'label-neutral': hexWithAlpha(CoolNeutral['coolNeutral-22'], 0.88),
  'label-alternative': hexWithAlpha(CoolNeutral['coolNeutral-25'], 0.61),
  'label-assistive': hexWithAlpha(CoolNeutral['coolNeutral-25'], 0.28),
  'label-disable': hexWithAlpha(CoolNeutral['coolNeutral-25'], 0.16),
} as const;

export type BackgroundColorKey =
  | 'background-normal-normal'
  | 'background-normal-alternative'
  | 'background-elevated-normal'
  | 'background-elevated-alternative';

export const Background = {
  'background-normal-normal': Common['common-100'],
  'background-normal-alternative': CoolNeutral['coolNeutral-99'],
  'background-elevated-normal': Common['common-100'],
  'background-elevated-alternative': CoolNeutral['coolNeutral-99'],
} as const;

export type InteractionColorKey =
  | 'interaction-inactive'
  | 'interaction-disable';

export const Interaction = {
  'interaction-inactive': CoolNeutral['coolNeutral-70'],
  'interaction-disable': CoolNeutral['coolNeutral-98'],
} as const;

export type LineColorKey =
  | 'line-normal-normal'
  | 'line-normal-neutral'
  | 'line-normal-alternative'
  | 'line-solid-normal'
  | 'line-solid-neutral'
  | 'line-solid-alternative';

export const Line = {
  'line-normal-normal': hexWithAlpha(CoolNeutral['coolNeutral-50'], 0.22),
  'line-normal-neutral': hexWithAlpha(CoolNeutral['coolNeutral-50'], 0.16),
  'line-normal-alternative': hexWithAlpha(CoolNeutral['coolNeutral-50'], 0.8),

  'line-solid-normal': CoolNeutral['coolNeutral-96'],
  'line-solid-neutral': CoolNeutral['coolNeutral-97'],
  'line-solid-alternative': CoolNeutral['coolNeutral-98'],
} as const;

export type StatusColorKey =
  | 'status-positive'
  | 'status-cautionary'
  | 'status-negative';

export const Status = {
  'status-positive': Green['green-50'],
  'status-cautionary': Orange['orange-50'],
  'status-negative': Red['red-50'],
} as const;

export type AccentColorKey =
  | 'accent-lime'
  | 'accent-cyan'
  | 'accent-lightBlue'
  | 'accent-violet'
  | 'accent-purple'
  | 'accent-pink';

export const Accent = {
  'accent-lime': Lime['lime-50'],
  'accent-cyan': Cyan['cyan-50'],
  'accent-lightBlue': LightBlue['lightBlue-50'],
  'accent-violet': Violet['violet-50'],
  'accent-purple': Purple['purple-50'],
  'accent-pink': Pink['pink-50'],
} as const;

export type InverseColorKey =
  | 'inverse-primary'
  | 'inverse-background'
  | 'inverse-label';

export const Inverse = {
  'inverse-primary': Blue['blue-60'],
  'inverse-background': CoolNeutral['coolNeutral-15'],
  'inverse-label': CoolNeutral['coolNeutral-99'],
} as const;

export type SemanticColorKey =
  | StaticColorKey
  | PrimaryColorKey
  | LabelColorKey
  | BackgroundColorKey
  | InteractionColorKey
  | LineColorKey
  | StatusColorKey
  | AccentColorKey
  | InverseColorKey;

export const semanticColor: Record<SemanticColorKey, string> = {
  ...Static,
  ...Primary,
  ...Label,
  ...Background,
  ...Interaction,
  ...Line,
  ...Status,
  ...Accent,
  ...Inverse,
};
