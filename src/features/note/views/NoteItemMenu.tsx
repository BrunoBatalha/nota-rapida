import React, { useContext, useEffect, useState } from "react";

import { Button, MenuItem, OverflowMenu } from '@ui-kitten/components';

import { INoteItem } from './types';
import { CopyIcon, DeleteIcon, MenuFieldIcon } from "../../../shared/icons";
import { copyToClipboard, showToast } from "../../../shared/utils/utils";
import { NoteContext } from "../noteContext";

const NoteItemMenu = ({ text, visibleMenu, index }: INoteItem) => {

    const noteContext = useContext(NoteContext);

    function setVisibleMenu(visible: boolean){
        noteContext.setVisibleMenu(visible, index);
    }

    function deleteNote() {
        setVisibleMenu(false);
        noteContext.deleteNote(index);
    }

    function copyText() {
        setVisibleMenu(false);
        copyToClipboard(text);
        showToast('Copiado');
    }

    function onBackdropPress(){
        setVisibleMenu(false);
    }

    function renderToggleButton() {
        return (
            <Button
                status='basic'
                appearance='ghost'
                onPress={() => setVisibleMenu(true) }
                accessoryLeft={MenuFieldIcon}
            />
        );
    }    

    return (
        <OverflowMenu
            visible={visibleMenu}
            anchor={renderToggleButton}
            onBackdropPress={onBackdropPress}
        >
            <MenuItem title="Copiar" accessoryLeft={CopyIcon} onPress={copyText} />
            <MenuItem title="Excluir" accessoryLeft={DeleteIcon} onPress={deleteNote} />
        </OverflowMenu>
    )
}

export default React.memo(NoteItemMenu);