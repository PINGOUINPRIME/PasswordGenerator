//MODUL
const resultPG = document.querySelector('#result-pg');
const lengthPG = document.querySelector('#length-pg');
const uppercasePG = document.querySelector('#uppercase-pg');
const lowercasePG = document.querySelector('#lowercase-pg');
const numbersPG = document.querySelector('#numbers-pg');
const symbolsPG = document.querySelector('#symbols-pg');
const generatePG = document.querySelector('#generate-pg');
const clipboardPG = document.querySelector('#clipboard-pg');

var randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

clipboardPG.addEventListener('click', () =>{
    const textarea = document.createElement('textarea');
    const password = resultPG.innerText;
  
    if(!password) {
    return;
    }
  
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Password copied to clipboard");
});

generatePG.addEventListener('click', () => {
    const length = +lengthPG.value;
    const hasUpper = uppercasePG.checked;
    const hasLower = lowercasePG.checked;
    const hasNumber = numbersPG.checked;
    const hasSymbol = symbolsPG.checked;
  
    resultPG.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

function generatePassword(upper, lower, number, symbol, length) {
    let generatePassword = '';
    const typesCount = upper + lower + number + symbol;
  
    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if(typesCount == 0) {
    return '';
    }
  
    for(let i = 0; i< length; i += typesCount) {
    typesArr.forEach(type => {
        const funcName = Object.keys(type)[0];
      
        generatePassword += randomFunc[funcName]();
    });
  }
  
    let finalPassword = generatePassword.slice(0, length);
  
    return finalPassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() *26) + 65);
}

function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}
//MODUL