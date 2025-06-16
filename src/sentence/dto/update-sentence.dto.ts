import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { UpdateSentenceTranslationDto } from 'src/sentence-translation/dto/update-sentence-translation.dto';
import { UpdateWordTranslationDto } from 'src/word-translation/dto/update-word-translation.dto';

export class UpdateSentenceDto {
  @IsInt()
  id: number; 

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateSentenceTranslationDto)
  translations?: UpdateSentenceTranslationDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateWordTranslationDto)
  wordTranslations?: UpdateWordTranslationDto[];
}

