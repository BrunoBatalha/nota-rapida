import React from "react";
import { StyleSheet } from "react-native";
import shortid from 'shortid'
import { List } from "@ui-kitten/components";

import NoteItem from './NoteItem';
import { INote, INoteItem } from "./types";
// import { usePrevious } from "../../../shared/hooks/usePrevious";

const NoteList = ({ notes }: { notes: INote[] }) => {

    // const scrollFields = useRef<null | HTMLElement>(null);
    // const prevLength = usePrevious(notes.length);

    // useEffect(() => {
    //     if (notes.length > prevLength) {
    //         setTimeout(() => {
    //             scrollFields.current.scrollToEnd({ animated: true });
    //         }, 100);
    //     }
    // }, [notes.length]);

    function keyExtractor(item:INote){
        return item.id;
    }

    function renderItem({ item, index }: { item: INoteItem, index: number }) {
        console.log(index)
        return (<NoteItem text={item.text} visibleMenu={item.visibleMenu} index={index} />);
    }

    return (
        <List
            // ref={scrollFields}
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
