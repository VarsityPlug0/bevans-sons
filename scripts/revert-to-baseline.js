const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const BACKUPS = path.join(ROOT, "backups");
const DATA = path.join(ROOT, "data");

console.log("=== Reverting Daisy & Co. to Baseline (Pre-Clothing) State ===\n");

// 1. Git reset to baseline
console.log("1. Resetting git main branch to backup/baseline-clean (2c99d7cc)...");
execSync("git checkout main && git reset --hard backup/baseline-clean", { cwd: ROOT, stdio: "inherit" });

// 2. Restore baseline DB
const dbBak = path.join(BACKUPS, "daisy_snapshot_2026-08-25.db");
if (fs.existsSync(dbBak)) {
  console.log("2. Restoring baseline SQLite database...");
  fs.copyFileSync(dbBak, path.join(DATA, "daisy.db"));
}

console.log("\n✓ Reverted to baseline successfully!");
