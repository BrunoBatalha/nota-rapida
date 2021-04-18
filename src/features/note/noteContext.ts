import React from "react";
import { INoteContext } from "./views/types";

export const NoteContext = React.createContext<INoteContext>({ deleteNote: () => {} });
