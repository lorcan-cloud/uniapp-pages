import fs from 'fs';
import path from 'path';

interface PageItem {
    path: string;
    style: Record<string, any>;
}

interface SubPackage {
    root: string;
    pages: PageItem[];
}

interface PagesConfig {
    pages: PageItem[];
    subPackages?: SubPackage[];
}

export function extractPagePaths(pagesJsonPath: string): string[] {
    const content = fs.readFileSync(pagesJsonPath, 'utf-8');
    const config: PagesConfig = JSON.parse(content);
    const paths: string[] = [];

    // 处理主包页面
    config.pages.forEach(page => {
        paths.push(page.path);
    });

    // 处理分包页面
    config.subPackages?.forEach(subPackage => {
        subPackage.pages.forEach(page => {
            paths.push(`${subPackage.root}/${page.path}`);
        });
    });

    return paths;
}

export function generateTypeDefinition(paths: string[]): string {
    const typeNames = paths.map(path => `'${path}'`).join(' | ');
    return `declare type UNPages = ${typeNames};\n\nexport default UNPages;\n`;
}

export function writeTypeDefinition(content: string, outputPath: string): void {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(outputPath, content, 'utf-8');
} 