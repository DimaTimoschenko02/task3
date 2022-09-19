import { Injectable } from '@nestjs/common';
import Note from '../database/database';
import { INote } from './note.interface'
import { IUpdateNote } from './note.interface';
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
  Hello() {
    return 'hello';
  }
  getAll() {
    return Note;
  }
  getOneById(id: string) {
    let note: INote;
    Note.forEach((el) => {
      if (el.id === id) note = el;
    });
    return note;
  }
  getStatistic() {
    const statistic:IStats = {
        active:{
            quote:0,
            idea:0,
            random:0,
            task:0
        },
        arch:{
            quote:0,
            idea:0,
            random:0,
            task:0
        }
    }
    Note.forEach(el => {
        if(el.archieved){
            statistic.arch[el.category]++
        }
        else{
            statistic.active[el.category]++
        }
    })
    return statistic
  }

  deleteOne(id:string){
    let index:number
    Note.forEach((e , i) => {
        if(e.id === id) index = i
    })
    const deleted = Note.splice(index , 1)
    console.log(Note)
    return deleted
  }

  put(note:IUpdateNote){
    let newNote:INote
    console.log(note)
    Note.forEach(el => {
        if(el.id === note.id){
            el = {...el , ...note}
            newNote = el
        }
    })
    return newNote
  }
  create(note:INote){
    Note.push(note)
    return note
  }
}