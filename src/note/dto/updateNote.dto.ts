import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEnum,
} from 'class-validator';
import { Categories } from '../notes.constants';



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
  archieved: boolean;
}

