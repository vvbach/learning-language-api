import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateWordTranslationMapDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  translatedWord?: string;
}
