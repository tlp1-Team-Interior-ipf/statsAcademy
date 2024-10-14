import React from 'react';
import { CheckBox } from '@rneui/base';

export const Checkbox1 = ({ isChecked, setIsChecked }) => (
  <CheckBox
    title="Términos y Condiciones"
    checked={isChecked}
    onPress={() => setIsChecked(!isChecked)}
  />
);

export const Checkbox2 = ({ isChecked, setIsChecked }) => (
  <CheckBox
    title="Recúerdame"
    checked={isChecked}
    onPress={() => setIsChecked(!isChecked)}
  />
);

