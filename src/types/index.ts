import type { CanvasTextConfig } from 'canvas-txt';
import { z } from 'zod';

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

export const nameCardDataSchema = z.object({
  image: z.string(),
  name: z.string(),
  location: z.string(),
  sns: z.array(z.boolean()).length(4),
  snsOther: z.string(),
  playStyle: z.array(z.boolean()).length(4),
  announcement: z.array(z.boolean()).length(5),
  oshiSeries: z.array(z.boolean()).length(5),
  oshiMember: z.string(),
  favoriteCard: z.string(),
  message: z.string(),
  score: z.number(),
  experience: z.union([z.literal('months'), z.literal('years')])
});

export type NameCardData = z.infer<typeof nameCardDataSchema>;

export type Area = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
