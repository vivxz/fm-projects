import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import PalettePreview from '../components/PalettePreview';

// const SOLARIZED = [
//   { colorName: 'Base03', hexCode: '#002b36' },
//   { colorName: 'Base02', hexCode: '#073642' },
//   { colorName: 'Base01', hexCode: '#586e75' },
//   { colorName: 'Base00', hexCode: '#657b83' },
//   { colorName: 'Base0', hexCode: '#839496' },
//   { colorName: 'Base1', hexCode: '#93a1a1' },
//   { colorName: 'Base2', hexCode: '#eee8d5' },
//   { colorName: 'Base3', hexCode: '#fdf6e3' },
//   { colorName: 'Yellow', hexCode: '#b58900' },
//   { colorName: 'Orange', hexCode: '#cb4b16' },
//   { colorName: 'Red', hexCode: '#dc322f' },
//   { colorName: 'Magenta', hexCode: '#d33682' },
//   { colorName: 'Violet', hexCode: '#6c71c4' },
//   { colorName: 'Blue', hexCode: '#268bd2' },
//   { colorName: 'Cyan', hexCode: '#2aa198' },
//   { colorName: 'Green', hexCode: '#859900' },
// ];

// const RAINBOW = [
//   { colorName: 'Red', hexCode: '#ff0000' },
//   { colorName: 'Orange', hexCode: '#ffa500' },
//   { colorName: 'Yellow', hexCode: '#ffff00' },
//   { colorName: 'Green', hexCode: '#008000' },
//   { colorName: 'Blue', hexCode: '#0000ff' },
//   { colorName: 'Violet', hexCode: '#8b00ff' },
// ];

// const PASTEL = [
//   { colorName: 'Salmon Pink', hexCode: '#ff9aa2' },
//   { colorName: 'Melon', hexCode: '#ffb7b2' },
//   { colorName: 'Pale Orange', hexCode: '#ffdac1' },
//   { colorName: 'Light Green', hexCode: '#e2f0cb' },
//   { colorName: 'Mint Green', hexCode: '#b5ead7' },
//   { colorName: 'Periwinkle', hexCode: '#c7ceea' },
// ];

// const COLOR_PALETTES = [
//   { paletteName: 'Solarized', colors: SOLARIZED },
//   { paletteName: 'Rainbow', colors: RAINBOW },
//   { paletteName: 'Pastel', colors: PASTEL },
// ];

const Home = ({ navigation, route }) => {
  const newColorPalette = route.params ? route.params.newColorPalette : undefined;
  const [colorPalettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchColorPalettes = useCallback(async () => {
    const results = await fetch('https://color-palette-api.now.sh/palettes') //to post you would want to add more attributes
    if (results.ok) {
      const palettes = await results.json();
      setColorPalettes(palettes);
    }
  }, []);

  useEffect(() => {
    fetchColorPalettes();
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchColorPalettes();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (newColorPalette) {
      setColorPalettes(palettes => [newColorPalette, ...palettes]) // adds the new palette to the top of the array
    }
  }, [newColorPalette]);

  return (
    <FlatList
      style={styles.list}
      data={colorPalettes}
      keyExtractor={item => item.paletteName}
      renderItem={({ item }) => (
        <PalettePreview
          handlePress={() => {
            navigation.navigate('ColorPalette', item)
          }}
          colorPalette={item}
        />
      )}
      // FlatList has a built in refresh control
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      // refreshControl={<RefreshControl refreshing={true} onRefresh={() => {}} />} -- requires you to import RefreshControl from reactnative
      ListHeaderComponent={<TouchableOpacity onPress={() => { navigation.navigate('ColorPaletteModal') }}><Text style={styles.buttonText}>Add Color Scheme</Text></TouchableOpacity>}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'teal',
    marginBottom: 10,
  }
})

export default Home;