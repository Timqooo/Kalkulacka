class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    //Vycisti cely displey kalkulacky
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    //Metoda ktora zmaze poslednu cislicu z currentOperanda
  }

  appendNumber(number) {
    //Metoda ktora prida cislo do currentOperanda
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    //Metoda ktora priradi operaciu ktoru chceme vykonat, currentOperand a operacia sa presunu do previousOperad a currentOperand sa uvolni pre dalsi operand
    if (this.currentOperand === '') return
    //  Dorobte logiku ktora v pripade ze clovek ma oba operandy a stlaci tlacidlo operacie operacia sa vypocita a prida sa nova operacia,
    //  napr. ak v hornom riadku uz je 5 + na spodnom 2 a pouzivatel stlaci - na hornom displeji sa zobrazi 7 - a caka sa na dalsi operand
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      // Pridajte zvysne operacie na kalkulacky
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    // Metoda ktora ako vstup vezme cislo ktore sa ma napisat na display a upravi ho tak aby sme kazde tri cislice mali oddelene, napr 55555 bude 55,555
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.currentOperand
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.previousOperand} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.getElementsByClassName('data-number')
const operationButtons = document.getElementsByClassName('data-operation')
const equalsButton = document.getElementById('data-equals')
const deleteButton = document.getElementById('data-delete')
const allClearButton = document.getElementById('data-all-clear')
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

Array.from(numberButtons).forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

Array.from(operationButtons).forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})