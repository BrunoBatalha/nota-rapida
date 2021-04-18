import React, { useState } from "react";

import { Layout, Input } from '@ui-kitten/components';
import { StyleSheet } from "react-native";

import NoteItemMenu from './noteItemMenu';

import { INoteItem } from './types';

const NoteItem = ({ text, visibleMenu, index }: INoteItem) => {

    const [itemText, setItemText] = useState<string>(text);

    return (
        <Layout style={styles.container}>
            <Input
                // keyboardAppearance='dark' TODO: testar se caso isso comentado, consigo copiar e colar nos campos
                style={styles.input}
                multiline
                onChangeText={text => setItemText(text)}
                value={itemText}
                placeholder='Ex.: Re:zero, Jujutsu Kaisen...'
            />
            <NoteItemMenu
                visibleMenu={visibleMenu}
                text={text}
                index={index}                
            />            
        </Layout>
    )
}

export default NoteItem;


const styles = StyleSheet.create({
    input: {
        flex: 10
    },
    container: {
        flexDirection: 'row'
    },
});