import React, { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { List } from "@ui-kitten/components";

import NoteItem from './NoteItem';
import { INote, INoteItem } from "./types";
import { usePrevious } from "../../../shared/hooks/usePrevious";

const NoteList = ({ notes }: { notes: INote[] }) => {

    const scrollFields = useRef<null | HTMLElement>(null);
    const prevLength = usePrevious(notes.length);

    // useEffect(() => {
    //     if (notes.length > prevLength) {
    //         setTimeout(() => {
    //             scrollFields.current.scrollToEnd({ animated: true });
    //         }, 100);
    //     }
    // }, [notes.length]);

    function renderItem({ item, index }: { item: INoteItem, index: number }) {
        return (<NoteItem text={item.text} visibleMenu={item.visibleMenu} index={index} />);
    }

    return (
        <List
            // ref={scrollFields}
            style={styles.list}
            data={notes}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: 'transparent'
    }
});
export default NoteList;