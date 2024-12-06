import React from 'react';
import { CheckBox } from '@rneui/base';
import { useTranslation } from 'react-i18next';

export const CheckboxLogin = ({ isChecked, setIsChecked }) => {
  const {t} = useTranslation();
  
  return(
  <CheckBox
    title={t('Login-check')}
    checked={isChecked}
    onPress={() => setIsChecked(!isChecked)}
  />
)};

