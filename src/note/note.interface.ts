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
export interface IOjbectKeys {
  [key: string]: number;
}
export interface ICategory extends IOjbectKeys {
  idea: number;
  task: number;
  random: number;
  quote: number;
}

export interface IStats {
  arch: ICategory;
  active: ICategory;
}