import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import ColorBox from '../components/ColorBox';


const ColorPalette = ({ route }) => {
  const { paletteName, colors } = route.params;
  return (
    <FlatList // always scroll-able
      style={styles.container}
      data={colors}
      keyExtractor={item => item.colorName} // If data already includes key, this isn't needed.
      renderItem={({ item }) => <ColorBox colorName={item.colorName} hexCode={item.hexCode} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  }
});

export default ColorPalette;