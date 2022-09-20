import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { getDates, setCreateTime } from 'src/utils/date.utils';

import UpdateNoteDto from './dto/updateNote.dto';
import CreateNoteDTO from './dto/createNote.dto';
import { NoteService } from './note.service';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get('/')
  getAllHangler() {
    try {
      const allNotes = this.noteService.getAll();
      return { data: allNotes };
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Get('/stats')
  getStatsHangler() {
    try {
      const stats = this.noteService.getStatistic();
      return { stats };
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }
  
  @Get(':id')
  getOneHangler(@Param('id') id: string) {
    try {
      const note = this.noteService.getOneById(id);
      if (!note) {
        throw new HttpException(
          `No element with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return note;
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  deleteOneHandler(@Param('id') id: string) {
    try {
      const note = this.noteService.deleteOne(id);
      if (!note) {
        throw new HttpException(
          `No element with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return note;
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Patch(':id')
  updateOne(@Body() updateDto: UpdateNoteDto, @Param('id') id: string) {
    try {
      const note = this.noteService.put({ ...updateDto, id });
      if (!note) {
        throw new HttpException(
          `No element with id: ${id}`,
          HttpStatus.NOT_FOUND,
        );
      }
      return note;
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Post('/')
  createNote(@Body() createDto: CreateNoteDTO) {
    try {
      return this.noteService.create(createDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }
}
