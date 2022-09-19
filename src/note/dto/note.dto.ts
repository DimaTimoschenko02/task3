import {
  IsNotEmpty,
  IsString,
  IsBooleanString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  name: string;

  @IsString()
  @IsNotEmpty()
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
  category: string;

  @IsString()
  @MaxLength(250)
  content: string;
}
