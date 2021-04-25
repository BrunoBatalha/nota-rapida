import React, { useEffect, useState } from 'react';
import { StyleSheet, AsyncStorage, BackHandler } from 'react-native';
import { Text, Layout, Button, Icon } from '@ui-kitten/components';

import NoteList from '../features/note/views/NoteList';
import { INote } from '../features/note/views/types';

import { PlusIcon, SaveIcon } from '../shared/icons';
import { showAlert, showToast } from '../shared/utils/utils';

import { NoteContext } from '../features/note/noteContext';
import shortid from 'shortid';

const TEXTS_KEY = 'fields';

const App = () => {

    const [notes, setNotes] = useState<any>({});

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

    async function saveNotes() {
        try {
            // const texts = notes.map((note: INote) => note.text);
            const texts = Object.keys(notes).map(id => notes[id].text);
            await AsyncStorage.setItem(TEXTS_KEY, texts.join('SEPARATOR'));

            showToast('Salvo');
        } catch (err) {
            alert('Erro: ' + err);
        }
    }

    async function getNotes(): Promise<any> {
        try {
            const data: string | null = await AsyncStorage.getItem(TEXTS_KEY);
            if (!data) return [];

            const texts = data.split('SEPARATOR');
            const notes = texts.reduce((accumulator, text) => {
                const randomId = shortid.generate();
                return { ...accumulator, [randomId]: { text, visibleMenu: false, id: randomId } }
            }, {});

            return notes;
        } catch (err) {
            alert('Erro em recuperar notas' + err)
            return {};
        }
    }

    function addNote() {
        const randomId = shortid.generate();
        setNotes({ ...notes, [randomId]: { text: '', visibleMenu: false } });
    }

    function deleteNote(id: string) {
        showAlert(
            'Excluir',
            "Você tem certeza? Esta ação não pode ser desfeita",
            () => {
                // const updatedFields = [...notes.slice(0, index), ...notes.slice(index + 1, notes.length)];

                const notesUpdated = Object.keys(notes).reduce((accumulator, noteId) => {
                    if (noteId == id) return { ...accumulator };
                    else return { ...accumulator, [noteId]: { ...notes[noteId] } };
                }, {});
                setNotes(notesUpdated);
            });
    }


    function setText(text: string, id: string) {
        const notesUpdated = {...notes};
        notesUpdated[id].text = text;
        setNotes(notesUpdated);
    }

    function setVisibleMenu(visibleMenu: boolean, id: string) {        
        const notesUpdated = {...notes};
        notesUpdated[id].visibleMenu = visibleMenu;
        setNotes(notesUpdated);
    }


    return (
        <Layout style={styles.container}>
            <Text style={styles.title}>Nota Rápida - v0.0.2</Text>

            <NoteContext.Provider value={{ deleteNote, setText, setVisibleMenu, notes }}>
                <NoteList notes={notes} />
            </NoteContext.Provider>

            <Layout style={styles.containerButtons}>
                <Button style={{ ...styles.button, ...styles.centerContent }}
                    onPress={saveNotes}
                    status='success'
                    accessoryLeft={SaveIcon} />
                <Button style={{ ...styles.button, ...styles.centerContent }}
                    onPress={addNote}
                    accessoryLeft={PlusIcon} />
            </Layout>
        </Layout>
    );
}

export default App;

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flex: 1,
    },
    title: {
        height: 56,
        fontSize: 20,
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
