import React from 'react';
import { Feather } from '@expo/vector-icons';

import {
  Calendar as CustomCalendar,
  DateData,
  LocaleConfig,
} from 'react-native-calendars';
import { useTheme } from 'styled-components/native';
import { ptBR } from './localeConfig';

LocaleConfig.locales['pt-br'] = ptBR;

LocaleConfig.defaultLocale = 'pt-br';

export { generateDefaultInterval } from './generateInterval';

interface MarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disableTouchEvent?: boolean;
  };
}

interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  onDayPress: (date: DateData) => void;
}

function Calendar({ markedDates, onDayPress }: CalendarProps) {
  const theme = useTheme();

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1);
  const day = String(today.getDate());

  const minDate = `${year}-${month.length === 1 ? `0${month}` : month}-${
    day.length === 1 ? `0${day}` : day
  }`;

  console.log(minDate);

  return (
    <CustomCalendar
      renderArrow={(direction) => (
        <Feather
          size={24}
          color={theme.colors.shape}
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
        />
      )}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        arrowStyle: {
          marginHorizontal: -15,
        },
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        textMonthFontFamily: theme.fonts.secondary_600,
      }}
      firstDay={1}
      minDate={minDate}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export { MarkedDateProps, DayProps, Calendar };
