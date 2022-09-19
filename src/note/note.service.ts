import { Injectable } from '@nestjs/common';
import Note from '../database/database';
import { INote } from './note.interface';
import { IUpdateNote } from './note.interface';

//TODO:should i move these interaces smwr?
interface IOjbectKeys {
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
@Injectable()
export class NoteService {
  getAll() {
    return Note;
  }
  getOneById(id: string) {
    let note: INote | null = null;
    Note.forEach((el) => {
      if (el.id === id) note = el;
    });
    return note;
  }
  getStatistic() {
    const statistic: IStats = {
      active: {
        quote: 0,
        idea: 0,
        random: 0,
        task: 0,
      },
      arch: {
        quote: 0,
        idea: 0,
        random: 0,
        task: 0,
      },
    };
    Note.forEach((el) => {
      if (el.archieved) {
        statistic.arch[el.category]++;
      } else {
        statistic.active[el.category]++;
      }
    });
    return statistic;
  }

  deleteOne(id: string) {
    let index: number | null = null;
    Note.forEach((e, i) => {
      if (e.id === id) index = i;
    });
    if (index === null) {
      return index;
    }
    const deleted = Note.splice(index, 1);
    return deleted;
  }

  put(note: IUpdateNote) {
    let newNote: INote | null = null;
    console.log(note);
    Note.forEach((el) => {
      if (el.id === note.id) {
        el = { ...el, ...note };
        newNote = el;
      }
    });
    return newNote;
  }
  create(note: INote) {
    Note.push(note);
    return note;
  }
}
