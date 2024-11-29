import React from 'react';
import { CheckBox } from '@rneui/base';
import { useTranslation } from 'react-i18next';

export const Checkbox1 = ({ isChecked, setIsChecked }) => {
  const {t} = useTranslation();
  
  return(
  <CheckBox
    title={t('Register-terms')}
    checked={isChecked}
    onPress={() => setIsChecked(!isChecked)}
  />
)};

export const Checkbox2 = ({ isChecked, setIsChecked }) => {
  const {t} = useTranslation();
  
  return(
  <CheckBox
    title={t('Login-check')}
    checked={isChecked}
    onPress={() => setIsChecked(!isChecked)}
  />
)};

