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

    async function saveNotes() {
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
            const notes = texts.map(text => ({ text, visibleMenu: false, id: shortid.generate() }));

            return notes || [];
        } catch (err) {
            alert('Erro em recuperar notas' + err)
            return [];
        }
    }

    function addNote() {
        setNotes([...notes, { text: '', visibleMenu: false, id: shortid.generate() }]);
    }

    function setText(text: string, index: number) {
        setNotes([
            ...notes.slice(0, (index + 1) - 1),
            { ...notes[index], text: text },
            ...notes.slice((index + 1))])
    }

    function setVisibleMenu(visibleMenu: boolean, index: number) {
        setNotes([
            ...notes.slice(0, (index + 1) - 1),
            { ...notes[index], visibleMenu: visibleMenu },
            ...notes.slice((index + 1))])
    }

    function deleteNote(index: number) {
        showAlert(
            'Excluir',
            "Você tem certeza? Esta ação não pode ser desfeita",
            () => {
                // const updatedFields: INote[] = [...notes.filter((note: INote, idx: number) => idx != index)];
                const updatedFields = [...notes.slice(0, index), ...notes.slice(index + 1, notes.length)];
                setNotes(updatedFields);
            });
    }

    return (
        <Layout style={styles.container}>
            <Text style={styles.title}>Nota Rápida</Text>

            <NoteContext.Provider value={{ deleteNote, setText, setVisibleMenu }}>
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
