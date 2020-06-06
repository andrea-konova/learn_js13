const money = 720;
const income = 'Second job';
let addExpenses = 'Rent, Food, Gasoline, Phone';
const deposit = true;
const mission = 20000;
const period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' долларов');

addExpenses = addExpenses.toLowerCase();
addExpenses = addExpenses.split(', ');
console.log(addExpenses);

let budgetDay = money / 30;
console.log(budgetDay);