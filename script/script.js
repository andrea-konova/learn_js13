'use strict';

// Проверяет значение на число
const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;

const start = function() {
  do {
    money = prompt('Ваш месячный доход?');
  }
  while(!isNumber(money)) 
};

start();

let appData = {
  income: {},
  addImcome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 1500000,
  period: 12,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      appData.addExpenses = addExpenses.toLowerCase().split(', ');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');
  },
  // возвращает сумму всех обязательных расходов за месяц
  getExpensesMonth: function() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      let sum1;
      appData.expenses[i] = prompt('Введите обязательную статью расходов?');
      
      do {
        sum1 = prompt('Во сколько это обойдется?');
      }
      while(!isNumber(sum1)) 

      sum += +sum1;
    }

    return sum;
  },
  // Возвращает накопления за месяц (Доходы минус расходы)
  getAccumulatedMonth: function() {
    return money - expensesAmonth;
  },
  // Подсчитывает за какой период будет достигнута цель
  getTargetMonth: function() {
    return Math.ceil(appData.mission / accumulatedMonth)
  },
  getStatusIncome: function() {
    if (appData.budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      console.log('У вас средний уровень дохода');
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay < 0) {
      console.log('Что то пошло не так');
    } 
  }
};


console.log(appData.addExpenses.length);

console.log('Период равен ' + appData.period + ' месяцев');
console.log('Цель заработать ' + appData.mission + ' рублей');

console.log();

const expensesAmonth = appData.getExpensesMonth();

console.log('Расходы за месяц: ' + expensesAmonth);


console.log('Накопления за месяц: ' + appData.getAccumulatedMonth());

const accumulatedMonth = appData.getAccumulatedMonth();



if (appData.getTargetMonth() < 0){
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута за: ' 
+ appData.getTargetMonth());
}

const budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день: ' + appData.budgetDay);



appData.getStatusIncome();
