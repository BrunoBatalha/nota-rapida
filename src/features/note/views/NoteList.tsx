import React from "react";
import { StyleSheet } from "react-native";
import { List } from "@ui-kitten/components";

import NoteItem from './NoteItem';
import { INote } from "../types";

const NoteList = ({ notes }: { notes: INote[] }) => {
    function keyExtractor(note: INote) {
        return note.id;
    }

    function renderItem({ item }: { item: INote }) {
        return (<NoteItem note={item} />);
    }

    return (
        <List
            style={styles.list}
            removeClippedSubviews={true}
            data={notes}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
        />
    )
}

export default NoteList;

const styles = StyleSheet.create({
    list: {
        backgroundColor: 'transparent'
    }
});
