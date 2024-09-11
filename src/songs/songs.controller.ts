import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Scope,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './create-song.dto';
import { Song } from './song.schema';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.AuthGuard';
import { Roles } from 'src/common/guard/Roles.decorator';
import { RolesGuard } from 'src/common/guard/guard';
import { RolesEnum } from 'src/common/emun/Role';

interface CustomResponse {
  data: Song;
  statusCode: number;
  message: string;
}
interface CustomResponseGet {
  data: Song[];
  statusCode: number;
}

@Controller({
  path: 'songs',
  scope: Scope.REQUEST,
})
export class SongsController {
  constructor(private readonly songService: SongsService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([RolesEnum.ADMIN, RolesEnum.USER, RolesEnum.MODERATOR])
  async getSong(): Promise<CustomResponseGet> {
    try {
      const createdSong: Song[] = await this.songService.getAllSong();
      return {
        data: createdSong,
        statusCode: HttpStatus.CREATED,
      };
    } catch (e) {
      throw new InternalServerErrorException('SERVER ERROR');
    }
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([RolesEnum.MODERATOR, RolesEnum.ADMIN])
  async getSingleSong(@Param() id: Song): Promise<Song> {
    return this.songService.getSingle(id.id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles([RolesEnum.ADMIN]) // Allow only 'admin' users
  async createSong(@Body() newSong: CreateSongDto): Promise<CustomResponse> {
    try {
      const createdSong: Song = await this.songService.createSong(newSong);
      return {
        data: createdSong,
        statusCode: HttpStatus.CREATED,
        message: 'Song created successfully',
      };
    } catch (e) {
      throw new InternalServerErrorException('SERVER ERROR');
    }
  }

  @Patch('/:id')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  async updateSong(
    @Param() id: Song,
    @Body() updateSong: CreateSongDto,
  ): Promise<Song> {
    return this.songService.updateSong(id.id, updateSong);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteSong(@Param() id: Song): Promise<Song> {
    return this.songService.deleteSong(id.id);
  }
}
