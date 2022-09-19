import { Module } from '@nestjs/common';

import { NoteModule } from './note/note.module';

@Module({
  imports: [NoteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
