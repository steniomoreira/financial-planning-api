-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "dueDate" DATE NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);
