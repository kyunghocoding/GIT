const buttons = document.querySelectorAll(".button");
const display = document.getElementById("display");

let firstOperand = null; // 첫 번째 피연산자
let secondOperand = null; // 두 번째 피연산자
let operator = ''; // 연산자
let isNewInput = false; // 새로운 입력 여부

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const clickedValue = event.target.value;

        if (button.classList.contains("number")) {
            // 숫자 버튼 클릭 처리
            if (!isNaN(clickedValue) || clickedValue === '.') {
                if (clickedValue === '.' && display.textContent.includes('.')) {
                    return; // 이미 소수점이 있는 경우 추가하지 않음
                }
                if (display.textContent === '0' || isNewInput) {
                    display.textContent = clickedValue; // 연산자 클릭 후 첫 숫자 입력
                    isNewInput = false; // 새로운 입력 상태 초기화
                } else {
                    display.textContent += clickedValue; // 기존 값에 추가
                }
                console.log(clickedValue);
            }
        } 
        else if (button.classList.contains("clear")) {
            // 초기화 버튼 클릭 처리
            display.textContent = '0';
            firstOperand = null; // 피연산자 초기화
            secondOperand = null; // 두 번째 피연산자 초기화
            operator = ''; // 연산자 초기화
            isNewInput = false; // 새로운 입력 상태 초기화
            console.log("C"); // C 버튼 클릭 시 콘솔에 "C" 출력
        } 
        else if (button.classList.contains("operator")) {
            // 연산자 버튼 클릭 처리
            if (firstOperand === null) {
                firstOperand = parseFloat(display.textContent); // 현재 디스플레이 값을 첫 번째 피연산자로 저장
            } else {
                secondOperand = parseFloat(display.textContent); // 현재 디스플레이 값을 두 번째 피연산자로 저장
                calculate(); // 계산 수행
            }
            operator = clickedValue; // 클릭한 연산자를 저장
            isNewInput = true; // 새로운 입력 상태 설정
            console.log("firstOperand:", firstOperand, "operator:", operator);
        } 
        else if (button.classList.contains("function")) {
            // % 버튼 클릭 처리
            const currentValue = parseFloat(display.textContent);
            const percentResult = currentValue / 100;
            display.textContent = percentResult; // 결과를 디스플레이에 표시
            firstOperand = percentResult; // 첫 번째 피연산자를 결과로 업데이트
            secondOperand = null; // 두 번째 피연산자 초기화
            operator = ''; // 연산자 초기화
            isNewInput = true; // 새로운 입력 상태 설정
            console.log("Percent:", percentResult); // 콘솔에 퍼센트 결과 출력
            console.log("Clicked % button"); // % 버튼 클릭 시 콘솔에 출력
        }
        else if (button.classList.contains("function")) {
            // ± 버튼 클릭 처리
            const currentValue = parseFloat(display.textContent);
            const plusMinusResult = -currentValue;
            display.textContent = plusMinusResult; // 결과를 디스플레이에 표시
            if (firstOperand !== null) {
                firstOperand = plusMinusResult; // 첫 번째 피연산자를 업데이트
            } else {
                secondOperand = plusMinusResult; // 두 번째 피연산자를 업데이트
            }
            console.log("Plus/Minus:", plusMinusResult); // 콘솔에 ± 결과 출력
            console.log("Clicked ± button"); // ± 버튼 클릭 시 콘솔에 출력
        }
    });
});

function calculate() {
    let result;
    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            return; // 잘못된 연산자일 경우
    }
    display.textContent = result; // 계산 결과를 디스플레이에 표시
    firstOperand = result; // 첫 번째 피연산자를 결과로 업데이트
    secondOperand = null; // 두 번째 피연산자 초기화
    operator = ''; // 연산자 초기화
    isNewInput = true; // 새로운 입력 상태 설정
}

// 초기 디스플레이 값 설정
display.textContent = '0';