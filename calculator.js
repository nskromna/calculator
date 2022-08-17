const onTheScreen = document.querySelector('.screen-text');
let bufferSymbol = 0, result = 0, isLastClickedChar = false;
const buttons = document.querySelectorAll('.button-prop');

function doTheOperation() {  
    //if "C" or "=" was clicked or there is "Error!" on the screen - do nothing
    if (bufferSymbol === 0 || bufferSymbol === 61 || onTheScreen.innerText === 'Error!') {
        result = onTheScreen.innerText;
    }

    const bufferNum = parseInt(onTheScreen.innerText);
    switch (bufferSymbol) {       
        case 43: //addition
            result += bufferNum;          
            break;
        case 8722: //subtraction
            result -= bufferNum;
            break;
        case 247: //division
            if (bufferNum === 0) {
                result = 'Error!';
            } else {
                result /= bufferNum;
            }
            break;
        case 215: //multiplication
            result *= bufferNum;
            break;
        default:
            break;
    }
}

function selectTheOperation(symbol) {
    isLastClickedChar = true;
    switch (symbol.charCodeAt()) {
        case 43: //addition
        case 8722: //subtraction
        case 247: //division       
        case 215: //multiplication
            bufferSymbol = symbol.charCodeAt();
            result = parseInt(onTheScreen.innerText);
            break;
        case 61: //equal sign
            doTheOperation();           
            workOnTheNumber(result.toString());
            bufferSymbol = 61;
            break;
        case 67: //clear
            bufferSymbol = 0; 
            workOnTheNumber('0');                    
            break;
        case 8592: //backspace
            var cutString = onTheScreen.innerText.split("");
            //if the last clicked was "=" - don't remove anything
            if (bufferSymbol === 61) {
                cutString = cutString.join("");
            } else {
                if (cutString.length === 1) {
                    cutString = "0";
                } else {
                    cutString = cutString.slice(0,-1);
                    cutString = cutString.join("");
                }
            }         
            workOnTheNumber(cutString);
            isLastClickedChar = false;
            break;
        default:
            break;
    }
}

function workOnTheNumber(textNumber) {
    //if on the screen is 0 or last clicked was operation - overwrite
    if (onTheScreen.innerText === '0' || isLastClickedChar === true) {
        onTheScreen.innerText = textNumber;
    } else {
        onTheScreen.innerText += textNumber;
    }
}

function typeOfValueClicked(button) {
    if (isNaN(parseInt(button.innerText)) === false) {
        workOnTheNumber(button.innerText);
        isLastClickedChar = false;
    } else {
        const charButton = button.innerText.charCodeAt();
        //if there was previously clicked operation which wasn't "=" and currently clicked isn't "<-", nor "C" and weren't clicked two operations in a row -> sum up
        if (!(bufferSymbol === 0) && !(bufferSymbol === 61) && !(charButton === 8592) && !(charButton === 67) && isLastClickedChar === false) {
            selectTheOperation('='); 
        }
        //if currently clicked operation isn't "=" - because "=" will always meet the previous condition
        if (!(charButton === 61)) {
        selectTheOperation(button.innerText);
        }     
    }
}

function whichButtonClicked() {    
    buttons.forEach((node) => {
        node.addEventListener('click', function(event){
            typeOfValueClicked(event.target);
        });
    });
}

whichButtonClicked();