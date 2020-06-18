'use strict';

const allBooks = document.querySelectorAll('.books'),
  book = document.querySelectorAll('.book'),
  body = document.getElementsByTagName('body'),
  bookTitle = document.getElementsByTagName('h2'),
  advertising = document.querySelector('.adv'),
  list = document.getElementsByTagName('ul'),
  listItems = document.getElementsByTagName('li'),
  newListItem = document.createElement('li');

console.log(allBooks);
console.log(book);
console.log(body);
console.log(bookTitle);
console.log(list);
console.log(listItems);
console.log(newListItem);

allBooks[0].prepend(book[1]);
allBooks[0].append(book[2]);
book[3].before(book[4]);

body[0].style.backgroundImage = "url('image/you-dont-know-js.jpg')";

bookTitle[2].textContent = "Книга 3. this и Прототипы Объектов";
bookTitle[2].style.color = "darkkhaki";

advertising.remove();

listItems[12].before(listItems[14]);
listItems[16].before(listItems[8]);
listItems[8].after(listItems[12]);
listItems[9].after(listItems[12]);


listItems[37].after(listItems[45]);
listItems[43].before(listItems[39]);
listItems[45].before(listItems[41]);

newListItem.textContent = "Глава 8: За пределами ES6";
list[5].append(newListItem); 
listItems[57].after(listItems[56]);