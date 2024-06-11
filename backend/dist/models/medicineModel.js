"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var sql = require("mssql");
var _require = require("../db/db"),
  getData = _require.getData;
var _require2 = require("./genericModel"),
  executeQuery = _require2.executeQuery;
var _require3 = require("../constants/constants"),
  treatmentAttributes = _require3.treatmentAttributes,
  medicinesAttributes = _require3.medicinesAttributes;
var Medicine = {
  findById: function findById(id) {
    var _arguments = arguments;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var transaction, query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            transaction = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : null;
            _context.prev = 1;
            query = "SELECT * FROM Medicine WHERE MedicineID = @id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context.next = 6;
            return executeQuery(query, parameters, transaction);
          case 6:
            result = _context.sent;
            return _context.abrupt("return", result != null && result.length > 0 ? result[0] : null);
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            throw _context.t0;
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[1, 10]]);
    }))();
  },
  getAllMedicines: function getAllMedicines() {
    var _arguments2 = arguments;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var transaction, query, result;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            transaction = _arguments2.length > 0 && _arguments2[0] !== undefined ? _arguments2[0] : null;
            query = "SELECT Medicine.MedicineID, Medicine.Name, Medicine.Manufacturer,Medicine.Price,Medicine.Quantity FROM Medicine;\n    ";
            _context2.next = 4;
            return executeQuery(query, null, transaction);
          case 4:
            result = _context2.sent;
            return _context2.abrupt("return", result);
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  getAllTreatmentsByHospitalAdmin: function getAllTreatmentsByHospitalAdmin(id) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            query = "SELECT Treatment.TreatmentID,Treatment.Name,Treatment.Cost, Treatment.Duration, Department.Name AS DepartmentName,Hospital.Name AS HospitalName\n    FROM Treatment\n    JOIN Department ON Treatment.DepartmentID = Department.DepartmentID\n    JOIN Hospital ON Hospital.HospitalID = Department.DepartmentID\n    JOIN Admin ON Admin.AdminID = Hospital.AdminID\n    WHERE Admin.AdminID=@id;\n    ";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context3.next = 4;
            return executeQuery(query, parameters);
          case 4:
            result = _context3.sent;
            return _context3.abrupt("return", result);
          case 6:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }))();
  },
  addMedicine: function addMedicine(params, adminID) {
    var _this = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var pool, transaction, query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getData();
          case 2:
            pool = _context4.sent;
            transaction = pool.transaction();
            _context4.prev = 4;
            _context4.next = 7;
            return transaction.begin();
          case 7:
            query = "INSERT INTO Medicine (Name, Manufacturer,Price, Quantity,Dosage,Description) VALUES (@name, @manufacturer,@price, @quantity,@dosage,@description) ";
            parameters = medicinesAttributes(params);
            _context4.next = 11;
            return executeQuery(query, parameters, transaction);
          case 11:
            _context4.next = 13;
            return _this.getAllMedicines(transaction);
          case 13:
            result = _context4.sent;
            _context4.next = 16;
            return transaction.commit();
          case 16:
            return _context4.abrupt("return", result);
          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](4);
            _context4.next = 23;
            return transaction.rollback();
          case 23:
            throw _context4.t0;
          case 24:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[4, 19]]);
    }))();
  },
  editMedicine: function editMedicine(params, id) {
    var _this2 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var pool, transaction, query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return getData();
          case 2:
            pool = _context5.sent;
            transaction = pool.transaction();
            _context5.prev = 4;
            _context5.next = 7;
            return transaction.begin();
          case 7:
            query = "UPDATE Medicine SET Name=COALESCE(@name,Name), Manufacturer=COALESCE(@manufacturer,Manufacturer), Price=COALESCE(@price,Price), Quantity=COALESCE(@quantity,Quantity), Dosage=COALESCE(@dosage,Dosage), Description=COALESCE(@description,Description) WHERE MedicineID=@id";
            parameters = medicinesAttributes(params);
            parameters.push({
              name: "id",
              type: sql.Int,
              value: id
            });
            _context5.next = 12;
            return executeQuery(query, parameters, transaction);
          case 12:
            _context5.next = 14;
            return _this2.getAllMedicines(transaction);
          case 14:
            result = _context5.sent;
            _context5.next = 17;
            return transaction.commit();
          case 17:
            return _context5.abrupt("return", result);
          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](4);
            _context5.next = 24;
            return transaction.rollback();
          case 24:
            throw _context5.t0;
          case 25:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[4, 20]]);
    }))();
  },
  deleteMedicine: function deleteMedicine(id) {
    var _this3 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var pool, transaction, query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getData();
          case 2:
            pool = _context6.sent;
            transaction = pool.transaction();
            _context6.prev = 4;
            _context6.next = 7;
            return transaction.begin();
          case 7:
            query = "Update PatientMedicine SET DosageDuration=NULL , DosageQuantity=NULL,DosageTime=NULL, MedicineID=NULL WHERE MedicineID=@id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context6.next = 11;
            return executeQuery(query, parameters, transaction);
          case 11:
            query = "DELETE FROM Medicine WHERE MedicineID=@id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context6.next = 15;
            return executeQuery(query, parameters, transaction);
          case 15:
            _context6.next = 17;
            return _this3.getAllMedicines(transaction);
          case 17:
            result = _context6.sent;
            _context6.next = 20;
            return transaction.commit();
          case 20:
            return _context6.abrupt("return", result);
          case 23:
            _context6.prev = 23;
            _context6.t0 = _context6["catch"](4);
            _context6.next = 27;
            return transaction.rollback();
          case 27:
            throw _context6.t0;
          case 28:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[4, 23]]);
    }))();
  }
};
module.exports = Medicine;