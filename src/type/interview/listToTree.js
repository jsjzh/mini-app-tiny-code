const oldArr = [{
  '1_class': '工具',
  '2_class': '备忘录',
  '1_id': 1,
  '2_id': 2
}, {
  '1_class': '教育',
  '2_class': '学历教育',
  '3_class': '中等',
  '1_id': 3,
  '2_id': 4,
  '3_id': 6
}, {
  '1_class': '教育',
  '2_class': '学历教育',
  '3_class': '高等',
  '1_id': 3,
  '2_id': 4,
  '3_id': 5
}, {
  '1_class': '教育',
  '2_class': '成人教育',
  '1_id': 3,
  '2_id': 7
}];

function listToTree(list) {
  console.log(list);
  let temp = [];
  list.forEach(element => {
    for (const key in element) {
      if (element.hasOwnProperty(key)) {
        const value = element[key];

        let template = {
          value: "",
          label: "",
          children: []
        };
        temp.push(template)
      }
    }
  });
  console.log(temp);
}

listToTree(oldArr);

// let result = [{
//   value: 1,
//   label: '工具',
//   children: [{
//     value: 2,
//     label: '备忘录',
//     children: []
//   }]
// },
// {
//   value: 3,
//   label: '教育',
//   children: [{
//       value: 4,
//       label: '学历教育',
//       children: [{
//           value: 6,
//           label: '中等',
//           children: []
//         },
//         {
//           value: 5,
//           label: '高等',
//           children: []
//         }
//       ]
//     },
//     {
//       value: 7,
//       label: '成人教育',
//       children: []
//     }
//   ]
// }
// ];