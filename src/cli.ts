#!/usr/bin/env node

import type { ObfuscationOptions } from './obfuscator.js'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { Command } from 'commander'
import { CodeObfuscator } from './obfuscator.js'

const program = new Command()

program
  .name('trash-code')
  .description('将可读的JavaScript代码转换为难以阅读的垃圾代码')
  .version('1.0.0')

program
  .argument('<input>', '输入的JavaScript文件路径')
  .option('-o, --output <output>', '输出文件路径（默认为输入文件名加.obfuscated.js后缀）')
  .option('--no-variables', '禁用变量名混淆')
  .option('--no-dead-code', '禁用无用代码注入')
  .option('--no-control-flow', '禁用控制流复杂化')
  .option('--no-strings', '禁用字符串混淆')
  .option('--no-comment', '禁用混淆注释')
  .action(async (input, options) => {
    try {
      // 解析输入文件路径
      const inputPath = resolve(input)

      // 读取输入文件
      const sourceCode = readFileSync(inputPath, 'utf-8')

      console.log('options: ', options)
      // 构建混淆选项
      const obfuscationOptions: ObfuscationOptions = {
        obfuscateVariables: options.variables !== false,
        addDeadCode: options.deadCode !== false,
        obfuscateStrings: options.strings !== false,
        minify: options.minify !== false,
      }

      // 创建混淆器并处理代码
      const obfuscator = new CodeObfuscator(obfuscationOptions)
      const obfuscatedCode = await obfuscator.obfuscate(sourceCode)

      // 确定输出文件路径
      const outputPath = options.output || inputPath.replace(/\.js$/, '.trash.js')

      // 写入混淆后的代码
      writeFileSync(outputPath, obfuscatedCode, 'utf-8')

      console.log(`✅ 完成！`)
      console.log(`📁 输入文件: ${inputPath}`)
      console.log(`📁 输出文件: ${outputPath}`)
      console.log(`📊 原始代码长度: ${sourceCode.length} 字符`)
      console.log(`📊 处理后长度: ${obfuscatedCode.length} 字符`)
    }
    catch (error) {
      console.error('❌ 处理失败:', error instanceof Error ? error.message : String(error))
      process.exit(1)
    }
  })

// 添加示例命令
program
  .command('example')
  .description('显示使用示例')
  .action(() => {
    console.log(`
📖 使用示例:

基本用法:
  trash-code input.js

指定输出文件:
  trash-code input.js -o output.js

禁用某些混淆功能:
  trash-code input.js --no-variables --no-strings

完整示例:
  trash-code src/main.js -o dist/main.obfuscated.js
    `)
  })

export default program
