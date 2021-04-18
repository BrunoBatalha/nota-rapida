import React, { useEffect, useState } from 'react';
import { StyleSheet, AsyncStorage, BackHandler, StatusBar, } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Text, Layout, Button, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './custom-theme.json';
// https://akveo.github.io/eva-icons/#/
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import NoteList from '../features/note/views/NoteList';
import { INote } from '../features/note/views/types';

import { PlusIcon, SaveIcon } from '../shared/icons';
import { showAlert, showToast } from '../shared/utils/utils';

import { NoteContext } from '../features/note/noteContext';


const TEXTS_KEY = 'fields';

export default function App() {

    const [notes, setNotes] = useState<INote[]>([]);

    useEffect(() => {
        getNotes().then(setNotes);
    }, []);

    useEffect(() => {
        // componentDidMount    
        const backAction = () => {
            showAlert(
                'Até depois :D',
                'Deseja realmente sair? Não esqueça de salvar suas alterações',
                () => { BackHandler.exitApp() });

            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        // componentWillUnmount
        return () => backHandler.remove();
    }, []);

    async function saveNotes(notes: INote[]) {
        try {
            const texts = notes.map((note: INote) => note.text);
            await AsyncStorage.setItem(TEXTS_KEY, texts.join('SEPARATOR'));

            showToast('Salvo');
        } catch (err) {
            alert('Erro: ' + err);
        }
    }

    async function getNotes(): Promise<INote[]> {
        try {
            const data: string | null = await AsyncStorage.getItem(TEXTS_KEY);
            if (!data) return [];

            const texts = data.split('SEPARATOR');
            const notes = texts.map(text => ({ text, visibleMenu: false }));

            return notes || [];
        } catch (err) {
            alert('Erro em recuperar nota anterior' + err)
            return [];
        }
    }

    function addNote() {
        setNotes([...notes, { text: '', visibleMenu: false }]);
    }

    // function onChangeText(text: string, index: number) {
    //     setNotes([
    //         ...notes.slice(0, (index + 1) - 1),
    //         { ...notes[index], text: text },
    //         ...notes.slice((index + 1))])
    // }

    function deleteNote(index: number) {
        showAlert(
            'Cuidado!',
            "Deseja realmente excluir este campo? Esta ação não pode ser desfeita",
            () => {
                // const updatedFields: INote[] = [...notes.filter((note: INote, idx: number) => idx != index)];
                const updatedFields = [...notes.slice(0, index), ...notes.slice(index + 1, notes.length)];
                setNotes(updatedFields);
            });
    }


    return (
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
            <IconRegistry icons={EvaIconsPack} />
            <StatusBar hidden={true} />

            <Layout style={styles.container}>
                <Text style={styles.title}>Nota Rápida</Text>

                <NoteContext.Provider value={{ deleteNote: deleteNote }}>
                    <NoteList notes={notes} />
                </NoteContext.Provider>

                <Layout style={styles.containerButtons}>
                    <Button style={{ ...styles.button, ...styles.centerContent }}
                        onPress={e => saveNotes(notes)}
                        status='success'
                        accessoryLeft={SaveIcon} />

                    <Button style={{ ...styles.button, ...styles.centerContent }}
                        onPress={e => addNote()}
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
    button: {
        flex: 1
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
