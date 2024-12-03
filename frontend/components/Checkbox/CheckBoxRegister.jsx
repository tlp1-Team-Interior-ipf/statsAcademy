import React from 'react';
import { CheckBox } from '@rneui/base';
import { useTranslation } from 'react-i18next';

export const CheckboxRegister = ({ isChecked, setIsChecked }) => {
    const {t} = useTranslation();
    
    return(
    <CheckBox
      title={t('Register-terms')}
      checked={isChecked}
      onPress={() => setIsChecked(!isChecked)}
    />
  )};