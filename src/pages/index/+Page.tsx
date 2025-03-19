import { useTranslation } from 'react-i18next';
import { useForm, useStore } from '@tanstack/react-form';
import { useEffect } from 'react';
import { FaTrash } from 'react-icons/fa6';
import { Text } from '../../components/ui/text';
import { Metadata } from '~/components/layout/Metadata';
import { Container, Divider, HStack, Stack, styled } from 'styled-system/jsx';
import { LovecaCanvas } from '~/components/LovecaNamecard';
import type { NameCardData, Theme } from '~/types';
import { FormLabel } from '~/components/ui/form-label';
import { Checkbox } from '~/components/ui/checkbox';
import { Group as CheckboxGroup } from '~/components/ui/styled/checkbox';
import { Input } from '~/components/ui/input';
import { PRESETS, TRIGGERS } from '~/data/presets';
import { Textarea } from '~/components/ui/textarea';
import { NumberInput } from '~/components/ui/number-input';
import { useLocalStorage } from '~/hooks/useLocalStorage';
import { RadioButtonGroup } from '~/components/ui/radio-button-group';
import { getAssetUrl } from '~/utils/assets';
import { FileUpload } from '~/components/ui/file-upload';
import { IconButton } from '~/components/ui/icon-button';
import { Button } from '~/components/ui/button';

const defaultTheme: Theme = {
  preset: PRESETS[0]
};
const DEFAULT_VALUES: NameCardData = {
  image: '',
  name: '',
  location: '',
  sns: [true, true, true, true],
  playStyle: [true, true, true, true],
  announcement: [true, true, true, true, true],
  oshiSeries: [true, true, true, true, true],
  oshiMembers: '',
  favoriteCard: '',
  snsOther: '',
  message: '',
  score: 0,
  experience: 'month'
};

const options = {
  sns: ['x', 'discord', 'line', 'skype'],
  playStyle: ['collection', 'beginner', 'enjoy', 'serious'],
  announcement: ['match', 'remote', 'friend', 'advice', 'talk'],
  oshiSeries: ['muse', 'aqours', 'niji', 'liella', 'hasu'],
  experience: ['months', 'years']
};

export function Page() {
  const { t } = useTranslation();
  const lsKey = 'loveca-namecard-state';
  const [theme, setTheme] = useLocalStorage<Theme>('loveca-namecard-theme', {
    preset: PRESETS[0]
  });

  const form = useForm({
    defaultValues: DEFAULT_VALUES
  });

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(lsKey) ?? '');
      //TODO: Validate, Prerender, Skeleton
      Object.entries(data).map(([key, value]) => {
        form.setFieldValue(key as keyof NameCardData, value as NameCardData[keyof NameCardData]);
      });
    } catch {}
  }, []);

  const formData = useStore(form.store, (store) => {
    return {
      isDirty: store.isDirty,
      data: JSON.stringify(store.values)
    };
  });

  useEffect(() => {
    const { isDirty, data } = formData;
    if (isDirty) {
      localStorage.setItem(lsKey, data);
    }
  }, [formData]);

  const title = t('title');

  return (
    <>
      <Metadata title={title} helmet />
      <Stack alignItems="center" w="full">
        <Text textAlign="center" fontSize="3xl" fontWeight="bold">
          {title}
        </Text>
        <Text textAlign="center">{t('description')}</Text>
      </Stack>
      <Container display="flex" gap="2" flexDir="column" w="full" maxWidth="breakpoint-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <Stack>
            <Stack gap="1">
              <FormLabel>{t('name')}</FormLabel>
              <form.Field name="name">
                {(field) => {
                  return (
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  );
                }}
              </form.Field>
            </Stack>
            <Stack gap="1">
              <FormLabel>{t('location')}</FormLabel>
              <form.Field name="location">
                {(field) => {
                  return (
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  );
                }}
              </form.Field>
            </Stack>
            <Stack gap="1">
              <FormLabel>{t('sns')}</FormLabel>
              <HStack flexWrap="wrap">
                <form.Field name="sns">
                  {(field) => {
                    return (
                      <CheckboxGroup
                        value={options.sns.filter((_, idx) => field.state.value[idx])}
                        onValueChange={(e) =>
                          field.handleChange(options.sns.map((a) => e.includes(a)))
                        }
                        onBlur={field.handleBlur}
                        display="flex"
                        gap="4"
                        flexDirection="row"
                        flexWrap="wrap"
                      >
                        {options.sns.map((option) => (
                          <Checkbox key={option} value={option}>
                            {t(option)}
                          </Checkbox>
                        ))}
                      </CheckboxGroup>
                    );
                  }}
                </form.Field>
                <HStack>
                  <Text>{t('others')}</Text>
                  <form.Field name="snsOther">
                    {(field) => {
                      return (
                        <Input
                          size="xs"
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          width="fit-content"
                        />
                      );
                    }}
                  </form.Field>
                </HStack>
              </HStack>
            </Stack>
            <Stack gap="1">
              <FormLabel>{t('play_style')}</FormLabel>
              <form.Field name="playStyle">
                {(field) => {
                  return (
                    <CheckboxGroup
                      value={options.playStyle.filter((_, idx) => field.state.value[idx])}
                      onValueChange={(e) =>
                        field.handleChange(options.playStyle.map((a) => e.includes(a)))
                      }
                      onBlur={field.handleBlur}
                      display="flex"
                      gap="4"
                      flexDirection="row"
                      flexWrap="wrap"
                    >
                      {options.playStyle.map((option) => (
                        <Checkbox key={option} value={option}>
                          {t(option)}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  );
                }}
              </form.Field>
            </Stack>
            <Stack gap="1">
              <FormLabel>{t('announcement')}</FormLabel>
              <form.Field name="announcement">
                {(field) => {
                  return (
                    <CheckboxGroup
                      value={options.announcement.filter((_, idx) => field.state.value[idx])}
                      onValueChange={(e) =>
                        field.handleChange(options.announcement.map((a) => e.includes(a)))
                      }
                      onBlur={field.handleBlur}
                      display="flex"
                      gap="4"
                      flexDirection="row"
                      flexWrap="wrap"
                    >
                      {options.announcement.map((option) => (
                        <Checkbox key={option} value={option}>
                          {t(option)}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  );
                }}
              </form.Field>
            </Stack>
            <Stack gap="1">
              <FormLabel>{t('oshi_series')}</FormLabel>
              <form.Field name="oshiSeries">
                {(field) => {
                  return (
                    <CheckboxGroup
                      value={options.oshiSeries.filter((_, idx) => field.state.value[idx])}
                      onValueChange={(e) =>
                        field.handleChange(options.oshiSeries.map((a) => e.includes(a)))
                      }
                      onBlur={field.handleBlur}
                      display="flex"
                      gap="4"
                      flexDirection="row"
                      flexWrap="wrap"
                    >
                      {options.oshiSeries.map((option) => (
                        <Checkbox key={option} value={option}>
                          {t(option)}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  );
                }}
              </form.Field>
            </Stack>
            <Stack gap="1">
              <FormLabel>{t('favorite_card')}</FormLabel>
              <form.Field name="favoriteCard">
                {(field) => {
                  return (
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  );
                }}
              </form.Field>
            </Stack>
            <Stack gap="1">
              <FormLabel>{t('oshi_members')}</FormLabel>
              <form.Field name="oshiMembers">
                {(field) => {
                  return (
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  );
                }}
              </form.Field>
            </Stack>
            <Stack gap="1">
              <FormLabel>{t('message')}</FormLabel>
              <form.Field name="message">
                {(field) => {
                  return (
                    <Textarea
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  );
                }}
              </form.Field>
            </Stack>
            <Stack gap="1">
              <FormLabel>{t('image')}</FormLabel>
              <form.Field name="image">
                {(field) => {
                  return (
                    <FileUpload.Root
                      onFileAccept={(a) => {
                        // const file = a.files[0];
                        // const r = new FileReader();
                        // r.onload = () => {
                        //   field.handleChange(r.result as string);
                        // };
                        // r.readAsDataURL(file);
                        field.handleChange(URL.createObjectURL(a.files[0]));
                      }}
                      onBlur={field.handleBlur}
                    >
                      <FileUpload.Dropzone>
                        <FileUpload.Label>{t('file-here')}</FileUpload.Label>
                        <FileUpload.Trigger asChild>
                          <Button size="sm">{t('select-files')}</Button>
                        </FileUpload.Trigger>
                      </FileUpload.Dropzone>
                      <FileUpload.ItemGroup>
                        <FileUpload.Context>
                          {({ acceptedFiles }) =>
                            acceptedFiles.map((file, id) => (
                              <FileUpload.Item key={id} file={file}>
                                <FileUpload.ItemPreview type="image/*">
                                  <FileUpload.ItemPreviewImage />
                                </FileUpload.ItemPreview>
                                <FileUpload.ItemName />
                                <FileUpload.ItemSizeText />
                                <FileUpload.ItemDeleteTrigger asChild>
                                  <IconButton variant="link" size="sm">
                                    <FaTrash />
                                  </IconButton>
                                </FileUpload.ItemDeleteTrigger>
                              </FileUpload.Item>
                            ))
                          }
                        </FileUpload.Context>
                      </FileUpload.ItemGroup>
                      <FileUpload.HiddenInput />
                    </FileUpload.Root>
                  );
                }}
              </form.Field>
            </Stack>
            <Divider />
            <Stack gap="1">
              <FormLabel>{t('score')}</FormLabel>
              <form.Field name="score">
                {(field) => {
                  return (
                    <NumberInput
                      value={field.state.value + ''}
                      max={9}
                      step={1}
                      min={0}
                      onValueChange={({ valueAsNumber }) =>
                        field.handleChange(isNaN(valueAsNumber) ? 0 : valueAsNumber)
                      }
                      onBlur={field.handleBlur}
                    />
                  );
                }}
              </form.Field>
            </Stack>
            <Stack gap="1">
              <FormLabel>{t('background')}</FormLabel>
              <RadioButtonGroup.Root
                value={theme?.preset.bg}
                onValueChange={({ value }) => {
                  const preset = PRESETS.find((p) => p.bg === value);
                  if (preset) {
                    setTheme((t) => ({ ...t, preset }));
                  }
                }}
                flexDirection="row"
                flexWrap="wrap"
              >
                {PRESETS.map((option, idx) => (
                  <RadioButtonGroup.Item key={idx} value={option.bg} h="fit-content">
                    <RadioButtonGroup.ItemControl />
                    <styled.img
                      src={getAssetUrl(`assets/card-bg/${option.bg}`)}
                      alt={`theme-${idx}`}
                      maxH="75px "
                    />
                    {/* <RadioButtonGroup.ItemText asChild></RadioButtonGroup.ItemText> */}
                    <RadioButtonGroup.ItemHiddenInput />
                  </RadioButtonGroup.Item>
                ))}
              </RadioButtonGroup.Root>
            </Stack>
            <Stack gap="1">
              <FormLabel>{t('blade_heart')}</FormLabel>
              <RadioButtonGroup.Root
                value={theme?.trigger}
                onValueChange={({ value }) => {
                  setTheme((t) => {
                    if (!t) return t;
                    return { ...t, trigger: value };
                  });
                }}
                flexDirection="row"
                flexWrap="wrap"
              >
                {TRIGGERS.map((option, idx) => (
                  <RadioButtonGroup.Item key={option} value={option} h="fit-content">
                    <RadioButtonGroup.ItemControl />
                    <styled.img
                      src={getAssetUrl(`assets/hearts/${option}`)}
                      alt={`theme-${idx}`}
                      maxH="32px"
                    />
                    {/* <RadioButtonGroup.ItemText asChild></RadioButtonGroup.ItemText> */}
                    <RadioButtonGroup.ItemHiddenInput />
                  </RadioButtonGroup.Item>
                ))}
              </RadioButtonGroup.Root>
            </Stack>
          </Stack>
          <form.Subscribe>
            {(form) => {
              return <LovecaCanvas theme={theme ?? defaultTheme} data={form.values} />;
            }}
          </form.Subscribe>
        </form>
      </Container>
    </>
  );
}
