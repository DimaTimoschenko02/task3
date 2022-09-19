export interface INote {
  createdAt: string;
  name: string;
  dates: string[];
  content: string;
  category: string;
  id: string;
  archieved: boolean;
}

export interface IUpdateNote {
  id: string;
  name: string;
  content: string;
  archieved: boolean;
  dates: string[];
}
