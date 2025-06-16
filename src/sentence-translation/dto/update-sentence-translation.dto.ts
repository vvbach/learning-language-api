import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateSentenceTranslationDto {
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  translation?: string;

  @IsOptional()
  @IsString()
  audioUrl?: string;
}

