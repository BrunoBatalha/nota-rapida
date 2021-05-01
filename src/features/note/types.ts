export interface INote {
  content: string;
  id: string;
}

export interface INoteItem {
  text: string;
  visibleMenu: boolean;
  index: number;
}

export interface INoteContext {
  deleteNote: (note: INote) => void;
  updateNote: (note: INote) => void;
}
