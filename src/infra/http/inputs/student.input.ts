import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Min,
  Max,
  Matches,
} from 'class-validator';

export class StudentInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Min(11)
  @Max(14)
  @Matches(/[0-9]/)
  document: string;

  @IsString()
  @IsNotEmpty()
  @Min(8)
  @Max(20)
  password: string;
}
