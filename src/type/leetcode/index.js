/*
 * @Author: jsjzh
 * @Email: kimimi_king@163.com
 * @LastEditors: jsjzh
 * @Date: 2019-03-08 09:45:09
 * @LastEditTime: 2019-03-14 09:40:34
 * @Description
 *  果然每天的生活都需要点算法题调剂调剂，每天都是重复的业务代码太无趣了，我渴望一点需要动脑子的东西，遂就有了这个小项目
 *  写上来的代码都是可以通过 leedcode 的测试的，只不过嘛，用时和内存消耗就没有那么完美了，但我会对不满意的题目重写一遍，开拓新的思路，撒花
 */

/**
 * CLEAR
 * 给出一个目标数字，查询数组中是否有和为目标的两个数字
 * @param {Array} nums 待查询数组
 * @param {Number} target 目标数字
 */
let twoSum = function(nums, target) {
  for (let index = 0; index < nums.length; index++) {
    const number = nums[index]
    let other = target - number
    let _index = nums.indexOf(other)
    if (_index !== -1 && _index !== index) {
      return [index, _index]
    } else {
      continue
    }
  }
  return []
}

/**
 * TODO 需要完善
 * 将一个数字反转，若反转后超出 [-2^31, 2^31-1] 范围，则返回 0
 * @param {Number} x 数字
 *
 * Tip
 * -Math.pow(2, 31) === -2147483648
 * Math.pow(2, 31) - 1 === 2147483647
 *
 * 官方解题思路
 * 比较神奇的一个想法，出栈入栈，但因为没有辅助函数，所以可以用 num % 10 来实现
 */
let reverse = function(x) {
  if (x === 0) return 0
  let flag = false
  if (x > 0) flag = true
  x = Math.abs(x)
    .toString()
    .split('')
    .reverse()
    .join('')
  if (flag) x = +x
  else x = -+x

  if (x < -2147483648 || x > 2147483647) return 0
  else return x
}

/**
 * TODO 需要完善
 * 判断一个整数是否是回文数
 * @param {Number} x 数字
 *
 * 官方解题思路
 * 可以判断数字的前一半和后一半是否相同
 */
let isPalindrome = function(x) {
  if (x < 0) return false
  if (x === 0) return true
  let y = +x
    .toString()
    .split('')
    .reverse()
    .join('')
  return y === x
}

const roman = { CM: 900, CD: 400, XC: 90, XL: 40, IX: 9, IV: 4, M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 }
/**
 * CLEAR
 * 罗马数字转整数
 * 给定一个罗马数字，将其转换成整数，输入确保在 1 至 3999 的范围内
 * @param {String} s
 * @return {Number}
 */
let romanToInt = function(s) {
  let number = 0

  for (const key in roman) {
    if (roman.hasOwnProperty(key)) {
      const count = roman[key]
      let reg = new RegExp(key, 'g')
      s = s.replace(reg, function() {
        number += count
        return ''
      })
    }
  }
  if (1 < number < 3999) return number
  else throw new Error('error')
}

/**
 * CLEAR
 * 查找字符串数组中的最长公共前缀
 * 如果不存在公共前缀则返回空字符串 ""
 * 所有输入只包含小写字母 a-z
 * @param {String[]} strs
 * @return {String}
 */
let longestCommonPrefix = function(strs) {
  let rtStr = ''
  if (!strs.length) return rtStr
  let target = strs[0]
  let behind = strs.splice(1)
  let len = target.length
  for (let i = 0; i < len; i++) {
    let char = target[i]
    if (behind.every(item => item[i] === char)) {
      rtStr += char
    } else {
      break
    }
  }
  return rtStr
}

/**
 * CLEAR
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效
 * 有效字符串需满足：
 *  左括号必须用相同类型的右括号闭合
 *  左括号必须以正确的顺序闭合
 *  注意空字符串可被认为是有效字符串
 * @param {String} s
 * @return {Boolean}
 */
let isValid = function(s) {
  if (s.length & 1) return false
  let old
  do {
    old = s
    s = s.replace(/(\[\]|\(\)|\{\})/g, '')
  } while (old.length !== s.length)
  return s.length === 0
}

/**
 * TODO 待完成
 * 将两个有序链表合并为一个新的有序链表并返回y
 * 新链表是通过拼接给定的两个链表的所有节点组成的
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
/**
 * Definition for singly-linked list.
 */

function ListNode(val) {
  this.val = val
  this.next = null
}

ListNode.prototype.push = function(num) {
  let newNode = new ListNode(num)
  let currNode = this
  if (currNode.next) currNode = currNode.next
  currNode.next = newNode
  return this
}

let mergeTwoLists = function(l1, l2) {
  console.log(arguments)
}

let L = new ListNode(1).push(2).push(4)
let R = new ListNode(1).push(3).push(4)

mergeTwoLists(L, R)
