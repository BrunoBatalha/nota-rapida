// import React, { useContext, useEffect, useState } from "react";

// import { Button, MenuItem, OverflowMenu } from '@ui-kitten/components';

// import { CopyIcon, DeleteIcon, MenuFieldIcon, PasteIcon } from "../../../shared/icons";
// import { clipboardPaste, copyToClipboard, showToast } from "../../../shared/utils/utils";
// import { NoteContext } from "../noteContext";

// const NoteItemMenu = ({ id }: { id: string }) => {

//     const noteContext = useContext(NoteContext);

//     function setVisibleMenu(visible: boolean) {
//         noteContext.setVisibleMenu(visible, id);
//     }

//     function deleteNote() {
//         setVisibleMenu(false);
//         noteContext.deleteNote(id);
//     }

//     function copyText() {
//         setVisibleMenu(false);
//         copyToClipboard(noteContext.notes[id].text);
//         showToast('Copiado');
//     }

//     function pasteText() {
//         setVisibleMenu(false);
//         clipboardPaste().then(paste => noteContext.setText(paste, id))
//         showToast('Colado');
//     }

//     function onBackdropPress() {
//         setVisibleMenu(false);
//     }

//     function renderToggleButton() {
//         return (
//             <Button
//                 status='basic'
//                 appearance='ghost'
//                 onPress={() => setVisibleMenu(true)}
//                 accessoryLeft={MenuFieldIcon}
//             />
//         );
//     }

//     return (
//         <OverflowMenu
//             visible={noteContext.notes[id].visibleMenu}
//             anchor={renderToggleButton}
//             onBackdropPress={onBackdropPress}
//         >
//             <MenuItem title="Copiar" accessoryLeft={CopyIcon} onPress={copyText} />
//             <MenuItem title="Colar" accessoryLeft={PasteIcon} onPress={pasteText} />
//             <MenuItem title="Excluir" accessoryLeft={DeleteIcon} onPress={deleteNote} />
//         </OverflowMenu>
//     )
// }

// export default React.memo(NoteItemMenu);