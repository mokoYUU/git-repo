function validateInputs(value1, value2, operation) {
 if (value1 === '' || value2 === '') {
 return {
 ok: false,
 message: '2つの数値を入力してください'
 }
 }
 const a = Number(value1)
 const b = Number(value2)
  if (Number.isNaN(a) || Number.isNaN(b)) {
 return {
 ok: false,
 message: '数値を入力してください'
 }
 }
 if (operation === 'divide' && b === 0) {
 return {
 ok: false,
 message: '0で割ることはできません'
 }
 }
 return {
 ok: true,
 a,
 b
 }
}
function clearCalculator(number1Element, number2Element, resultElement,
messageElement) {
 number1Element.value = ''
 number2Element.value = ''
 resultElement.textContent = '結果：未計算'
 messageElement.textContent = ''
}
