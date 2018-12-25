import * as R from "ramda";
import $ from "jquery";

const { curry, compose } = R;

const CARS = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false }
];

let Impure = {
  getJSON: curry(function(callback, url) {
    $.getJSON(url, callback)
  }),
  setHtml: curry(function(sel, html) {
    $(sel).html(html);
  })
}

let url = function(target) { return "/static/data/cat.json?target=" + target }

$(document).ready(function() {

  $.getJSON("/static/data/cat.json", function({ data }) {
    console.log(data);
  })

});