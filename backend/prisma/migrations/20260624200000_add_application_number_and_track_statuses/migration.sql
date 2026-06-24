-- Remove default value from status column
ALTER TABLE "applications" ALTER COLUMN "status" DROP DEFAULT;

-- Create new enum type with all statuses
CREATE TYPE "AppStatus_new" AS ENUM (
  'DOCUMENTS_PENDING',
  'UNDER_REVIEW',
  'SUBMITTED_TO_EMBASSY',
  'IN_EMBASSY',
  'APPROVED',
  'REJECTED',
  'DELIVERED'
);

-- Alter column type with USING clause, dropping the old default
ALTER TABLE "applications"
  ALTER COLUMN "status" TYPE "AppStatus_new"
  USING (
    CASE "status"::text
      WHEN 'PENDING' THEN 'DOCUMENTS_PENDING'::"AppStatus_new"
      WHEN 'REVIEWED' THEN 'UNDER_REVIEW'::"AppStatus_new"
      WHEN 'APPROVED' THEN 'APPROVED'::"AppStatus_new"
      WHEN 'REJECTED' THEN 'REJECTED'::"AppStatus_new"
      ELSE 'DOCUMENTS_PENDING'::"AppStatus_new"
    END
  );

-- Drop old enum type with CASCADE to handle column dependency
DROP TYPE "AppStatus" CASCADE;

-- Rename new enum type to original name
ALTER TYPE "AppStatus_new" RENAME TO "AppStatus";

-- Add applicationNumber column (nullable)
ALTER TABLE "applications" ADD COLUMN "applicationNumber" TEXT;

-- Generate application numbers for existing records using a subquery
UPDATE "applications"
SET "applicationNumber" = sub.app_number
FROM (
  SELECT id, 'APP-' || LPAD(CAST(ROW_NUMBER() OVER (ORDER BY "createdAt") + 100000 AS TEXT), 6, '0') AS app_number
  FROM "applications"
  WHERE "applicationNumber" IS NULL
) sub
WHERE "applications".id = sub.id;

-- Add unique constraint
CREATE UNIQUE INDEX "applications_applicationNumber_key" ON "applications"("applicationNumber");
