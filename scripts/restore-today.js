const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BACKUPS = path.join(ROOT, "backups");
const DATA = path.join(ROOT, "data");

console.log("=== Restoring Daisy & Co. to 2026-08-27 State ===\n");

// 1. Git reset
console.log("1. Resetting git main branch to backup/2026-08-27-today-work...");
execSync("git checkout main && git reset --hard backup/2026-08-27-today-work", { cwd: ROOT, stdio: "inherit" });

// 2. Restore DB
const dbBak = path.join(BACKUPS, "daisy_2026-08-27_with_clothing.db");
if (fs.existsSync(dbBak)) {
  console.log("2. Restoring SQLite database with clothing items...");
  fs.copyFileSync(dbBak, path.join(DATA, "daisy.db"));
}

// 3. Restore .env.local
const envBak = path.join(BACKUPS, "env.local.2026-08-27.bak");
if (fs.existsSync(envBak)) {
  console.log("3. Restoring .env.local...");
  fs.copyFileSync(envBak, path.join(ROOT, ".env.local"));
}

// 4. Build
console.log("\n4. Running production build...");
execSync("npm run build", { cwd: ROOT, stdio: "inherit" });

console.log("\n✓ Restored successfully! You can now deploy with: node scripts/deploy-render.js");
