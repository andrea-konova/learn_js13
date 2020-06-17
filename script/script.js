'use strict';

// Проверяет значение на число
const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const start = function() {

  let money = prompt('Ваш месячный доход?', '50000');
  
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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 1500000,
  period: 12,
  budget: start(),
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function() {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      while (itemIncome === null || itemIncome.trim() === '' || !isNaN(itemIncome)) {
        itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      }

      let costIncome;
      do {
        costIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
      }
      while(!isNumber(costIncome)) 
      
      appData.income[itemIncome] = +costIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Одежда, ресторан');

      while (addExpenses === null || addExpenses.trim() === '' || !isNaN(addExpenses)) {
        addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Одежда, ресторан');
      }

      appData.addExpenses = addExpenses.toLowerCase().split(', ');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');

      for (let i = 0; i < 2; i++) {

        let nameExpenses,
          costExpenses;

        nameExpenses = prompt('Введите обязательную статью расходов?', 'Аренда');
        while (nameExpenses === null || nameExpenses.trim() === '' || !isNaN(nameExpenses)) {
          nameExpenses = prompt('Введите обязательную статью расходов?', 'Аренда');
        }
        
        do {
          costExpenses = prompt('Во сколько это обойдется?', '12000');
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
  },
  getInfoDeposit: function() {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент', '10');
      }
      while(!isNumber(appData.percentDeposit)) 

      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      }
      while(!isNumber(appData.moneyDeposit)) 
      
    }
  },
  calcSaveMoney: function() {
    return appData.budgetMonth * appData.period;
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
+ appData.getTargetMonth() + ' месяцев');
}

appData.getStatusIncome();

for (let key in appData) {
  console.log(`Наша программа включает в себя данные:  ${key} ${appData[key]}`);
}

appData.getInfoDeposit();
console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());

let str = appData.addExpenses.map(word => word[0].toUpperCase() + word.substring(1)).join(' ');

console.log(String(str));