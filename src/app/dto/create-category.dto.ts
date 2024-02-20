import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'name is empty' })
  @MaxLength(255, { message: 'name length must not more than 255 characters' })
  name: string;
}
