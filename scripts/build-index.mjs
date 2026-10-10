import { create, insert } from '@orama/orama';
import { persist } from '@orama/plugin-data-persistence';
import fs from 'fs';
import path from 'path';
import { extraKeywords, pullTokens } from '../lib/docs-keywords.mjs';
// NOTE: 'lib/source' uses 'fumadocs-mdx' which is a virtual module in Next.js build.
// Standard Node scripts can't import it directly without a custom loader.
// For this POC, we will revert to reading files directly or using a simplified approach
// if 'npm run build' handles the indexing (which it does via Next).
// However, to keep it simple and robust for this "Vetradocs" demo:
// We will scan the 'content/docs' directory manually for the indexer.

const CONTENT_DIR = path.join(process.cwd(), 'content', 'docs');



const OUTPUT_DIR = path.join(process.cwd(), 'public');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'search-index.json');

// Simple function to recursively get files
function getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

async function build() {
  console.log('🏗️  Building Orama Search Index...');

  // 1. Create the Orama Database Schema
  const db = await create({
    schema: {
      title: 'string',
      url: 'string',
      keywords: 'string',
      content: 'string',
    },
  });

  // 2. Insert Documents by scanning content/docs
  const files = getFiles(CONTENT_DIR).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    // Basic Frontmatter parsing (titles)
    const titleMatch = content.match(/^title:\s*(.*)$/m);
    const title = titleMatch ? titleMatch[1].trim().replace(/^["']|["']$/g, '') : path.basename(file, path.extname(file));
    const body = content.replace(/^---[\s\S]*?---/, '').trim();

    const relativePath = path.relative(CONTENT_DIR, file).replace(/\\/g, '/').replace(/\.mdx?$/, '');
    const url = `/docs/${relativePath === 'index' ? '' : relativePath}`;
    const sections = body.split(/\n(?=## )/).map((part) => part.trim()).filter(Boolean);

    for (const [index, section] of sections.entries()) {
      const heading = section.match(/^#{1,3}\s+(.+)$/m);
      const sectionTitle = heading ? `${title}: ${heading[1].trim()}` : title;
      const keywords = [pullTokens(section), extraKeywords(`${title}\n${section}`)].filter(Boolean).join(' ');
      await insert(db, {
        title: sectionTitle,
        url: url,
        keywords,
        content: section,
      });
      if (index === 0 && sections.length === 1) break;
    }
  }

  // 3. Save Index to Public Folder (so the browser/API can load it)
  // Using persist with 'json' format returns the JSON string/object
  const index = await persist(db, 'json');

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);
  fs.writeFileSync(OUTPUT_FILE, index); // index is string in 'json' mode usually? OR we check?
  // Orama v3 persist 'json' returns string

  console.log(`✅ Index saved to ${OUTPUT_FILE}`);
}

build();
