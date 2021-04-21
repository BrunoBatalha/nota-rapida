import React, { useContext, useEffect, useRef, useState } from "react";

import { Layout, Input } from '@ui-kitten/components';
import { StyleSheet } from "react-native";

import NoteItemMenu from './NoteItemMenu';

import { INoteItem } from './types';
import { NoteContext } from "../noteContext";

const NoteItem = ({ text, visibleMenu, index }: INoteItem) => {

    const noteContext = useContext(NoteContext);

    return (
        <Layout style={styles.container}>
            <Input
                // keyboardAppearance='dark' TODO: testar se caso isso comentado, consigo copiar e colar nos campos
                style={styles.input}
                multiline
                onChangeText={text => noteContext.setText(text, index)}
                value={text}
                placeholder='Ex.: Re:zero, Jujutsu Kaisen...'
            />
            <NoteItemMenu
                visibleMenu={visibleMenu}
                text={text}
                index={index}
            />
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