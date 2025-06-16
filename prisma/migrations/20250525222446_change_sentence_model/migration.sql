/*
  Warnings:

  - You are about to drop the column `audioUrl` on the `Sentence` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_courseId_fkey";

-- DropForeignKey
ALTER TABLE "LessonAudio" DROP CONSTRAINT "LessonAudio_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Sentence" DROP CONSTRAINT "Sentence_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "SentenceTranslation" DROP CONSTRAINT "SentenceTranslation_sentenceId_fkey";

-- DropForeignKey
ALTER TABLE "WordTranslation" DROP CONSTRAINT "WordTranslation_sentenceId_fkey";

-- DropForeignKey
ALTER TABLE "WordTranslationMap" DROP CONSTRAINT "WordTranslationMap_wordTranslationId_fkey";

-- AlterTable
ALTER TABLE "Sentence" DROP COLUMN "audioUrl";

-- AlterTable
ALTER TABLE "SentenceTranslation" ADD COLUMN     "audioUrl" TEXT;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentenceTranslation" ADD CONSTRAINT "SentenceTranslation_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordTranslation" ADD CONSTRAINT "WordTranslation_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "Sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordTranslationMap" ADD CONSTRAINT "WordTranslationMap_wordTranslationId_fkey" FOREIGN KEY ("wordTranslationId") REFERENCES "WordTranslation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonAudio" ADD CONSTRAINT "LessonAudio_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
