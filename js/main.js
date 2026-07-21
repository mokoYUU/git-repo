document.addEventListener('DOMContentLoaded', () => {
 const number1Element = document.getElementById('number1')
const number2Element = document.getElementById('number2')
 const addButton = document.getElementById('btn-add')
 const subtractButton = document.getElementById('btn-subtract')
 const multiplyButton = document.getElementById('btn-multiply')
 const divideButton = document.getElementById('btn-divide')
 const clearButton = document.getElementById('btn-clear')
 const messageElement = document.getElementById('message')
 const resultElement = document.getElementById('result')
 const historyListElement = document.getElementById('history-list')
 function calculate(operation) {
 const validationResult = validateInputs(
 number1Element.value,
 number2Element.value,
 operation
 )
 if (!validationResult.ok) {
 messageElement.textContent = validationResult.message
 resultElement.textContent = '結果：計算できません'
 return
 }
 const { a, b } = validationResult
 let result
 let symbol
 if (operation === 'add') {
 result = add(a, b)
 symbol = '+'
 } else if (operation === 'subtract') {
 result = subtract(a, b)
 symbol = '-'
 } else if (operation === 'multiply') {
 result = multiply(a, b)
 symbol = '×'
 } else if (operation === 'divide') {
 result = divide(a, b)
 symbol = '÷'
 } else {
 messageElement.textContent = '未対応の計算です'
 return
 }
 messageElement.textContent = ''
 resultElement.textContent = `結果：${result}`
 addHistory(
 historyListElement,
 `${a} ${symbol} ${b} = ${result}`
 )
}
 addButton.addEventListener('click', () => {
 calculate('add')
 })
 subtractButton.addEventListener('click', () => {
 calculate('subtract')
 })
 multiplyButton.addEventListener('click', () => {
 calculate('multiply')
 })
 divideButton.addEventListener('click', () => {
 calculate('divide')
 })
 clearButton.addEventListener('click', () => {
 clearCalculator(
 number1Element,
 number2Element,
 resultElement,
 messageElement
 )
 })
})

