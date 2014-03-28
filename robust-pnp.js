"use strict"

var orient = require("robust-orientation")

module.exports = robustPointInPolygon

function robustPointInPolygon(vs, point) {
  var x = point[0]
  var y = point[1]
  var n = vs.length
  var inside = 1
  for (var i = 0, j = n - 1; i < n; j = i++) {
    var a = vs[i]
    var b = vs[j]
    var yi = a[1]
    var yj = b[1]
    if(yi > yj) {
      if(yj < y && y <= yi) {
        var s = orient(a, b, point)
        if(s === 0) {
          return 0
        } else {
          inside ^= (s > 0)|0
        }
      }
    } else if(yj > yi) {
      if(yi <= y && y < yj) {
        var s = orient(a, b, point)
        if(s === 0) {
          return 0
        } else {
          inside ^= (s < 0)|0
        }
      }
    } else if(y === yi) {
      var xi = a[0]
      var xj = b[0]
      if(xi < xj) {
        if(x < xi) {
          inside ^= 1
        } else if(x <= xj) {
          return 0
        }
      } else if(xi > xj) {
        if(x < xj) {
          inside ^= 1
        } else if(x <= xi) {
          return 0
        }
      } else if(x === xi) {
        return 0
      }
    }
  }
  return 2 * inside - 1
}