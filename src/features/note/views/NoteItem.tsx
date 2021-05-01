import React, { useContext, useEffect, useState } from "react";

import { Button, Layout, Text, Card, Modal, Input } from '@ui-kitten/components';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";

import { INote } from "../types";
import { DeleteIcon, MenuFieldIcon, SaveIcon } from "../../../shared/icons";
import { NoteContext } from "../noteContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const NoteItem = ({ note }: { note: INote }) => {

    const noteContext = useContext(NoteContext);
    const [visibleModal, setVisibleModal] = useState(false);
    const [content, setContent] = useState('');

    useEffect(() => {
        setContent(note.content)
    }, [])

    function closeModal() {
        setContent(note.content);
        setVisibleModal(false);
    }

    function openModal() {
        setVisibleModal(true);
    }

    async function updateNote() {
        noteContext.updateNote({ ...note, content: content });
    }

    return (
        <Layout style={styles.container}>
            <Text style={styles.text}>{note.content}</Text>

            <Button style={styles.menuButton} onPress={openModal} accessoryLeft={MenuFieldIcon}></Button>
            <Modal visible={visibleModal}
                backdropStyle={styles.backdrop}
                onBackdropPress={closeModal}>
                {/* TODO: entender melhor o disabled */}
                <Card disabled={true} style={styles.modal}>
                    <Input
                        style={styles.input}
                        multiline
                        onChangeText={setContent}
                        value={content}
                        placeholder='Ex.: Re:zero, Jujutsu Kaisen...'
                    />                    
                        <KeyboardAwareScrollView
                            enableOnAndroid 
                        >
                            <Layout style={styles.containerButtons}>
                                <Button
                                    onPress={updateNote}
                                    status="danger"
                                    style={styles.button}
                                    accessoryLeft={DeleteIcon} />
                                <Button
                                    onPress={updateNote}
                                    style={styles.button}
                                    status="success"
                                    accessoryLeft={SaveIcon} />

                            </Layout>
                        </KeyboardAwareScrollView>
                </Card>
            </Modal>
        </Layout>
    );
}

export default React.memo(NoteItem);


const styles = StyleSheet.create({
    text: {
        flex: 10,
    },
    input: {
        flex: 10,
        height: 50
    },
    container: {
        flexDirection: 'row'
    },
    menuButton: {
        width: 4,
        backgroundColor: '#222B45',
        borderColor: '#222B45'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        margin: 8,
    },
    containerButtons: {
        marginTop: 8,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
    }
});