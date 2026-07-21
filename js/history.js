function addHistory(historyListElement, expression) {
 const item = document.createElement('li')
 item.textContent = expression
 historyListElement.prepend(item)
}
