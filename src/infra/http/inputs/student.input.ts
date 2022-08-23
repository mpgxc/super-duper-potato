import {
  Length,
  Matches,
  IsEmail,
  IsString,
  IsNotEmpty,
  IsNumberString,
} from 'class-validator';

export class StudentInput {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNumberString()
  @IsNotEmpty()
  @Length(11, 11)
  @Matches(/[0-9]/)
  document!: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password!: string;
}
