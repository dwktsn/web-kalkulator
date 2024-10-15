//Objek untuk menyimpan data dan kondisi pada kalkulator
const calculator = {
    displayNumber : '0',
    operator : null,
    firstNumber : null,
    waitingForSecondNumber: false
};

//Fungsi untuk mengupdate angka pada tampilan kalkulator
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

//Fungsi untuk menghapus data pada kalkulator
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

//Fungsi untuk memasukkan angka ke dalam nilai displayNumber
function inputDigit(digit) {
    if (calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    }
    else {
        calculator.displayNumber += digit;
    }
}

//Fungsi negatif(-) untuk mengubah angka menjadi negatif, kecuali 0
function inverseNumber() {
    if (calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

//Fungsi operator(+ dan -) untuk menyimpan nilai operator dan firstNumber
function handleOperator(operator) {
    if (!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        //Mengatur ulang nilai displayNumber agar tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    }
    else {
        alert('Operator sudah ditetapkan')
    }
}

//Fungsi sama dengan(=) untuk melakukan kalkulasi/perhitungan
function performCalculation() {
    if (calculator.firstNumber == null || calculator.operator == null) {
        alert('Anda belum menetapkan operator');
        return;
    }

    let result = 0;
    if (calculator.operator === '+') {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    }
    else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    calculator.displayNumber = result;
}

//Kodingan tombol
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function(event){
        
        //Untuk mendapatkan objek elemen yang diklik
        const target = event.target;

        //Tombol CE
        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }

        //Tombol +/-
        if (target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }

        //Tombol =
        if (target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }

        //Tombol + dan -
        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay()
    });
}