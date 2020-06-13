'use strict';

// Проверяет значение на число
const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const start = function() {

  let money = prompt('Ваш месячный доход?');
  
  while(!isNumber(money)) {
    money = prompt('Ваш месячный доход?');
  } 
  return +money
};


const appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 1500000,
  period: 12,
  budget: start(),
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() {
    const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      appData.addExpenses = addExpenses.toLowerCase().split(', ');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');

      for (let i = 0; i < 2; i++) {

        let nameExpenses,
          costExpenses;

        nameExpenses = prompt('Введите обязательную статью расходов?');
        
        do {
          costExpenses = prompt('Во сколько это обойдется?');
        }
        while(!isNumber(costExpenses)) 

        appData.expenses[nameExpenses] = +costExpenses;

      }

  },
  // возвращает сумму всех обязательных расходов за месяц
  getExpensesMonth: function() {
    let sum = 0;

    for (let nameExpenses in appData.expenses) {

      sum += appData.expenses[nameExpenses];
    }

    appData.expensesMonth = +sum;
  },
  // Возвращает накопления за месяц (Доходы минус расходы)
  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  // Подсчитывает за какой период будет достигнута цель
  getTargetMonth: function() {
    return Math.ceil(appData.mission / appData.budgetMonth)
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
console.log(appData);
appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.expensesMonth);

if (appData.getTargetMonth() < 0){
  console.log('Цель не будет достигнута');
} else {
  console.log('Цель будет достигнута за: ' 
+ appData.getTargetMonth());
}

appData.getStatusIncome();

for (let key in appData) {
  console.log(`Наша программа включает в себя данные:  ${key} ${appData[key]}`);
}
