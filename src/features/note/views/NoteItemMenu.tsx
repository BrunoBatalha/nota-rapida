import React, { useContext, useState } from "react";

import { Button, MenuItem, OverflowMenu } from '@ui-kitten/components';

import { INoteItem } from './types';
import { CopyIcon, DeleteIcon, MenuFieldIcon } from "../../../shared/icons";
import { copyToClipboard, showToast } from "../../../shared/utils/utils";
import { NoteContext } from "../noteContext";

const NoteItemMenu = ({ text, visibleMenu, index }: INoteItem) => {

    const [visibleMenuItem, setVisibleMenuItem] = useState<boolean>(visibleMenu);
    const noteContext = useContext(NoteContext)

    function deleteNote() {
        noteContext.deleteNote(index);
    }

    function renderToggleButton() {
        return (
            <Button
                status='basic'
                appearance='ghost'
                onPress={() => setVisibleMenuItem(true)}
                accessoryLeft={MenuFieldIcon}
            />
        );
    }

    function copyText(text: string) {
        copyToClipboard(text);
        showToast('Copiado');
    }

    return (
        <OverflowMenu
            visible={visibleMenuItem}
            anchor={() => renderToggleButton()}
            onBackdropPress={() => { setVisibleMenuItem(false) }}
        >
            <MenuItem title="Copiar" accessoryLeft={CopyIcon} onPress={() => copyText(text)} />
            <MenuItem title="Excluir" accessoryLeft={DeleteIcon} onPress={() => deleteNote()} />
        </OverflowMenu>
    )
}
export default NoteItemMenu;