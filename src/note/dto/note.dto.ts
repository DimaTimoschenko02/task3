import {
  IsNotEmpty,
  IsString,
  IsBooleanString,
  MaxLength,
  MinLength,
  IsEnum,
} from 'class-validator';

//TODO:remove?
enum Categories {
  'idea',
  'task',
  'quote',
  'random',
}

export class UpdateNoteDto {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Categories)
  category: string;

  @IsString()
  @MaxLength(250)
  content: string;

  @IsNotEmpty()
  @IsBooleanString()
  archieved: boolean;
}

export default class CreateNoteDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Categories)
  category: string;

  @IsString()
  @MaxLength(250)
  content: string;
}
