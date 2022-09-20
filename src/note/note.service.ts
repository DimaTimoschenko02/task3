import { Injectable } from '@nestjs/common';
import { getDates, setCreateTime } from 'src/utils/date.utils';
import Note from '../database/database';
import { ICreateNote, INote, IStats } from './note.interface';
import { IUpdateNote } from './note.interface';

@Injectable()
export class NoteService {
  getAll() {
    return Note;
  }

  getOneById(id: string) {
    let note: INote | null = Note.find((el) => {
      if (el.id === id) {
        return el;
      }
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
    Note.find((e, i) => {
      if (e.id === id) return (index = i);
    });
    if (index === null) {
      return index;
    }
    const deleted = Note.splice(index, 1);
    return deleted;
  }

  put(note: IUpdateNote) {
    let newNote: INote | null = null;
    const dates = getDates(note.content);
    for (let i = 0; i < Note.length; i++) {
      if (Note[i].id === note.id) {
        Note[i] = { ...Note[i], ...note, dates };
        newNote = Note[i];
        break;
      }
    }

    return newNote;
  }

  create(note: ICreateNote) {
    const dates = getDates(note.content);
    const createdAt = setCreateTime();
    const id = Date.now().toString();
    Note.push({ ...note, dates, createdAt, id, archieved: false });
    return { ...note, dates, createdAt, id, archieved: false };
  }
}
