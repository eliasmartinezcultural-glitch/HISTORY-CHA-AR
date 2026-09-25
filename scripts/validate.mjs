import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const required=['index.html','css/style.css','js/app.js','data/content.json'];
for(const file of required){try{await readFile(resolve(file),'utf8')}catch{console.error('Falta:',file);process.exit(1)}}
const data=JSON.parse(await readFile(resolve('data/content.json'),'utf8'));
if(!data.version||!Array.isArray(data.items))throw new Error('content.json no cumple el contrato mínimo');
for(const item of data.items){if(!item.id||!item.title||!item.status||!Array.isArray(item.sources)||item.sources.length===0)throw new Error('Contenido sin campos o fuente: '+(item.id||'sin-id'))}
console.log('✓ Estructura y contenido básico válidos.');