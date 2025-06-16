import { AudioResponseDto } from "src/audio/dto/audio-response.dto";
import { SentenceResponseDto } from "src/sentence/dto/sentence-response.dto";

export class LessonResponseDto {
  id: number
  title: string
  sentences: SentenceResponseDto[]
  lessonAudio: AudioResponseDto[]
}