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

import CreateNoteDTO, { UpdateNoteDto } from './dto/note.dto';
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
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/stats')
  getStatsHangler() {
    try {
      const stats = this.noteService.getStatistic();
      return { stats };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  @Get(':id')
  getOneHangler(@Param('id') id: string) {
    try {
      const note = this.noteService.getOneById(id);
      if (!note) {
        throw new HttpException(
          `No element with id: ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return note;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  @Delete(':id')
  deleteOneHandler(@Param('id') id: string) {
    try {
      const note = this.noteService.deleteOne(id);
      if (!note) {
        throw new HttpException(
          `No element with id: ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return note;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  @Patch(':id')
  updateOne(@Body() updateDto: UpdateNoteDto, @Param('id') id: string) {
    try {
      const dates = getDates(updateDto.content);
      const note = this.noteService.put({ ...updateDto, dates, id });
      if (!note) {
        throw new HttpException(
          `No element with id: ${id}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return note;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('/')
  createNote(@Body() createDto: CreateNoteDTO) {
    try {
      const dates = getDates(createDto.content);
      const createdAt = setCreateTime();
      const note = this.noteService.create({
        ...createDto,
        archieved: false,
        id: Date.now().toString(),
        dates,
        createdAt,
      });
      return note;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
