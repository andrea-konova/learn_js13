'use strict';

let money = prompt('Ваш месячный доход?');
let income = 'Second job';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');
let budgetMonth = amount1 + amount2;
let mission = 20000;
let period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(', ');
console.log(addExpenses);

console.log('Бюджет на месяц ' + budgetMonth);

let missionCompleted = Math.ceil(mission / budgetMonth);

console.log('Цель будет достигнута за: ' + missionCompleted + ' месяцев');

let budgetDay = Math.floor(budgetMonth / 30);
console.log('Бюджет на день: ' + budgetDay);

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
} else if (600 <= budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
} else if (0 <= budgetDay < 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0) {
  console.log('Что то пошло не так');
}