"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var doctor = require("../models/doctorModel");
var patient = require("../models/patientModel");
var treatment = require("../models/treatmentModel");
var hospital = require("../models/hospitalModel");
var Appointment = require("../models/appointmentModel");
var HospitalAdmin = require("../models/hospitalAdminModel");
var Department = require("../models/departmentModel");
var Hospital = require("../models/hospitalModel");
var Treatment = require("../models/treatmentModel");
var Medicine = require("../models/medicineModel");
var Invoice = require("../models/invoiceModel");
var Prescription = require("../models/prescriptionModel");
var view_doctorlist = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var UserID, doctors;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          UserID = req.user.UserID;
          if (!UserID) {
            _context.next = 7;
            break;
          }
          _context.next = 5;
          return doctor.getAllDoctors();
        case 5:
          doctors = _context.sent;
          res.status(200).json(doctors);
        case 7:
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            msg: _context.t0.message
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function view_doctorlist(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var view_patients = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var DoctorID, patients;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          DoctorID = req.user.DoctorID;
          _context2.next = 4;
          return patient.getAllPatients(DoctorID);
        case 4:
          patients = _context2.sent;
          res.status(200).json(patients);
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(400).json({
            msg: _context2.t0.message
          });
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function view_patients(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var view_treatments_doctor = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var DoctorID, patients;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          DoctorID = req.user.DoctorID;
          _context3.next = 4;
          return treatment.getAllTreatments(DoctorID);
        case 4:
          patients = _context3.sent;
          res.status(200).json(patients);
          _context3.next = 11;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            msg: _context3.t0.message
          });
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function view_treatments_doctor(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// const view_departments = async (req, res) => {
//   try {
//     const { AdminID } = req.user;
//     const departments = await admin.getAllDepartments(AdminID);
//     res.status(200).json(departments);
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };

var view_hospitals = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var UserID, hospitals;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          UserID = req.user.UserID;
          _context4.next = 4;
          return hospital.getAllHospital(UserID);
        case 4:
          hospitals = _context4.sent;
          res.status(200).json(hospitals);
          _context4.next = 11;
          break;
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json({
            msg: _context4.t0.message
          });
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function view_hospitals(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var view_doctor_vists = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var DoctorID, doctors;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          DoctorID = req.user.DoctorID;
          _context5.next = 4;
          return doctor.getVisite(DoctorID);
        case 4:
          doctors = _context5.sent;
          res.status(200).json(doctors);
          _context5.next = 11;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          res.status(400).json({
            msg: _context5.t0.message
          });
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return function view_doctor_vists(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var view_appointments = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var appointments, AdminID;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          AdminID = req.user.AdminID;
          if (!AdminID) {
            _context6.next = 7;
            break;
          }
          _context6.next = 5;
          return Appointment.getAllAppointments(AdminID);
        case 5:
          appointments = _context6.sent;
          res.status(200).json({
            success: "true",
            appointments: appointments
          });
        case 7:
          _context6.next = 12;
          break;
        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](0);
          res.status(400).json({
            success: "false",
            msg: _context6.t0.message
          });
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return function view_appointments(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var view_departments = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var departments, AdminID, _hospital, hospitalID;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          AdminID = req.user.AdminID;
          if (!AdminID) {
            _context7.next = 9;
            break;
          }
          _context7.next = 5;
          return Department.findHospitalID(AdminID);
        case 5:
          _hospital = _context7.sent;
          hospitalID = _hospital.HospitalID;
          _context7.next = 10;
          break;
        case 9:
          hospitalID = req.params.id;
        case 10:
          if (!hospitalID) {
            _context7.next = 15;
            break;
          }
          _context7.next = 13;
          return Department.getAllDepartments(hospitalID);
        case 13:
          departments = _context7.sent;
          res.status(200).json(departments);
        case 15:
          _context7.next = 20;
          break;
        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](0);
          res.status(400).json({
            success: "false",
            msg: _context7.t0.message
          });
        case 20:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 17]]);
  }));
  return function view_departments(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var view_treatments_hospital = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var AdminID, treatments, _hospital2;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          AdminID = req.user.AdminID;
          if (!AdminID) {
            _context8.next = 11;
            break;
          }
          _context8.next = 5;
          return Department.findHospitalID(AdminID);
        case 5:
          _hospital2 = _context8.sent;
          if (!_hospital2) {
            _context8.next = 11;
            break;
          }
          _context8.next = 9;
          return Treatment.getAllTreatmentsByHospitalAdmin(AdminID);
        case 9:
          treatments = _context8.sent;
          res.status(200).json({
            success: "true",
            treatments: treatments
          });
        case 11:
          _context8.next = 16;
          break;
        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](0);
          res.status(400).json({
            success: "false",
            msg: _context8.t0.message
          });
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 13]]);
  }));
  return function view_treatments_hospital(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var view_medicines = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var AdminID, medicines, _hospital3;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          AdminID = req.user.AdminID;
          if (!AdminID) {
            _context9.next = 11;
            break;
          }
          _context9.next = 5;
          return Department.findHospitalID(AdminID);
        case 5:
          _hospital3 = _context9.sent;
          if (!_hospital3) {
            _context9.next = 11;
            break;
          }
          _context9.next = 9;
          return Medicine.getAllMedicines();
        case 9:
          medicines = _context9.sent;
          res.status(200).json({
            success: "true",
            medicines: medicines
          });
        case 11:
          _context9.next = 16;
          break;
        case 13:
          _context9.prev = 13;
          _context9.t0 = _context9["catch"](0);
          res.status(400).json({
            success: "false",
            msg: _context9.t0.message
          });
        case 16:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 13]]);
  }));
  return function view_medicines(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var view_patients_admin = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var AdminID, patients;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          AdminID = req.user.AdminID;
          if (!AdminID) {
            _context10.next = 7;
            break;
          }
          _context10.next = 5;
          return patient.getAllPatientsByAdmin(AdminID);
        case 5:
          patients = _context10.sent;
          // res.status(200).json({ success: "true", patients });
          res.status(200).json(patients);
        case 7:
          _context10.next = 12;
          break;
        case 9:
          _context10.prev = 9;
          _context10.t0 = _context10["catch"](0);
          res.status(400).json({
            success: "false",
            msg: _context10.t0.message
          });
        case 12:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 9]]);
  }));
  return function view_patients_admin(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var view_popular_doctors = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var AdminID, doctors;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          AdminID = req.user.AdminID;
          if (!AdminID) {
            _context11.next = 7;
            break;
          }
          _context11.next = 5;
          return doctor.getPopularDoctors(AdminID);
        case 5:
          doctors = _context11.sent;
          res.status(200).json(doctors);
        case 7:
          _context11.next = 12;
          break;
        case 9:
          _context11.prev = 9;
          _context11.t0 = _context11["catch"](0);
          res.status(400).json({
            success: "false",
            msg: _context11.t0.message
          });
        case 12:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 9]]);
  }));
  return function view_popular_doctors(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
var view_unassigned_doctors = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var AdminID, doctors;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          AdminID = req.user.AdminID;
          if (!AdminID) {
            _context12.next = 7;
            break;
          }
          _context12.next = 5;
          return doctor.getUnassignedDoctors(AdminID);
        case 5:
          doctors = _context12.sent;
          res.status(200).json(doctors);
        case 7:
          _context12.next = 12;
          break;
        case 9:
          _context12.prev = 9;
          _context12.t0 = _context12["catch"](0);
          res.status(400).json({
            success: "false",
            msg: _context12.t0.message
          });
        case 12:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 9]]);
  }));
  return function view_unassigned_doctors(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
var view_invoices_admin = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var AdminID, invoices;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          AdminID = req.user.AdminID;
          if (!AdminID) {
            _context13.next = 7;
            break;
          }
          _context13.next = 5;
          return Invoice.getAllInvoicesAdmin(AdminID);
        case 5:
          invoices = _context13.sent;
          res.status(200).json(invoices);
        case 7:
          _context13.next = 12;
          break;
        case 9:
          _context13.prev = 9;
          _context13.t0 = _context13["catch"](0);
          res.status(400).json({
            success: "false",
            msg: _context13.t0.message
          });
        case 12:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[0, 9]]);
  }));
  return function view_invoices_admin(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
var view_doctors_admin = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var AdminID, doctors;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          AdminID = req.user.AdminID;
          if (!AdminID) {
            _context14.next = 7;
            break;
          }
          _context14.next = 5;
          return doctor.getAllDoctorsAdmin(AdminID);
        case 5:
          doctors = _context14.sent;
          res.status(200).json(doctors);
        case 7:
          _context14.next = 12;
          break;
        case 9:
          _context14.prev = 9;
          _context14.t0 = _context14["catch"](0);
          res.status(400).json({
            success: "false",
            msg: _context14.t0.message
          });
        case 12:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 9]]);
  }));
  return function view_doctors_admin(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
var view_prescriptions_admin = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var AdminID, prescriptions;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          AdminID = req.user.AdminID;
          if (!AdminID) {
            _context15.next = 7;
            break;
          }
          _context15.next = 5;
          return Prescription.getAllPrescriptions(AdminID);
        case 5:
          prescriptions = _context15.sent;
          res.status(200).json(prescriptions);
        case 7:
          _context15.next = 12;
          break;
        case 9:
          _context15.prev = 9;
          _context15.t0 = _context15["catch"](0);
          res.status(400).json({
            success: "false",
            msg: _context15.t0.message
          });
        case 12:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 9]]);
  }));
  return function view_prescriptions_admin(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();
var view_appointments_doctor = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var DoctorID, appointments;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          DoctorID = req.user.DoctorID;
          _context16.next = 4;
          return Appointment.getAllAppointmentsDoctor(DoctorID);
        case 4:
          appointments = _context16.sent;
          res.status(200).json(appointments);
          _context16.next = 11;
          break;
        case 8:
          _context16.prev = 8;
          _context16.t0 = _context16["catch"](0);
          res.status(400).json({
            msg: _context16.t0.message
          });
        case 11:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 8]]);
  }));
  return function view_appointments_doctor(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();
var view_all_hospitals = /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var hospitals;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return Hospital.getHospitals();
        case 3:
          hospitals = _context17.sent;
          res.status(200).json(hospitals);
          _context17.next = 10;
          break;
        case 7:
          _context17.prev = 7;
          _context17.t0 = _context17["catch"](0);
          res.status(400).json({
            msg: _context17.t0.message
          });
        case 10:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 7]]);
  }));
  return function view_all_hospitals(_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();
var view_doctors_patient = /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var PatientID, doctors;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          PatientID = req.user.PatientID;
          _context18.next = 4;
          return doctor.getAllDoctorsPatient(PatientID);
        case 4:
          doctors = _context18.sent;
          res.status(200).json(doctors);
          _context18.next = 11;
          break;
        case 8:
          _context18.prev = 8;
          _context18.t0 = _context18["catch"](0);
          res.status(400).json({
            msg: _context18.t0.message
          });
        case 11:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 8]]);
  }));
  return function view_doctors_patient(_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();
var view_prescriptions_patients = /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var PatientID, prescriptions;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          PatientID = req.user.PatientID;
          _context19.next = 4;
          return Prescription.getAllPrescriptionsPatient(PatientID);
        case 4:
          prescriptions = _context19.sent;
          res.status(200).json(prescriptions);
          _context19.next = 11;
          break;
        case 8:
          _context19.prev = 8;
          _context19.t0 = _context19["catch"](0);
          res.status(400).json({
            msg: _context19.t0.message
          });
        case 11:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 8]]);
  }));
  return function view_prescriptions_patients(_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}();
var view_invoices_patient = /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
    var PatientID, invoices;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          PatientID = req.user.PatientID;
          _context20.next = 4;
          return Invoice.getAllInvoicesPatient(PatientID);
        case 4:
          invoices = _context20.sent;
          res.status(200).json(invoices);
          _context20.next = 11;
          break;
        case 8:
          _context20.prev = 8;
          _context20.t0 = _context20["catch"](0);
          res.status(400).json({
            msg: _context20.t0.message
          });
        case 11:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[0, 8]]);
  }));
  return function view_invoices_patient(_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}();
var view_all_doctors_by_hospital = /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
    var PatientID, _hospital4, doctors, _hospital5;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          PatientID = req.user.PatientID;
          if (!PatientID) {
            _context21.next = 8;
            break;
          }
          _context21.next = 5;
          return Hospital.getHospitalByPatientID(PatientID);
        case 5:
          _hospital4 = _context21.sent;
          _context21.next = 11;
          break;
        case 8:
          _context21.next = 10;
          return doctor.getAllDoctorsByHospital(req.params.id);
        case 10:
          doctors = _context21.sent;
        case 11:
          if (!_hospital4) {
            _context21.next = 15;
            break;
          }
          _context21.next = 14;
          return doctor.getAllDoctorsByHospital((_hospital5 = _hospital4) === null || _hospital5 === void 0 ? void 0 : _hospital5.HospitalID);
        case 14:
          doctors = _context21.sent;
        case 15:
          res.status(200).json(doctors);
          _context21.next = 21;
          break;
        case 18:
          _context21.prev = 18;
          _context21.t0 = _context21["catch"](0);
          res.status(400).json({
            msg: _context21.t0.message
          });
        case 21:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[0, 18]]);
  }));
  return function view_all_doctors_by_hospital(_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}();
var view_all_admins = /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
    var admins;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          _context22.next = 3;
          return HospitalAdmin.getAllAdmins();
        case 3:
          admins = _context22.sent;
          res.status(200).json(admins);
          _context22.next = 10;
          break;
        case 7:
          _context22.prev = 7;
          _context22.t0 = _context22["catch"](0);
          res.status(400).json({
            msg: _context22.t0.message
          });
        case 10:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[0, 7]]);
  }));
  return function view_all_admins(_x43, _x44) {
    return _ref22.apply(this, arguments);
  };
}();
module.exports = {
  view_doctorlist: view_doctorlist,
  view_patients: view_patients,
  view_treatments_doctor: view_treatments_doctor,
  view_hospitals: view_hospitals,
  view_doctor_vists: view_doctor_vists,
  view_appointments: view_appointments,
  view_departments: view_departments,
  view_treatments_hospital: view_treatments_hospital,
  view_medicines: view_medicines,
  view_patients_admin: view_patients_admin,
  view_popular_doctors: view_popular_doctors,
  view_unassigned_doctors: view_unassigned_doctors,
  view_invoices_admin: view_invoices_admin,
  view_doctors_admin: view_doctors_admin,
  view_prescriptions_admin: view_prescriptions_admin,
  view_appointments_doctor: view_appointments_doctor,
  view_all_hospitals: view_all_hospitals,
  view_doctors_patient: view_doctors_patient,
  view_prescriptions_patients: view_prescriptions_patients,
  view_invoices_patient: view_invoices_patient,
  view_all_doctors_by_hospital: view_all_doctors_by_hospital,
  view_all_admins: view_all_admins
};