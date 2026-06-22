-- CreateIndex
CREATE INDEX "applications_userId_deletedAt_idx" ON "applications"("userId", "deletedAt");

-- CreateIndex
CREATE INDEX "applications_destination_idx" ON "applications"("destination");

-- CreateIndex
CREATE INDEX "applications_createdAt_idx" ON "applications"("createdAt");

-- CreateIndex
CREATE INDEX "contacts_createdAt_idx" ON "contacts"("createdAt");

-- CreateIndex
CREATE INDEX "payments_applicationId_status_idx" ON "payments"("applicationId", "status");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_deletedAt_idx" ON "users"("deletedAt");
