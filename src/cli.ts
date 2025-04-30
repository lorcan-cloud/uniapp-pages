#!/usr/bin/env node

import { Command } from 'commander';
import { extractPagePaths, generateTypeDefinition, writeTypeDefinition } from './index';

const program = new Command();

program
    .name('uniapp-pages')
    .description('Generate TypeScript type definitions from uniapp pages.json')
    .version('1.0.0')
    .requiredOption('-f, --file <path>', 'Path to pages.json file')
    .option('-s, --save <path>', 'Output path for type definition file', 'src/pages.d.ts');

program.parse();

const options = program.opts();

try {
    const paths = extractPagePaths(options.file);
    const typeDefinition = generateTypeDefinition(paths);
    writeTypeDefinition(typeDefinition, options.save);
    console.log(`Successfully generated type definitions at ${options.save}`);
} catch (error) {
    console.error('Error:', error instanceof Error ? error.message : String(error));
    process.exit(1);
} 