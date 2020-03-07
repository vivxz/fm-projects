import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import PalettePreview from '../components/PalettePreview';

const SOLARIZED = [
  { colorName: 'Base03', hexCode: '#002b36' },
  { colorName: 'Base02', hexCode: '#073642' },
  { colorName: 'Base01', hexCode: '#586e75' },
  { colorName: 'Base00', hexCode: '#657b83' },
  { colorName: 'Base0', hexCode: '#839496' },
  { colorName: 'Base1', hexCode: '#93a1a1' },
  { colorName: 'Base2', hexCode: '#eee8d5' },
  { colorName: 'Base3', hexCode: '#fdf6e3' },
  { colorName: 'Yellow', hexCode: '#b58900' },
  { colorName: 'Orange', hexCode: '#cb4b16' },
  { colorName: 'Red', hexCode: '#dc322f' },
  { colorName: 'Magenta', hexCode: '#d33682' },
  { colorName: 'Violet', hexCode: '#6c71c4' },
  { colorName: 'Blue', hexCode: '#268bd2' },
  { colorName: 'Cyan', hexCode: '#2aa198' },
  { colorName: 'Green', hexCode: '#859900' },
];

const RAINBOW = [
  { colorName: 'Red', hexCode: '#ff0000' },
  { colorName: 'Orange', hexCode: '#ffa500' },
  { colorName: 'Yellow', hexCode: '#ffff00' },
  { colorName: 'Green', hexCode: '#008000' },
  { colorName: 'Blue', hexCode: '#0000ff' },
  { colorName: 'Violet', hexCode: '#8b00ff' },
];

const PASTEL = [
  { colorName: 'Salmon Pink', hexCode: '#ff9aa2' },
  { colorName: 'Melon', hexCode: '#ffb7b2' },
  { colorName: 'Pale Orange', hexCode: '#ffdac1' },
  { colorName: 'Light Green', hexCode: '#e2f0cb' },
  { colorName: 'Mint Green', hexCode: '#b5ead7' },
  { colorName: 'Periwinkle', hexCode: '#c7ceea' },
];

const COLOR_PALETTES = [
  { paletteName: 'Solarized', colors: SOLARIZED },
  { paletteName: 'Rainbow', colors: RAINBOW },
  { paletteName: 'Pastel', colors: PASTEL },
];

const Home = ({ navigation }) => {
  return (
    <FlatList
      style={styles.list}
      data={COLOR_PALETTES}
      keyExtractor={item => item.paletteName}
      renderItem={({ item }) => (
        <PalettePreview
          handlePress={() => {
            navigation.navigate('ColorPalette', item)
          }}
          colorPalette={item}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: 'white',
  }
})

export default Home;