import { IsNumber, IsString } from "class-validator";
import { CreateWordTranslationMapDto } from "src/word-translation-map/dto/create-word-translation-map.dto";

export class CreateWordTranslationDto {
  @IsNumber()
  sentenceId: number;

  @IsString()
  sourceWord: string;

  
  translations: CreateWordTranslationMapDto[];
}