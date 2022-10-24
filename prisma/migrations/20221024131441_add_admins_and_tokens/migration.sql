-- CreateTable
CREATE TABLE "Admin" (
    "login" TEXT NOT NULL,
    "hash" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("login")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_value_key" ON "Token"("value");
