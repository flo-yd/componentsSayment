-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "groupName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "expectedSalary" DOUBLE PRECISION NOT NULL,
    "expectedDateOfDefense" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
