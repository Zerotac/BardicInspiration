//models for the JSON data

export interface DndClass{
  idClass: string;
  class: string;
  descr: string;
  image: string;
  prompt: string;
  subclasses: SubClass[];
}

export interface SubClass {
  idSubclass: string;
  name: string;
  info:string;
  image: string;
  imagePerson:string;
  subPrompt:string;
}


export interface Tropes{
  idTrope: string;
  name:string;
  infoText: string;
  bardComment: string;
  prompt:string;
  isSelected:boolean;
}

export interface Funfact{
  text: string;
}
