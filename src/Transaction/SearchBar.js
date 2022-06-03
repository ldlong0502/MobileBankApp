import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { COLORS, icons } from '../../constants';
import { useTranslation } from 'react-i18next';
export default function SearchBar({updateSearch, style}) {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [hide, setHide] = useState(false);
  const [value, setValue] = useState('');
  return (
    <View style={[styles.container, style]}>
      <View style={styles.searchContainer}>
        <View style={styles.vwSearch}>
          <Image
            style={styles.icSearch}
            source={icons.search}
          />
        </View>

        <TextInput
          value={query}
          placeholder= {t('common:search')}
          style={styles.textInput}
          onChangeText={text => {
            setQuery(text);
            setHide(text.length !== 0 ? true : false);
            updateSearch(text);
          }}
          defaultValue={query}
        />
        {hide ? (
          <TouchableOpacity
            onPress={() => {
              setQuery('');
              updateSearch('');
              setHide(false);
            }}
            style={styles.vwClear}>
            <Image
              style={styles.icClear}
              source={icons.backspace}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.vwClear} />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  txtError: {
    marginTop: '2%',
    width: '89%',
    color: 'white',
  },
  vwClear: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
  },

  vwSearch: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icSearch: {
    height: 18,
    width: 18,
  },
  searchContainer: {
    width: '90%',
    height: 50,
    flexDirection: 'row',
    borderRadius: 30,
    borderColor: COLORS.green,
    borderWidth: 1,
  },
  container: {
    height: 80,
    alignItems: 'center',
  },
  icClear: {
    height: 20,
    width: 20,
  },
});
