import type { MouseEvent } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { drawText } from 'canvas-txt';
import cover from 'canvas-image-cover';
import { styled } from 'styled-system/jsx';
import { getAssetUrl } from '~/utils/assets';
import type { Area, NameCardData, TextAreaConfig, Theme } from '~/types';
import { AREA_GROUPS, AREAS, TEXT_FIELDS } from '~/data/renderer';

const getArea = (area: Area, theme: Theme) => {
  const { x1, x2, y1, y2 } = area;
  return {
    x1: x1 + (theme.preset.offsetX ?? 0),
    y1: y1 + (theme.preset.offsetY ?? 0),
    x2: x2 + (theme.preset.offsetX ?? 0),
    y2: y2 + (theme.preset.offsetY ?? 0)
  };
};

export function LovecaCanvas({ theme, data }: { theme: Theme; data: NameCardData }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cacheRef = useRef<Record<string, HTMLImageElement>>({});

  const loadImage = (pic: string) => {
    if (!pic) return new Image();
    if (cacheRef.current[pic]) {
      return cacheRef.current[pic];
    }
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        cacheRef.current[pic] = image;
        resolve(image);
      };
      image.onerror = (e) => {
        reject(new Error((e as string) + ''));
      };

      image.src = pic.startsWith('data') || pic.startsWith('blob') ? pic : getAssetUrl(pic);
    });
  };

  const renderText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    config: TextAreaConfig,
    theme: Theme
  ) => {
    const { x1, x2, y1, y2 } = config.area;
    ctx.fillStyle = config.color ?? theme.color ?? theme.preset.primary;
    drawText(ctx, text, {
      x: x1,
      y: y1,
      width: x2 - x1,
      height: y2 - y1,
      font: 'Zen Maru Gothic',
      fontSize: 16,
      fontWeight: 'bold',
      ...(config.textConfig ?? {})
    });
  };

  const drawAreas = (ctx: CanvasRenderingContext2D) => {
    Object.entries(AREAS).forEach(([name, { x1, y1, x2, y2 }]) => {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 1;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
    });
  };

  const drawChoice = (ctx: CanvasRenderingContext2D, area: Area, padding: number, theme: Theme) => {
    const { x1, x2, y1, y2 } = getArea(area, theme);
    ctx.lineWidth = 3;
    ctx.strokeStyle = theme.color ?? theme.preset.primary;
    ctx.beginPath();
    ctx.roundRect(
      x1 - padding,
      y1 - padding,
      x2 - x1 + 2 * padding,
      y2 - y1 + 2 * padding,
      Math.min((x2 - x1) / 2, (y2 - y1) / 2)
    );
    ctx.stroke();
  };
  const drawHeartChoice = async (ctx: CanvasRenderingContext2D, area: Area, theme: Theme) => {
    const heart = await loadImage('assets/hearts/heart01.png');
    const { x1, x2, y1, y2 } = getArea(area, theme);
    const ratio = heart.naturalWidth / heart.naturalHeight;

    const tmpCanvas = document.createElement('canvas');
    const c = tmpCanvas.getContext('2d')!;

    const padding = 23;
    const w = x2 - x1 + padding;
    const h = w / ratio;

    const thickness = 3;
    tmpCanvas.width = w + 2 * thickness;
    tmpCanvas.height = h + 2 * thickness;

    c.fillStyle = theme.color ?? theme.preset.primary;
    c.fillRect(0, 0, w + 2 * thickness, h + 2 * thickness);
    c.globalCompositeOperation = 'destination-in';
    c.drawImage(heart, 0, 0, w + 2 * thickness, h + 2 * thickness);
    c.globalCompositeOperation = 'destination-out';
    c.drawImage(heart, thickness, thickness, w, h);
    ctx.drawImage(tmpCanvas, x1 - (w - (x2 - x1)) / 2, y1 - (h - (y2 - y1)) / 2, w, h);
  };

  const drawTriggerHeart = async (ctx: CanvasRenderingContext2D, theme: Theme) => {
    const heart = await loadImage(`assets/hearts/${theme.trigger ?? 'spall.png'}`);
    const { x1, x2, y1, y2 } = getArea(AREAS.trigger, theme);
    const ratio = heart.naturalWidth / heart.naturalHeight;

    const padding = 28;
    const offsetY = -2;
    const offsetX = 0;
    const w = x2 - x1 + padding;
    const h = w / ratio;

    ctx.drawImage(
      heart,
      offsetX + x1 - (w - (x2 - x1)) / 2,
      offsetY + y1 - (h - (y2 - y1)) / 2,
      w,
      h
    );
  };

  const drawImage = async (ctx: CanvasRenderingContext2D, data: NameCardData) => {
    const image = await loadImage(data.image);
    const { x1, x2, y1, y2 } = getArea(AREAS.image, theme);

    cover(image, x1, y1, x2 - x1, y2 - y1)
      .pan(0.5, 0.5)
      .render(ctx);
  };

  const renderNamecard = useCallback(
    async (ctx: CanvasRenderingContext2D, theme: Theme, data: NameCardData) => {
      const { bg } = theme.preset;
      await document.fonts.load(`24px 'Zen Maru Gothic'`, JSON.stringify(Object.values(data)));
      ctx.drawImage(await loadImage(`assets/card-bg/1.png`), 0, 0);
      const image = await loadImage(`assets/card-bg/${bg}`);
      ctx.globalCompositeOperation = 'source-in';
      ctx.drawImage(image, 0, 0);
      ctx.globalCompositeOperation = 'source-atop';
      await drawTriggerHeart(ctx, theme);
      // drawAreas(ctx);
      try {
        await drawImage(ctx, data);
      } catch {}
      const {
        name,
        location,
        oshiMembers,
        favoriteCard,
        score,
        message,
        oshiSeries,
        sns,
        snsOther,
        playStyle,
        announcement,
        experience
      } = data;
      renderText(ctx, name, TEXT_FIELDS.name, theme);
      renderText(ctx, location, TEXT_FIELDS.location, theme);
      renderText(ctx, oshiMembers, TEXT_FIELDS.oshi, theme);
      renderText(ctx, favoriteCard, TEXT_FIELDS.favoriteCard, theme);
      renderText(ctx, score + '', TEXT_FIELDS.score, theme);
      renderText(ctx, message, TEXT_FIELDS.message, theme);
      if (snsOther) {
        renderText(ctx, snsOther, TEXT_FIELDS.social, theme);
      }
      oshiSeries.forEach((draw, idx) => {
        if (draw) {
          drawChoice(ctx, AREA_GROUPS.series[idx], 5, theme);
        }
      });
      sns.forEach((draw, idx) => {
        if (draw) {
          drawChoice(ctx, AREA_GROUPS.sns[idx], 5, theme);
        }
      });
      playStyle.forEach((draw, idx) => {
        if (draw) {
          void drawHeartChoice(ctx, AREA_GROUPS.playStyle[idx], theme);
        }
      });
      announcement.forEach((draw, idx) => {
        if (draw) {
          void drawHeartChoice(ctx, AREA_GROUPS.announcement[idx], theme);
        }
      });
      await drawHeartChoice(
        ctx,
        experience === 'month' ? AREAS.monthHeart : AREAS.yearHeart,
        theme
      );
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 1201;
    canvas.height = 676;
    if (!ctx) return;
    void renderNamecard(ctx, theme, data);
  }, [renderNamecard, theme, data]);

  const handleClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();

    if (!rect) return;

    const scaleX = e.currentTarget.width / rect.width;
    const scaleY = e.currentTarget.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    console.log('X: ', x, 'Y:', y);
  };

  return <styled.canvas ref={canvasRef} onClick={handleClick} width="100%" />;
}
