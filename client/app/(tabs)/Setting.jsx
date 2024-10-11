import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Button } from '@rneui/base';

export default function Setting() {

  return (
    <View style={styles.container}>
      <Button 
        title="Cambiar Tema"
        buttonStyle={{ paddingHorizontal: 45, borderRadius: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
