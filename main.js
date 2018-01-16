'use strict';
function Interface(node, elemsObj) {
    const ul = node.appendChild(document.createElement('ul'));
    ul.classList.add('appMenu');
    const appWrapper = node.appendChild(document.createElement('div'));
    appWrapper.id = 'appWrapper';
    for (let key in elemsObj) {
        const li = ul.appendChild(document.createElement('li'));
        li.innerHTML = key;
        li.classList.add('appMenu__elem');
        li.addEventListener('click', function () {
            appWrapper.innerHTML = '';
            elemsObj[key]();
        })
    }

}

function Converter(node, dollarVal = 52, euroVal = 70) {
    node.appendChild(document.createElement('h3')).innerHTML = 'Введите сумму в руб. и нажмите Ввод';
    const input = node.appendChild(document.createElement('input'));
    input.type = 'text';
    input.placeholder = 0;
    input.classList.add('converter__input');
    const dollarResult = node.appendChild(document.createElement('div'));
    dollarResult.classList.add('converter__result');
    const euroResult = node.appendChild(document.createElement('div'));
    euroResult.classList.add('converter__result');
    dollarResult.innerHTML = 'В долларах: 0';
    euroResult.innerHTML = 'В евро: 0';

    input.addEventListener('change', function () {
        if (!isANum(+input.value) || input.value < 0) {
            input.value = '';
            input.placeholder = 'Введите число > 0'
        }
        dollarResult.innerHTML = 'В долларах: ' + (input.value / dollarVal).toFixed(2);
        euroResult.innerHTML = 'В евро: ' + (input.value / euroVal).toFixed(2);
    });

}
function Game(node, qnaObj = {'answer': 'question'}) {
    const question = node.appendChild(document.createElement('h3'));
    const answer = node.appendChild(document.createElement('input'));
    answer.type = 'text';
    const button = node.appendChild(document.createElement('input'));
    button.type = 'button';
    button.value = 'Ответить';
    let qArr = [];
    let aArr = [];
    for (let key in qnaObj) {
        qArr.push(qnaObj[key]);
        if (isANum(key)) {
            aArr.push(key);
        } else {
            aArr.push(key.toLowerCase());
        }
    }

    let i = qArr.length;
    let correctCount = 0;
    startIteration();
    button.addEventListener('click', function () {
        setAnswer();
    });
    function startIteration() {
        i--;
        answer.value = '';
        answer.placeholder = 'Введите ответ';
        answer.focus();
        question.innerHTML = qArr[i];
    }
    function setAnswer() {
        let temp = answer.value;
        if (!isANum(answer.value)) {
            temp = answer.value.toLowerCase();
        }
        if (aArr[i] == temp) {
            correctCount++
        }
        if (i > 0) {
            return startIteration();
        } else {
            node.innerHTML = 'Правильных ответов: ' + correctCount;
        }
    }
}

const container = document.querySelector('.container');

new Interface(container, {
    'Converter': function () {
        new Converter(appWrapper);
    },
    'Game': function () {
        new Game(appWrapper, {
            5: '2 + 3 = ? (числом)',
            'эверест': 'Самая высокая гора?',
            3: 'Сколько агрегатных состояний у воды? (Числом)'
        });
    }
});

function isANum(value) {
    if (value instanceof Number)
        value = value.valueOf();
    return isFinite(value) && value === parseInt(value, 10);
}