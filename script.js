//Create calculator class
class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement

        this.clear()
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.') ) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
        this.updateDisplay()
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
          } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
          }

          if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
          } else {
            return integerDisplay
          }
    }
    chooseOperation(operation){
        if(this.currentOperand === "") return

        if(this.previousOperand !== ""){
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""

        this.updateDisplay()
    }
    compute(){
        
        let computation
        const prev = parseInt(this.previousOperand)
        const current = parseInt(this.currentOperand)

        if(isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case "+":
                computation = prev + current
                break;
            case "-":
                computation = prev - current
                break;
            case "*":
                computation = prev * current
                break;
            case "÷":
                computation = prev / current
                break;
        
            default:
                return
        }

        this.currentOperand = computation
        this.previousOperand = ""
        this.operation = undefined

        this.updateDisplay()
    }
    updateDisplay(){
        // this.previousOperand = this.getDisplayNumber(this.previousOperand)
        // this.currentOperand = this.getDisplayNumber(this.currentOperand)

        this.currentOperandTextElement.innerText =  this.getDisplayNumber(this.currentOperand)

        if (this.previousOperand === "") {
            this.previousOperandTextElement.innerText = ""
        } else if (this.operation != null && this.currentOperand === "") {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)}  ${this.operation} ${ this.getDisplayNumber(this.currentOperand)}`
        }

    }

    delete(){
     this.currentOperand = this.currentOperand.toString().slice(0, -1)
     this.updateDisplay()
    }

    clear(){
        this.previousOperand= ""
        this.currentOperand= ""
        this.operation = undefined
        this.updateDisplay()

    }
}

//Get elements from the DOM
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//Create calculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


// Add Eventlistemers
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
})