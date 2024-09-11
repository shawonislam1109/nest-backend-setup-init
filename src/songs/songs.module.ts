import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from './song.schema';
import { connection } from 'src/common/constance/connection';

const mockService = {
  getAllSong() {
    return [{ id: '1', name: 'shaown islam' }];
  },
};

const devConfig = { port: 3000 };
const prodConfig = { port: 3009 };

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }]),
  ],
  controllers: [SongsController],
  providers: [
    SongsService,
    // {
    //   provide: SongsService,
    //   useClass: SongsService,
    // },
    // {
    //   provide: SongsService,
    //   useValue: mockService,
    // },
    {
      provide: 'CONNECTION',
      useValue: connection,
    },

    {
      provide: 'CONFIG',
      useFactory: () => {
        return process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
      },
    },
  ],
})
export class SongsModule {}
