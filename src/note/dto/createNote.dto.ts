import { IsString, MinLength, MaxLength, IsNotEmpty, IsEnum } from "class-validator";
import { Categories } from "../notes.constants";

export default class CreateNoteDto {
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
  