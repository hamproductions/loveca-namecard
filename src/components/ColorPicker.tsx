import { FaPiedPiper } from 'react-icons/fa6';
import type { ColorPickerRootProps } from '@ark-ui/react';
import { useTranslation } from 'react-i18next';
import { ColorPicker as _ColorPicker } from './ui/color-picker';
import { IconButton } from './ui/icon-button';
import { Input } from './ui/input';
import { Text } from './ui/text';
import { Stack, HStack } from 'styled-system/jsx';
import { PRESETS } from '~/data/presets';
import data from '~/data/data.json';

const ALL_COLORS = [
  ...Object.values(PRESETS).flatMap((a) => [a.primary, a.secondary]),
  ...(data.characters.map((c) => c.color).filter((c) => !!c) as string[])
];

export function ColorPicker(props: ColorPickerRootProps) {
  const { t } = useTranslation();

  return (
    <_ColorPicker.Root {...props}>
      <_ColorPicker.Context>
        {(api) => (
          <>
            <_ColorPicker.Label fontWeight="bold">{t('text_color')}</_ColorPicker.Label>
            <_ColorPicker.Control>
              <_ColorPicker.ChannelInput channel="hex" asChild>
                <Input />
              </_ColorPicker.ChannelInput>
              <_ColorPicker.Trigger asChild>
                <IconButton variant="outline">
                  <_ColorPicker.Swatch value={api.value} />
                </IconButton>
              </_ColorPicker.Trigger>
            </_ColorPicker.Control>
            <_ColorPicker.Positioner>
              <_ColorPicker.Content>
                <Stack gap="3">
                  <_ColorPicker.Area>
                    <_ColorPicker.AreaBackground />
                    <_ColorPicker.AreaThumb />
                  </_ColorPicker.Area>
                  <HStack gap="3">
                    <_ColorPicker.EyeDropperTrigger asChild>
                      <IconButton size="xs" variant="outline" aria-label="Pick a color">
                        <FaPiedPiper />
                      </IconButton>
                    </_ColorPicker.EyeDropperTrigger>
                    <Stack flex="1" gap="2">
                      <_ColorPicker.ChannelSlider channel="hue">
                        <_ColorPicker.ChannelSliderTrack />
                        <_ColorPicker.ChannelSliderThumb />
                      </_ColorPicker.ChannelSlider>
                      <_ColorPicker.ChannelSlider channel="alpha">
                        <_ColorPicker.TransparencyGrid size="8px" />
                        <_ColorPicker.ChannelSliderTrack />
                        <_ColorPicker.ChannelSliderThumb />
                      </_ColorPicker.ChannelSlider>
                    </Stack>
                  </HStack>
                  <HStack>
                    <_ColorPicker.ChannelInput channel="hex" asChild>
                      <Input size="2xs" />
                    </_ColorPicker.ChannelInput>
                    <_ColorPicker.ChannelInput channel="alpha" asChild>
                      <Input size="2xs" />
                    </_ColorPicker.ChannelInput>
                  </HStack>
                  <Stack gap="1.5">
                    <Text size="xs" color="fg.default" fontWeight="medium">
                      Saved Colors
                    </Text>
                    <_ColorPicker.SwatchGroup>
                      {ALL_COLORS.map((color, id) => (
                        <_ColorPicker.SwatchTrigger key={id} value={color}>
                          <_ColorPicker.Swatch value={color} />
                        </_ColorPicker.SwatchTrigger>
                      ))}
                    </_ColorPicker.SwatchGroup>
                  </Stack>
                </Stack>
              </_ColorPicker.Content>
            </_ColorPicker.Positioner>
          </>
        )}
      </_ColorPicker.Context>
      <_ColorPicker.HiddenInput />
    </_ColorPicker.Root>
  );
}
