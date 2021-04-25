import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { List } from "@ui-kitten/components";

import NoteItem from './NoteItem';
import { INote, INoteItem } from "./types";

const NoteList = ({ notes }: { notes: INote }) => {

    // const scrollFields = useRef<null | HTMLElement>(null);
    // const prevLength = usePrevious(notes.length);

    // useEffect(() => {
    //     if (notes.length > prevLength) {
    //         setTimeout(() => {
    //             scrollFields.current.scrollToEnd({ animated: true });
    //         }, 100);
    //     }
    // }, [notes.length]);

    function keyExtractor(id: string) {
        return id;
    }

    function renderItem({ item, index }: { item: string, index:number }) {
        return (<NoteItem id={item} />);
    }

    return (
        <List
            // ref={scrollFields}
            style={styles.list}
            removeClippedSubviews={true}
            data={Object.keys(notes).map(id => id)}
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
