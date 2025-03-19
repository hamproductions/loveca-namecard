import type { Area, TextAreaConfig } from '~/types';

export const AREAS = {
  name: { x1: 402, y1: 87, x2: 757, y2: 146 },
  location: { x1: 776, y1: 87, x2: 1062, y2: 146 },
  oshi: { x1: 64, y1: 450, x2: 333, y2: 490 },
  favoriteCard: { x1: 917, y1: 365, x2: 1154, y2: 467 },
  message: { x1: 135, y1: 546, x2: 965, y2: 632 },
  image: { x1: 47, y1: 71, x2: 353, y2: 377 },
  yearHeart: { x1: 952, y1: 199, x2: 990, y2: 231 },
  monthHeart: { x1: 1050, y1: 199, x2: 1088, y2: 231 },
  series1: { x1: 67, y1: 412, x2: 91, y2: 434 },
  series2: { x1: 105, y1: 412, x2: 145, y2: 434 },
  series3: { x1: 161, y1: 412, x2: 215, y2: 434 },
  series4: { x1: 229, y1: 412, x2: 275, y2: 434 },
  series5: { x1: 288, y1: 412, x2: 333, y2: 434 },
  heart1: { x1: 435, y1: 278, x2: 475, y2: 311 },
  heart2: { x1: 618, y1: 278, x2: 656, y2: 311 },
  heart3: { x1: 754, y1: 278, x2: 795, y2: 311 },
  heart4: { x1: 938, y1: 278, x2: 978, y2: 311 },
  sns1: { x1: 436, y1: 209, x2: 448, y2: 223 },
  sns2: { x1: 479, y1: 209, x2: 562, y2: 223 },
  sns3: { x1: 594, y1: 209, x2: 638, y2: 223 },
  sns4: { x1: 668, y1: 209, x2: 733, y2: 223 },
  announcement1: { x1: 436, y1: 367, x2: 465, y2: 391 },
  announcement2: { x1: 649, y1: 367, x2: 678, y2: 391 },
  announcement3: { x1: 436, y1: 403, x2: 465, y2: 427 },
  announcement4: { x1: 667, y1: 403, x2: 696, y2: 427 },
  announcement5: { x1: 436, y1: 439, x2: 465, y2: 463 },
  social: { x1: 830, y1: 196, x2: 922, y2: 234 },
  score: { x1: 1087, y1: 99, x2: 1111, y2: 134 },
  trigger: { x1: 23, y1: 586, x2: 112, y2: 655 }
} satisfies Record<string, Area>;

export const TEXT_FIELDS = {
  name: {
    area: AREAS.name,
    textConfig: {
      fontSize: 32
    }
  },
  location: {
    area: AREAS.location,
    textConfig: {
      fontSize: 32
    }
  },
  oshi: {
    area: AREAS.oshi,
    textConfig: {
      fontSize: 32
    }
  },
  social: {
    area: AREAS.social,
    textConfig: {}
  },
  favoriteCard: {
    area: AREAS.favoriteCard,
    textConfig: {
      fontSize: 32,
      align: 'left',
      vAlign: 'top'
    }
  },
  message: {
    area: AREAS.message,
    color: 'white',
    textConfig: {
      fontSize: 20,
      align: 'left',
      vAlign: 'top',
      lineHeight: 20
    }
  },
  score: {
    area: AREAS.score,
    color: 'white',
    textConfig: {
      font: 'sans-serif',
      fontSize: 32
    }
  }
} satisfies Record<string, TextAreaConfig>;

export const AREA_GROUPS = {
  announcement: [
    AREAS.announcement1,
    AREAS.announcement2,
    AREAS.announcement3,
    AREAS.announcement4,
    AREAS.announcement5
  ],
  playStyle: [AREAS.heart1, AREAS.heart2, AREAS.heart3, AREAS.heart4],
  sns: [AREAS.sns1, AREAS.sns2, AREAS.sns3, AREAS.sns4],
  series: [AREAS.series1, AREAS.series2, AREAS.series3, AREAS.series4, AREAS.series5]
};
