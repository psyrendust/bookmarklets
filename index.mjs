import fs from 'node:fs';
import path from 'node:path';

import { minify } from 'terser';

const __dirname = path.resolve();
const files = new Map();
const hrule = `\n\n---\n\n`;

function createBookmarletLink(label, code) {
  return `### Bookmarklet Link

<details>
<summary>Tip</summary>

> [!TIP] Drag the bookmarklet link to your browsers bookmarks bar.

</details>

<a href='javascript:(()=>{${code}})();'>${label}</a>`;
}

async function minifyCode(code) {
  return minify(code, {
    compress: {
      drop_console: true,
    },
    mangle: true,
  });
}

function updateReadme(content = []) {
  let template = fs.readFileSync(path.join(__dirname, 'template.md'), 'utf8');
  content.forEach((section) => {
    template += `\n${section}`;
  });
  fs.writeFileSync(path.join(__dirname, 'README.md'), template);
}

fs.readdirSync(path.join(__dirname, 'src')).forEach((file) => {
  const extension = path.extname(file);
  const filename = path.basename(file, extension);
  let filePair = files.get(filename);
  filePair ??= {
    code: '',
    markdown: '',
  };

  const filePath = path.join(__dirname, 'src', file);
  const contents = fs.readFileSync(filePath, 'utf8');
  if (extension === '.js') {
    filePair.code = contents;
  } else if (extension === '.md') {
    filePair.markdown = contents;
  }
  files.set(filename, filePair);
});

let newContent = [];
for (const { code, markdown } of files.values()) {
  const minifiedCode = await minifyCode(code);
  const label = markdown.match(/^# (.*)/)[1];
  const bookmarkletLink = createBookmarletLink(label, minifiedCode.code);
  newContent.push(`#${markdown}\n\n${bookmarkletLink}`);
  newContent.push(hrule);
}
if (newContent.at(-1) === hrule) {
  newContent.pop();
}
newContent.push('\n');

updateReadme(newContent);
