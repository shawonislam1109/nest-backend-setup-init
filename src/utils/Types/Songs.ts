import { IsNotEmpty, IsString } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Song = {
  id: number;
  name: string;
};

export type Message = {
  message: string;
};

export type SongAuthor = {
  name: string;
  phone: string;
};

export class NestValidationAuthor {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}


// SUB DOCUMENT FOR SONG SCHEMA  PATH FOR AUTHOR
export type SongAuthorDocument = SongAuthors & Document;

@Schema()
export class SongAuthors {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  phone: string;
}

export const SongAuthorSchema = SchemaFactory.createForClass(SongAuthors);
