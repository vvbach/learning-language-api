import { SentenceTranslationResponseDto } from "src/sentence-translation/dto/sentence-translation-response.dto";
import { WordTranslationResponseDto } from "src/word-translation/dto/word-translation-response.dto";

export class SentenceResponseDto {
  id: number;
  content: string;
  translations: SentenceTranslationResponseDto[];
  wordTranslations: WordTranslationResponseDto[];
}