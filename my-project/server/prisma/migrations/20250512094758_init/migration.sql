/*
  Warnings:

  - You are about to alter the column `expectedSalary` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('basic', 'timed', 'checklist');

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "expectedSalary" SET DEFAULT 0,
ALTER COLUMN "expectedSalary" SET DATA TYPE DECIMAL(65,30);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "type" "TaskType" NOT NULL DEFAULT 'basic',
    "title" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3),
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
