import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  //   @IsNotEmpty()
  //   phone: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  //   @IsNotEmpty()
  //   gender: string;
}
