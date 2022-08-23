import { IsEmail, IsString, IsNotEmpty, Length } from 'class-validator';

export class SessionInput {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password!: string;
}
