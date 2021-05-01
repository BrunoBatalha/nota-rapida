import React, { useEffect, useState } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import { Text, Layout, Button } from '@ui-kitten/components';

import NoteList from '../views/NoteList';
import { INote } from '../types';

import { PlusIcon } from '../../../shared/icons';
import { showAlert } from '../../../shared/utils/utils';

import { NoteContext } from '../noteContext';
import shortid from 'shortid';
import { noteService } from '../noteService';
import { initDatabase } from '../../../services/database';

const App = () => {

    const [notes, setNotes] = useState<INote[]>([]);

    useEffect(() => {
        listNotes().then(setNotes);
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

    async function listNotes(): Promise<INote[]> {
        try {
            await noteService.save({content: 'teste1', id:shortid.generate()})
            await noteService.save({content: 'teste2', id:shortid.generate()})
            await noteService.save({content: 'teste3', id:shortid.generate()})
            const notes = await noteService.list();
            return notes;
        } catch (err) {
            // TODO: testar isso
            alert('Erro em recuperar notas\n' + err)
            return [];
        }
    }

    function addNote() {
        try {
            const newNote = { id: shortid.generate(), content: '' };
            noteService.save(newNote);
            setNotes([...notes, newNote]);
        } catch (err) {
            alert('Erro em recuperar notas\n' + err)
        }
    }

    function deleteNote(note: INote) {
        showAlert(
            'Excluir',
            "Você tem certeza?",
            async () => {
                try {
                    const notes = await noteService.remove(note)
                    setNotes(notes);
                } catch (err) {
                    alert('Erro em recuperar notas\n' + err)
                }
            });
    }


    function setText(text: string, id: string) {
        // const notesUpdated = { ...notes };
        // notesUpdated[id].text = text;
        // setNotes(notesUpdated);
    }

    function setVisibleMenu(visibleMenu: boolean, id: string) {
        // const notesUpdated = { ...notes };
        // notesUpdated[id].visibleMenu = visibleMenu;
        // setNotes(notesUpdated);
    }


    return (
        <Layout style={styles.container}>
            <Text style={styles.title}>Nota Rápida - v0.0.2</Text>

            <NoteContext.Provider value={{ deleteNote, setText, setVisibleMenu }}>
                <NoteList notes={notes} />
            </NoteContext.Provider>

            <Layout style={styles.containerButtons}>
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
