// 这是一个示例JavaScript文件，用于测试代码混淆功能

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

// 计算平均分
function calculateAverage(scores) {
  if (scores.length === 0) {
    return 0
  }

  const sum = calculateSum(scores)
  const average = sum / scores.length

  return Math.round(average * 100) / 100 // 保留两位小数
}

// 主程序
function main() {
  console.log('=== 用户管理系统 ===')

  userList.forEach((user, index) => {
    greetUser(user)
    console.log(`用户 ${user} 的分数: ${scores[index]}`)
  })

  const avgScore = calculateAverage(scores)
  console.log(`平均分数: ${avgScore}`)

  // 条件判断
  if (avgScore >= 90) {
    console.log('优秀！')
  }
  else if (avgScore >= 80) {
    console.log('良好！')
  }
  else {
    console.log('需要改进！')
  }
}

// 导出函数供其他模块使用
export { calculateAverage, calculateSum, greetUser }

// 如果直接运行此文件，执行主程序
if (typeof window === 'undefined') {
  main()
}
