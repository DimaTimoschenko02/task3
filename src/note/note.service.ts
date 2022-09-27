import { Injectable } from '@nestjs/common';
import { getDates, setCreateTime } from 'src/utils/date.utils';
import Note from '../database/database';
import { ICreateNote, INote, IStats } from './note.interface';
import { IUpdateNote } from './note.interface';

@Injectable()
export class NoteService {
  getAll():INote[] {
    return Note;
  }

  getOneById(id: string):INote|null {
    let note: INote | null = Note.find((el) => {
      if (el.id === id) {
        return el;
      }
    });
    return note;
  }

  getStatistic():IStats {
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

  deleteOne(id: string):INote | null {
    let index: number | null = null;
    Note.find((e, i) => {
      if (e.id === id) return (index = i);
    });
    if (index === null) {
      return index as null;
    }
    const deleted = Note.splice(index, 1);
    return deleted[0];
  }

  put(note: IUpdateNote):INote|null {
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

  create(note: ICreateNote) :INote{
    const dates = getDates(note.content);
    const createdAt = setCreateTime();
    const id = Date.now().toString();
    Note.push({ ...note, dates, createdAt, id, archieved: false });
    return { ...note, dates, createdAt, id, archieved: false };
  }
}
