'use strict';

// Проверяет значение на число
const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;
const income = 'Second job';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const mission = 1500000;
const period = 12;

const start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while(!isNumber(money)) 
};

start();

const showTypeOf = function(data) {
  console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');

console.log(addExpenses.toLowerCase().split(', '));

let expenses = [];

// возвращает сумму всех обязательных расходов за месяц
const getExpensesMonth = function() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    let sum1;
    expenses[i] = prompt('Введите обязательную статью расходов?');
    
    do {
      sum1 = prompt('Во сколько это обойдется?');
    }
    while(!isNumber(sum1)) 

    sum += +sum1;
  }

  return sum;
};

const expensesAmonth = getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmonth);

// Возвращает накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = function() {
  return money - expensesAmonth;
}
console.log('Накопления за месяц: ' + getAccumulatedMonth());

const accumulatedMonth = getAccumulatedMonth();

// Подсчитывает за какой период будет достигнута цель
const getTargetMonth = function() {
  return Math.ceil(mission / accumulatedMonth)
};

if (getTargetMonth() < 0){
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута за: ' 
+ getTargetMonth());
}

const budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ' + budgetDay);

const getStatusIncome = function() {
  if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
  } else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
  } else if (budgetDay >= 0 && budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay < 0) {
    console.log('Что то пошло не так');
  } 
};

getStatusIncome();
