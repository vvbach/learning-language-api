import { IsNumber, IsString } from "class-validator"

export class CreateSentenceTranslationDto {
    @IsNumber()
    sentenceId: number

    @IsNumber()
    languageId: number

    @IsString()
    audioUrl: string

    @IsString()
    translation: string
}
