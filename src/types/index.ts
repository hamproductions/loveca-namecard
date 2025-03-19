import type { CanvasTextConfig } from 'canvas-txt';

export type Preset = {
  bg: string;
  primary: string;
  secondary: string;
  offsetX?: number;
  offsetY?: number;
};

export type Theme = {
  preset: Preset;
  color?: string;
  trigger?: string;
};

export type TextAreaConfig = {
  area: Area;
  color?: string;
  textConfig?: Partial<Omit<CanvasTextConfig, 'x' | 'y' | 'w' | 'h'>>;
};

export type NameCardData = {
  image: string;
  name: string;
  location: string;
  sns: boolean[];
  snsOther?: string;
  playStyle: boolean[];
  announcement: boolean[];
  oshiSeries: boolean[];
  oshiMembers: string;
  favoriteCard: string;
  message: string;
  score: number;
  experience: 'month' | 'year';
};

export type Area = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
