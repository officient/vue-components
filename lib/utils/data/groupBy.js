/**
 * groups an array of objects into an object by `key`
 * @param  {Array}  xs  an array of objects
 * @param  {String} key the property to group by
 * @return {Object}     grouped collection
 *
 * @example
 * groupBy([
 *  { type: 'fruit', name: 'apple' },
 *  { type: 'fruit', name: 'tomato' },
 *  { type: 'meat', name: 'chicken' },
 *  { type: 'meat', name: 'cow' },
 * ])
 * // =>
 * {
 *   fruit: [
 *     { type: 'fruit', name: 'apple' },
 *     { type: 'fruit', name: 'tomato' },
 *   ],
 *   meat: [
 *     { type: 'meat', name: 'chicken' },
 *     { type: 'meat', name: 'cow' },
 *   ],
 * }
 */
export default function groupBy (xs, key) {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x)
    return rv
  }, {})
}
