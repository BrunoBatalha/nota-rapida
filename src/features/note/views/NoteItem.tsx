import React, { useContext, useEffect, useRef, useState } from "react";

import { Layout, Input, Text } from '@ui-kitten/components';
import { StyleSheet } from "react-native";

import NoteItemMenu from './NoteItemMenu';

import { NoteContext } from "../noteContext";

const NoteItem = ({ id }: {id: string}) => {

    const noteContext = useContext(NoteContext);

    return (
        <Layout style={styles.container}>
            <Input
                // keyboardAppearance='dark' TODO: testar se caso isso comentado, consigo copiar e colar nos campos
                style={styles.input}
                multiline
                onChangeText={text => noteContext.setText(text, id)}
                value={noteContext.notes[id].text}
                placeholder='Ex.: Re:zero, Jujutsu Kaisen...'
            />
            {/* <Text style={styles.input}>{noteContext.notes[id].text}</Text> */}
            <NoteItemMenu id={id}/>
        </Layout>
    );
}

export default React.memo(NoteItem);


const styles = StyleSheet.create({
    input: {
        flex: 10
    },
    container: {
        flexDirection: 'row'
    },
});