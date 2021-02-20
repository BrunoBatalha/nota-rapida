import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Button, AsyncStorage, TouchableOpacity } from 'react-native';

export default function App() {

  const [fields, setFields]:any = useState([{text: 'bruo'}]);

  useEffect(() => {
    loadFields();
  }, [])

  async function saveFields(fields: any) {
    try {
      await AsyncStorage.setItem('fields', fields.join('SEPARATOR'));
      alert('Salvo');
    } catch (err) {
      alert('Erro: '+err);
    }
  }

  async function loadFields() {
    try {
      const data:string | null = await AsyncStorage.getItem('fields')
      setFields(data ? data.split('SEPARATOR') : []);
    } catch (err) {
      alert('Erro em recuperar nota anterior' + err)
    }
  }

  function addField(){
    setFields([...fields, '']);
  }

  function handleChangeText(text:string, index:number){
    const newFields = [...fields];
    newFields[index] = text;
    setFields(newFields);
  }
  
  function removeField(index:number){
    const newFields = [...fields.filter((field:any,idx:number)=> idx != index)];
    setFields(newFields);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nota Rápida</Text>
      {fields.map((field:any,index:number)=>
        <View style={styles.containerField}>
          <TextInput
            key={index}
            multiline={true}
            style={styles.fieldText}
            value={field}
            onChangeText={text=>handleChangeText(text,index)}
            placeholder='Ex.: Assistir 2° temporada do anime X' >
          </TextInput>        
          <TouchableOpacity style={styles.buttonDelete} onPress={e=>removeField(index)}>
            <Text style={styles.buttonDeleteText}>-</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.buttonAdd} onPress={e=>addField()}>
        <Text style={styles.buttonSaveText}>Novo campo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSave} onPress={e=>saveFields(fields)}>
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
    width: '90%',
    fontSize: 16,
    borderBottomColor: '#5CB7F4',
    borderBottomWidth: 2,
    marginRight: 5
  },
  buttonAdd: {
    marginTop: 15,
    width: '100%',
    backgroundColor: '#000',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDelete: {
    backgroundColor: '#000',
    height: 30,
    width: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonDeleteText: {
    color: 'red',
    fontSize: 45,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: "900"
  },
  buttonSaveText: {
    color: '#fff',
    fontSize: 20,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  containerField:{
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  }
});
