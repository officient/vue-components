export function getCoordsOfElem (elem) {
  var box = elem.getBoundingClientRect();
  var top  = box.top
  var left = box.left
  return {
    top: Math.round(top),
    left: Math.round(left)
  }
}
