import React from 'react';
import { INoteContext } from './views/types';

const contextDefault = {
  deleteNote: () => {
    throw 'Not implemented';
  },
  setText: () => {
    throw 'Not implemented';
  },
  setVisibleMenu: () => {
    throw 'Not implemented';
  },
  notes: {}
};
export const NoteContext = React.createContext<INoteContext>(contextDefault);
