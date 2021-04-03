import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet, AsyncStorage, Clipboard, ToastAndroid,
  Alert, BackHandler, ScrollView, StatusBar,
} from 'react-native';
import * as eva from '@eva-design/eva';
import {
  ApplicationProvider, Text, Layout, List,
  Button, Icon, IconRegistry, OverflowMenu,
  MenuItem, Input
} from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons'; // https://akveo.github.io/eva-icons/#/


const TEXTS_KEY = 'fields';

interface Field {
  text: string,
  visibleMenu: boolean
}

function usePrevious(value: any): any {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  },[value]);
  return ref.current;
}

export default function App() {

  const scrollFields = useRef<null | HTMLElement>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const prevLength = usePrevious(fields.length)

  useEffect(() => {
    getFields().then(setFields);
  }, []);

  useEffect(() => {
    if(fields.length > prevLength){
      setTimeout(() => {
        scrollFields.current.scrollToEnd({ animated: true });        
      }, 100);
    }
  }, [fields.length]);

  useEffect(() => {
    // componentDidMount    
    const backAction = () => {
      showAlert('Até depois :D', 'Deseja realmente sair? Não esqueça de salvar suas alterações', () => { BackHandler.exitApp() })
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // componentWillUnmount
    return () => backHandler.remove();
  }, []);


  async function saveFields(fields: Field[]) {
    try {
      const texts = fields.map((field: Field) => field.text);
      await AsyncStorage.setItem(TEXTS_KEY, texts.join('SEPARATOR'));
      showToast('Salvo');
    } catch (err) {
      alert('Erro: ' + err);
    }
  }

  function showToast(text: string) {
    ToastAndroid.showWithGravityAndOffset(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      100
    );
  }

  async function getFields(): Promise<Field[]> {
    try {
      const data: string | null = await AsyncStorage.getItem(TEXTS_KEY);
      if (!data) return [];

      const texts = data.split('SEPARATOR');
      const fields = texts.map(text => ({ text, visibleMenu: false }));

      return fields || [];
    } catch (err) {
      alert('Erro em recuperar nota anterior' + err)
      return [];
    }
  }

  function addField() {
    setFields([...fields, { text: '', visibleMenu: false }]);
  }

  function onChangeText(text: string, index: number) {
    setFields([
      ...fields.slice(0, (index + 1) - 1),
      { ...fields[index], text: text },
      ...fields.slice((index + 1))])
  }

  function deleteField(index: number) {
    showAlert(
      'Cuidado!',
      "Deseja realmente excluir este campo? Esta ação não pode ser desfeita",
      () => {
        const updatedFields: Field[] = [...fields.filter((field: Field, idx: number) => idx != index)];
        setFields(updatedFields);
      });
  }

  function showAlert(title: string, description: string, cbConfirm, cbCancel = () => { }) {
    Alert.alert(title, description,
      [
        {
          text: "Cancelar",
          onPress: () => cbCancel(),
        },
        {
          text: "Continuar",
          onPress: () => cbConfirm()
        }
      ],
      { cancelable: false }
    )
  }

  function copyField(text: string) {
    Clipboard.setString(text);
    showToast('Copiado');
  }

  const CopyIcon = (props) => (
    <Icon {...props} name='copy' />
  );
  const DeleteIcon = (props) => (
    <Icon {...props} name='trash-2' />
  );
  const MenuFieldIcon = (props) => (
    <Icon {...props} name='more-vertical-outline' />
  );
  const SaveIcon = (props) => (
    <Icon {...props} name='save' />
  );
  const PlusIcon = (props) => (
    <Icon {...props} name='plus' />
  );

  function renderToggleButton(index: number) {
    return (
      <Button
        status='basic'
        appearance='ghost'
        onPress={() => setVisibleMenuItem(index, true)}
        accessoryLeft={MenuFieldIcon}
      />
    )
  }

  function setVisibleMenuItem(index: number, visibleMenu: boolean) {
    setFields([
      ...fields.slice(0, (index + 1) - 1),
      { ...fields[index], visibleMenu },
      ...fields.slice((index + 1))])
  }

  function MenuField({ text, visibleMenu, index }) {
    return (
      <OverflowMenu
        visible={visibleMenu}
        anchor={() => renderToggleButton(index)}
        onBackdropPress={() => { setVisibleMenuItem(index, false) }}
      >
        <MenuItem title="Copiar" accessoryLeft={CopyIcon} onPress={() => copyField(text)} />
        <MenuItem title="Excluir" accessoryLeft={DeleteIcon} onPress={() => deleteField(index)} />
      </OverflowMenu>
    )
  }

  function renderItem({ item, index }) {
    return (
      <Layout style={styles.containerField}>
        <Input
          keyboardAppearance='dark'
          style={styles.fieldText}
          multiline
          onChangeText={text => onChangeText(text, index)}
          value={item.text}
          placeholder='Ex.: Re:zero, Jujutsu Kaisen...'
        />
        <MenuField
          text={item.text}
          visibleMenu={item.visibleMenu}
          index={index}
        />
      </Layout>
    );
  }

  return (
    <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
      <IconRegistry icons={EvaIconsPack} />
      <StatusBar hidden={true} />

      <Layout style={styles.container}>
        <Text style={styles.title}>Nota Rápida</Text>
        {/* <Layout style={{ flex: 1 }}> */}
        {/* <ScrollView> */}
        <List
          ref={scrollFields}
          style={{ backgroundColor: 'transparent' }}
          data={fields}
          renderItem={renderItem}
        />
        {/* </ScrollView> */}
        {/* </Layout> */}
        <Layout style={styles.containerButtons}>
          <Button style={{ ...styles.button, ...styles.centerContent }}
            onPress={e => saveFields(fields)}
            status='success'
            accessoryLeft={SaveIcon} />

          <Button style={{ ...styles.button, ...styles.centerContent }}
            onPress={e => addField()}
            accessoryLeft={PlusIcon} />
        </Layout>

      </Layout>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    flex: 1,
  },
  title: {
    height: 56,
    fontSize: 24,
    textAlignVertical: "center",
  },
  fieldText: {
    flex: 10,
  },
  button: {
    flex: 1
  },
  containerField: {
    flexDirection: 'row',
  },
  containerButtons: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
  },
  centerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
