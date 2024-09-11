import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { SongAuthors } from 'src/utils/Types/Songs';

export type SongDocument = Song & Document;

@Schema()
export class Song {
  @Prop({ required: true })
  id: number;
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: [String] })
  artists: string[];

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  author: SongAuthors;
}

export const SongSchema = SchemaFactory.createForClass(Song);
