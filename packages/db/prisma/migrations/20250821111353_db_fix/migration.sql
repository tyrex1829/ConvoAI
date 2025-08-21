-- CreateEnum
CREATE TYPE "public"."PLAN" AS ENUM ('PRO', 'FREE');

-- CreateEnum
CREATE TYPE "public"."INTEGRATION_TYPE" AS ENUM ('INSTAGRAM');

-- CreateEnum
CREATE TYPE "public"."MEDIA_TYPE" AS ENUM ('IMAGE', 'VIDEO', 'CAROSEL_ALBUM');

-- CreateEnum
CREATE TYPE "public"."LISTENERS" AS ENUM ('SMARTAI', 'MESSAGE');

-- CreateTable
CREATE TABLE "public"."Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plan" "public"."PLAN" NOT NULL DEFAULT 'FREE',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Integrations" (
    "id" TEXT NOT NULL,
    "name" "public"."INTEGRATION_TYPE" NOT NULL DEFAULT 'INSTAGRAM',
    "userId" TEXT,
    "token" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Automation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Untitled',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Automation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Dms" (
    "id" TEXT NOT NULL,
    "automationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senderId" TEXT,
    "receiver" TEXT,
    "message" TEXT,

    CONSTRAINT "Dms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Post" (
    "id" TEXT NOT NULL,
    "postId" TEXT,
    "caption" TEXT,
    "media" TEXT NOT NULL,
    "mediaType" "public"."MEDIA_TYPE" NOT NULL DEFAULT 'IMAGE',
    "automationId" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Listener" (
    "id" TEXT NOT NULL,
    "automationId" TEXT,
    "listener" "public"."LISTENERS" NOT NULL DEFAULT 'MESSAGE',
    "prompt" TEXT,
    "commentReply" TEXT,
    "dmCount" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Listener_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Trigger" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "automationId" TEXT,

    CONSTRAINT "Trigger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Keyword" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "automationId" TEXT,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "public"."Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_word_automationId_key" ON "public"."Keyword"("word", "automationId");

-- AddForeignKey
ALTER TABLE "public"."Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Integrations" ADD CONSTRAINT "Integrations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Automation" ADD CONSTRAINT "Automation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Dms" ADD CONSTRAINT "Dms_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "public"."Automation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "public"."Automation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Listener" ADD CONSTRAINT "Listener_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "public"."Automation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Trigger" ADD CONSTRAINT "Trigger_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "public"."Automation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Keyword" ADD CONSTRAINT "Keyword_automationId_fkey" FOREIGN KEY ("automationId") REFERENCES "public"."Automation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
