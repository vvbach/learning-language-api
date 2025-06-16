import { IsNumber, IsString } from "class-validator";

export class CreateWordTranslationMapDto {
    @IsNumber()
    wordTranslationId: number

    @IsString()
    translatedWord: string;

    @IsNumber()
    languageId: number;
}