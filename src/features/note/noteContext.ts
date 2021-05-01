import React from 'react';
import { INoteContext } from './types';

const contextDefault = {
  deleteNote: () => {
    throw 'Not implemented';
  },
  updateNote: () =>{
    throw 'Not implemented';
  },
};
export const NoteContext = React.createContext<INoteContext>(contextDefault);
