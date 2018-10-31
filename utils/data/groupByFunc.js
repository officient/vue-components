/**
 * groups an array of objects into an object by `func`
 * @param  {Array}     xs   an array of any type
 * @param  {Function}  func function to execute on each iteration
 * @return {Object}         grouped collection
 *
 * @example
 * groupBy([6.1, 4.2, 6.3], Math.floor)
 * // => { '4': [4.2], '6': [6.1, 6.3] }
 */
export default function groupByFunc (xs, func) {
  return xs.reduce((rv, x) => {
    (rv[func(x)] = rv[func(x)] || []).push(x)
    return rv
  }, {})
}
