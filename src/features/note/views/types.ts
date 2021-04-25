export interface INote {
  text: string;
  visibleMenu: boolean;
  id: string
}

export interface INoteItem{
  text: string;
  visibleMenu: boolean;
  index: number;
}

export interface INoteContext {
  deleteNote: (id:string) => void;
  setText: (text:string, id:string) => void,
  setVisibleMenu: (visibleMenu:boolean, id:string) => void,
  notes: any
}
