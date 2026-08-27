const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const REPLACEMENTS = [
  { from: /27825876811/g, to: "27825876811" },
  { from: /\+27 82 587 6811/g, to: "+27 82 587 6811" },
  { from: /\+27825876811/g, to: "+27825876811" },
  { from: /082 587 6811/g, to: "082 587 6811" },
  { from: /0825876811/g, to: "0825876811" },
];

const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".html"];
const IGNORE_DIRS = ["node_modules", ".next", ".git"];

let modifiedCount = 0;

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!IGNORE_DIRS.includes(file)) {
        walk(fullPath);
      }
    } else if (EXTENSIONS.includes(path.extname(file))) {
      let content = fs.readFileSync(fullPath, "utf-8");
      let changed = false;
      for (const { from, to } of REPLACEMENTS) {
        if (from.test(content)) {
          content = content.replace(from, to);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, "utf-8");
        console.log(`Updated: ${path.relative(ROOT, fullPath)}`);
        modifiedCount++;
      }
    }
  }
}

walk(ROOT);
console.log(`\nSuccessfully updated WhatsApp number in ${modifiedCount} files.`);