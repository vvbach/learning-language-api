-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sentence" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "audioUrl" TEXT,

    CONSTRAINT "Sentence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SentenceTranslation" (
    "id" SERIAL NOT NULL,
    "sentenceId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "translation" TEXT NOT NULL,

    CONSTRAINT "SentenceTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordTranslation" (
    "id" SERIAL NOT NULL,
    "sentenceId" INTEGER NOT NULL,
    "sourceWord" TEXT NOT NULL,

    CONSTRAINT "WordTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordTranslationMap" (
    "id" SERIAL NOT NULL,
    "wordTranslationId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "translatedWord" TEXT NOT NULL,

    CONSTRAINT "WordTranslationMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonAudio" (
    "id" SERIAL NOT NULL,
    "lessonId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "audioUrl" TEXT NOT NULL,

    CONSTRAINT "LessonAudio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Language_code_key" ON "Language"("code");

-- CreateIndex
CREATE UNIQUE INDEX "LessonAudio_lessonId_languageId_key" ON "LessonAudio"("lessonId", "languageId");

-- AddForeignKey
ALTER TABLE "Sentence" ADD CONSTRAINT "Sentence_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentenceTranslation" ADD CONSTRAINT "SentenceTranslation_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "Sentence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentenceTranslation" ADD CONSTRAINT "SentenceTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordTranslation" ADD CONSTRAINT "WordTranslation_sentenceId_fkey" FOREIGN KEY ("sentenceId") REFERENCES "Sentence"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordTranslationMap" ADD CONSTRAINT "WordTranslationMap_wordTranslationId_fkey" FOREIGN KEY ("wordTranslationId") REFERENCES "WordTranslation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordTranslationMap" ADD CONSTRAINT "WordTranslationMap_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonAudio" ADD CONSTRAINT "LessonAudio_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonAudio" ADD CONSTRAINT "LessonAudio_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
