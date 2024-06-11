"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("../db/db"),
  getData = _require.getData;
var User = require("../models/userModel");
var Person = require("../models/personModel");
var sql = require("mssql");
var _require2 = require("./genericModel"),
  executeQuery = _require2.executeQuery;
var Patient = {
  findByUserId: function findByUserId(id, transaction) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            query = "SELECT * FROM Patient WHERE PatientID = @id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context.next = 5;
            return executeQuery(query, parameters, transaction);
          case 5:
            result = _context.sent;
            return _context.abrupt("return", result != null && result.length > 0 ? result[0] : null);
          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            throw _context.t0;
          case 12:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 9]]);
    }))();
  },
  editSymptom: function editSymptom(parameters, id, patientID) {
    var _this = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var pool, transaction, query, params, result;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getData();
          case 2:
            pool = _context2.sent;
            transaction = pool.transaction();
            _context2.prev = 4;
            _context2.next = 7;
            return transaction.begin();
          case 7:
            query = "UPDATE PatientSymptoms SET Description = COALESCE(@description,Description), SymptomName = COALESCE(@symptomName,SymptomName), DateRecorded = COALESCE(GETDATE(),DateRecorded)  WHERE SymptomID = @id";
            params = [{
              name: "id",
              type: sql.Int,
              value: id
            }, {
              name: "description",
              type: sql.VarChar,
              value: parameters.Description
            }, {
              name: "symptomName",
              type: sql.VarChar,
              value: parameters.SymptomName
            }];
            _context2.next = 11;
            return executeQuery(query, params, transaction);
          case 11:
            _context2.next = 13;
            return _this.getPatientSymptoms(patientID, transaction);
          case 13:
            result = _context2.sent;
            _context2.next = 16;
            return transaction.commit();
          case 16:
            return _context2.abrupt("return", result);
          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](4);
            _context2.next = 23;
            return transaction.rollback();
          case 23:
            throw _context2.t0;
          case 24:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[4, 19]]);
    }))();
  },
  getAllPatientsByAdmin: function getAllPatientsByAdmin(id) {
    var _arguments = arguments;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var transaction, query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            transaction = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : null;
            _context3.prev = 1;
            query = "SELECT Patient.PatientID,CONCAT (Person.FirstName,' ',Person.LastName) As [Full Name], Person.Contact, Person.Email, DATEDIFF(YEAR,Person.DateOfBirth,GETDATE()) As Age,Lookup.Value As Gender, Appointment.AppointmentDate AS [Visit Date] FROM Patient JOIN Person ON Patient.PatientID = Person.UserID JOIN Appointment ON Appointment.PatientID = Patient.PatientID JOIN Doctor ON Doctor.DoctorID = Appointment.DoctorID JOIN PatientSymptoms ON PatientSymptoms.PatientID= Patient.PatientId  JOIN DoctorDepartmentAssignment ON Doctor.DoctorID=DoctorDepartmentAssignment.DoctorID JOIN Department ON Department.DepartmentID = DoctorDepartmentAssignment.DepartmentID JOIN Hospital ON Hospital.HospitalID = Department.HospitalID  JOIN Lookup ON Lookup.Id = Person.Gender JOIN Admin ON Admin.AdminID = Hospital.AdminID Where Admin.AdminID=@id ;\n    ";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context3.next = 6;
            return executeQuery(query, parameters, transaction);
          case 6:
            result = _context3.sent;
            return _context3.abrupt("return", result);
          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](1);
            throw _context3.t0;
          case 13:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[1, 10]]);
    }))();
  },
  getAllPatientsByHospital: function getAllPatientsByHospital(id) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            query = "SELECT Person.UserID,CONCAT (Person.FirstName,' ',Person.LastName) As [Name],Person.Email,l.Value As Gender,Patient.* FROM Patient JOIN Person ON Patient.PatientID = Person.UserID  JOIN Lookup l ON l.Id = Person.Gender WHERE Patient.HospitalID=@hospitalID";
            parameters = [{
              name: "hospitalID",
              type: sql.Int,
              value: id
            }];
            _context4.next = 5;
            return executeQuery(query, parameters);
          case 5:
            result = _context4.sent;
            return _context4.abrupt("return", result);
          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            throw _context4.t0;
          case 12:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 9]]);
    }))();
  },
  findPatientSymptomById: function findPatientSymptomById(patientID, transaction) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            query = "SELECT * FROM Patient JOIN PatientSymptoms ON PatientSymptoms.PatientID= Patient.PatientID WHERE PatientSymptoms.SymptomID = @patientID";
            parameters = [{
              name: "patientID",
              type: sql.Int,
              value: patientID
            }];
            _context5.next = 5;
            return executeQuery(query, parameters, transaction);
          case 5:
            result = _context5.sent;
            return _context5.abrupt("return", result != null && result.length > 0 ? result[0] : null);
          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5["catch"](0);
            throw _context5.t0;
          case 12:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 9]]);
    }))();
  },
  getAllPatients: function getAllPatients(id) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            query = "SELECT Appointment.AppointmentDate,FORMAT(Appointment.AppointmentDate, 'hh:mm tt') AS [AppointmentTime],DATEDIFF(HOUR,GETDATE(),Appointment.AppointmentDate) AS [HourDifference], Patient.PatientID,CONCAT (Person.FirstName,' ',Person.LastName) As [Full Name],Person.Contact,Person.Email, DATEDIFF(YEAR,Person.DateOfBirth,GETDATE()) As Age,Lookup.Value As Gender, s.Value AS [Status]  FROM Patient JOIN Person ON Patient.PatientID = Person.UserID JOIN Appointment ON Appointment.PatientID = Patient.PatientID JOIN Doctor ON Doctor.DoctorID = Appointment.DoctorID JOIN Lookup ON Lookup.Id = Person.Gender JOIN Lookup s on s.Id = Appointment.AppointmentStatus Where Doctor.DoctorID=@id ;\n    ";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context6.next = 4;
            return executeQuery(query, parameters);
          case 4:
            result = _context6.sent;
            return _context6.abrupt("return", result);
          case 6:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }))();
  },
  getPatient: function getPatient(id) {
    var _arguments2 = arguments;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var transaction, query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            transaction = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : null;
            query = "  SELECT Patient.PatientID,Patient.Weight,Patient.BloodPressure,Patient.Height,Patient.Allergies,Patient.AliveStatus,Patient.BloodType,Patient.MedicalHistory,Patient.HospitalID, Person.*,PatientSymptoms.SymptomName,PatientSymptoms.SymptomID,PatientSymptoms.DateRecorded,PatientSymptoms.[Description],Users.Username,PrescrIption.Diagnosis,Prescription.TreatmentPlan,Prescription.PrescriptionID,Prescription.Advice,Prescription.CaseType,Prescription.DateStarted,Appointment.AppointmentDate,Appointment.DoctorID FROM Patient JOIN Person ON Person.UserID= Patient.PatientID JOIN PatientSymptoms ON PatientSymptoms.PatientID = Patient.PatientID JOIN Prescription ON Prescription.SymptomID = PatientSymptoms.SymptomID JOIN Appointment ON Appointment.PatientID = Patient.PatientID  JOIN Users ON Users.UserID = Patient.PatientID WHERE Patient.PatientID =@id AND Appointment.AppointmentStatus=18 ";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context7.next = 5;
            return executeQuery(query, parameters, transaction);
          case 5:
            result = _context7.sent;
            return _context7.abrupt("return", result);
          case 7:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))();
  },
  getPatientSymptoms: function getPatientSymptoms(id) {
    var _arguments3 = arguments;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var transaction, query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            transaction = _arguments3.length > 1 && _arguments3[1] !== undefined ? _arguments3[1] : null;
            query = "SELECT * FROM PatientSymptoms WHERE PatientID = @id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context8.next = 5;
            return executeQuery(query, parameters, transaction);
          case 5:
            result = _context8.sent;
            return _context8.abrupt("return", result);
          case 7:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }))();
  },
  editPatient: function editPatient(id, parameters) {
    var _this2 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      var pool, transaction, query, result;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return getData();
          case 2:
            pool = _context9.sent;
            transaction = pool.transaction();
            _context9.prev = 4;
            _context9.next = 7;
            return transaction.begin();
          case 7:
            query = "UPDATE Patient SET AliveStatus = COALESCE(@aliveStatus,AliveStatus), MedicalHistory = COALESCE(@medicalHistory,MedicalHistory),Weight=COALESCE(@weight,Weight), BloodPressure=COALESCE(@bloodPressure,BloodPressure),Height=COALESCE(@height,Height), Allergies=COALESCE(@allergies,Allergies), BloodType=COALESCE(@bloodType,BloodType) WHERE PatientID = @id";
            _context9.next = 10;
            return executeQuery(query, parameters, transaction);
          case 10:
            _context9.next = 12;
            return _this2.getPatient(id);
          case 12:
            result = _context9.sent;
            _context9.next = 15;
            return transaction.commit();
          case 15:
            return _context9.abrupt("return", result);
          case 18:
            _context9.prev = 18;
            _context9.t0 = _context9["catch"](4);
            _context9.next = 22;
            return transaction.rollback();
          case 22:
            throw _context9.t0;
          case 23:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[4, 18]]);
    }))();
  },
  getPatientByDepartment: function getPatientByDepartment(id) {
    var _arguments4 = arguments;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
      var transaction, query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            transaction = _arguments4.length > 1 && _arguments4[1] !== undefined ? _arguments4[1] : null;
            query = "SELECT Patient.PatientID,CONCAT (Person.FirstName,' ',Person.LastName) As [Full Name], Person.Contact, Person.Email, DATEDIFF(YEAR,Person.DateOfBirth,GETDATE()) As Age,Lookup.Value As Gender FROM Patient Join Person ON Patient.PatientID = Person.UserID JOIN Appointment ON Appointment.PatientID = Patient.PatientID JOIN Doctor ON Doctor.DoctorID = Appointment.DoctorID JOIN DoctorDepartmentAssignment ON Doctor.DoctorID=DoctorDepartmentAssignment.DoctorID JOIN Department ON Department.DepartmentID = DoctorDepartmentAssignment.DepartmentID  JOIN Lookup ON Lookup.Id = Person.Gender WHERE Department.DepartmentID = @id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context10.next = 5;
            return executeQuery(query, parameters, transaction);
          case 5:
            result = _context10.sent;
            return _context10.abrupt("return", result);
          case 7:
          case "end":
            return _context10.stop();
        }
      }, _callee10);
    }))();
  },
  register: function register(username, password, firstname, lastname, email, gender, dateofBirth, role, description, aliveStatus, medicalHistory, hospitalId) {
    var _this3 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
      var pool, transaction, user, userId, person, patient, personid, patientid, query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return getData();
          case 2:
            pool = _context11.sent;
            transaction = pool.transaction();
            _context11.prev = 4;
            _context11.next = 7;
            return transaction.begin();
          case 7:
            _context11.next = 9;
            return User.insertUser(username, password, role, transaction);
          case 9:
            user = _context11.sent;
            userId = user.UserID;
            _context11.next = 13;
            return Person.insertPerson(userId, firstname, lastname, email, dateofBirth, gender, transaction);
          case 13:
            person = _context11.sent;
            _context11.next = 16;
            return _this3.insertPatient(userId, aliveStatus, medicalHistory, hospitalId, transaction);
          case 16:
            patient = _context11.sent;
            personid = patient.PersonID;
            patientid = patient.PatientID;
            query = "SELECT Users.UserName, Users.UserID, Person.Email, CONCAT (Person.FirstName,' ',Person.LastName) AS Name, Patient.MedicalHistory, Patient.AliveStatus,PatientSymptoms.Description AS Symptoms FROM Patient JOIN Person ON Person.UserID = @personid JOIN Users ON Users.UserID = @userId LEFT JOIN PatientSymptoms ON PatientSymptoms.PatientID = @patientId WHERE Patient.PatientID=@patientid AND PatientSymptoms.PatientID=@patientid";
            parameters = [{
              name: "personid",
              type: sql.Int,
              value: personid
            }, {
              name: "userId",
              type: sql.Int,
              value: userId
            }, {
              name: "patientId",
              type: sql.Int,
              value: patientid
            }];
            _context11.next = 23;
            return executeQuery(query, parameters, transaction);
          case 23:
            result = _context11.sent;
            _context11.next = 26;
            return transaction.commit();
          case 26:
            return _context11.abrupt("return", result != null && result.length > 0 ? result[0] : null);
          case 29:
            _context11.prev = 29;
            _context11.t0 = _context11["catch"](4);
            _context11.next = 33;
            return transaction.rollback();
          case 33:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[4, 29]]);
    }))();
  },
  insertPatient: function insertPatient(personID, aliveStatus, medicalHistory, hospitalId, transaction) {
    var _this4 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            query = "INSERT INTO Patient (HospitalID,PatientID,AliveStatus,MedicalHistory) VALUES (@hospitalId,@personID,@aliveStatus,@medicalHistory)";
            parameters = [{
              name: "hospitalId",
              type: sql.Int,
              value: hospitalId
            }, {
              name: "personID",
              type: sql.Int,
              value: personID
            }, {
              name: "aliveStatus",
              type: sql.Int,
              value: aliveStatus
            }, {
              name: "medicalHistory",
              type: sql.VarChar,
              value: medicalHistory
            }];
            _context12.next = 5;
            return executeQuery(query, parameters, transaction);
          case 5:
            _context12.next = 7;
            return _this4.findByUserId(personID, transaction);
          case 7:
            result = _context12.sent;
            return _context12.abrupt("return", result);
          case 11:
            _context12.prev = 11;
            _context12.t0 = _context12["catch"](0);
            throw _context12.t0;
          case 14:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 11]]);
    }))();
  },
  insertPatientSymptoms: function insertPatientSymptoms(patientID, description, symptomName) {
    var _arguments5 = arguments,
      _this5 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
      var transaction, query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            transaction = _arguments5.length > 3 && _arguments5[3] !== undefined ? _arguments5[3] : null;
            _context13.prev = 1;
            query = "INSERT INTO PatientSymptoms (PatientID,SymptomName,Description,DateRecorded) VALUES (@patientID,@symptomName,@description,GETDATE())";
            parameters = [{
              name: "patientID",
              type: sql.Int,
              value: patientID
            }, {
              name: "description",
              type: sql.VarChar,
              value: description
            }, {
              name: "symptomName",
              type: sql.VarChar,
              value: symptomName
            }];
            _context13.next = 6;
            return executeQuery(query, parameters, transaction);
          case 6:
            _context13.next = 8;
            return _this5.getPatientSymptoms(patientID, transaction);
          case 8:
            result = _context13.sent;
            return _context13.abrupt("return", result);
          case 12:
            _context13.prev = 12;
            _context13.t0 = _context13["catch"](1);
            throw _context13.t0;
          case 15:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[1, 12]]);
    }))();
  },
  deletePatientSymptom: function deletePatientSymptom(id, patientID) {
    var _this6 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
      var pool, transaction, query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return getData();
          case 2:
            pool = _context14.sent;
            transaction = pool.transaction();
            _context14.prev = 4;
            _context14.next = 7;
            return transaction.begin();
          case 7:
            query = "DELETE FROM PatientSymptoms WHERE SymptomID = @id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context14.next = 11;
            return executeQuery(query, parameters, transaction);
          case 11:
            _context14.next = 13;
            return _this6.getPatientSymptoms(patientID, transaction);
          case 13:
            result = _context14.sent;
            _context14.next = 16;
            return transaction.commit();
          case 16:
            return _context14.abrupt("return", result);
          case 19:
            _context14.prev = 19;
            _context14.t0 = _context14["catch"](4);
            _context14.next = 23;
            return transaction.rollback();
          case 23:
            throw _context14.t0;
          case 24:
          case "end":
            return _context14.stop();
        }
      }, _callee14, null, [[4, 19]]);
    }))();
  },
  deletePatient: function deletePatient(id, adminID) {
    var _this7 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
      var pool, transaction, query, parameters, result, symptomIds, _iterator, _step, SymptomID, queryInvoices;
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return getData();
          case 2:
            pool = _context15.sent;
            transaction = pool.transaction();
            _context15.prev = 4;
            _context15.next = 7;
            return transaction.begin();
          case 7:
            // Delete appointments associated with the patient
            query = "DELETE FROM Appointment WHERE PatientID=@id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context15.next = 11;
            return executeQuery(query, parameters, transaction);
          case 11:
            // Get all symptom IDs associated with the patient
            query = "SELECT SymptomID FROM PatientSymptoms WHERE PatientID=@id";
            _context15.next = 14;
            return executeQuery(query, parameters, transaction);
          case 14:
            symptomIds = _context15.sent;
            // Delete prescriptions associated with each symptom of the patient
            _iterator = _createForOfIteratorHelper(symptomIds);
            _context15.prev = 16;
            _iterator.s();
          case 18:
            if ((_step = _iterator.n()).done) {
              _context15.next = 29;
              break;
            }
            SymptomID = _step.value.SymptomID;
            queryInvoices = "DELETE FROM Invoice WHERE InvoiceID IN (SELECT PrescriptionID FROM Prescription WHERE symptomId = @symptomId)";
            parameters = [{
              name: "symptomId",
              type: sql.Int,
              value: SymptomID
            }];
            _context15.next = 24;
            return executeQuery(queryInvoices, parameters, transaction);
          case 24:
            query = "DELETE FROM Prescription WHERE SymptomID=@symptomId";
            _context15.next = 27;
            return executeQuery(query, parameters, transaction);
          case 27:
            _context15.next = 18;
            break;
          case 29:
            _context15.next = 34;
            break;
          case 31:
            _context15.prev = 31;
            _context15.t0 = _context15["catch"](16);
            _iterator.e(_context15.t0);
          case 34:
            _context15.prev = 34;
            _iterator.f();
            return _context15.finish(34);
          case 37:
            // Now delete patient symptoms associated with the patient
            query = "DELETE FROM PatientSymptoms WHERE PatientID=@id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context15.next = 41;
            return executeQuery(query, parameters, transaction);
          case 41:
            query = "DELETE FROM Patient WHERE PatientID=@id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context15.next = 45;
            return executeQuery(query, parameters, transaction);
          case 45:
            query = "DELETE Person WHERE UserID=@id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context15.next = 49;
            return executeQuery(query, parameters, transaction);
          case 49:
            query = "DELETE Users WHERE UserID=@id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context15.next = 53;
            return executeQuery(query, parameters, transaction);
          case 53:
            _context15.next = 55;
            return _this7.getAllPatientsByAdmin(adminID, transaction);
          case 55:
            result = _context15.sent;
            _context15.next = 58;
            return transaction.commit();
          case 58:
            return _context15.abrupt("return", result);
          case 61:
            _context15.prev = 61;
            _context15.t1 = _context15["catch"](4);
            _context15.next = 65;
            return transaction.rollback();
          case 65:
            throw _context15.t1;
          case 66:
          case "end":
            return _context15.stop();
        }
      }, _callee15, null, [[4, 61], [16, 31, 34, 37]]);
    }))();
  }
};
module.exports = Patient;