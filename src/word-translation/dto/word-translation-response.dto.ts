import { WordTranslationMapResponseDto } from "src/word-translation-map/dto/word-translation-map-response.dto";

export class WordTranslationResponseDto {
  id: number;
  sourceWord: string;
  translations: WordTranslationMapResponseDto[];
}