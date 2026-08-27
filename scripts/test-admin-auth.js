const { timingSafeEqual } = require("crypto");
const { readFileSync, writeFileSync, existsSync } = require("fs");
const path = require("path");

const ENV_PATH = path.join(process.cwd(), ".env.local");
const BACKUP_PATH = path.join(process.cwd(), "backups", "env.local.password_change.bak");

function getAdminPasswordFromEnv(fileContent) {
  const match = fileContent.match(/^ADMIN_PASSWORD=(.*)$/m);
  return match ? match[1].trim() : null;
}

function verifyPassword(input, expected) {
  if (!input || !expected || input.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(input), Buffer.from(expected));
}

function runTests() {
  console.log("=== Admin Auth & Rollback Test Suite ===\n");

  // Step 1: Verify current .env.local state
  console.log("1. Reading current .env.local file...");
  const currentEnv = readFileSync(ENV_PATH, "utf-8");
  const currentPassword = getAdminPasswordFromEnv(currentEnv);
  console.log(`   Active ADMIN_PASSWORD: "${currentPassword}"`);

  if (currentPassword !== "DaisyAdmin2026!SecureKey") {
    throw new Error(`Expected ADMIN_PASSWORD to be "DaisyAdmin2026!SecureKey", but found "${currentPassword}"`);
  }
  console.log("   ✓ Verified active ADMIN_PASSWORD is set to new password.\n");

  // Step 2: Test password comparison logic
  console.log("2. Testing password comparison (new password vs old password)...");
  const isNewValid = verifyPassword("DaisyAdmin2026!SecureKey", currentPassword);
  const isOldValid = verifyPassword("ShadowMan31@", currentPassword);
  const isWrongValid = verifyPassword("WrongPassword123", currentPassword);

  console.log(`   - New password ("DaisyAdmin2026!SecureKey") test: ${isNewValid ? "PASS" : "FAIL"}`);
  console.log(`   - Old password ("ShadowMan31@") test: ${!isOldValid ? "PASS (Rejected)" : "FAIL"}`);
  console.log(`   - Random wrong password test: ${!isWrongValid ? "PASS (Rejected)" : "FAIL"}`);

  if (!isNewValid || isOldValid || isWrongValid) {
    throw new Error("Password authentication verification failed!");
  }
  console.log("   ✓ Password authentication logic operates correctly.\n");

  // Step 3: Test Rollback Functionality
  console.log("3. Testing Rollback functionality...");
  if (!existsSync(BACKUP_PATH)) {
    throw new Error(`Backup file not found at ${BACKUP_PATH}`);
  }
  console.log(`   Backup file confirmed present at: ${BACKUP_PATH}`);

  const backupContent = readFileSync(BACKUP_PATH, "utf-8");
  const backupPassword = getAdminPasswordFromEnv(backupContent);
  console.log(`   Backup ADMIN_PASSWORD: "${backupPassword}"`);

  if (backupPassword !== "ShadowMan31@") {
    throw new Error(`Expected backup password to be "ShadowMan31@", but found "${backupPassword}"`);
  }

  // Perform temporary rollback test
  console.log("   Performing test rollback (restoring .env.local from backup)...");
  writeFileSync(ENV_PATH, backupContent, "utf-8");

  const restoredEnv = readFileSync(ENV_PATH, "utf-8");
  const restoredPassword = getAdminPasswordFromEnv(restoredEnv);
  console.log(`   Restored ADMIN_PASSWORD: "${restoredPassword}"`);

  const isRestoredOldValid = verifyPassword("ShadowMan31@", restoredPassword);
  const isRestoredNewValid = verifyPassword("DaisyAdmin2026!SecureKey", restoredPassword);

  if (!isRestoredOldValid || isRestoredNewValid) {
    throw new Error("Rollback verification failed: old password did not authenticate after rollback!");
  }
  console.log("   ✓ Rollback verification passed: old password authenticated successfully after rollback.\n");

  // Step 4: Re-apply new password after testing rollback
  console.log("4. Re-applying new password to .env.local after successful rollback test...");
  const updatedEnv = backupContent.replace(/ADMIN_PASSWORD=ShadowMan31@/, "ADMIN_PASSWORD=DaisyAdmin2026!SecureKey");
  writeFileSync(ENV_PATH, updatedEnv, "utf-8");

  const finalEnv = readFileSync(ENV_PATH, "utf-8");
  const finalPassword = getAdminPasswordFromEnv(finalEnv);

  if (finalPassword !== "DaisyAdmin2026!SecureKey") {
    throw new Error(`Failed to re-apply new password. Found "${finalPassword}"`);
  }
  console.log(`   Final ADMIN_PASSWORD in .env.local: "${finalPassword}"`);
  console.log("   ✓ Final state successfully restored to new password.\n");

  console.log("==========================================");
  console.log("ALL AUTH & ROLLBACK TESTS PASSED SUCCESSFULLY");
  console.log("==========================================");
}

try {
  runTests();
} catch (err) {
  console.error("Test execution failed:", err);
  process.exit(1);
}
