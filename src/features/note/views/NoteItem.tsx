import React, { useState } from "react";

import { Button, Layout, Text, Card, Modal, Input, ButtonGroup } from '@ui-kitten/components';
import { StyleSheet } from "react-native";

import { INote } from "../types";
import { MenuFieldIcon } from "../../../shared/icons";

const NoteItem = ({ note }: { note: INote }) => {
    console.log('NOTE:::\N', note.content);
    const [visibleModal, setVisibleModal] = useState(false);

    function closeModal() {
        setVisibleModal(false);
    }

    function openModal() {
        setVisibleModal(true);
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
                        onChangeText={text => { }}
                        value={note.content}
                        placeholder='Ex.: Re:zero, Jujutsu Kaisen...'
                    />
                    <Layout style={styles.containerButtons}>
                        <Button onPress={closeModal} style={styles.button}>Voltar</Button>
                        <Button onPress={closeModal} style={styles.button} status="success">Salvar</Button>
                    </Layout>
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
        margin: 8
    },
    containerButtons: {
        marginTop: 8,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
    }
});