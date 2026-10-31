const https = require('https');
const fs = require('fs');
const path = require('path');

const base = 'https://unpkg.com/morphicons@1.7.1/dist/';
const order = [
  'normalize-CYnN3Npw.js',
  'spring-CFHloqPP.js',
  'dom.js',
  'controller-CXZuwJ_M.js',
  'element.js'
];

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

(async () => {
  const files = {};
  for (const f of order) {
    console.log('下载', f, '...');
    files[f] = await download(base + f);
  }

  const fileToIndex = {};
  order.forEach((f, i) => { fileToIndex[f] = i; });

  const chunks = [];
  order.forEach((file, index) => {
    let code = files[file];
    code = code.replace(/^import \{ ([^}]+) \} from "\.\/([^"]+)";\s*/gm, (m, spec, from) => {
      const ns = `__mod_${fileToIndex[from]}`;
      const decls = spec.split(',').map((s) => s.trim()).filter(Boolean);
      return decls.map((d) => {
        const parts = d.split(/\s+as\s+/);
        const exportedName = parts[0].trim();
        const localName = parts.length > 1 ? parts[1].trim() : parts[0].trim();
        return `var ${localName} = ${ns}.${exportedName};`;
      }).join('\n') + '\n';
    });
    code = code.replace(/export \{ ([^}]+) \};/g, (m, spec) => {
      const ns = `__mod_${index}`;
      const decls = spec.split(',').map((s) => s.trim()).filter(Boolean);
      return decls.map((d) => {
        const parts = d.split(/\s+as\s+/);
        const localName = parts[0].trim();
        const exportedName = parts.length > 1 ? parts[1].trim() : parts[0].trim();
        return `${ns}.${exportedName} = ${localName};`;
      }).join('\n');
    });
    chunks.push(`(function () {\n${code}\n})();`);
  });

  const nsDecls = order.map((_, i) => `__mod_${i} = {}`).join(', ');
  const elementIndex = fileToIndex['element.js'];
  const output = `/* Morphicons 1.7.1 (MIT) — bundled to a plain script for file:// compatibility */
(function (global) {
"use strict";
var ${nsDecls};

${chunks.join('\n\n')}

global.defineMorphIcon = __mod_${elementIndex}.defineMorphIcon;
global.MorphIconElement = __mod_${elementIndex}.MorphIconElement;
})(typeof window !== "undefined" ? window : globalThis);
`;

  fs.writeFileSync(path.join('dist', 'morphicons.bundle.js'), output);
  console.log('生成 morphicons.bundle.js，大小', output.length, 'bytes');
})().catch((e) => { console.error('失败:', e.message); process.exit(1); });
