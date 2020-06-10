'use strict';

const money = prompt('Ваш месячный доход?', 10000);
const income = 'Second job';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
const deposit = confirm('Есть ли у вас депозит в банке?');
const expenses1 = prompt('Введите обязательную статью расходов?');
const amount1 = +prompt('Во сколько это обойдется?', 4000);
const expenses2 = prompt('Введите обязательную статью расходов?');
const amount2 = +prompt('Во сколько это обойдется?', 3000);
const mission = 20000;
const period = 12;

const showTypeOf = function(data) {
  console.log(data, typeof(data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(', ');
console.log(addExpenses);

// возвращает сумму всех обязательных расходов за месяц
const getExpensesMont = function() {
  return amount1 + amount2;
}
console.log(getExpensesMont());

// возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = function() {
  return money - getExpensesMont();
}
console.log(getAccumulatedMonth());

const accumulatedMonth = getAccumulatedMonth();

// Подсчитывает за какой период будет достигнута цель
const getTargetMonth = function() {
  return Math.ceil(mission / accumulatedMonth)
}
console.log(getTargetMonth());

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
}

getStatusIncome();