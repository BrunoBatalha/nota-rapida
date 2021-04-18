export interface INote {
  text: string;
  visibleMenu: boolean;
}

export interface INoteItem extends INote {
  index: number;
}

export interface INoteContext {
  deleteNote: (index: number) => void;
}
