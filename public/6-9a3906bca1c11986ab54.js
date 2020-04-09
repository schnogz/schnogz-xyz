;(window.webpackJsonp = window.webpackJsonp || []).push([
  [6],
  {
    '/9aa': function (t, i, e) {
      var n = e('NykK'),
        s = e('ExA7')
      t.exports = function (t) {
        return 'symbol' == typeof t || (s(t) && '[object Symbol]' == n(t))
      }
    },
    AP2z: function (t, i, e) {
      e('a1Th'), e('h7Nl'), e('Btvt')
      var n = e('nmnc'),
        s = Object.prototype,
        a = s.hasOwnProperty,
        r = s.toString,
        h = n ? n.toStringTag : void 0
      t.exports = function (t) {
        var i = a.call(t, h),
          e = t[h]
        try {
          t[h] = void 0
          var n = !0
        } catch (o) {}
        var s = r.call(t)
        return n && (i ? (t[h] = e) : delete t[h]), s
      }
    },
    ExA7: function (t, i) {
      t.exports = function (t) {
        return null != t && 'object' == typeof t
      }
    },
    GoyQ: function (t, i) {
      t.exports = function (t) {
        var i = typeof t
        return null != t && ('object' == i || 'function' == i)
      }
    },
    Jbec: function (t, i, e) {
      'use strict'
      e.r(i),
        e.d(i, 'default', function () {
          return l
        })
      e('I5cv'), e('a1Th'), e('VRzm'), e('Btvt')
      var n = e('sEfC'),
        s = e.n(n),
        a = e('q1tI'),
        r = e.n(a),
        h = e('vOnD'),
        o = e('upwP')
      function c(t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          )
        return t
      }
      var u,
        d = h.c.div.withConfig({
          displayName: 'spirograph__Wrapper',
          componentId: 'sc-3j4yr4-0',
        })([
          'position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100vh;overflow:hidden;',
        ]),
        g = h.c.div.withConfig({
          displayName: 'spirograph__CanvasWrapper',
          componentId: 'sc-3j4yr4-1',
        })([
          'position:absolute;width:100%;height:100%;display:flex;justify-content:center;align-items:center;',
        ]),
        l = (function (t) {
          var i, e
          ;(e = t),
            ((i = a).prototype = Object.create(e.prototype)),
            (i.prototype.constructor = i),
            (i.__proto__ = e)
          var n
          n = a
          function a(i) {
            var e
            return (
              ((e = t.call(this, i) || this).delay = function (t) {
                return new Promise(function (i) {
                  return setTimeout(i, t)
                })
              }),
              (e.draw = e.draw.bind(c(e))),
              (e.hasUnmounted = !1),
              (e._resizeHandler = s()(function () {
                window.innerWidth !== u &&
                  ((e.canvasSize = Math.min(
                    1e3,
                    window.innerWidth,
                    window.innerHeight
                  )),
                  (e.movingCanvas.width = e.canvasSize),
                  (e.movingCanvas.height = e.canvasSize),
                  (e.plottingCanvas.width = e.canvasSize),
                  (e.plottingCanvas.height = e.canvasSize),
                  e.newSpirograph(),
                  (u = window.innerWidth))
              }, 500)),
              e
            )
          }
          var h = a.prototype
          return (
            (h.componentDidMount = function () {
              window.addEventListener('resize', this._resizeHandler),
                (u = window.innerWidth),
                (this.mctx = this.movingCanvas.getContext('2d')),
                (this.pctx = this.plottingCanvas.getContext('2d')),
                (this.canvasSize = Math.min(
                  1e3,
                  window.innerWidth,
                  window.innerHeight
                )),
                (this.movingCanvas.width = this.canvasSize),
                (this.movingCanvas.height = this.canvasSize),
                (this.plottingCanvas.width = this.canvasSize),
                (this.plottingCanvas.height = this.canvasSize),
                this.newSpirograph(),
                window.requestAnimationFrame(this.draw)
            }),
            (h.componentWillUnmount = function () {
              window.removeEventListener('resize', this._resizeHandler),
                (this.hasUnmounted = !0)
            }),
            (h.shouldComponentUpdate = function () {
              return !0
            }),
            (h.reduce = function (t, i) {
              var e = function (t, i) {
                return i ? e(i, t % i) : t
              }
              return [t / (e = e(t, i)), i / e]
            }),
            (h.newSpirograph = function () {
              ;(this.size = Math.min(
                498,
                Math.min(window.innerWidth / 2.8, window.innerHeight / 2.8)
              )),
                (this.dotSize = 7),
                (this.spiroColor = o.a.blue700),
                (this.circleColor = o.a.grey400),
                (this.speed = this.props.speed),
                (this.mctx.lineWidth = 1.2),
                (this.pctx.lineWidth = 1.2),
                this.mctx.clearRect(
                  0,
                  0,
                  this.movingCanvas.width,
                  this.movingCanvas.height
                ),
                this.pctx.clearRect(
                  0,
                  0,
                  this.movingCanvas.width,
                  this.movingCanvas.height
                )
              var t = Math.floor(97 * Math.random()) + 3,
                i =
                  Math.floor(Math.random() * (t / 2 - t / 10)) +
                  Math.floor(t / 10 + 1)
              ;(this.N = this.reduce(i, t)[0]),
                (this.M = this.reduce(i, t)[1]),
                (this.gearRadius = this.N / this.M),
                (this.f = 0.7 * Math.random() + 0.2),
                (this.angle = 0),
                (this.centerX = this.movingCanvas.width / 2),
                (this.centerY = this.movingCanvas.height / 2),
                (this.gearX =
                  (1 - this.gearRadius) * Math.cos(this.angle) * this.size),
                (this.gearY =
                  (1 - this.gearRadius) * Math.sin(this.angle) * this.size),
                (this.spiroX =
                  this.centerX +
                  ((1 - this.gearRadius) * Math.cos(this.angle) +
                    this.f *
                      this.gearRadius *
                      Math.cos((1 / this.gearRadius - 1) * this.angle)) *
                    this.size),
                (this.spiroY =
                  this.centerY +
                  ((1 - this.gearRadius) * Math.sin(this.angle) -
                    this.f *
                      this.gearRadius *
                      Math.sin((1 / this.gearRadius - 1) * this.angle)) *
                    this.size),
                (this.mctx.strokeStyle = this.circleColor),
                (this.pctx.strokeStyle = o.a.grey900),
                this.pctx.beginPath(),
                this.pctx.arc(
                  this.centerX,
                  this.centerY,
                  this.size,
                  0,
                  2 * Math.PI
                ),
                this.pctx.stroke(),
                (this.pctx.strokeStyle = this.spiroColor)
            }),
            (h.draw = function () {
              var t = this
              if (!1 === this.hasUnmounted) {
                if (
                  (this.mctx.clearRect(
                    0,
                    0,
                    this.movingCanvas.width,
                    this.movingCanvas.height
                  ),
                  this.mctx.beginPath(),
                  this.mctx.arc(
                    this.centerX + this.gearX,
                    this.centerY + this.gearY,
                    this.gearRadius * this.size,
                    0,
                    2 * Math.PI
                  ),
                  this.mctx.stroke(),
                  this.mctx.beginPath(),
                  this.mctx.arc(
                    this.centerX + this.gearX,
                    this.centerY + this.gearY,
                    this.f * this.gearRadius * this.size,
                    0,
                    2 * Math.PI
                  ),
                  this.mctx.stroke(),
                  this.mctx.beginPath(),
                  this.mctx.arc(
                    this.centerX +
                      ((1 - this.gearRadius) * Math.cos(this.angle) +
                        this.f *
                          this.gearRadius *
                          Math.cos((1 / this.gearRadius - 1) * this.angle)) *
                        this.size,
                    this.centerY +
                      ((1 - this.gearRadius) * Math.sin(this.angle) -
                        this.f *
                          this.gearRadius *
                          Math.sin((1 / this.gearRadius - 1) * this.angle)) *
                        this.size,
                    this.dotSize,
                    0,
                    2 * Math.PI
                  ),
                  this.mctx.stroke(),
                  !(this.angle - this.speed < 2 * this.N * Math.PI))
                )
                  return (
                    this.mctx.clearRect(
                      0,
                      0,
                      this.movingCanvas.width,
                      this.movingCanvas.height
                    ),
                    void this.delay(3e3)
                      .then(function () {
                        return t.newSpirograph()
                      })
                      .then(function () {
                        return window.requestAnimationFrame(t.draw)
                      })
                  )
                Math.random() >= 0.9 &&
                  (this.pctx.strokeStyle =
                    '#' + Math.floor(16777215 * Math.random()).toString(16)),
                  this.pctx.beginPath(),
                  this.pctx.moveTo(this.spiroX, this.spiroY),
                  (this.spiroX =
                    this.centerX +
                    ((1 - this.gearRadius) * Math.cos(this.angle) +
                      this.f *
                        this.gearRadius *
                        Math.cos((1 / this.gearRadius - 1) * this.angle)) *
                      this.size),
                  (this.spiroY =
                    this.centerY +
                    ((1 - this.gearRadius) * Math.sin(this.angle) -
                      this.f *
                        this.gearRadius *
                        Math.sin((1 / this.gearRadius - 1) * this.angle)) *
                      this.size),
                  this.pctx.lineTo(this.spiroX, this.spiroY),
                  this.pctx.stroke(),
                  (this.gearX =
                    (1 - this.gearRadius) * Math.cos(this.angle) * this.size),
                  (this.gearY =
                    (1 - this.gearRadius) * Math.sin(this.angle) * this.size),
                  (this.angle += this.speed),
                  window.requestAnimationFrame(this.draw)
              }
            }),
            (h.render = function () {
              var t = this
              return r.a.createElement(
                d,
                null,
                r.a.createElement(
                  g,
                  null,
                  r.a.createElement('canvas', {
                    ref: function (i) {
                      return (t.plottingCanvas = i)
                    },
                  })
                ),
                r.a.createElement(
                  g,
                  null,
                  r.a.createElement('canvas', {
                    ref: function (i) {
                      return (t.movingCanvas = i)
                    },
                  })
                )
              )
            }),
            a
          )
        })(r.a.Component)
    },
    KfNM: function (t, i, e) {
      e('a1Th'), e('h7Nl'), e('Btvt')
      var n = Object.prototype.toString
      t.exports = function (t) {
        return n.call(t)
      }
    },
    Kz5y: function (t, i, e) {
      var n = e('WFqU'),
        s = 'object' == typeof self && self && self.Object === Object && self,
        a = n || s || Function('return this')()
      t.exports = a
    },
    NykK: function (t, i, e) {
      var n = e('nmnc'),
        s = e('AP2z'),
        a = e('KfNM'),
        r = n ? n.toStringTag : void 0
      t.exports = function (t) {
        return null == t
          ? void 0 === t
            ? '[object Undefined]'
            : '[object Null]'
          : r && r in Object(t)
          ? s(t)
          : a(t)
      }
    },
    QIyF: function (t, i, e) {
      var n = e('Kz5y')
      t.exports = function () {
        return n.Date.now()
      }
    },
    WFqU: function (t, i, e) {
      ;(function (i) {
        var e = 'object' == typeof i && i && i.Object === Object && i
        t.exports = e
      }.call(this, e('yLpj')))
    },
    nmnc: function (t, i, e) {
      var n = e('Kz5y').Symbol
      t.exports = n
    },
    sEfC: function (t, i, e) {
      var n = e('GoyQ'),
        s = e('QIyF'),
        a = e('tLB3'),
        r = Math.max,
        h = Math.min
      t.exports = function (t, i, e) {
        var o,
          c,
          u,
          d,
          g,
          l,
          p = 0,
          v = !1,
          f = !1,
          m = !0
        if ('function' != typeof t) throw new TypeError('Expected a function')
        function w(i) {
          var e = o,
            n = c
          return (o = c = void 0), (p = i), (d = t.apply(n, e))
        }
        function x(t) {
          return (p = t), (g = setTimeout(M, i)), v ? w(t) : d
        }
        function y(t) {
          var e = t - l
          return void 0 === l || e >= i || e < 0 || (f && t - p >= u)
        }
        function M() {
          var t = s()
          if (y(t)) return z(t)
          g = setTimeout(
            M,
            (function (t) {
              var e = i - (t - l)
              return f ? h(e, u - (t - p)) : e
            })(t)
          )
        }
        function z(t) {
          return (g = void 0), m && o ? w(t) : ((o = c = void 0), d)
        }
        function b() {
          var t = s(),
            e = y(t)
          if (((o = arguments), (c = this), (l = t), e)) {
            if (void 0 === g) return x(l)
            if (f) return clearTimeout(g), (g = setTimeout(M, i)), w(l)
          }
          return void 0 === g && (g = setTimeout(M, i)), d
        }
        return (
          (i = a(i) || 0),
          n(e) &&
            ((v = !!e.leading),
            (u = (f = 'maxWait' in e) ? r(a(e.maxWait) || 0, i) : u),
            (m = 'trailing' in e ? !!e.trailing : m)),
          (b.cancel = function () {
            void 0 !== g && clearTimeout(g), (p = 0), (o = l = c = g = void 0)
          }),
          (b.flush = function () {
            return void 0 === g ? d : z(s())
          }),
          b
        )
      }
    },
    tLB3: function (t, i, e) {
      e('pIFo')
      var n = e('GoyQ'),
        s = e('/9aa'),
        a = /^\s+|\s+$/g,
        r = /^[-+]0x[0-9a-f]+$/i,
        h = /^0b[01]+$/i,
        o = /^0o[0-7]+$/i,
        c = parseInt
      t.exports = function (t) {
        if ('number' == typeof t) return t
        if (s(t)) return NaN
        if (n(t)) {
          var i = 'function' == typeof t.valueOf ? t.valueOf() : t
          t = n(i) ? i + '' : i
        }
        if ('string' != typeof t) return 0 === t ? t : +t
        t = t.replace(a, '')
        var e = h.test(t)
        return e || o.test(t) ? c(t.slice(2), e ? 2 : 8) : r.test(t) ? NaN : +t
      }
    },
  },
])
//# sourceMappingURL=6-9a3906bca1c11986ab54.js.map
