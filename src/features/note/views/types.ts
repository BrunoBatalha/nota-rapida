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
  deleteNote: (index: number) => void;
  setText: (text:string, index:number) => void,
  setVisibleMenu: (visibleMenu:boolean, index:number) => void,
}
