import React from 'react';
import { INoteContext } from './views/types';

const contextDefault = {
  deleteNote: () => {
    throw 'Not implemented';
  },
  setText: (text: string, index: number) => {
    throw 'Not implemented';
  },
  setVisibleMenu: (visibleMenu: boolean, index: number) => {
    throw 'Not implemented';
  },
};
export const NoteContext = React.createContext<INoteContext>(contextDefault);
