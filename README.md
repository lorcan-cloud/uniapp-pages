# @lorcan-store/uniapp-pages

从 uniapp 项目的 pages.json 文件中提取页面路径，并生成 TypeScript 类型定义。

## 安装

```bash
npm install @lorcan-store/uniapp-pages --save-dev
```

## 使用方法

1. 在 package.json 中添加脚本：

```json
{
  "scripts": {
    "uniapp-pages": "uniapp-pages -f src/pages.json -s pages.d.ts"
  }
}
```

2. 运行命令生成类型定义：

```bash
npm run uniapp-pages
```

## 命令行选项

- `-f, --file <path>`: pages.json 文件的路径（必需）
- `-s, --save <path>`: 类型定义文件的输出路径（可选，默认为 pages.d.ts）

## 生成的类型定义

生成的类型定义文件将包含一个名为 `UNPages` 的类型，它是所有页面路径的联合类型：

```typescript
declare type UNPages = 'pages/home/home' | 'pages/user/user' | ...;

export default UNPages;
```

## License

MIT 