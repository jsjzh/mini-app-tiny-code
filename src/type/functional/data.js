export const carData = [
  { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
  { name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false },
  { name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false },
  { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
  { name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true },
  { name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false }
];

export const postData = {
  result: "SUCCESS",
  interfaceVersion: "1.0.3",
  requested: "10/17/2013 15:31:20",
  lastUpdated: "10/16/2013 10:52:39",
  tasks: [
    {
      id: 104,
      complete: false,
      priority: "high",
      dueDate: "2013-11-29",
      username: "Scott",
      title: "Do something",
      created: "9/22/2013"
    },
    {
      id: 105,
      complete: false,
      priority: "medium",
      dueDate: "2013-11-22",
      username: "Lena",
      title: "Do something else",
      created: "9/22/2013"
    },
    {
      id: 107,
      complete: true,
      priority: "high",
      dueDate: "2013-11-22",
      username: "Mike",
      title: "Fix the foo",
      created: "9/22/2013"
    },
    {
      id: 108,
      complete: false,
      priority: "low",
      dueDate: "2013-11-15",
      username: "Punam",
      title: "Adjust the bar",
      created: "9/25/2013"
    },
    {
      id: 110,
      complete: false,
      priority: "medium",
      dueDate: "2013-11-15",
      username: "Scott",
      title: "Rename everything",
      created: "10/2/2013"
    },
    {
      id: 112,
      complete: true,
      priority: "high",
      dueDate: "2013-11-27",
      username: "Lena",
      title: "Alter all quuxes",
      created: "10/5/2013"
    }
  ]
};
