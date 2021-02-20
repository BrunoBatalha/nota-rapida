import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, AsyncStorage, TouchableOpacity, ScrollView, Clipboard, ToastAndroid, Alert, BackHandler } from 'react-native';
import {Feather, MaterialIcons} from '@expo/vector-icons';
export default function App() {

  const scrollFields = useRef< null | HTMLElement>(null);
  const [fields, setFields]:any = useState<String[]>([]);

  useEffect(() => {
    loadFields();
  }, []);

  useEffect(() => {
    if (scrollFields.current) {
      scrollFields.current.scrollToEnd({animated: true});
    }
  }, [fields]);

  useEffect(() => {
    // componentDidMount    
    const backAction = () => {
      showAlert('Até depois :D','Deseja realmente sair? Não esqueça de salvar suas alterações',()=>{BackHandler.exitApp()})
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // componentWillUnmount
    return () => backHandler.remove();
  }, []);


  async function saveFields(fields: any) {
    try {
      await AsyncStorage.setItem('fields', fields.join('SEPARATOR'));
      showToast('Salvo');
    } catch (err) {
      alert('Erro: '+err);
    }
  }

  function showToast(text:string){
    ToastAndroid.showWithGravityAndOffset(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      100
    );
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
  
  function deleteField(index:number){
    showAlert(
      'Cuidado!',
      "Deseja realmente excluir este campo? Esta ação não pode ser desfeita",
      ()=>{
        const newFields = [...fields.filter((field:any,idx:number)=> idx != index)];
        setFields(newFields);
      });    
  }

  function showAlert(title:string, description:string, cbConfirm,  cbCancel=()=>{}){
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

  function copyField(text:string)  {
    Clipboard.setString(text);
    showToast('Copiado');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nota Rápida</Text>

      <ScrollView style={{height: '100%', marginBottom: 40}} ref={scrollFields}>
          {fields.map((field:any,index:number)=>
              <View style={styles.containerField} key={index}>                
                <TextInput
                  multiline={true}
                  style={styles.fieldText}
                  value={field}
                  onChangeText={text=>handleChangeText(text,index)}
                  placeholder='Ex.: Assistir 2° temporada do anime X' >
                </TextInput>        
                <TouchableOpacity  style={styles.buttonIcon} onPress={e=>copyField(field)}>
                  <Feather name='copy' size={20} color='#353839' />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonIcon}  onPress={e=>deleteField(index)}>
                  <MaterialIcons name='delete' size={21} color='red' />
                </TouchableOpacity>
              </View>        
          )}
      </ScrollView>
        
      <View style={styles.containerButtons}>
        <TouchableOpacity style={{...styles.buttonSave, ...styles.centerContent}} 
        onPress={e=>saveFields(fields)}>
          {/* <Text style={styles.buttonSaveText}>Salvar
          </Text> */}
            <Feather name='save' size={20} color='#fff' />
        </TouchableOpacity>

        <TouchableOpacity style={{...styles.buttonAdd, ...styles.centerContent}} 
          onPress={e=>addField()}>
          {/* <Text style={styles.buttonSaveText}>Novo
          </Text> */}
            <Feather name='plus' size={20} color='#fff' />
          
        </TouchableOpacity>
      </View>
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
  buttonIcon:{
    flex: 1,
  },
  fieldText: {
    flex: 10,
    fontSize: 16,
    borderBottomColor: '#5CB7F4',
    borderBottomWidth: 2,
    marginRight: 5
  },
  buttonAdd: {
    backgroundColor: '#000',
    flex:1
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
    backgroundColor: '#008000',
    flex:1
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
    padding: 5
  },
  containerButtons:{
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
  },
  centerContent:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
