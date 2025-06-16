import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateSentenceTranslationDto } from "src/sentence-translation/dto/create-sentence-translation.dto";
import { CreateWordTranslationDto } from "src/word-translation/dto/create-word-translation.dto";

export class CreateSentenceDto {
    @IsNumber()
    lessonId: number

    @IsString()
    content: string

    @ValidateNested({ each: true })
    @Type(() => CreateSentenceTranslationDto)
    translations: CreateSentenceTranslationDto[]

    @ValidateNested({ each: true })
    @Type(() => CreateWordTranslationDto)
    wordTranslations: CreateWordTranslationDto[]
}
