import { Inject, Injectable, Scope } from '@nestjs/common';
import { Song, SongDocument } from './song.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSongDto } from './create-song.dto';
import { Connection } from 'src/common/constance/connection';

@Injectable({ scope: Scope.TRANSIENT })
export class SongsService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<SongDocument>,
    @Inject('CONNECTION')
    private connection: Connection,
    @Inject('CONFIG')
    private config: { port: string },
  ) {
    console.log(
      `THIS IS THE CONNECTION STRING ${this.connection.CONNECTION_STRING}`,
    );
    console.log(`this is the configuration light wight ${this.config.port}`);
  }

  async getAllSong(): Promise<Song[]> {
    return await this.songModel.find().exec();
  }

  async getSingle(id: number): Promise<Song | null> {
    return await this.songModel.findOne({ id: id }).exec();
  }

  async createSong(createSongDto: CreateSongDto): Promise<Song> {
    const newSong = new this.songModel(createSongDto);
    return newSong.save();
  }

  async updateSong(id: number, updateSongDto: CreateSongDto): Promise<Song> {
    const updateSong = await this.songModel.findOneAndUpdate(
      { id: id },
      updateSongDto,
      { new: true },
    );

    return updateSong;
  }

  async deleteSong(id: number): Promise<any> {
    return await this.songModel.findOneAndDelete({ id });
  }
}
