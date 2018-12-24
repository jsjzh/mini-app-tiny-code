import * as R from "ramda";

const CARS = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false }
];

let words = R.split(" ");

console.log(words("Jingle bells Batman smells"));

let sentences = R.map(words);

console.log(sentences(["Jingle bells Batman smells", "Robin laid an egg"]));

let hasWord_q = R.test(/q/i);

let filterQs = R.filter(hasWord_q);

console.log(filterQs(['quick', 'camels', 'quarry', 'over', 'quails']));

let _keepHighest = function(x, y) { return x >= y ? x : y };

let max = R.reduce(_keepHighest, -Infinity);

console.log(max([323, 523, 554, 123, 5234]));

console.log(R.slice(1)(3)(['a', 'b', 'c']));

console.log(R.take(2)(['a', 'b', 'c']));