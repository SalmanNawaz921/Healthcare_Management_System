"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var sql = require("mssql");
var _require = require("../db/db"),
  getData = _require.getData;
var User = require("./userModel");
var Person = require("./personModel");
var _require2 = require("./genericModel"),
  executeQuery = _require2.executeQuery;
var _require3 = require("../constants/constants"),
  doctorAttributes = _require3.doctorAttributes;
var Doctor = {
  findById: function findById(id, transaction) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            query = "SELECT * FROM Doctor WHERE DoctorID = @id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context.next = 4;
            return executeQuery(query, parameters, transaction);
          case 4:
            result = _context.sent;
            return _context.abrupt("return", result != null && result.length > 0 ? result[0] : null);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }))();
  },
  findDoctor: function findDoctor(id) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            query = "SELECT Users.Username, Doctor.* , Person.*, Appointment.AppointmentDate AS VisitDate FROM Doctor JOIN Appointment ON Appointment.DoctorID = Doctor.DoctorID JOIN Person ON Person.UserID = Doctor.DoctorID JOIN Users ON Users.UserID = Doctor.DoctorID WHERE Doctor.DoctorID=@doctorid";
            parameters = [{
              name: "doctorid",
              type: sql.Int,
              value: id
            }];
            _context2.next = 4;
            return executeQuery(query, parameters);
          case 4:
            result = _context2.sent;
            return _context2.abrupt("return", result != null && result.length > 0 ? result[0] : null);
          case 6:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }))();
  },
  getVisite: function getVisite(id) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            query = "SELECT Appointment.AppointmentDate AS VisitDate FROM Appointment JOIN Doctor ON Doctor.DoctorID = Appointment.DoctorID WHERE Doctor.DoctorID =@doctorid";
            parameters = [{
              name: "doctorid",
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
  findByUserId: function findByUserId(id) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            query = "SELECT * FROM Doctor Where DoctorID = @id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context4.next = 4;
            return executeQuery(query, parameters);
          case 4:
            result = _context4.sent;
            return _context4.abrupt("return", result != null && result.length > 0 ? result[0] : null);
          case 6:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    }))();
  },
  getAllDoctors: function getAllDoctors(id) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var query, result;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            query = "SELECT Doctor.DoctorID, CONCAT (Person.FirstName,' ',Person.LastName) As [Name],Person.Contact,Person.Email, DATEDIFF(YEAR,Person.DateOfBirth,GETDATE()) As Age,Lookup.Value As Gender,Doctor.Specialization, Doctor.Experience, Hospital.Name AS [Hospital Name] FROM Doctor JOIN Person ON Doctor.DoctorID = Person.UserID JOIN Hospital ON Hospital.HospitalID =Doctor.HospitalID JOIN Lookup ON Lookup.Id = Person.Gender;\n    ";
            _context5.next = 3;
            return executeQuery(query);
          case 3:
            result = _context5.sent;
            return _context5.abrupt("return", result);
          case 5:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }))();
  },
  getPopularDoctors: function getPopularDoctors(id) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            query = "SELECT CONCAT (P.FirstName,' ',P.LastName) AS [Name],D.Specialization,D.Experience,Dept.Name AS [Department Name],COUNT(A.DoctorID) AS TotalAppointments FROM Doctor D JOIN Person P ON D.DoctorID = P.UserID JOIN Appointment A ON A.DoctorID = D.DoctorID JOIN DoctorDepartmentAssignment DDA ON DDA.DoctorID = D.DoctorID JOIN Department Dept ON Dept.DepartmentID = DDA.DepartmentID JOIN Hospital H ON H.HospitalID = Dept.HospitalID JOIN Admin M ON M.AdminID = H.AdminID WHERE M.AdminID = @id GROUP BY D.DoctorID, P.FirstName, P.LastName,P.Email, P.DateOfBirth, D.Specialization, D.Experience,Dept.Name ORDER BY TotalAppointments DESC \n    ;\n    ";
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
  getUnassignedDoctors: function getUnassignedDoctors(adminID) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            query = "SELECT D.DoctorID,CONCAT (P.FirstName,' ',P.LastName) AS [Name], P.Email,DATEDIFF(YEAR, P.DateOfBirth, GETDATE()) AS Age,D.Specialization,D.Experience FROM Doctor D JOIN Person P ON D.DoctorID = P.UserID JOIN Hospital ON Hospital.HospitalID = D.HospitalID JOIN Admin ON Admin.AdminID = Hospital.AdminID  WHERE D.DoctorID NOT IN (SELECT DoctorID FROM DoctorDepartmentAssignment) AND Admin.AdminID=@adminID";
            parameters = [{
              name: "adminID",
              type: sql.Int,
              value: adminID
            }];
            _context7.next = 4;
            return executeQuery(query, parameters);
          case 4:
            result = _context7.sent;
            return _context7.abrupt("return", result);
          case 6:
          case "end":
            return _context7.stop();
        }
      }, _callee7);
    }))();
  },
  assignDoctor: function assignDoctor(doctorid, departmentid) {
    var _this = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            query = "INSERT INTO DoctorDepartmentAssignment (DoctorID,DepartmentID,DateAssigned) VALUES (@doctorid,@departmentid,GETDATE())";
            parameters = [{
              name: "doctorid",
              type: sql.Int,
              value: doctorid
            }, {
              name: "departmentid",
              type: sql.Int,
              value: departmentid
            }];
            _context8.next = 4;
            return executeQuery(query, parameters);
          case 4:
            _context8.next = 6;
            return _this.getUnassignedDoctors();
          case 6:
            result = _context8.sent;
            return _context8.abrupt("return", result);
          case 8:
          case "end":
            return _context8.stop();
        }
      }, _callee8);
    }))();
  },
  getAllDoctorsAdmin: function getAllDoctorsAdmin(adminID) {
    var _arguments = arguments;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
      var transaction, query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            transaction = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : null;
            query = "  SELECT Doctor.DoctorID,CONCAT (Person.FirstName,' ',Person.LastName) As [Name],Person.Email,l.Value As Gender,Doctor.Specialization, Department.Name As [DepartmenName], i.Value As Status,DoctorDepartmentAssignment.DateAssigned AS [Joining Date] FROM Doctor JOIN Person ON Doctor.DoctorID = Person.UserID JOIN DoctorDepartmentAssignment ON DoctorDepartmentAssignment.DoctorID = Doctor.DoctorID JOIN Department ON Department.DepartmentID = DoctorDepartmentAssignment.DepartmentID JOIN Hospital ON Hospital.HospitalID =Department.HospitalID JOIN Lookup l ON l.Id = Person.Gender JOIN Lookup i ON i.Id= Doctor.Checkupstatus ".concat(adminID ? "JOIN Admin ON Admin.AdminID = Hospital.AdminID Where Admin.AdminID=@id" : "", ";\n    ");
            parameters = adminID ? [{
              name: "id",
              type: sql.Int,
              value: adminID
            }] : null;
            _context9.next = 5;
            return executeQuery(query, parameters, transaction);
          case 5:
            result = _context9.sent;
            return _context9.abrupt("return", result);
          case 7:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }))();
  },
  getAllDoctorsPatient: function getAllDoctorsPatient(patientID) {
    var _arguments2 = arguments;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
      var transaction, query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            transaction = _arguments2.length > 1 && _arguments2[1] !== undefined ? _arguments2[1] : null;
            query = "SELECT Appointment.AppointmentID,Appointment.AppointmentDate,FORMAT(Appointment.AppointmentDate, 'hh:mm tt') AS [AppointmentTime],DATEDIFF(HOUR,GETDATE(),Appointment.AppointmentDate) AS [HourDifference],CONCAT (Person.FirstName,' ',Person.LastName) As [Full Name],Person.Contact,Person.Email,l.Value As Gender, s.Value AS [AppointmentStatus] FROM Patient JOIN Appointment ON Appointment.PatientID = Patient.PatientID JOIN DOCTOR ON Doctor.DoctorID = Appointment.DoctorID JOIN Person ON Doctor.DoctorID = Person.UserID JOIN Hospital ON Hospital.HospitalID =Patient.HospitalID JOIN Lookup l ON l.Id = Person.Gender JOIN Lookup s on s.Id = Appointment.AppointmentStatus  Where Patient.PatientID=@patientID ;\n    ";
            parameters = [{
              name: "patientID",
              type: sql.Int,
              value: patientID
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
  getDoctorsEarnings: function getDoctorsEarnings(adminID) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            query = "  SELECT  CONCAT (D.FirstName,' ',D.LastName) As Name , SUM(Invoice.TotalAmount) AS Earnings FROM Doctor JOIN Person D ON D.UserID = Doctor.DoctorID  JOIN Prescription ON Prescription.DoctorID = Doctor.DoctorID JOIN Invoice ON Invoice.InvoiceID = Prescription.PrescriptionID JOIN Hospital ON Hospital.HospitalID = Doctor.HospitalID JOIN Admin ON Admin.AdminID = Hospital.AdminID WHERE Admin.AdminID = @adminID GROUP BY D.FirstName ,D.LastName";
            parameters = [{
              name: "adminID",
              type: sql.Int,
              value: adminID
            }];
            _context11.next = 5;
            return executeQuery(query, parameters);
          case 5:
            result = _context11.sent;
            return _context11.abrupt("return", result);
          case 9:
            _context11.prev = 9;
            _context11.t0 = _context11["catch"](0);
            throw _context11.t0;
          case 12:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 9]]);
    }))();
  },
  getAllDoctorsByHospital: function getAllDoctorsByHospital(hospitalID) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            query = " SELECT Doctor.DoctorID,CONCAT (Person.FirstName,' ',Person.LastName) As [Name],Person.Email,l.Value As Gender,Doctor.Specialization, i.Value As Status FROM Doctor JOIN Person ON Doctor.DoctorID = Person.UserID  JOIN Lookup l ON l.Id = Person.Gender JOIN Lookup i ON i.Id= Doctor.Checkupstatus WHERE Doctor.HospitalID=@hospitalID ;";
            parameters = [{
              name: "hospitalID",
              type: sql.Int,
              value: hospitalID
            }];
            _context12.next = 4;
            return executeQuery(query, parameters);
          case 4:
            result = _context12.sent;
            return _context12.abrupt("return", result);
          case 6:
          case "end":
            return _context12.stop();
        }
      }, _callee12);
    }))();
  },
  getDoctorsByDepartment: function getDoctorsByDepartment(departmentID) {
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            query = "SELECT Doctor.DoctorID,CONCAT (Person.FirstName,' ',Person.LastName) As [Name],Person.Email,l.Value As Gender,Doctor.Specialization, i.Value As Status FROM Doctor JOIN Person ON Doctor.DoctorID = Person.UserID  JOIN Lookup l ON l.Id = Person.Gender JOIN Lookup i ON i.Id= Doctor.Checkupstatus  WHERE Doctor.DoctorID IN (SELECT DoctorID FROM DoctorDepartmentAssignment WHERE DepartmentID=@departmentID)";
            parameters = [{
              name: "departmentID",
              type: sql.Int,
              value: departmentID
            }];
            _context13.next = 4;
            return executeQuery(query, parameters);
          case 4:
            result = _context13.sent;
            return _context13.abrupt("return", result);
          case 6:
          case "end":
            return _context13.stop();
        }
      }, _callee13);
    }))();
  },
  register: function register(username, password, firstname, lastname, email, gender, dateofBirth, role, qualification, specialization, experience, checkupstatus, consulationfee, hospitalID) {
    var _this2 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14() {
      var pool, transaction, user, userId, person, personId, doctor, doctorId, query, parameters, result;
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
            _context14.next = 9;
            return User.insertUser(username, password, role, transaction);
          case 9:
            user = _context14.sent;
            userId = user.UserID;
            _context14.next = 13;
            return Person.insertPerson(userId, firstname, lastname, email, dateofBirth, gender, transaction);
          case 13:
            person = _context14.sent;
            personId = person.UserID;
            _context14.next = 17;
            return _this2.insertDoctor(qualification, specialization, experience, checkupstatus, consulationfee, personId, hospitalID, transaction);
          case 17:
            doctor = _context14.sent;
            doctorId = doctor.DoctorID;
            query = "SELECT Users.UserName, Users.UserID, Person.Email, CONCAT (Person.FirstName,' ',Person.LastName) AS Name, Doctor.Qualification, Doctor.Specialization, Doctor.Experience, Doctor.CheckupStatus, Doctor.ConsultationFee FROM Doctor JOIN Person ON Person.UserID = @personid JOIN Users ON Users.UserID = @userId WHERE Doctor.DoctorID=@doctorid";
            parameters = [{
              name: "personid",
              type: sql.Int,
              value: personId
            }, {
              name: "userId",
              type: sql.Int,
              value: userId
            }, {
              name: "doctorid",
              type: sql.Int,
              value: doctorId
            }];
            _context14.next = 23;
            return executeQuery(query, parameters, transaction);
          case 23:
            result = _context14.sent;
            _context14.next = 26;
            return transaction.commit();
          case 26:
            return _context14.abrupt("return", result != null && result.length > 0 ? result : null);
          case 29:
            _context14.prev = 29;
            _context14.t0 = _context14["catch"](4);
            _context14.next = 33;
            return transaction.rollback();
          case 33:
            throw _context14.t0;
          case 34:
          case "end":
            return _context14.stop();
        }
      }, _callee14, null, [[4, 29]]);
    }))();
  },
  insertDoctor: function insertDoctor(qualification, specialization, experience, checkupstatus, consulationfee, doctorId, hospitalID, transaction) {
    var _this3 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15() {
      var query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            query = "INSERT INTO Doctor (HospitalID,Qualification,Specialization,Experience,CheckupStatus,ConsultationFee,DoctorID) VALUES (@hospitalID,@qualification,@specialization,@experience,@checkupstatus,@consulationfee,@doctorId)";
            parameters = [{
              name: "qualification",
              type: sql.VarChar,
              value: qualification
            }, {
              name: "specialization",
              type: sql.VarChar,
              value: specialization
            }, {
              name: "experience",
              type: sql.Int,
              value: experience
            }, {
              name: "checkupstatus",
              type: sql.Int,
              value: checkupstatus
            }, {
              name: "consulationfee",
              type: sql.Decimal,
              value: consulationfee
            }, {
              name: "hospitalID",
              type: sql.Int,
              value: hospitalID
            }];
            parameters.push({
              name: "doctorId",
              type: sql.Int,
              value: doctorId
            });
            _context15.next = 6;
            return executeQuery(query, parameters, transaction);
          case 6:
            _context15.next = 8;
            return _this3.findById(doctorId, transaction);
          case 8:
            result = _context15.sent;
            return _context15.abrupt("return", result);
          case 12:
            _context15.prev = 12;
            _context15.t0 = _context15["catch"](0);
            throw _context15.t0;
          case 15:
          case "end":
            return _context15.stop();
        }
      }, _callee15, null, [[0, 12]]);
    }))();
  },
  updateDoctor: function updateDoctor(doctorid, params) {
    var _this4 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
      var pool, transaction, query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee16$(_context16) {
        while (1) switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return getData();
          case 2:
            pool = _context16.sent;
            transaction = pool.transaction();
            _context16.prev = 4;
            _context16.next = 7;
            return transaction.begin();
          case 7:
            query = "UPDATE Doctor SET Qualification=COALESCE(@qualification,Qualification),Specialization=COALESCE(@specialization,Specialization),Experience=COALESCE(@experience,Experience),CheckupStatus=COALESCE(@checkupstatus,CheckupStatus),ConsultationFee=COALESCE(@consulationfee,ConsultationFee) WHERE DoctorID=@doctorid";
            parameters = doctorAttributes(params);
            parameters.push({
              name: "doctorid",
              type: sql.Int,
              value: doctorid
            });
            _context16.next = 12;
            return executeQuery(query, parameters, transaction);
          case 12:
            _context16.next = 14;
            return _this4.findById(params.doctorid, transaction);
          case 14:
            result = _context16.sent;
            _context16.next = 17;
            return transaction.commit();
          case 17:
            return _context16.abrupt("return", result);
          case 20:
            _context16.prev = 20;
            _context16.t0 = _context16["catch"](4);
            _context16.next = 24;
            return transaction.rollback();
          case 24:
            throw _context16.t0;
          case 25:
          case "end":
            return _context16.stop();
        }
      }, _callee16, null, [[4, 20]]);
    }))();
  },
  deleteDoctor: function deleteDoctor(id, adminID) {
    var _this5 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17() {
      var pool, transaction, query, parameters, result;
      return _regeneratorRuntime().wrap(function _callee17$(_context17) {
        while (1) switch (_context17.prev = _context17.next) {
          case 0:
            _context17.next = 2;
            return getData();
          case 2:
            pool = _context17.sent;
            transaction = pool.transaction();
            _context17.prev = 4;
            _context17.next = 7;
            return transaction.begin();
          case 7:
            query = "Update Prescription SET DoctorID=NULL WHERE DoctorID=@id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context17.next = 11;
            return executeQuery(query, parameters, transaction);
          case 11:
            query = "DELETE DoctorDepartmentAssignment WHERE DoctorID=@id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context17.next = 15;
            return executeQuery(query, parameters, transaction);
          case 15:
            query = "DELETE Appointment WHERE DoctorID=@id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context17.next = 19;
            return executeQuery(query, parameters, transaction);
          case 19:
            query = "DELETE FROM Doctor WHERE DoctorID = @id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context17.next = 23;
            return executeQuery(query, parameters, transaction);
          case 23:
            query = "DELETE Person WHERE UserID=@id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context17.next = 27;
            return executeQuery(query, parameters, transaction);
          case 27:
            query = "DELETE Users WHERE UserID=@id";
            parameters = [{
              name: "id",
              type: sql.Int,
              value: id
            }];
            _context17.next = 31;
            return executeQuery(query, parameters, transaction);
          case 31:
            _context17.next = 33;
            return _this5.getAllDoctorsAdmin(adminID, transaction);
          case 33:
            result = _context17.sent;
            _context17.next = 36;
            return transaction.commit();
          case 36:
            return _context17.abrupt("return", true);
          case 39:
            _context17.prev = 39;
            _context17.t0 = _context17["catch"](4);
            _context17.next = 43;
            return transaction.rollback();
          case 43:
            throw _context17.t0;
          case 44:
          case "end":
            return _context17.stop();
        }
      }, _callee17, null, [[4, 39]]);
    }))();
  }
};
module.exports = Doctor;