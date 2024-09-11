import { IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  username: string;

  //   @IsNotEmpty()
  //   phone: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  role: string;

  //   @IsNotEmpty()
  //   gender: string;
}
export class CreateLoginUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  //   @IsNotEmpty()
  //   gender: string;
}
