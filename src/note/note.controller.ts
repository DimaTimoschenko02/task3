import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { getDates, setCreateTime } from 'src/utils/date.utils';
import { AppController } from '../app.controller';
import CreateNoteDTO, { UpdateNoteDto } from './dto/note.dto';
import { NoteService } from './note.service';

@Controller('notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get('/')
  getAllHangler() {
    const allNotes = this.noteService.getAll();
    return { data: allNotes };
  }

  @Get('/stats')
  getStatsHangler() {
    const stats = this.noteService.getStatistic();
    return { stats };
  }
  @Get(':id')
  getOneHangler(@Param('id') id: string) {
    const note = this.noteService.getOneById(id);
    if (!note) {
      return { error: `no Note with id ${id}` };
    }
    return note;
  }
  @Delete(':id')
  deleteOneHandler(@Param('id') id: string) {
    const note = this.noteService.deleteOne(id);
    if (!note) {
      return { error: `no Note with id ${id}` };
    }
    return note;
  }
  @Patch(':id')
  updateOne(@Body() updateDto: UpdateNoteDto, @Param('id') id: string) {
    console.log(id);
    const dates = getDates(updateDto.content);
    const note = this.noteService.put({ ...updateDto, dates, id });
    if (!note) {
      return { error: `no Note with id ${id}` };
    }
    return note;
  }
  @Post('/')
  createNote(@Body() createDto: CreateNoteDTO) {
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
  }
}