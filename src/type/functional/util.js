import * as _R from "ramda"
import _Task from "data.task"

const { curry: _curry, compose: _compose, map: _map } = _R

const _trace = _curry(function(tag, x) {
  console.log(tag, x)
  return x
})

const _chain = _curry(function(f, m) { return m.chain(f) })
const _log = _curry(function(target, data) { console.log(target, data) })
const _join = function(x) { return x.join() }


const _identity = function(x) { return x.__value }
const _Identity = function(x) { this.__value = x }
_Identity.of = function(x) { return new _Identity(x) }
_Identity.prototype.map = function(f) { return _Identity.of(f(this.__value)) }
_Identity.prototype.inspect = function() { return "Identity(" + inspect(this.__value) + ")" }
_Identity.prototype.ap = function(other) { return other.map(this.__value) }

const _maybe = _curry(function(x, f, m) { return m.isNothing() ? x : f(m.__value) })
const _Maybe = function(x) { this.__value = x }
_Maybe.of = function(x) { return new _Maybe(x) }
_Maybe.prototype.isNothing = function(f) { return (this.__value == null) }
_Maybe.prototype.map = function(f) { return this.isNothing() ? _Maybe.of(null) : _Maybe.of(f(this.__value)) }
_Maybe.prototype.chain = function(f) { return this.map(f).join() }
_Maybe.prototype.ap = function(other) { return this.isNothing() ? _Maybe.of(null) : other.map(this.__value) }
_Maybe.prototype.join = function() { return this.isNothing() ? _Maybe.of(null) : this.__value }
_Maybe.prototype.inspect = function() { return "Maybe(" + inspect(this.__value) + ")" }

const _either = _curry(function(f, g, e) {
  if (e.constructor === _Left) return f(e.__value)
  if (e.constructor === _Right) return g(e.__value)
})

const _Either = function() {}
_Either.of = function(x) { return new _Right(x) }

const _Left = function(x) { this.__value = x }
_Left.of = function(x) { return new _Left(x) }
_Left.prototype.map = function(f) { return this }
_Left.prototype.ap = function(other) { return this }
_Left.prototype.join = function() { return this }
_Left.prototype.chain = function() { return this }
_Left.prototype.inspect = function() { return "Left(" + inspect(this.__value) + ")" }

const _Right = function(x) { this.__value = x }
_Right.of = function(x) { return new _Right(x) }
_Right.prototype.map = function(f) { return _Right.of(f(this.__value)) }
_Right.prototype.join = function() { return this.__value }
_Right.prototype.chain = function(f) { return f(this.__value) }
_Right.prototype.ap = function(other) { return this.chain(function(f) { return other.map(f) }) }
_Right.prototype.inspect = function() { return "Right(" + inspect(this.__value) + ")" }

const _unsafePerformIO = function(functor) { return functor.unsafePerformIO() }
const _IO = function(f) { this.unsafePerformIO = f }
_IO.of = function(x) { return new _IO(function() { return x }) }
_IO.prototype.map = function(f) { return new _IO(_compose(f, this.unsafePerformIO)) }
_IO.prototype.join = function() { return this.unsafePerformIO() }
_IO.prototype.chain = function(f) { return this.map(f).join() }
_IO.prototype.ap = function(a) { return this.chain(function(f) { return a.map(f) }) }
_IO.prototype.inspect = function() { return "IO(" + inspect(this.unsafePerformIO) + ")" }

export const R = _R
export const Task = _Task

export const curry = _curry
export const compose = _compose
export const map = _map
export const chain = _chain
export const join = _join
export const log = _log

export const trace = _trace

export const identity = _identity
export const Identity = _Identity

export const maybe = _maybe
export const Maybe = _Maybe

export const either = _either
export const Either = _Either
export const Left = _Left
export const Right = _Right

export const unsafePerformIO = _unsafePerformIO
export const IO = _IO

// use
// import {
//   R,
//   Task,
//   curry,
//   compose,
//   map,
//   chain,
//   join,
//   trace,
//   identity,
//   Identity,
//   maybe,
//   Maybe,
//   either,
//   Either,
//   Left,
//   Right,
//   unsafePerformIO,
//   IO
// } from "./util"