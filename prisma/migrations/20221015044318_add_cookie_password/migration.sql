-- CreateTable
CREATE TABLE "CookiePassword" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CookiePassword_pkey" PRIMARY KEY ("id")
);
