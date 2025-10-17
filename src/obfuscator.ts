export interface ObfuscationOptions {
  /** 是否混淆变量名 */
  obfuscateVariables?: boolean
  /** 是否添加无用代码 */
  addDeadCode?: boolean
  /** 是否混淆字符串 */
  obfuscateStrings?: boolean
  /** 是否压缩代码 */
  minify?: boolean
  /** 是否在符号左右添加随机空格 */
  addRandomSpaces?: boolean
  /** 是否在行尾添加随机换行符 */
  addRandomLineBreaks?: boolean
}

export class CodeObfuscator {
  private options: Required<ObfuscationOptions>
  private variableMap = new Map<string, string>()
  private counter = 0

  constructor(options: ObfuscationOptions = {}) {
    this.options = {
      obfuscateVariables: true,
      addDeadCode: true,
      obfuscateStrings: true,
      minify: true,
      addRandomSpaces: true,
      addRandomLineBreaks: true,
      ...options,
    }
  }

  /**
   * 混淆JavaScript代码
   */
  obfuscate(code: string): string {
    let result = code

    // 混淆变量名
    if (this.options.obfuscateVariables) {
      result = this.obfuscateVariableNames(result)
    }

    // 混淆字符串
    if (this.options.obfuscateStrings) {
      result = this.obfuscateStringLiterals(result)
    }

    // 添加无用代码
    if (this.options.addDeadCode) {
      result = this.addDeadCode(result)
    }

    // 压缩代码（移除注释）
    if (this.options.minify) {
      result = this.minifyCode(result)
    }

    // 在符号左右添加随机空格
    if (this.options.addRandomSpaces) {
      // result = this.addRandomSpaces(result)
    }

    // 在行尾添加随机换行符
    if (this.options.addRandomLineBreaks) {
      result = this.addRandomLineBreaks(result)
    }

    return result
  }

  /**
   * 混淆变量名
   */
  private obfuscateVariableNames(code: string): string {
    let result = code

    // 第一步：收集并替换变量声明
    result = this.processKeywords(result)
    result = this.processFunctions(result)

    // 第二步：替换函数参数
    result = this.replaceFunctionArguments(result)

    // 第三步：替换变量使用，但避免替换已经处理的声明
    result = this.processVariables(result)

    return result
  }

  // 匹配 let/const/var 声明 并且替换成随机
  private processKeywords(result: string): string {
    result = result.replace(/\b(let|const|var)\s+([\w$]+)(\s*[=;,])/g, (match, keyword, varName, suffix) => {
      const newKeyword = this.generateNewRandomKeyword()
      if (!this.variableMap.has(varName)) {
        this.variableMap.set(varName, this.generateObfuscatedName())
      }
      return `${newKeyword} ${this.variableMap.get(varName)}${suffix}`
    })
    return result
  }

  // 匹配函数声明
  private processFunctions(result: string): string {
    result = result.replace(/\bfunction\s+([\w$]+)(\s*\()/g, (match, varName, suffix) => {
      if (!this.variableMap.has(varName)) {
        this.variableMap.set(varName, this.generateObfuscatedName())
      }
      return `function ${this.variableMap.get(varName)}${suffix}`
    })
    return result
  }

  private replaceFunctionArguments(result: string): string {
    result = result.replace(/\bfunction\s+[\w$]+\s*\(([^)]*)\)/g, (match, params) => {
      if (!params.trim())
        return match

      const paramList = params.split(',').map((param: string) => {
        const trimmed = param.trim()
        const varName = trimmed.match(/^[\w$]+/)?.[0]
        if (varName && !this.variableMap.has(varName)) {
          this.variableMap.set(varName, this.generateObfuscatedName())
        }
        return varName ? trimmed.replace(varName, this.variableMap.get(varName) || varName) : trimmed
      })

      return match.replace(params, paramList.join(', '))
    })
    return result
  }

  private processVariables(result: string): string {
    this.variableMap.forEach((obfuscated, original) => {
      // 只替换独立的变量名，避免替换关键字和字符串内容
      const regex = new RegExp(`\\b${this.escapeRegExp(original)}\\b`, 'g')
      result = result.replace(regex, (match, offset, string) => {
        // 检查是否在声明语句中
        const beforeMatch = string.substring(Math.max(0, offset - 20), offset)
        if (/\b(?:let|const|var|function)\s+$/.test(beforeMatch)) {
          return match // 不替换声明中的变量名
        }
        return obfuscated
      })
    })
    return result
  }

  private generateNewRandomKeyword(): string {
    const keywords = ['let', 'var']
    const randomIndex = Math.floor(Math.random() * keywords.length)
    return keywords[randomIndex]
  }

  /**
   * 转义正则表达式特殊字符
   */
  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  /**
   * 混淆字符串字面量
   */
  private obfuscateStringLiterals(code: string): string {
    // 匹配字符串字面量
    return code.replace(/(["'])((?:(?!\1)[^\\]|\\.)*)(\1)/g, (match, quote, content) => {
      // 将字符串转换为十六进制编码
      const hexEncoded = content.split('')
        .map((char: string) => `\\x${char.charCodeAt(0).toString(16).padStart(2, '0')}`)
        .join('')
      return `${quote}${hexEncoded}${quote}`
    })
  }

  /**
   * 添加无用代码
   */
  private addDeadCode(code: string): string {
    const deadCodeSnippets = [
      `var _${this.counter++} = ${Math.random()} + ${Math.random()};`,
      `if (1 > 2) { console.log('dead code'); }`,
      `for (var _i${this.counter++} = 0; _i${this.counter - 1} < 0; _i${this.counter - 1}++) {}`,
      `var _temp${this.counter++} = function() { return false; };`,
    ]

    // 在代码开头添加无用代码
    const randomSnippet = deadCodeSnippets[Math.floor(Math.random() * deadCodeSnippets.length)]
    return `${randomSnippet}\n${code}`
  }

  /**
   * 压缩代码（移除空白和注释）
   */
  private minifyCode(code: string): string {
    return code
      // 移除单行注释（包括中文字符）
      .replace(/\/\/[^\r\n]*/g, '')
      // 移除多行注释
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // 移除行首行尾空白
      .trim()
      // 清理多余的换行符
      .replace(/\n+/g, '\n')
      .trim()
  }

  /**
   * 在符号左右添加随机空格
   */
  // private addRandomSpaces(code: string): string {
  // 定义需要添加空格的符号
  // const symbols = ['+', '-', '*', '/', '==', '!=', '===', '!==', '<', '>', '<=', '>=', '&&', '||']

  // let result = code

  // for (const symbol of symbols) {
  //   const escapedSymbol = this.escapeRegExp(symbol)
  //   console.log(escapedSymbol)
  //   // 随机决定在符号左边添加1或2个空格
  //   const leftSpaces = Math.floor(Math.random() * 2) + 1
  //   // 随机决定在符号右边添加1或2个空格
  //   const rightSpaces = Math.floor(Math.random() * 2) + 1

  //   const regex = new RegExp(`\\s*${escapedSymbol}\\s*`, 'g')
  //   // TODO: 如果match两边没有其他符号，才添加空格
  //   result = result.replace(regex, (match, symbol, content) => {
  //     if (!/[+\-*/=<>!&|]/.test(match)) {
  //       return ' '.repeat(leftSpaces) + symbol + ' '.repeat(rightSpaces)
  //     }
  //     return match
  //   })
  // }

  //   return result
  // }

  /**
   * 在行尾添加随机换行符
   */
  private addRandomLineBreaks(code: string): string {
    const lines = code.split('\n')
    const result: string[] = []

    for (const line of lines) {
      result.push(line)
      // 随机决定添加1或2个换行符
      const lineBreaks = Math.floor(Math.random() * 2) + 1
      for (let i = 0; i < lineBreaks; i++) {
        result.push('')
      }
    }

    return result.join('\n')
  }

  /**
   * 生成混淆的变量名
   */
  private generateObfuscatedName(): string {
    const chars = 'abcdefghi'
    const nums = '0123456789'

    let name = ''
    // 第一个字符不能是数字
    name += chars[Math.floor(Math.random() * chars.length)]

    // 添加随机字符和数字
    const length = Math.floor(Math.random() * 5) + 3
    for (let i = 1; i < length; i++) {
      const allChars = chars + nums
      name += allChars[Math.floor(Math.random() * allChars.length)]
    }

    return name
  }
}
