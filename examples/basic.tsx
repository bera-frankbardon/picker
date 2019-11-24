import React from 'react';
import moment, { Moment } from 'moment';
import Picker from '../src/Picker';
import PickerPanel from '../src/PickerPanel';
import { GenerateConfig } from '../src/utils/generateUtil';
import zhCN from '../src/locale/zh_CN';
import enUS from '../src/locale/en_US';
import jaJP from '../src/locale/ja_JP';
import '../assets/index.less';
import { PanelMode } from '../src/interface';

// const defaultValue = moment('2019-09-03 05:02:03');
const defaultValue = moment('2019-11-28 01:02:03');

const generateConfig: GenerateConfig<Moment> = {
  // get
  getFirstDateOfMonth: date => {
    const clone = date.clone();
    clone.date(1);
    return clone;
  },
  getLastDateOfMonth: date => {
    const clone = date.clone();
    clone
      .date(1)
      .add(1, 'month')
      .subtract(1, 'day');
    return clone;
  },
  getNow: () => moment(),
  getWeekDay: date => date.weekday(),
  getYear: date => date.year(),
  getMonth: date => date.month(),
  getDate: date => date.date(),
  getHour: date => date.hour(),
  getMinute: date => date.minute(),
  getSecond: date => date.second(),

  // set
  addYear: (date, diff) => {
    const clone = date.clone();
    clone.add(diff, 'year');
    return clone;
  },
  addMonth: (date, diff) => {
    const clone = date.clone();
    clone.add(diff, 'month');
    return clone;
  },
  addDate: (date, diff) => {
    const clone = date.clone();
    clone.add(diff, 'day');
    return clone;
  },
  setYear: (date, year) => {
    const clone = date.clone();
    clone.year(year);
    return clone;
  },
  setMonth: (date, month) => {
    const clone = date.clone();
    clone.month(month);
    return clone;
  },
  setDate: (date, num) => {
    const clone = date.clone();
    clone.date(num);
    return clone;
  },
  setHour: (date, hour) => {
    const clone = date.clone();
    clone.hour(hour);
    return clone;
  },
  setMinute: (date, minute) => {
    const clone = date.clone();
    clone.minute(minute);
    return clone;
  },
  setSecond: (date, second) => {
    const clone = date.clone();
    clone.second(second);
    return clone;
  },

  locale: {
    getWeekFirstDay: locale => {
      const date = moment().locale(locale);
      return date.localeData().firstDayOfWeek();
    },
    getWeek: (locale, date) => {
      const clone = date.clone();
      clone.locale(locale);
      return clone.week();
    },
    getShortWeekDays: locale => {
      const date = moment().locale(locale);
      return date.localeData().weekdaysMin();
    },
    getShortMonths: locale => {
      const date = moment().locale(locale);
      return date.localeData().monthsShort();
    },
    format: (locale, date, format) => {
      const clone = date.clone();
      clone.locale(locale);
      return clone.format(format);
    },
    parse: (locale, text, formats) => {
      for (let i = 0; i < formats.length; i += 1) {
        let format = formats[i];
        let strictMode = true;

        if (format.includes('o')) {
          format = format.replace(/o/g, '');
          strictMode = false;
        }

        const date = moment(text, format, locale, strictMode);
        if (date.isValid()) {
          return date;
        }
      }
      return null;
    },
  },
};

const getMonthNextMode = (next: PanelMode): PanelMode => {
  if (next === 'date') {
    return 'month';
  }
  return next;
};

const getWeekNextMode = (next: PanelMode): PanelMode => {
  if (next === 'date') {
    return 'week';
  }
  return next;
};

export default () => {
  const [value, setValue] = React.useState<Moment | null>(defaultValue);

  const onSelect = (newValue: Moment) => {
    console.log('Select:', newValue);
  };

  const onChange = (newValue: Moment | null, formatString?: string) => {
    console.log('Change:', newValue, formatString);
    setValue(newValue);
  };

  const sharedProps = {
    generateConfig,
    value,
    onSelect,
    onChange,
  };

  return (
    <div>
      <h1>Value: {value ? value.format('YYYY-MM-DD HH:mm:ss') : 'null'}</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ margin: '0 8px' }}>
          <h3>Basic</h3>
          <PickerPanel<Moment> {...sharedProps} locale={zhCN} />
        </div>

        <div style={{ margin: '0 8px' }}>
          <h3>1 Month earlier</h3>
          <PickerPanel<Moment>
            {...sharedProps}
            defaultPickerValue={defaultValue.clone().subtract(1, 'month')}
            locale={enUS}
          />
        </div>

        <div style={{ margin: '0 8px' }}>
          <h3>Week Picker CN</h3>
          <PickerPanel<Moment>
            {...sharedProps}
            locale={zhCN}
            getNextMode={getWeekNextMode}
          />
        </div>

        <div style={{ margin: '0 8px' }}>
          <h3>Month Picker</h3>
          <PickerPanel<Moment>
            {...sharedProps}
            locale={zhCN}
            getNextMode={getMonthNextMode}
          />
        </div>

        <div style={{ margin: '0 8px' }}>
          <h3>Week Picker US</h3>
          <PickerPanel<Moment>
            {...sharedProps}
            locale={enUS}
            getNextMode={getWeekNextMode}
          />
        </div>

        <div style={{ margin: '0 8px' }}>
          <h3>Time</h3>
          <PickerPanel<Moment> {...sharedProps} locale={jaJP} mode="time" />
        </div>
        <div style={{ margin: '0 8px' }}>
          <h3>Time AM/PM</h3>
          <PickerPanel<Moment>
            {...sharedProps}
            locale={jaJP}
            mode="time"
            showTime={{
              use12Hours: true,
              showSecond: false,
              format: 'hh:mm A',
            }}
          />
        </div>
        <div style={{ margin: '0 8px' }}>
          <h3>Datetime</h3>
          <PickerPanel<Moment> {...sharedProps} locale={zhCN} showTime />
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ margin: '0 8px' }}>
          <h3>Basic</h3>
          <Picker<Moment> {...sharedProps} locale={zhCN} />
        </div>
        <div style={{ margin: '0 8px' }}>
          <h3>Datetime</h3>
          <Picker<Moment> {...sharedProps} locale={zhCN} showTime />
        </div>
        <div style={{ margin: '0 8px' }}>
          <h3>Week</h3>
          <Picker<Moment>
            {...sharedProps}
            locale={zhCN}
            format="YYYY-Wo"
            allowClear
            getNextMode={getWeekNextMode}
          />
        </div>
      </div>
    </div>
  );
};
