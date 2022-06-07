import React, {createContext, Dispatch, SetStateAction} from 'react';
import {Asset} from 'react-native-image-picker';
import {SelectDateProp} from '~/src/types/type';

interface SelectProps {
  selectDate: SelectDateProp;
  setSelectDate: React.Dispatch<React.SetStateAction<SelectDateProp>>;
}

export const SelectContext = createContext<SelectProps>({
  selectDate: {
    year: 0,
    month: 0,
    date: 0,
    day: '',
    time: '',
  },
  setSelectDate: () => {},
});

interface SelectImageProps {
  selectImage: Asset[];
  setSelectImage: Dispatch<SetStateAction<Asset[]>>;
}

export const SelectImageContext = createContext<SelectImageProps>({
  selectImage: [],
  setSelectImage: () => {},
});

interface SelectStymptomProps {
  symptomText: string;
  setSymptomText: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectSymptomContext = createContext<SelectStymptomProps>({
  symptomText: '',
  setSymptomText: () => {},
});
