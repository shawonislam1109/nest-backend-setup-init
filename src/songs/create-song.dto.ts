import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { NestValidationAuthor, SongAuthors } from 'src/utils/Types/Songs';

export class CreateSongDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  artists: string[];

  @ValidateNested()
  @Type(() => NestValidationAuthor)
  @IsNotEmpty()
  author: SongAuthors;
}
