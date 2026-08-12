var gr = {}, q = {};
q.byteLength = Xr;
q.toByteArray = Wr;
q.fromByteArray = Yr;
var M = [], _ = [], Vr = typeof Uint8Array < "u" ? Uint8Array : Array, rr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var O = 0, Pr = rr.length; O < Pr; ++O)
  M[O] = rr[O], _[rr.charCodeAt(O)] = O;
_[45] = 62;
_[95] = 63;
function Er(a) {
  var u = a.length;
  if (u % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var h = a.indexOf("=");
  h === -1 && (h = u);
  var w = h === u ? 0 : 4 - h % 4;
  return [h, w];
}
function Xr(a) {
  var u = Er(a), h = u[0], w = u[1];
  return (h + w) * 3 / 4 - w;
}
function zr(a, u, h) {
  return (u + h) * 3 / 4 - h;
}
function Wr(a) {
  var u, h = Er(a), w = h[0], l = h[1], c = new Vr(zr(a, w, l)), p = 0, i = l > 0 ? w - 4 : w, y;
  for (y = 0; y < i; y += 4)
    u = _[a.charCodeAt(y)] << 18 | _[a.charCodeAt(y + 1)] << 12 | _[a.charCodeAt(y + 2)] << 6 | _[a.charCodeAt(y + 3)], c[p++] = u >> 16 & 255, c[p++] = u >> 8 & 255, c[p++] = u & 255;
  return l === 2 && (u = _[a.charCodeAt(y)] << 2 | _[a.charCodeAt(y + 1)] >> 4, c[p++] = u & 255), l === 1 && (u = _[a.charCodeAt(y)] << 10 | _[a.charCodeAt(y + 1)] << 4 | _[a.charCodeAt(y + 2)] >> 2, c[p++] = u >> 8 & 255, c[p++] = u & 255), c;
}
function Hr(a) {
  return M[a >> 18 & 63] + M[a >> 12 & 63] + M[a >> 6 & 63] + M[a & 63];
}
function Jr(a, u, h) {
  for (var w, l = [], c = u; c < h; c += 3)
    w = (a[c] << 16 & 16711680) + (a[c + 1] << 8 & 65280) + (a[c + 2] & 255), l.push(Hr(w));
  return l.join("");
}
function Yr(a) {
  for (var u, h = a.length, w = h % 3, l = [], c = 16383, p = 0, i = h - w; p < i; p += c)
    l.push(Jr(a, p, p + c > i ? i : p + c));
  return w === 1 ? (u = a[h - 1], l.push(
    M[u >> 2] + M[u << 4 & 63] + "=="
  )) : w === 2 && (u = (a[h - 2] << 8) + a[h - 1], l.push(
    M[u >> 10] + M[u >> 4 & 63] + M[u << 2 & 63] + "="
  )), l.join("");
}
var ir = {};
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
ir.read = function(a, u, h, w, l) {
  var c, p, i = l * 8 - w - 1, y = (1 << i) - 1, E = y >> 1, x = -7, g = h ? l - 1 : 0, A = h ? -1 : 1, F = a[u + g];
  for (g += A, c = F & (1 << -x) - 1, F >>= -x, x += i; x > 0; c = c * 256 + a[u + g], g += A, x -= 8)
    ;
  for (p = c & (1 << -x) - 1, c >>= -x, x += w; x > 0; p = p * 256 + a[u + g], g += A, x -= 8)
    ;
  if (c === 0)
    c = 1 - E;
  else {
    if (c === y)
      return p ? NaN : (F ? -1 : 1) * (1 / 0);
    p = p + Math.pow(2, w), c = c - E;
  }
  return (F ? -1 : 1) * p * Math.pow(2, c - w);
};
ir.write = function(a, u, h, w, l, c) {
  var p, i, y, E = c * 8 - l - 1, x = (1 << E) - 1, g = x >> 1, A = l === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, F = w ? 0 : c - 1, C = w ? 1 : -1, k = u < 0 || u === 0 && 1 / u < 0 ? 1 : 0;
  for (u = Math.abs(u), isNaN(u) || u === 1 / 0 ? (i = isNaN(u) ? 1 : 0, p = x) : (p = Math.floor(Math.log(u) / Math.LN2), u * (y = Math.pow(2, -p)) < 1 && (p--, y *= 2), p + g >= 1 ? u += A / y : u += A * Math.pow(2, 1 - g), u * y >= 2 && (p++, y /= 2), p + g >= x ? (i = 0, p = x) : p + g >= 1 ? (i = (u * y - 1) * Math.pow(2, l), p = p + g) : (i = u * Math.pow(2, g - 1) * Math.pow(2, l), p = 0)); l >= 8; a[h + F] = i & 255, F += C, i /= 256, l -= 8)
    ;
  for (p = p << l | i, E += l; E > 0; a[h + F] = p & 255, F += C, p /= 256, E -= 8)
    ;
  a[h + F - C] |= k * 128;
};
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
(function(a) {
  var u = q, h = ir, w = typeof Symbol == "function" && typeof Symbol.for == "function" ? Symbol.for("nodejs.util.inspect.custom") : null;
  a.Buffer = i, a.SlowBuffer = N, a.INSPECT_MAX_BYTES = 50;
  var l = 2147483647;
  a.kMaxLength = l, i.TYPED_ARRAY_SUPPORT = c(), !i.TYPED_ARRAY_SUPPORT && typeof console < "u" && typeof console.error == "function" && console.error(
    "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
  );
  function c() {
    try {
      var e = new Uint8Array(1), r = { foo: function() {
        return 42;
      } };
      return Object.setPrototypeOf(r, Uint8Array.prototype), Object.setPrototypeOf(e, r), e.foo() === 42;
    } catch {
      return !1;
    }
  }
  Object.defineProperty(i.prototype, "parent", {
    enumerable: !0,
    get: function() {
      if (i.isBuffer(this))
        return this.buffer;
    }
  }), Object.defineProperty(i.prototype, "offset", {
    enumerable: !0,
    get: function() {
      if (i.isBuffer(this))
        return this.byteOffset;
    }
  });
  function p(e) {
    if (e > l)
      throw new RangeError('The value "' + e + '" is invalid for option "size"');
    var r = new Uint8Array(e);
    return Object.setPrototypeOf(r, i.prototype), r;
  }
  function i(e, r, t) {
    if (typeof e == "number") {
      if (typeof r == "string")
        throw new TypeError(
          'The "string" argument must be of type string. Received type number'
        );
      return g(e);
    }
    return y(e, r, t);
  }
  i.poolSize = 8192;
  function y(e, r, t) {
    if (typeof e == "string")
      return A(e, r);
    if (ArrayBuffer.isView(e))
      return C(e);
    if (e == null)
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e
      );
    if (L(e, ArrayBuffer) || e && L(e.buffer, ArrayBuffer) || typeof SharedArrayBuffer < "u" && (L(e, SharedArrayBuffer) || e && L(e.buffer, SharedArrayBuffer)))
      return k(e, r, t);
    if (typeof e == "number")
      throw new TypeError(
        'The "value" argument must not be of type number. Received type number'
      );
    var n = e.valueOf && e.valueOf();
    if (n != null && n !== e)
      return i.from(n, r, t);
    var o = V(e);
    if (o)
      return o;
    if (typeof Symbol < "u" && Symbol.toPrimitive != null && typeof e[Symbol.toPrimitive] == "function")
      return i.from(
        e[Symbol.toPrimitive]("string"),
        r,
        t
      );
    throw new TypeError(
      "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e
    );
  }
  i.from = function(e, r, t) {
    return y(e, r, t);
  }, Object.setPrototypeOf(i.prototype, Uint8Array.prototype), Object.setPrototypeOf(i, Uint8Array);
  function E(e) {
    if (typeof e != "number")
      throw new TypeError('"size" argument must be of type number');
    if (e < 0)
      throw new RangeError('The value "' + e + '" is invalid for option "size"');
  }
  function x(e, r, t) {
    return E(e), e <= 0 ? p(e) : r !== void 0 ? typeof t == "string" ? p(e).fill(r, t) : p(e).fill(r) : p(e);
  }
  i.alloc = function(e, r, t) {
    return x(e, r, t);
  };
  function g(e) {
    return E(e), p(e < 0 ? 0 : G(e) | 0);
  }
  i.allocUnsafe = function(e) {
    return g(e);
  }, i.allocUnsafeSlow = function(e) {
    return g(e);
  };
  function A(e, r) {
    if ((typeof r != "string" || r === "") && (r = "utf8"), !i.isEncoding(r))
      throw new TypeError("Unknown encoding: " + r);
    var t = R(e, r) | 0, n = p(t), o = n.write(e, r);
    return o !== t && (n = n.slice(0, o)), n;
  }
  function F(e) {
    for (var r = e.length < 0 ? 0 : G(e.length) | 0, t = p(r), n = 0; n < r; n += 1)
      t[n] = e[n] & 255;
    return t;
  }
  function C(e) {
    if (L(e, Uint8Array)) {
      var r = new Uint8Array(e);
      return k(r.buffer, r.byteOffset, r.byteLength);
    }
    return F(e);
  }
  function k(e, r, t) {
    if (r < 0 || e.byteLength < r)
      throw new RangeError('"offset" is outside of buffer bounds');
    if (e.byteLength < r + (t || 0))
      throw new RangeError('"length" is outside of buffer bounds');
    var n;
    return r === void 0 && t === void 0 ? n = new Uint8Array(e) : t === void 0 ? n = new Uint8Array(e, r) : n = new Uint8Array(e, r, t), Object.setPrototypeOf(n, i.prototype), n;
  }
  function V(e) {
    if (i.isBuffer(e)) {
      var r = G(e.length) | 0, t = p(r);
      return t.length === 0 || e.copy(t, 0, 0, r), t;
    }
    if (e.length !== void 0)
      return typeof e.length != "number" || Q(e.length) ? p(0) : F(e);
    if (e.type === "Buffer" && Array.isArray(e.data))
      return F(e.data);
  }
  function G(e) {
    if (e >= l)
      throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + l.toString(16) + " bytes");
    return e | 0;
  }
  function N(e) {
    return +e != e && (e = 0), i.alloc(+e);
  }
  i.isBuffer = function(r) {
    return r != null && r._isBuffer === !0 && r !== i.prototype;
  }, i.compare = function(r, t) {
    if (L(r, Uint8Array) && (r = i.from(r, r.offset, r.byteLength)), L(t, Uint8Array) && (t = i.from(t, t.offset, t.byteLength)), !i.isBuffer(r) || !i.isBuffer(t))
      throw new TypeError(
        'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
      );
    if (r === t)
      return 0;
    for (var n = r.length, o = t.length, f = 0, s = Math.min(n, o); f < s; ++f)
      if (r[f] !== t[f]) {
        n = r[f], o = t[f];
        break;
      }
    return n < o ? -1 : o < n ? 1 : 0;
  }, i.isEncoding = function(r) {
    switch (String(r).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, i.concat = function(r, t) {
    if (!Array.isArray(r))
      throw new TypeError('"list" argument must be an Array of Buffers');
    if (r.length === 0)
      return i.alloc(0);
    var n;
    if (t === void 0)
      for (t = 0, n = 0; n < r.length; ++n)
        t += r[n].length;
    var o = i.allocUnsafe(t), f = 0;
    for (n = 0; n < r.length; ++n) {
      var s = r[n];
      if (L(s, Uint8Array))
        f + s.length > o.length ? i.from(s).copy(o, f) : Uint8Array.prototype.set.call(
          o,
          s,
          f
        );
      else if (i.isBuffer(s))
        s.copy(o, f);
      else
        throw new TypeError('"list" argument must be an Array of Buffers');
      f += s.length;
    }
    return o;
  };
  function R(e, r) {
    if (i.isBuffer(e))
      return e.length;
    if (ArrayBuffer.isView(e) || L(e, ArrayBuffer))
      return e.byteLength;
    if (typeof e != "string")
      throw new TypeError(
        'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e
      );
    var t = e.length, n = arguments.length > 2 && arguments[2] === !0;
    if (!n && t === 0)
      return 0;
    for (var o = !1; ; )
      switch (r) {
        case "ascii":
        case "latin1":
        case "binary":
          return t;
        case "utf8":
        case "utf-8":
          return j(e).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return t * 2;
        case "hex":
          return t >>> 1;
        case "base64":
          return hr(e).length;
        default:
          if (o)
            return n ? -1 : j(e).length;
          r = ("" + r).toLowerCase(), o = !0;
      }
  }
  i.byteLength = R;
  function P(e, r, t) {
    var n = !1;
    if ((r === void 0 || r < 0) && (r = 0), r > this.length || ((t === void 0 || t > this.length) && (t = this.length), t <= 0) || (t >>>= 0, r >>>= 0, t <= r))
      return "";
    for (e || (e = "utf8"); ; )
      switch (e) {
        case "hex":
          return Lr(this, r, t);
        case "utf8":
        case "utf-8":
          return ar(this, r, t);
        case "ascii":
          return Cr(this, r, t);
        case "latin1":
        case "binary":
          return Dr(this, r, t);
        case "base64":
          return Sr(this, r, t);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return Mr(this, r, t);
        default:
          if (n)
            throw new TypeError("Unknown encoding: " + e);
          e = (e + "").toLowerCase(), n = !0;
      }
  }
  i.prototype._isBuffer = !0;
  function D(e, r, t) {
    var n = e[r];
    e[r] = e[t], e[t] = n;
  }
  i.prototype.swap16 = function() {
    var r = this.length;
    if (r % 2 !== 0)
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var t = 0; t < r; t += 2)
      D(this, t, t + 1);
    return this;
  }, i.prototype.swap32 = function() {
    var r = this.length;
    if (r % 4 !== 0)
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var t = 0; t < r; t += 4)
      D(this, t, t + 3), D(this, t + 1, t + 2);
    return this;
  }, i.prototype.swap64 = function() {
    var r = this.length;
    if (r % 8 !== 0)
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var t = 0; t < r; t += 8)
      D(this, t, t + 7), D(this, t + 1, t + 6), D(this, t + 2, t + 5), D(this, t + 3, t + 4);
    return this;
  }, i.prototype.toString = function() {
    var r = this.length;
    return r === 0 ? "" : arguments.length === 0 ? ar(this, 0, r) : P.apply(this, arguments);
  }, i.prototype.toLocaleString = i.prototype.toString, i.prototype.equals = function(r) {
    if (!i.isBuffer(r))
      throw new TypeError("Argument must be a Buffer");
    return this === r ? !0 : i.compare(this, r) === 0;
  }, i.prototype.inspect = function() {
    var r = "", t = a.INSPECT_MAX_BYTES;
    return r = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (r += " ... "), "<Buffer " + r + ">";
  }, w && (i.prototype[w] = i.prototype.inspect), i.prototype.compare = function(r, t, n, o, f) {
    if (L(r, Uint8Array) && (r = i.from(r, r.offset, r.byteLength)), !i.isBuffer(r))
      throw new TypeError(
        'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof r
      );
    if (t === void 0 && (t = 0), n === void 0 && (n = r ? r.length : 0), o === void 0 && (o = 0), f === void 0 && (f = this.length), t < 0 || n > r.length || o < 0 || f > this.length)
      throw new RangeError("out of range index");
    if (o >= f && t >= n)
      return 0;
    if (o >= f)
      return -1;
    if (t >= n)
      return 1;
    if (t >>>= 0, n >>>= 0, o >>>= 0, f >>>= 0, this === r)
      return 0;
    for (var s = f - o, d = n - t, v = Math.min(s, d), T = this.slice(o, f), I = r.slice(t, n), U = 0; U < v; ++U)
      if (T[U] !== I[U]) {
        s = T[U], d = I[U];
        break;
      }
    return s < d ? -1 : d < s ? 1 : 0;
  };
  function X(e, r, t, n, o) {
    if (e.length === 0)
      return -1;
    if (typeof t == "string" ? (n = t, t = 0) : t > 2147483647 ? t = 2147483647 : t < -2147483648 && (t = -2147483648), t = +t, Q(t) && (t = o ? 0 : e.length - 1), t < 0 && (t = e.length + t), t >= e.length) {
      if (o)
        return -1;
      t = e.length - 1;
    } else if (t < 0)
      if (o)
        t = 0;
      else
        return -1;
    if (typeof r == "string" && (r = i.from(r, n)), i.isBuffer(r))
      return r.length === 0 ? -1 : z(e, r, t, n, o);
    if (typeof r == "number")
      return r = r & 255, typeof Uint8Array.prototype.indexOf == "function" ? o ? Uint8Array.prototype.indexOf.call(e, r, t) : Uint8Array.prototype.lastIndexOf.call(e, r, t) : z(e, [r], t, n, o);
    throw new TypeError("val must be string, number or Buffer");
  }
  function z(e, r, t, n, o) {
    var f = 1, s = e.length, d = r.length;
    if (n !== void 0 && (n = String(n).toLowerCase(), n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")) {
      if (e.length < 2 || r.length < 2)
        return -1;
      f = 2, s /= 2, d /= 2, t /= 2;
    }
    function v(pr, lr) {
      return f === 1 ? pr[lr] : pr.readUInt16BE(lr * f);
    }
    var T;
    if (o) {
      var I = -1;
      for (T = t; T < s; T++)
        if (v(e, T) === v(r, I === -1 ? 0 : T - I)) {
          if (I === -1 && (I = T), T - I + 1 === d)
            return I * f;
        } else
          I !== -1 && (T -= T - I), I = -1;
    } else
      for (t + d > s && (t = s - d), T = t; T >= 0; T--) {
        for (var U = !0, H = 0; H < d; H++)
          if (v(e, T + H) !== v(r, H)) {
            U = !1;
            break;
          }
        if (U)
          return T;
      }
    return -1;
  }
  i.prototype.includes = function(r, t, n) {
    return this.indexOf(r, t, n) !== -1;
  }, i.prototype.indexOf = function(r, t, n) {
    return X(this, r, t, n, !0);
  }, i.prototype.lastIndexOf = function(r, t, n) {
    return X(this, r, t, n, !1);
  };
  function Z(e, r, t, n) {
    t = Number(t) || 0;
    var o = e.length - t;
    n ? (n = Number(n), n > o && (n = o)) : n = o;
    var f = r.length;
    n > f / 2 && (n = f / 2);
    for (var s = 0; s < n; ++s) {
      var d = parseInt(r.substr(s * 2, 2), 16);
      if (Q(d))
        return s;
      e[t + s] = d;
    }
    return s;
  }
  function Ur(e, r, t, n) {
    return W(j(r, e.length - t), e, t, n);
  }
  function Br(e, r, t, n) {
    return W(Gr(r), e, t, n);
  }
  function Ir(e, r, t, n) {
    return W(hr(r), e, t, n);
  }
  function br(e, r, t, n) {
    return W(Nr(r, e.length - t), e, t, n);
  }
  i.prototype.write = function(r, t, n, o) {
    if (t === void 0)
      o = "utf8", n = this.length, t = 0;
    else if (n === void 0 && typeof t == "string")
      o = t, n = this.length, t = 0;
    else if (isFinite(t))
      t = t >>> 0, isFinite(n) ? (n = n >>> 0, o === void 0 && (o = "utf8")) : (o = n, n = void 0);
    else
      throw new Error(
        "Buffer.write(string, encoding, offset[, length]) is no longer supported"
      );
    var f = this.length - t;
    if ((n === void 0 || n > f) && (n = f), r.length > 0 && (n < 0 || t < 0) || t > this.length)
      throw new RangeError("Attempt to write outside buffer bounds");
    o || (o = "utf8");
    for (var s = !1; ; )
      switch (o) {
        case "hex":
          return Z(this, r, t, n);
        case "utf8":
        case "utf-8":
          return Ur(this, r, t, n);
        case "ascii":
        case "latin1":
        case "binary":
          return Br(this, r, t, n);
        case "base64":
          return Ir(this, r, t, n);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return br(this, r, t, n);
        default:
          if (s)
            throw new TypeError("Unknown encoding: " + o);
          o = ("" + o).toLowerCase(), s = !0;
      }
  }, i.prototype.toJSON = function() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function Sr(e, r, t) {
    return r === 0 && t === e.length ? u.fromByteArray(e) : u.fromByteArray(e.slice(r, t));
  }
  function ar(e, r, t) {
    t = Math.min(e.length, t);
    for (var n = [], o = r; o < t; ) {
      var f = e[o], s = null, d = f > 239 ? 4 : f > 223 ? 3 : f > 191 ? 2 : 1;
      if (o + d <= t) {
        var v, T, I, U;
        switch (d) {
          case 1:
            f < 128 && (s = f);
            break;
          case 2:
            v = e[o + 1], (v & 192) === 128 && (U = (f & 31) << 6 | v & 63, U > 127 && (s = U));
            break;
          case 3:
            v = e[o + 1], T = e[o + 2], (v & 192) === 128 && (T & 192) === 128 && (U = (f & 15) << 12 | (v & 63) << 6 | T & 63, U > 2047 && (U < 55296 || U > 57343) && (s = U));
            break;
          case 4:
            v = e[o + 1], T = e[o + 2], I = e[o + 3], (v & 192) === 128 && (T & 192) === 128 && (I & 192) === 128 && (U = (f & 15) << 18 | (v & 63) << 12 | (T & 63) << 6 | I & 63, U > 65535 && U < 1114112 && (s = U));
        }
      }
      s === null ? (s = 65533, d = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | s & 1023), n.push(s), o += d;
    }
    return _r(n);
  }
  var ur = 4096;
  function _r(e) {
    var r = e.length;
    if (r <= ur)
      return String.fromCharCode.apply(String, e);
    for (var t = "", n = 0; n < r; )
      t += String.fromCharCode.apply(
        String,
        e.slice(n, n += ur)
      );
    return t;
  }
  function Cr(e, r, t) {
    var n = "";
    t = Math.min(e.length, t);
    for (var o = r; o < t; ++o)
      n += String.fromCharCode(e[o] & 127);
    return n;
  }
  function Dr(e, r, t) {
    var n = "";
    t = Math.min(e.length, t);
    for (var o = r; o < t; ++o)
      n += String.fromCharCode(e[o]);
    return n;
  }
  function Lr(e, r, t) {
    var n = e.length;
    (!r || r < 0) && (r = 0), (!t || t < 0 || t > n) && (t = n);
    for (var o = "", f = r; f < t; ++f)
      o += Or[e[f]];
    return o;
  }
  function Mr(e, r, t) {
    for (var n = e.slice(r, t), o = "", f = 0; f < n.length - 1; f += 2)
      o += String.fromCharCode(n[f] + n[f + 1] * 256);
    return o;
  }
  i.prototype.slice = function(r, t) {
    var n = this.length;
    r = ~~r, t = t === void 0 ? n : ~~t, r < 0 ? (r += n, r < 0 && (r = 0)) : r > n && (r = n), t < 0 ? (t += n, t < 0 && (t = 0)) : t > n && (t = n), t < r && (t = r);
    var o = this.subarray(r, t);
    return Object.setPrototypeOf(o, i.prototype), o;
  };
  function B(e, r, t) {
    if (e % 1 !== 0 || e < 0)
      throw new RangeError("offset is not uint");
    if (e + r > t)
      throw new RangeError("Trying to access beyond buffer length");
  }
  i.prototype.readUintLE = i.prototype.readUIntLE = function(r, t, n) {
    r = r >>> 0, t = t >>> 0, n || B(r, t, this.length);
    for (var o = this[r], f = 1, s = 0; ++s < t && (f *= 256); )
      o += this[r + s] * f;
    return o;
  }, i.prototype.readUintBE = i.prototype.readUIntBE = function(r, t, n) {
    r = r >>> 0, t = t >>> 0, n || B(r, t, this.length);
    for (var o = this[r + --t], f = 1; t > 0 && (f *= 256); )
      o += this[r + --t] * f;
    return o;
  }, i.prototype.readUint8 = i.prototype.readUInt8 = function(r, t) {
    return r = r >>> 0, t || B(r, 1, this.length), this[r];
  }, i.prototype.readUint16LE = i.prototype.readUInt16LE = function(r, t) {
    return r = r >>> 0, t || B(r, 2, this.length), this[r] | this[r + 1] << 8;
  }, i.prototype.readUint16BE = i.prototype.readUInt16BE = function(r, t) {
    return r = r >>> 0, t || B(r, 2, this.length), this[r] << 8 | this[r + 1];
  }, i.prototype.readUint32LE = i.prototype.readUInt32LE = function(r, t) {
    return r = r >>> 0, t || B(r, 4, this.length), (this[r] | this[r + 1] << 8 | this[r + 2] << 16) + this[r + 3] * 16777216;
  }, i.prototype.readUint32BE = i.prototype.readUInt32BE = function(r, t) {
    return r = r >>> 0, t || B(r, 4, this.length), this[r] * 16777216 + (this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3]);
  }, i.prototype.readIntLE = function(r, t, n) {
    r = r >>> 0, t = t >>> 0, n || B(r, t, this.length);
    for (var o = this[r], f = 1, s = 0; ++s < t && (f *= 256); )
      o += this[r + s] * f;
    return f *= 128, o >= f && (o -= Math.pow(2, 8 * t)), o;
  }, i.prototype.readIntBE = function(r, t, n) {
    r = r >>> 0, t = t >>> 0, n || B(r, t, this.length);
    for (var o = t, f = 1, s = this[r + --o]; o > 0 && (f *= 256); )
      s += this[r + --o] * f;
    return f *= 128, s >= f && (s -= Math.pow(2, 8 * t)), s;
  }, i.prototype.readInt8 = function(r, t) {
    return r = r >>> 0, t || B(r, 1, this.length), this[r] & 128 ? (255 - this[r] + 1) * -1 : this[r];
  }, i.prototype.readInt16LE = function(r, t) {
    r = r >>> 0, t || B(r, 2, this.length);
    var n = this[r] | this[r + 1] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, i.prototype.readInt16BE = function(r, t) {
    r = r >>> 0, t || B(r, 2, this.length);
    var n = this[r + 1] | this[r] << 8;
    return n & 32768 ? n | 4294901760 : n;
  }, i.prototype.readInt32LE = function(r, t) {
    return r = r >>> 0, t || B(r, 4, this.length), this[r] | this[r + 1] << 8 | this[r + 2] << 16 | this[r + 3] << 24;
  }, i.prototype.readInt32BE = function(r, t) {
    return r = r >>> 0, t || B(r, 4, this.length), this[r] << 24 | this[r + 1] << 16 | this[r + 2] << 8 | this[r + 3];
  }, i.prototype.readFloatLE = function(r, t) {
    return r = r >>> 0, t || B(r, 4, this.length), h.read(this, r, !0, 23, 4);
  }, i.prototype.readFloatBE = function(r, t) {
    return r = r >>> 0, t || B(r, 4, this.length), h.read(this, r, !1, 23, 4);
  }, i.prototype.readDoubleLE = function(r, t) {
    return r = r >>> 0, t || B(r, 8, this.length), h.read(this, r, !0, 52, 8);
  }, i.prototype.readDoubleBE = function(r, t) {
    return r = r >>> 0, t || B(r, 8, this.length), h.read(this, r, !1, 52, 8);
  };
  function S(e, r, t, n, o, f) {
    if (!i.isBuffer(e))
      throw new TypeError('"buffer" argument must be a Buffer instance');
    if (r > o || r < f)
      throw new RangeError('"value" argument is out of bounds');
    if (t + n > e.length)
      throw new RangeError("Index out of range");
  }
  i.prototype.writeUintLE = i.prototype.writeUIntLE = function(r, t, n, o) {
    if (r = +r, t = t >>> 0, n = n >>> 0, !o) {
      var f = Math.pow(2, 8 * n) - 1;
      S(this, r, t, n, f, 0);
    }
    var s = 1, d = 0;
    for (this[t] = r & 255; ++d < n && (s *= 256); )
      this[t + d] = r / s & 255;
    return t + n;
  }, i.prototype.writeUintBE = i.prototype.writeUIntBE = function(r, t, n, o) {
    if (r = +r, t = t >>> 0, n = n >>> 0, !o) {
      var f = Math.pow(2, 8 * n) - 1;
      S(this, r, t, n, f, 0);
    }
    var s = n - 1, d = 1;
    for (this[t + s] = r & 255; --s >= 0 && (d *= 256); )
      this[t + s] = r / d & 255;
    return t + n;
  }, i.prototype.writeUint8 = i.prototype.writeUInt8 = function(r, t, n) {
    return r = +r, t = t >>> 0, n || S(this, r, t, 1, 255, 0), this[t] = r & 255, t + 1;
  }, i.prototype.writeUint16LE = i.prototype.writeUInt16LE = function(r, t, n) {
    return r = +r, t = t >>> 0, n || S(this, r, t, 2, 65535, 0), this[t] = r & 255, this[t + 1] = r >>> 8, t + 2;
  }, i.prototype.writeUint16BE = i.prototype.writeUInt16BE = function(r, t, n) {
    return r = +r, t = t >>> 0, n || S(this, r, t, 2, 65535, 0), this[t] = r >>> 8, this[t + 1] = r & 255, t + 2;
  }, i.prototype.writeUint32LE = i.prototype.writeUInt32LE = function(r, t, n) {
    return r = +r, t = t >>> 0, n || S(this, r, t, 4, 4294967295, 0), this[t + 3] = r >>> 24, this[t + 2] = r >>> 16, this[t + 1] = r >>> 8, this[t] = r & 255, t + 4;
  }, i.prototype.writeUint32BE = i.prototype.writeUInt32BE = function(r, t, n) {
    return r = +r, t = t >>> 0, n || S(this, r, t, 4, 4294967295, 0), this[t] = r >>> 24, this[t + 1] = r >>> 16, this[t + 2] = r >>> 8, this[t + 3] = r & 255, t + 4;
  }, i.prototype.writeIntLE = function(r, t, n, o) {
    if (r = +r, t = t >>> 0, !o) {
      var f = Math.pow(2, 8 * n - 1);
      S(this, r, t, n, f - 1, -f);
    }
    var s = 0, d = 1, v = 0;
    for (this[t] = r & 255; ++s < n && (d *= 256); )
      r < 0 && v === 0 && this[t + s - 1] !== 0 && (v = 1), this[t + s] = (r / d >> 0) - v & 255;
    return t + n;
  }, i.prototype.writeIntBE = function(r, t, n, o) {
    if (r = +r, t = t >>> 0, !o) {
      var f = Math.pow(2, 8 * n - 1);
      S(this, r, t, n, f - 1, -f);
    }
    var s = n - 1, d = 1, v = 0;
    for (this[t + s] = r & 255; --s >= 0 && (d *= 256); )
      r < 0 && v === 0 && this[t + s + 1] !== 0 && (v = 1), this[t + s] = (r / d >> 0) - v & 255;
    return t + n;
  }, i.prototype.writeInt8 = function(r, t, n) {
    return r = +r, t = t >>> 0, n || S(this, r, t, 1, 127, -128), r < 0 && (r = 255 + r + 1), this[t] = r & 255, t + 1;
  }, i.prototype.writeInt16LE = function(r, t, n) {
    return r = +r, t = t >>> 0, n || S(this, r, t, 2, 32767, -32768), this[t] = r & 255, this[t + 1] = r >>> 8, t + 2;
  }, i.prototype.writeInt16BE = function(r, t, n) {
    return r = +r, t = t >>> 0, n || S(this, r, t, 2, 32767, -32768), this[t] = r >>> 8, this[t + 1] = r & 255, t + 2;
  }, i.prototype.writeInt32LE = function(r, t, n) {
    return r = +r, t = t >>> 0, n || S(this, r, t, 4, 2147483647, -2147483648), this[t] = r & 255, this[t + 1] = r >>> 8, this[t + 2] = r >>> 16, this[t + 3] = r >>> 24, t + 4;
  }, i.prototype.writeInt32BE = function(r, t, n) {
    return r = +r, t = t >>> 0, n || S(this, r, t, 4, 2147483647, -2147483648), r < 0 && (r = 4294967295 + r + 1), this[t] = r >>> 24, this[t + 1] = r >>> 16, this[t + 2] = r >>> 8, this[t + 3] = r & 255, t + 4;
  };
  function fr(e, r, t, n, o, f) {
    if (t + n > e.length)
      throw new RangeError("Index out of range");
    if (t < 0)
      throw new RangeError("Index out of range");
  }
  function cr(e, r, t, n, o) {
    return r = +r, t = t >>> 0, o || fr(e, r, t, 4), h.write(e, r, t, n, 23, 4), t + 4;
  }
  i.prototype.writeFloatLE = function(r, t, n) {
    return cr(this, r, t, !0, n);
  }, i.prototype.writeFloatBE = function(r, t, n) {
    return cr(this, r, t, !1, n);
  };
  function sr(e, r, t, n, o) {
    return r = +r, t = t >>> 0, o || fr(e, r, t, 8), h.write(e, r, t, n, 52, 8), t + 8;
  }
  i.prototype.writeDoubleLE = function(r, t, n) {
    return sr(this, r, t, !0, n);
  }, i.prototype.writeDoubleBE = function(r, t, n) {
    return sr(this, r, t, !1, n);
  }, i.prototype.copy = function(r, t, n, o) {
    if (!i.isBuffer(r))
      throw new TypeError("argument should be a Buffer");
    if (n || (n = 0), !o && o !== 0 && (o = this.length), t >= r.length && (t = r.length), t || (t = 0), o > 0 && o < n && (o = n), o === n || r.length === 0 || this.length === 0)
      return 0;
    if (t < 0)
      throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length)
      throw new RangeError("Index out of range");
    if (o < 0)
      throw new RangeError("sourceEnd out of bounds");
    o > this.length && (o = this.length), r.length - t < o - n && (o = r.length - t + n);
    var f = o - n;
    return this === r && typeof Uint8Array.prototype.copyWithin == "function" ? this.copyWithin(t, n, o) : Uint8Array.prototype.set.call(
      r,
      this.subarray(n, o),
      t
    ), f;
  }, i.prototype.fill = function(r, t, n, o) {
    if (typeof r == "string") {
      if (typeof t == "string" ? (o = t, t = 0, n = this.length) : typeof n == "string" && (o = n, n = this.length), o !== void 0 && typeof o != "string")
        throw new TypeError("encoding must be a string");
      if (typeof o == "string" && !i.isEncoding(o))
        throw new TypeError("Unknown encoding: " + o);
      if (r.length === 1) {
        var f = r.charCodeAt(0);
        (o === "utf8" && f < 128 || o === "latin1") && (r = f);
      }
    } else
      typeof r == "number" ? r = r & 255 : typeof r == "boolean" && (r = Number(r));
    if (t < 0 || this.length < t || this.length < n)
      throw new RangeError("Out of range index");
    if (n <= t)
      return this;
    t = t >>> 0, n = n === void 0 ? this.length : n >>> 0, r || (r = 0);
    var s;
    if (typeof r == "number")
      for (s = t; s < n; ++s)
        this[s] = r;
    else {
      var d = i.isBuffer(r) ? r : i.from(r, o), v = d.length;
      if (v === 0)
        throw new TypeError('The value "' + r + '" is invalid for argument "value"');
      for (s = 0; s < n - t; ++s)
        this[s + t] = d[s % v];
    }
    return this;
  };
  var kr = /[^+/0-9A-Za-z-_]/g;
  function Rr(e) {
    if (e = e.split("=")[0], e = e.trim().replace(kr, ""), e.length < 2)
      return "";
    for (; e.length % 4 !== 0; )
      e = e + "=";
    return e;
  }
  function j(e, r) {
    r = r || 1 / 0;
    for (var t, n = e.length, o = null, f = [], s = 0; s < n; ++s) {
      if (t = e.charCodeAt(s), t > 55295 && t < 57344) {
        if (!o) {
          if (t > 56319) {
            (r -= 3) > -1 && f.push(239, 191, 189);
            continue;
          } else if (s + 1 === n) {
            (r -= 3) > -1 && f.push(239, 191, 189);
            continue;
          }
          o = t;
          continue;
        }
        if (t < 56320) {
          (r -= 3) > -1 && f.push(239, 191, 189), o = t;
          continue;
        }
        t = (o - 55296 << 10 | t - 56320) + 65536;
      } else
        o && (r -= 3) > -1 && f.push(239, 191, 189);
      if (o = null, t < 128) {
        if ((r -= 1) < 0)
          break;
        f.push(t);
      } else if (t < 2048) {
        if ((r -= 2) < 0)
          break;
        f.push(
          t >> 6 | 192,
          t & 63 | 128
        );
      } else if (t < 65536) {
        if ((r -= 3) < 0)
          break;
        f.push(
          t >> 12 | 224,
          t >> 6 & 63 | 128,
          t & 63 | 128
        );
      } else if (t < 1114112) {
        if ((r -= 4) < 0)
          break;
        f.push(
          t >> 18 | 240,
          t >> 12 & 63 | 128,
          t >> 6 & 63 | 128,
          t & 63 | 128
        );
      } else
        throw new Error("Invalid code point");
    }
    return f;
  }
  function Gr(e) {
    for (var r = [], t = 0; t < e.length; ++t)
      r.push(e.charCodeAt(t) & 255);
    return r;
  }
  function Nr(e, r) {
    for (var t, n, o, f = [], s = 0; s < e.length && !((r -= 2) < 0); ++s)
      t = e.charCodeAt(s), n = t >> 8, o = t % 256, f.push(o), f.push(n);
    return f;
  }
  function hr(e) {
    return u.toByteArray(Rr(e));
  }
  function W(e, r, t, n) {
    for (var o = 0; o < n && !(o + t >= r.length || o >= e.length); ++o)
      r[o + t] = e[o];
    return o;
  }
  function L(e, r) {
    return e instanceof r || e != null && e.constructor != null && e.constructor.name != null && e.constructor.name === r.name;
  }
  function Q(e) {
    return e !== e;
  }
  var Or = function() {
    for (var e = "0123456789abcdef", r = new Array(256), t = 0; t < 16; ++t)
      for (var n = t * 16, o = 0; o < 16; ++o)
        r[n + o] = e[t] + e[o];
    return r;
  }();
})(gr);
const b = async (a, u, h) => {
  const w = await h(a, u);
  return new DataView(w, 0, w.byteLength);
}, mr = async (a) => {
  const u = dr(a);
  return gr.Buffer.from(u).toString("base64");
};
function dr(a) {
  return "\0".repeat(a);
}
function Y(a, u, h) {
  let w = "";
  for (let l = u; l < u + h; l++) {
    const c = a.getUint8(l);
    if (c === 0)
      break;
    w += String.fromCharCode(c);
  }
  return w;
}
var K = /* @__PURE__ */ ((a) => (a.Debug = "debug", a.Info = "info", a.Warn = "warn", a.Error = "error", a.None = "none", a))(K || {});
const or = class or {
  static debug(u, ...h) {
    this.shouldLog(
      "debug"
      /* Debug */
    ) && console.debug(u, ...h);
  }
  static info(u, ...h) {
    this.shouldLog(
      "info"
      /* Info */
    ) && console.info(u, ...h);
  }
  static warn(u, ...h) {
    this.shouldLog(
      "warn"
      /* Warn */
    ) && console.warn(u, ...h);
  }
  static error(u, ...h) {
    this.shouldLog(
      "error"
      /* Error */
    ) && console.error(u, ...h);
  }
  static shouldLog(u) {
    const h = Object.values(K), w = h.indexOf(this.currentLevel);
    return h.indexOf(u) >= w;
  }
};
or.currentLevel = "info";
let m = or;
const Kr = 1165519206, qr = 1700284774, Zr = 34853, $r = 4292411361, jr = 65505, wr = 4292411360, Ar = 1229531648, Qr = 1296891946, rt = 2303741511, yr = 1229278788, tt = 1767135348, J = "XML:com.adobe.xmp", Fr = async (a, u, h, w) => {
  const c = (await b(2, a, h)).getUint16(0, u), p = a + 2;
  m.debug("writing 0s on gps data...", c, p);
  const i = c * 12, y = await mr(i);
  await w(y, p, "base64");
}, et = async (a, u, h) => {
  m.debug("preparing to read tag");
  const w = await b(12, a, h), l = w.getUint16(0, u), c = w.getUint16(2, u), p = w.getUint32(4, u), i = w.getUint32(8, u);
  return m.debug("read tag", l, c, p, i), {
    tag: l,
    type: c,
    numValues: p,
    valueOffset: i
  };
}, vr = (a) => a.getUint32(0) === Ar, Tr = async (a, u, h) => {
  const l = (await b(2, a, h)).getUint16(0, u), c = a + 2;
  m.debug("# of exif entries", l);
  for (let p = 0; p < l; p++) {
    const i = await et(c + p * 12, u, h);
    if (i.tag === Zr && i.type === 4 && i.numValues === 1)
      return m.debug("gps tag found", a, i.valueOffset), i.valueOffset;
  }
  return -1;
}, nt = async (a, u, h, w) => {
  const l = await Tr(a, w, u);
  return l >= 0 ? (await Fr(l, w, u, h), !0) : !1;
}, xr = async (a, u, h, w, l) => {
  m.debug("exifDataView", a, u);
  const c = vr(a);
  m.debug("isLittleEndian?", c, a.getUint32(0));
  const p = await Tr(h + 8, c, w);
  return p >= 0 ? (await Fr(p + h, c, w, l), !0) : !1;
}, it = async (a, u, h) => {
  const w = await b(4, 0, a), l = w.getUint32(0);
  let c = 0, p = !1;
  if (l === rt) {
    m.debug("png identified"), c += 8;
    let i = 0, y = 0;
    for (; y !== yr; ) {
      const E = await b(8, c, a);
      if (m.debug("png tag data view", E, c), i = E.getUint32(0), y = E.getUint32(4), m.debug("current png tag", i, y), y === qr) {
        m.debug("found exif in png");
        const x = c + 8, g = await b(i, x, a);
        m.info("png exif view", JSON.stringify(g)), p = await xr(g, i, x, a, u);
      } else if (y === tt && !h) {
        m.info("found itxt in png");
        const x = c + 8;
        if (i >= J.length) {
          const g = await b(J.length, x, a);
          if (Y(g, 0, J.length) === J) {
            m.info("wiping png XMP metadata");
            const F = dr(i);
            await u(F, x, "ascii"), p = !0;
          }
        }
      }
      y !== yr && (c = c + 12 + i);
    }
  } else if (l === $r || l === wr) {
    if (m.debug("jpg identified - exif or jfif"), c += 4, l === wr) {
      const g = (await b(2, c, a)).getUint16(0);
      if (c += g, (await b(2, c, a)).getUint16(0) === jr)
        c += 2;
      else
        return p;
    }
    const i = await b(6, c, a), y = i.getUint16(0);
    if (i.getUint32(2) === Kr) {
      m.debug("sanity checked and confirmed presence of exif", c), c += 8;
      const x = await b(y, c, a);
      p = await xr(x, y, c, a, u);
    }
  } else if (l === Ar || l === Qr) {
    const i = vr(w);
    c += 4;
    const y = await b(4, c, a);
    m.debug("tiff data view", y);
    const E = y.getUint32(0, i);
    m.debug("tiff exif offset", E), c = E, p = await nt(c, a, u, i);
  }
  return p;
}, ot = "com.apple.quicktime.location.ISO6709", at = "moov", ut = "udta", ft = "meta", ct = "uuid", st = "XMP_", ht = "©xyz", pt = [at, ut], tr = async (a, u, h, w, l = "") => {
  if (await b(
    a,
    u,
    w
  ), l === "") {
    const c = await mr(a);
    await h(c, u, "base64");
  } else
    await h(l, u, "ascii");
}, lt = async (a, u, h) => {
  m.debug("preparing to read video skip...");
  let w = !1, l = !1, c = 0;
  for (; !l && !w; ) {
    m.debug("reading next tag in video...");
    const p = await b(8, c, a);
    if (m.debug("tag bite + length", p.buffer, p.byteLength), p.byteLength === 0) {
      l = !0;
      break;
    }
    if (p.byteLength >= 8) {
      const i = p.getUint32(0), y = Y(p, 4, 4);
      if (m.debug("found tag", y, i), i === 0) {
        l = !0;
        break;
      }
      if (y === ft) {
        m.debug("found meta tag in video", i);
        const E = await b(
          i,
          c,
          a
        );
        m.debug("meta buffer", E);
        const x = 0, g = E.getUint32(x + 8), A = x + g + 8, F = E.getUint32(A), C = E.getUint32(A + 12);
        let k = A + 16, V = 0, G = -1;
        for (; V < C; ) {
          const N = E.getUint32(k), R = Y(
            E,
            k + 8,
            N - 8
          );
          if (m.debug("finding keys", R, N), R === ot) {
            w = !0, G = V;
            break;
          }
          k += N, V++;
        }
        if (G >= 0) {
          const N = A + F;
          let R = 0, P = N + 8;
          for (; R !== G; ) {
            const Z = E.getUint32(
              P
            );
            P += Z, R++;
          }
          const D = P + 8, X = E.getUint32(D), z = D + 4;
          await tr(
            X,
            z + c,
            u,
            a
          );
        } else
          m.debug("no gps in this metadata..."), c += i;
      } else if (pt.includes(y))
        m.debug("moov or udta tag found"), c += 8;
      else if ((y === ct || y === st) && !h)
        m.debug("found uuid tag"), w = !0, await tr(i - 8, c + 8, u, a), c += i;
      else if (y === ht) {
        m.debug("found xyz tag");
        const E = await b(
          i,
          c,
          a
        ), x = Y(E, 0, i);
        m.debug("xyz data", x);
        const g = x.indexOf("+"), A = x.indexOf("/");
        if (g >= 0 && A >= 0 && g < A) {
          const F = x.substring(g, A), C = F.replace(/[0-9]/g, "0");
          m.debug("xyz wipeout string", F, C), await tr(
            C.length,
            c + g,
            u,
            a,
            C
          ), w = !0;
        } else
          m.debug("xyz data was malformed, skipping"), c += i;
      } else
        c += i;
    }
  }
  return m.debug("exiting video skip remover"), w;
};
var nr = { exports: {} };
(function(a, u) {
  (function(h) {
    if (u != null && typeof u.nodeType != "number")
      a.exports = h();
    else {
      var w = h(), l = typeof self < "u" ? self : $.global;
      typeof l.btoa != "function" && (l.btoa = w.btoa), typeof l.atob != "function" && (l.atob = w.atob);
    }
  })(function() {
    var h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    function w(p) {
      this.message = p;
    }
    w.prototype = new Error(), w.prototype.name = "InvalidCharacterError";
    function l(p) {
      for (var i = String(p), y, E, x, g, A = 0, F = ""; A < i.length; ) {
        if (y = i.charCodeAt(A++), E = i.charCodeAt(A++), x = i.charCodeAt(A++), y > 255 || E > 255 || x > 255)
          throw new w("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        g = y << 16 | E << 8 | x, F += h.charAt(g >> 18 & 63) + h.charAt(g >> 12 & 63) + h.charAt(g >> 6 & 63) + h.charAt(g & 63);
      }
      switch (i.length % 3) {
        case 0:
          return F;
        case 1:
          return F.slice(0, -2) + "==";
        case 2:
          return F.slice(0, -1) + "=";
      }
    }
    function c(p) {
      var i = String(p).replace(/[=]+$/, "");
      if (i.length % 4 === 1)
        throw new w("'atob' failed: The string to be decoded is not correctly encoded.");
      for (
        var y = 0, E, x, g = 0, A = "";
        // get next character
        x = i.charAt(g++);
        // eslint-disable-line no-cond-assign
        // character found in table? initialize bit storage and add its ascii value;
        ~x && (E = y % 4 ? E * 64 + x : x, // and if not first of each 4 characters,
        // convert the first 8 bits to one ascii character
        y++ % 4) ? A += String.fromCharCode(255 & E >> (-2 * y & 6)) : 0
      )
        x = h.indexOf(x);
      return A;
    }
    return { btoa: l, atob: c };
  });
})(nr, nr.exports);
var wt = nr.exports, yt = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const er = yt.LOG_LEVEL;
er && K[er] ? m.currentLevel = er : m.currentLevel = K.Warn;
const xt = (a) => /(mp4|m4v|webm|mov)/i.test(a);
function gt(a) {
  return a.replace(/^(file:\/\/)/, "");
}
const Et = async (a, u, h, w = {}) => {
  const l = { skipXMPRemoval: !1, ...w }, { skipXMPRemoval: c } = l, p = gt(a);
  return xt(p) ? await lt(u, h, c) : await it(u, h, c);
}, mt = (a) => {
  let u = "";
  const h = new Uint8Array(a), w = h.byteLength;
  for (let l = 0; l < w; l++)
    u += String.fromCharCode(h[l]);
  return wt.base64.btoa(u);
}, dt = async (a) => {
  const u = atob(a), h = u.length, w = new Uint8Array(h);
  for (let l = 0; l < h; l++)
    w[l] = u.charCodeAt(l);
  return w;
};
export {
  mt as arrayBufferToBase64,
  dt as base64StringToArrayBuffer,
  Et as removeLocation
};
//# sourceMappingURL=index.js.map
