# Trash Code

一个强大的 JavaScript 代码混淆工具，将可读的代码转换为难以阅读的"垃圾代码"，同时保持功能完整性。

## ✨ 特性

- 🔀 **变量名混淆** - 将有意义的变量名替换为随机字符串
- 💀 **无用代码注入** - 添加不影响执行的干扰代码
- 🎭 **控制流复杂化** - 增加代码的复杂度
- 🔤 **字符串混淆** - 将字符串转换为十六进制编码
- 📝 **混淆注释** - 添加随机的混淆注释
- 🎲 **随机空格** - 在操作符周围添加随机空格
- 📏 **随机换行** - 在代码行尾添加随机换行符
- ⚡ **高性能** - 基于 Babel AST 的高效处理
- 🛠️ **可配置** - 支持灵活的混淆选项配置

## 📦 安装

### 全局安装

```bash
npm install -g trash-code
# 或
pnpm add -g trash-code
# 或
yarn global add trash-code
```

### 本地安装

```bash
npm install trash-code
# 或
pnpm add trash-code
# 或
yarn add trash-code
```

## 🚀 使用方法

### 命令行使用

```bash
# 基本用法
trash-code input.js

# 指定输出文件
trash-code input.js -o output.js

# 禁用特定功能
trash-code input.js --no-variables --no-dead-code

# 查看帮助
trash-code --help

# 查看使用示例
trash-code example
```

### 编程接口

```javascript
import { CodeObfuscator } from 'trash-code'

const obfuscator = new CodeObfuscator({
  obfuscateVariables: true,
  addDeadCode: true,
  obfuscateStrings: true,
  addRandomSpaces: true,
  addRandomLineBreaks: true
})

const sourceCode = `
function greet(name) {
  console.log('Hello, ' + name + '!')
}
greet('World')
`

const obfuscatedCode = obfuscator.obfuscate(sourceCode)
console.log(obfuscatedCode)
```

## ⚙️ 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `obfuscateVariables` | `boolean` | `true` | 是否混淆变量名 |
| `addDeadCode` | `boolean` | `true` | 是否添加无用代码 |
| `obfuscateStrings` | `boolean` | `true` | 是否混淆字符串 |
| `minify` | `boolean` | `true` | 是否压缩代码 |
| `addRandomSpaces` | `boolean` | `true` | 是否添加随机空格 |
| `addRandomLineBreaks` | `boolean` | `true` | 是否添加随机换行符 |

### 命令行选项

```bash
trash-code <input> [options]

选项:
  -o, --output <output>    输出文件路径
  --no-variables          禁用变量名混淆
  --no-dead-code          禁用无用代码注入
  --no-control-flow       禁用控制流复杂化
  --no-strings            禁用字符串混淆
  --no-comment            禁用混淆注释
  --no-spaces             禁用随机空格
  --no-line-breaks        禁用随机换行符
  -h, --help              显示帮助信息
  -V, --version           显示版本号
```

## 📖 示例

### 输入代码

```javascript
// 计算数组总和
function calculateSum(numbers) {
  let total = 0
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i]
  }
  return total
}

function greetUser(name) {
  const greeting = `Hello, ${name}!`
  console.log(greeting)
  return greeting
}

const userList = ['Alice', 'Bob', 'Charlie']
const scores = [85, 92, 78, 96]
```

### 输出代码（混淆后）

```javascript
function _temp2() { return false; }

function hcci(d44f) {
  let bhba5dg = 0

  for (let b9f = 0; b9f < d44f.length; b9f++) {
    bhba5dg += d44f[b9f]
  }

  return bhba5dg
}

function b32(bdg2) {
  const a7c = `\x48\x65\x6C\x6C\x6F\x2C\x20${bdg2}\x21`
  console.log(a7c)
  return a7c
}

const b552h = ['\x41\x6C\x69\x63\x65', '\x42\x6F\x62', '\x43\x68\x61\x72\x6C\x69\x65']
const bd0213 = [85, 92, 78, 96]
```

## 🛠️ 开发

### 环境要求

- Node.js >= 16
- pnpm >= 8

### 本地开发

```bash
# 克隆项目
git clone https://github.com/cuiyiming1998/trash-code.git
cd trash-code

# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建项目
pnpm build

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 类型检查
pnpm typecheck
```

### 项目结构

```
trash-code/
├── src/
│   ├── cli.ts          # 命令行接口
│   ├── index.ts        # 入口文件
│   └── obfuscator.ts   # 核心混淆逻辑
├── test/
│   ├── example.js      # 测试示例
│   └── *.test.ts       # 测试文件
└── dist/               # 构建输出
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 📄 许可证

本项目基于 [MIT](LICENSE.md) 许可证开源。

## 🙏 致谢

- [Babel](https://babeljs.io/) - 强大的 JavaScript 编译器
- [Commander.js](https://github.com/tj/commander.js) - 命令行接口框架

---

⚠️ **免责声明**: 本工具仅用于学习和研究目的。请勿将其用于恶意目的或违法活动。使用者需自行承担使用本工具的风险和责任。
