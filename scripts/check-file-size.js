import { readdir, readFile } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const MAX_LINES = 175;
const IGNORE_PATTERNS = [
  'node_modules',
  'dist',
  '.git',
  'api/types.ts', // Generated file
  'stories', // Storybook files
  'components/ui/', // UI library components (Radix UI wrappers)
  'utils/validators.ts', // Utility file, not a component
  'lib/animations.ts', // Utility file, not a component
];

async function getAllFiles(dir, fileList = []) {
  const files = await readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const filePath = join(dir, file.name);
    const relativePath = filePath.replace(join(__dirname, '..'), '').replace(/\\/g, '/');

    // Skip ignored patterns
    if (IGNORE_PATTERNS.some((pattern) => relativePath.includes(pattern))) {
      continue;
    }

    if (file.isDirectory()) {
      await getAllFiles(filePath, fileList);
    } else if (file.isFile()) {
      const ext = extname(file.name);
      if (['.ts', '.tsx'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  }

  return fileList;
}

async function checkFileSize(filePath) {
  const content = await readFile(filePath, 'utf-8');
  const lines = content.split('\n').length;
  const relativePath = filePath.replace(join(__dirname, '..'), '').replace(/\\/g, '/');

  return {
    path: relativePath,
    lines,
    exceeds: lines > MAX_LINES,
  };
}

async function main() {
  const srcDir = join(__dirname, '..', 'src');
  const files = await getAllFiles(srcDir);
  const results = await Promise.all(files.map(checkFileSize));
  const violations = results.filter((r) => r.exceeds);

  if (violations.length > 0) {
    console.error(`\n❌ Found ${violations.length} file(s) exceeding ${MAX_LINES} lines:\n`);
    violations.forEach(({ path, lines }) => {
      console.error(`  ${path}: ${lines} lines (exceeds by ${lines - MAX_LINES})`);
    });
    console.error(`\nPlease refactor these files to be under ${MAX_LINES} lines.\n`);
    process.exit(1);
  } else {
    console.log(`✅ All files are under ${MAX_LINES} lines.`);
    process.exit(0);
  }
}

main().catch((error) => {
  console.error('Error checking file sizes:', error);
  process.exit(1);
});
