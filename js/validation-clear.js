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


// 3の倍数、または数字の中に「3」が含まれているか判定する
// 条件を満たす場合はtrue、満たさない場合はfalseを返す
function isMultipleOfThreeOrContainsThree(value) {
  const text = String(value).trim().replace(/,/g, '')
  const number = Number(text)

  if (text === '' || !Number.isFinite(number)) {
    return false
  }

  // 3の倍数かどうか
  // 小数は「3の倍数」の判定対象外とする
  const isMultipleOfThree =
    Number.isInteger(number) && number % 3 === 0

  // 入力された文字の中に3が含まれているか
  const containsThree = text.replace(/^[+-]/, '').includes('3')

  return isMultipleOfThree || containsThree
}

// 数字を日本語の読み方に変換する
// 例：1234 → 「せんにひゃくさんじゅうよん」
function numberToJapanese(value) {
  const originalText = String(value).trim()
  const text = originalText.replace(/,/g, '')

  // 整数または小数になっているか確認する
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) {
    return '正しい数値を入力してください'
  }

  const digitReadings = [
    'れい',
    'いち',
    'に',
    'さん',
    'よん',
    'ご',
    'ろく',
    'なな',
    'はち',
    'きゅう'
  ]

  // 4桁以下の整数を日本語読みに変換する
  function readFourDigits(numberText) {
    const paddedNumber = numberText.padStart(4, '0')
    const thousands = Number(paddedNumber[0])
    const hundreds = Number(paddedNumber[1])
    const tens = Number(paddedNumber[2])
    const ones = Number(paddedNumber[3])

    let reading = ''

    // 千の位
    if (thousands === 1) {
      reading += 'せん'
    } else if (thousands === 3) {
      reading += 'さんぜん'
    } else if (thousands === 8) {
      reading += 'はっせん'
    } else if (thousands !== 0) {
      reading += digitReadings[thousands] + 'せん'
    }

    // 百の位
    if (hundreds === 1) {
      reading += 'ひゃく'
    } else if (hundreds === 3) {
      reading += 'さんびゃく'
    } else if (hundreds === 6) {
      reading += 'ろっぴゃく'
    } else if (hundreds === 8) {
      reading += 'はっぴゃく'
    } else if (hundreds !== 0) {
      reading += digitReadings[hundreds] + 'ひゃく'
    }

    // 十の位
    if (tens === 1) {
      reading += 'じゅう'
    } else if (tens !== 0) {
      reading += digitReadings[tens] + 'じゅう'
    }

    // 一の位
    if (ones !== 0) {
      reading += digitReadings[ones]
    }

    return reading
  }

  const isNegative = text.startsWith('-')
  const unsignedText = text.replace(/^[+-]/, '')
  let [integerPart, decimalPart] = unsignedText.split('.')

  // 「.5」のような入力を「0.5」として扱う
  if (integerPart === '') {
    integerPart = '0'
  }

  // 先頭の不要な0を取り除く
  integerPart = integerPart.replace(/^0+(?=\d)/, '')

  const groupUnits = ['', 'まん', 'おく', 'ちょう', 'けい']
  const groups = []

  // 右側から4桁ずつに分ける
  for (let end = integerPart.length; end > 0; end -= 4) {
    const start = Math.max(0, end - 4)
    groups.unshift(integerPart.slice(start, end))
  }

  if (groups.length > groupUnits.length) {
    return '大きすぎる数値には対応していません'
  }

  let integerReading = ''

  groups.forEach((group, index) => {
    const groupNumber = Number(group)

    if (groupNumber === 0) {
      return
    }

    const unitIndex = groups.length - index - 1
    integerReading += readFourDigits(group) + groupUnits[unitIndex]
  })

  if (integerReading === '') {
    integerReading = 'れい'
  }

  // 小数部分は1桁ずつ読む
  let decimalReading = ''

  if (decimalPart !== undefined && decimalPart !== '') {
    decimalReading =
      'てん' +
      decimalPart
        .split('')
        .map(digit => digitReadings[Number(digit)])
        .join('')
  }

  // -0や-0.0には「まいなす」を付けない
  const isZero = /^0+$/.test(integerPart) &&
    (decimalPart === undefined || /^0*$/.test(decimalPart))

  const signReading = isNegative && !isZero ? 'まいなす' : ''

  return signReading + integerReading + decimalReading
}



