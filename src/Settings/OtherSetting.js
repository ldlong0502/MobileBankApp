import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, { useTransition } from 'react';
import { COLORS, FONTS, icons, SIZES, theme } from '../../constants';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import ChangeLanguageForm from './ChangeLanguage';
import { useTranslation } from 'react-i18next';
export default function OtherSetting({ close }) {
  const {t} = useTranslation();
  const [showLanguage,setShowLanguage] = React.useState(false);
  const list = [
    {
      id: 1,
      title: t('common:languageSetting'),
      icons: icons.language,
    },
  ];
  const closeChangeLanguage = () => {
      setShowLanguage(false);
  };
  const renderHeader = () => {
    return (
      <View
        style={{ flex: 1, flexDirection: 'row', marginTop: SIZES.padding - 5 }}
      >
        <TouchableOpacity
          onPress={close}
          style={{ flex: 1, alignSelf: 'center', paddingLeft: 5 }}
        >
          <Image style={{ height: 30, width: 30 }} source={icons.back} />
        </TouchableOpacity>
        <Text
          style={{
            flex: 2,
            fontSize: 18,
            color: '#000',
            alignSelf: 'center',
            marginLeft: 80,
            ...FONTS.h3,
          }}
        >
          {t('common:setting')}
        </Text>
        <TouchableOpacity
          style={{ flex: 1, alignSelf: 'center', alignItems: 'flex-end' }}
        >
          <Image
            style={{ height: 25, width: 25, marginRight: 10 }}
            source={icons.home}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return <Modal animationType={'slide'} transparent={false} visible={true} onRequestClose={close}>
      <ScrollView style={{ flex: 1 }}>
        {renderHeader()}
        {list.map((item, index) => {
          return <View key={index} style={{ flex: 10, flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => setShowLanguage(true)} style={{ flex: 2, borderRadius: 30, borderColor: COLORS.green, borderWidth: 2, marginTop: 10, flexDirection: 'row' }}>
                <Image style={{ flex: 1, alignSelf: 'center', marginLeft: 10, height: 30, width: 30 }} source={item.icons} />
                <Text style={{ flex: 10, alignSelf: 'flex-end', color: '#000', padding: 20, ...FONTS.body2 }}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            </View>;
        })}
      </ScrollView>
      {showLanguage && <ChangeLanguageForm closePopup={closeChangeLanguage} />}
    </Modal>;
}
