import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Button, AsyncStorage, TouchableOpacity } from 'react-native';

export default function App() {

  const [text, setText] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('text').then((data: string | null) => {
      setText(data || '')
    }).catch(err => alert('Erro em recuperar nota anterior' + err))
  }, [])

  function saveText(text: string) {
    AsyncStorage.setItem('text', text)
  }

  function getText() {
    AsyncStorage.getItem('text').then((data: string | null) => {
      setText(data || '')
    }).catch(err => alert('Erro em recuperar nota anterior' + err))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nota Rápida</Text>
      <TextInput
        multiline={true}
        style={styles.fieldText}
        value={text}
        onChangeText={setText}
        placeholder='Ex.: Assistir 2° temporada de Kanojo Okarishimasu' >
      </TextInput>
      {/* <Button title='Salvar' onPress={e => saveText(text)} />
      <Button title='Mostrar antigo' onPress={e => getText()} /> */}
      <TouchableOpacity style={styles.buttonSave}>
        <Text style={styles.buttonSaveText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: '5%',
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    marginTop: 25,
    borderBottomColor: '#c3c3c3',
    borderBottomWidth: 2
  },
  fieldText: {
    marginTop: 5,
    fontSize: 16
  },
  buttonSave: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    backgroundColor: '#5CB7F4',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSaveText: {
    color: '#fff',
    fontSize: 20,
    textTransform: 'uppercase',
    letterSpacing: 2
  }
});
