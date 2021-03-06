/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@tensorflow/tfjs-core')) :
    typeof define === 'function' && define.amd ? define(['exports', '@tensorflow/tfjs-core'], factory) :
    (factory((global.tf = global.tf || {}),global.tf));
}(this, (function (exports,tfc) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var _epsilon = tfc.ENV.get('EPSILON');
    function epsilon() {
        return _epsilon;
    }
    function imageDataFormat() {
        return 'channelsLast';
    }

    var _nextUniqueTensorId = 0;
    function getNextUniqueTensorId() {
        return _nextUniqueTensorId++;
    }
    var _uidPrefixes = {};
    function getUid(prefix) {
        if (prefix === void 0) { prefix = ''; }
        if (!(prefix in _uidPrefixes)) {
            _uidPrefixes[prefix] = 0;
        }
        _uidPrefixes[prefix] += 1;
        return prefix + _uidPrefixes[prefix].toString();
    }
    var scalarCache = {
        float32: {},
        int32: {}
    };
    var DEFAULT_DTYPE = 'float32';
    function getScalar(value, dtype) {
        if (dtype === undefined) {
            dtype = DEFAULT_DTYPE;
        }
        if (scalarCache[dtype][value] == null) {
            scalarCache[dtype][value] = tfc.scalar(value, dtype);
            tfc.keep(scalarCache[dtype][value]);
        }
        return scalarCache[dtype][value];
    }

    var AttributeError = (function (_super) {
        __extends(AttributeError, _super);
        function AttributeError(message) {
            var _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, AttributeError.prototype);
            return _this;
        }
        return AttributeError;
    }(Error));
    var RuntimeError = (function (_super) {
        __extends(RuntimeError, _super);
        function RuntimeError(message) {
            var _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, RuntimeError.prototype);
            return _this;
        }
        return RuntimeError;
    }(Error));
    var ValueError = (function (_super) {
        __extends(ValueError, _super);
        function ValueError(message) {
            var _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, ValueError.prototype);
            return _this;
        }
        return ValueError;
    }(Error));
    var NotImplementedError = (function (_super) {
        __extends(NotImplementedError, _super);
        function NotImplementedError(message) {
            var _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, NotImplementedError.prototype);
            return _this;
        }
        return NotImplementedError;
    }(Error));
    var AssertionError = (function (_super) {
        __extends(AssertionError, _super);
        function AssertionError(message) {
            var _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, AssertionError.prototype);
            return _this;
        }
        return AssertionError;
    }(Error));
    var IndexError = (function (_super) {
        __extends(IndexError, _super);
        function IndexError(message) {
            var _this = _super.call(this, message) || this;
            Object.setPrototypeOf(_this, IndexError.prototype);
            return _this;
        }
        return IndexError;
    }(Error));

    function pyListRepeat(value, numValues) {
        if (Array.isArray(value)) {
            var newArray = [];
            for (var i = 0; i < numValues; i++) {
                newArray = newArray.concat(value);
            }
            return newArray;
        }
        else {
            var newArray = new Array(numValues);
            newArray.fill(value);
            return newArray;
        }
    }
    function assert(val, message) {
        if (!val) {
            throw new AssertionError(message);
        }
    }
    function count(array, refernce) {
        var counter = 0;
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var item = array_1[_i];
            if (item === refernce) {
                counter++;
            }
        }
        return counter;
    }
    function singletonOrArray(xs) {
        if (xs.length === 1) {
            return xs[0];
        }
        return xs;
    }
    function toList(x) {
        if (Array.isArray(x)) {
            return x;
        }
        return [x];
    }
    function toSnakeCase(name) {
        var intermediate = name.replace(/(.)([A-Z][a-z0-9]+)/g, '$1_$2');
        var insecure = intermediate.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
        if (insecure[0] !== '_') {
            return insecure;
        }
        return 'private' + insecure;
    }
    function toCamelCase(identifier) {
        if (identifier.length <= 1) {
            return identifier;
        }
        if (identifier.indexOf('_') === -1) {
            return identifier;
        }
        return identifier.replace(/[_]+(\w|$)/g, function (m, p1) { return p1.toUpperCase(); });
    }
    var _GLOBAL_CUSTOM_OBJECTS = {};
    function serializeKerasObject(instance) {
        if (instance === null || instance === undefined) {
            return null;
        }
        return { className: instance.getClassName(), config: instance.getConfig() };
    }
    function deserializeKerasObject(identifier, moduleObjects, customObjects, printableModuleName) {
        if (moduleObjects === void 0) { moduleObjects = {}; }
        if (customObjects === void 0) { customObjects = {}; }
        if (printableModuleName === void 0) { printableModuleName = 'object'; }
        if (typeof identifier === 'string') {
            var functionName = identifier;
            var fn = void 0;
            if (functionName in customObjects) {
                fn = customObjects[functionName];
            }
            else if (functionName in _GLOBAL_CUSTOM_OBJECTS) {
                fn = _GLOBAL_CUSTOM_OBJECTS[functionName];
            }
            else {
                fn = moduleObjects[functionName];
                if (fn == null) {
                    throw new ValueError("Unknown " + printableModuleName + ": " + identifier + ". " +
                        "This may be due to one of the following reasons:\n" +
                        ("1. The " + printableModuleName + " is defined in Python, in which ") +
                        "case it needs to be ported to TensorFlow.js or your JavaScript " +
                        "code.\n" +
                        ("2. The custom " + printableModuleName + " is defined in JavaScript, ") +
                        "but is not registered properly with " +
                        "tf.serialization.registerClass().");
                }
            }
            return fn;
        }
        else {
            var config = identifier;
            if (config.className == null || config.config == null) {
                throw new ValueError(printableModuleName + ": Improper config format: " +
                    (JSON.stringify(config) + ".\n") +
                    "'className' and 'config' must set.");
            }
            var className = config.className;
            var cls = void 0, fromConfig = void 0;
            if (className in customObjects) {
                _a = customObjects.get(className), cls = _a[0], fromConfig = _a[1];
            }
            else if (className in _GLOBAL_CUSTOM_OBJECTS) {
                _b = _GLOBAL_CUSTOM_OBJECTS.className, cls = _b[0], fromConfig = _b[1];
            }
            else if (className in moduleObjects) {
                _c = moduleObjects[className], cls = _c[0], fromConfig = _c[1];
            }
            if (cls == null) {
                throw new ValueError("Unknown " + printableModuleName + ": " + className + ". " +
                    "This may be due to one of the following reasons:\n" +
                    ("1. The " + printableModuleName + " is defined in Python, in which ") +
                    "case it needs to be ported to TensorFlow.js or your JavaScript " +
                    "code.\n" +
                    ("2. The custom " + printableModuleName + " is defined in JavaScript, ") +
                    "but is not registered properly with " +
                    "tf.serialization.registerClass().");
            }
            if (fromConfig != null) {
                var customObjectsCombined = {};
                for (var _i = 0, _d = Object.keys(_GLOBAL_CUSTOM_OBJECTS); _i < _d.length; _i++) {
                    var key = _d[_i];
                    customObjectsCombined[key] = _GLOBAL_CUSTOM_OBJECTS[key];
                }
                for (var _e = 0, _f = Object.keys(customObjects); _e < _f.length; _e++) {
                    var key = _f[_e];
                    customObjectsCombined[key] = customObjects[key];
                }
                var nestedConfig = config.config;
                nestedConfig.customObjects = customObjectsCombined;
                var backupCustomObjects = __assign({}, _GLOBAL_CUSTOM_OBJECTS);
                for (var _g = 0, _h = Object.keys(customObjects); _g < _h.length; _g++) {
                    var key = _h[_g];
                    _GLOBAL_CUSTOM_OBJECTS[key] = customObjects[key];
                }
                var returnObj = fromConfig(cls, config.config);
                _GLOBAL_CUSTOM_OBJECTS = __assign({}, backupCustomObjects);
                return returnObj;
            }
            else {
                var backupCustomObjects = __assign({}, _GLOBAL_CUSTOM_OBJECTS);
                for (var _j = 0, _k = Object.keys(customObjects); _j < _k.length; _j++) {
                    var key = _k[_j];
                    _GLOBAL_CUSTOM_OBJECTS[key] = customObjects[key];
                }
                var returnObj = new cls(config.config);
                _GLOBAL_CUSTOM_OBJECTS = __assign({}, backupCustomObjects);
                return returnObj;
            }
        }
        var _a, _b, _c;
    }
    function numberCompare(a, b) {
        return (a < b) ? -1 : ((a > b) ? 1 : 0);
    }
    function reverseNumberCompare(a, b) {
        return -1 * numberCompare(a, b);
    }
    function stringToDType(dtype) {
        switch (dtype) {
            case 'float32':
                return 'float32';
            default:
                throw new ValueError("Invalid dtype: " + dtype);
        }
    }
    function unique(xs) {
        if (xs == null) {
            return xs;
        }
        var out = [];
        for (var _i = 0, xs_1 = xs; _i < xs_1.length; _i++) {
            var x = xs_1[_i];
            if (out.indexOf(x) === -1) {
                out.push(x);
            }
        }
        return out;
    }
    function isObjectEmpty(obj) {
        if (obj == null) {
            throw new ValueError("Invalid value in obj: " + JSON.stringify(obj));
        }
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    function checkStringTypeUnionValue(values, label, value) {
        if (value == null) {
            return;
        }
        if (values.indexOf(value) < 0) {
            throw new ValueError(value + " is not a valid " + label + ".  Valid values are " + values + " or null/undefined.");
        }
    }
    function checkArrayTypeAndLength(x, expectedType, minLength, maxLength) {
        if (minLength === void 0) { minLength = 0; }
        if (maxLength === void 0) { maxLength = Infinity; }
        assert(minLength >= 0);
        assert(maxLength >= minLength);
        return (Array.isArray(x) && x.length >= minLength && x.length <= maxLength &&
            x.every(function (e) { return typeof e === expectedType; }));
    }

    function calcL2Norms(w, axis) {
        return tfc.tidy(function () { return tfc.sqrt(tfc.sum(tfc.mulStrict(w, w), axis, true)); });
    }
    var Constraint = (function (_super) {
        __extends(Constraint, _super);
        function Constraint() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Constraint.prototype.getConfig = function () {
            return {};
        };
        return Constraint;
    }(tfc.serialization.Serializable));
    var MaxNorm = (function (_super) {
        __extends(MaxNorm, _super);
        function MaxNorm(config) {
            var _this = _super.call(this) || this;
            _this.defaultMaxValue = 2;
            _this.defaultAxis = 0;
            _this.maxValue =
                config.maxValue != null ? config.maxValue : _this.defaultMaxValue;
            _this.axis = config.axis != null ? config.axis : _this.defaultAxis;
            return _this;
        }
        MaxNorm.prototype.apply = function (w) {
            var _this = this;
            return tfc.tidy(function () {
                var norms = calcL2Norms(w, _this.axis);
                var desired = tfc.clipByValue(norms, 0, _this.maxValue);
                return tfc.mul(w, tfc.div(desired, tfc.add(getScalar(epsilon()), norms)));
            });
        };
        MaxNorm.prototype.getConfig = function () {
            return { maxValue: this.maxValue, axis: this.axis };
        };
        MaxNorm.className = 'MaxNorm';
        return MaxNorm;
    }(Constraint));
    tfc.serialization.registerClass(MaxNorm);
    var UnitNorm = (function (_super) {
        __extends(UnitNorm, _super);
        function UnitNorm(config) {
            var _this = _super.call(this) || this;
            _this.defaultAxis = 0;
            _this.axis = config.axis != null ? config.axis : _this.defaultAxis;
            return _this;
        }
        UnitNorm.prototype.apply = function (w) {
            var _this = this;
            return tfc.tidy(function () { return tfc.div(w, tfc.add(getScalar(epsilon()), calcL2Norms(w, _this.axis))); });
        };
        UnitNorm.prototype.getConfig = function () {
            return { axis: this.axis };
        };
        UnitNorm.className = 'UnitNorm';
        return UnitNorm;
    }(Constraint));
    tfc.serialization.registerClass(UnitNorm);
    var NonNeg = (function (_super) {
        __extends(NonNeg, _super);
        function NonNeg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NonNeg.prototype.apply = function (w) {
            return tfc.relu(w);
        };
        NonNeg.className = 'NonNeg';
        return NonNeg;
    }(Constraint));
    tfc.serialization.registerClass(NonNeg);
    var MinMaxNorm = (function (_super) {
        __extends(MinMaxNorm, _super);
        function MinMaxNorm(config) {
            var _this = _super.call(this) || this;
            _this.defaultMinValue = 0.0;
            _this.defaultMaxValue = 1.0;
            _this.defaultRate = 1.0;
            _this.defaultAxis = 0;
            _this.minValue =
                config.minValue != null ? config.minValue : _this.defaultMinValue;
            _this.maxValue =
                config.maxValue != null ? config.maxValue : _this.defaultMaxValue;
            _this.rate = config.rate != null ? config.rate : _this.defaultRate;
            _this.axis = config.axis != null ? config.axis : _this.defaultAxis;
            return _this;
        }
        MinMaxNorm.prototype.apply = function (w) {
            var _this = this;
            return tfc.tidy(function () {
                var norms = calcL2Norms(w, _this.axis);
                var desired = tfc.add(tfc.mul(getScalar(_this.rate), tfc.clipByValue(norms, _this.minValue, _this.maxValue)), tfc.mul(getScalar(1.0 - _this.rate), norms));
                return tfc.mul(w, tfc.div(desired, tfc.add(getScalar(epsilon()), norms)));
            });
        };
        MinMaxNorm.prototype.getConfig = function () {
            return {
                minValue: this.minValue,
                maxValue: this.maxValue,
                rate: this.rate,
                axis: this.axis
            };
        };
        MinMaxNorm.className = 'MinMaxNorm';
        return MinMaxNorm;
    }(Constraint));
    tfc.serialization.registerClass(MinMaxNorm);
    var CONSTRAINT_IDENTIFIER_REGISTRY_SYMBOL_MAP = {
        'maxNorm': 'MaxNorm',
        'minMaxNorm': 'MinMaxNorm',
        'nonNeg': 'NonNeg',
        'unitNorm': 'UnitNorm'
    };
    function serializeConstraint(constraint) {
        return serializeKerasObject(constraint);
    }
    function deserializeConstraint(config, customObjects) {
        if (customObjects === void 0) { customObjects = {}; }
        return deserializeKerasObject(config, tfc.serialization.SerializationMap.getMap().classNameMap, customObjects, 'constraint');
    }
    function getConstraint(identifier) {
        if (identifier == null) {
            return null;
        }
        if (typeof identifier === 'string') {
            var className = identifier in CONSTRAINT_IDENTIFIER_REGISTRY_SYMBOL_MAP ?
                CONSTRAINT_IDENTIFIER_REGISTRY_SYMBOL_MAP[identifier] :
                identifier;
            var config = { className: className, config: {} };
            return deserializeConstraint(config);
        }
        else if (identifier instanceof Constraint) {
            return identifier;
        }
        else {
            return deserializeConstraint(identifier);
        }
    }

    function maxNorm(config) {
        return new MaxNorm(config);
    }
    function unitNorm(config) {
        return new UnitNorm(config);
    }
    function nonNeg() {
        return new NonNeg();
    }
    function minMaxNorm(config) {
        return new MinMaxNorm(config);
    }

    var exports_constraints = /*#__PURE__*/Object.freeze({
        maxNorm: maxNorm,
        unitNorm: unitNorm,
        nonNeg: nonNeg,
        minMaxNorm: minMaxNorm
    });

    var nameMap = new Map();
    var VALID_DATA_FORMAT_VALUES = ['channelsFirst', 'channelsLast'];
    function checkDataFormat(value) {
        checkStringTypeUnionValue(VALID_DATA_FORMAT_VALUES, 'DataFormat', value);
    }
    var VALID_PADDING_MODE_VALUES = ['valid', 'same', 'causal'];
    function checkPaddingMode(value) {
        checkStringTypeUnionValue(VALID_PADDING_MODE_VALUES, 'PaddingMode', value);
    }
    var VALID_POOL_MODE_VALUES = ['max', 'avg'];
    function checkPoolMode(value) {
        checkStringTypeUnionValue(VALID_POOL_MODE_VALUES, 'PoolMode', value);
    }
    var _nameScopeStack = [];
    var _nameScopeDivider = '/';
    function nameScope(name, fn) {
        _nameScopeStack.push(name);
        try {
            var val = fn();
            _nameScopeStack.pop();
            return val;
        }
        catch (e) {
            _nameScopeStack.pop();
            throw e;
        }
    }
    function currentNameScopePrefix() {
        if (_nameScopeStack.length === 0) {
            return '';
        }
        else {
            return _nameScopeStack.join(_nameScopeDivider) + _nameScopeDivider;
        }
    }
    function getScopedTensorName(tensorName) {
        if (!isValidTensorName(tensorName)) {
            throw new Error('Not a valid tensor name: \'' + tensorName + '\'');
        }
        return currentNameScopePrefix() + tensorName;
    }
    function getUniqueTensorName(scopedName) {
        if (!isValidTensorName(scopedName)) {
            throw new Error('Not a valid tensor name: \'' + scopedName + '\'');
        }
        if (!nameMap.has(scopedName)) {
            nameMap.set(scopedName, 0);
        }
        var index = nameMap.get(scopedName);
        nameMap.set(scopedName, nameMap.get(scopedName) + 1);
        if (index > 0) {
            var result = scopedName + '_' + index;
            nameMap.set(result, 1);
            return result;
        }
        else {
            return scopedName;
        }
    }
    var tensorNameRegex = new RegExp(/^[A-Za-z][-A-Za-z0-9\._\/]*$/);
    function isValidTensorName(name) {
        return name.match(tensorNameRegex) ? true : false;
    }

    function isInteger(x) {
        return x === parseInt(x.toString(), 10);
    }
    function arrayProd(array, begin, end) {
        if (begin == null) {
            begin = 0;
        }
        if (end == null) {
            end = array.length;
        }
        var prod = 1;
        for (var i = begin; i < end; ++i) {
            prod *= array[i];
        }
        return prod;
    }
    function toArray1D(array) {
        array = Array.isArray(array) ? new Float32Array(array) : array;
        return tfc.tensor1d(array);
    }
    function min(array) {
        return tfc.min(toArray1D(array)).dataSync()[0];
    }
    function max(array) {
        return tfc.max(toArray1D(array)).dataSync()[0];
    }
    function range(begin, end) {
        if (end < begin) {
            throw new ValueError("end (" + end + ") < begin (" + begin + ") is forbidden.");
        }
        var out = [];
        for (var i = begin; i < end; ++i) {
            out.push(i);
        }
        return out;
    }

    function cast(x, dtype) {
        return x.asType(dtype);
    }
    function expandDims(x, axis) {
        if (axis === void 0) { axis = -1; }
        var outShape = x.shape.slice();
        if (axis < 0) {
            axis = outShape.length + axis + 1;
        }
        outShape.splice(axis, 0, 1);
        return x.reshape(outShape);
    }
    function repeat(x, n) {
        return tfc.tidy(function () {
            if (x.shape.length !== 2) {
                throw new ValueError("repeat() expects a rank-2 tensor, but received a " +
                    ("rank-" + x.shape.length + " tensor."));
            }
            var y = expandDims(x, 1);
            return tile(y, [1, n, 1]);
        });
    }
    function flatten(x) {
        var newShape = [arrayProd(x.shape)];
        return x.reshape(newShape);
    }
    function batchFlatten(x) {
        if (x.rank <= 1) {
            throw new ValueError("batchFlatten requires a minimum rank of 2. Got rank: " + x.rank + ".");
        }
        var newShape = [x.shape[0], arrayProd(x.shape, 1)];
        return x.reshape(newShape);
    }
    function sliceAlongFirstAxis(array, start, size) {
        return tfc.tidy(function () {
            switch (array.rank) {
                case 1:
                    return tfc.slice1d(array, start, size);
                case 2:
                    return tfc.slice2d(array, [start, 0], [size, array.shape[1]]);
                case 3:
                    return tfc.slice3d(array, [start, 0, 0], [size, array.shape[1], array.shape[2]]);
                case 4:
                    return tfc.slice4d(array, [start, 0, 0, 0], [size, array.shape[1], array.shape[2], array.shape[3]]);
                default:
                    throw new ValueError("sliceAlongFirstAxis() received an unsupported tensor rank: " +
                        ("" + array.rank));
            }
        });
    }
    function sliceAlongLastAxis(array, start, size) {
        return tfc.tidy(function () {
            switch (array.rank) {
                case 1:
                    return tfc.slice1d(array, start, size);
                case 2:
                    return tfc.slice2d(array, [0, start], [array.shape[0], size]);
                case 3:
                    return tfc.slice3d(array, [0, 0, start], [array.shape[0], array.shape[1], size]);
                case 4:
                    return tfc.slice4d(array, [0, 0, 0, start], [array.shape[0], array.shape[1], array.shape[2], size]);
                default:
                    throw new ValueError("sliceAlongLastAxis() received an unsupported tensor rank: " +
                        ("" + array.rank));
            }
        });
    }
    function sliceAlongAxis(array, start, size, axis) {
        return tfc.tidy(function () {
            switch (array.rank) {
                case 1:
                    return tfc.slice1d(array, start, size);
                case 2:
                    switch (axis) {
                        case 1:
                            return sliceAlongFirstAxis(array, start, size);
                        case 2:
                            return sliceAlongLastAxis(array, start, size);
                        default:
                            throw new ValueError("The axis is not within the rank of the tensor " +
                                ("" + axis));
                    }
                case 3:
                    switch (axis) {
                        case 1:
                            return sliceAlongFirstAxis(array, start, size);
                        case 2:
                            return tfc.slice3d(array, [0, start, 0], [array.shape[0], size, array.shape[2]]);
                        case 3:
                            return sliceAlongLastAxis(array, start, size);
                        default:
                            throw new ValueError("The axis is not within the rank of the tensor " +
                                ("" + axis));
                    }
                case 4:
                    switch (axis) {
                        case 1:
                            return sliceAlongFirstAxis(array, start, size);
                        case 2:
                            return tfc.slice4d(array, [0, start, 0, 0], [array.shape[0], size, array.shape[2], array.shape[3]]);
                        case 3:
                            return tfc.slice4d(array, [0, 0, start, 0], [array.shape[0], array.shape[1], size, array.shape[3]]);
                        case 4:
                            return sliceAlongLastAxis(array, start, size);
                        default:
                            throw new ValueError("The axis is not within the rank of the tensor " +
                                ("" + axis));
                    }
                default:
                    throw new ValueError("sliceAlongLastAxis() received an unsupported tensor rank: " +
                        ("" + array.rank));
            }
        });
    }
    function concatenate(tensors, axis) {
        if (axis === void 0) { axis = -1; }
        var rank;
        if (axis < 0) {
            rank = tensors[0].rank;
            if (rank !== 0) {
                axis = rank;
            }
            else {
                axis = 0;
            }
        }
        if (axis === tensors[0].rank) {
            axis = -1;
        }
        return tfc.concat(tensors, axis);
    }
    function concatAlongFirstAxis(a, b) {
        switch (a.rank) {
            case 1:
                return tfc.concat1d([a, b]);
            case 2:
                return tfc.concat2d([a, b], 0);
            case 3:
                return tfc.concat3d([a, b], 0);
            case 4:
                return tfc.concat4d([a, b], 0);
            default:
                throw new ValueError('concatAlongFirstAxis() received an unsupported tensor rank: ' +
                    a.rank);
        }
    }
    function tile(x, n) {
        if (!Array.isArray(n)) {
            n = [n];
        }
        if (x.rank !== n.length) {
            throw new ValueError("The length of input n (" + n.length + ") does not match " +
                ("the number of dimensions in input x (" + x.rank + ")"));
        }
        return tfc.tile(x, n);
    }
    function randomNormal(shape, mean$$1, stddev, dtype, seed) {
        if (mean$$1 === void 0) { mean$$1 = 0.0; }
        if (stddev === void 0) { stddev = 1.0; }
        return tfc.randomNormal(shape, mean$$1, stddev, dtype, seed);
    }
    function dot(x, y) {
        if ((x.rank < 2) || (y.rank < 2)) {
            throw new NotImplementedError("dot requires both inputs to be rank >= 2" +
                (" but got x shape = " + x.shape + " and y shape = " + y.shape));
        }
        if (y.rank >= 3) {
            var xLastDim = x.shape.slice(-1)[0];
            var ySecondLastDim = y.shape.slice(-2)[0];
            if (xLastDim !== ySecondLastDim) {
                throw new NotImplementedError("If rank y >= 3, then the second last dim" +
                    (" of y must equal the last dim of x but got x shape = " + x.shape + " and ") +
                    (" y shape = " + y.shape));
            }
        }
        if ((x.rank === 2) && (y.rank === 2)) {
            return tfc.matMul(x, y);
        }
        else {
            var xFirstDims = x.shape.slice();
            var xLastDim = xFirstDims.pop();
            x = x.reshape([-1, xLastDim]);
            var yShape = y.shape.slice();
            var yLastDim = yShape.pop();
            var ySecondLastDim = yShape.pop();
            var yOtherDims = yShape.concat([yLastDim]);
            var perm = Array.from({ length: y.rank }, function (_, i) {
                if (i === 0) {
                    return y.rank - 2;
                }
                else if (i <= y.rank - 2) {
                    return i - 1;
                }
                return i;
            });
            y = y.transpose(perm).reshape([ySecondLastDim, -1]);
            var outputShape = xFirstDims.concat(yOtherDims);
            return tfc.matMul(x, y).reshape(outputShape);
        }
    }
    function gather(reference, indices, axis) {
        return tfc.tidy(function () {
            if (Array.isArray(indices)) {
                indices = tfc.tensor1d(indices, 'int32');
            }
            else {
                indices = indices.toInt();
            }
            return tfc.gather(reference, indices, axis);
        });
    }
    function square(x) {
        return tfc.mulStrict(x, x);
    }
    function biasAdd(x, bias, dataFormat) {
        return tfc.tidy(function () {
            if (dataFormat == null) {
                dataFormat = imageDataFormat();
            }
            checkDataFormat(dataFormat);
            if (bias.rank !== 1 && bias.rank !== x.rank) {
                throw new ValueError('Unexpected bias dimensions: ' + bias.rank +
                    '; expected it to be 1 or ' + x.rank);
            }
            var biasShape = bias.shape;
            var y;
            if (x.rank === 5) {
                if (dataFormat === 'channelsFirst') {
                    if (biasShape.length === 1) {
                        y = x.add(bias.reshape([1, biasShape[0], 1, 1, 1]));
                    }
                    else {
                        y = x.add(bias.reshape([1, biasShape[3], biasShape[0], biasShape[1], biasShape[2]]));
                    }
                }
                else if (dataFormat === 'channelsLast') {
                    if (biasShape.length === 1) {
                        y = x.add(bias.reshape([1, 1, 1, 1, biasShape[0]]));
                    }
                    else {
                        y = x.add(bias.reshape([1].concat(biasShape)));
                    }
                }
            }
            else if (x.rank === 4) {
                if (dataFormat === 'channelsFirst') {
                    if (biasShape.length === 1) {
                        y = x.add(bias.reshape([1, biasShape[0], 1, 1]));
                    }
                    else {
                        y = x.add(bias.reshape([1, biasShape[2], biasShape[0], biasShape[1]]));
                    }
                }
                else if (dataFormat === 'channelsLast') {
                    if (biasShape.length === 1) {
                        y = x.add(bias.reshape([1, 1, 1, biasShape[0]]));
                    }
                    else {
                        y = x.add(bias.reshape([1].concat(biasShape)));
                    }
                }
            }
            else if (x.rank === 3) {
                if (dataFormat === 'channelsFirst') {
                    if (biasShape.length === 1) {
                        y = x.add(bias.reshape([1, biasShape[0], 1]));
                    }
                    else {
                        y = x.add(bias.reshape([1, biasShape[1], biasShape[0]]));
                    }
                }
                else if (dataFormat === 'channelsLast') {
                    if (biasShape.length === 1) {
                        y = x.add(bias.reshape([1, 1, biasShape[0]]));
                    }
                    else {
                        y = x.add(bias.reshape([1].concat(biasShape)));
                    }
                }
            }
            else if (x.rank < 3) {
                y = x.add(bias);
            }
            else {
                throw new ValueError("Unsupported input rank by biasAdd: " + x.rank);
            }
            return y;
        });
    }
    function elu(x, alpha) {
        if (alpha === void 0) { alpha = 1; }
        if (alpha !== 1) {
            throw new NotImplementedError("Support for alpha values other than 1 (" + alpha + ") is not implemented " +
                "yet.");
        }
        return tfc.elu(x);
    }
    function softsign(x) {
        return tfc.tidy(function () { return tfc.div(x, tfc.add(getScalar(1), tfc.abs(x))); });
    }
    function dropout(x, level, noiseShape, seed) {
        return tfc.tidy(function () {
            if (noiseShape != null && !tfc.util.arraysEqual(x.shape, noiseShape)) {
                throw new NotImplementedError('Non-default noise shape is not implemented yet: ' +
                    JSON.stringify(noiseShape));
            }
            if (seed != null) {
                throw new NotImplementedError('seed is not implemented for dropout yet.');
            }
            var multiplier = tfc.step(tfc.add(tfc.neg(level), tfc.randomUniform(x.shape, 0, 1, 'float32')));
            multiplier = tfc.mul(tfc.div(getScalar(1), tfc.sub(getScalar(1), level)), multiplier);
            return tfc.mul(x, multiplier);
        });
    }
    function hardSigmoid(x) {
        return tfc.tidy(function () {
            var y = tfc.add(getScalar(0.5), tfc.mul(getScalar(0.2), x));
            return tfc.clipByValue(y, 0, 1);
        });
    }
    function inTrainPhase(x, alt, training) {
        if (training === void 0) { training = false; }
        return training ? x() : alt();
    }

    var VALID_FAN_MODE_VALUES = ['fanIn', 'fanOut', 'fanAvg'];
    function checkFanMode(value) {
        checkStringTypeUnionValue(VALID_FAN_MODE_VALUES, 'FanMode', value);
    }
    var VALID_DISTRIBUTION_VALUES = ['normal', 'uniform'];
    function checkDistribution(value) {
        checkStringTypeUnionValue(VALID_DISTRIBUTION_VALUES, 'Distribution', value);
    }
    var Initializer = (function (_super) {
        __extends(Initializer, _super);
        function Initializer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Initializer.prototype.fromConfigUsesCustomObjects = function () {
            return false;
        };
        Initializer.prototype.getConfig = function () {
            return {};
        };
        return Initializer;
    }(tfc.serialization.Serializable));
    var Zeros = (function (_super) {
        __extends(Zeros, _super);
        function Zeros() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Zeros.prototype.apply = function (shape, dtype) {
            return tfc.zeros(shape, dtype);
        };
        Zeros.className = 'Zeros';
        return Zeros;
    }(Initializer));
    tfc.serialization.registerClass(Zeros);
    var Ones = (function (_super) {
        __extends(Ones, _super);
        function Ones() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Ones.prototype.apply = function (shape, dtype) {
            return tfc.ones(shape, dtype);
        };
        Ones.className = 'Ones';
        return Ones;
    }(Initializer));
    tfc.serialization.registerClass(Ones);
    var Constant = (function (_super) {
        __extends(Constant, _super);
        function Constant(config) {
            var _this = _super.call(this) || this;
            if (typeof config !== 'object') {
                throw new ValueError("Expected argument of type ConstantConfig but got " + config);
            }
            if (config.value === undefined) {
                throw new ValueError("config must have value set but got " + config);
            }
            _this.value = config.value;
            return _this;
        }
        Constant.prototype.apply = function (shape, dtype) {
            var _this = this;
            return tfc.tidy(function () { return tfc.mul(tfc.scalar(_this.value), tfc.ones(shape, dtype)); });
        };
        Constant.prototype.getConfig = function () {
            return {
                value: this.value,
            };
        };
        Constant.className = 'Constant';
        return Constant;
    }(Initializer));
    tfc.serialization.registerClass(Constant);
    var RandomUniform = (function (_super) {
        __extends(RandomUniform, _super);
        function RandomUniform(config) {
            var _this = _super.call(this) || this;
            _this.DEFAULT_MINVAL = -0.05;
            _this.DEFAULT_MAXVAL = 0.05;
            _this.minval = config.minval || _this.DEFAULT_MINVAL;
            _this.maxval = config.maxval || _this.DEFAULT_MAXVAL;
            _this.seed = config.seed;
            return _this;
        }
        RandomUniform.prototype.apply = function (shape, dtype) {
            return tfc.randomUniform(shape, this.minval, this.maxval, dtype);
        };
        RandomUniform.prototype.getConfig = function () {
            return { minval: this.minval, maxval: this.maxval, seed: this.seed };
        };
        RandomUniform.className = 'RandomUniform';
        return RandomUniform;
    }(Initializer));
    tfc.serialization.registerClass(RandomUniform);
    var RandomNormal = (function (_super) {
        __extends(RandomNormal, _super);
        function RandomNormal(config) {
            var _this = _super.call(this) || this;
            _this.DEFAULT_MEAN = 0.;
            _this.DEFAULT_STDDEV = 0.05;
            _this.mean = config.mean || _this.DEFAULT_MEAN;
            _this.stddev = config.stddev || _this.DEFAULT_STDDEV;
            _this.seed = config.seed;
            return _this;
        }
        RandomNormal.prototype.apply = function (shape, dtype) {
            dtype = dtype || 'float32';
            if (dtype !== 'float32' && dtype !== 'int32') {
                throw new NotImplementedError("randomNormal does not support dType " + dtype + ".");
            }
            return randomNormal(shape, this.mean, this.stddev, dtype, this.seed);
        };
        RandomNormal.prototype.getConfig = function () {
            return { mean: this.mean, stddev: this.stddev, seed: this.seed };
        };
        RandomNormal.className = 'RandomNormal';
        return RandomNormal;
    }(Initializer));
    tfc.serialization.registerClass(RandomNormal);
    var TruncatedNormal = (function (_super) {
        __extends(TruncatedNormal, _super);
        function TruncatedNormal(config) {
            var _this = _super.call(this) || this;
            _this.DEFAULT_MEAN = 0.;
            _this.DEFAULT_STDDEV = 0.05;
            _this.mean = config.mean || _this.DEFAULT_MEAN;
            _this.stddev = config.stddev || _this.DEFAULT_STDDEV;
            _this.seed = config.seed;
            return _this;
        }
        TruncatedNormal.prototype.apply = function (shape, dtype) {
            dtype = dtype || 'float32';
            if (dtype !== 'float32' && dtype !== 'int32') {
                throw new NotImplementedError("truncatedNormal does not support dType " + dtype + ".");
            }
            return tfc.truncatedNormal(shape, this.mean, this.stddev, dtype, this.seed);
        };
        TruncatedNormal.prototype.getConfig = function () {
            return { mean: this.mean, stddev: this.stddev, seed: this.seed };
        };
        TruncatedNormal.className = 'TruncatedNormal';
        return TruncatedNormal;
    }(Initializer));
    tfc.serialization.registerClass(TruncatedNormal);
    var Identity = (function (_super) {
        __extends(Identity, _super);
        function Identity(config) {
            var _this = _super.call(this) || this;
            _this.gain = config.gain != null ? tfc.scalar(config.gain) : getScalar(1.0);
            return _this;
        }
        Identity.prototype.apply = function (shape, dtype) {
            var _this = this;
            return tfc.tidy(function () {
                if (shape.length !== 2 || shape[0] !== shape[1]) {
                    throw new ValueError('Identity matrix initializer can only be used for' +
                        ' 2D square matrices.');
                }
                else {
                    return tfc.mul(_this.gain, tfc.eye(shape[0]));
                }
            });
        };
        Identity.prototype.getConfig = function () {
            return { gain: this.gain.get() };
        };
        Identity.className = 'Identity';
        return Identity;
    }(Initializer));
    tfc.serialization.registerClass(Identity);
    function computeFans(shape, dataFormat) {
        if (dataFormat === void 0) { dataFormat = 'channelsLast'; }
        var fanIn;
        var fanOut;
        checkDataFormat(dataFormat);
        if (shape.length === 2) {
            fanIn = shape[0];
            fanOut = shape[1];
        }
        else if ([3, 4, 5].indexOf(shape.length) !== -1) {
            if (dataFormat === 'channelsFirst') {
                var receptiveFieldSize = arrayProd(shape, 2);
                fanIn = shape[1] * receptiveFieldSize;
                fanOut = shape[0] * receptiveFieldSize;
            }
            else if (dataFormat === 'channelsLast') {
                var receptiveFieldSize = arrayProd(shape, 0, shape.length - 2);
                fanIn = shape[shape.length - 2] * receptiveFieldSize;
                fanOut = shape[shape.length - 1] * receptiveFieldSize;
            }
        }
        else {
            var shapeProd = arrayProd(shape);
            fanIn = Math.sqrt(shapeProd);
            fanOut = Math.sqrt(shapeProd);
        }
        return [fanIn, fanOut];
    }
    var VarianceScaling = (function (_super) {
        __extends(VarianceScaling, _super);
        function VarianceScaling(config) {
            var _this = _super.call(this) || this;
            if (config.scale < 0.0) {
                throw new ValueError("scale must be a positive float. Got: " + config.scale);
            }
            _this.scale = config.scale == null ? 1.0 : config.scale;
            _this.mode = config.mode;
            checkFanMode(_this.mode);
            _this.distribution = config.distribution;
            checkDistribution(_this.distribution);
            _this.seed = config.seed;
            return _this;
        }
        VarianceScaling.prototype.apply = function (shape, dtype) {
            var fans = computeFans(shape);
            var fanIn = fans[0];
            var fanOut = fans[1];
            var scale = this.scale;
            if (this.mode === 'fanIn') {
                scale /= Math.max(1, fanIn);
            }
            else if (this.mode === 'fanOut') {
                scale /= Math.max(1, fanOut);
            }
            else {
                scale /= Math.max(1, (fanIn + fanOut) / 2);
            }
            if (this.distribution === 'normal') {
                var stddev = Math.sqrt(scale);
                dtype = dtype || 'float32';
                if (dtype !== 'float32' && dtype !== 'int32') {
                    throw new NotImplementedError(this.getClassName() + " does not support dType " + dtype + ".");
                }
                return tfc.truncatedNormal(shape, 0, stddev, dtype, this.seed);
            }
            else {
                var limit = Math.sqrt(3 * scale);
                return tfc.randomUniform(shape, -limit, limit, dtype);
            }
        };
        VarianceScaling.prototype.getConfig = function () {
            return {
                scale: this.scale,
                mode: this.mode,
                distribution: this.distribution,
                seed: this.seed
            };
        };
        VarianceScaling.className = 'VarianceScaling';
        return VarianceScaling;
    }(Initializer));
    tfc.serialization.registerClass(VarianceScaling);
    var GlorotUniform = (function (_super) {
        __extends(GlorotUniform, _super);
        function GlorotUniform(config) {
            return _super.call(this, {
                scale: 1.0,
                mode: 'fanAvg',
                distribution: 'uniform',
                seed: config == null ? null : config.seed
            }) || this;
        }
        GlorotUniform.prototype.getClassName = function () {
            return VarianceScaling.className;
        };
        GlorotUniform.className = 'GlorotUniform';
        return GlorotUniform;
    }(VarianceScaling));
    tfc.serialization.registerClass(GlorotUniform);
    var GlorotNormal = (function (_super) {
        __extends(GlorotNormal, _super);
        function GlorotNormal(config) {
            return _super.call(this, {
                scale: 1.0,
                mode: 'fanAvg',
                distribution: 'normal',
                seed: config == null ? null : config.seed
            }) || this;
        }
        GlorotNormal.prototype.getClassName = function () {
            return VarianceScaling.className;
        };
        GlorotNormal.className = 'GlorotNormal';
        return GlorotNormal;
    }(VarianceScaling));
    tfc.serialization.registerClass(GlorotNormal);
    var HeNormal = (function (_super) {
        __extends(HeNormal, _super);
        function HeNormal(config) {
            return _super.call(this, {
                scale: 2.0,
                mode: 'fanIn',
                distribution: 'normal',
                seed: config == null ? null : config.seed
            }) || this;
        }
        HeNormal.prototype.getClassName = function () {
            return VarianceScaling.className;
        };
        HeNormal.className = 'HeNormal';
        return HeNormal;
    }(VarianceScaling));
    tfc.serialization.registerClass(HeNormal);
    var LeCunNormal = (function (_super) {
        __extends(LeCunNormal, _super);
        function LeCunNormal(config) {
            return _super.call(this, {
                scale: 1.0,
                mode: 'fanIn',
                distribution: 'normal',
                seed: config == null ? null : config.seed
            }) || this;
        }
        LeCunNormal.prototype.getClassName = function () {
            return VarianceScaling.className;
        };
        LeCunNormal.className = 'LeCunNormal';
        return LeCunNormal;
    }(VarianceScaling));
    tfc.serialization.registerClass(LeCunNormal);
    var Orthogonal = (function (_super) {
        __extends(Orthogonal, _super);
        function Orthogonal(config) {
            var _this = _super.call(this) || this;
            _this.DEFAULT_GAIN = 1;
            _this.gain = config.gain == null ? _this.DEFAULT_GAIN : config.gain;
            _this.seed = config.seed;
            if (_this.seed != null) {
                throw new NotImplementedError('Random seed is not implemented for Orthogonal Initializer yet.');
            }
            return _this;
        }
        Orthogonal.prototype.apply = function (shape, dtype) {
            var _this = this;
            return tfc.tidy(function () {
                if (shape.length !== 2) {
                    throw new NotImplementedError('The Orthogonal Initializer does not support non-2D shapes yet.');
                }
                if (shape[0] * shape[1] > 2000) {
                    console.warn("Orthogonal initializer is being called on a matrix with more " +
                        ("than 2000 (" + shape[0] * shape[1] + ") elements: ") +
                        "Slowness may result.");
                }
                var normalizedShape = shape[0] > shape[1] ? [shape[1], shape[0]] : shape;
                var a = randomNormal(normalizedShape, 0, 1, 'float32');
                var q = tfc.linalg.gramSchmidt(a);
                if (shape[0] > shape[1]) {
                    q = q.transpose();
                }
                return tfc.mul(getScalar(_this.gain), q);
            });
        };
        Orthogonal.prototype.getConfig = function () {
            return {
                gain: this.gain,
                seed: this.seed,
            };
        };
        Orthogonal.className = 'Orthogonal';
        return Orthogonal;
    }(Initializer));
    tfc.serialization.registerClass(Orthogonal);
    var INITIALIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP = {
        'constant': 'Constant',
        'glorotNormal': 'GlorotNormal',
        'glorotUniform': 'GlorotUniform',
        'heNormal': 'HeNormal',
        'identity': 'Identity',
        'leCunNormal': 'LeCunNormal',
        'ones': 'Ones',
        'orthogonal': 'Orthogonal',
        'randomNormal': 'RandomNormal',
        'randomUniform': 'RandomUniform',
        'truncatedNormal': 'TruncatedNormal',
        'varianceScaling': 'VarianceScaling',
        'zeros': 'Zeros'
    };
    function deserializeInitializer(config, customObjects) {
        if (customObjects === void 0) { customObjects = {}; }
        return deserializeKerasObject(config, tfc.serialization.SerializationMap.getMap().classNameMap, customObjects, 'initializer');
    }
    function serializeInitializer(initializer) {
        return serializeKerasObject(initializer);
    }
    function getInitializer(identifier) {
        if (typeof identifier === 'string') {
            var className = identifier in INITIALIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP ?
                INITIALIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP[identifier] :
                identifier;
            if (className === 'GlorotUniform') {
                return new GlorotUniform();
            }
            else if (className === 'GlorotNormal') {
                return new GlorotNormal();
            }
            else if (className === 'HeNormal') {
                return new HeNormal();
            }
            else if (className === 'LeCunNormal') {
                return new LeCunNormal();
            }
            else {
                var config = { className: className, config: {} };
                return deserializeInitializer(config);
            }
        }
        else if (identifier instanceof Initializer) {
            return identifier;
        }
        else {
            return deserializeInitializer(identifier);
        }
    }

    function zeros() {
        return new Zeros();
    }
    function ones() {
        return new Ones();
    }
    function constant(config) {
        return new Constant(config);
    }
    function randomUniform(config) {
        return new RandomUniform(config);
    }
    function randomNormal$1(config) {
        return new RandomNormal(config);
    }
    function truncatedNormal(config) {
        return new TruncatedNormal(config);
    }
    function identity(config) {
        return new Identity(config);
    }
    function varianceScaling(config) {
        return new VarianceScaling(config);
    }
    function glorotUniform(config) {
        return new GlorotUniform(config);
    }
    function glorotNormal(config) {
        return new GlorotNormal(config);
    }
    function heNormal(config) {
        return new HeNormal(config);
    }
    function leCunNormal(config) {
        return new LeCunNormal(config);
    }
    function orthogonal(config) {
        return new Orthogonal(config);
    }

    var exports_initializers = /*#__PURE__*/Object.freeze({
        zeros: zeros,
        ones: ones,
        constant: constant,
        randomUniform: randomUniform,
        randomNormal: randomNormal$1,
        truncatedNormal: truncatedNormal,
        identity: identity,
        varianceScaling: varianceScaling,
        glorotUniform: glorotUniform,
        glorotNormal: glorotNormal,
        heNormal: heNormal,
        leCunNormal: leCunNormal,
        orthogonal: orthogonal
    });

    function isArrayOfShapes(x) {
        return Array.isArray(x) && Array.isArray(x[0]);
    }
    function normalizeShapeList(x) {
        if (x.length === 0) {
            return [];
        }
        if (!Array.isArray(x[0])) {
            return [x];
        }
        return x;
    }
    function getExactlyOneTensor(xs) {
        var x;
        if (Array.isArray(xs)) {
            if (xs.length !== 1) {
                throw new ValueError("Expected Tensor length to be 1; got " + xs.length);
            }
            x = xs[0];
        }
        else {
            x = xs;
        }
        return x;
    }
    function getExactlyOneShape(shapes) {
        if (Array.isArray(shapes) && Array.isArray(shapes[0])) {
            if (shapes.length === 1) {
                shapes = shapes;
                return shapes[0];
            }
            else {
                throw new ValueError("Expected exactly 1 Shape; got " + shapes.length);
            }
        }
        else {
            return shapes;
        }
    }

    function countParamsInWeights(weights) {
        var count = 0;
        for (var _i = 0, weights_1 = weights; _i < weights_1.length; _i++) {
            var weight = weights_1[_i];
            if (weight.shape.length === 0) {
                count += 1;
            }
            else {
                count += weight.shape.reduce(function (a, b) { return a * b; });
            }
        }
        return count;
    }

    var DEFAULT_VARIABLE_NAME_PREFIX = 'Variable';
    var LayerVariable = (function () {
        function LayerVariable(val, dtype, name, trainable, constraint) {
            if (dtype === void 0) { dtype = 'float32'; }
            if (name === void 0) { name = DEFAULT_VARIABLE_NAME_PREFIX; }
            if (trainable === void 0) { trainable = true; }
            if (constraint === void 0) { constraint = null; }
            this.dtype = dtype == null ? 'float32' : dtype;
            this.shape = val.shape;
            this.id = getNextUniqueTensorId();
            name = name == null ? DEFAULT_VARIABLE_NAME_PREFIX : name;
            this.originalName = getScopedTensorName(name);
            this.name = getUniqueTensorName(this.originalName);
            this.trainable = trainable;
            this.constraint = constraint;
            this.val = tfc.variable(val, this.trainable, this.name, this.dtype);
        }
        LayerVariable.prototype.read = function () {
            this.assertNotDisposed();
            return this.val;
        };
        LayerVariable.prototype.write = function (newVal) {
            this.assertNotDisposed();
            checkShapesMatch(this.val, newVal);
            if (this.val.id !== newVal.id) {
                this.val.assign(newVal);
                if (this.constraint != null) {
                    this.val.assign(this.constraint.apply(this.val));
                }
            }
            return this;
        };
        LayerVariable.prototype.dispose = function () {
            this.assertNotDisposed();
            this.val.dispose();
        };
        LayerVariable.prototype.assertNotDisposed = function () {
            if (this.val.isDisposed) {
                throw new Error("LayersVariable " + this.name + " is already disposed.");
            }
        };
        return LayerVariable;
    }());
    function checkShapesMatch(x, y) {
        if (x.shape.toString() !== y.shape.toString()) {
            throw new Error('Shape mismatch: ' + JSON.stringify(x.shape) + ' vs. ' +
                JSON.stringify(y.shape));
        }
    }
    function batchGetValue(xs) {
        return xs.map(function (x) { return x.read(); });
    }
    function batchSetValue(variablesAndValues) {
        variablesAndValues.map(function (variableAndValue) {
            var variable = variableAndValue[0];
            variable.write(variableAndValue[1]);
        });
    }

    var InputSpec = (function () {
        function InputSpec(config) {
            this.dtype = config.dtype;
            this.shape = config.shape;
            if (config.shape != null) {
                this.ndim = config.shape.length;
            }
            else {
                this.ndim = config.ndim;
            }
            this.maxNDim = config.maxNDim;
            this.minNDim = config.minNDim;
            this.axes = config.axes || {};
        }
        return InputSpec;
    }());
    var SymbolicTensor = (function () {
        function SymbolicTensor(dtype, shape, sourceLayer, inputs, callArgs, name, outputTensorIndex) {
            this.dtype = dtype;
            this.shape = shape;
            this.sourceLayer = sourceLayer;
            this.inputs = inputs;
            this.callArgs = callArgs;
            this.outputTensorIndex = outputTensorIndex;
            this.id = getNextUniqueTensorId();
            if (name != null) {
                this.originalName = getScopedTensorName(name);
                this.name = getUniqueTensorName(this.originalName);
            }
            this.rank = shape.length;
        }
        return SymbolicTensor;
    }());
    var _nextNodeID = 0;
    var Node = (function () {
        function Node(config, callArgs) {
            this.callArgs = callArgs;
            this.id = _nextNodeID++;
            this.outboundLayer = config.outboundLayer;
            this.inboundLayers = config.inboundLayers;
            this.nodeIndices = config.nodeIndices;
            this.tensorIndices = config.tensorIndices;
            this.inputTensors = config.inputTensors;
            this.outputTensors = config.outputTensors;
            this.inputMasks = config.inputMasks;
            this.outputMasks = config.outputMasks;
            this.inputShapes = config.inputShapes;
            this.outputShapes = config.outputShapes;
            for (var _i = 0, _a = config.inboundLayers; _i < _a.length; _i++) {
                var layer = _a[_i];
                if (layer != null) {
                    layer.outboundNodes.push(this);
                }
            }
            config.outboundLayer.inboundNodes.push(this);
        }
        Node.prototype.getConfig = function () {
            var inboundNames = [];
            for (var _i = 0, _a = this.inboundLayers; _i < _a.length; _i++) {
                var layer = _a[_i];
                if (layer != null) {
                    inboundNames.push(layer.name);
                }
                else {
                    inboundNames.push(null);
                }
            }
            return {
                outboundLayer: this.outboundLayer ? this.outboundLayer.name : null,
                inboundLayers: inboundNames,
                nodeIndices: this.nodeIndices,
                tensorIndices: this.tensorIndices
            };
        };
        return Node;
    }());
    var _nextLayerID = 0;
    var Layer = (function (_super) {
        __extends(Layer, _super);
        function Layer(config) {
            var _this = _super.call(this) || this;
            _this._callHook = null;
            _this._addedWeightNames = [];
            _this._stateful = false;
            _this.id = _nextLayerID++;
            _this.activityRegularizer = null;
            _this.inputSpec = null;
            _this.supportsMasking = false;
            _this._trainableWeights = [];
            _this._nonTrainableWeights = [];
            _this._losses = [];
            _this._updates = [];
            _this._built = false;
            _this.inboundNodes = [];
            _this.outboundNodes = [];
            var name = config.name;
            if (!name) {
                var prefix = _this.getClassName();
                name = toSnakeCase(prefix) + '_' + getUid(prefix);
            }
            _this.name = name;
            _this.trainable = config.trainable == null ? true : config.trainable;
            _this.updatable = config.updatable == null ? true : config.updatable;
            if (config.inputShape != null || config.batchInputShape != null) {
                var batchInputShape = void 0;
                if (config.batchInputShape != null) {
                    batchInputShape = config.batchInputShape;
                }
                else if (config.inputShape != null) {
                    var batchSize = null;
                    if (config.batchSize != null) {
                        batchSize = config.batchSize;
                    }
                    batchInputShape = [batchSize].concat(config.inputShape);
                }
                _this.batchInputShape = batchInputShape;
                var dtype = config.dtype;
                if (dtype == null) {
                    dtype = config.inputDType;
                }
                if (dtype == null) {
                    dtype = 'float32';
                }
                _this.dtype = dtype;
            }
            if (config.weights != null) {
                _this.initialWeights = config.weights;
            }
            else {
                _this.initialWeights = null;
            }
            _this._refCount = null;
            return _this;
        }
        Layer.nodeKey = function (layer, nodeIndex) {
            return layer.name + '_ib-' + nodeIndex.toString();
        };
        Layer.prototype.getNodeAtIndex = function (nodeIndex, attrName) {
            if (this.inboundNodes.length === 0) {
                throw new RuntimeError('The layer has never been called ' +
                    ("and thus has no defined " + attrName + "."));
            }
            if (this.inboundNodes.length <= nodeIndex) {
                throw new ValueError("Asked to get " + attrName + " at node " + nodeIndex + ", " +
                    ("but the layer has only " + this.inboundNodes.length + " inbound nodes."));
            }
            return this.inboundNodes[nodeIndex];
        };
        Layer.prototype.getInputAt = function (nodeIndex) {
            return singletonOrArray(this.getNodeAtIndex(nodeIndex, 'input').inputTensors);
        };
        Layer.prototype.getOutputAt = function (nodeIndex) {
            return singletonOrArray(this.getNodeAtIndex(nodeIndex, 'output').outputTensors);
        };
        Object.defineProperty(Layer.prototype, "input", {
            get: function () {
                if (this.inboundNodes.length > 1) {
                    throw new AttributeError("Layer " + this.name +
                        ' has multiple inbound nodes, ' +
                        'hence the notion of "layer input" ' +
                        'is ill-defined. ' +
                        'Use `getInputAt(nodeIndex)` instead.');
                }
                else if (this.inboundNodes.length === 0) {
                    throw new AttributeError("Layer " + this.name +
                        ' is not connected, no input to return.');
                }
                return singletonOrArray(this.getNodeAtIndex(0, 'input').inputTensors);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer.prototype, "output", {
            get: function () {
                if (this.inboundNodes.length === 0) {
                    throw new AttributeError("Layer " + this.name +
                        ' has no inbound nodes.');
                }
                if (this.inboundNodes.length > 1) {
                    throw new AttributeError("Layer " + this.name +
                        ' has multiple inbound nodes, ' +
                        'hence the notion of "layer output" ' +
                        'is ill-defined. ' +
                        'Use `getOutputAt(nodeIndex)` instead.');
                }
                return singletonOrArray(this.getNodeAtIndex(0, 'output').outputTensors);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer.prototype, "losses", {
            get: function () {
                return this._losses;
            },
            enumerable: true,
            configurable: true
        });
        Layer.prototype.calculateLosses = function () {
            return this.losses.map(function (lossFn) { return lossFn(); });
        };
        Object.defineProperty(Layer.prototype, "updates", {
            get: function () {
                return this._updates;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer.prototype, "built", {
            get: function () {
                return this._built;
            },
            set: function (built) {
                this._built = built;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer.prototype, "trainableWeights", {
            get: function () {
                if (this.trainable) {
                    return this._trainableWeights;
                }
                else {
                    return [];
                }
            },
            set: function (weights) {
                this._trainableWeights = weights;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer.prototype, "nonTrainableWeights", {
            get: function () {
                if (!this.trainable) {
                    return this._trainableWeights.concat(this._nonTrainableWeights);
                }
                else {
                    return this._nonTrainableWeights;
                }
            },
            set: function (weights) {
                this._nonTrainableWeights = weights;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer.prototype, "weights", {
            get: function () {
                return this.trainableWeights.concat(this.nonTrainableWeights);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Layer.prototype, "stateful", {
            get: function () {
                return this._stateful;
            },
            enumerable: true,
            configurable: true
        });
        Layer.prototype.resetStates = function () {
            if (!this.stateful) {
                throw new Error('Cannot call the resetStates() method of a non-stateful Layer ' +
                    'object.');
            }
        };
        Layer.prototype.assertInputCompatibility = function (inputs) {
            inputs = toList(inputs);
            if (this.inputSpec == null || this.inputSpec.length === 0) {
                return;
            }
            var inputSpec = toList(this.inputSpec);
            if (inputs.length !== inputSpec.length) {
                throw new ValueError("Layer " + this.name + " expects " + inputSpec.length + " inputs, " +
                    ("but it received " + inputs.length + " input tensors. ") +
                    ("Input received: " + inputs));
            }
            for (var inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
                var x = inputs[inputIndex];
                var spec = inputSpec[inputIndex];
                if (spec == null) {
                    continue;
                }
                var ndim = x.rank;
                if (spec.ndim != null) {
                    if (ndim !== spec.ndim) {
                        throw new ValueError("Input " + inputIndex + " is incompatible with layer " + this.name + ": " +
                            ("expected ndim=" + spec.ndim + ", found ndim=" + ndim));
                    }
                }
                if (spec.maxNDim != null) {
                    if (ndim > spec.maxNDim) {
                        throw new ValueError("Input " + inputIndex + " is incompatible with layer " + this.name +
                            (": expected max_ndim=" + spec.maxNDim + ", found ndim=" + ndim));
                    }
                }
                if (spec.minNDim != null) {
                    if (ndim < spec.minNDim) {
                        throw new ValueError("Input " + inputIndex + " is incompatible with layer " + this.name +
                            (": expected min_ndim=" + spec.minNDim + ", found ndim=" + ndim + "."));
                    }
                }
                if (spec.dtype != null) {
                    if (x.dtype !== spec.dtype) {
                        throw new ValueError("Input " + inputIndex + " is incompatible with layer " + this.name + " " +
                            (": expected dtype=" + spec.dtype + ", found dtype=" + x.dtype + "."));
                    }
                }
                if (spec.axes) {
                    var xShape = x.shape;
                    for (var key in spec.axes) {
                        var axis = Number(key);
                        var value = spec.axes[key];
                        var xShapeAtAxis = axis >= 0 ? xShape[axis] : xShape[xShape.length + axis];
                        if (value != null && [value, null].indexOf(xShapeAtAxis) === -1) {
                            throw new ValueError("Input " + inputIndex + " is incompatible with layer " +
                                (this.name + ": expected axis " + axis + " of input shape to ") +
                                ("have value " + value + " but got shape " + xShape + "."));
                        }
                    }
                }
                if (spec.shape != null) {
                    for (var i = 0; i < spec.shape.length; ++i) {
                        var specDim = spec.shape[i];
                        var dim = x.shape[i];
                        if (specDim != null && dim != null) {
                            if (specDim !== dim) {
                                throw new ValueError("Input " + inputIndex + " is incompatible with layer " +
                                    (this.name + ": expected shape=" + spec.shape + ", ") +
                                    'found shape=${xShape}.');
                            }
                        }
                    }
                }
            }
        };
        Layer.prototype.call = function (inputs, kwargs) {
            return inputs;
        };
        Layer.prototype.invokeCallHook = function (inputs, kwargs) {
            if (this._callHook != null) {
                this._callHook(inputs, kwargs);
            }
        };
        Layer.prototype.setCallHook = function (callHook) {
            this._callHook = callHook;
        };
        Layer.prototype.clearCallHook = function () {
            this._callHook = null;
        };
        Layer.prototype.apply = function (inputs, kwargs) {
            var _this = this;
            kwargs = kwargs || {};
            this.assertNotDisposed();
            var inputsList = toList(inputs);
            var allAreSymbolic = true;
            for (var _i = 0, inputsList_1 = inputsList; _i < inputsList_1.length; _i++) {
                var input = inputsList_1[_i];
                if (!(input instanceof SymbolicTensor)) {
                    allAreSymbolic = false;
                    break;
                }
            }
            var noneAreSymbolic = true;
            for (var _a = 0, inputsList_2 = inputsList; _a < inputsList_2.length; _a++) {
                var input = inputsList_2[_a];
                if (input instanceof SymbolicTensor) {
                    noneAreSymbolic = false;
                    break;
                }
            }
            if (allAreSymbolic === noneAreSymbolic) {
                throw new ValueError('Arguments to apply() must be all ' +
                    'SymbolicTensors or all Tensors');
            }
            return nameScope(this.name, function () {
                if (!_this.built) {
                    _this.assertInputCompatibility(inputs);
                    var inputShapes = [];
                    for (var _i = 0, _a = toList(inputs); _i < _a.length; _i++) {
                        var xElem = _a[_i];
                        inputShapes.push(xElem.shape);
                    }
                    _this.build(singletonOrArray(inputShapes));
                    _this.built = true;
                    if (_this.initialWeights) {
                        _this.setWeights(_this.initialWeights);
                    }
                    if (_this._refCount === null && noneAreSymbolic) {
                        _this._refCount = 1;
                    }
                }
                _this.assertInputCompatibility(inputs);
                if (noneAreSymbolic) {
                    var output = _this.call(inputs, kwargs);
                    var outputList = toList(output);
                    var outputListCopy = [];
                    for (var _b = 0, outputList_1 = outputList; _b < outputList_1.length; _b++) {
                        var x = outputList_1[_b];
                        if (inputsList.indexOf(x) !== -1) {
                            x = x.clone();
                        }
                        outputListCopy.push(x);
                    }
                    output = singletonOrArray(outputListCopy);
                    if (_this.activityRegularizer != null) {
                        throw new NotImplementedError('Layer invocation in the presence of activity ' +
                            'regularizer(s) is not supported yet.');
                    }
                    return output;
                }
                else {
                    var inputShape = collectInputShape(inputs);
                    var outputShape = _this.computeOutputShape(inputShape);
                    var output = void 0;
                    var outputDType_1 = guessOutputDType(inputs);
                    _this.warnOnIncompatibleInputShape(Array.isArray(inputs) ? inputShape[0] :
                        inputShape);
                    if (outputShape != null && outputShape.length > 0 &&
                        Array.isArray(outputShape[0])) {
                        output = outputShape
                            .map(function (shape, index) { return new SymbolicTensor(outputDType_1, shape, _this, toList(inputs), kwargs, _this.name, index); });
                    }
                    else {
                        output = new SymbolicTensor(outputDType_1, outputShape, _this, toList(inputs), kwargs, _this.name);
                    }
                    _this.addInboundNode(inputs, output, null, null, inputShape, outputShape, kwargs);
                    _this._refCount++;
                    if (_this.activityRegularizer != null) {
                        throw new NotImplementedError('Layer invocation in the presence of activity ' +
                            'regularizer(s) is not supported yet.');
                    }
                    return output;
                }
            });
        };
        Layer.prototype.warnOnIncompatibleInputShape = function (inputShape) {
            if (this.batchInputShape == null) {
                return;
            }
            else if (inputShape.length !== this.batchInputShape.length) {
                console.warn("The rank of the input tensor provided (shape: " +
                    (JSON.stringify(inputShape) + ") does not match that of the ") +
                    ("batchInputShape (" + JSON.stringify(this.batchInputShape) + ") ") +
                    ("of the layer " + this.name));
            }
            else {
                var dimMismatch_1 = false;
                this.batchInputShape.forEach(function (dimension, i) {
                    if (dimension != null && inputShape[i] != null &&
                        inputShape[i] !== dimension) {
                        dimMismatch_1 = true;
                    }
                });
                if (dimMismatch_1) {
                    console.warn("The shape of the input tensor " +
                        ("(" + JSON.stringify(inputShape) + ") does not ") +
                        ("match the expectation of layer " + this.name + ": ") +
                        ("" + JSON.stringify(this.batchInputShape)));
                }
            }
        };
        Object.defineProperty(Layer.prototype, "outputShape", {
            get: function () {
                if (this.inboundNodes == null || this.inboundNodes.length === 0) {
                    throw new AttributeError("The layer " + this.name + " has never been called and thus has no " +
                        "defined output shape.");
                }
                var allOutputShapes = [];
                for (var _i = 0, _a = this.inboundNodes; _i < _a.length; _i++) {
                    var node = _a[_i];
                    var shapeString = JSON.stringify(node.outputShapes);
                    if (allOutputShapes.indexOf(shapeString) === -1) {
                        allOutputShapes.push(shapeString);
                    }
                }
                if (allOutputShapes.length === 1) {
                    var outputShapes = this.inboundNodes[0].outputShapes;
                    if (Array.isArray(outputShapes) && Array.isArray(outputShapes[0]) &&
                        outputShapes.length === 1) {
                        return outputShapes[0];
                    }
                    else {
                        return outputShapes;
                    }
                }
                else {
                    throw new AttributeError("The layer " + this.name + " has multiple inbound nodes with different " +
                        "output shapes. Hence the notion of \"outut shape\" is ill-defined " +
                        "for the layer.");
                }
            },
            enumerable: true,
            configurable: true
        });
        Layer.prototype.countParams = function () {
            if (!this.built) {
                throw new RuntimeError("You tried to call countParams() on " + this.name + ", " +
                    "but the layer is not built yet. Build it first by calling " +
                    "build(batchInputShape).");
            }
            return countParamsInWeights(this.weights);
        };
        Layer.prototype.build = function (inputShape) {
            this.built = true;
        };
        Layer.prototype.getWeights = function (trainableOnly) {
            if (trainableOnly === void 0) { trainableOnly = false; }
            return batchGetValue(trainableOnly ? this.trainableWeights : this.weights);
        };
        Layer.prototype.setWeights = function (weights) {
            var _this = this;
            tfc.tidy(function () {
                var params = _this.weights;
                if (params.length !== weights.length) {
                    throw new ValueError("You called setWeights(weights) on layer \"" + _this.name + "\" " +
                        ("with a weight list of length " + weights.length + ", ") +
                        ("but the layer was expecting " + params.length + " weights. ") +
                        ("Provided weights: " + weights + "..."));
                }
                if (params.length === 0) {
                    return;
                }
                var weightValueTuples = [];
                var paramValues = batchGetValue(params);
                for (var i = 0; i < paramValues.length; ++i) {
                    var pv = paramValues[i];
                    var p = params[i];
                    var w = weights[i];
                    if (!tfc.util.arraysEqual(pv.shape, w.shape)) {
                        throw new ValueError("Layer weight shape " + pv.shape + " " +
                            ("not compatible with provided weight shape " + w.shape));
                    }
                    weightValueTuples.push([p, w]);
                }
                batchSetValue(weightValueTuples);
            });
        };
        Layer.prototype.addWeight = function (name, shape, dtype, initializer, regularizer, trainable, constraint) {
            if (this._addedWeightNames.indexOf(name) !== -1) {
                throw new ValueError("Duplicate weight name " + name + " for layer " + this.name);
            }
            this._addedWeightNames.push(name);
            if (dtype == null) {
                dtype = 'float32';
            }
            var weight = new LayerVariable(initializer.apply(shape, dtype), dtype, name, trainable, constraint);
            if (regularizer != null) {
                this.addLoss(function () { return regularizer.apply(weight.read()); });
            }
            if (trainable == null) {
                trainable = true;
            }
            if (trainable) {
                this._trainableWeights.push(weight);
            }
            else {
                this._nonTrainableWeights.push(weight);
            }
            return weight;
        };
        Layer.prototype.addLoss = function (losses) {
            if (losses == null || Array.isArray(losses) && losses.length === 0) {
                return;
            }
            losses = toList(losses);
            if (this._losses !== undefined && this._losses !== null) {
                (_a = this.losses).push.apply(_a, losses);
            }
            var _a;
        };
        Layer.prototype.computeOutputShape = function (inputShape) {
            return inputShape;
        };
        Layer.prototype.computeMask = function (inputs, mask) {
            var _this = this;
            if (!this.supportsMasking) {
                if (mask != null) {
                    if (Array.isArray(mask)) {
                        mask.forEach(function (maskElement) {
                            if (maskElement != null) {
                                throw new TypeError("Layer " + _this.name + " does not support masking," +
                                    'but was passed an inputMask.');
                            }
                        });
                    }
                    else {
                        throw new TypeError("Layer " + this.name + " does not support masking," +
                            'but was passed an inputMask.');
                    }
                }
                return null;
            }
            return mask;
        };
        Layer.prototype.addInboundNode = function (inputTensors, outputTensors, inputMasks, outputMasks, inputShapes, outputShapes, kwargs) {
            if (kwargs === void 0) { kwargs = null; }
            var inputTensorList = toList(inputTensors);
            outputTensors = toList(outputTensors);
            inputMasks = toList(inputMasks);
            outputMasks = toList(outputMasks);
            inputShapes = normalizeShapeList(inputShapes);
            outputShapes = normalizeShapeList(outputShapes);
            var inboundLayers = [];
            var nodeIndices = [];
            var tensorIndices = [];
            for (var _i = 0, inputTensorList_1 = inputTensorList; _i < inputTensorList_1.length; _i++) {
                var x = inputTensorList_1[_i];
                inboundLayers.push(x.sourceLayer);
                nodeIndices.push(x.nodeIndex);
                tensorIndices.push(x.tensorIndex);
            }
            new Node({
                outboundLayer: this,
                inboundLayers: inboundLayers,
                nodeIndices: nodeIndices,
                tensorIndices: tensorIndices,
                inputTensors: inputTensorList,
                outputTensors: outputTensors,
                inputMasks: inputMasks,
                outputMasks: outputMasks,
                inputShapes: inputShapes,
                outputShapes: outputShapes
            }, kwargs);
            for (var i = 0; i < outputTensors.length; i++) {
                outputTensors[i].sourceLayer = this;
                outputTensors[i].nodeIndex = this.inboundNodes.length - 1;
                outputTensors[i].tensorIndex = i;
            }
        };
        Layer.prototype.getConfig = function () {
            var config = { name: this.name, trainable: this.trainable };
            if (this.batchInputShape != null) {
                config['batchInputShape'] = this.batchInputShape;
            }
            if (this.dtype != null) {
                config['dtype'] = this.dtype;
            }
            return config;
        };
        Layer.prototype.disposeWeights = function () {
            this.weights.forEach(function (weight) { return weight.dispose(); });
            return this.weights.length;
        };
        Layer.prototype.assertNotDisposed = function () {
            if (this._refCount === 0) {
                throw new Error("Layer '" + this.name + "' is already disposed.");
            }
        };
        Layer.prototype.dispose = function () {
            if (!this.built) {
                throw new Error("Cannot dispose Layer " + this.name + " because it has not been " +
                    "built yet.");
            }
            if (this._refCount === null) {
                throw new Error("Cannot dispose Layer " + this.name + " because it has not been used " +
                    "yet.");
            }
            this.assertNotDisposed();
            var numDisposedVariables = 0;
            if (--this._refCount === 0) {
                numDisposedVariables = this.disposeWeights();
            }
            return { refCountAfterDispose: this._refCount, numDisposedVariables: numDisposedVariables };
        };
        return Layer;
    }(tfc.serialization.Serializable));
    function collectInputShape(inputTensors) {
        inputTensors =
            toList(inputTensors);
        var shapes = [];
        for (var _i = 0, inputTensors_1 = inputTensors; _i < inputTensors_1.length; _i++) {
            var x = inputTensors_1[_i];
            shapes.push(x.shape);
        }
        return singletonOrArray(shapes);
    }
    function guessOutputDType(inputTensors) {
        return 'float32';
    }
    function getSourceInputs(tensor, layer, nodeIndex) {
        if (layer == null || (nodeIndex != null && nodeIndex > 0)) {
            layer = tensor.sourceLayer;
            nodeIndex = tensor.nodeIndex;
        }
        if (layer.inboundNodes.length === 0) {
            return [tensor];
        }
        else {
            var node = layer.inboundNodes[nodeIndex];
            if (node.inboundLayers.length === 0) {
                return node.inputTensors;
            }
            else {
                var sourceTensors = [];
                for (var i = 0; i < node.inboundLayers.length; i++) {
                    var x = node.inputTensors[i];
                    var layer_1 = node.inboundLayers[i];
                    var nodeIndex_1 = node.nodeIndices[i];
                    var previousSources = getSourceInputs(x, layer_1, nodeIndex_1);
                    for (var _i = 0, previousSources_1 = previousSources; _i < previousSources_1.length; _i++) {
                        var x_1 = previousSources_1[_i];
                        if (sourceTensors.indexOf(x_1) === -1) {
                            sourceTensors.push(x_1);
                        }
                    }
                }
                return sourceTensors;
            }
        }
    }

    var InputLayer = (function (_super) {
        __extends(InputLayer, _super);
        function InputLayer(config) {
            var _this = _super.call(this, {
                dtype: config.dtype,
                name: config.name != null ? config.name : getUid('input').toString()
            }) || this;
            if (config.batchSize == null) {
                config.batchSize = null;
            }
            if (config.sparse == null) {
                config.sparse = false;
            }
            _this.trainable = false;
            _this.built = true;
            _this.sparse = config.sparse;
            if (config.inputShape != null && config.batchInputShape != null) {
                throw new ValueError('Only provide the inputShape OR ' +
                    'batchInputShape argument to inputLayer, not both at the same time.');
            }
            var batchInputShape = config.batchInputShape;
            if (batchInputShape == null) {
                if (config.inputShape == null) {
                    throw new ValueError('An InputLayer should be passed either a ' +
                        '`batchInputShape` or an `inputShape`.');
                }
                else {
                    batchInputShape = [config.batchSize].concat(config.inputShape);
                }
            }
            else {
                if (config.batchSize != null) {
                    throw new ValueError('Cannot specify batchSize if batchInputShape is' +
                        'specified when creating an InputLayer.');
                }
            }
            var dtype = config.dtype || 'float32';
            _this.batchInputShape = batchInputShape;
            _this.dtype = dtype;
            _this.inputSpec = [{ shape: batchInputShape }];
            var inputTensor = new SymbolicTensor(_this.dtype, _this.batchInputShape, _this, [], {}, _this.name);
            inputTensor.nodeIndex = 0;
            inputTensor.tensorIndex = 0;
            new Node({
                outboundLayer: _this,
                inboundLayers: [],
                nodeIndices: [],
                tensorIndices: [],
                inputTensors: [inputTensor],
                outputTensors: [inputTensor],
                inputMasks: [null],
                outputMasks: [null],
                inputShapes: [batchInputShape],
                outputShapes: [batchInputShape]
            });
            return _this;
        }
        InputLayer.prototype.apply = function (inputs, kwargs) {
            throw new ValueError('Cannot pass any input to an ' +
                ("InputLayer's apply() method. InputLayer name: " + this.name));
        };
        InputLayer.prototype.dispose = function () {
            return { refCountAfterDispose: this._refCount, numDisposedVariables: 0 };
        };
        InputLayer.prototype.getConfig = function () {
            return {
                batchInputShape: this.batchInputShape,
                dtype: this.dtype,
                sparse: this.sparse,
                name: this.name
            };
        };
        InputLayer.className = 'InputLayer';
        return InputLayer;
    }(Layer));
    tfc.serialization.registerClass(InputLayer);
    function Input(config) {
        if (config.batchShape == null && config.shape == null) {
            throw new Error('Please provide to Input either a `shape`' +
                ' or a `batchShape` argument. Note that ' +
                '`shape` does not include the batch ' +
                'dimension.');
        }
        if (config.batchShape != null && config.shape != null) {
            throw new ValueError('Please provide either a `shape` or `batchShape` ' +
                'argument to Input, but not both.');
        }
        var batchShape = config.batchShape;
        if (config.shape != null && batchShape == null) {
            batchShape = [null].concat(config.shape);
        }
        var dtype = config.dtype;
        if (dtype == null) {
            dtype = 'float32';
        }
        var inputLayer = new InputLayer({
            batchInputShape: batchShape,
            name: config.name,
            dtype: dtype,
            sparse: config.sparse
        });
        var outputs = inputLayer.inboundNodes[0].outputTensors;
        return outputs[0];
    }

    function resolveScalarsInLogs(logs) {
        return __awaiter(this, void 0, void 0, function () {
            var promises, keys, scalarsToDispose, key, value, valueScalar, values, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (logs == null) {
                            return [2];
                        }
                        promises = [];
                        keys = [];
                        scalarsToDispose = [];
                        for (key in logs) {
                            value = logs[key];
                            if (typeof value !== 'number') {
                                valueScalar = value;
                                promises.push(valueScalar.data());
                                keys.push(key);
                                scalarsToDispose.push(valueScalar);
                            }
                        }
                        return [4, Promise.all(promises)];
                    case 1:
                        values = _a.sent();
                        for (i = 0; i < values.length; ++i) {
                            logs[keys[i]] = values[i][0];
                        }
                        tfc.dispose(scalarsToDispose);
                        return [2];
                }
            });
        });
    }
    function disposeTensorsInLogs(logs) {
        if (logs == null) {
            return;
        }
        for (var key in logs) {
            var value = logs[key];
            if (typeof value !== 'number') {
                value.dispose();
            }
        }
    }

    var ModelLoggingVerbosity;
    (function (ModelLoggingVerbosity) {
        ModelLoggingVerbosity[ModelLoggingVerbosity["SILENT"] = 0] = "SILENT";
        ModelLoggingVerbosity[ModelLoggingVerbosity["VERBOSE"] = 1] = "VERBOSE";
    })(ModelLoggingVerbosity || (ModelLoggingVerbosity = {}));
    var BaseCallback = (function () {
        function BaseCallback() {
            this.validationData = null;
        }
        BaseCallback.prototype.setParams = function (params) {
            this.params = params;
        };
        BaseCallback.prototype.onEpochBegin = function (epoch, logs) {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2];
            }); });
        };
        BaseCallback.prototype.onEpochEnd = function (epoch, logs) {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2];
            }); });
        };
        BaseCallback.prototype.onBatchBegin = function (batch, logs) {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2];
            }); });
        };
        BaseCallback.prototype.onBatchEnd = function (batch, logs) {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2];
            }); });
        };
        BaseCallback.prototype.onTrainBegin = function (logs) {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2];
            }); });
        };
        BaseCallback.prototype.onTrainEnd = function (logs) {
            return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2];
            }); });
        };
        BaseCallback.prototype.setModel = function (model) {
        };
        return BaseCallback;
    }());
    var CallbackList = (function () {
        function CallbackList(callbacks, queueLength) {
            if (queueLength === void 0) { queueLength = 10; }
            if (callbacks == null) {
                callbacks = [];
            }
            this.callbacks = callbacks;
            this.queueLength = queueLength;
        }
        CallbackList.prototype.append = function (callback) {
            this.callbacks.push(callback);
        };
        CallbackList.prototype.setParams = function (params) {
            for (var _i = 0, _a = this.callbacks; _i < _a.length; _i++) {
                var callback = _a[_i];
                callback.setParams(params);
            }
        };
        CallbackList.prototype.setModel = function (model) {
            for (var _i = 0, _a = this.callbacks; _i < _a.length; _i++) {
                var callback = _a[_i];
                callback.setModel(model);
            }
        };
        CallbackList.prototype.onEpochBegin = function (epoch, logs) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, callback;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (logs == null) {
                                logs = {};
                            }
                            _i = 0, _a = this.callbacks;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3, 4];
                            callback = _a[_i];
                            return [4, callback.onEpochBegin(epoch, logs)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3, 1];
                        case 4: return [2];
                    }
                });
            });
        };
        CallbackList.prototype.onEpochEnd = function (epoch, logs) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, callback;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (logs == null) {
                                logs = {};
                            }
                            _i = 0, _a = this.callbacks;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3, 4];
                            callback = _a[_i];
                            return [4, callback.onEpochEnd(epoch, logs)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3, 1];
                        case 4: return [2];
                    }
                });
            });
        };
        CallbackList.prototype.onBatchBegin = function (batch, logs) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, callback;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (logs == null) {
                                logs = {};
                            }
                            _i = 0, _a = this.callbacks;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3, 4];
                            callback = _a[_i];
                            return [4, callback.onBatchBegin(batch, logs)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3, 1];
                        case 4: return [2];
                    }
                });
            });
        };
        CallbackList.prototype.onBatchEnd = function (batch, logs) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, callback;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (logs == null) {
                                logs = {};
                            }
                            return [4, resolveScalarsInLogs(logs)];
                        case 1:
                            _b.sent();
                            _i = 0, _a = this.callbacks;
                            _b.label = 2;
                        case 2:
                            if (!(_i < _a.length)) return [3, 5];
                            callback = _a[_i];
                            return [4, callback.onBatchEnd(batch, logs)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            _i++;
                            return [3, 2];
                        case 5: return [2];
                    }
                });
            });
        };
        CallbackList.prototype.onTrainBegin = function (logs) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, callback;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (logs == null) {
                                logs = {};
                            }
                            _i = 0, _a = this.callbacks;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3, 4];
                            callback = _a[_i];
                            return [4, callback.onTrainBegin(logs)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3, 1];
                        case 4: return [2];
                    }
                });
            });
        };
        CallbackList.prototype.onTrainEnd = function (logs) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, callback;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (logs == null) {
                                logs = {};
                            }
                            _i = 0, _a = this.callbacks;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3, 4];
                            callback = _a[_i];
                            return [4, callback.onTrainEnd(logs)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3, 1];
                        case 4: return [2];
                    }
                });
            });
        };
        return CallbackList;
    }());
    var ModelTrainingYielder = (function () {
        function ModelTrainingYielder(yieldEvery) {
            this.yieldEvery = yieldEvery;
            this.batchCount = 0;
            this.batchDurationsMillis = [];
            this.autoYieldEveryBatches = null;
            this.batchStartMillis = tfc.util.now();
        }
        ModelTrainingYielder.prototype.resolveOneTensorInLogs = function (logs) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _i, key, value;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = [];
                            for (_b in logs)
                                _a.push(_b);
                            _i = 0;
                            _c.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3, 4];
                            key = _a[_i];
                            value = logs[key];
                            if (!(typeof value !== 'number')) return [3, 3];
                            return [4, value.data()];
                        case 2:
                            _c.sent();
                            return [3, 4];
                        case 3:
                            _i++;
                            return [3, 1];
                        case 4: return [2];
                    }
                });
            });
        };
        ModelTrainingYielder.prototype.maybeYieldOnBatch = function (logs) {
            return __awaiter(this, void 0, void 0, function () {
                var t, meanBatchDuration;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.yieldEvery === 'auto')) return [3, 7];
                            this.batchCount++;
                            if (!(this.autoYieldEveryBatches == null)) return [3, 3];
                            return [4, this.resolveOneTensorInLogs(logs)];
                        case 1:
                            _a.sent();
                            t = tfc.util.now();
                            return [4, tfc.nextFrame()];
                        case 2:
                            _a.sent();
                            if (this.batchCount > ModelTrainingYielder.SKIP_FIRST_BATCHES) {
                                this.batchDurationsMillis.push(t - this.batchStartMillis);
                                if (this.batchDurationsMillis.length >=
                                    ModelTrainingYielder.DECISION_BATCH_COUNT) {
                                    meanBatchDuration = this.batchDurationsMillis.reduce(function (dur, prev) { return dur + prev; }) /
                                        this.batchDurationsMillis.length;
                                    this.autoYieldEveryBatches = Math.round(ModelTrainingYielder.THRESHOLD_MILLIS / meanBatchDuration);
                                    if (this.autoYieldEveryBatches < 1) {
                                        this.autoYieldEveryBatches = 1;
                                    }
                                }
                            }
                            this.batchStartMillis = tfc.util.now();
                            this.lastYieldBatchCount = this.batchCount;
                            return [3, 6];
                        case 3:
                            if (!(this.batchCount - this.lastYieldBatchCount >=
                                this.autoYieldEveryBatches)) return [3, 6];
                            return [4, tfc.nextFrame()];
                        case 4:
                            _a.sent();
                            return [4, this.resolveOneTensorInLogs(logs)];
                        case 5:
                            _a.sent();
                            this.lastYieldBatchCount = this.batchCount;
                            _a.label = 6;
                        case 6: return [3, 9];
                        case 7:
                            if (!(this.yieldEvery === 'batch')) return [3, 9];
                            return [4, tfc.nextFrame()];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9: return [2];
                    }
                });
            });
        };
        ModelTrainingYielder.prototype.maybeYieldOnEpoch = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.yieldEvery === 'epoch')) return [3, 2];
                            return [4, tfc.nextFrame()];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2];
                    }
                });
            });
        };
        ModelTrainingYielder.SKIP_FIRST_BATCHES = 1;
        ModelTrainingYielder.DECISION_BATCH_COUNT = 2;
        ModelTrainingYielder.THRESHOLD_MILLIS = 16;
        return ModelTrainingYielder;
    }());
    var BaseLogger = (function (_super) {
        __extends(BaseLogger, _super);
        function BaseLogger(yieldEvery) {
            var _this = _super.call(this) || this;
            _this.yieldEvery = yieldEvery || 'auto';
            return _this;
        }
        BaseLogger.prototype.onTrainBegin = function (logs) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.autoYielder = new ModelTrainingYielder(this.yieldEvery);
                    return [2];
                });
            });
        };
        BaseLogger.prototype.onEpochBegin = function (epoch) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.seen = 0;
                    this.totals = {};
                    return [2];
                });
            });
        };
        BaseLogger.prototype.onBatchEnd = function (batch, logs) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var batchSize, _loop_1, this_1, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.autoYielder.maybeYieldOnBatch(logs)];
                        case 1:
                            _a.sent();
                            if (logs == null) {
                                logs = {};
                            }
                            batchSize = logs['size'] == null ? 0 : logs['size'];
                            this.seen += batchSize;
                            _loop_1 = function (key) {
                                var value = logs[key];
                                if (typeof value === 'number') {
                                    if (!this_1.totals.hasOwnProperty(key)) {
                                        this_1.totals[key] = 0;
                                    }
                                    this_1.totals[key] = this_1.totals[key] + value * batchSize;
                                }
                                else {
                                    var oldTotalsToDispose = void 0;
                                    if (key in this_1.totals) {
                                        oldTotalsToDispose = this_1.totals[key];
                                    }
                                    else {
                                        this_1.totals[key] = getScalar(0);
                                    }
                                    this_1.totals[key] = tfc.tidy(function () { return tfc.add(_this.totals[key], tfc.mul(value, getScalar(batchSize))); });
                                    if (oldTotalsToDispose != null) {
                                        oldTotalsToDispose.dispose();
                                    }
                                }
                            };
                            this_1 = this;
                            for (key in logs) {
                                _loop_1(key);
                            }
                            return [2];
                    }
                });
            });
        };
        BaseLogger.prototype.onEpochEnd = function (epoch, logs) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var _loop_2, this_2, _i, _a, key;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, this.autoYielder.maybeYieldOnEpoch()];
                        case 1:
                            _b.sent();
                            if (logs != null) {
                                _loop_2 = function (key) {
                                    if (this_2.totals[key] == null) {
                                        return "continue";
                                    }
                                    if (typeof this_2.totals[key] === 'number') {
                                        logs[key] = this_2.totals[key] / this_2.seen;
                                    }
                                    else {
                                        tfc.tidy(function () {
                                            logs[key] = tfc.mul(tfc.div(getScalar(1), getScalar(_this.seen)), _this.totals[key]);
                                            _this.totals[key].dispose();
                                            tfc.keep(logs[key]);
                                        });
                                    }
                                };
                                this_2 = this;
                                for (_i = 0, _a = this.params['metrics']; _i < _a.length; _i++) {
                                    key = _a[_i];
                                    _loop_2(key);
                                }
                            }
                            return [2];
                    }
                });
            });
        };
        return BaseLogger;
    }(BaseCallback));
    var History = (function (_super) {
        __extends(History, _super);
        function History() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        History.prototype.onTrainBegin = function (logs) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.epoch = [];
                    this.history = {};
                    return [2];
                });
            });
        };
        History.prototype.onEpochEnd = function (epoch, logs) {
            return __awaiter(this, void 0, void 0, function () {
                var key;
                return __generator(this, function (_a) {
                    if (logs == null) {
                        logs = {};
                    }
                    this.epoch.push(epoch);
                    for (key in logs) {
                        if (this.history[key] == null) {
                            this.history[key] = [];
                        }
                        this.history[key].push(logs[key]);
                    }
                    return [2];
                });
            });
        };
        History.prototype.syncData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var promises, keys, indices, key, valueArray, i, valueScalar, values, n, tensorToDispose;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            promises = [];
                            keys = [];
                            indices = [];
                            for (key in this.history) {
                                valueArray = this.history[key];
                                for (i = 0; i < valueArray.length; ++i) {
                                    if (typeof valueArray[i] !== 'number') {
                                        valueScalar = valueArray[i];
                                        promises.push(valueScalar.data());
                                        keys.push(key);
                                        indices.push(i);
                                    }
                                }
                            }
                            return [4, Promise.all(promises)];
                        case 1:
                            values = _a.sent();
                            for (n = 0; n < values.length; ++n) {
                                tensorToDispose = this.history[keys[n]][indices[n]];
                                tensorToDispose.dispose();
                                this.history[keys[n]][indices[n]] = values[n][0];
                            }
                            return [2];
                    }
                });
            });
        };
        return History;
    }(BaseCallback));
    var CustomCallback = (function (_super) {
        __extends(CustomCallback, _super);
        function CustomCallback(config) {
            var _this = _super.call(this) || this;
            _this.trainBegin = config.onTrainBegin;
            _this.trainEnd = config.onTrainEnd;
            _this.epochBegin = config.onEpochBegin;
            _this.epochEnd = config.onEpochEnd;
            _this.batchBegin = config.onBatchBegin;
            _this.batchEnd = config.onBatchEnd;
            return _this;
        }
        CustomCallback.prototype.onEpochBegin = function (epoch, logs) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.epochBegin != null)) return [3, 3];
                            return [4, resolveScalarsInLogs(logs)];
                        case 1:
                            _a.sent();
                            return [4, this.epochBegin(epoch, logs)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            });
        };
        CustomCallback.prototype.onEpochEnd = function (epoch, logs) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.epochEnd != null)) return [3, 3];
                            return [4, resolveScalarsInLogs(logs)];
                        case 1:
                            _a.sent();
                            return [4, this.epochEnd(epoch, logs)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            });
        };
        CustomCallback.prototype.onBatchBegin = function (batch, logs) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.batchBegin != null)) return [3, 3];
                            return [4, resolveScalarsInLogs(logs)];
                        case 1:
                            _a.sent();
                            return [4, this.batchBegin(batch, logs)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            });
        };
        CustomCallback.prototype.onBatchEnd = function (batch, logs) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.batchEnd != null)) return [3, 3];
                            return [4, resolveScalarsInLogs(logs)];
                        case 1:
                            _a.sent();
                            return [4, this.batchEnd(batch, logs)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            });
        };
        CustomCallback.prototype.onTrainBegin = function (logs) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.trainBegin != null)) return [3, 3];
                            return [4, resolveScalarsInLogs(logs)];
                        case 1:
                            _a.sent();
                            return [4, this.trainBegin(logs)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            });
        };
        CustomCallback.prototype.onTrainEnd = function (logs) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(this.trainEnd != null)) return [3, 3];
                            return [4, resolveScalarsInLogs(logs)];
                        case 1:
                            _a.sent();
                            return [4, this.trainEnd(logs)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2];
                    }
                });
            });
        };
        return CustomCallback;
    }(BaseCallback));
    function standardizeCallbacks(callbacks) {
        if (callbacks == null) {
            return null;
        }
        if (callbacks instanceof BaseCallback) {
            return [callbacks];
        }
        if (Array.isArray(callbacks) && callbacks[0] instanceof BaseCallback) {
            return callbacks;
        }
        var callbackConfigs = toList(callbacks);
        return callbackConfigs.map(function (callbackConfig) { return new CustomCallback(callbackConfig); });
    }
    var CallbackConstructorRegistry = (function () {
        function CallbackConstructorRegistry() {
        }
        CallbackConstructorRegistry.registerCallbackConstructor = function (verbosityLevel, callbackConstructor) {
            tfc.util.assert(verbosityLevel >= 0 && Number.isInteger(verbosityLevel), "Verbosity level is expected to be an integer >= 0, " +
                ("but got " + verbosityLevel));
            CallbackConstructorRegistry.checkForDuplicate(callbackConstructor);
            if (CallbackConstructorRegistry.constructors[verbosityLevel] == null) {
                CallbackConstructorRegistry.constructors[verbosityLevel] = [];
            }
            CallbackConstructorRegistry.constructors[verbosityLevel].push(callbackConstructor);
        };
        CallbackConstructorRegistry.checkForDuplicate = function (callbackConstructor) {
            for (var levelName in CallbackConstructorRegistry.constructors) {
                var constructors = CallbackConstructorRegistry.constructors[+levelName];
                constructors.forEach(function (ctor) {
                    if (ctor === callbackConstructor) {
                        throw new ValueError('Duplicate callback constructor.');
                    }
                });
            }
        };
        CallbackConstructorRegistry.clear = function () {
            CallbackConstructorRegistry.constructors = {};
        };
        CallbackConstructorRegistry.createCallbacks = function (verbosityLevel) {
            var constructors = [];
            for (var levelName in CallbackConstructorRegistry.constructors) {
                var level = +levelName;
                if (verbosityLevel >= level) {
                    constructors.push.apply(constructors, CallbackConstructorRegistry.constructors[level]);
                }
            }
            return constructors.map(function (ctor) { return new ctor(); });
        };
        CallbackConstructorRegistry.constructors = {};
        return CallbackConstructorRegistry;
    }());
    function configureCallbacks(callbacks, yieldEvery, verbose, epochs, initialEpoch, numTrainSamples, stepsPerEpoch, batchSize, doValidation, callbackMetrics) {
        var history = new History();
        var actualCallbacks = [
            new BaseLogger(yieldEvery)
        ].concat(CallbackConstructorRegistry.createCallbacks(verbose));
        if (callbacks != null) {
            actualCallbacks.push.apply(actualCallbacks, callbacks);
        }
        actualCallbacks.push(history);
        var callbackList = new CallbackList(actualCallbacks);
        callbackList.setParams({
            epochs: epochs,
            initialEpoch: initialEpoch,
            samples: numTrainSamples,
            steps: stepsPerEpoch,
            batchSize: batchSize,
            verbose: verbose,
            doValidation: doValidation,
            metrics: callbackMetrics,
        });
        return { callbackList: callbackList, history: history };
    }

    function l2Normalize(x, axis) {
        return tfc.tidy(function () {
            var squareSum = tfc.sum(square(x), axis, true);
            var epsilonTensor = tfc.mul(tfc.scalar(epsilon()), tfc.onesLike(x));
            var norm = tfc.sqrt(tfc.maximum(squareSum, epsilonTensor));
            return tfc.div(x, norm);
        });
    }
    function meanSquaredError(yTrue, yPred) {
        return tfc.tidy(function () { return tfc.mean(square(tfc.sub(yPred, yTrue)), -1); });
    }
    function meanAbsoluteError(yTrue, yPred) {
        return tfc.tidy(function () { return tfc.mean(tfc.abs(tfc.sub(yPred, yTrue)), -1); });
    }
    function meanAbsolutePercentageError(yTrue, yPred) {
        return tfc.tidy(function () {
            var diff = tfc.sub(yTrue, yPred);
            var clippedTrue = tfc.clipByValue(tfc.abs(yTrue), epsilon(), Number.MAX_VALUE);
            var absResult = tfc.abs(tfc.div(diff, clippedTrue));
            return tfc.mul(getScalar(100.0), tfc.mean(absResult, -1));
        });
    }
    function meanSquaredLogarithmicError(yTrue, yPred) {
        return tfc.tidy(function () {
            var one = getScalar(1.0);
            var clippedPred = tfc.clipByValue(yPred, epsilon(), Number.MAX_VALUE);
            var firstLog = tfc.log(tfc.add(one, clippedPred));
            var clippedTrue = tfc.clipByValue(yTrue, epsilon(), Number.MAX_VALUE);
            var secondLog = tfc.log(tfc.add(one, clippedTrue));
            return tfc.mean(square(tfc.sub(firstLog, secondLog)), -1);
        });
    }
    function squaredHinge(yTrue, yPred) {
        return tfc.tidy(function () {
            var zeroTensor = getScalar(0.0);
            var one = getScalar(1.0);
            var maxResult = tfc.maximum(zeroTensor, tfc.sub(one, tfc.mul(yTrue, yPred)));
            return tfc.mean(square(maxResult), -1);
        });
    }
    function hinge(yTrue, yPred) {
        return tfc.tidy(function () {
            var zeroTensor = getScalar(0.0);
            var one = getScalar(1.0);
            var maxResult = tfc.maximum(zeroTensor, tfc.sub(one, tfc.mul(yTrue, yPred)));
            return tfc.mean(maxResult, -1);
        });
    }
    function categoricalHinge(yTrue, yPred) {
        return tfc.tidy(function () {
            var zeroTensor = getScalar(0.0);
            var one = getScalar(1.0);
            var pos = tfc.sum(tfc.mul(yTrue, yPred), -1);
            var neg = tfc.max(tfc.mul(tfc.sub(one, yTrue), yPred), -1);
            return tfc.maximum(zeroTensor, tfc.add(one, tfc.sub(neg, pos)));
        });
    }
    function logcosh(yTrue, yPred) {
        return tfc.tidy(function () {
            var log2 = getScalar(Math.log(2.0));
            var predictionDiff = tfc.sub(yPred, yTrue);
            var logcoshResult = tfc.sub(tfc.add(predictionDiff, tfc.softplus(tfc.mul(getScalar(-2.0), predictionDiff))), log2);
            return tfc.mean(logcoshResult, -1);
        });
    }
    function categoricalCrossentropy(target, output, fromLogits) {
        if (fromLogits === void 0) { fromLogits = false; }
        return tfc.tidy(function () {
            if (fromLogits) {
                output = tfc.softmax(output);
            }
            else {
                var outputSum = tfc.sum(output, output.shape.length - 1, true);
                output = tfc.div(output, outputSum);
            }
            output = tfc.clipByValue(output, epsilon(), 1 - epsilon());
            return tfc.neg(tfc.sum(tfc.mul(target.toFloat(), tfc.log(output)), output.shape.length - 1));
        });
    }
    function sparseCategoricalCrossentropy(target, output, fromLogits) {
        if (fromLogits === void 0) { fromLogits = false; }
        return tfc.tidy(function () {
            var flatTarget = tfc.floor(flatten(target)).toInt();
            var outputShape = output.shape;
            var oneHotTarget = tfc.oneHot(flatTarget, outputShape[outputShape.length - 1])
                .reshape(outputShape);
            return categoricalCrossentropy(oneHotTarget, output, fromLogits);
        });
    }
    function sigmoidCrossEntropyWithLogits(target, output) {
        return tfc.tidy(function () {
            var maxOutput = tfc.maximum(output, tfc.zerosLike(output));
            var outputXTarget = tfc.mul(output, target);
            var sigmoidOutput = tfc.log(tfc.add(getScalar(1), tfc.exp(tfc.neg(tfc.abs(output)))));
            var result = tfc.add(tfc.sub(maxOutput, outputXTarget), sigmoidOutput);
            return result;
        });
    }
    function binaryCrossentropy(yTrue, yPred) {
        return tfc.tidy(function () {
            var y;
            y = tfc.clipByValue(yPred, epsilon(), 1 - epsilon());
            y = tfc.log(tfc.div(y, tfc.sub(tfc.onesLike(y), y)));
            return tfc.mean(sigmoidCrossEntropyWithLogits(yTrue, y), -1);
        });
    }
    function kullbackLeiblerDivergence(yTrue, yPred) {
        return tfc.tidy(function () {
            var clippedTrue = tfc.clipByValue(yTrue, epsilon(), 1);
            var clippedPred = tfc.clipByValue(yPred, epsilon(), 1);
            return tfc.sum(tfc.mul(yTrue, tfc.log(tfc.div(clippedTrue, clippedPred))), -1);
        });
    }
    function poisson(yTrue, yPred) {
        return tfc.tidy(function () {
            var logPred = tfc.log(tfc.add(getScalar(epsilon()), yPred));
            return tfc.mean(tfc.sub(yPred, tfc.mul(yTrue, logPred)), -1);
        });
    }
    function cosineProximity(yTrue, yPred) {
        return tfc.tidy(function () {
            var trueNormalized = l2Normalize(yTrue, -1);
            var predNormalized = l2Normalize(yPred, -1);
            var trueXPred = tfc.mul(trueNormalized, predNormalized);
            return tfc.neg(tfc.sum(trueXPred, -1));
        });
    }
    function get(identifierOrFn) {
        var lossesMap = {
            meanSquaredError: meanSquaredError,
            meanAbsoluteError: meanAbsoluteError,
            meanAbsolutePercentageError: meanAbsolutePercentageError,
            meanSquaredLogarithmicError: meanSquaredLogarithmicError,
            squaredHinge: squaredHinge,
            hinge: hinge,
            categoricalHinge: categoricalHinge,
            logcosh: logcosh,
            categoricalCrossentropy: categoricalCrossentropy,
            sparseCategoricalCrossentropy: sparseCategoricalCrossentropy,
            binaryCrossentropy: binaryCrossentropy,
            kullbackLeiblerDivergence: kullbackLeiblerDivergence,
            poisson: poisson,
            cosineProximity: cosineProximity
        };
        if (typeof identifierOrFn === 'string') {
            if (identifierOrFn in lossesMap) {
                return lossesMap[identifierOrFn];
            }
            var errMsg = "Unknown loss " + identifierOrFn;
            if (identifierOrFn.toLowerCase().includes('softmaxcrossentropy')) {
                errMsg = "Unknown loss " + identifierOrFn + ". " +
                    'Use "categoricalCrossentropy" as the string name for ' +
                    'tf.losses.softmaxCrossEntropy';
            }
            throw new ValueError(errMsg);
        }
        else {
            return identifierOrFn;
        }
    }

    function binaryAccuracy(yTrue, yPred) {
        return tfc.tidy(function () {
            var threshold = tfc.mul(getScalar(0.5), tfc.onesLike(yPred));
            var yPredThresholded = cast(tfc.greater(yPred, threshold), yTrue.dtype);
            return tfc.mean(tfc.equal(yTrue, yPredThresholded), -1);
        });
    }
    function categoricalAccuracy(yTrue, yPred) {
        return tfc.tidy(function () { return cast(tfc.equal(tfc.argMax(yTrue, -1), tfc.argMax(yPred, -1)), 'float32'); });
    }
    function truePositives(yTrue, yPred) {
        return tfc.tidy(function () {
            var one = getScalar(1);
            return tfc.logicalAnd(yTrue.equal(one), yPred.equal(one))
                .sum()
                .cast('float32');
        });
    }
    function falseNegatives(yTrue, yPred) {
        return tfc.tidy(function () {
            var one = getScalar(1);
            var zero = getScalar(0);
            return tfc.logicalAnd(yTrue.equal(one), yPred.equal(zero))
                .sum()
                .cast('float32');
        });
    }
    function falsePositives(yTrue, yPred) {
        return tfc.tidy(function () {
            var one = getScalar(1);
            var zero = getScalar(0);
            return tfc.logicalAnd(yTrue.equal(zero), yPred.equal(one))
                .sum()
                .cast('float32');
        });
    }
    function precision(yTrue, yPred) {
        return tfc.tidy(function () {
            var zero = getScalar(0);
            var tp = truePositives(yTrue, yPred);
            var fp = falsePositives(yTrue, yPred);
            var denominator = tp.add(fp);
            return tfc.where(tfc.greater(denominator, zero), tp.div(denominator), zero)
                .cast('float32');
        });
    }
    function recall(yTrue, yPred) {
        return tfc.tidy(function () {
            var zero = getScalar(0);
            var tp = truePositives(yTrue, yPred);
            var fn = falseNegatives(yTrue, yPred);
            var denominator = tp.add(fn);
            return tfc.where(tfc.greater(denominator, zero), tp.div(denominator), zero)
                .cast('float32');
        });
    }
    function binaryCrossentropy$1(yTrue, yPred) {
        return binaryCrossentropy(yTrue, yPred);
    }
    function sparseCategoricalAccuracy(yTrue, yPred) {
        throw new NotImplementedError();
    }
    var mse$1 = meanSquaredError;
    var MSE$1 = meanSquaredError;
    var mae$1 = meanAbsoluteError;
    var MAE$1 = meanAbsoluteError;
    var mape$1 = meanAbsolutePercentageError;
    var MAPE$1 = meanAbsolutePercentageError;
    var categoricalCrossentropy$1 = categoricalCrossentropy;
    var cosine$1 = cosineProximity;
    var sparseCategoricalCrossentropy$1 = sparseCategoricalCrossentropy;
    function get$1(identifier) {
        var metricsMap = {
            binaryAccuracy: binaryAccuracy,
            categoricalAccuracy: categoricalAccuracy,
            precision: precision,
            categoricalCrossentropy: categoricalCrossentropy$1,
            sparseCategoricalCrossentropy: sparseCategoricalCrossentropy$1,
            mse: mse$1,
            MSE: MSE$1,
            mae: mae$1,
            MAE: MAE$1,
            mape: mape$1,
            MAPE: MAPE$1,
            cosine: cosine$1,
        };
        if (typeof identifier === 'string' && identifier in metricsMap) {
            return metricsMap[identifier];
        }
        else if (typeof identifier !== 'string' && identifier != null) {
            return identifier;
        }
        else {
            throw new ValueError("Unknown metric " + identifier);
        }
    }

    function getOptimizer(identifier) {
        var optimizerMap = {
            'Adagrad': function () { return tfc.train.adagrad(0.01); },
            'Adadelta': function () { return tfc.train.adadelta(1, 0.95, epsilon()); },
            'Adam': function () { return tfc.train.adam(0.001, 0.9, 0.999, epsilon()); },
            'Adamax': function () { return tfc.train.adamax(0.002, 0.9, 0.999, epsilon(), 0); },
            'RMSProp': function () { return tfc.train.rmsprop(0.001, 0.9, 0, epsilon()); },
            'SGD': function () { return tfc.train.sgd(0.01); }
        };
        optimizerMap['adagrad'] = optimizerMap['Adagrad'];
        optimizerMap['adadelta'] = optimizerMap['Adadelta'];
        optimizerMap['adam'] = optimizerMap['Adam'];
        optimizerMap['adamax'] = optimizerMap['Adamax'];
        optimizerMap['rmsprop'] = optimizerMap['RMSProp'];
        optimizerMap['sgd'] = optimizerMap['SGD'];
        if (identifier in optimizerMap) {
            return optimizerMap[identifier]();
        }
        throw new ValueError("Unknown Optimizer " + identifier);
    }

    function printSummary(model, lineLength, positions, printFn) {
        if (printFn === void 0) { printFn = console.log; }
        var sequentialLike = isModelSequentialLike(model);
        var toDisplay = ['Layer (type)', 'Output shape', 'Param #'];
        if (sequentialLike) {
            lineLength = lineLength || 65;
            positions = positions || [0.45, 0.85, 1];
        }
        else {
            lineLength = lineLength || 98;
            positions = positions || [0.33, 0.55, 0.67, 1];
        }
        if (positions[positions.length - 1] <= 1) {
            positions = positions.map(function (p) { return Math.floor(lineLength * p); });
        }
        var relevantNodes;
        if (!sequentialLike) {
            toDisplay.push('Receives inputs');
            relevantNodes = [];
            for (var depth in model.nodesByDepth) {
                relevantNodes.push.apply(relevantNodes, model.nodesByDepth[depth]);
            }
        }
        printFn('_'.repeat(lineLength));
        printRow(toDisplay, positions, printFn);
        printFn('='.repeat(lineLength));
        var layers = model.layers;
        for (var i = 0; i < layers.length; ++i) {
            if (sequentialLike) {
                printLayerSummary(layers[i], positions, printFn);
            }
            else {
                printLayerSummaryWithConnections(layers[i], positions, relevantNodes, printFn);
            }
            printFn((i === layers.length - 1 ? '=' : '_').repeat(lineLength));
        }
        model.checkTrainableWeightsConsistency();
        var trainableCount = countTrainableParams(model);
        var nonTrainableCount = countParamsInWeights(model.nonTrainableWeights);
        printFn("Total params: " + (trainableCount + nonTrainableCount));
        printFn("Trainable params: " + trainableCount);
        printFn("Non-trainable params: " + nonTrainableCount);
        printFn('_'.repeat(lineLength));
    }
    function countTrainableParams(model) {
        var trainableCount;
        if (model.collectedTrainableWeights != null) {
            trainableCount =
                countParamsInWeights(model.collectedTrainableWeights);
        }
        else {
            trainableCount = countParamsInWeights(model.trainableWeights);
        }
        return trainableCount;
    }
    function isModelSequentialLike(model) {
        var sequentialLike = true;
        var nodesByDepth = [];
        var nodes = [];
        for (var depth in model.nodesByDepth) {
            nodesByDepth.push(model.nodesByDepth[depth]);
        }
        for (var _i = 0, nodesByDepth_1 = nodesByDepth; _i < nodesByDepth_1.length; _i++) {
            var depthNodes = nodesByDepth_1[_i];
            if (depthNodes.length > 1 ||
                depthNodes.length === 1 && depthNodes[0].inboundLayers.length > 1) {
                sequentialLike = false;
                break;
            }
            nodes.push.apply(nodes, depthNodes);
        }
        if (sequentialLike) {
            for (var _a = 0, _b = model.layers; _a < _b.length; _a++) {
                var layer = _b[_a];
                var flag = false;
                for (var _c = 0, _d = layer.inboundNodes; _c < _d.length; _c++) {
                    var node = _d[_c];
                    if (nodes.indexOf(node) !== -1) {
                        if (flag) {
                            sequentialLike = false;
                            break;
                        }
                        else {
                            flag = true;
                        }
                    }
                }
                if (!sequentialLike) {
                    break;
                }
            }
        }
        return sequentialLike;
    }
    function printRow(fields, positions, printFn) {
        if (printFn === void 0) { printFn = console.log; }
        var line = '';
        for (var i = 0; i < fields.length; ++i) {
            if (i > 0) {
                line = line.slice(0, line.length - 1) + ' ';
            }
            line += fields[i];
            line = line.slice(0, positions[i]);
            line += ' '.repeat(positions[i] - line.length);
        }
        printFn(line);
    }
    function printLayerSummary(layer, positions, printFn) {
        var outputShape;
        try {
            outputShape = JSON.stringify(layer.outputShape);
        }
        catch (err) {
            outputShape = 'multiple';
        }
        var name = layer.name;
        var className = layer.getClassName();
        var fields = [name + " (" + className + ")", outputShape, layer.countParams().toString()];
        printRow(fields, positions, printFn);
    }
    function printLayerSummaryWithConnections(layer, positions, relevantNodes, printFn) {
        var outputShape;
        try {
            outputShape = JSON.stringify(layer.outputShape);
        }
        catch (err) {
            outputShape = 'multiple';
        }
        var connections = [];
        for (var _i = 0, _a = layer.inboundNodes; _i < _a.length; _i++) {
            var node = _a[_i];
            if (relevantNodes != null && relevantNodes.length > 0 &&
                relevantNodes.indexOf(node) === -1) {
                continue;
            }
            for (var i = 0; i < node.inboundLayers.length; ++i) {
                var inboundLayer = node.inboundLayers[i].name;
                var inboundLayerIndex = node.nodeIndices[i];
                var inboundTensorIndex = node.tensorIndices[i];
                connections.push(inboundLayer + "[" + inboundLayerIndex + "][" + inboundTensorIndex + "]");
            }
        }
        var name = layer.name;
        var className = layer.getClassName();
        var firstConnection = connections.length === 0 ? '' : connections[0];
        var fields = [
            name + " (" + className + ")", outputShape, layer.countParams().toString(),
            firstConnection
        ];
        printRow(fields, positions, printFn);
        for (var i = 1; i < connections.length; ++i) {
            printRow(['', '', '', connections[i]], positions, printFn);
        }
    }

    function deserialize(config, customObjects) {
        if (customObjects === void 0) { customObjects = {}; }
        return deserializeKerasObject(config, tfc.serialization.SerializationMap.getMap().classNameMap, customObjects, 'layer');
    }

    function isArrayItemInputOrOutputName(key, index, value) {
        return (key === 'inboundNodes' || key === 'outputLayers' ||
            key === 'inputLayers') &&
            index === 0 && typeof value === 'string';
    }
    function convertPythonicToTs(pythonicConfig, key) {
        if (pythonicConfig === null) {
            return null;
        }
        else if (typeof pythonicConfig === 'string') {
            return toCamelCase(pythonicConfig);
        }
        else if ((typeof pythonicConfig === 'number') ||
            (typeof pythonicConfig === 'boolean')) {
            return pythonicConfig;
        }
        else if (pythonicConfig instanceof Array) {
            var tsArray = [];
            var arrayLength = pythonicConfig.length;
            for (var i = 0; i < arrayLength; ++i) {
                var item = pythonicConfig[i];
                if (isArrayItemInputOrOutputName(key, i, item)) {
                    tsArray.push(item);
                }
                else {
                    tsArray.push(convertPythonicToTs(item, key));
                }
            }
            return tsArray;
        }
        else {
            var tsDict = {};
            for (var _i = 0, _a = Object.keys(pythonicConfig); _i < _a.length; _i++) {
                var pythonicKey = _a[_i];
                var pythonicValue = pythonicConfig[pythonicKey];
                if (pythonicKey === 'name' && typeof pythonicValue === 'string') {
                    tsDict[pythonicKey] = pythonicValue;
                }
                else {
                    var tsKey = toCamelCase(pythonicKey);
                    tsDict[tsKey] = convertPythonicToTs(pythonicValue, tsKey);
                }
            }
            return tsDict;
        }
    }
    function convertTsToPythonic(tsConfig, key) {
        if (tsConfig === null || tsConfig === undefined) {
            return null;
        }
        else if (typeof tsConfig === 'string') {
            return toSnakeCase(tsConfig);
        }
        else if ((typeof tsConfig === 'number') || (typeof tsConfig === 'boolean')) {
            return tsConfig;
        }
        else if (tsConfig instanceof Array) {
            var pyArray = [];
            var arrayLength = tsConfig.length;
            for (var i = 0; i < arrayLength; ++i) {
                var item = tsConfig[i];
                if (isArrayItemInputOrOutputName(key, i, item)) {
                    pyArray.push(item);
                }
                else {
                    pyArray.push(convertTsToPythonic(item, key));
                }
            }
            return pyArray;
        }
        else {
            var pyDict = {};
            for (var _i = 0, _a = Object.keys(tsConfig); _i < _a.length; _i++) {
                var tsKey = _a[_i];
                var tsValue = tsConfig[tsKey];
                var pyKey = toSnakeCase(tsKey);
                if ((tsKey === 'name' || tsKey === 'className') &&
                    typeof tsValue === 'string') {
                    pyDict[pyKey] = tsValue;
                }
                else {
                    pyDict[pyKey] = convertTsToPythonic(tsValue, tsKey);
                }
            }
            return pyDict;
        }
    }

    var version = '0.8.5';

    function preprocessWeightsForLoading(layer, weights, originalKerasVersion, originalBackend) {
        if (!originalKerasVersion.startsWith('2.')) {
            throw new ValueError('Unsupported Keras version in weights being loaded: ' +
                originalKerasVersion);
        }
        return weights;
    }
    function loadTensor(dtype, shape, value) {
        var dataType = stringToDType(dtype);
        return tfc.Tensor.make(shape, { values: shape.length === 0 ? value : tfc.util.flatten(value) }, dataType);
    }
    function loadWeightsFromJson(weightsJSON, layers, skipMismatch) {
        if (skipMismatch === void 0) { skipMismatch = false; }
        var originalKerasVersion = weightsJSON['keras_version'];
        var originalBackend = weightsJSON['backend'];
        var layerNames = layers.map(function (layer) { return layer.name; });
        var index = {};
        for (var _i = 0, layers_1 = layers; _i < layers_1.length; _i++) {
            var layer = layers_1[_i];
            if (layer.name != null) {
                if (index[layer.name] == null) {
                    index[layer.name] = [];
                }
                index[layer.name].push(layer);
            }
        }
        var nameToWeights = weightsJSON['weights'];
        var weightValueTuples = [];
        for (var k = 0; k < layerNames.length; ++k) {
            var name_1 = layerNames[k];
            var layerWeights = nameToWeights[name_1];
            if (layerWeights == null) {
                layerWeights = [];
            }
            var weightValues = [];
            for (var n = 0; n < layerWeights.length; ++n) {
                var weightEntry = layerWeights[n];
                weightValues.push(new LayerVariable(loadTensor(weightEntry['dtype'], weightEntry['shape'], weightEntry['value'])));
            }
            for (var _a = 0, _b = index[name_1]; _a < _b.length; _a++) {
                var layer = _b[_a];
                var symbolicWeights = layer.weights;
                weightValues = preprocessWeightsForLoading(layer, weightValues, originalKerasVersion, originalBackend);
                if (weightValues.length !== symbolicWeights.length) {
                    if (skipMismatch) {
                        console.warn("Skipping loading of weights of layer " + layer.name + " " +
                            ("due to mismatch in number of weights: (" + weightValues.length + " ") +
                            ("vs " + symbolicWeights.length + ")."));
                    }
                    else {
                        throw new ValueError("Layer #" + k + " (named \"" + layer.name + "\") expects " +
                            (symbolicWeights.length + " weight(s), but the saved weights ") +
                            ("have " + weightValues.length + " element(s)."));
                    }
                }
                for (var i = 0; i < weightValues.length; ++i) {
                    if (skipMismatch) {
                        if (!tfc.util.arraysEqual(symbolicWeights[i].shape, weightValues[i].shape)) {
                            console.warn("Skipping loading of weights for layer " + layer.name + " due " +
                                ("to mismatch in shape (" + symbolicWeights[i].shape + " vs ") +
                                (weightValues[i].shape + ")"));
                            continue;
                        }
                    }
                    weightValueTuples.push([symbolicWeights[i], weightValues[i].read()]);
                }
            }
        }
        batchSetValue(weightValueTuples);
    }
    function loadWeightsFromNamedTensorMap(weights, layers, strict) {
        if (strict === void 0) { strict = true; }
        var nameToWeight = {};
        var totalWeightsCount = 0;
        for (var _i = 0, layers_2 = layers; _i < layers_2.length; _i++) {
            var layer = layers_2[_i];
            for (var _a = 0, _b = layer.weights; _a < _b.length; _a++) {
                var weight = _b[_a];
                if (nameToWeight[weight.originalName] != null) {
                    throw new ValueError("Duplicate weight name: " + weight.originalName);
                }
                nameToWeight[weight.originalName] = weight;
                totalWeightsCount++;
            }
        }
        var weightValueTuples = [];
        for (var name_2 in weights) {
            if (nameToWeight[name_2] != null) {
                weightValueTuples.push([nameToWeight[name_2], weights[name_2]]);
            }
            else if (strict) {
                throw new ValueError("Provided weight data has no target variable: " + name_2);
            }
            delete nameToWeight[name_2];
        }
        if (strict) {
            var unsetNames = [];
            for (var name_3 in nameToWeight) {
                unsetNames.push(name_3);
            }
            if (unsetNames.length > 0) {
                throw new ValueError(unsetNames.length + " of " + totalWeightsCount + " weights are not set: " +
                    ("" + unsetNames));
            }
        }
        batchSetValue(weightValueTuples);
    }
    var Container = (function (_super) {
        __extends(Container, _super);
        function Container(config) {
            var _this = _super.call(this, {}) || this;
            _this.containerNodes = new Set();
            _this.name = config.name;
            if (_this.name == null) {
                var prefix = _this.getClassName().toLowerCase();
                _this.name = getUid(prefix);
            }
            _this.supportsMasking = false;
            _this.trainable = true;
            _this.updatable = true;
            if (Array.isArray(config.inputs)) {
                _this.inputs = config.inputs.slice();
            }
            else {
                _this.inputs = [config.inputs];
            }
            if (Array.isArray(config.outputs)) {
                _this.outputs = config.outputs.slice();
            }
            else {
                _this.outputs = [config.outputs];
            }
            if (unique(_this.inputs).length !== _this.inputs.length) {
                throw new ValueError('The list of inputs passed to the model is ' +
                    'redundant. All inputs should only appear once. Found: ' +
                    _this.inputs.map(function (x) { return x.name; }));
            }
            if (unique(_this.outputs).length !== _this.outputs.length) {
                console.warn('The list of outputs passed to the model is redundant. ' +
                    'All outputs should only appear once. Found: ' +
                    _this.outputs.map(function (x) { return x.name; }));
            }
            _this.inputLayers = [];
            _this.inputLayersNodeIndices = [];
            _this.inputLayersTensorIndices = [];
            _this.outputLayers = [];
            _this.outputLayersNodeIndices = [];
            _this.outputLayersTensorIndices = [];
            _this.layers = [];
            for (var _i = 0, _a = _this.outputs; _i < _a.length; _i++) {
                var x = _a[_i];
                var layer = x.sourceLayer;
                var nodeIndex = x.nodeIndex;
                var tensorIndex = x.tensorIndex;
                _this.outputLayers.push(layer);
                _this.outputLayersNodeIndices.push(nodeIndex);
                _this.outputLayersTensorIndices.push(tensorIndex);
            }
            for (var _b = 0, _c = _this.inputs; _b < _c.length; _b++) {
                var x = _c[_b];
                var layer = x.sourceLayer;
                var nodeIndex = x.nodeIndex;
                var tensorIndex = x.tensorIndex;
                assert(nodeIndex === 0, 'input layer has >1 nodes');
                assert(tensorIndex === 0, 'input layer has >1 tensors');
                _this.inputLayers.push(layer);
                _this.inputLayersNodeIndices.push(nodeIndex);
                _this.inputLayersTensorIndices.push(tensorIndex);
            }
            _this.inputNames = [];
            _this.outputNames = [];
            _this.feedInputShapes = [];
            _this.feedInputNames = [];
            _this.feedOutputNames = [];
            for (var i = 0; i < _this.inputLayers.length; i++) {
                var layer = _this.inputLayers[i];
                if (!(layer instanceof InputLayer)) {
                    throw new TypeError('Input layers to a Model must be InputLayer objects. ' +
                        ("Received inputs: " + config.inputs + ". ") +
                        ("Input " + i + " (0-based) originates ") +
                        ("from layer type " + layer.getClassName() + "."));
                }
                _this.inputNames.push(layer.name);
                _this.feedInputShapes.push(layer.batchInputShape);
                _this.feedInputNames.push(layer.name);
            }
            for (var _d = 0, _e = _this.outputLayers; _d < _e.length; _d++) {
                var layer = _e[_d];
                _this.outputNames.push(layer.name);
            }
            _this.internalInputShapes = _this.inputs.map(function (x) { return x.shape; });
            _this.internalOutputShapes = _this.outputs.map(function (x) { return x.shape; });
            var nodesDepths = {};
            var nodeIDToNode = {};
            var layersDepths = {};
            var layerIDToLayer = {};
            var layerIndices = {};
            var nodesInDecreasingDepth = [];
            var buildMapOfGraph = function (tensor, finishedNodes, nodesInProgress, layer, nodeIndex, tensorIndex) {
                if (layer == null || nodeIndex == null || tensorIndex == null) {
                    layer = tensor.sourceLayer;
                    nodeIndex = tensor.nodeIndex;
                    tensorIndex = tensor.tensorIndex;
                }
                var node = layer.inboundNodes[nodeIndex];
                if (nodesInProgress.indexOf(node) !== -1) {
                    throw new RuntimeError("The tensor " + tensor.name + " at layer \"" + layer.name + "\" " +
                        'is part of a cycle.');
                }
                if (finishedNodes.indexOf(node) !== -1) {
                    return;
                }
                _this.containerNodes.add(Container.nodeKey(layer, nodeIndex));
                if (!(layer.id in layerIndices)) {
                    layerIndices[layer.id] = Object.keys(layerIndices).length;
                }
                if (nodesInProgress.indexOf(node) === -1) {
                    nodesInProgress.push(node);
                }
                var numInboundLayers = node.inboundLayers.length;
                for (var i = 0; i < numInboundLayers; i++) {
                    var x = node.inputTensors[i];
                    var layer_1 = node.inboundLayers[i];
                    var nodeIndex_1 = node.nodeIndices[i];
                    var tensorIndex_1 = node.tensorIndices[i];
                    buildMapOfGraph(x, finishedNodes, nodesInProgress, layer_1, nodeIndex_1, tensorIndex_1);
                }
                finishedNodes.push(node);
                while (nodesInProgress.indexOf(node) >= 0) {
                    nodesInProgress.splice(nodesInProgress.indexOf(node), 1);
                }
                nodesInDecreasingDepth.push(node);
            };
            var finishedNodes = [];
            var nodesInProgress = [];
            for (var _f = 0, _g = _this.outputs; _f < _g.length; _f++) {
                var x = _g[_f];
                buildMapOfGraph(x, finishedNodes, nodesInProgress);
            }
            var reversedNodesInDecreasingDepth = nodesInDecreasingDepth.slice().reverse();
            for (var _h = 0, reversedNodesInDecreasingDepth_1 = reversedNodesInDecreasingDepth; _h < reversedNodesInDecreasingDepth_1.length; _h++) {
                var node = reversedNodesInDecreasingDepth_1[_h];
                nodeIDToNode[node.id] = node;
                if (!(node.id in nodesDepths)) {
                    nodesDepths[node.id] = 0;
                }
                var depth = nodesDepths[node.id];
                var previousDepth = (layersDepths[node.outboundLayer.id] == null ?
                    0 :
                    layersDepths[node.outboundLayer.id]);
                depth = Math.max(depth, previousDepth);
                layersDepths[node.outboundLayer.id] = depth;
                layerIDToLayer[node.outboundLayer.id] = node.outboundLayer;
                nodesDepths[node.id] = depth;
                for (var i = 0; i < node.inboundLayers.length; i++) {
                    var inboundLayer = node.inboundLayers[i];
                    var nodeIndex = node.nodeIndices[i];
                    var inboundNode = inboundLayer.inboundNodes[nodeIndex];
                    var previousDepth_1 = (nodesDepths[inboundNode.id] == null ? 0 :
                        nodesDepths[inboundNode.id]);
                    nodesDepths[inboundNode.id] = Math.max(depth + 1, previousDepth_1);
                    nodeIDToNode[inboundNode.id] = inboundNode;
                }
            }
            var nodesByDepth = {};
            for (var nodeID in nodesDepths) {
                var depth = nodesDepths[nodeID];
                if (!(depth in nodesByDepth)) {
                    nodesByDepth[depth] = [];
                }
                nodesByDepth[depth].push(nodeIDToNode[nodeID]);
            }
            var layersByDepth = {};
            for (var layerID in layersDepths) {
                var depth = layersDepths[layerID];
                if (!(depth in layersByDepth)) {
                    layersByDepth[depth] = [];
                }
                layersByDepth[depth].push(layerIDToLayer[layerID]);
            }
            var depthKeys = Object.keys(layersByDepth)
                .map(function (x) { return parseInt(x, 10); })
                .sort(reverseNumberCompare);
            _this.layers = [];
            for (var _j = 0, depthKeys_1 = depthKeys; _j < depthKeys_1.length; _j++) {
                var depth = depthKeys_1[_j];
                var layersForDepth = layersByDepth[depth];
                layersForDepth.sort(function (a, b) {
                    var aIndex = layerIndices[a.id];
                    var bIndex = layerIndices[b.id];
                    if (aIndex < bIndex) {
                        return -1;
                    }
                    if (aIndex > bIndex) {
                        return 1;
                    }
                    return 0;
                });
                for (var _k = 0, layersForDepth_1 = layersForDepth; _k < layersForDepth_1.length; _k++) {
                    var layer = layersForDepth_1[_k];
                    _this.layers.push(layer);
                }
            }
            _this.layersByDepth = layersByDepth;
            depthKeys = Object.keys(nodesByDepth)
                .map(function (x) { return parseInt(x, 10); })
                .sort(reverseNumberCompare);
            var computableTensors = _this.inputs.slice();
            var layersWithCompleteInput = [];
            for (var _l = 0, depthKeys_2 = depthKeys; _l < depthKeys_2.length; _l++) {
                var depth = depthKeys_2[_l];
                for (var _m = 0, _o = nodesByDepth[depth]; _m < _o.length; _m++) {
                    var node = _o[_m];
                    var layer = node.outboundLayer;
                    if (layer != null) {
                        for (var _p = 0, _q = node.inputTensors; _p < _q.length; _p++) {
                            var x = _q[_p];
                            if (computableTensors.indexOf(x) === -1) {
                                throw new RuntimeError("Graph disconnected: cannot obtain value for tensor " + x +
                                    (" at layer \"" + layer.name + "\". ") +
                                    'The following previous layers were accessed without ' +
                                    ("issue: " + layersWithCompleteInput));
                            }
                        }
                        for (var _r = 0, _s = node.outputTensors; _r < _s.length; _r++) {
                            var x = _s[_r];
                            computableTensors.push(x);
                        }
                        layersWithCompleteInput.push(layer.name);
                    }
                }
            }
            _this.nodesByDepth = nodesByDepth;
            var allNames = _this.layers.map(function (x) { return x.name; });
            var _loop_1 = function (name_4) {
                var numOccurrences = allNames.filter(function (x) { return x === name_4; }).length;
                if (numOccurrences !== 1) {
                    throw new RuntimeError("The name \"" + name_4 + "\" is used " + numOccurrences + " times " +
                        'in the model. All layer names should be unique. Layer names: ' +
                        JSON.stringify(allNames));
                }
            };
            for (var _t = 0, allNames_1 = allNames; _t < allNames_1.length; _t++) {
                var name_4 = allNames_1[_t];
                _loop_1(name_4);
            }
            _this.outboundNodes = [];
            _this.inboundNodes = [];
            new Node({
                outboundLayer: _this,
                inboundLayers: [],
                nodeIndices: [],
                tensorIndices: [],
                inputTensors: _this.inputs,
                outputTensors: _this.outputs,
                inputMasks: _this.inputs.map(function (x) { return null; }),
                outputMasks: _this.outputs.map(function (x) { return null; }),
                inputShapes: _this.inputs.map(function (x) { return x.shape; }),
                outputShapes: _this.outputs.map(function (x) { return x.shape; })
            });
            _this.built = true;
            _this._refCount = 1;
            return _this;
        }
        Container.prototype.assertNotDisposed = function () {
            if (this._refCount === 0) {
                throw new Error("Container '" + this.name + "' is already disposed.");
            }
        };
        Container.prototype.dispose = function () {
            this.assertNotDisposed();
            var result = { refCountAfterDispose: null, numDisposedVariables: 0 };
            if (--this._refCount === 0) {
                for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
                    var layer = _a[_i];
                    result.numDisposedVariables += layer.dispose().numDisposedVariables;
                }
            }
            result.refCountAfterDispose = this._refCount;
            return result;
        };
        Object.defineProperty(Container.prototype, "trainableWeights", {
            get: function () {
                if (this._trainableWeights.length > 0) {
                    throw new ValueError('Container instance unexpectedly contains _trainableWeights.' +
                        'The trainable weights of a Container are a union of the ' +
                        'trainable weights of its consituent Layers. Its own ' +
                        '_trainableWeights must remain an empty Array.');
                }
                if (!this.trainable) {
                    return [];
                }
                var weights = [];
                for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
                    var layer = _a[_i];
                    weights = weights.concat(layer.trainableWeights);
                }
                return weights;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "nonTrainableWeights", {
            get: function () {
                var weights = [];
                for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
                    var layer = _a[_i];
                    weights.push.apply(weights, layer.nonTrainableWeights);
                }
                if (!this.trainable) {
                    var trainableWeights = [];
                    for (var _b = 0, _c = this.layers; _b < _c.length; _b++) {
                        var layer = _c[_b];
                        trainableWeights.push.apply(trainableWeights, layer.trainableWeights);
                    }
                    return trainableWeights.concat(weights);
                }
                return weights;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Container.prototype, "weights", {
            get: function () {
                return this.trainableWeights.concat(this.nonTrainableWeights);
            },
            enumerable: true,
            configurable: true
        });
        Container.prototype.loadWeights = function (weightsJSON, skipMismatch, isNamedTensorMap, strict) {
            if (skipMismatch === void 0) { skipMismatch = false; }
            if (isNamedTensorMap === void 0) { isNamedTensorMap = false; }
            if (strict === void 0) { strict = true; }
            if (isNamedTensorMap) {
                loadWeightsFromNamedTensorMap(weightsJSON, this.layers, strict);
            }
            else {
                loadWeightsFromJson(weightsJSON, this.layers, skipMismatch);
            }
        };
        Container.prototype.updatedConfig = function () {
            var theConfig = this.getConfig();
            var modelConfig = {
                className: this.getClassName(),
                config: theConfig,
                kerasVersion: "tfjs-layers " + version,
                backend: 'TensorFlow.js'
            };
            return modelConfig;
        };
        Container.prototype.toJSON = function (unused, returnString) {
            if (returnString === void 0) { returnString = true; }
            var modelConfig = convertTsToPythonic(this.updatedConfig());
            return returnString ? JSON.stringify(modelConfig) : modelConfig;
        };
        Container.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                inputs = toList(inputs);
                var masks;
                if ('mask' in kwargs) {
                    masks = toList(kwargs['mask']);
                }
                else {
                    masks = pyListRepeat(null, inputs.length);
                }
                return _this.runInternalGraph(inputs, masks)[0];
            });
        };
        Container.prototype.computeMask = function (inputs, mask) {
            var _this = this;
            return tfc.tidy(function () {
                inputs = toList(inputs);
                var masks;
                if (mask == null) {
                    masks = pyListRepeat(null, inputs.length);
                }
                else {
                    masks = toList(mask);
                }
                return _this.runInternalGraph(inputs, masks)[1];
            });
        };
        Container.prototype.computeOutputShape = function (inputShape) {
            var inputShapes = normalizeShapeList(inputShape);
            if (inputShapes.length !== this.inputLayers.length) {
                throw new ValueError("Invalid inputShape argument " + inputShape + ": " +
                    ("model has " + this.inputLayers.length + " tensor inputs."));
            }
            var layersToOutputShapes = {};
            for (var i = 0; i < inputShapes.length; i++) {
                var layer = this.inputLayers[i];
                var inputShape_1 = inputShapes[i];
                var shapeKey = layer.name + '_0_0';
                layersToOutputShapes[shapeKey] = inputShape_1;
            }
            var depthKeys = Object.keys(this.nodesByDepth)
                .map(function (x) { return parseInt(x, 10); })
                .sort(reverseNumberCompare);
            if (depthKeys.length > 1) {
                for (var _i = 0, depthKeys_3 = depthKeys; _i < depthKeys_3.length; _i++) {
                    var depth = depthKeys_3[_i];
                    var nodes = this.nodesByDepth[depth];
                    for (var _a = 0, nodes_1 = nodes; _a < nodes_1.length; _a++) {
                        var node = nodes_1[_a];
                        var layer = node.outboundLayer;
                        if (this.inputLayers.map(function (x) { return x.id; }).indexOf(layer.id) !== -1) {
                            continue;
                        }
                        var inputShapes_1 = [];
                        for (var j = 0; j < node.inboundLayers.length; j++) {
                            var inboundLayer = node.inboundLayers[j];
                            var nodeIndex_2 = node.nodeIndices[j];
                            var tensorIndex = node.tensorIndices[j];
                            var shapeKey = inboundLayer.name + "_" + nodeIndex_2 + "_" + tensorIndex;
                            var inputShape_2 = layersToOutputShapes[shapeKey];
                            inputShapes_1.push(inputShape_2);
                        }
                        var outputShape = layer.computeOutputShape(singletonOrArray(inputShapes_1));
                        var outputShapes_1 = normalizeShapeList(outputShape);
                        var nodeIndex = layer.inboundNodes.indexOf(node);
                        for (var j = 0; j < outputShapes_1.length; j++) {
                            var shapeKey = layer.name + "_" + nodeIndex + "_" + j;
                            layersToOutputShapes[shapeKey] = outputShapes_1[j];
                        }
                    }
                }
            }
            var outputShapes = [];
            var outputShapeKeys = [];
            for (var i = 0; i < this.outputLayers.length; i++) {
                var layer = this.outputLayers[i];
                var nodeIndex = this.outputLayersNodeIndices[i];
                var tensorIndex = this.outputLayersTensorIndices[i];
                var shapeKey = layer.name + "_" + nodeIndex + "_" + tensorIndex;
                outputShapeKeys.push(shapeKey);
            }
            for (var i = 0; i < outputShapeKeys.length; i++) {
                var key = outputShapeKeys[i];
                assert(key in layersToOutputShapes);
                outputShapes.push(layersToOutputShapes[key]);
            }
            return singletonOrArray(outputShapes);
        };
        Container.prototype.runInternalGraph = function (inputs, masks) {
            if (masks == null) {
                masks = pyListRepeat(null, inputs.length);
            }
            var tensorMap = {};
            for (var i = 0; i < this.inputs.length; ++i) {
                var x = this.inputs[i];
                var y = inputs[i];
                var mask = masks[i];
                tensorMap[x.id] = [y, mask];
            }
            var depthKeys = Object.keys(this.nodesByDepth)
                .map(function (x) { return parseInt(x, 10); })
                .sort(reverseNumberCompare);
            for (var _i = 0, depthKeys_4 = depthKeys; _i < depthKeys_4.length; _i++) {
                var depth = depthKeys_4[_i];
                var nodes = this.nodesByDepth[depth];
                for (var _a = 0, nodes_2 = nodes; _a < nodes_2.length; _a++) {
                    var node = nodes_2[_a];
                    var layer = node.outboundLayer;
                    var referenceInputTensors = node.inputTensors;
                    var referenceOutputTensors = node.outputTensors;
                    var computedData = new Array();
                    for (var _b = 0, referenceInputTensors_1 = referenceInputTensors; _b < referenceInputTensors_1.length; _b++) {
                        var x = referenceInputTensors_1[_b];
                        if (x.id in tensorMap) {
                            computedData.push(tensorMap[x.id]);
                        }
                    }
                    if (computedData.length === referenceInputTensors.length) {
                        var kwargs = {};
                        var computedTensors = void 0;
                        var computedMasks = void 0;
                        var outputTensors_1 = void 0;
                        var outputMasks_1 = void 0;
                        if (node.callArgs != null) {
                            kwargs = node.callArgs;
                        }
                        if (computedData.length === 1) {
                            var _c = computedData[0], computedTensor = _c[0], computedMask = _c[1];
                            if (kwargs.mask == null) {
                                kwargs['mask'] = computedMask;
                            }
                            outputTensors_1 =
                                toList(layer.call(computedTensor, kwargs));
                            outputMasks_1 = toList(layer.computeMask(computedTensor, computedMask));
                            computedTensors = [computedTensor];
                            computedMasks = [computedMask];
                        }
                        else {
                            computedTensors = computedData.map(function (x) { return x[0]; });
                            computedMasks = computedData.map(function (x) { return x[1]; });
                            if (kwargs.mask == null) {
                                kwargs['mask'] = computedMasks;
                            }
                            outputTensors_1 =
                                toList(layer.call(computedTensors, kwargs));
                            outputMasks_1 = toList(layer.computeMask(computedTensors, computedMasks));
                        }
                        if (layer.activityRegularizer) {
                            throw new NotImplementedError('Model invocation with concrete Tensor value(s) in the ' +
                                'presence of activity regularizer(s) is not supported yet.');
                        }
                        for (var i = 0; i < referenceOutputTensors.length; ++i) {
                            var x = referenceOutputTensors[i];
                            var y = outputTensors_1[i];
                            var mask = outputMasks_1[i];
                            tensorMap[x.id] = [y, mask];
                        }
                    }
                }
            }
            var outputTensors = [];
            var outputMasks = [];
            var outputShapes = [];
            for (var _d = 0, _e = this.outputs; _d < _e.length; _d++) {
                var x = _e[_d];
                assert(x.id in tensorMap, "Could not compute output " + x.name + " : " + x.id);
                var _f = tensorMap[x.id], tensor = _f[0], mask = _f[1];
                outputShapes.push(tensor.shape);
                outputTensors.push(tensor);
                outputMasks.push(mask);
            }
            return [outputTensors, outputMasks, outputShapes];
        };
        Container.prototype.buildNodeConversionMap = function (layers) {
            var nodeConversionMap = {};
            var keptNodes;
            for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
                var layer = _a[_i];
                keptNodes = layer instanceof Container ? 1 : 0;
                for (var originalNodeIndex = 0; originalNodeIndex < layer.inboundNodes.length; originalNodeIndex++) {
                    var nodeKey = Container.nodeKey(layer, originalNodeIndex);
                    if (this.containerNodes.has(nodeKey)) {
                        nodeConversionMap[nodeKey] = keptNodes;
                        keptNodes += 1;
                    }
                }
            }
            return nodeConversionMap;
        };
        Container.prototype.getLayer = function (name, index) {
            if (index != null) {
                if (this.layers.length <= index) {
                    throw new ValueError("Was asked to retrieve layer at index " + index + ", but model only " +
                        ("has " + this.layers.length + " layer(s)."));
                }
                else {
                    return this.layers[index];
                }
            }
            else {
                if (name == null) {
                    throw new ValueError('Provide either a layer name or layer index');
                }
            }
            for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
                var layer = _a[_i];
                if (layer.name === name) {
                    return layer;
                }
            }
            throw new ValueError("No such layer: " + name);
        };
        Container.prototype.calculateLosses = function () {
            var _this = this;
            return tfc.tidy(function () {
                var losses = [];
                for (var _i = 0, _a = _this.layers; _i < _a.length; _i++) {
                    var layer = _a[_i];
                    for (var nodeIndex = 0; nodeIndex < layer.inboundNodes.length; ++nodeIndex) {
                        var nodeKey = Container.nodeKey(layer, nodeIndex);
                        if (_this.containerNodes.has(nodeKey)) {
                            losses.push.apply(losses, layer.calculateLosses());
                        }
                    }
                }
                return losses;
            });
        };
        Container.prototype.getConfig = function () {
            var config = { name: this.name };
            var nodeConversionMap = this.buildNodeConversionMap(this.layers);
            var layerConfigs = [];
            for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
                var layer = _a[_i];
                var layerClassName = layer.getClassName();
                var layerConfig = layer.getConfig();
                var filteredInboundNodes = [];
                for (var originalNodeIndex = 0; originalNodeIndex < layer.inboundNodes.length; originalNodeIndex++) {
                    var node = layer.inboundNodes[originalNodeIndex];
                    var nodeKey = Container.nodeKey(layer, originalNodeIndex);
                    var kwargs = {};
                    if (this.containerNodes.has(nodeKey)) {
                        if (node.callArgs) {
                            try {
                                JSON.stringify(node.callArgs);
                                kwargs = node.callArgs;
                            }
                            catch (err) {
                                console.warn("Layer " + layer.name + " was passed " +
                                    "non-serializable keyword arguments: " +
                                    (node.callArgs + ". They will not be included ") +
                                    "in the serialized model (and thus will be " +
                                    "missing at deserialization time).");
                                kwargs = {};
                            }
                        }
                        if (node.inboundLayers.length > 0) {
                            var nodeData = [];
                            for (var i = 0; i < node.inboundLayers.length; i++) {
                                var inboundLayer = node.inboundLayers[i];
                                var nodeIndex = node.nodeIndices[i];
                                var tensorIndex = node.tensorIndices[i];
                                var nodeKey_1 = Container.nodeKey(inboundLayer, nodeIndex);
                                var newNodeIndex = nodeConversionMap[nodeKey_1];
                                if (newNodeIndex == null) {
                                    newNodeIndex = 0;
                                }
                                nodeData.push([inboundLayer.name, newNodeIndex, tensorIndex, kwargs]);
                            }
                            filteredInboundNodes.push(nodeData);
                        }
                    }
                }
                layerConfigs.push({
                    name: layer.name,
                    className: layerClassName,
                    config: layerConfig,
                    inboundNodes: filteredInboundNodes
                });
            }
            config['layers'] = layerConfigs;
            var modelInputs = [];
            for (var i = 0; i < this.inputLayers.length; i++) {
                var layer = this.inputLayers[i];
                var nodeIndex = this.inputLayersNodeIndices[i];
                var nodeKey = Container.nodeKey(layer, nodeIndex);
                if (!this.containerNodes.has(nodeKey)) {
                    continue;
                }
                var newNodeIndex = nodeConversionMap[nodeKey];
                if (newNodeIndex === null || newNodeIndex === undefined) {
                    newNodeIndex = 0;
                }
                var tensorIndex = this.inputLayersTensorIndices[i];
                modelInputs.push([layer.name, newNodeIndex, tensorIndex]);
            }
            config['inputLayers'] = modelInputs;
            var modelOutputs = [];
            for (var i = 0; i < this.outputLayers.length; i++) {
                var layer = this.outputLayers[i];
                var nodeIndex = this.outputLayersNodeIndices[i];
                var nodeKey = Container.nodeKey(layer, nodeIndex);
                if (!this.containerNodes.has(nodeKey)) {
                    continue;
                }
                var newNodeIndex = nodeConversionMap[nodeKey];
                if (newNodeIndex === null || newNodeIndex === undefined) {
                    newNodeIndex = 0;
                }
                var tensorIndex = this.outputLayersTensorIndices[i];
                modelOutputs.push([layer.name, newNodeIndex, tensorIndex]);
            }
            config['outputLayers'] = modelOutputs;
            return config;
        };
        Container.fromConfig = function (cls, config) {
            var createdLayers = {};
            var unprocessedNodes = {};
            function addUnprocessedNode(layer, nodeData) {
                if (!(layer.name in unprocessedNodes)) {
                    unprocessedNodes[layer.name] = [nodeData];
                }
                else {
                    unprocessedNodes[layer.name].push(nodeData);
                }
            }
            function processNode(layer, nodeData) {
                var inputTensors = [];
                var kwargs;
                for (var _i = 0, nodeData_1 = nodeData; _i < nodeData_1.length; _i++) {
                    var inputData = nodeData_1[_i];
                    var inboundLayerName = inputData[0];
                    var inboundNodeIndex = inputData[1];
                    var inboundTensorIndex = inputData[2];
                    if (inputData.length === 3) {
                        kwargs = {};
                    }
                    else if (inputData.length === 4) {
                        kwargs = inputData[3];
                    }
                    else {
                        throw new ValueError("Improperly formatted model config for layer " + JSON.stringify(layer) + ": " + JSON.stringify(inputData));
                    }
                    if (!(inboundLayerName in createdLayers)) {
                        addUnprocessedNode(layer, nodeData);
                        return;
                    }
                    var inboundLayer = createdLayers[inboundLayerName];
                    if (inboundLayer.inboundNodes.length <= inboundNodeIndex) {
                        addUnprocessedNode(layer, nodeData);
                        return;
                    }
                    var inboundNode = inboundLayer.inboundNodes[inboundNodeIndex];
                    inputTensors.push(inboundNode.outputTensors[inboundTensorIndex]);
                }
                if (inputTensors.length > 0) {
                    layer.apply(singletonOrArray(inputTensors), kwargs);
                }
            }
            function processLayer(layerData) {
                var layerName = layerData.name;
                var layer = deserialize(layerData, config.customObjects != null ?
                    config.customObjects :
                    {});
                createdLayers[layerName] = layer;
                var inboundNodesData = layerData.inboundNodes;
                for (var _i = 0, inboundNodesData_1 = inboundNodesData; _i < inboundNodesData_1.length; _i++) {
                    var nodeData = inboundNodesData_1[_i];
                    if (!(nodeData instanceof Array)) {
                        throw new ValueError("Corrupted configuration, expected array for nodeData: " + nodeData);
                    }
                    addUnprocessedNode(layer, nodeData);
                }
            }
            var name = config.name;
            var layersFromConfig = config.layers;
            for (var _i = 0, layersFromConfig_1 = layersFromConfig; _i < layersFromConfig_1.length; _i++) {
                var layerData = layersFromConfig_1[_i];
                processLayer(layerData);
            }
            while (!isObjectEmpty(unprocessedNodes)) {
                for (var _a = 0, layersFromConfig_2 = layersFromConfig; _a < layersFromConfig_2.length; _a++) {
                    var layerData = layersFromConfig_2[_a];
                    var layer = createdLayers[layerData.name];
                    if (layer.name in unprocessedNodes) {
                        var currentUnprocessedNodesForLayer = unprocessedNodes[layer.name];
                        delete unprocessedNodes[layer.name];
                        for (var _b = 0, currentUnprocessedNodesForLayer_1 = currentUnprocessedNodesForLayer; _b < currentUnprocessedNodesForLayer_1.length; _b++) {
                            var nodeData = currentUnprocessedNodesForLayer_1[_b];
                            processNode(layer, nodeData);
                        }
                    }
                }
            }
            var inputTensors = [];
            var outputTensors = [];
            var inputLayersFromConfig = config.inputLayers;
            for (var _c = 0, inputLayersFromConfig_1 = inputLayersFromConfig; _c < inputLayersFromConfig_1.length; _c++) {
                var layerData = inputLayersFromConfig_1[_c];
                var layerName = layerData[0];
                var nodeIndex = layerData[1];
                var tensorIndex = layerData[2];
                assert(layerName in createdLayers);
                var layer = createdLayers[layerName];
                var layerOutputTensors = layer.inboundNodes[nodeIndex].outputTensors;
                inputTensors.push(layerOutputTensors[tensorIndex]);
            }
            var outputLayersFromConfig = config.outputLayers;
            for (var _d = 0, outputLayersFromConfig_1 = outputLayersFromConfig; _d < outputLayersFromConfig_1.length; _d++) {
                var layerData = outputLayersFromConfig_1[_d];
                var layerName = layerData[0];
                var nodeIndex = layerData[1];
                var tensorIndex = layerData[2];
                assert(layerName in createdLayers);
                var layer = createdLayers[layerName];
                var layerOutputTensors = layer.inboundNodes[nodeIndex].outputTensors;
                outputTensors.push(layerOutputTensors[tensorIndex]);
            }
            return new cls({ inputs: inputTensors, outputs: outputTensors, name: name });
        };
        Object.defineProperty(Container.prototype, "stateful", {
            get: function () {
                if (this._stateful) {
                    throw new ValueError('Container instance unexpectedly has _stateful = true. The ' +
                        'statefulness of a Container is determined by the Layers it ' +
                        'contains. Its _stateful property must remain the default false.');
                }
                for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
                    var layer = _a[_i];
                    if (layer.stateful) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Container.prototype.resetStates = function () {
            var _this = this;
            tfc.tidy(function () {
                _this.layers.forEach(function (layer) {
                    if (layer.stateful) {
                        layer.resetStates();
                    }
                });
            });
        };
        return Container;
    }(Layer));

    function assertFeedCompatibility(key, val) {
        if (key.shape != null) {
            if (key.shape.length !== val.shape.length) {
                throw new ValueError("The rank of feed (" + val.shape.length + ") does not match the rank of " +
                    ("the key (" + key.shape.length + ")."));
            }
            for (var i = 0; i < key.shape.length; ++i) {
                if (key.shape[i] != null && key.shape[i] !== val.shape[i]) {
                    throw new ValueError("The " + i + "-th dimension of the feed (" + val.shape[i] + ") is " +
                        ("incompatible with that of the key (" + key.shape[i] + ")."));
                }
            }
        }
        if (key.dtype == null || key.dtype === val.dtype) {
            return val;
        }
        try {
            return tfc.cast(val, key.dtype);
        }
        catch (err) {
            throw new ValueError("The dtype of the feed (" + val.dtype + ") can not be cast to the dtype " +
                ("of the key '" + key.name + "' (" + key.dtype + ")."));
        }
    }
    var FeedDict = (function () {
        function FeedDict(feeds) {
            this.id2Value = {};
            if (feeds instanceof FeedDict) {
                for (var id in feeds.id2Value) {
                    this.id2Value[id] = feeds.id2Value[id];
                }
            }
            else {
                if (feeds == null) {
                    return;
                }
                for (var _i = 0, feeds_1 = feeds; _i < feeds_1.length; _i++) {
                    var feed = feeds_1[_i];
                    this.add(feed.key, feed.value);
                }
            }
        }
        FeedDict.prototype.add = function (key, value) {
            if (this.id2Value[key.id] == null) {
                this.id2Value[key.id] = assertFeedCompatibility(key, value);
            }
            else {
                throw new ValueError("Duplicate key: name=" + key.name + ", id=" + key.id);
            }
            return this;
        };
        FeedDict.prototype.addFeed = function (feed) {
            this.add(feed.key, feed.value);
        };
        FeedDict.prototype.hasKey = function (key) {
            return this.id2Value[key.id] != null;
        };
        FeedDict.prototype.getValue = function (key) {
            if (this.id2Value[key.id] == null) {
                throw new ValueError("Nonexistent key: " + JSON.stringify(key));
            }
            else {
                return this.id2Value[key.id];
            }
        };
        return FeedDict;
    }());
    function execute(fetches, feedDict, kwargs) {
        var arrayFetches = Array.isArray(fetches);
        var fetchArray = arrayFetches ? fetches : [fetches];
        var outputs = [];
        var internalFeedDict = new FeedDict(feedDict);
        for (var _i = 0, fetchArray_1 = fetchArray; _i < fetchArray_1.length; _i++) {
            var fetch_1 = fetchArray_1[_i];
            outputs.push(executeInternal(fetch_1, internalFeedDict, kwargs));
        }
        return arrayFetches ? outputs : outputs[0];
    }
    function executeInternal(fetch, internalFeedDict, kwargs) {
        if (internalFeedDict.hasKey(fetch)) {
            return internalFeedDict.getValue(fetch);
        }
        if (fetch.sourceLayer instanceof InputLayer) {
            throw new ValueError("Missing a feed value for SymbolicTensor from InputLayer " +
                ("'" + InputLayer.name + "'"));
        }
        var inputs = fetch.inputs;
        var inputValues = [];
        for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
            var input = inputs_1[_i];
            var inputVal = executeInternal(input, internalFeedDict, kwargs);
            inputValues.push(inputVal);
        }
        var output = fetch.sourceLayer.apply(inputValues, kwargs);
        if (!Array.isArray(output)) {
            output = [output];
        }
        var layerOutputs = getNodeOutputs(fetch);
        var outputSymbolicTensors = Array.isArray(layerOutputs) ? layerOutputs : [layerOutputs];
        for (var i = 0; i < outputSymbolicTensors.length; ++i) {
            internalFeedDict.add(outputSymbolicTensors[i], output[i]);
        }
        return output.length === 1 ? output[0] : output[fetch.outputTensorIndex];
    }
    function getNodeOutputs(fetch) {
        var layerOutputs;
        if (fetch.sourceLayer.inboundNodes.length === 1) {
            layerOutputs = fetch.sourceLayer.output;
        }
        else {
            var nodeIndex = null;
            for (var i = 0; i < fetch.sourceLayer.inboundNodes.length; ++i) {
                for (var _i = 0, _a = fetch.sourceLayer.inboundNodes[i]
                    .outputTensors; _i < _a.length; _i++) {
                    var outputTensor = _a[_i];
                    if (outputTensor.id === fetch.id) {
                        nodeIndex = i;
                        break;
                    }
                }
            }
            layerOutputs = fetch.sourceLayer.getOutputAt(nodeIndex);
        }
        return layerOutputs;
    }

    var DEFAULT_VALIDATION_BATCH_SIZE = 32;
    function standardizeDataIteratorOutput(model, iteratorOut) {
        if (model.outputs.length > 1) {
            throw new NotImplementedError("Support for training a model with multiple output tensors with " +
                "a dataset object is not implemented yet.");
        }
        tfc.util.assert(Array.isArray(iteratorOut) && iteratorOut.length === 2, 'Dataset iterator for fitDataset() is expected to generate ' +
            'an Array of length 2: `[xs, ys]`, but instead generates ' +
            iteratorOut);
        iteratorOut = iteratorOut;
        var ys = iteratorOut[1];
        var xs = iteratorOut[0];
        if (xs instanceof tfc.Tensor) {
            tfc.util.assert(model.inputs.length === 1, "Model has multiple " + model.inputs.length + " inputs, hence it " +
                "expects the input dataset to generate a dictionary of tensors " +
                (" (with keys " + JSON.stringify(model.inputNames) + ", ") +
                "but received a single tensor.");
            tfc.util.assert(xs.shape[0] === ys.shape[0], "Mismatch in batch size between x and y tensors (" + xs.shape[0] + " vs. " +
                (ys.shape[0] + ")"));
            return [xs, ys];
        }
        else {
            var batchSize = void 0;
            xs = xs;
            var flattendXs = [];
            for (var _i = 0, _a = model.inputNames; _i < _a.length; _i++) {
                var inputName = _a[_i];
                if (xs[inputName] == null) {
                    throw new ValueError("The feature data generated by the dataset lacks the required " +
                        ("input key '" + inputName + "'."));
                }
                flattendXs.push(xs[inputName]);
                if (batchSize == null) {
                    batchSize = xs[inputName].shape[0];
                }
                else {
                    tfc.util.assert(xs[inputName].shape[0] === batchSize, "Mismatch in batch size between x and y tensors " +
                        ("(" + xs[inputName].shape[0] + " vs. " + ys.shape[0] + ")"));
                }
            }
            return flattendXs.concat(ys);
        }
    }
    function standardizeTensorValidationData(data) {
        if (data.length === 3) {
            throw new NotImplementedError('Validation with sample weights is not implemented yet.');
        }
        return { xs: data[0], ys: data[1] };
    }
    function fitDataset(model, dataset, config) {
        return __awaiter(this, void 0, void 0, function () {
            var hasBatchesPerEpoch, doValidation, valXs, valYs, validationData, trainFunction, outLabels, callbackMetrics, callbacks, _a, callbackList, history_1, epoch, epochLogs, dataIterator, stepsDone, batchIndex, iteratorOut, xsAndYs, batchLogs, outs, i, label, out, valOuts, _b, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        hasBatchesPerEpoch = config.batchesPerEpoch != null;
                        tfc.util.assert(model.optimizer != null, 'You must compile a model before training/testing. Use ' +
                            'Model.compile(modelCompileConfig).');
                        tfc.util.assert(config != null, "For fitDataset(), the 2nd argument (config) is required, " +
                            "but it is not provided in this call.");
                        tfc.util.assert(config.epochs != null && config.epochs > 0 &&
                            Number.isInteger(config.epochs), "For fitDataset(), config.epochs is expected to be a positive " +
                            ("integer, but got " + config.epochs));
                        tfc.util.assert(!hasBatchesPerEpoch ||
                            (config.batchesPerEpoch > 0 &&
                                Number.isInteger(config.batchesPerEpoch)), "For fitDataset(), config.batchesPerEpoch is expected to be a " +
                            ("positive integer if specified, but got " + config.batchesPerEpoch));
                        tfc.util.assert(config['validationSplit'] == null, '`validationSplit` is not supported by `fitDataset()`. ' +
                            'Use validationData instead.');
                        if (model.isTraining) {
                            throw new Error('Cannot start training because another fit() call is ongoing.');
                        }
                        model.isTraining = true;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, , 21, 22]);
                        doValidation = config.validationData != null;
                        valXs = void 0;
                        valYs = void 0;
                        if (doValidation) {
                            if (isDatasetObject(config.validationData)) {
                                tfc.util.assert(config.validationBatches == null ||
                                    (config.validationBatches > 0 &&
                                        Number.isInteger(config.validationBatches)), "For fitDataset() with dataset-based validation, " +
                                    "config.validationBatches is expected not to be provided, " +
                                    "or to be a positive integer, " +
                                    ("but got " + config.validationBatches));
                            }
                            else {
                                validationData = standardizeTensorValidationData(config.validationData);
                                valXs = validationData.xs;
                                valYs = validationData.ys;
                            }
                        }
                        trainFunction = model.makeTrainFunction();
                        outLabels = model.getDedupedMetricsNames();
                        callbackMetrics = void 0;
                        if (doValidation) {
                            callbackMetrics =
                                outLabels.slice().concat(outLabels.map(function (n) { return 'val_' + n; }));
                        }
                        else {
                            callbackMetrics = outLabels.slice();
                        }
                        callbacks = standardizeCallbacks(config.callbacks);
                        _a = configureCallbacks(callbacks, config.yieldEvery, config.verbose, config.epochs, null, null, config.batchesPerEpoch, null, doValidation, callbackMetrics), callbackList = _a.callbackList, history_1 = _a.history;
                        model.history = history_1;
                        return [4, callbackList.onTrainBegin()];
                    case 2:
                        _c.sent();
                        epoch = config.initialEpoch == null ? 0 : config.initialEpoch;
                        epochLogs = {};
                        return [4, dataset.iterator()];
                    case 3:
                        dataIterator = _c.sent();
                        _c.label = 4;
                    case 4:
                        if (!(epoch < config.epochs)) return [3, 18];
                        return [4, callbackList.onEpochBegin(epoch)];
                    case 5:
                        _c.sent();
                        stepsDone = 0;
                        batchIndex = 0;
                        if (!!hasBatchesPerEpoch) return [3, 7];
                        return [4, dataset.iterator()];
                    case 6:
                        dataIterator = _c.sent();
                        _c.label = 7;
                    case 7:
                        if (!(hasBatchesPerEpoch ? stepsDone < config.batchesPerEpoch : true)) return [3, 16];
                        return [4, dataIterator.next()];
                    case 8:
                        iteratorOut = _c.sent();
                        if (hasBatchesPerEpoch && iteratorOut.done) {
                            console.warn('You provided `batchesPerEpoch` as ' +
                                (config.batchesPerEpoch + ", ") +
                                'but your dataset iterator ran out of data after ' +
                                (stepsDone + " batches; ") +
                                'interrupting training. Make sure that your ' +
                                'dataset can generate at least `batchesPerEpoch * epochs` ' +
                                'batches (in this case, ' +
                                (config.batchesPerEpoch * config.epochs + " batches). ") +
                                'You may need to use the repeat() function when building ' +
                                'your dataset.');
                            return [3, 16];
                        }
                        if (!(iteratorOut.value != null)) return [3, 10];
                        xsAndYs = standardizeDataIteratorOutput(model, iteratorOut.value);
                        batchLogs = {};
                        batchLogs['batch'] = batchIndex;
                        batchLogs['size'] = xsAndYs[0].shape[0];
                        callbackList.onBatchBegin(batchIndex, batchLogs);
                        outs = trainFunction(xsAndYs);
                        tfc.dispose(xsAndYs);
                        for (i = 0; i < outLabels.length; ++i) {
                            label = outLabels[i];
                            out = outs[i];
                            batchLogs[label] = out;
                            tfc.keep(out);
                        }
                        return [4, callbackList.onBatchEnd(batchIndex, batchLogs)];
                    case 9:
                        _c.sent();
                        disposeTensorsInLogs(batchLogs);
                        batchIndex++;
                        stepsDone++;
                        _c.label = 10;
                    case 10:
                        if (!(hasBatchesPerEpoch ? stepsDone >= config.batchesPerEpoch :
                            iteratorOut.done)) return [3, 15];
                        if (!doValidation) return [3, 14];
                        valOuts = void 0;
                        if (!isDatasetObject(config.validationData)) return [3, 12];
                        _b = toList;
                        return [4, model.evaluateDataset(config.validationData, { batches: config.validationBatches })];
                    case 11:
                        valOuts = _b.apply(void 0, [_c.sent()]);
                        return [3, 13];
                    case 12:
                        valOuts = toList(model.evaluate(valXs, valYs, {
                            batchSize: config.validationBatchSize == null ?
                                DEFAULT_VALIDATION_BATCH_SIZE :
                                config.validationBatchSize,
                            verbose: 0
                        }));
                        _c.label = 13;
                    case 13:
                        for (i = 0; i < model.metricsNames.length; ++i) {
                            epochLogs["val_" + model.metricsNames[i]] = valOuts[i];
                        }
                        _c.label = 14;
                    case 14: return [3, 16];
                    case 15:
                        if (model.stopTraining_) {
                            return [3, 16];
                        }
                        return [3, 7];
                    case 16: return [4, callbackList.onEpochEnd(epoch, epochLogs)];
                    case 17:
                        _c.sent();
                        epoch++;
                        if (model.stopTraining_) {
                            return [3, 18];
                        }
                        return [3, 4];
                    case 18: return [4, callbackList.onTrainEnd()];
                    case 19:
                        _c.sent();
                        return [4, model.history.syncData()];
                    case 20:
                        _c.sent();
                        return [2, model.history];
                    case 21:
                        model.isTraining = false;
                        return [7];
                    case 22: return [2];
                }
            });
        });
    }
    function isDatasetObject(dataset) {
        return (typeof dataset.iterator === 'function');
    }
    function isLazyIteratorObject(iterator) {
        return (typeof iterator.next === 'function');
    }
    function evaluateDataset(model, dataset, config) {
        return __awaiter(this, void 0, void 0, function () {
            var hasBatches, f, outs, dataIterator, _a, numExamples, batch, _loop_1, state_1, _loop_2, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        hasBatches = config.batches != null;
                        f = model.testFunction;
                        outs = [];
                        if (config.verbose > 0) {
                            throw new NotImplementedError('Verbose mode is not implemented yet.');
                        }
                        tfc.util.assert(!hasBatches || (config.batches > 0 && Number.isInteger(config.batches)), 'Test loop expects `batches` to be a positive integer, but ' +
                            ("received " + JSON.stringify(config.batches)));
                        if (!isLazyIteratorObject(dataset)) return [3, 1];
                        _a = dataset;
                        return [3, 3];
                    case 1: return [4, dataset.iterator()];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        dataIterator = _a;
                        numExamples = 0;
                        batch = 0;
                        _loop_1 = function () {
                            var iteratorOut, xsAndYs_1, batchOuts, i, batchSize_1, _loop_3, i;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, dataIterator.next()];
                                    case 1:
                                        iteratorOut = _a.sent();
                                        if (iteratorOut.value) {
                                            xsAndYs_1 = standardizeDataIteratorOutput(model, iteratorOut.value);
                                            batchOuts = tfc.tidy(function () { return f(xsAndYs_1); });
                                            tfc.dispose(xsAndYs_1);
                                            if (batch === 0) {
                                                for (i = 0; i < batchOuts.length; ++i) {
                                                    outs.push(getScalar(0));
                                                }
                                            }
                                            batchSize_1 = xsAndYs_1[0].shape[0];
                                            _loop_3 = function (i) {
                                                var batchOut = batchOuts[i];
                                                var oldScalar = outs[i];
                                                outs[i] = tfc.tidy(function () { return tfc.add(outs[i], tfc.mul(getScalar(batchSize_1), batchOut)); });
                                                if (batch > 0) {
                                                    tfc.dispose(oldScalar);
                                                }
                                            };
                                            for (i = 0; i < batchOuts.length; ++i) {
                                                _loop_3(i);
                                            }
                                            tfc.dispose(batchOuts);
                                            numExamples += batchSize_1;
                                            ++batch;
                                        }
                                        if (iteratorOut.done) {
                                            if (hasBatches) {
                                                console.warn('Your dataset iterator ran out of data during evaluateDataset(). ' +
                                                    'Interrupting evalution. Make sure that your ' +
                                                    'dataset can generate at least `batches` ' +
                                                    ("batches (in this case, " + config.batches + " batches). ") +
                                                    'You may need to use the repeat() function when building ' +
                                                    'your dataset.');
                                            }
                                            return [2, "break"];
                                        }
                                        return [2];
                                }
                            });
                        };
                        _b.label = 4;
                    case 4:
                        if (!(hasBatches ? batch < config.batches : true)) return [3, 6];
                        return [5, _loop_1()];
                    case 5:
                        state_1 = _b.sent();
                        if (state_1 === "break")
                            return [3, 6];
                        return [3, 4];
                    case 6:
                        _loop_2 = function (i) {
                            var oldScalar = outs[i];
                            outs[i] =
                                tfc.tidy(function () { return tfc.div(outs[i], getScalar(numExamples)); });
                            tfc.dispose(oldScalar);
                        };
                        for (i = 0; i < outs.length; ++i) {
                            _loop_2(i);
                        }
                        return [2, singletonOrArray(outs)];
                }
            });
        });
    }

    function checkBatchSize(batchSize) {
        tfc.util.assert(batchSize > 0 && Number.isInteger(batchSize), "batchSize is required to be a positive integer, but got " + batchSize);
    }
    function sliceArrays(arrays, start, stop) {
        if (arrays == null) {
            return [null];
        }
        else if (Array.isArray(arrays)) {
            return arrays.map(function (array) { return sliceAlongFirstAxis(array, start, stop - start); });
        }
        else {
            return sliceAlongFirstAxis(arrays, start, stop - start);
        }
    }
    function sliceArraysByIndices(arrays, indices) {
        return tfc.tidy(function () {
            if (arrays == null) {
                return null;
            }
            else if (Array.isArray(arrays)) {
                return arrays.map(function (array) { return sliceArraysByIndices(array, indices); });
            }
            else {
                return gather(arrays, indices.dtype === 'int32' ? indices : indices.toInt());
            }
        });
    }
    function makeBatches(size, batchSize) {
        var output = [];
        var batchStart = 0;
        var batchEnd = null;
        while (batchStart < size) {
            batchEnd = batchStart + batchSize;
            if (batchEnd >= size) {
                batchEnd = size;
            }
            output.push([batchStart, batchEnd]);
            batchStart = batchEnd;
        }
        return output;
    }
    function fitLoop(model, f, ins, outLabels, batchSize, epochs, verbose, callbacks, valF, valIns, shuffle, callbackMetrics, initialEpoch, stepsPerEpoch, validationSteps, yieldEvery) {
        return __awaiter(this, void 0, void 0, function () {
            var doValidation, numTrainSamples, indexArray, _a, callbackList, history, _loop_1, epoch, state_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (batchSize == null) {
                            batchSize = 32;
                        }
                        if (epochs == null) {
                            epochs = 1;
                        }
                        if (shuffle == null) {
                            shuffle = true;
                        }
                        if (initialEpoch == null) {
                            initialEpoch = 0;
                        }
                        doValidation = false;
                        if (valF != null && valIns != null) {
                            doValidation = true;
                        }
                        if (validationSteps != null) {
                            doValidation = true;
                            if (stepsPerEpoch == null) {
                                throw new ValueError('Can only use `validationSteps` when doing step-wise training, ' +
                                    'i.e., `stepsPerEpoch` must be set.');
                            }
                        }
                        numTrainSamples = model.checkNumSamples(ins, batchSize, stepsPerEpoch, 'steps_per_epoch');
                        if (numTrainSamples != null) {
                            indexArray = range(0, numTrainSamples);
                        }
                        if (verbose == null) {
                            verbose = 1;
                        }
                        _a = configureCallbacks(callbacks, yieldEvery, verbose, epochs, initialEpoch, numTrainSamples, stepsPerEpoch, batchSize, doValidation, callbackMetrics), callbackList = _a.callbackList, history = _a.history;
                        callbackList.setModel(model);
                        model.history = history;
                        return [4, callbackList.onTrainBegin()];
                    case 1:
                        _b.sent();
                        model.stopTraining_ = false;
                        _loop_1 = function (epoch) {
                            var epochLogs, epochIndexArray1D_1, batches_1, _loop_2, batchIndex, state_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, callbackList.onEpochBegin(epoch)];
                                    case 1:
                                        _a.sent();
                                        epochLogs = {};
                                        if (!(stepsPerEpoch != null)) return [3, 2];
                                        throw new NotImplementedError('stepsPerEpoch mode is not implemented yet.');
                                    case 2:
                                        if (shuffle === 'batch') {
                                            throw new NotImplementedError('batch shuffling is not implemneted yet');
                                        }
                                        else if (shuffle) {
                                            tfc.util.shuffle(indexArray);
                                        }
                                        epochIndexArray1D_1 = tfc.tensor1d(indexArray);
                                        batches_1 = makeBatches(numTrainSamples, batchSize);
                                        _loop_2 = function (batchIndex) {
                                            var batchLogs;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        batchLogs = {};
                                                        return [4, callbackList.onBatchBegin(batchIndex, batchLogs)];
                                                    case 1:
                                                        _a.sent();
                                                        tfc.tidy(function () {
                                                            var batchStart = batches_1[batchIndex][0];
                                                            var batchEnd = batches_1[batchIndex][1];
                                                            var batchIds = sliceAlongFirstAxis(epochIndexArray1D_1, batchStart, batchEnd - batchStart);
                                                            batchLogs['batch'] = batchIndex;
                                                            batchLogs['size'] = batchEnd - batchStart;
                                                            var insBatch = sliceArraysByIndices(ins, batchIds);
                                                            var outs = f(insBatch);
                                                            for (var i = 0; i < outLabels.length; ++i) {
                                                                var label = outLabels[i];
                                                                var out = outs[i];
                                                                batchLogs[label] = out;
                                                                tfc.keep(out);
                                                            }
                                                            if (batchIndex === batches_1.length - 1) {
                                                                if (doValidation) {
                                                                    var valOuts = model.testLoop(valF, valIns, batchSize);
                                                                    for (var i = 0; i < outLabels.length; ++i) {
                                                                        var label = outLabels[i];
                                                                        var out = valOuts[i];
                                                                        tfc.keep(out);
                                                                        epochLogs['val_' + label] = out;
                                                                    }
                                                                }
                                                            }
                                                        });
                                                        return [4, callbackList.onBatchEnd(batchIndex, batchLogs)];
                                                    case 2:
                                                        _a.sent();
                                                        disposeTensorsInLogs(batchLogs);
                                                        if (model.stopTraining_) {
                                                            return [2, "break"];
                                                        }
                                                        return [2];
                                                }
                                            });
                                        };
                                        batchIndex = 0;
                                        _a.label = 3;
                                    case 3:
                                        if (!(batchIndex < batches_1.length)) return [3, 6];
                                        return [5, _loop_2(batchIndex)];
                                    case 4:
                                        state_2 = _a.sent();
                                        if (state_2 === "break")
                                            return [3, 6];
                                        _a.label = 5;
                                    case 5:
                                        ++batchIndex;
                                        return [3, 3];
                                    case 6:
                                        epochIndexArray1D_1.dispose();
                                        _a.label = 7;
                                    case 7: return [4, callbackList.onEpochEnd(epoch, epochLogs)];
                                    case 8:
                                        _a.sent();
                                        if (model.stopTraining_) {
                                            return [2, "break"];
                                        }
                                        return [2];
                                }
                            });
                        };
                        epoch = initialEpoch;
                        _b.label = 2;
                    case 2:
                        if (!(epoch < epochs)) return [3, 5];
                        return [5, _loop_1(epoch)];
                    case 3:
                        state_1 = _b.sent();
                        if (state_1 === "break")
                            return [3, 5];
                        _b.label = 4;
                    case 4:
                        ++epoch;
                        return [3, 2];
                    case 5: return [4, callbackList.onTrainEnd()];
                    case 6:
                        _b.sent();
                        return [4, model.history.syncData()];
                    case 7:
                        _b.sent();
                        return [2, model.history];
                }
            });
        });
    }
    function fitTensors(model, x, y, config) {
        if (config === void 0) { config = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var inputs, targets, inputValX, inputValY, valX, valY, batchSize, standardizedOuts, doValidation, valIns, valStandardized, splitAt, originalBatchSize, ins, trainFunction, outLabels, valFunction, callbackMetrics, callbacks, out;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (model.isTraining) {
                            throw new Error('Cannot start training because another fit() call is ongoing.');
                        }
                        model.isTraining = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        batchSize = config.batchSize == null ? 32 : config.batchSize;
                        checkBatchSize(batchSize);
                        standardizedOuts = model.standardizeUserData(x, y, false, batchSize);
                        inputs = standardizedOuts[0];
                        targets = standardizedOuts[1];
                        doValidation = false;
                        valIns = void 0;
                        if (config.validationData != null && config.validationData.length > 0) {
                            doValidation = true;
                            if (config.validationData.length === 2) {
                                inputValX = config.validationData[0];
                                inputValY = config.validationData[1];
                            }
                            else if (config.validationData.length === 3) {
                                throw new NotImplementedError('validationData including sample weights is not supported yet.');
                            }
                            else {
                                throw new ValueError("When passing validation data, it must contain 2 (valX, valY) " +
                                    "or 3 (valX, valY, valSampleWeight) items; " +
                                    (config.validationData + " is invalid."));
                            }
                            valStandardized = model.standardizeUserData(inputValX, inputValY, true, batchSize);
                            valX = valStandardized[0];
                            valY = valStandardized[1];
                            valIns = valX.concat(valY);
                        }
                        else if (config.validationSplit != null && config.validationSplit > 0 &&
                            config.validationSplit < 1) {
                            doValidation = true;
                            splitAt = Math.floor(inputs[0].shape[0] * (1 - config.validationSplit));
                            originalBatchSize = inputs[0].shape[0];
                            valX = sliceArrays(inputs, splitAt, originalBatchSize);
                            inputs = sliceArrays(inputs, 0, splitAt);
                            valY = sliceArrays(targets, splitAt, originalBatchSize);
                            targets = sliceArrays(targets, 0, splitAt);
                            valIns = valX.concat(valY);
                        }
                        else if (config.validationSteps != null) {
                            doValidation = true;
                        }
                        ins = inputs.concat(targets);
                        model.checkTrainableWeightsConsistency();
                        trainFunction = model.makeTrainFunction();
                        outLabels = model.getDedupedMetricsNames();
                        valFunction = void 0;
                        callbackMetrics = void 0;
                        if (doValidation) {
                            model.makeTestFunction();
                            valFunction = model.testFunction;
                            callbackMetrics =
                                outLabels.slice().concat(outLabels.map(function (n) { return 'val_' + n; }));
                        }
                        else {
                            valFunction = null;
                            valIns = [];
                            callbackMetrics = outLabels.slice();
                        }
                        callbacks = standardizeCallbacks(config.callbacks);
                        return [4, fitLoop(model, trainFunction, ins, outLabels, batchSize, config.epochs, config.verbose, callbacks, valFunction, valIns, config.shuffle, callbackMetrics, config.initialEpoch, null, null, config.yieldEvery)];
                    case 2:
                        out = _a.sent();
                        model.isTraining = false;
                        return [2, out];
                    case 3:
                        model.isTraining = false;
                        disposeNewTensors(inputs, x);
                        disposeNewTensors(targets, y);
                        disposeNewTensors(valX, inputValX);
                        disposeNewTensors(valY, inputValY);
                        return [7];
                    case 4: return [2];
                }
            });
        });
    }
    function ensureTensorsRank2OrHigher(tensors) {
        var outs = [];
        if (tensors instanceof tfc.Tensor) {
            tensors = [tensors];
        }
        for (var i = 0; i < tensors.length; ++i) {
            var tensor = tensors[i];
            if (tensor.rank === 1) {
                outs.push(expandDims(tensor, 1));
            }
            else if (tensor.rank === 0) {
                throw new Error('Expected tensor to be at least 1D, but received a 0D tensor ' +
                    '(scalar).');
            }
            else {
                outs.push(tensor);
            }
        }
        return outs;
    }
    function disposeNewTensors(tensors, refTensors) {
        if (tensors == null) {
            return;
        }
        var oldTensorIds = [];
        if (refTensors instanceof tfc.Tensor) {
            oldTensorIds.push(refTensors.id);
        }
        else if (Array.isArray(refTensors)) {
            refTensors.forEach(function (t) { return oldTensorIds.push(t.id); });
        }
        else if (refTensors != null) {
            for (var name_1 in refTensors) {
                var oldTensor = refTensors[name_1];
                oldTensorIds.push(oldTensor.id);
            }
        }
        var tensorsToDispose = [];
        if (tensors instanceof tfc.Tensor) {
            if (oldTensorIds.indexOf(tensors.id) === -1) {
                tensorsToDispose.push(tensors);
            }
        }
        else if (Array.isArray(tensors)) {
            tensors.forEach(function (t) {
                if (oldTensorIds.indexOf(t.id) === -1) {
                    tensorsToDispose.push(t);
                }
            });
        }
        else if (tensors != null) {
            for (var name_2 in tensors) {
                var tensor = tensors[name_2];
                if (oldTensorIds.indexOf(tensor.id) === -1) {
                    tensorsToDispose.push(tensor);
                }
            }
        }
        tensorsToDispose.forEach(function (t) {
            if (!t.isDisposed) {
                t.dispose();
            }
        });
    }

    function isDataTensor(x) {
        return x instanceof tfc.Tensor;
    }
    function isDataArray(x) {
        return Array.isArray(x);
    }
    function isDataDict(x) {
        return !isDataTensor(x) && !isDataArray(x);
    }
    function standardizeInputData(data, names, shapes, checkBatchAxis, exceptionPrefix) {
        if (checkBatchAxis === void 0) { checkBatchAxis = true; }
        if (exceptionPrefix === void 0) { exceptionPrefix = ''; }
        if (names == null || names.length === 0) {
            if (data != null) {
                var gotUnexpectedData = false;
                if (isDataArray(data) && data.length > 0) {
                    gotUnexpectedData = true;
                }
                else if (isDataDict(data)) {
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            gotUnexpectedData = true;
                            break;
                        }
                    }
                }
                else {
                    gotUnexpectedData = true;
                }
                if (gotUnexpectedData) {
                    throw new ValueError("Error when checking model " + exceptionPrefix + " expected no data, " +
                        ("but got " + data));
                }
            }
            return [];
        }
        if (data == null) {
            return names.map(function (name) { return null; });
        }
        var arrays;
        if (isDataDict(data)) {
            data = data;
            arrays = [];
            for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
                var name_1 = names_1[_i];
                if (data[name_1] == null) {
                    throw new ValueError("No data provided for \"" + name_1 + "\". Need data for each key in: " +
                        ("" + names));
                }
                arrays.push(data[name_1]);
            }
        }
        else if (isDataArray(data)) {
            data = data;
            if (data.length !== names.length) {
                throw new ValueError("Error when checking model " + exceptionPrefix + ": the Array of " +
                    "Tensors that you are passing to your model is not the size the " +
                    ("model expected. Expected to see " + names.length + " Tensor(s), but ") +
                    ("instead got the following list of Tensor(s): " + data));
            }
            arrays = data;
        }
        else {
            data = data;
            if (names.length > 1) {
                throw new ValueError("The model " + exceptionPrefix + " expects " + names.length + " Tensor(s), " +
                    ("but only received one Tensor. Found: Tensor with shape " + data.shape));
            }
            arrays = [data];
        }
        arrays = ensureTensorsRank2OrHigher(arrays);
        if (shapes != null) {
            for (var i = 0; i < names.length; ++i) {
                if (shapes[i] == null) {
                    continue;
                }
                var array = arrays[i];
                if (array.shape.length !== shapes[i].length) {
                    throw new ValueError("Error when checking " + exceptionPrefix + ": expected " + names[i] + " " +
                        ("to have " + shapes[i].length + " dimension(s). but got array with ") +
                        ("shape " + array.shape));
                }
                for (var j = 0; j < shapes[i].length; ++j) {
                    if (j === 0 && !checkBatchAxis) {
                        continue;
                    }
                    var dim = array.shape[j];
                    var refDim = shapes[i][j];
                    if (refDim != null && refDim >= 0 && dim !== refDim) {
                        throw new ValueError("Error when checking " + exceptionPrefix + ": expected " + names[i] + " " +
                            ("to have shape [" + shapes[i] + "], but got array with shape ") +
                            ("[" + array.shape + "]."));
                    }
                }
            }
        }
        return arrays;
    }
    function checkArrayLengths(inputs, targets, weights) {
        var setX = unique(inputs.map(function (input) { return input.shape[0]; }));
        setX.sort();
        var setY = unique(targets.map(function (target) { return target.shape[0]; }));
        setY.sort();
        if (setX.length > 1) {
            throw new ValueError("All input Tensors (x) should have the same number of samples. " +
                "Got array shapes: " +
                ("" + JSON.stringify(inputs.map(function (input) { return input.shape; }))));
        }
        if (setY.length > 1) {
            throw new ValueError("All target Tensors (y) should have the same number of samples. " +
                "Got array shapes: " +
                ("" + JSON.stringify(targets.map(function (target) { return target.shape; }))));
        }
        if (setX.length > 0 && setY.length > 0 && !tfc.util.arraysEqual(setX, setY)) {
            throw new ValueError("Input Tensors should have the same number of samples as target " +
                ("Tensors. Found " + setX[0] + " input sample(s) and " + setY[0] + " target ") +
                "sample(s).");
        }
    }
    function checkLossAndTargetCompatibility(targets, lossFns, outputShapes) {
        var keyLosses = [
            meanSquaredError, binaryCrossentropy,
            categoricalCrossentropy
        ];
        for (var i = 0; i < targets.length; ++i) {
            var y = targets[i];
            var loss = lossFns[i];
            var shape = outputShapes[i];
            if (loss == null) {
                continue;
            }
            if (loss === categoricalCrossentropy) {
                if (y.shape[y.shape.length - 1] === 1) {
                    throw new ValueError("You are passing a target array of shape " + y.shape + " while using " +
                        "a loss 'categorical_crossentropy'. 'categorical_crossentropy'" +
                        "expects targets to be binary matrices (1s and 0s) of shape " +
                        "[samples, classes].");
                }
            }
            if (keyLosses.indexOf(loss) !== -1) {
                var slicedYShape = y.shape.slice(1);
                var slicedShape = shape.slice(1);
                for (var j = 0; j < slicedYShape.length; ++j) {
                    var targetDim = slicedYShape[j];
                    var outDim = slicedShape[j];
                    if (outDim != null && targetDim !== outDim) {
                        throw new ValueError("A target Tensor with shape " + y.shape + " was passed for an " +
                            ("output of shape " + shape + ", while using a loss function that ") +
                            "expects targets to have the same shape as the output.");
                    }
                }
            }
        }
    }
    function checkInputData(data, names, shapes, checkBatchAxis, exceptionPrefix) {
        if (checkBatchAxis === void 0) { checkBatchAxis = true; }
        if (exceptionPrefix === void 0) { exceptionPrefix = ''; }
        var arrays;
        if (Array.isArray(data)) {
            if (data.length !== names.length) {
                throw new ValueError("Error when checking model " + exceptionPrefix + ": the Array of " +
                    "Tensors that you are passing to your model is not the size the " +
                    ("the model expected. Expected to see " + names.length + " Tensor(s),") +
                    (" but instead got " + data.length + " Tensors(s)."));
            }
            arrays = data;
        }
        else {
            if (names.length > 1) {
                throw new ValueError("The model expects " + names.length + " " + exceptionPrefix + " Tensors, " +
                    "but only received one Tensor. Found: array with shape " +
                    (JSON.stringify(data.shape) + "."));
            }
            arrays = [data];
        }
        if (shapes != null) {
            for (var i = 0; i < names.length; ++i) {
                if (shapes[i] == null) {
                    continue;
                }
                var array = arrays[i];
                if (array.shape.length !== shapes[i].length) {
                    throw new ValueError("Error when checking " + exceptionPrefix + ": expected " + names[i] + " " +
                        ("to have " + shapes[i].length + " dimension(s), but got array with ") +
                        ("shape " + JSON.stringify(array.shape)));
                }
                for (var j = 0; j < shapes[i].length; ++j) {
                    if (j === 0 && !checkBatchAxis) {
                        continue;
                    }
                    var dim = array.shape[j];
                    var refDim = shapes[i][j];
                    if (refDim != null) {
                        if (refDim !== dim) {
                            throw new ValueError("Error when checking " + exceptionPrefix + ": expected " +
                                (names[i] + " to have shape " + JSON.stringify(shapes[i]) + " but ") +
                                ("got array with shape " + JSON.stringify(array.shape) + "."));
                        }
                    }
                }
            }
        }
    }
    function collectMetrics(metrics, outputNames) {
        if (metrics == null || Array.isArray(metrics) && metrics.length === 0) {
            return outputNames.map(function (name) { return []; });
        }
        if (Array.isArray(metrics)) {
            return outputNames.map(function (name) { return metrics; });
        }
        else if (metrics != null) {
            var nestedMetrics = [];
            for (var _i = 0, outputNames_1 = outputNames; _i < outputNames_1.length; _i++) {
                var name_2 = outputNames_1[_i];
                var outputMetrics = metrics.hasOwnProperty(name_2) ? metrics[name_2] : [];
                if (!Array.isArray(outputMetrics)) {
                    outputMetrics = [outputMetrics];
                }
                nestedMetrics.push(outputMetrics);
            }
            return nestedMetrics;
        }
        else {
            throw new TypeError('Type of metrics argument not understood. Expected an Array or ' +
                'Object, found: ' + metrics);
        }
    }
    var Model = (function (_super) {
        __extends(Model, _super);
        function Model(config) {
            var _this = _super.call(this, config) || this;
            _this.isTraining = false;
            return _this;
        }
        Model.prototype.summary = function (lineLength, positions, printFn) {
            if (printFn === void 0) { printFn = console.log; }
            if (!this.built) {
                throw new ValueError("This model has never been called, thus its weights have not been " +
                    "created yet. So no summary can be displayed. Build the model " +
                    "first (e.g., by calling it on some test data).");
            }
            printSummary(this, lineLength, positions, printFn);
        };
        Model.prototype.compile = function (config) {
            var _this = this;
            if (config.loss == null) {
                config.loss = [];
            }
            this.loss = config.loss;
            if (typeof config.optimizer === 'string') {
                this.optimizer = getOptimizer(config.optimizer);
            }
            else {
                if (!(config.optimizer instanceof tfc.Optimizer)) {
                    throw new ValueError("User-defined optimizer must be an instance of tf.Optimizer.");
                }
                this.optimizer = config.optimizer;
            }
            var lossFunctions = [];
            if (!Array.isArray(config.loss) && typeof config.loss !== 'string' &&
                typeof config.loss !== 'function') {
                config.loss = config.loss;
                for (var name_3 in config.loss) {
                    if (this.outputNames.indexOf(name_3) === -1) {
                        throw new ValueError("Unknown entry in loss dictionary: \"" + name_3 + "\". Only expect the " +
                            ("following keys: " + this.outputNames));
                    }
                }
                for (var name_4 in this.outputNames) {
                    if (config.loss[name_4] == null) {
                        console.warn("Output \"" + name_4 + "\" is missing from loss dictionary. We assume " +
                            "this was done on purpose, and we will not be expecting data " +
                            ("to be passed to " + name_4 + " during training"));
                    }
                    lossFunctions.push(get(config.loss[name_4]));
                }
            }
            else if (Array.isArray(config.loss)) {
                if (config.loss.length !== this.outputs.length) {
                    throw new ValueError("When passing an Array as loss, it should have one entry per " +
                        ("model output. The model has " + this.outputs.length + " output(s), ") +
                        ("but you passed loss=" + config.loss + "."));
                }
                var theLosses = config.loss;
                lossFunctions = theLosses.map(function (l) { return get(l); });
            }
            else {
                var lossFunction_1 = get(config.loss);
                this.outputs.map(function (layer) {
                    lossFunctions.push(lossFunction_1);
                });
            }
            this.lossFunctions = lossFunctions;
            this.feedOutputNames = [];
            this.feedOutputShapes = [];
            this.feedLossFns = [];
            for (var i = 0; i < this.outputs.length; ++i) {
                var shape = this.internalOutputShapes[i];
                var name_5 = this.outputNames[i];
                this.feedOutputNames.push(name_5);
                this.feedOutputShapes.push(shape);
                this.feedLossFns.push(this.lossFunctions[i]);
            }
            var skipTargetIndices = [];
            this.metrics = config.metrics;
            this.metricsNames = ['loss'];
            this.metricsTensors = [];
            nameScope('loss', function () {
                for (var i = 0; i < _this.outputs.length; ++i) {
                    if (skipTargetIndices.indexOf(i) !== -1) {
                        continue;
                    }
                    var weightedLoss = _this.lossFunctions[i];
                    if (_this.outputs.length > 1) {
                        _this.metricsTensors.push([weightedLoss, i]);
                        _this.metricsNames.push(_this.outputNames[i] + '_loss');
                    }
                }
            });
            var nestedMetrics = collectMetrics(config.metrics, this.outputNames);
            var appendMetric = function (outputIndex, metricName, metricTensor) {
                if (_this.outputNames.length > 1) {
                    metricName = _this.outputNames[outputIndex] + '_' + metricName;
                }
                _this.metricsNames.push(metricName);
                _this.metricsTensors.push([metricTensor, outputIndex]);
            };
            nameScope('metric', function () {
                var _loop_1 = function (i) {
                    if (skipTargetIndices.indexOf(i) !== -1) {
                        return "continue";
                    }
                    var outputMetrics = nestedMetrics[i];
                    var handleMetrics = function (metrics) {
                        var metricNamePrefix = '';
                        var metricName;
                        var accFn;
                        var weightedMetricFn;
                        var _loop_2 = function (metric) {
                            if (['accuracy', 'acc', 'crossentropy', 'ce'].indexOf(metric) !==
                                -1) {
                                var outputShape = _this.internalOutputShapes[i];
                                if (outputShape[outputShape.length - 1] === 1 ||
                                    _this.lossFunctions[i] === binaryCrossentropy) {
                                    if (['accuracy', 'acc'].indexOf(metric) !== -1) {
                                        accFn = binaryAccuracy;
                                    }
                                    else if (['crossentropy', 'ce'].indexOf(metric) !== -1) {
                                        accFn = binaryCrossentropy$1;
                                    }
                                }
                                else if (_this.lossFunctions[i] ===
                                    sparseCategoricalCrossentropy) {
                                    if (['accuracy', 'acc'].indexOf(metric) !== -1) {
                                        accFn = sparseCategoricalAccuracy;
                                    }
                                    else if (['crossentropy', 'ce'].indexOf(metric) !== -1) {
                                        accFn = sparseCategoricalCrossentropy$1;
                                    }
                                }
                                else {
                                    if (['accuracy', 'acc'].indexOf(metric) !== -1) {
                                        accFn = categoricalAccuracy;
                                    }
                                    else if (['crossentropy', 'ce'].indexOf(metric) !== -1) {
                                        accFn = categoricalCrossentropy$1;
                                    }
                                }
                                var suffix = void 0;
                                if (['accuracy', 'acc'].indexOf(metric) !== -1) {
                                    suffix = 'acc';
                                }
                                else if (['crossentropy', 'ce'].indexOf(metric) !== -1) {
                                    suffix = 'ce';
                                }
                                weightedMetricFn = accFn;
                                metricName = metricNamePrefix + suffix;
                            }
                            else {
                                var metricFn = get$1(metric);
                                weightedMetricFn = metricFn;
                                metricName = metricNamePrefix + metric;
                            }
                            var metricResult;
                            nameScope(metricName, function () {
                                metricResult = weightedMetricFn;
                            });
                            appendMetric(i, metricName, metricResult);
                        };
                        for (var _i = 0, metrics_1 = metrics; _i < metrics_1.length; _i++) {
                            var metric = metrics_1[_i];
                            _loop_2(metric);
                        }
                    };
                    handleMetrics(outputMetrics);
                };
                for (var i = 0; i < _this.outputs.length; ++i) {
                    _loop_1(i);
                }
            });
            this.collectedTrainableWeights = this.trainableWeights;
        };
        Model.prototype.checkTrainableWeightsConsistency = function () {
            if (this.collectedTrainableWeights == null) {
                return;
            }
            if (this.trainableWeights.length !==
                this.collectedTrainableWeights.length) {
                console.warn('Discrepancy between trainableweights and collected trainable ' +
                    'weights. Did you set `model.trainable` without calling ' +
                    '`model.compile()` afterwards?');
            }
        };
        Model.prototype.evaluate = function (x, y, config) {
            if (config === void 0) { config = {}; }
            var batchSize = config.batchSize == null ? 32 : config.batchSize;
            checkBatchSize(batchSize);
            var standardizedOuts = this.standardizeUserData(x, y, true, batchSize);
            try {
                var ins = standardizedOuts[0].concat(standardizedOuts[1]);
                this.makeTestFunction();
                var f = this.testFunction;
                var testOuts = this.testLoop(f, ins, batchSize, config.verbose, config.steps);
                return singletonOrArray(testOuts);
            }
            finally {
                disposeNewTensors(standardizedOuts[0], x);
                disposeNewTensors(standardizedOuts[1], y);
            }
        };
        Model.prototype.evaluateDataset = function (dataset, config) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    this.makeTestFunction();
                    return [2, evaluateDataset(this, dataset, config)];
                });
            });
        };
        Model.prototype.checkNumSamples = function (ins, batchSize, steps, stepsName) {
            if (stepsName === void 0) { stepsName = 'steps'; }
            var numSamples;
            if (steps != null) {
                numSamples = null;
                if (batchSize != null) {
                    throw new ValueError("If " + stepsName + " is set, batchSize must be null or undefined." +
                        ("Got batchSize = " + batchSize));
                }
            }
            else if (ins != null) {
                if (Array.isArray(ins)) {
                    numSamples = ins[0].shape[0];
                }
                else {
                    numSamples = ins.shape[0];
                }
            }
            else {
                throw new ValueError("Either the input data should have a defined shape, or " +
                    (stepsName + " shoud be specified."));
            }
            return numSamples;
        };
        Model.prototype.execute = function (inputs, outputs) {
            if (Array.isArray(outputs) && outputs.length === 0) {
                throw new ValueError('`outputs` is an empty Array, which is not allowed.');
            }
            var outputsIsArray = Array.isArray(outputs);
            var outputNames = (outputsIsArray ? outputs :
                [outputs]);
            var outputSymbolicTensors = this.retrieveSymbolicTensors(outputNames);
            var feedDict = new FeedDict();
            if (inputs instanceof tfc.Tensor) {
                inputs = [inputs];
            }
            if (Array.isArray(inputs)) {
                if (inputs.length !== this.inputs.length) {
                    throw new ValueError("The number of inputs provided (" + inputs.length + ") " +
                        "does not match the number of inputs of this model " +
                        ("(" + this.inputs.length + ")."));
                }
                for (var i = 0; i < this.inputs.length; ++i) {
                    feedDict.add(this.inputs[i], inputs[i]);
                }
            }
            else {
                for (var _i = 0, _a = this.inputs; _i < _a.length; _i++) {
                    var input = _a[_i];
                    var tensorValue = inputs[input.name];
                    if (tensorValue == null) {
                        throw new ValueError("No value is provided for the model's input " + input.name);
                    }
                    feedDict.add(input, tensorValue);
                }
            }
            var executeOutputs = execute(outputSymbolicTensors, feedDict);
            return outputsIsArray ? executeOutputs : executeOutputs[0];
        };
        Model.prototype.retrieveSymbolicTensors = function (symbolicTensorNames) {
            var outputSymbolicTensors = pyListRepeat(null, symbolicTensorNames.length);
            var outputsRemaining = symbolicTensorNames.length;
            for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
                var layer = _a[_i];
                var layerOutputs = Array.isArray(layer.output) ?
                    layer.output :
                    [layer.output];
                var layerOutputNames = layerOutputs.map(function (output) { return output.name; });
                for (var i = 0; i < symbolicTensorNames.length; ++i) {
                    var index = layerOutputNames.indexOf(symbolicTensorNames[i]);
                    if (index !== -1) {
                        outputSymbolicTensors[i] = layerOutputs[index];
                        outputsRemaining--;
                    }
                    if (outputsRemaining === 0) {
                        break;
                    }
                }
                if (outputsRemaining === 0) {
                    break;
                }
            }
            if (outputsRemaining > 0) {
                var remainingNames_1 = [];
                outputSymbolicTensors.forEach(function (tensor, i) {
                    if (tensor == null) {
                        remainingNames_1.push(symbolicTensorNames[i]);
                    }
                });
                throw new ValueError("Cannot find SymbolicTensors for output name(s): " +
                    ("" + JSON.stringify(remainingNames_1)));
            }
            return outputSymbolicTensors;
        };
        Model.prototype.predictLoop = function (ins, batchSize, verbose) {
            var _this = this;
            if (batchSize === void 0) { batchSize = 32; }
            if (verbose === void 0) { verbose = false; }
            return tfc.tidy(function () {
                var numSamples = _this.checkNumSamples(ins);
                if (verbose) {
                    throw new NotImplementedError('Verbose predictLoop() is not implemented yet.');
                }
                var batches = makeBatches(numSamples, batchSize);
                var outs = [];
                var _loop_3 = function (batchIndex) {
                    var batchOuts = tfc.tidy(function () {
                        var batchStart = batches[batchIndex][0];
                        var batchEnd = batches[batchIndex][1];
                        var insBatch = sliceArrays(ins, batchStart, batchEnd);
                        var feeds = [];
                        if (Array.isArray(insBatch)) {
                            for (var i = 0; i < insBatch.length; ++i) {
                                feeds.push({ key: _this.inputs[i], value: insBatch[i] });
                            }
                        }
                        else {
                            feeds.push({ key: _this.inputs[0], value: insBatch });
                        }
                        var feedDict = new FeedDict(feeds);
                        return execute(_this.outputs, feedDict);
                    });
                    if (batchIndex === 0) {
                        for (var _i = 0, batchOuts_1 = batchOuts; _i < batchOuts_1.length; _i++) {
                            var batchOut = batchOuts_1[_i];
                            outs.push(batchOut);
                        }
                    }
                    else {
                        for (var i = 0; i < batchOuts.length; ++i) {
                            outs[i] = concatAlongFirstAxis(outs[i], batchOuts[i]);
                        }
                    }
                };
                for (var batchIndex = 0; batchIndex < batches.length; ++batchIndex) {
                    _loop_3(batchIndex);
                }
                return singletonOrArray(outs);
            });
        };
        Model.prototype.predict = function (x, config) {
            if (config === void 0) { config = {}; }
            var xsRank2OrHigher = ensureTensorsRank2OrHigher(x);
            checkInputData(xsRank2OrHigher, this.inputNames, this.feedInputShapes, false);
            try {
                var batchSize = config.batchSize == null ? 32 : config.batchSize;
                checkBatchSize(batchSize);
                return this.predictLoop(xsRank2OrHigher, batchSize);
            }
            finally {
                disposeNewTensors(xsRank2OrHigher, x);
            }
        };
        Model.prototype.predictOnBatch = function (x) {
            checkInputData(x, this.inputNames, this.feedInputShapes, true);
            return this.predictLoop(x, x.shape[0]);
        };
        Model.prototype.standardizeUserData = function (x, y, checkBatchAxis, batchSize) {
            if (checkBatchAxis === void 0) { checkBatchAxis = true; }
            if (this.optimizer == null) {
                throw new RuntimeError('You must compile a model before training/testing. Use ' +
                    'Model.compile(modelCompileConfig).');
            }
            var outputShapes = [];
            for (var i = 0; i < this.feedOutputShapes.length; ++i) {
                var outputShape = this.feedOutputShapes[i];
                var lossFn = this.feedLossFns[i];
                if (lossFn === sparseCategoricalCrossentropy) {
                    outputShapes.push(outputShape.slice(0, outputShape.length - 1).concat([1]));
                }
                else {
                    outputShapes.push(outputShape);
                }
            }
            x = standardizeInputData(x, this.feedInputNames, this.feedInputShapes, false, 'input');
            y = standardizeInputData(y, this.feedOutputNames, outputShapes, false, 'target');
            checkArrayLengths(x, y, null);
            checkLossAndTargetCompatibility(y, this.feedLossFns, this.feedOutputShapes);
            if (this.stateful && batchSize != null && batchSize > 0) {
                if (x[0].shape[0] % batchSize !== 0) {
                    throw new ValueError("In a stateful network, you should only pass inputs with a " +
                        "number of samples that is divisible by the batch size " +
                        (batchSize + ". Found: " + x[0].shape[0] + " sample(s)."));
                }
            }
            return [x, y, null];
        };
        Model.prototype.testLoop = function (f, ins, batchSize, verbose, steps) {
            var _this = this;
            if (verbose === void 0) { verbose = 0; }
            return tfc.tidy(function () {
                var numSamples = _this.checkNumSamples(ins, batchSize, steps, 'steps');
                var outs = [];
                if (verbose > 0) {
                    throw new NotImplementedError('Verbose mode is not implemented yet.');
                }
                if (steps != null) {
                    throw new NotImplementedError('steps mode in testLoop() is not implemented yet');
                }
                else {
                    var batches = makeBatches(numSamples, batchSize);
                    var indexArray = tfc.tensor1d(range(0, numSamples));
                    for (var batchIndex = 0; batchIndex < batches.length; ++batchIndex) {
                        var batchStart = batches[batchIndex][0];
                        var batchEnd = batches[batchIndex][1];
                        var batchIds = sliceAlongFirstAxis(indexArray, batchStart, batchEnd - batchStart);
                        var insBatch = sliceArraysByIndices(ins, batchIds);
                        var batchOuts = f(insBatch);
                        if (batchIndex === 0) {
                            for (var i = 0; i < batchOuts.length; ++i) {
                                outs.push(getScalar(0));
                            }
                        }
                        for (var i = 0; i < batchOuts.length; ++i) {
                            var batchOut = batchOuts[i];
                            outs[i] =
                                tfc.add(outs[i], tfc.mul(getScalar(batchEnd - batchStart), batchOut));
                        }
                    }
                    for (var i = 0; i < outs.length; ++i) {
                        outs[i] = tfc.div(outs[i], getScalar(numSamples));
                    }
                }
                return outs;
            });
        };
        Model.prototype.getDedupedMetricsNames = function () {
            var outLabels = this.metricsNames;
            var dedupedOutLabels = [];
            for (var i = 0; i < outLabels.length; ++i) {
                var label = outLabels[i];
                var newLabel = label;
                if (count(outLabels, label) > 1) {
                    var dupIndex = count(outLabels.slice(0, i), label);
                    newLabel += "_" + dupIndex;
                }
                dedupedOutLabels.push(newLabel);
            }
            return dedupedOutLabels;
        };
        Model.prototype.makeTrainFunction = function () {
            var _this = this;
            return function (data) {
                var inputs = data.slice(0, _this.inputs.length);
                var targets = data.slice(_this.inputs.length, _this.inputs.length + _this.outputs.length);
                var metricsValues = [];
                var totalLossFunction = function () {
                    var feeds = [];
                    for (var i = 0; i < _this.inputs.length; ++i) {
                        feeds.push({ key: _this.inputs[i], value: inputs[i] });
                    }
                    var feedDict = new FeedDict(feeds);
                    var outputs = execute(_this.outputs, feedDict, { 'training': true });
                    var totalLoss;
                    for (var i = 0; i < _this.lossFunctions.length; ++i) {
                        var lossFunction = _this.lossFunctions[i];
                        var loss = lossFunction(targets[i], outputs[i]);
                        var meanLoss = tfc.mean(loss);
                        if (i === 0) {
                            totalLoss = loss;
                        }
                        else {
                            totalLoss = tfc.add(totalLoss, loss);
                        }
                    }
                    for (var i = 0; i < _this.metricsTensors.length; ++i) {
                        var metric = _this.metricsTensors[i][0];
                        var outputIndex = _this.metricsTensors[i][1];
                        var meanMetric = tfc.mean(metric(targets[outputIndex], outputs[outputIndex]));
                        tfc.keep(meanMetric);
                        metricsValues.push(meanMetric);
                    }
                    totalLoss = tfc.mean(totalLoss);
                    _this.calculateLosses().forEach(function (regularizerLoss) {
                        totalLoss = tfc.add(totalLoss, regularizerLoss);
                    });
                    return totalLoss;
                };
                var variables = _this.collectedTrainableWeights.map(function (param) { return param.read(); });
                var returnCost = true;
                var totalLossValue = _this.optimizer.minimize(totalLossFunction, returnCost, variables);
                return [totalLossValue].concat(metricsValues);
            };
        };
        Model.prototype.makeTestFunction = function () {
            var _this = this;
            this.testFunction = function (data) {
                return tfc.tidy(function () {
                    var valOutputs = [];
                    var totalLoss;
                    var inputs = data.slice(0, _this.inputs.length);
                    var targets = data.slice(_this.inputs.length, _this.inputs.length + _this.outputs.length);
                    var feeds = [];
                    for (var i = 0; i < _this.inputs.length; ++i) {
                        feeds.push({ key: _this.inputs[i], value: inputs[i] });
                    }
                    var feedDict = new FeedDict(feeds);
                    var outputs = execute(_this.outputs, feedDict);
                    for (var i = 0; i < _this.lossFunctions.length; ++i) {
                        var lossFunction = _this.lossFunctions[i];
                        var loss = tfc.mean(lossFunction(targets[i], outputs[i]));
                        if (i === 0) {
                            totalLoss = loss;
                        }
                        else {
                            totalLoss = tfc.add(totalLoss, loss);
                        }
                        valOutputs.push(totalLoss);
                    }
                    for (var i = 0; i < _this.metricsTensors.length; ++i) {
                        var metric = _this.metricsTensors[i][0];
                        var outputIndex = _this.metricsTensors[i][1];
                        var meanMetric = tfc.mean(metric(targets[outputIndex], outputs[outputIndex]));
                        valOutputs.push(meanMetric);
                    }
                    return valOutputs;
                });
            };
        };
        Model.prototype.fit = function (x, y, config) {
            if (config === void 0) { config = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, fitTensors(this, x, y, config)];
                });
            });
        };
        Model.prototype.fitDataset = function (dataset, config) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, fitDataset(this, dataset, config)];
                });
            });
        };
        Model.prototype.getNamedWeights = function (config) {
            var namedWeights = {};
            var trainableOnly = config != null && config.trainableOnly;
            var weights = trainableOnly ? this.trainableWeights : this.weights;
            var weightValues = this.getWeights(trainableOnly);
            for (var i = 0; i < weights.length; ++i) {
                if (trainableOnly && !weights[i].trainable) {
                    continue;
                }
                namedWeights[weights[i].originalName] = weightValues[i];
            }
            return namedWeights;
        };
        Object.defineProperty(Model.prototype, "stopTraining", {
            set: function (stop) {
                this.stopTraining_ = stop;
            },
            enumerable: true,
            configurable: true
        });
        Model.prototype.save = function (handlerOrURL, config) {
            return __awaiter(this, void 0, void 0, function () {
                var handlers, weightDataAndSpecs, returnString, unusedArg, modelConfig;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (typeof handlerOrURL === 'string') {
                                handlers = tfc.io.getSaveHandlers(handlerOrURL);
                                if (handlers.length === 0) {
                                    throw new ValueError("Cannot find any save handlers for URL '" + handlerOrURL + "'");
                                }
                                else if (handlers.length > 1) {
                                    throw new ValueError("Found more than one (" + handlers.length + ") save handlers for " +
                                        ("URL '" + handlerOrURL + "'"));
                                }
                                handlerOrURL = handlers[0];
                            }
                            if (handlerOrURL.save == null) {
                                throw new ValueError('Model.save() cannot proceed because the IOHandler provided does ' +
                                    'not have the `save` attribute defined.');
                            }
                            return [4, tfc.io.encodeWeights(this.getNamedWeights(config))];
                        case 1:
                            weightDataAndSpecs = _a.sent();
                            returnString = false;
                            unusedArg = null;
                            modelConfig = this.toJSON(unusedArg, returnString);
                            return [2, handlerOrURL.save({
                                    modelTopology: modelConfig,
                                    weightData: weightDataAndSpecs.data,
                                    weightSpecs: weightDataAndSpecs.specs
                                })];
                    }
                });
            });
        };
        Model.className = 'Model';
        return Model;
    }(Container));
    tfc.serialization.registerClass(Model);

    function modelFromJSON(modelAndWeightsConfig, customObjects) {
        return __awaiter(this, void 0, void 0, function () {
            var modelTopology, tsConfig, model, weightValues, uniqueWeightValues, _i, _a, weight, skipMismatches, isNamedTensorMap;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!('modelTopology' in modelAndWeightsConfig)) {
                            modelAndWeightsConfig = { modelTopology: modelAndWeightsConfig };
                        }
                        modelAndWeightsConfig = modelAndWeightsConfig;
                        modelTopology = modelAndWeightsConfig.modelTopology;
                        if (modelTopology['model_config'] != null) {
                            modelTopology = modelTopology['model_config'];
                        }
                        tsConfig = convertPythonicToTs(modelTopology);
                        model = deserialize(tsConfig, customObjects);
                        if (!(modelAndWeightsConfig.weightsManifest != null)) return [3, 2];
                        return [4, tfc.io.loadWeights(modelAndWeightsConfig.weightsManifest, modelAndWeightsConfig.pathPrefix, model.weights.map(function (weight) { return weight.originalName; }))];
                    case 1:
                        weightValues = _b.sent();
                        uniqueWeightValues = {};
                        for (_i = 0, _a = model.weights; _i < _a.length; _i++) {
                            weight = _a[_i];
                            uniqueWeightValues[weight.originalName] =
                                weightValues[weight.originalName];
                        }
                        skipMismatches = null;
                        isNamedTensorMap = true;
                        model.loadWeights(uniqueWeightValues, skipMismatches, isNamedTensorMap);
                        _b.label = 2;
                    case 2: return [2, model];
                }
            });
        });
    }
    function loadModelInternal(pathOrIOHandler, strict) {
        if (strict === void 0) { strict = true; }
        return __awaiter(this, void 0, void 0, function () {
            var handlers;
            return __generator(this, function (_a) {
                if (typeof pathOrIOHandler === 'string') {
                    handlers = tfc.io.getLoadHandlers(pathOrIOHandler);
                    if (handlers.length === 0) {
                        handlers.push(tfc.io.browserHTTPRequest(pathOrIOHandler));
                    }
                    else if (handlers.length > 1) {
                        throw new ValueError("Found more than one (" + handlers.length + ") load handlers for " +
                            ("URL '" + pathOrIOHandler + "'"));
                    }
                    pathOrIOHandler = handlers[0];
                }
                return [2, loadModelFromIOHandler(pathOrIOHandler, undefined, strict)];
            });
        });
    }
    function loadModelFromIOHandler(handler, customObjects, strict) {
        if (strict === void 0) { strict = true; }
        return __awaiter(this, void 0, void 0, function () {
            var artifacts, modelTopology, model, skipMismatch, isNamedTensorMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (handler.load == null) {
                            throw new ValueError('Cannot proceed with model loading because the IOHandler provided ' +
                                'does not have the `load` method implemented.');
                        }
                        return [4, handler.load()];
                    case 1:
                        artifacts = _a.sent();
                        modelTopology = artifacts.modelTopology;
                        if (modelTopology['model_config'] != null) {
                            modelTopology = modelTopology['model_config'];
                        }
                        model = deserialize(convertPythonicToTs(modelTopology), customObjects);
                        if (artifacts.weightData != null) {
                            if (artifacts.weightSpecs == null) {
                                throw new ValueError('Model artifacts contains weight data, but not weight specs. ' +
                                    'Therefore loading of weights cannot proceed.');
                            }
                            skipMismatch = false;
                            isNamedTensorMap = true;
                            model.loadWeights(tfc.io.decodeWeights(artifacts.weightData, artifacts.weightSpecs), skipMismatch, isNamedTensorMap, strict);
                        }
                        return [2, model];
                }
            });
        });
    }
    var Sequential = (function (_super) {
        __extends(Sequential, _super);
        function Sequential(config) {
            var _this = _super.call(this, { inputs: [], outputs: [] }) || this;
            config = config || {};
            _this.trainable = true;
            _this._updatable = true;
            _this.built = false;
            _this.name = (config.name != null) ? config.name : getUid('sequential_');
            if (config.layers != null) {
                for (var _i = 0, _a = config.layers; _i < _a.length; _i++) {
                    var layer = _a[_i];
                    _this.add(layer);
                }
            }
            return _this;
        }
        Sequential.prototype.checkShape = function (layer) {
            var shape = layer.inboundNodes[0].outputTensors[0].shape;
            if (shape.some(function (x) { return x < 0; })) {
                throw new ValueError('Negative dimension size caused by adding layer ' +
                    (layer.name + " with input shape [") +
                    (layer.inboundNodes[0].inputTensors[0].shape + "]"));
            }
        };
        Sequential.prototype.add = function (layer) {
            var isLayerModelInstance = layer instanceof Sequential || layer instanceof Model;
            var modelLayer;
            if (isLayerModelInstance) {
                modelLayer = layer;
                if (modelLayer.outputs.length !== 1) {
                    throw new ValueError('All layers in a Sequential model ' +
                        'should have a single output tensor. ' +
                        'For multi-output layers, ' +
                        'use the functional API.');
                }
                if (modelLayer.inputs.length !== 1) {
                    throw new ValueError('All layers in a Sequential model ' +
                        'should have a single input tensor. ' +
                        'For multi-input layers, ' +
                        'use the functional API.');
                }
            }
            if (this.outputs.length === 0) {
                if (layer.inboundNodes.length === 0) {
                    if (layer.batchInputShape == null) {
                        throw new ValueError('The first layer in a Sequential model must ' +
                            'get an `inputShape` or `batchInputShape` argument.');
                    }
                    var x = Input({
                        batchShape: layer.batchInputShape,
                        dtype: layer.dtype,
                        name: layer.name + '_input'
                    });
                    layer.apply(x);
                }
                if (isLayerModelInstance) {
                    this.outputs = modelLayer.outputs;
                    this.inputs = modelLayer.inputs;
                }
                else {
                    if (layer.inboundNodes.length !== 1) {
                        throw new ValueError('A layer added to a Sequential model must not already be ' +
                            ("connected somewhere else. Model received layer " + layer.name + " ") +
                            ("which has " + layer.inboundNodes.length + " pre-existing inbound ") +
                            'connections.');
                    }
                    if (layer.inboundNodes[0].outputTensors.length !== 1) {
                        throw new ValueError('All layers in a Sequential model ' +
                            'should have a single output tensor. ' +
                            'For multi-output layers, ' +
                            'use the functional API.');
                    }
                    this.checkShape(layer);
                    this.outputs = [layer.inboundNodes[0].outputTensors[0]];
                    this.inputs = getSourceInputs(this.outputs[0]);
                }
                this.inboundNodes = [];
                new Node({
                    outboundLayer: this,
                    inboundLayers: [],
                    nodeIndices: [],
                    tensorIndices: [],
                    inputTensors: this.inputs,
                    outputTensors: this.outputs,
                    inputMasks: pyListRepeat(null, this.inputs.length),
                    outputMasks: [null],
                    inputShapes: this.inputs.map(function (x) { return x.shape; }),
                    outputShapes: this.outputs[0].shape
                });
            }
            else {
                var outputTensor = layer.apply(this.outputs[0]);
                if (Array.isArray(outputTensor)) {
                    throw new TypeError('All layers in a Sequential model ' +
                        'should have a single output tensor. ' +
                        'For multi-output layers, ' +
                        'use the functional API.');
                }
                this.checkShape(layer);
                this.outputs = [outputTensor];
                this.inboundNodes[0].outputTensors = this.outputs;
                this.inboundNodes[0].outputShapes = [this.outputs[0].shape];
            }
            this.layers.push(layer);
            this.built = false;
        };
        Sequential.prototype.pop = function () {
            if (this.layers.length === 0) {
                throw new TypeError('There are no layers in the model.');
            }
            this.layers.pop();
            if (this.layers.length === 0) {
                this.outputs = [];
                this.inboundNodes = [];
                this.outboundNodes = [];
            }
            else {
                var lastLayerIndex = this.layers.length - 1;
                this.layers[lastLayerIndex].outboundNodes = [];
                this.outputs = [this.layers[lastLayerIndex].output];
                this.inboundNodes[0].outputTensors = this.outputs;
                this.inboundNodes[0].outputShapes = [this.outputs[0].shape];
            }
        };
        Sequential.prototype.call = function (inputs, kwargs) {
            if (this.model == null) {
                this.build();
            }
            return this.model.call(inputs, kwargs);
        };
        Sequential.prototype.build = function (inputShape) {
            getExactlyOneShape(inputShape);
            if (this.inputs.length === 0 || this.outputs.length === 0) {
                throw new TypeError('Sequential model cannot be built: model is empty.' +
                    ' Add some layers first.');
            }
            this.model = new Model({
                inputs: this.inputs,
                outputs: this.outputs[0],
                name: this.name + '_model'
            });
            this.model.trainable = this.trainable;
            this.model.updatable = this.updatable;
            this.supportsMasking = this.model.supportsMasking;
            this.inputLayers = this.model.inputLayers;
            this.inputLayersNodeIndices = this.model.inputLayersNodeIndices;
            this.inputLayersTensorIndices = this.model.inputLayersTensorIndices;
            this.outputLayers = this.model.outputLayers;
            this.outputLayersNodeIndices = this.model.outputLayersNodeIndices;
            this.outputLayersTensorIndices = this.model.outputLayersTensorIndices;
            this.nodesByDepth = this.model.nodesByDepth;
            this.containerNodes = this.model.containerNodes;
            this.outputNames = this.model.outputNames;
            this.inputNames = this.model.inputNames;
            this.built = true;
        };
        Sequential.prototype.countParams = function () {
            if (!this.built) {
                this.build();
            }
            return _super.prototype.countParams.call(this);
        };
        Sequential.prototype.summary = function (lineLength, positions, printFn) {
            if (printFn === void 0) { printFn = console.log; }
            if (!this.built) {
                this.build();
            }
            _super.prototype.summary.call(this, lineLength, positions, printFn);
        };
        Sequential.prototype.setWeights = function (weights) {
            if (this.model == null) {
                this.build();
            }
            this.model.setWeights(weights);
        };
        Object.defineProperty(Sequential.prototype, "updatable", {
            get: function () {
                return this._updatable;
            },
            set: function (value) {
                if (this.built) {
                    this.model.updatable = value;
                }
                this._updatable = value;
            },
            enumerable: true,
            configurable: true
        });
        Sequential.prototype.evaluate = function (x, y, config) {
            if (config === void 0) { config = {}; }
            if (!this.built) {
                throw new RuntimeError('The model needs to be compiled before being used.');
            }
            return this.model.evaluate(x, y, config);
        };
        Sequential.prototype.evaluateDataset = function (dataset, config) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.built) {
                        throw new RuntimeError('The model needs to be compiled before being used.');
                    }
                    return [2, this.model.evaluateDataset(dataset, config)];
                });
            });
        };
        Sequential.prototype.predict = function (x, config) {
            if (config === void 0) { config = {}; }
            if (this.model == null) {
                this.build();
            }
            return this.model.predict(x, config);
        };
        Sequential.prototype.predictOnBatch = function (x) {
            if (this.model == null) {
                this.build();
            }
            return this.model.predictOnBatch(x);
        };
        Sequential.prototype.compile = function (config) {
            this.build();
            this.model.compile(config);
            this.optimizer = this.model.optimizer;
            this.loss = this.model.loss;
            this.metrics = this.model.metrics;
            this.metricsTensors = this.model.metricsTensors;
            this.metricsNames = this.model.metricsNames;
        };
        Sequential.prototype.fit = function (x, y, config) {
            if (config === void 0) { config = {}; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.built) {
                        throw new RuntimeError('The model needs to be compiled before ' +
                            'being used.');
                    }
                    return [2, this.model.fit(x, y, config)];
                });
            });
        };
        Sequential.prototype.fitDataset = function (dataset, config) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.built) {
                        throw new RuntimeError('The model needs to be compiled before ' +
                            'being used.');
                    }
                    return [2, this.model.fitDataset(dataset, config)];
                });
            });
        };
        Sequential.fromConfig = function (cls, config) {
            var configArray;
            var extraModelConfig = {};
            if (config instanceof Array) {
                if (!(config[0].className != null) ||
                    config[0]['className'] === 'Merge') {
                    throw new ValueError('Legacy serialization format not supported yet.');
                }
                configArray = config;
            }
            else {
                tfc.util.assert(config['layers'] != null, "When the config data for a Sequential model is not an Array, " +
                    "it must be an Object that contains the 'layers' field.");
                configArray = config['layers'];
                delete config['layers'];
                extraModelConfig = config;
            }
            var model = new cls(extraModelConfig);
            if (!(model instanceof Sequential)) {
                throw new NotImplementedError("Sequential.fromConfig called on non-Sequential input: " + model);
            }
            for (var _i = 0, configArray_1 = configArray; _i < configArray_1.length; _i++) {
                var conf = configArray_1[_i];
                var layer = deserialize(conf);
                model.add(layer);
            }
            return model;
        };
        Object.defineProperty(Sequential.prototype, "stopTraining", {
            set: function (stop) {
                this.model.stopTraining = stop;
            },
            enumerable: true,
            configurable: true
        });
        Sequential.prototype.getConfig = function () {
            var config = [];
            for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
                var layer = _a[_i];
                config.push({
                    className: layer.getClassName(),
                    config: layer.getConfig(),
                });
            }
            return config;
        };
        Sequential.className = 'Sequential';
        return Sequential;
    }(Model));
    tfc.serialization.registerClass(Sequential);

    function model(config) {
        return new Model(config);
    }
    function sequential(config) {
        return new Sequential(config);
    }
    function loadModel(pathOrIOHandler, strict) {
        if (strict === void 0) { strict = true; }
        return loadModelInternal(pathOrIOHandler, strict);
    }
    function input(config) {
        return Input(config);
    }
    function registerCallbackConstructor(verbosityLevel, callbackConstructor) {
        CallbackConstructorRegistry.registerCallbackConstructor(verbosityLevel, callbackConstructor);
    }

    var Activation = (function (_super) {
        __extends(Activation, _super);
        function Activation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Activation.prototype.getConfig = function () {
            return {};
        };
        return Activation;
    }(tfc.serialization.Serializable));
    var Elu = (function (_super) {
        __extends(Elu, _super);
        function Elu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Elu.prototype.apply = function (x, alpha) {
            if (alpha === void 0) { alpha = 1; }
            return elu(x, alpha);
        };
        Elu.className = 'elu';
        return Elu;
    }(Activation));
    tfc.serialization.registerClass(Elu);
    var Selu = (function (_super) {
        __extends(Selu, _super);
        function Selu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Selu.prototype.apply = function (x) {
            return tfc.selu(x);
        };
        Selu.className = 'selu';
        return Selu;
    }(Activation));
    tfc.serialization.registerClass(Selu);
    var Relu = (function (_super) {
        __extends(Relu, _super);
        function Relu() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Relu.prototype.apply = function (x) {
            return tfc.relu(x);
        };
        Relu.className = 'relu';
        return Relu;
    }(Activation));
    tfc.serialization.registerClass(Relu);
    var Relu6 = (function (_super) {
        __extends(Relu6, _super);
        function Relu6() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Relu6.prototype.apply = function (x) {
            return tfc.tidy(function () { return tfc.minimum(getScalar(6.0), tfc.relu(x)); });
        };
        Relu6.className = 'relu6';
        return Relu6;
    }(Activation));
    tfc.serialization.registerClass(Relu6);
    var Linear = (function (_super) {
        __extends(Linear, _super);
        function Linear() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Linear.prototype.apply = function (x) {
            return x;
        };
        Linear.className = 'linear';
        return Linear;
    }(Activation));
    tfc.serialization.registerClass(Linear);
    var Sigmoid = (function (_super) {
        __extends(Sigmoid, _super);
        function Sigmoid() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sigmoid.prototype.apply = function (x) {
            return tfc.sigmoid(x);
        };
        Sigmoid.className = 'sigmoid';
        return Sigmoid;
    }(Activation));
    tfc.serialization.registerClass(Sigmoid);
    var HardSigmoid = (function (_super) {
        __extends(HardSigmoid, _super);
        function HardSigmoid() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HardSigmoid.prototype.apply = function (x) {
            return hardSigmoid(x);
        };
        HardSigmoid.className = 'hardSigmoid';
        return HardSigmoid;
    }(Activation));
    tfc.serialization.registerClass(HardSigmoid);
    var Softplus = (function (_super) {
        __extends(Softplus, _super);
        function Softplus() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Softplus.prototype.apply = function (x) {
            return tfc.softplus(x);
        };
        Softplus.className = 'softplus';
        return Softplus;
    }(Activation));
    tfc.serialization.registerClass(Softplus);
    var Softsign = (function (_super) {
        __extends(Softsign, _super);
        function Softsign() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Softsign.prototype.apply = function (x) {
            return softsign(x);
        };
        Softsign.className = 'softsign';
        return Softsign;
    }(Activation));
    tfc.serialization.registerClass(Softsign);
    var Tanh = (function (_super) {
        __extends(Tanh, _super);
        function Tanh() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Tanh.prototype.apply = function (x) {
            return tfc.tanh(x);
        };
        Tanh.className = 'tanh';
        return Tanh;
    }(Activation));
    tfc.serialization.registerClass(Tanh);
    var Softmax = (function (_super) {
        __extends(Softmax, _super);
        function Softmax() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Softmax.prototype.apply = function (x, axis) {
            if (axis === void 0) { axis = (-1); }
            return tfc.softmax(x, axis);
        };
        Softmax.className = 'softmax';
        return Softmax;
    }(Activation));
    tfc.serialization.registerClass(Softmax);
    function serializeActivation(activation) {
        return activation.getClassName();
    }
    function deserializeActivation(config, customObjects) {
        if (customObjects === void 0) { customObjects = {}; }
        return deserializeKerasObject(config, tfc.serialization.SerializationMap.getMap().classNameMap, customObjects, 'activation');
    }
    function getActivation(identifier) {
        if (identifier == null) {
            var config = { className: 'linear', config: {} };
            return deserializeActivation(config);
        }
        if (typeof identifier === 'string') {
            var config = { className: identifier, config: {} };
            return deserializeActivation(config);
        }
        else if (identifier instanceof Activation) {
            return identifier;
        }
        else {
            return deserializeActivation(identifier);
        }
    }

    var ReLU = (function (_super) {
        __extends(ReLU, _super);
        function ReLU(config) {
            var _this = _super.call(this, config == null ? {} : config) || this;
            _this.supportsMasking = true;
            if (config != null) {
                _this.maxValue = config.maxValue;
            }
            return _this;
        }
        ReLU.prototype.call = function (inputs, kwargs) {
            inputs = getExactlyOneTensor(inputs);
            var output = tfc.relu(inputs);
            if (this.maxValue != null) {
                output = tfc.clipByValue(output, 0, this.maxValue);
            }
            return output;
        };
        ReLU.prototype.computeOutputShape = function (inputShape) {
            return inputShape;
        };
        ReLU.prototype.getConfig = function () {
            var config = { maxValue: this.maxValue };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        ReLU.className = 'ReLU';
        return ReLU;
    }(Layer));
    tfc.serialization.registerClass(ReLU);
    var LeakyReLU = (function (_super) {
        __extends(LeakyReLU, _super);
        function LeakyReLU(config) {
            var _this = _super.call(this, config == null ? {} : config) || this;
            _this.DEFAULT_ALPHA = 0.3;
            if (config == null) {
                config = {};
            }
            _this.alpha = config.alpha == null ? _this.DEFAULT_ALPHA : config.alpha;
            return _this;
        }
        LeakyReLU.prototype.call = function (inputs, kwargs) {
            var x = getExactlyOneTensor(inputs);
            return tfc.leakyRelu(x, this.alpha);
        };
        LeakyReLU.prototype.computeOutputShape = function (inputShape) {
            return inputShape;
        };
        LeakyReLU.prototype.getConfig = function () {
            var config = { alpha: this.alpha };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        LeakyReLU.className = 'LeakyReLU';
        return LeakyReLU;
    }(Layer));
    tfc.serialization.registerClass(LeakyReLU);
    var ELU = (function (_super) {
        __extends(ELU, _super);
        function ELU(config) {
            var _this = _super.call(this, config == null ? {} : config) || this;
            _this.DEFAULT_ALPHA = 1.0;
            if (config == null) {
                config = {};
            }
            if (config.alpha != null && config.alpha !== _this.DEFAULT_ALPHA) {
                throw new NotImplementedError("Non-default alpha value (" + config.alpha + ") is not supported by the " +
                    "ELU layer yet.");
            }
            _this.alpha = config.alpha == null ? _this.DEFAULT_ALPHA : config.alpha;
            return _this;
        }
        ELU.prototype.call = function (inputs, kwargs) {
            var x = getExactlyOneTensor(inputs);
            return tfc.elu(x);
        };
        ELU.prototype.computeOutputShape = function (inputShape) {
            return inputShape;
        };
        ELU.prototype.getConfig = function () {
            var config = { alpha: this.alpha };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        ELU.className = 'ELU';
        return ELU;
    }(Layer));
    tfc.serialization.registerClass(ELU);
    var ThresholdedReLU = (function (_super) {
        __extends(ThresholdedReLU, _super);
        function ThresholdedReLU(config) {
            var _this = _super.call(this, config == null ? {} : config) || this;
            _this.DEFAULT_THETA = 1.0;
            if (config == null) {
                config = {};
            }
            _this.theta = config.theta == null ? _this.DEFAULT_THETA : config.theta;
            _this.thetaTensor = getScalar(_this.theta);
            return _this;
        }
        ThresholdedReLU.prototype.call = function (inputs, kwargs) {
            var x = getExactlyOneTensor(inputs);
            return x.mul(cast(x.greater(this.thetaTensor), 'float32'));
        };
        ThresholdedReLU.prototype.computeOutputShape = function (inputShape) {
            return inputShape;
        };
        ThresholdedReLU.prototype.getConfig = function () {
            var config = { theta: this.theta };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        ThresholdedReLU.className = 'ThresholdedReLU';
        return ThresholdedReLU;
    }(Layer));
    tfc.serialization.registerClass(ThresholdedReLU);
    var Softmax$1 = (function (_super) {
        __extends(Softmax$$1, _super);
        function Softmax$$1(config) {
            var _this = _super.call(this, config == null ? {} : config) || this;
            _this.DEFAULT_AXIS = 1.0;
            if (config == null) {
                config = {};
            }
            _this.softmax = new Softmax().apply;
            _this.axis = config.axis == null ? _this.DEFAULT_AXIS : config.axis;
            return _this;
        }
        Softmax$$1.prototype.call = function (inputs, kwargs) {
            var x = getExactlyOneTensor(inputs);
            return this.softmax(x, this.axis);
        };
        Softmax$$1.prototype.computeOutputShape = function (inputShape) {
            return inputShape;
        };
        Softmax$$1.prototype.getConfig = function () {
            var config = { axis: this.axis };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        Softmax$$1.className = 'Softmax';
        return Softmax$$1;
    }(Layer));
    tfc.serialization.registerClass(Softmax$1);

    var Regularizer = (function (_super) {
        __extends(Regularizer, _super);
        function Regularizer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Regularizer;
    }(tfc.serialization.Serializable));
    var L1L2 = (function (_super) {
        __extends(L1L2, _super);
        function L1L2(config) {
            var _this = _super.call(this) || this;
            var l1 = config == null || config.l1 == null ? 0.01 : config.l1;
            var l2 = config == null || config.l2 == null ? 0.01 : config.l2;
            _this.hasL1 = l1 !== 0;
            _this.hasL2 = l2 !== 0;
            _this.l1 = getScalar(l1);
            _this.l2 = getScalar(l2);
            return _this;
        }
        L1L2.prototype.apply = function (x) {
            var _this = this;
            return tfc.tidy(function () {
                var regularization = tfc.zeros([1]);
                if (_this.hasL1) {
                    regularization = tfc.add(regularization, tfc.sum(tfc.mul(_this.l1, tfc.abs(x))));
                }
                if (_this.hasL2) {
                    regularization =
                        tfc.add(regularization, tfc.sum(tfc.mul(_this.l2, square(x))));
                }
                return regularization.asScalar();
            });
        };
        L1L2.prototype.getConfig = function () {
            return { 'l1': this.l1.dataSync()[0], 'l2': this.l2.dataSync()[0] };
        };
        L1L2.fromConfig = function (cls, config) {
            return new cls({ l1: config.l1, l2: config.l2 });
        };
        L1L2.className = 'L1L2';
        return L1L2;
    }(Regularizer));
    tfc.serialization.registerClass(L1L2);
    function l1(config) {
        return new L1L2({ l1: config != null ? config.l1 : null, l2: 0 });
    }
    function l2(config) {
        return new L1L2({ l2: config != null ? config.l2 : null, l1: 0 });
    }
    var REGULARIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP = {
        'l1l2': 'L1L2'
    };
    function serializeRegularizer(constraint) {
        return serializeKerasObject(constraint);
    }
    function deserializeRegularizer(config, customObjects) {
        if (customObjects === void 0) { customObjects = {}; }
        return deserializeKerasObject(config, tfc.serialization.SerializationMap.getMap().classNameMap, customObjects, 'regularizer');
    }
    function getRegularizer(identifier) {
        if (identifier == null) {
            return null;
        }
        if (typeof identifier === 'string') {
            var className = identifier in REGULARIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP ?
                REGULARIZER_IDENTIFIER_REGISTRY_SYMBOL_MAP[identifier] :
                identifier;
            var config = { className: className, config: {} };
            return deserializeRegularizer(config);
        }
        else if (identifier instanceof Regularizer) {
            return identifier;
        }
        else {
            return deserializeRegularizer(identifier);
        }
    }

    function normalizeArray(value, n, name) {
        if (typeof value === 'number') {
            return pyListRepeat(value, n);
        }
        else {
            if (value.length !== n) {
                throw new ValueError("The " + name + " argument must be a tuple of " + n + " integers. Received: " +
                    (value.length + " elements."));
            }
            for (var i = 0; i < n; ++i) {
                var singleValue = value[i];
                if (!isInteger(singleValue)) {
                    throw new ValueError("The " + name + " argument must be a tuple of " + n + " integers. Received: " +
                        (JSON.stringify(value) + " including a non-integer number ") +
                        ("" + singleValue));
                }
            }
            return value;
        }
    }
    function convOutputLength(inputLength, filterSize, padding, stride, dilation) {
        if (dilation === void 0) { dilation = 1; }
        if (inputLength == null) {
            return inputLength;
        }
        var dilatedFilterSize = filterSize + (filterSize - 1) * (dilation - 1);
        var outputLength;
        if (padding === 'same') {
            outputLength = inputLength;
        }
        else {
            outputLength = inputLength - dilatedFilterSize + 1;
        }
        return Math.floor((outputLength + stride - 1) / stride);
    }
    function deconvLength(dimSize, strideSize, kernelSize, padding) {
        if (dimSize == null) {
            return null;
        }
        if (padding === 'valid') {
            dimSize = dimSize * strideSize + max([kernelSize - strideSize, 0]);
        }
        else if (padding === 'same') {
            dimSize = dimSize * strideSize;
        }
        else {
            throw new ValueError("Unsupport padding mode: " + padding + ".");
        }
        return dimSize;
    }

    function preprocessConv2DInput(x, dataFormat) {
        return tfc.tidy(function () {
            checkDataFormat(dataFormat);
            if (dataFormat === 'channelsFirst') {
                return tfc.transpose(x, [0, 2, 3, 1]);
            }
            else {
                return x;
            }
        });
    }
    function conv1dWithBias(x, kernel, bias, strides, padding, dataFormat, dilationRate) {
        if (strides === void 0) { strides = 1; }
        if (padding === void 0) { padding = 'valid'; }
        if (dilationRate === void 0) { dilationRate = 1; }
        return tfc.tidy(function () {
            if (dataFormat == null) {
                dataFormat = imageDataFormat();
            }
            checkDataFormat(dataFormat);
            if (x.shape.length !== 3) {
                throw new ValueError("The input of a conv1dWithBias operation should be 3, but is " +
                    (x.shape.length + " instead."));
            }
            if (kernel.shape.length !== 3) {
                throw new ValueError("The kernel for a conv1dWithBias operation should be 3, but is " +
                    (kernel.shape.length + " instead"));
            }
            if (bias != null && bias.shape.length !== 1) {
                throw new ValueError("The bias for a conv1dWithBias operation should be 1, but is " +
                    (kernel.shape.length + " instead"));
            }
            if (dataFormat === 'channelsFirst') {
                x = tfc.transpose(x, [0, 2, 1]);
            }
            if (padding === 'causal') {
                throw new NotImplementedError('The support for CAUSAL padding mode in conv1dWithBias is not ' +
                    'implemented yet.');
            }
            var y = tfc.conv1d(x, kernel, strides, padding === 'same' ? 'same' : 'valid', 'NWC', dilationRate);
            if (bias != null) {
                y = biasAdd(y, bias);
            }
            return y;
        });
    }
    function conv2dWithBias(x, kernel, bias, strides, padding, dataFormat, dilationRate) {
        if (strides === void 0) { strides = [1, 1]; }
        if (padding === void 0) { padding = 'valid'; }
        return tfc.tidy(function () {
            if (dataFormat == null) {
                dataFormat = imageDataFormat();
            }
            checkDataFormat(dataFormat);
            if (x.rank !== 3 && x.rank !== 4) {
                throw new ValueError("conv2dWithBias expects input to be of rank 3 or 4, but received " +
                    (x.rank + "."));
            }
            if (kernel.rank !== 3 && kernel.rank !== 4) {
                throw new ValueError("conv2dWithBias expects kernel to be of rank 3 or 4, but received " +
                    (x.rank + "."));
            }
            var y = preprocessConv2DInput(x, dataFormat);
            if (padding === 'causal') {
                throw new NotImplementedError('The support for CAUSAL padding mode in conv1dWithBias is not ' +
                    'implemented yet.');
            }
            y = tfc.conv2d(y, kernel, strides, padding === 'same' ? 'same' : 'valid', 'NHWC', dilationRate);
            if (bias != null) {
                y = biasAdd(y, bias);
            }
            if (dataFormat === 'channelsFirst') {
                y = tfc.transpose(y, [0, 3, 1, 2]);
            }
            return y;
        });
    }
    var BaseConv = (function (_super) {
        __extends(BaseConv, _super);
        function BaseConv(rank, config) {
            var _this = _super.call(this, config) || this;
            _this.bias = null;
            _this.DEFAULT_KERNEL_INITIALIZER = 'glorotNormal';
            _this.DEFAULT_BIAS_INITIALIZER = 'zeros';
            BaseConv.verifyConfig(config);
            _this.rank = rank;
            if (_this.rank !== 1 && _this.rank !== 2) {
                throw new NotImplementedError("Convolution layer for rank other than 1 or 2 (" + _this.rank + ") is " +
                    "not implemented yet.");
            }
            _this.kernelSize = normalizeArray(config.kernelSize, rank, 'kernelSize');
            _this.strides = normalizeArray(config.strides == null ? 1 : config.strides, rank, 'strides');
            _this.padding = config.padding == null ? 'valid' : config.padding;
            checkPaddingMode(_this.padding);
            _this.dataFormat =
                config.dataFormat == null ? 'channelsLast' : config.dataFormat;
            checkDataFormat(_this.dataFormat);
            _this.activation = getActivation(config.activation);
            _this.useBias = config.useBias == null ? true : config.useBias;
            _this.biasInitializer =
                getInitializer(config.biasInitializer || _this.DEFAULT_BIAS_INITIALIZER);
            _this.biasConstraint = getConstraint(config.biasConstraint);
            _this.biasRegularizer = getRegularizer(config.biasRegularizer);
            _this.activityRegularizer = getRegularizer(config.activityRegularizer);
            _this.dilationRate = normalizeArray(config.dilationRate == null ? 1 : config.dilationRate, rank, 'dilationRate');
            if (_this.rank === 1 &&
                (Array.isArray(_this.dilationRate) &&
                    _this.dilationRate.length !== 1)) {
                throw new ValueError("dilationRate must be a number or an array of a single number " +
                    "for 1D convolution, but received " +
                    ("" + JSON.stringify(_this.dilationRate)));
            }
            if (_this.rank === 2) {
                if (typeof _this.dilationRate === 'number') {
                    _this.dilationRate = [_this.dilationRate, _this.dilationRate];
                }
                else if (_this.dilationRate.length !== 2) {
                    throw new ValueError("dilationRate must be a number or array of two numbers for 2D " +
                        ("convolution, but received " + JSON.stringify(_this.dilationRate)));
                }
            }
            return _this;
        }
        BaseConv.verifyConfig = function (config) {
            assert('kernelSize' in config, "required key 'kernelSize' not in config");
            if (typeof config.kernelSize !== 'number' &&
                !checkArrayTypeAndLength(config.kernelSize, 'number', 1, 2))
                throw new ValueError("BaseConv expects config.kernelSize to be number or number[] with " +
                    ("length 1 or 2, but received " + JSON.stringify(config.kernelSize) + "."));
        };
        BaseConv.prototype.getConfig = function () {
            var config = {
                kernelSize: this.kernelSize,
                strides: this.strides,
                padding: this.padding,
                dataFormat: this.dataFormat,
                dilationRate: this.dilationRate,
                activation: serializeActivation(this.activation),
                useBias: this.useBias,
                biasInitializer: serializeInitializer(this.biasInitializer),
                biasRegularizer: serializeRegularizer(this.biasRegularizer),
                activityRegularizer: serializeRegularizer(this.activityRegularizer),
                biasConstraint: serializeConstraint(this.biasConstraint)
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        return BaseConv;
    }(Layer));
    var Conv = (function (_super) {
        __extends(Conv, _super);
        function Conv(rank, config) {
            var _this = _super.call(this, rank, config) || this;
            _this.kernel = null;
            Conv.verifyConfig(config);
            _this.filters = config.filters;
            _this.kernelInitializer = getInitializer(config.kernelInitializer || _this.DEFAULT_KERNEL_INITIALIZER);
            _this.kernelConstraint = getConstraint(config.kernelConstraint);
            _this.kernelRegularizer = getRegularizer(config.kernelRegularizer);
            return _this;
        }
        Conv.prototype.build = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            var channelAxis = this.dataFormat === 'channelsFirst' ? 1 : inputShape.length - 1;
            if (inputShape[channelAxis] == null) {
                throw new ValueError("The channel dimension of the input should be defined. " +
                    ("Found " + inputShape[channelAxis]));
            }
            var inputDim = inputShape[channelAxis];
            var kernelShape = this.kernelSize.concat([inputDim, this.filters]);
            this.kernel = this.addWeight('kernel', kernelShape, null, this.kernelInitializer, this.kernelRegularizer, true, this.kernelConstraint);
            if (this.useBias) {
                this.bias = this.addWeight('bias', [this.filters], null, this.biasInitializer, this.biasRegularizer, true, this.biasConstraint);
            }
            this.inputSpec = [{ ndim: this.rank + 2, axes: (_a = {}, _a[channelAxis] = inputDim, _a) }];
            this.built = true;
            var _a;
        };
        Conv.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                inputs = getExactlyOneTensor(inputs);
                var outputs;
                var biasValue = _this.bias == null ? null : _this.bias.read();
                if (_this.rank === 1) {
                    outputs = conv1dWithBias(inputs, _this.kernel.read(), biasValue, _this.strides[0], _this.padding, _this.dataFormat, _this.dilationRate[0]);
                }
                else if (_this.rank === 2) {
                    outputs = conv2dWithBias(inputs, _this.kernel.read(), biasValue, _this.strides, _this.padding, _this.dataFormat, _this.dilationRate);
                }
                else if (_this.rank === 3) {
                    throw new NotImplementedError('3D convolution is not implemented yet.');
                }
                if (_this.activation != null) {
                    outputs = _this.activation.apply(outputs);
                }
                return outputs;
            });
        };
        Conv.prototype.computeOutputShape = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            var newSpace = [];
            var space = (this.dataFormat === 'channelsLast') ?
                inputShape.slice(1, inputShape.length - 1) :
                inputShape.slice(2);
            for (var i = 0; i < space.length; ++i) {
                var newDim = convOutputLength(space[i], this.kernelSize[i], this.padding, this.strides[i], typeof this.dilationRate === 'number' ? this.dilationRate :
                    this.dilationRate[i]);
                newSpace.push(newDim);
            }
            var outputShape = [inputShape[0]];
            if (this.dataFormat === 'channelsLast') {
                outputShape = outputShape.concat(newSpace);
                outputShape.push(this.filters);
            }
            else {
                outputShape.push(this.filters);
                outputShape = outputShape.concat(newSpace);
            }
            return outputShape;
        };
        Conv.prototype.getConfig = function () {
            var config = {
                filters: this.filters,
                kernelInitializer: serializeInitializer(this.kernelInitializer),
                kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
                kernelConstraint: serializeConstraint(this.kernelConstraint)
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        Conv.verifyConfig = function (config) {
            if (!('filters' in config) || typeof config.filters !== 'number' ||
                config.filters < 1) {
                throw new ValueError("Convolution layer expected config.filters to be a 'number' > 0 " +
                    ("but got " + JSON.stringify(config.filters)));
            }
        };
        return Conv;
    }(BaseConv));
    var Conv2D = (function (_super) {
        __extends(Conv2D, _super);
        function Conv2D(config) {
            var _this = _super.call(this, 2, config) || this;
            Conv2D.verifyConfig(config);
            return _this;
        }
        Conv2D.prototype.getConfig = function () {
            var config = _super.prototype.getConfig.call(this);
            delete config['rank'];
            return config;
        };
        Conv2D.verifyConfig = function (config) {
            if ((typeof config.kernelSize !== 'number') &&
                !checkArrayTypeAndLength(config.kernelSize, 'number', 1, 2))
                throw new ValueError("Conv2D expects config.kernelSize to be number or number[] with " +
                    ("length 1 or 2, but received " + JSON.stringify(config.kernelSize) + "."));
        };
        Conv2D.className = 'Conv2D';
        return Conv2D;
    }(Conv));
    tfc.serialization.registerClass(Conv2D);
    var Conv2DTranspose = (function (_super) {
        __extends(Conv2DTranspose, _super);
        function Conv2DTranspose(config) {
            var _this = _super.call(this, config) || this;
            _this.inputSpec = [new InputSpec({ ndim: 4 })];
            if (_this.padding !== 'same' && _this.padding !== 'valid') {
                throw new ValueError("Conv2DTranspose currently supports only padding modes 'same' " +
                    ("and 'valid', but received padding mode " + _this.padding));
            }
            return _this;
        }
        Conv2DTranspose.prototype.build = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            if (inputShape.length !== 4) {
                throw new ValueError('Input should have rank 4; Received input shape: ' +
                    JSON.stringify(inputShape));
            }
            var channelAxis = this.dataFormat === 'channelsFirst' ? 1 : inputShape.length - 1;
            if (inputShape[channelAxis] == null) {
                throw new ValueError('The channel dimension of the inputs should be defined. ' +
                    'Found `None`.');
            }
            var inputDim = inputShape[channelAxis];
            var kernelShape = this.kernelSize.concat([this.filters, inputDim]);
            this.kernel = this.addWeight('kernel', kernelShape, 'float32', this.kernelInitializer, this.kernelRegularizer, true, this.kernelConstraint);
            if (this.useBias) {
                this.bias = this.addWeight('bias', [this.filters], 'float32', this.biasInitializer, this.biasRegularizer, true, this.biasConstraint);
            }
            this.inputSpec =
                [new InputSpec({ ndim: 4, axes: (_a = {}, _a[channelAxis] = inputDim, _a) })];
            this.built = true;
            var _a;
        };
        Conv2DTranspose.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                var input = getExactlyOneTensor(inputs);
                if (input.shape.length !== 4) {
                    throw new ValueError("Conv2DTranspose.call() expects input tensor to be rank-4, but " +
                        ("received a tensor of rank-" + input.shape.length));
                }
                var inputShape = input.shape;
                var batchSize = inputShape[0];
                var hAxis;
                var wAxis;
                if (_this.dataFormat === 'channelsFirst') {
                    hAxis = 2;
                    wAxis = 3;
                }
                else {
                    hAxis = 1;
                    wAxis = 2;
                }
                var height = inputShape[hAxis];
                var width = inputShape[wAxis];
                var kernelH = _this.kernelSize[0];
                var kernelW = _this.kernelSize[1];
                var strideH = _this.strides[0];
                var strideW = _this.strides[1];
                var outHeight = deconvLength(height, strideH, kernelH, _this.padding);
                var outWidth = deconvLength(width, strideW, kernelW, _this.padding);
                var outputShape = [batchSize, outHeight, outWidth, _this.filters];
                if (_this.dataFormat !== 'channelsLast') {
                    input = tfc.transpose(input, [0, 2, 3, 1]);
                }
                var outputs = tfc.conv2dTranspose(input, _this.kernel.read(), outputShape, _this.strides, _this.padding);
                if (_this.dataFormat !== 'channelsLast') {
                    outputs = tfc.transpose(outputs, [0, 3, 1, 2]);
                }
                if (_this.bias != null) {
                    outputs =
                        biasAdd(outputs, _this.bias.read(), _this.dataFormat);
                }
                if (_this.activation != null) {
                    outputs = _this.activation.apply(outputs);
                }
                return outputs;
            });
        };
        Conv2DTranspose.prototype.computeOutputShape = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            var outputShape = inputShape.slice();
            var channelAxis;
            var heightAxis;
            var widthAxis;
            if (this.dataFormat === 'channelsFirst') {
                channelAxis = 1;
                heightAxis = 2;
                widthAxis = 3;
            }
            else {
                channelAxis = 3;
                heightAxis = 1;
                widthAxis = 2;
            }
            var kernelH = this.kernelSize[0];
            var kernelW = this.kernelSize[1];
            var strideH = this.strides[0];
            var strideW = this.strides[1];
            outputShape[channelAxis] = this.filters;
            outputShape[heightAxis] =
                deconvLength(outputShape[heightAxis], strideH, kernelH, this.padding);
            outputShape[widthAxis] =
                deconvLength(outputShape[widthAxis], strideW, kernelW, this.padding);
            return outputShape;
        };
        Conv2DTranspose.prototype.getConfig = function () {
            var config = _super.prototype.getConfig.call(this);
            delete config['dilationRate'];
            return config;
        };
        Conv2DTranspose.className = 'Conv2DTranspose';
        return Conv2DTranspose;
    }(Conv2D));
    tfc.serialization.registerClass(Conv2DTranspose);
    var SeparableConv = (function (_super) {
        __extends(SeparableConv, _super);
        function SeparableConv(rank, config) {
            var _this = _super.call(this, rank, config) || this;
            _this.DEFAULT_DEPTHWISE_INITIALIZER = 'glorotUniform';
            _this.DEFAULT_POINTWISE_INITIALIZER = 'glorotUniform';
            _this.depthwiseKernel = null;
            _this.pointwiseKernel = null;
            if (config.filters == null) {
                throw new ValueError('The `filters` configuration field is required by SeparableConv, ' +
                    'but is unspecified.');
            }
            if (config.kernelInitializer != null || config.kernelRegularizer != null ||
                config.kernelConstraint != null) {
                throw new ValueError('Fields kernelInitializer, kernelRegularizer and kernelConstraint ' +
                    'are invalid for SeparableConv2D. Use depthwiseInitializer, ' +
                    'depthwiseRegularizer, depthwiseConstraint, pointwiseInitializer, ' +
                    'pointwiseRegularizer and pointwiseConstraint instead.');
            }
            if (config.padding != null && config.padding !== 'same' &&
                config.padding !== 'valid') {
                throw new ValueError("SeparableConv" + _this.rank + "D supports only padding modes: " +
                    ("'same' and 'valid', but received " + JSON.stringify(config.padding)));
            }
            _this.depthMultiplier =
                config.depthMultiplier == null ? 1 : config.depthMultiplier;
            _this.depthwiseInitializer = getInitializer(config.depthwiseInitializer || _this.DEFAULT_DEPTHWISE_INITIALIZER);
            _this.depthwiseRegularizer = getRegularizer(config.depthwiseRegularizer);
            _this.depthwiseConstraint = getConstraint(config.depthwiseConstraint);
            _this.pointwiseInitializer = getInitializer(config.depthwiseInitializer || _this.DEFAULT_POINTWISE_INITIALIZER);
            _this.pointwiseRegularizer = getRegularizer(config.pointwiseRegularizer);
            _this.pointwiseConstraint = getConstraint(config.pointwiseConstraint);
            return _this;
        }
        SeparableConv.prototype.build = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            if (inputShape.length < this.rank + 2) {
                throw new ValueError("Inputs to SeparableConv" + this.rank + "D should have rank " +
                    (this.rank + 2 + ", but received input shape: ") +
                    ("" + JSON.stringify(inputShape)));
            }
            var channelAxis = this.dataFormat === 'channelsFirst' ? 1 : inputShape.length - 1;
            if (inputShape[channelAxis] == null || inputShape[channelAxis] < 0) {
                throw new ValueError("The channel dimension of the inputs should be defined, " +
                    ("but found " + JSON.stringify(inputShape[channelAxis])));
            }
            var inputDim = inputShape[channelAxis];
            var depthwiseKernelShape = this.kernelSize.concat([inputDim, this.depthMultiplier]);
            var pointwiseKernelShape = [];
            for (var i = 0; i < this.rank; ++i) {
                pointwiseKernelShape.push(1);
            }
            pointwiseKernelShape.push(inputDim * this.depthMultiplier, this.filters);
            var trainable = true;
            this.depthwiseKernel = this.addWeight('depthwise_kernel', depthwiseKernelShape, 'float32', this.depthwiseInitializer, this.depthwiseRegularizer, trainable, this.depthwiseConstraint);
            this.pointwiseKernel = this.addWeight('pointwise_kernel', pointwiseKernelShape, 'float32', this.pointwiseInitializer, this.pointwiseRegularizer, trainable, this.pointwiseConstraint);
            if (this.useBias) {
                this.bias = this.addWeight('bias', [this.filters], 'float32', this.biasInitializer, this.biasRegularizer, trainable, this.biasConstraint);
            }
            else {
                this.bias = null;
            }
            this.inputSpec =
                [new InputSpec({ ndim: this.rank + 2, axes: (_a = {}, _a[channelAxis] = inputDim, _a) })];
            this.built = true;
            var _a;
        };
        SeparableConv.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                inputs = getExactlyOneTensor(inputs);
                var output;
                if (_this.rank === 1) {
                    throw new NotImplementedError('1D separable convolution is not implemented yet.');
                }
                else if (_this.rank === 2) {
                    if (_this.dataFormat === 'channelsFirst') {
                        inputs = tfc.transpose(inputs, [0, 2, 3, 1]);
                    }
                    output = tfc.separableConv2d(inputs, _this.depthwiseKernel.read(), _this.pointwiseKernel.read(), _this.strides, _this.padding, _this.dilationRate, 'NHWC');
                }
                if (_this.useBias) {
                    output = biasAdd(output, _this.bias.read(), _this.dataFormat);
                }
                if (_this.activation != null) {
                    output = _this.activation.apply(output);
                }
                if (_this.dataFormat === 'channelsFirst') {
                    output = tfc.transpose(output, [0, 3, 1, 2]);
                }
                return output;
            });
        };
        SeparableConv.prototype.getConfig = function () {
            var config = _super.prototype.getConfig.call(this);
            delete config['rank'];
            delete config['kernelInitializer'];
            delete config['kernelRegularizer'];
            delete config['kernelConstraint'];
            config['depthwiseInitializer'] =
                serializeInitializer(this.depthwiseInitializer);
            config['pointwiseInitializer'] =
                serializeInitializer(this.pointwiseInitializer);
            config['depthwiseRegularizer'] =
                serializeRegularizer(this.depthwiseRegularizer);
            config['pointwiseRegularizer'] =
                serializeRegularizer(this.pointwiseRegularizer);
            config['depthwiseConstraint'] =
                serializeConstraint(this.depthwiseConstraint);
            config['pointwiseConstraint'] =
                serializeConstraint(this.pointwiseConstraint);
            return config;
        };
        SeparableConv.className = 'SeparableConv';
        return SeparableConv;
    }(Conv));
    var SeparableConv2D = (function (_super) {
        __extends(SeparableConv2D, _super);
        function SeparableConv2D(config) {
            return _super.call(this, 2, config) || this;
        }
        SeparableConv2D.className = 'SeparableConv2D';
        return SeparableConv2D;
    }(SeparableConv));
    tfc.serialization.registerClass(SeparableConv2D);
    var Conv1D = (function (_super) {
        __extends(Conv1D, _super);
        function Conv1D(config) {
            var _this = _super.call(this, 1, config) || this;
            Conv1D.verifyConfig(config);
            _this.inputSpec = [{ ndim: 3 }];
            return _this;
        }
        Conv1D.prototype.getConfig = function () {
            var config = _super.prototype.getConfig.call(this);
            delete config['rank'];
            delete config['dataFormat'];
            return config;
        };
        Conv1D.verifyConfig = function (config) {
            if (typeof config.kernelSize !== 'number' &&
                !checkArrayTypeAndLength(config.kernelSize, 'number', 1, 1))
                throw new ValueError("Conv1D expects config.kernelSize to be number or number[] with " +
                    ("length 1, but received " + JSON.stringify(config.kernelSize) + "."));
        };
        Conv1D.className = 'Conv1D';
        return Conv1D;
    }(Conv));
    tfc.serialization.registerClass(Conv1D);
    var Cropping2D = (function (_super) {
        __extends(Cropping2D, _super);
        function Cropping2D(config) {
            var _this = _super.call(this, config) || this;
            if (typeof config.cropping === 'number')
                _this.cropping = [
                    [config.cropping, config.cropping], [config.cropping, config.cropping]
                ];
            else if (typeof config.cropping[0] === 'number')
                _this.cropping = [
                    [config.cropping[0], config.cropping[0]],
                    [config.cropping[1], config.cropping[1]]
                ];
            else
                _this.cropping = config.cropping;
            _this.dataFormat =
                config.dataFormat === undefined ? 'channelsLast' : config.dataFormat;
            _this.inputSpec = [{ ndim: 4 }];
            return _this;
        }
        Cropping2D.prototype.computeOutputShape = function (inputShape) {
            if (this.dataFormat === 'channelsFirst')
                return [
                    inputShape[0],
                    inputShape[1],
                    inputShape[2] - this.cropping[0][0] - this.cropping[0][1],
                    inputShape[3] - this.cropping[1][0] - this.cropping[1][1]
                ];
            else
                return [
                    inputShape[0],
                    inputShape[1] - this.cropping[0][0] - this.cropping[0][1],
                    inputShape[2] - this.cropping[1][0] - this.cropping[1][1],
                    inputShape[3]
                ];
        };
        Cropping2D.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                inputs = getExactlyOneTensor(inputs);
                if (_this.dataFormat === 'channelsLast') {
                    var hSliced = sliceAlongAxis(inputs, _this.cropping[0][0], inputs.shape[1] - _this.cropping[0][0] - _this.cropping[0][1], 2);
                    return sliceAlongAxis(hSliced, _this.cropping[1][0], inputs.shape[2] - _this.cropping[1][1] - _this.cropping[1][0], 3);
                }
                else {
                    var hSliced = sliceAlongAxis(inputs, _this.cropping[0][0], inputs.shape[2] - _this.cropping[0][0] - _this.cropping[0][1], 3);
                    return sliceAlongAxis(hSliced, _this.cropping[1][0], inputs.shape[3] - _this.cropping[1][1] - _this.cropping[1][0], 4);
                }
            });
        };
        Cropping2D.prototype.getConfig = function () {
            var config = { cropping: this.cropping, dataFormat: this.dataFormat };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        Cropping2D.className = 'Cropping2D';
        return Cropping2D;
    }(Layer));
    tfc.serialization.registerClass(Cropping2D);
    var UpSampling2D = (function (_super) {
        __extends(UpSampling2D, _super);
        function UpSampling2D(config) {
            var _this = _super.call(this, config) || this;
            _this.DEFAULT_SIZE = [2, 2];
            _this.inputSpec = [{ ndim: 4 }];
            _this.size = config.size == null ? _this.DEFAULT_SIZE : config.size;
            _this.dataFormat =
                config.dataFormat == null ? 'channelsLast' : config.dataFormat;
            return _this;
        }
        UpSampling2D.prototype.computeOutputShape = function (inputShape) {
            if (this.dataFormat === 'channelsFirst') {
                var height = inputShape[2] == null ? null : this.size[0] * inputShape[2];
                var width = inputShape[3] == null ? null : this.size[1] * inputShape[3];
                return [inputShape[0], inputShape[1], height, width];
            }
            else {
                var height = inputShape[1] == null ? null : this.size[0] * inputShape[1];
                var width = inputShape[2] == null ? null : this.size[1] * inputShape[2];
                return [inputShape[0], height, width, inputShape[3]];
            }
        };
        UpSampling2D.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                var input = getExactlyOneTensor(inputs);
                var inputShape = input.shape;
                if (_this.dataFormat === 'channelsFirst') {
                    input = tfc.transpose(input, [0, 2, 3, 1]);
                    var height = _this.size[0] * inputShape[2];
                    var width = _this.size[1] * inputShape[3];
                    var resized = input.resizeNearestNeighbor([height, width]);
                    return tfc.transpose(resized, [0, 3, 1, 2]);
                }
                else {
                    var height = _this.size[0] * inputShape[1];
                    var width = _this.size[1] * inputShape[2];
                    return input.resizeNearestNeighbor([height, width]);
                }
            });
        };
        UpSampling2D.prototype.getConfig = function () {
            var config = { size: this.size, dataFormat: this.dataFormat };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        UpSampling2D.className = 'UpSampling2D';
        return UpSampling2D;
    }(Layer));
    tfc.serialization.registerClass(UpSampling2D);

    function depthwiseConv2d(x, depthwiseKernel, strides, padding, dataFormat, dilationRate) {
        if (strides === void 0) { strides = [1, 1]; }
        if (padding === void 0) { padding = 'valid'; }
        return tfc.tidy(function () {
            if (dataFormat == null) {
                dataFormat = imageDataFormat();
            }
            checkDataFormat(dataFormat);
            var y = preprocessConv2DInput(x, dataFormat);
            if (x.rank !== 4) {
                throw new ValueError("Input for depthwiseConv2d is required to be 4-D, but is instead " +
                    (x.rank + "-D"));
            }
            if (depthwiseKernel.rank !== 4) {
                throw new ValueError("depthwiseKernel is required to be 4-D, but is instead " +
                    (depthwiseKernel.rank + "-D"));
            }
            y = tfc.depthwiseConv2d(y, depthwiseKernel, strides, padding === 'same' ? 'same' : 'valid', 'NHWC', dilationRate);
            if (dataFormat === 'channelsFirst') {
                y = tfc.transpose(y, [0, 3, 1, 2]);
            }
            return y;
        });
    }
    var DepthwiseConv2D = (function (_super) {
        __extends(DepthwiseConv2D, _super);
        function DepthwiseConv2D(config) {
            var _this = _super.call(this, 2, config) || this;
            _this.depthwiseKernel = null;
            _this.depthMultiplier =
                config.depthMultiplier == null ? 1 : config.depthMultiplier;
            _this.depthwiseInitializer = getInitializer(config.depthwiseInitializer || _this.DEFAULT_KERNEL_INITIALIZER);
            _this.depthwiseConstraint = getConstraint(config.depthwiseConstraint);
            _this.depthwiseRegularizer = getRegularizer(config.depthwiseRegularizer);
            return _this;
        }
        DepthwiseConv2D.prototype.build = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            if (inputShape.length < 4) {
                throw new ValueError("Inputs to DepthwiseConv2D should have rank 4. " +
                    ("Received input shape: " + JSON.stringify(inputShape) + "."));
            }
            var channelAxis = this.dataFormat === 'channelsFirst' ? 1 : 3;
            if (inputShape[channelAxis] == null || inputShape[channelAxis] < 0) {
                throw new ValueError('The channel dimension of the inputs to DepthwiseConv2D should ' +
                    ("be defined, but is not (" + inputShape[channelAxis] + ")."));
            }
            var inputDim = inputShape[channelAxis];
            var depthwiseKernelShape = [
                this.kernelSize[0], this.kernelSize[1], inputDim, this.depthMultiplier
            ];
            this.depthwiseKernel = this.addWeight('depthwise_kernel', depthwiseKernelShape, null, this.depthwiseInitializer, this.depthwiseRegularizer, true, this.depthwiseConstraint);
            if (this.useBias) {
                this.bias = this.addWeight('bias', [inputDim * this.depthMultiplier], null, this.biasInitializer, this.biasRegularizer, true, this.biasConstraint);
            }
            else {
                this.bias = null;
            }
            this.built = true;
        };
        DepthwiseConv2D.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                inputs = getExactlyOneTensor(inputs);
                var outputs = depthwiseConv2d(inputs, _this.depthwiseKernel.read(), _this.strides, _this.padding, _this.dataFormat, null);
                if (_this.useBias) {
                    outputs = biasAdd(outputs, _this.bias.read(), _this.dataFormat);
                }
                if (_this.activation != null) {
                    outputs = _this.activation.apply(outputs);
                }
                return outputs;
            });
        };
        DepthwiseConv2D.prototype.computeOutputShape = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            var rows = this.dataFormat === 'channelsFirst' ? inputShape[2] : inputShape[1];
            var cols = this.dataFormat === 'channelsFirst' ? inputShape[3] : inputShape[2];
            var outFilters = this.dataFormat === 'channelsFirst' ?
                inputShape[1] * this.depthMultiplier :
                inputShape[3] * this.depthMultiplier;
            var outRows = convOutputLength(rows, this.kernelSize[0], this.padding, this.strides[0]);
            var outCols = convOutputLength(cols, this.kernelSize[1], this.padding, this.strides[1]);
            if (this.dataFormat === 'channelsFirst') {
                return [inputShape[0], outFilters, outRows, outCols];
            }
            else {
                return [inputShape[0], outRows, outCols, outFilters];
            }
        };
        DepthwiseConv2D.prototype.getConfig = function () {
            var config = _super.prototype.getConfig.call(this);
            config['depthMultiplier'] = this.depthMultiplier;
            config['depthwiseInitializer'] =
                serializeInitializer(this.depthwiseInitializer);
            config['depthwiseRegularizer'] =
                serializeRegularizer(this.depthwiseRegularizer);
            config['depthwiseConstraint'] =
                serializeConstraint(this.depthwiseRegularizer);
            return config;
        };
        DepthwiseConv2D.className = 'DepthwiseConv2D';
        return DepthwiseConv2D;
    }(BaseConv));
    tfc.serialization.registerClass(DepthwiseConv2D);

    var Dropout = (function (_super) {
        __extends(Dropout, _super);
        function Dropout(config) {
            var _this = _super.call(this, config) || this;
            _this.rate = Math.max(Math.min(config.rate, 1), 0);
            _this.rateScalar = getScalar(_this.rate);
            _this.noiseShape = config.noiseShape;
            _this.seed = config.seed;
            if (_this.seed != null) {
                throw new NotImplementedError('Non-default seed is not implemented in Dropout layer yet: ' +
                    _this.seed);
            }
            _this.supportsMasking = true;
            return _this;
        }
        Dropout.prototype.getNoiseShape = function (input) {
            if (this.noiseShape == null) {
                return this.noiseShape;
            }
            var inputShape = input.shape;
            var noiseShape = [];
            for (var i = 0; i < this.noiseShape.length; ++i) {
                noiseShape.push(this.noiseShape[i] == null ? inputShape[i] : this.noiseShape[i]);
            }
            return noiseShape;
        };
        Dropout.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                _this.invokeCallHook(inputs, kwargs);
                var input = getExactlyOneTensor(inputs);
                if (_this.noiseShape != null &&
                    !tfc.util.arraysEqual(input.shape, _this.noiseShape)) {
                    throw new NotImplementedError('Non-default noise shape is not implemented in Dropout ' +
                        'layer yet: ' + JSON.stringify(_this.noiseShape));
                }
                if (0 < _this.rate && _this.rate < 1) {
                    var training = kwargs['training'] == null ? false : kwargs['training'];
                    var noiseShape_1 = _this.getNoiseShape(input);
                    var output = inTrainPhase(function () { return dropout(input, _this.rateScalar, noiseShape_1, _this.seed); }, function () { return input; }, training);
                    return output;
                }
                return inputs;
            });
        };
        Dropout.prototype.getConfig = function () {
            var config = {
                rate: this.rate,
                noiseShape: this.noiseShape,
                seed: this.seed,
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        Dropout.className = 'Dropout';
        return Dropout;
    }(Layer));
    tfc.serialization.registerClass(Dropout);
    var Dense = (function (_super) {
        __extends(Dense, _super);
        function Dense(config) {
            var _this = _super.call(this, config) || this;
            _this.activation = null;
            _this.useBias = true;
            _this.kernel = null;
            _this.bias = null;
            _this.DEFAULT_KERNEL_INITIALIZER = 'glorotNormal';
            _this.DEFAULT_BIAS_INITIALIZER = 'zeros';
            if (config.batchInputShape == null && config.inputShape == null &&
                config.inputDim != null) {
                var batchSize = null;
                if (config.batchSize != null) {
                    batchSize = config.batchSize;
                }
                _this.batchInputShape = [batchSize, config.inputDim];
            }
            _this.units = config.units;
            _this.activation = getActivation(config.activation);
            if (config.useBias != null) {
                _this.useBias = config.useBias;
            }
            _this.kernelInitializer = getInitializer(config.kernelInitializer || _this.DEFAULT_KERNEL_INITIALIZER);
            _this.biasInitializer =
                getInitializer(config.biasInitializer || _this.DEFAULT_BIAS_INITIALIZER);
            _this.kernelConstraint = getConstraint(config.kernelConstraint);
            _this.biasConstraint = getConstraint(config.biasConstraint);
            _this.kernelRegularizer = getRegularizer(config.kernelRegularizer);
            _this.biasRegularizer = getRegularizer(config.biasRegularizer);
            _this.activityRegularizer = getRegularizer(config.activityRegularizer);
            _this.inputSpec = [{ minNDim: 2 }];
            return _this;
        }
        Dense.prototype.build = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            var inputLastDim = inputShape[inputShape.length - 1];
            if (this.kernel == null) {
                this.kernel = this.addWeight('kernel', [inputLastDim, this.units], null, this.kernelInitializer, this.kernelRegularizer, true, this.kernelConstraint);
                if (this.useBias) {
                    this.bias = this.addWeight('bias', [this.units], null, this.biasInitializer, this.biasRegularizer, true, this.biasConstraint);
                }
            }
            this.inputSpec = [{ minNDim: 2, axes: (_a = {}, _a[-1] = inputLastDim, _a) }];
            this.built = true;
            var _a;
        };
        Dense.prototype.computeOutputShape = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            var outputShape = inputShape.slice();
            outputShape[outputShape.length - 1] = this.units;
            return outputShape;
        };
        Dense.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                _this.invokeCallHook(inputs, kwargs);
                var input = getExactlyOneTensor(inputs);
                var output = dot(input, _this.kernel.read());
                if (_this.bias != null) {
                    output = biasAdd(output, _this.bias.read());
                }
                if (_this.activation != null) {
                    output = _this.activation.apply(output);
                }
                return output;
            });
        };
        Dense.prototype.getConfig = function () {
            var config = {
                units: this.units,
                activation: serializeActivation(this.activation),
                useBias: this.useBias,
                kernelInitializer: serializeInitializer(this.kernelInitializer),
                biasInitializer: serializeInitializer(this.biasInitializer),
                kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
                biasRegularizer: serializeRegularizer(this.biasRegularizer),
                activityRegularizer: serializeRegularizer(this.activityRegularizer),
                kernelConstraint: serializeConstraint(this.kernelConstraint),
                biasConstraint: serializeConstraint(this.biasConstraint)
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        Dense.className = 'Dense';
        return Dense;
    }(Layer));
    tfc.serialization.registerClass(Dense);
    var Flatten = (function (_super) {
        __extends(Flatten, _super);
        function Flatten(config) {
            var _this = _super.call(this, config || {}) || this;
            _this.inputSpec = [{ minNDim: 3 }];
            return _this;
        }
        Flatten.prototype.computeOutputShape = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            for (var _i = 0, _a = inputShape.slice(1); _i < _a.length; _i++) {
                var dim = _a[_i];
                if (dim == null) {
                    throw new ValueError("The shape of the input to \"Flatten\" is not fully defined " +
                        ("(got " + inputShape.slice(1) + "). Make sure to pass a complete ") +
                        "\"input_shape\" or \"batch_input_shape\" argument to the first " +
                        "layer in your model.");
                }
            }
            return [inputShape[0], arrayProd(inputShape, 1)];
        };
        Flatten.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                _this.invokeCallHook(inputs, kwargs);
                return batchFlatten(getExactlyOneTensor(inputs));
            });
        };
        Flatten.className = 'Flatten';
        return Flatten;
    }(Layer));
    tfc.serialization.registerClass(Flatten);
    var Activation$1 = (function (_super) {
        __extends(Activation$$1, _super);
        function Activation$$1(config) {
            var _this = _super.call(this, config) || this;
            _this.supportsMasking = true;
            _this.activation = getActivation(config.activation);
            return _this;
        }
        Activation$$1.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                _this.invokeCallHook(inputs, kwargs);
                var input = getExactlyOneTensor(inputs);
                return _this.activation.apply(input);
            });
        };
        Activation$$1.prototype.getConfig = function () {
            var config = { activation: serializeActivation(this.activation) };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        Activation$$1.className = 'Activation';
        return Activation$$1;
    }(Layer));
    tfc.serialization.registerClass(Activation$1);
    var RepeatVector = (function (_super) {
        __extends(RepeatVector, _super);
        function RepeatVector(config) {
            var _this = _super.call(this, config) || this;
            _this.n = config.n;
            _this.inputSpec = [{ ndim: 2 }];
            return _this;
        }
        RepeatVector.prototype.computeOutputShape = function (inputShape) {
            return [inputShape[0], this.n, inputShape[1]];
        };
        RepeatVector.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                inputs = getExactlyOneTensor(inputs);
                return repeat(inputs, _this.n);
            });
        };
        RepeatVector.prototype.getConfig = function () {
            var config = {
                n: this.n,
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        RepeatVector.className = 'RepeatVector';
        return RepeatVector;
    }(Layer));
    tfc.serialization.registerClass(RepeatVector);
    var Reshape = (function (_super) {
        __extends(Reshape, _super);
        function Reshape(config) {
            var _this = _super.call(this, config) || this;
            _this.targetShape = config.targetShape;
            for (var i = 0; i < _this.targetShape.length; ++i) {
                if (_this.isUnknown(_this.targetShape[i])) {
                    _this.targetShape[i] = null;
                }
            }
            return _this;
        }
        Reshape.prototype.isUnknown = function (dim) {
            return dim < 0 || dim == null;
        };
        Reshape.prototype.fixUnknownDimension = function (inputShape, outputShape) {
            var errorMsg = 'Total size of new array must be unchanged.';
            var finalShape = outputShape.slice();
            var known = 1;
            var unknown = null;
            for (var i = 0; i < finalShape.length; ++i) {
                var dim = finalShape[i];
                if (this.isUnknown(dim)) {
                    if (unknown === null) {
                        unknown = i;
                    }
                    else {
                        throw new ValueError('Can only specifiy one unknown dimension.');
                    }
                }
                else {
                    known *= dim;
                }
            }
            var originalSize = arrayProd(inputShape);
            if (unknown !== null) {
                if (known === 0 || originalSize % known !== 0) {
                    throw new ValueError(errorMsg);
                }
                finalShape[unknown] = originalSize / known;
            }
            else if (originalSize !== known) {
                throw new ValueError(errorMsg);
            }
            return finalShape;
        };
        Reshape.prototype.computeOutputShape = function (inputShape) {
            var anyUnknownDims = false;
            for (var i = 0; i < inputShape.length; ++i) {
                if (this.isUnknown(inputShape[i])) {
                    anyUnknownDims = true;
                    break;
                }
            }
            if (anyUnknownDims) {
                return inputShape.slice(0, 1).concat(this.targetShape);
            }
            else {
                return inputShape.slice(0, 1).concat(this.fixUnknownDimension(inputShape.slice(1), this.targetShape));
            }
        };
        Reshape.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                _this.invokeCallHook(inputs, kwargs);
                var input = getExactlyOneTensor(inputs);
                var inputShape = input.shape;
                var outputShape = inputShape.slice(0, 1).concat(_this.fixUnknownDimension(inputShape.slice(1), _this.targetShape));
                return input.reshape(outputShape);
            });
        };
        Reshape.prototype.getConfig = function () {
            var config = {
                targetShape: this.targetShape,
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        Reshape.className = 'Reshape';
        return Reshape;
    }(Layer));
    tfc.serialization.registerClass(Reshape);
    var Permute = (function (_super) {
        __extends(Permute, _super);
        function Permute(config) {
            var _this = _super.call(this, config) || this;
            if (config.dims == null) {
                throw new Error('Required configuration field `dims` is missing during Permute ' +
                    'constructor call.');
            }
            if (!Array.isArray(config.dims)) {
                throw new Error('Permute constructor requires `dims` to be an Array, but received ' +
                    (config.dims + " instead."));
            }
            var expectedSortedIndices = range(1, config.dims.length + 1);
            if (!tfc.util.arraysEqual(config.dims.slice().sort(), expectedSortedIndices)) {
                throw new Error('Invalid permutation `dims`: ' + JSON.stringify(config.dims) +
                    ' `dims` must contain consecutive integers starting from 1.');
            }
            _this.dims = config.dims;
            _this.dimsIncludingBatch = [0].concat(_this.dims);
            _this.inputSpec = [new InputSpec({ ndim: _this.dims.length + 1 })];
            return _this;
        }
        Permute.prototype.computeOutputShape = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            var outputShape = inputShape.slice();
            this.dims.forEach(function (dim, i) {
                outputShape[i + 1] = inputShape[dim];
            });
            return outputShape;
        };
        Permute.prototype.call = function (inputs, kwargs) {
            return tfc.transpose(getExactlyOneTensor(inputs), this.dimsIncludingBatch);
        };
        Permute.prototype.getConfig = function () {
            var config = {
                dims: this.dims,
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        Permute.className = 'Permute';
        return Permute;
    }(Layer));
    tfc.serialization.registerClass(Permute);

    var Embedding = (function (_super) {
        __extends(Embedding, _super);
        function Embedding(config) {
            var _this = _super.call(this, config) || this;
            _this.embeddings = null;
            _this.DEFAULT_EMBEDDINGS_INITIALIZER = 'randomUniform';
            if (config.batchInputShape == null && config.inputShape == null) {
                var batchSize = null;
                if (config.batchSize != null) {
                    batchSize = config.batchSize;
                }
                if (config.inputLength == null) {
                    _this.batchInputShape = [batchSize, null];
                }
                else {
                    _this.batchInputShape =
                        [batchSize].concat(toList(config.inputLength));
                }
            }
            _this.inputDim = config.inputDim;
            _this.outputDim = config.outputDim;
            _this.embeddingsInitializer = getInitializer(config.embeddingsInitializer || _this.DEFAULT_EMBEDDINGS_INITIALIZER);
            _this.embeddingsRegularizer = getRegularizer(config.embeddingsRegularizer);
            _this.activityRegularizer = getRegularizer(config.activityRegularizer);
            _this.embeddingsConstraint = getConstraint(config.embeddingsConstraint);
            _this.maskZero = config.maskZero;
            _this.inputLength = config.inputLength;
            return _this;
        }
        Embedding.prototype.build = function (inputShape) {
            this.embeddings = this.addWeight('embeddings', [this.inputDim, this.outputDim], this.dtype, this.embeddingsInitializer, this.embeddingsRegularizer, true, this.embeddingsConstraint);
            this.built = true;
        };
        Embedding.prototype.warnOnIncompatibleInputShape = function (inputShape) { };
        Embedding.prototype.computeMask = function (inputs, mask) {
            throw new NotImplementedError('computeMask has not been implemented for Embedding yet');
        };
        Embedding.prototype.computeOutputShape = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            if (this.inputLength == null) {
                return inputShape.concat([this.outputDim]);
            }
            var inLens = toList(this.inputLength);
            if (inLens.length !== inputShape.length - 1) {
                throw new ValueError("\"inputLength\" is " + this.inputLength + ", but received " +
                    ("input shape has shape " + inputShape));
            }
            else {
                var i = 0;
                for (var k = 0; k < inLens.length; ++k) {
                    var s1 = inLens[k];
                    var s2 = inputShape[k + 1];
                    if ((s1 != null) && (s2 != null) && (s1 !== s2)) {
                        throw new ValueError("\"inputLength\" is " + this.inputLength + ", but received " +
                            ("input shape has shape " + inputShape));
                    }
                    else if (s1 == null) {
                        inLens[i] = s2;
                    }
                    i++;
                }
            }
            return [inputShape[0]].concat(inLens, [this.outputDim]);
        };
        Embedding.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                _this.invokeCallHook(inputs, kwargs);
                var input = getExactlyOneTensor(inputs);
                if (input.dtype !== 'int32') {
                    input = cast(input, 'int32');
                }
                var output = gather(_this.embeddings.read(), input.as1D());
                return output.reshape(getExactlyOneShape(_this.computeOutputShape(input.shape)));
            });
        };
        Embedding.prototype.getConfig = function () {
            var config = {
                inputDim: this.inputDim,
                outputDim: this.outputDim,
                embeddingsInitializer: serializeInitializer(this.embeddingsInitializer),
                embeddingsRegularizer: serializeRegularizer(this.embeddingsRegularizer),
                activityRegularizer: serializeRegularizer(this.activityRegularizer),
                embeddingsConstraint: serializeConstraint(this.embeddingsConstraint),
                maskZero: this.maskZero,
                inputLength: this.inputLength
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        Embedding.className = 'Embedding';
        return Embedding;
    }(Layer));
    tfc.serialization.registerClass(Embedding);

    var Merge = (function (_super) {
        __extends(Merge, _super);
        function Merge(config) {
            var _this = _super.call(this, config || {}) || this;
            _this.supportsMasking = true;
            return _this;
        }
        Merge.prototype.mergeFunction = function (inputs) {
            throw new NotImplementedError();
        };
        Merge.prototype.computeElementwiseOpOutputShape = function (shape1, shape2) {
            if (shape1 == null || shape2 == null) {
                return null;
            }
            else if (shape1.length < shape2.length) {
                return this.computeElementwiseOpOutputShape(shape2, shape1);
            }
            else if (shape2.length === 0) {
                return shape1;
            }
            var outputShape = shape1.slice(0, shape1.length - shape2.length);
            for (var k = 0; k < shape2.length; ++k) {
                var i = shape1[shape1.length - shape2.length + k];
                var j = shape2[k];
                if (i == null || j == null || i < 0 || j < 0) {
                    outputShape.push(null);
                }
                else if (i === 1) {
                    outputShape.push(j);
                }
                else if (j === 1) {
                    outputShape.push(i);
                }
                else {
                    if (i !== j) {
                        throw new ValueError('Operands could not be broadcast together with shapes ' +
                            JSON.stringify(shape1) + ' ' + JSON.stringify(shape2));
                    }
                    outputShape.push(i);
                }
            }
            return outputShape;
        };
        Merge.prototype.build = function (inputShape) {
            if (Array.isArray(inputShape) && !Array.isArray(inputShape[0])) {
                inputShape = [getExactlyOneShape(inputShape)];
            }
            inputShape = inputShape;
            if (inputShape.length < 2) {
                throw new ValueError('A merge layer should be called on an Array of at least 2 inputs.' +
                    (" Got " + inputShape.length + " input(s)."));
            }
            var batchSizes = [];
            for (var _i = 0, inputShape_1 = inputShape; _i < inputShape_1.length; _i++) {
                var shape = inputShape_1[_i];
                if (shape != null && shape[0] !== null) {
                    batchSizes.push(shape[0]);
                }
            }
            batchSizes = unique(batchSizes);
            if (batchSizes.length > 1) {
                throw new ValueError("Can not merge tensors with different batch sizes. " +
                    ("Got tensors with shapes: " + JSON.stringify(inputShape) + "."));
            }
            var outputShape = inputShape[0] == null ? null : inputShape[0].slice(1);
            for (var i = 1; i < inputShape.length; ++i) {
                var shape = inputShape[i] == null ? null : inputShape[i].slice(1);
                outputShape = this.computeElementwiseOpOutputShape(outputShape, shape);
            }
            var allRanks = inputShape.map(function (shape) { return shape.length; });
            if (inputShape.indexOf(null) === -1 &&
                unique(allRanks).length === 1) {
                this.reshapeRequired = false;
            }
            else {
                this.reshapeRequired = true;
            }
        };
        Merge.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                inputs = inputs;
                if (_this.reshapeRequired) {
                    var reshapedInputs = [];
                    var inputDims = inputs.map(function (input) { return input.rank; });
                    if (inputDims.indexOf(null) === -1) {
                        var maxNDim = max(inputDims);
                        for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
                            var x = inputs_1[_i];
                            var xNDim = x.rank;
                            for (var k = 0; k < maxNDim - xNDim; ++k) {
                                x = expandDims(x, 1);
                            }
                            reshapedInputs.push(x);
                        }
                        return _this.mergeFunction(reshapedInputs);
                    }
                    else {
                        var transposed = false;
                        for (var _a = 0, inputs_2 = inputs; _a < inputs_2.length; _a++) {
                            var x = inputs_2[_a];
                            var xNDim = x.rank;
                            if (xNDim == null) {
                                var xShape = x.shape;
                                var batchSize = xShape[0];
                                var newShape = xShape.slice(1).concat([batchSize]);
                                var xTransposed = x.reshape([batchSize].concat(arrayProd(xShape.slice(1))));
                                xTransposed = tfc.transpose(xTransposed, [1, 0]);
                                xTransposed = xTransposed.reshape(newShape);
                                reshapedInputs.push(xTransposed);
                                transposed = true;
                            }
                            else if (xNDim > 1) {
                                var dims = range(1, xNDim).concat([0]);
                                reshapedInputs.push(tfc.transpose(x, dims));
                                transposed = true;
                            }
                            else {
                                reshapedInputs.push(x);
                            }
                        }
                        var y = _this.mergeFunction(reshapedInputs);
                        var yNDim = y.rank;
                        if (transposed) {
                            if (yNDim == null) {
                                var yShape = y.shape;
                                var yNDim_1 = yShape.length;
                                var batchSize = yShape[yNDim_1 - 1];
                                var newShape = [batchSize].concat(yShape.slice(0, yShape.length - 1));
                                y = tfc.transpose(y.reshape([-1, batchSize]), [1, 0])
                                    .reshape(newShape);
                            }
                            else if (yNDim > 1) {
                                var dims = [yNDim - 1].concat(range(0, yNDim - 1));
                                y = tfc.transpose(y, dims);
                            }
                        }
                        return y;
                    }
                }
                else {
                    return _this.mergeFunction(inputs);
                }
            });
        };
        Merge.prototype.computeOutputShape = function (inputShape) {
            inputShape = inputShape;
            var outputShape;
            if (inputShape[0] == null) {
                outputShape = null;
            }
            else {
                outputShape = inputShape[0].slice(1);
            }
            for (var i = 1; i < inputShape.length; ++i) {
                var shape = inputShape[i] == null ? null : inputShape[i].slice(1);
                outputShape = this.computeElementwiseOpOutputShape(outputShape, shape);
            }
            var batchSizes = [];
            for (var _i = 0, inputShape_2 = inputShape; _i < inputShape_2.length; _i++) {
                var shape = inputShape_2[_i];
                if (shape != null && shape[0] !== null) {
                    batchSizes.push(shape[0]);
                }
            }
            batchSizes = unique(batchSizes);
            if (batchSizes.length === 1) {
                outputShape = batchSizes.concat(outputShape);
            }
            else {
                outputShape = [null].concat(outputShape);
            }
            return outputShape;
        };
        Merge.prototype.computeMask = function (inputs, mask) {
            throw new NotImplementedError('computeMask has not been implemented for Merge yet');
        };
        return Merge;
    }(Layer));
    var Add = (function (_super) {
        __extends(Add, _super);
        function Add(config) {
            return _super.call(this, config) || this;
        }
        Add.prototype.mergeFunction = function (inputs) {
            return tfc.tidy(function () {
                var output = inputs[0].clone();
                for (var i = 1; i < inputs.length; ++i) {
                    output = tfc.add(output, inputs[i]);
                }
                return output;
            });
        };
        Add.className = 'Add';
        return Add;
    }(Merge));
    tfc.serialization.registerClass(Add);
    var Multiply = (function (_super) {
        __extends(Multiply, _super);
        function Multiply(config) {
            return _super.call(this, config) || this;
        }
        Multiply.prototype.mergeFunction = function (inputs) {
            return tfc.tidy(function () {
                var output = inputs[0].clone();
                for (var i = 1; i < inputs.length; ++i) {
                    output = tfc.mul(output, inputs[i]);
                }
                return output;
            });
        };
        Multiply.className = 'Multiply';
        return Multiply;
    }(Merge));
    tfc.serialization.registerClass(Multiply);
    var Average = (function (_super) {
        __extends(Average, _super);
        function Average(config) {
            return _super.call(this, config) || this;
        }
        Average.prototype.mergeFunction = function (inputs) {
            return tfc.tidy(function () {
                var output = inputs[0].clone();
                for (var i = 1; i < inputs.length; ++i) {
                    output = tfc.add(output, inputs[i]);
                }
                return tfc.mul(getScalar(1 / inputs.length), output);
            });
        };
        Average.className = 'Average';
        return Average;
    }(Merge));
    tfc.serialization.registerClass(Average);
    var Maximum = (function (_super) {
        __extends(Maximum, _super);
        function Maximum(config) {
            return _super.call(this, config) || this;
        }
        Maximum.prototype.mergeFunction = function (inputs) {
            return tfc.tidy(function () {
                var output = inputs[0];
                for (var i = 1; i < inputs.length; ++i) {
                    output = tfc.maximum(output, inputs[i]);
                }
                return output;
            });
        };
        Maximum.className = 'Maximum';
        return Maximum;
    }(Merge));
    tfc.serialization.registerClass(Maximum);
    var Minimum = (function (_super) {
        __extends(Minimum, _super);
        function Minimum(config) {
            return _super.call(this, config) || this;
        }
        Minimum.prototype.mergeFunction = function (inputs) {
            return tfc.tidy(function () {
                var output = inputs[0];
                for (var i = 1; i < inputs.length; ++i) {
                    output = tfc.minimum(output, inputs[i]);
                }
                return output;
            });
        };
        Minimum.className = 'Minimum';
        return Minimum;
    }(Merge));
    tfc.serialization.registerClass(Minimum);
    var Concatenate = (function (_super) {
        __extends(Concatenate, _super);
        function Concatenate(config) {
            var _this = _super.call(this, config) || this;
            _this.DEFAULT_AXIS = -1;
            if (config == null) {
                config = {};
            }
            _this.axis = config.axis == null ? _this.DEFAULT_AXIS : config.axis;
            _this.supportsMasking = true;
            _this.reshapeRequired = false;
            return _this;
        }
        Concatenate.prototype.build = function (inputShape) {
            if (!(Array.isArray(inputShape) && Array.isArray(inputShape[0])) ||
                inputShape.length === 1) {
                throw new ValueError('A `Concatenate` layer should be called on a list of at least 2 ' +
                    'inputs');
            }
            inputShape = inputShape;
            var allNoneShape = true;
            for (var _i = 0, inputShape_3 = inputShape; _i < inputShape_3.length; _i++) {
                var shape = inputShape_3[_i];
                if (shape != null) {
                    allNoneShape = false;
                    break;
                }
            }
            if (allNoneShape) {
                return;
            }
            var shapeSet = [];
            for (var i = 0; i < inputShape.length; ++i) {
                var shapeWithoutConcatAxis = inputShape[i].slice();
                shapeWithoutConcatAxis.splice(this.axis, 1);
                var exists = false;
                for (var _a = 0, shapeSet_1 = shapeSet; _a < shapeSet_1.length; _a++) {
                    var shape = shapeSet_1[_a];
                    if (tfc.util.arraysEqual(shape, shapeWithoutConcatAxis)) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    shapeSet.push(shapeWithoutConcatAxis);
                }
            }
            if (shapeSet.length > 1) {
                throw new ValueError('A `Concatenate` layer requires inputs with matching shapes ' +
                    'except for the concat axis. Got input shapes: ' +
                    JSON.stringify(inputShape));
            }
        };
        Concatenate.prototype.mergeFunction = function (inputs) {
            var _this = this;
            return tfc.tidy(function () {
                return concatenate(inputs, _this.axis);
            });
        };
        Concatenate.prototype.computeOutputShape = function (inputShape) {
            if (!(Array.isArray(inputShape) && Array.isArray(inputShape[0]))) {
                throw new ValueError('A `Concatenate` layer should be called on a list of inputs.');
            }
            var inputShapes = inputShape;
            var outputShape = inputShapes[0].slice();
            var axis = this.axis < 0 ? outputShape.length + this.axis : this.axis;
            for (var _i = 0, _a = inputShapes.slice(1); _i < _a.length; _i++) {
                var shape = _a[_i];
                if (outputShape[axis] == null || shape[axis] == null) {
                    outputShape[axis] = null;
                    break;
                }
                outputShape[axis] += shape[axis];
            }
            return outputShape;
        };
        Concatenate.prototype.computeMask = function (inputs, mask) {
            throw new NotImplementedError('computeMask has not been implemented for Concatenate yet');
        };
        Concatenate.prototype.getConfig = function () {
            var config = {
                'axis': this.axis,
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        Concatenate.className = 'Concatenate';
        return Concatenate;
    }(Merge));
    tfc.serialization.registerClass(Concatenate);
    function interpretAxis(axis, dim) {
        while (axis < 0) {
            axis += dim;
        }
        return axis;
    }
    function batchDot(x, y, axes) {
        if (x.shape.length > 3 || y.shape.length > 3) {
            throw new NotImplementedError('batchDot is not implemented for tensors of 4D or higher rank yet');
        }
        tfc.util.assert(x.shape.length >= 2, "batchDot requires the rank of x to be >= 2, " +
            ("but got " + x.shape.length));
        tfc.util.assert(x.shape.length >= 2, "batchDot requires the rank of y to be >= 2, " +
            ("but got " + y.shape.length));
        if (typeof axes === 'number') {
            axes = [axes, axes];
        }
        if (x.dtype === 'complex64' || y.dtype === 'complex64') {
            throw new NotImplementedError('batchDot is not implemented for complex64-type Tensors yet.');
        }
        var xNDim = x.shape.length;
        var yNDim = y.shape.length;
        if (axes == null) {
            axes = [xNDim - 1, yNDim - 2];
        }
        var axesArray = axes;
        return tfc.tidy(function () {
            var diff;
            if (xNDim > yNDim) {
                diff = xNDim - yNDim;
                var diffShape = [];
                for (var i = 0; i < diff; ++i) {
                    diffShape.push(1);
                }
                y = y.reshape(y.shape.concat(diffShape));
            }
            else if (yNDim > xNDim) {
                diff = yNDim - xNDim;
                var diffShape = [];
                for (var i = 0; i < diff; ++i) {
                    diffShape.push(1);
                }
                x = x.reshape(x.shape.concat(diffShape));
            }
            else {
                diff = 0;
            }
            var out;
            if (x.shape.length === 2 && y.shape.length === 2) {
                if (axesArray[0] === axesArray[1]) {
                    out = x.mulStrict(y).sum(axesArray[0]);
                }
                else {
                    out = x.transpose([1, 0]).mulStrict(y).sum(axesArray[1]);
                }
            }
            else {
                var adjX = axesArray[0] === x.shape.length - 1 ? null : true;
                var adjY = axesArray[1] === y.shape.length - 1 ? true : null;
                out = x.matMul(y, adjX, adjY);
            }
            if (diff > 0) {
                var idx = void 0;
                if (xNDim > yNDim) {
                    idx = xNDim + yNDim - 3;
                }
                else {
                    idx = xNDim - 1;
                }
                var squeezeAxes = [];
                for (var i = idx; i < idx + diff; ++i) {
                    squeezeAxes.push(i);
                }
                out = out.squeeze(squeezeAxes);
            }
            if (out.shape.length === 1) {
                out = out.expandDims(1);
            }
            return out;
        });
    }
    var Dot = (function (_super) {
        __extends(Dot, _super);
        function Dot(config) {
            var _this = _super.call(this, config) || this;
            _this.axes = config.axes;
            _this.normalize = config.normalize == null ? false : config.normalize;
            _this.supportsMasking = true;
            _this.reshapeRequired = false;
            return _this;
        }
        Dot.prototype.build = function (inputShape) {
            tfc.util.assert(Array.isArray(inputShape) && inputShape.length === 2 &&
                Array.isArray(inputShape[0]) && Array.isArray(inputShape[1]), 'A `Dot` layer should be called on a list of exactly 2 inputs.');
            var shape1 = inputShape[0];
            var shape2 = inputShape[1];
            if (shape1.length > 3 || shape2.length > 3) {
                throw new NotImplementedError('Dot layer does not support tensors of 4D or higher rank yet.');
            }
            var axes = this.interpretAxes(shape1, shape2);
            if (shape1[axes[0]] !== shape2[axes[1]]) {
                throw new ValueError("Dimension incompatibility: " +
                    (shape1[axes[0]] + " !== " + shape2[axes[1]]));
            }
        };
        Dot.prototype.mergeFunction = function (inputs) {
            if (inputs.length !== 2) {
                throw new ValueError('A `Dot` layer must be called on exactly 2 inputs, ' +
                    ("but received " + inputs.length + " input(s)."));
            }
            var x1 = inputs[0];
            var x2 = inputs[1];
            var axes;
            if (!Array.isArray(this.axes)) {
                axes = [
                    interpretAxis(this.axes, x1.shape.length),
                    interpretAxis(this.axes, x2.shape.length)
                ];
            }
            else {
                axes = this.axes.map(function (axis, i) { return interpretAxis(axis, inputs[i].shape.length); });
            }
            if (this.normalize) {
                x1 = l2Normalize(x1, axes[0]);
                x2 = l2Normalize(x2, axes[1]);
            }
            return batchDot(x1, x2, axes);
        };
        Dot.prototype.interpretAxes = function (shape1, shape2) {
            var axes;
            if (!Array.isArray(this.axes)) {
                axes = [
                    interpretAxis(this.axes, shape1.length),
                    interpretAxis(this.axes, shape2.length)
                ];
            }
            else {
                axes = this.axes;
            }
            return axes;
        };
        Dot.prototype.computeOutputShape = function (inputShape) {
            tfc.util.assert(Array.isArray(inputShape) && inputShape.length === 2 &&
                Array.isArray(inputShape[0]) && Array.isArray(inputShape[1]), 'A `Dot` layer should be called on a list of exactly 2 inputs.');
            var shape1 = inputShape[0].slice();
            var shape2 = inputShape[1].slice();
            if (shape1.length > 3 || shape2.length > 3) {
                throw new NotImplementedError('Dot layer does not support tensors of 4D or higher rank yet.');
            }
            var axes = this.interpretAxes(shape1, shape2);
            shape1.splice(axes[0], 1);
            shape2.splice(axes[1], 1);
            shape2.splice(0, 1);
            var outputShape = shape1.concat(shape2);
            if (outputShape.length === 1) {
                outputShape.push(1);
            }
            return outputShape;
        };
        Dot.prototype.computeMask = function (inputs, mask) {
            throw new NotImplementedError('computeMask has not been implemented for Dot yet');
        };
        Dot.prototype.getConfig = function () {
            var config = {
                'axes': this.axes,
                'normalize': this.normalize
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        Dot.className = 'Dot';
        return Dot;
    }(Merge));
    tfc.serialization.registerClass(Dot);

    function batchNormalization(x, mean$$1, variance$$1, beta, gamma, epsilon) {
        if (epsilon === void 0) { epsilon = 1e-3; }
        var out;
        if (x.rank === 2) {
            out = tfc.batchNormalization2d(x, mean$$1, variance$$1, epsilon, gamma, beta);
        }
        else if (x.rank === 3) {
            out = tfc.batchNormalization3d(x, mean$$1, variance$$1, epsilon, gamma, beta);
        }
        else if (x.rank === 4) {
            out = tfc.batchNormalization4d(x, mean$$1, variance$$1, epsilon, gamma, beta);
        }
        else {
            throw new NotImplementedError("batchNormalization is not implemented for array of rank " + x.rank + " " +
                "yet");
        }
        return out;
    }
    function regularNormalizeBatchInTraining(x, gamma, beta, reductionAxes, epsilon) {
        if (epsilon === void 0) { epsilon = 1e-3; }
        return tfc.tidy(function () {
            var meanAndVariance = tfc.moments(x, reductionAxes);
            var mean$$1 = meanAndVariance.mean;
            var variance$$1 = meanAndVariance.variance;
            var normed = batchNormalization(x, mean$$1, variance$$1, beta, gamma, epsilon);
            return [normed, mean$$1, variance$$1];
        });
    }
    function broadcastNormalizeBatchInTraining(x, gamma, beta, reductionAxes, epsilon) {
        if (epsilon === void 0) { epsilon = 1e-3; }
        return tfc.tidy(function () {
            var meanAndVariance = tfc.moments(x, reductionAxes);
            var mean$$1 = meanAndVariance.mean;
            var variance$$1 = meanAndVariance.variance;
            var targetShape = [];
            for (var _i = 0, _a = range(0, x.rank); _i < _a.length; _i++) {
                var axis = _a[_i];
                if (reductionAxes.indexOf(axis) !== -1) {
                    targetShape.push(1);
                }
                else {
                    targetShape.push(x.shape[axis]);
                }
            }
            var broadcastMean = mean$$1.reshape(targetShape);
            var broadcastVariance = variance$$1.reshape(targetShape);
            var broadcastGamma = gamma == null ? null : gamma.reshape(targetShape);
            var broadcastBeta = beta == null ? null : beta.reshape(targetShape);
            var normed = batchNormalization(x, broadcastMean, broadcastVariance, broadcastBeta, broadcastGamma, epsilon);
            return [normed, mean$$1, variance$$1];
        });
    }
    function normalizeBatchInTraining(x, gamma, beta, reductionAxes, epsilon) {
        if (epsilon === void 0) { epsilon = 1e-3; }
        if (tfc.util.arraysEqual(reductionAxes.slice().sort(), range(0, x.rank - 1))) {
            return regularNormalizeBatchInTraining(x, gamma, beta, reductionAxes, epsilon);
        }
        else {
            return broadcastNormalizeBatchInTraining(x, gamma, beta, reductionAxes, epsilon);
        }
    }
    var BatchNormalization = (function (_super) {
        __extends(BatchNormalization, _super);
        function BatchNormalization(config) {
            var _this = this;
            if (config == null) {
                config = {};
            }
            _this = _super.call(this, config) || this;
            _this.supportsMasking = true;
            _this.axis = config.axis == null ? -1 : config.axis;
            _this.momentum = config.momentum == null ? 0.99 : config.momentum;
            _this.epsilon = config.epsilon == null ? 1e-3 : config.epsilon;
            _this.center = config.center == null ? true : config.center;
            _this.scale = config.scale == null ? true : config.scale;
            _this.betaInitializer = getInitializer(config.betaInitializer || 'zeros');
            _this.gammaInitializer = getInitializer(config.gammaInitializer || 'ones');
            _this.movingMeanInitializer =
                getInitializer(config.movingMeanInitializer || 'zeros');
            _this.movingVarianceInitializer =
                getInitializer(config.movingVarianceInitializer || 'ones');
            _this.betaConstraint = getConstraint(config.betaConstraint);
            _this.gammaConstraint = getConstraint(config.gammaConstraint);
            _this.betaRegularizer = getRegularizer(config.betaRegularizer);
            _this.gammaRegularizer = getRegularizer(config.gammaRegularizer);
            _this.stepCount = 0;
            return _this;
        }
        BatchNormalization.prototype.build = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            var axis = this.axis >= 0 ? this.axis : (this.axis + inputShape.length);
            var dim = inputShape[axis];
            if (dim == null) {
                throw new ValueError("Axis " + axis + " of input tensor should have a defined dimension but " +
                    "the layer received an input with shape " +
                    (JSON.stringify(inputShape) + "."));
            }
            this.inputSpec =
                [new InputSpec({ ndim: inputShape.length, axes: (_a = {}, _a[axis] = dim, _a) })];
            var shape = [dim];
            if (this.scale) {
                this.gamma = this.addWeight('gamma', shape, null, this.gammaInitializer, this.gammaRegularizer, true, this.gammaConstraint);
            }
            if (this.center) {
                this.beta = this.addWeight('beta', shape, null, this.betaInitializer, this.betaRegularizer, true, this.betaConstraint);
            }
            this.movingMean = this.addWeight('moving_mean', shape, null, this.movingMeanInitializer, null, false);
            this.movingVariance = this.addWeight('moving_variance', shape, null, this.movingVarianceInitializer, null, false);
            this.built = true;
            var _a;
        };
        BatchNormalization.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                var training = kwargs['training'] == null ? false : kwargs['training'];
                var input = getExactlyOneTensor(inputs);
                var inputShape = input.shape;
                var ndim = inputShape.length;
                var reductionAxes = range(0, ndim);
                var axis = _this.axis >= 0 ? _this.axis : (_this.axis + ndim);
                reductionAxes.splice(axis, 1);
                var broadcastShape = pyListRepeat(1, ndim);
                broadcastShape[axis] = inputShape[axis];
                var sortedReductionAxes = reductionAxes.slice();
                sortedReductionAxes.sort();
                var needsBroadcasting = !tfc.util.arraysEqual(sortedReductionAxes, range(0, ndim).slice(0, ndim - 1));
                var normalizeInference = function () {
                    if (needsBroadcasting) {
                        var broadcastMovingMean = _this.movingMean.read().reshape(broadcastShape);
                        var broadcastMovingVariance = _this.movingVariance.read().reshape(broadcastShape);
                        var broadcastBeta = _this.center ? _this.beta.read().reshape(broadcastShape) : null;
                        var broadcastGamma = _this.scale ? _this.gamma.read().reshape(broadcastShape) : null;
                        return batchNormalization(input, broadcastMovingMean, broadcastMovingVariance, broadcastBeta, broadcastGamma, _this.epsilon);
                    }
                    else {
                        return batchNormalization(input, _this.movingMean.read(), _this.movingVariance.read(), _this.beta == null ? null : _this.beta.read(), _this.gamma == null ? null : _this.gamma.read(), _this.epsilon);
                    }
                };
                if (!training) {
                    return normalizeInference();
                }
                var _a = normalizeBatchInTraining(input, _this.gamma.read(), _this.beta.read(), reductionAxes, _this.epsilon), normedTraining = _a[0], mean$$1 = _a[1], variance$$1 = _a[2];
                var sampleSize = arrayProd(reductionAxes.map(function (axis) { return input.shape[axis]; }));
                var varianceDebiased = variance$$1.mul(getScalar(sampleSize / (sampleSize - (1 + _this.epsilon))));
                var updateMovingMeanAndVariance = function () {
                    _this.stepCount++;
                    var newMovingMean = tfc.movingAverage(_this.movingMean.read(), mean$$1, _this.momentum, _this.stepCount);
                    _this.movingMean.write(newMovingMean);
                    var newMovingVariance = tfc.movingAverage(_this.movingVariance.read(), varianceDebiased, _this.momentum, _this.stepCount);
                    _this.movingVariance.write(newMovingVariance);
                };
                updateMovingMeanAndVariance();
                return normedTraining;
            });
        };
        BatchNormalization.prototype.getConfig = function () {
            var config = {
                axis: this.axis,
                momentum: this.momentum,
                epsilon: this.epsilon,
                center: this.center,
                scale: this.scale,
                betaInitializer: serializeInitializer(this.betaInitializer),
                gammaInitializer: serializeInitializer(this.gammaInitializer),
                movingMeanInitializer: serializeInitializer(this.movingMeanInitializer),
                movingVarianceInitializer: serializeInitializer(this.movingVarianceInitializer),
                betaRegularizer: serializeRegularizer(this.betaRegularizer),
                gammaRegularizer: serializeRegularizer(this.gammaRegularizer),
                betaConstraint: serializeConstraint(this.betaConstraint),
                gammaConstraint: serializeConstraint(this.gammaConstraint)
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        BatchNormalization.className = 'BatchNormalization';
        return BatchNormalization;
    }(Layer));
    tfc.serialization.registerClass(BatchNormalization);

    function spatial2dPadding(x, padding, dataFormat) {
        return tfc.tidy(function () {
            if (x.rank !== 4) {
                throw new ValueError("temporalPadding expects input tensor to be 4-D, but received a " +
                    (x.rank + "-D tensor."));
            }
            if (padding == null) {
                padding = [[1, 1], [1, 1]];
            }
            if (padding.length !== 2 || padding[0].length !== 2 ||
                padding[1].length !== 2) {
                throw new ValueError('spatial2dPadding expects `padding` to be an Array of two Arrays, ' +
                    'each of which is an Array of two integers.');
            }
            if (dataFormat == null) {
                dataFormat = imageDataFormat();
            }
            if (dataFormat !== 'channelsLast' && dataFormat !== 'channelsFirst') {
                throw new ValueError("Unknown data format: " + dataFormat + ". " +
                    "Supported data formats are 'channelsLast' and 'channelsFirst.");
            }
            var pattern;
            if (dataFormat === 'channelsFirst') {
                pattern = [[0, 0], [0, 0], padding[0], padding[1]];
            }
            else {
                pattern = [[0, 0], padding[0], padding[1], [0, 0]];
            }
            return tfc.pad(x, pattern);
        });
    }
    var ZeroPadding2D = (function (_super) {
        __extends(ZeroPadding2D, _super);
        function ZeroPadding2D(config) {
            var _this = this;
            if (config == null) {
                config = {};
            }
            _this = _super.call(this, config) || this;
            _this.dataFormat =
                config.dataFormat == null ? imageDataFormat() : config.dataFormat;
            if (config.padding == null) {
                _this.padding = [[1, 1], [1, 1]];
            }
            else if (typeof config.padding === 'number') {
                _this.padding =
                    [[config.padding, config.padding], [config.padding, config.padding]];
            }
            else {
                config.padding = config.padding;
                if (config.padding.length !== 2) {
                    throw new ValueError("ZeroPadding2D expects padding to be a length-2 array, but " +
                        ("received a length-" + config.padding.length + " array."));
                }
                var heightPadding = void 0;
                var widthPadding = void 0;
                if (typeof config.padding[0] === 'number') {
                    heightPadding =
                        [config.padding[0], config.padding[0]];
                    widthPadding =
                        [config.padding[1], config.padding[1]];
                }
                else {
                    config.padding = config.padding;
                    if (config.padding[0].length !== 2) {
                        throw new ValueError("ZeroPadding2D expects height padding to be a length-2 array, " +
                            ("but received a length-" + config.padding[0].length + " array."));
                    }
                    heightPadding = config.padding[0];
                    if (config.padding[1].length !== 2) {
                        throw new ValueError("ZeroPadding2D expects width padding to be a length-2 array, " +
                            ("but received a length-" + config.padding[1].length + " array."));
                    }
                    widthPadding = config.padding[1];
                }
                _this.padding = [heightPadding, widthPadding];
            }
            _this.inputSpec = [new InputSpec({ ndim: 4 })];
            return _this;
        }
        ZeroPadding2D.prototype.computeOutputShape = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            var rows;
            var cols;
            if (this.dataFormat === 'channelsFirst') {
                if (inputShape[2] != null && inputShape[2] >= 0) {
                    rows = inputShape[2] + this.padding[0][0] + this.padding[0][1];
                }
                else {
                    rows = null;
                }
                if (inputShape[3] != null && inputShape[3] >= 0) {
                    cols = inputShape[3] + this.padding[1][0] + this.padding[1][1];
                }
                else {
                    cols = null;
                }
                return [inputShape[0], inputShape[1], rows, cols];
            }
            else {
                if (inputShape[1] != null && inputShape[1] >= 0) {
                    rows = inputShape[1] + this.padding[0][0] + this.padding[0][1];
                }
                else {
                    rows = null;
                }
                if (inputShape[2] != null && inputShape[2] >= 0) {
                    cols = inputShape[2] + this.padding[1][0] + this.padding[1][1];
                }
                else {
                    cols = null;
                }
                return [inputShape[0], rows, cols, inputShape[3]];
            }
        };
        ZeroPadding2D.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () { return spatial2dPadding(getExactlyOneTensor(inputs), _this.padding, _this.dataFormat); });
        };
        ZeroPadding2D.prototype.getConfig = function () {
            var config = {
                padding: this.padding,
                dataFormat: this.dataFormat,
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        ZeroPadding2D.className = 'ZeroPadding2D';
        return ZeroPadding2D;
    }(Layer));
    tfc.serialization.registerClass(ZeroPadding2D);

    function pool2d(x, poolSize, strides, padding, dataFormat, poolMode) {
        return tfc.tidy(function () {
            checkDataFormat(dataFormat);
            checkPoolMode(poolMode);
            checkPaddingMode(padding);
            if (strides == null) {
                strides = [1, 1];
            }
            if (padding == null) {
                padding = 'valid';
            }
            if (dataFormat == null) {
                dataFormat = imageDataFormat();
            }
            if (poolMode == null) {
                poolMode = 'max';
            }
            x = preprocessConv2DInput(x, dataFormat);
            var y;
            var paddingString = (padding === 'same') ? 'same' : 'valid';
            if (poolMode === 'max') {
                y = tfc.maxPool(x, poolSize, strides, paddingString);
            }
            else {
                y = tfc.avgPool(x, poolSize, strides, paddingString);
            }
            if (dataFormat === 'channelsFirst') {
                y = tfc.transpose(y, [0, 3, 1, 2]);
            }
            return y;
        });
    }
    var Pooling1D = (function (_super) {
        __extends(Pooling1D, _super);
        function Pooling1D(config) {
            var _this = this;
            if (config.poolSize == null) {
                config.poolSize = 2;
            }
            _this = _super.call(this, config) || this;
            if (typeof config.poolSize === 'number') {
                _this.poolSize = [config.poolSize];
            }
            else if (Array.isArray(config.poolSize) &&
                config.poolSize.length === 1 &&
                typeof config.poolSize[0] === 'number') {
                _this.poolSize = config.poolSize;
            }
            else {
                throw new ValueError("poolSize for 1D convolutional layer must be a number or an " +
                    "Array of a single number, but received " +
                    ("" + JSON.stringify(config.poolSize)));
            }
            if (config.strides == null) {
                _this.strides = _this.poolSize;
            }
            else {
                if (typeof config.strides === 'number') {
                    _this.strides = [config.strides];
                }
                else if (Array.isArray(config.strides) &&
                    config.strides.length === 1 &&
                    typeof config.strides[0] === 'number') {
                    _this.strides = config.strides;
                }
                else {
                    throw new ValueError("strides for 1D convolutional layer must be a number or an " +
                        "Array of a single number, but received " +
                        ("" + JSON.stringify(config.strides)));
                }
            }
            _this.padding = config.padding == null ? 'valid' : config.padding;
            checkPaddingMode(_this.padding);
            _this.inputSpec = [new InputSpec({ ndim: 3 })];
            return _this;
        }
        Pooling1D.prototype.computeOutputShape = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            var length = convOutputLength(inputShape[1], this.poolSize[0], this.padding, this.strides[0]);
            return [inputShape[0], length, inputShape[2]];
        };
        Pooling1D.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                _this.invokeCallHook(inputs, kwargs);
                inputs = expandDims(getExactlyOneTensor(inputs), 2);
                var output = _this.poolingFunction(getExactlyOneTensor(inputs), [_this.poolSize[0], 1], [_this.strides[0], 1], _this.padding, 'channelsLast');
                return tfc.squeeze(output, [2]);
            });
        };
        Pooling1D.prototype.getConfig = function () {
            var config = {
                poolSize: this.poolSize,
                padding: this.padding,
                strides: this.strides,
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        return Pooling1D;
    }(Layer));
    var MaxPooling1D = (function (_super) {
        __extends(MaxPooling1D, _super);
        function MaxPooling1D(config) {
            return _super.call(this, config) || this;
        }
        MaxPooling1D.prototype.poolingFunction = function (inputs, poolSize, strides, padding, dataFormat) {
            checkDataFormat(dataFormat);
            checkPaddingMode(padding);
            return pool2d(inputs, poolSize, strides, padding, dataFormat, 'max');
        };
        MaxPooling1D.className = 'MaxPooling1D';
        return MaxPooling1D;
    }(Pooling1D));
    tfc.serialization.registerClass(MaxPooling1D);
    var AveragePooling1D = (function (_super) {
        __extends(AveragePooling1D, _super);
        function AveragePooling1D(config) {
            return _super.call(this, config) || this;
        }
        AveragePooling1D.prototype.poolingFunction = function (inputs, poolSize, strides, padding, dataFormat) {
            checkDataFormat(dataFormat);
            checkPaddingMode(padding);
            return pool2d(inputs, poolSize, strides, padding, dataFormat, 'avg');
        };
        AveragePooling1D.className = 'AveragePooling1D';
        return AveragePooling1D;
    }(Pooling1D));
    tfc.serialization.registerClass(AveragePooling1D);
    var Pooling2D = (function (_super) {
        __extends(Pooling2D, _super);
        function Pooling2D(config) {
            var _this = this;
            if (config.poolSize == null) {
                config.poolSize = [2, 2];
            }
            _this = _super.call(this, config) || this;
            _this.poolSize = Array.isArray(config.poolSize) ?
                config.poolSize :
                [config.poolSize, config.poolSize];
            if (config.strides == null) {
                _this.strides = _this.poolSize;
            }
            else if (Array.isArray(config.strides)) {
                if (config.strides.length !== 2) {
                    throw new ValueError("If the strides property of a 2D pooling layer is an Array, " +
                        "it is expected to have a length of 2, but received length " +
                        (config.strides.length + "."));
                }
                _this.strides = config.strides;
            }
            else {
                _this.strides = [config.strides, config.strides];
            }
            _this.padding = config.padding == null ? 'valid' : config.padding;
            _this.dataFormat =
                config.dataFormat == null ? 'channelsLast' : config.dataFormat;
            checkDataFormat(_this.dataFormat);
            checkPaddingMode(_this.padding);
            _this.inputSpec = [new InputSpec({ ndim: 4 })];
            return _this;
        }
        Pooling2D.prototype.computeOutputShape = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            var rows = this.dataFormat === 'channelsFirst' ? inputShape[2] : inputShape[1];
            var cols = this.dataFormat === 'channelsFirst' ? inputShape[3] : inputShape[2];
            rows =
                convOutputLength(rows, this.poolSize[0], this.padding, this.strides[0]);
            cols =
                convOutputLength(cols, this.poolSize[1], this.padding, this.strides[1]);
            if (this.dataFormat === 'channelsFirst') {
                return [inputShape[0], inputShape[1], rows, cols];
            }
            else {
                return [inputShape[0], rows, cols, inputShape[3]];
            }
        };
        Pooling2D.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                _this.invokeCallHook(inputs, kwargs);
                return _this.poolingFunction(getExactlyOneTensor(inputs), _this.poolSize, _this.strides, _this.padding, _this.dataFormat);
            });
        };
        Pooling2D.prototype.getConfig = function () {
            var config = {
                poolSize: this.poolSize,
                padding: this.padding,
                strides: this.strides,
                dataFormat: this.dataFormat
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        return Pooling2D;
    }(Layer));
    var MaxPooling2D = (function (_super) {
        __extends(MaxPooling2D, _super);
        function MaxPooling2D(config) {
            return _super.call(this, config) || this;
        }
        MaxPooling2D.prototype.poolingFunction = function (inputs, poolSize, strides, padding, dataFormat) {
            checkDataFormat(dataFormat);
            checkPaddingMode(padding);
            return pool2d(inputs, poolSize, strides, padding, dataFormat, 'max');
        };
        MaxPooling2D.className = 'MaxPooling2D';
        return MaxPooling2D;
    }(Pooling2D));
    tfc.serialization.registerClass(MaxPooling2D);
    var AveragePooling2D = (function (_super) {
        __extends(AveragePooling2D, _super);
        function AveragePooling2D(config) {
            return _super.call(this, config) || this;
        }
        AveragePooling2D.prototype.poolingFunction = function (inputs, poolSize, strides, padding, dataFormat) {
            checkDataFormat(dataFormat);
            checkPaddingMode(padding);
            return pool2d(inputs, poolSize, strides, padding, dataFormat, 'avg');
        };
        AveragePooling2D.className = 'AveragePooling2D';
        return AveragePooling2D;
    }(Pooling2D));
    tfc.serialization.registerClass(AveragePooling2D);
    var GlobalPooling1D = (function (_super) {
        __extends(GlobalPooling1D, _super);
        function GlobalPooling1D(config) {
            var _this = _super.call(this, config) || this;
            _this.inputSpec = [new InputSpec({ ndim: 3 })];
            return _this;
        }
        GlobalPooling1D.prototype.computeOutputShape = function (inputShape) {
            return [inputShape[0], inputShape[2]];
        };
        GlobalPooling1D.prototype.call = function (inputs, kwargs) {
            throw new NotImplementedError();
        };
        return GlobalPooling1D;
    }(Layer));
    var GlobalAveragePooling1D = (function (_super) {
        __extends(GlobalAveragePooling1D, _super);
        function GlobalAveragePooling1D(config) {
            return _super.call(this, config) || this;
        }
        GlobalAveragePooling1D.prototype.call = function (inputs, kwargs) {
            return tfc.tidy(function () {
                var input = getExactlyOneTensor(inputs);
                return tfc.mean(input, 1);
            });
        };
        GlobalAveragePooling1D.className = 'GlobalAveragePooling1D';
        return GlobalAveragePooling1D;
    }(GlobalPooling1D));
    tfc.serialization.registerClass(GlobalAveragePooling1D);
    var GlobalMaxPooling1D = (function (_super) {
        __extends(GlobalMaxPooling1D, _super);
        function GlobalMaxPooling1D(config) {
            return _super.call(this, config) || this;
        }
        GlobalMaxPooling1D.prototype.call = function (inputs, kwargs) {
            return tfc.tidy(function () {
                var input = getExactlyOneTensor(inputs);
                return tfc.max(input, 1);
            });
        };
        GlobalMaxPooling1D.className = 'GlobalMaxPooling1D';
        return GlobalMaxPooling1D;
    }(GlobalPooling1D));
    tfc.serialization.registerClass(GlobalMaxPooling1D);
    var GlobalPooling2D = (function (_super) {
        __extends(GlobalPooling2D, _super);
        function GlobalPooling2D(config) {
            var _this = _super.call(this, config) || this;
            _this.dataFormat =
                config.dataFormat == null ? 'channelsLast' : config.dataFormat;
            checkDataFormat(_this.dataFormat);
            _this.inputSpec = [new InputSpec({ ndim: 4 })];
            return _this;
        }
        GlobalPooling2D.prototype.computeOutputShape = function (inputShape) {
            inputShape = inputShape;
            if (this.dataFormat === 'channelsLast') {
                return [inputShape[0], inputShape[3]];
            }
            else {
                return [inputShape[0], inputShape[1]];
            }
        };
        GlobalPooling2D.prototype.call = function (inputs, kwargs) {
            throw new NotImplementedError();
        };
        GlobalPooling2D.prototype.getConfig = function () {
            var config = { dataFormat: this.dataFormat };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        return GlobalPooling2D;
    }(Layer));
    var GlobalAveragePooling2D = (function (_super) {
        __extends(GlobalAveragePooling2D, _super);
        function GlobalAveragePooling2D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GlobalAveragePooling2D.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                var input = getExactlyOneTensor(inputs);
                if (_this.dataFormat === 'channelsLast') {
                    return tfc.mean(input, [1, 2]);
                }
                else {
                    return tfc.mean(input, [2, 3]);
                }
            });
        };
        GlobalAveragePooling2D.className = 'GlobalAveragePooling2D';
        return GlobalAveragePooling2D;
    }(GlobalPooling2D));
    tfc.serialization.registerClass(GlobalAveragePooling2D);
    var GlobalMaxPooling2D = (function (_super) {
        __extends(GlobalMaxPooling2D, _super);
        function GlobalMaxPooling2D() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GlobalMaxPooling2D.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                var input = getExactlyOneTensor(inputs);
                if (_this.dataFormat === 'channelsLast') {
                    return tfc.max(input, [1, 2]);
                }
                else {
                    return tfc.max(input, [2, 3]);
                }
            });
        };
        GlobalMaxPooling2D.className = 'GlobalMaxPooling2D';
        return GlobalMaxPooling2D;
    }(GlobalPooling2D));
    tfc.serialization.registerClass(GlobalMaxPooling2D);

    function standardizeArgs(inputs, initialState, constants, numConstants) {
        if (Array.isArray(inputs)) {
            if (initialState != null || constants != null) {
                throw new ValueError('When inputs is an array, neither initialState or constants ' +
                    'should be provided');
            }
            if (numConstants != null) {
                constants = inputs.slice(inputs.length - numConstants, inputs.length);
                inputs = inputs.slice(0, inputs.length - numConstants);
            }
            if (inputs.length > 1) {
                initialState = inputs.slice(1, inputs.length);
            }
            inputs = inputs[0];
        }
        function toListOrNull(x) {
            if (x == null || Array.isArray(x)) {
                return x;
            }
            else {
                return [x];
            }
        }
        initialState = toListOrNull(initialState);
        constants = toListOrNull(constants);
        return { inputs: inputs, initialState: initialState, constants: constants };
    }
    function rnn(stepFunction, inputs, initialStates, goBackwards, mask, constants, unroll, needPerStepOutputs) {
        if (goBackwards === void 0) { goBackwards = false; }
        if (unroll === void 0) { unroll = false; }
        if (needPerStepOutputs === void 0) { needPerStepOutputs = false; }
        var ndim = inputs.shape.length;
        if (ndim < 3) {
            throw new ValueError("Input should be at least 3D, but is " + ndim + "D.");
        }
        var axes = [1, 0].concat(range(2, ndim));
        inputs = tfc.transpose(inputs, axes);
        if (mask != null) {
            throw new NotImplementedError('The rnn() function of the deeplearn.js backend does not support ' +
                'masking yet.');
        }
        if (constants != null) {
            throw new NotImplementedError('The rnn() functoin of the deeplearn.js backend does not support ' +
                'constants yet.');
        }
        if (unroll) {
            console.warn('Backend rnn(): the unroll = true option is not applicable to the ' +
                'imperative deeplearn.js backend.');
        }
        if (goBackwards) {
            inputs = tfc.reverse(inputs, 0);
        }
        var outputs;
        var lastOutput;
        var states = initialStates;
        var timeSteps = inputs.shape[0];
        var _loop_1 = function (t) {
            var currentInput = sliceAlongFirstAxis(inputs, t, 1);
            currentInput = currentInput.reshape(currentInput.shape.slice(1));
            var stepOutputs = tfc.tidy(function () { return stepFunction(currentInput, states); });
            lastOutput = stepOutputs[0];
            if (needPerStepOutputs) {
                if (t === 0) {
                    outputs = lastOutput.expandDims(1);
                }
                else {
                    var newOutputs = tfc.concat([outputs, lastOutput.expandDims(1)], 1);
                    outputs.dispose();
                    outputs = newOutputs;
                }
            }
            states = stepOutputs[1];
        };
        for (var t = 0; t < timeSteps; ++t) {
            _loop_1(t);
        }
        return [lastOutput, outputs, states];
    }
    var RNN = (function (_super) {
        __extends(RNN, _super);
        function RNN(config) {
            var _this = _super.call(this, config) || this;
            var cell;
            if (config.cell == null) {
                throw new ValueError('cell property is missing for the constructor of RNN.');
            }
            else if (Array.isArray(config.cell)) {
                cell = new StackedRNNCells({ cells: config.cell });
            }
            else {
                cell = config.cell;
            }
            if (cell.stateSize == null) {
                throw new ValueError('The RNN cell should have an attribute `stateSize` (tuple of ' +
                    'integers, one integer per RNN state).');
            }
            _this.cell = cell;
            _this.returnSequences =
                config.returnSequences == null ? false : config.returnSequences;
            _this.returnState = config.returnState == null ? false : config.returnState;
            _this.goBackwards = config.goBackwards == null ? false : config.goBackwards;
            _this._stateful = config.stateful == null ? false : config.stateful;
            _this.unroll = config.unroll == null ? false : config.unroll;
            _this.supportsMasking = true;
            _this.inputSpec = [new InputSpec({ ndim: 3 })];
            _this.stateSpec = null;
            _this.states = null;
            _this.numConstants = null;
            _this.keptStates = [];
            return _this;
        }
        RNN.prototype.getStates = function () {
            if (this.states == null) {
                var numStates = Array.isArray(this.cell.stateSize) ? this.cell.stateSize.length : 1;
                return range(0, numStates).map(function (x) { return null; });
            }
            else {
                return this.states;
            }
        };
        RNN.prototype.setStates = function (states) {
            this.states = states;
        };
        RNN.prototype.computeOutputShape = function (inputShape) {
            if (isArrayOfShapes(inputShape)) {
                inputShape = inputShape[0];
            }
            inputShape = inputShape;
            var stateSize = this.cell.stateSize;
            if (!Array.isArray(stateSize)) {
                stateSize = [stateSize];
            }
            var outputDim = stateSize[0];
            var outputShape;
            if (this.returnSequences) {
                outputShape = [inputShape[0], inputShape[1], outputDim];
            }
            else {
                outputShape = [inputShape[0], outputDim];
            }
            if (this.returnState) {
                var stateShape = [];
                for (var _i = 0, stateSize_1 = stateSize; _i < stateSize_1.length; _i++) {
                    var dim = stateSize_1[_i];
                    stateShape.push([inputShape[0], dim]);
                }
                return [outputShape].concat(stateShape);
            }
            else {
                return outputShape;
            }
        };
        RNN.prototype.computeMask = function (inputs, mask) {
            throw new NotImplementedError('computeMask has not been implemented for RNN yet');
        };
        RNN.prototype.build = function (inputShape) {
            var constantShape = null;
            if (this.numConstants != null) {
                throw new NotImplementedError('Constants support is not implemented in RNN yet.');
            }
            if (isArrayOfShapes(inputShape)) {
                inputShape = inputShape[0];
            }
            inputShape = inputShape;
            var batchSize = this.stateful ? inputShape[0] : null;
            var inputDim = inputShape[inputShape.length - 1];
            this.inputSpec[0] = new InputSpec({ shape: [batchSize, null, inputDim] });
            var stepInputShape = [inputShape[0]].concat(inputShape.slice(2));
            if (constantShape != null) {
                throw new NotImplementedError('Constants support is not implemented in RNN yet.');
            }
            else {
                this.cell.build(stepInputShape);
            }
            var stateSize;
            if (Array.isArray(this.cell.stateSize)) {
                stateSize = this.cell.stateSize;
            }
            else {
                stateSize = [this.cell.stateSize];
            }
            if (this.stateSpec != null) {
                if (!tfc.util.arraysEqual(this.stateSpec.map(function (spec) { return spec.shape[spec.shape.length - 1]; }), stateSize)) {
                    throw new ValueError("An initialState was passed that is not compatible with " +
                        ("cell.stateSize. Received stateSpec=" + this.stateSpec + "; ") +
                        ("However cell.stateSize is " + this.cell.stateSize));
                }
            }
            else {
                this.stateSpec =
                    stateSize.map(function (dim) { return new InputSpec({ shape: [null, dim] }); });
            }
            if (this.stateful) {
                this.resetStates();
            }
        };
        RNN.prototype.resetStates = function (states, training) {
            var _this = this;
            if (training === void 0) { training = false; }
            tfc.tidy(function () {
                if (!_this.stateful) {
                    throw new AttributeError('Cannot call resetStates() on an RNN Layer that is not stateful.');
                }
                var batchSize = _this.inputSpec[0].shape[0];
                if (batchSize == null) {
                    throw new ValueError('If an RNN is stateful, it needs to know its batch size. Specify ' +
                        'the batch size of your input tensors: \n' +
                        '- If using a Sequential model, specify the batch size by ' +
                        'passing a `batchInputShape` option to your first layer.\n' +
                        '- If using the functional API, specify the batch size by ' +
                        'passing a `batchShape` option to your Input layer.');
                }
                if (_this.states == null) {
                    if (Array.isArray(_this.cell.stateSize)) {
                        _this.states =
                            _this.cell.stateSize.map(function (dim) { return tfc.zeros([batchSize, dim]); });
                    }
                    else {
                        _this.states = [tfc.zeros([batchSize, _this.cell.stateSize])];
                    }
                }
                else if (states == null) {
                    tfc.dispose(_this.states);
                    if (_this.keptStates != null) {
                        tfc.dispose(_this.keptStates);
                        _this.keptStates = [];
                    }
                    if (Array.isArray(_this.cell.stateSize)) {
                        _this.states =
                            _this.cell.stateSize.map(function (dim) { return tfc.zeros([batchSize, dim]); });
                    }
                    else {
                        _this.states[0] = tfc.zeros([batchSize, _this.cell.stateSize]);
                    }
                }
                else {
                    if (!Array.isArray(states)) {
                        states = [states];
                    }
                    if (states.length !== _this.states.length) {
                        throw new ValueError("Layer " + _this.name + " expects " + _this.states.length + " state(s), " +
                            ("but it received " + states.length + " state value(s). Input ") +
                            ("received: " + states));
                    }
                    if (training === true) {
                        _this.keptStates.push(_this.states.slice());
                    }
                    else {
                        tfc.dispose(_this.states);
                    }
                    for (var index = 0; index < _this.states.length; ++index) {
                        var value = states[index];
                        var dim = Array.isArray(_this.cell.stateSize) ?
                            _this.cell.stateSize[index] :
                            _this.cell.stateSize;
                        var expectedShape = [batchSize, dim];
                        if (!tfc.util.arraysEqual(value.shape, expectedShape)) {
                            throw new ValueError("State " + index + " is incompatible with layer " + _this.name + ": " +
                                ("expected shape=" + expectedShape + ", received shape=" + value.shape));
                        }
                        _this.states[index] = value;
                    }
                }
                _this.states.forEach(function (state) { return tfc.keep(state); });
            });
        };
        RNN.prototype.apply = function (inputs, kwargs) {
            var initialState = kwargs == null ? null : kwargs['initialState'];
            var constants = kwargs == null ? null : kwargs['constants'];
            if (kwargs == null) {
                kwargs = {};
            }
            var standardized = standardizeArgs(inputs, initialState, constants, this.numConstants);
            inputs = standardized.inputs;
            initialState = standardized.initialState;
            constants = standardized.constants;
            var additionalInputs = [];
            var additionalSpecs = [];
            if (initialState != null) {
                kwargs['initialState'] = initialState;
                additionalInputs = additionalInputs.concat(initialState);
                this.stateSpec = [];
                for (var _i = 0, initialState_1 = initialState; _i < initialState_1.length; _i++) {
                    var state = initialState_1[_i];
                    this.stateSpec.push(new InputSpec({ shape: state.shape }));
                }
                additionalSpecs = additionalSpecs.concat(this.stateSpec);
            }
            if (constants != null) {
                kwargs['constants'] = constants;
                additionalInputs = additionalInputs.concat(constants);
                this.numConstants = constants.length;
            }
            var isTensor = additionalInputs[0] instanceof SymbolicTensor;
            if (isTensor) {
                var fullInput = [inputs].concat(additionalInputs);
                var fullInputSpec = this.inputSpec.concat(additionalSpecs);
                var originalInputSpec = this.inputSpec;
                this.inputSpec = fullInputSpec;
                var output = _super.prototype.apply.call(this, fullInput, kwargs);
                this.inputSpec = originalInputSpec;
                return output;
            }
            else {
                return _super.prototype.apply.call(this, inputs, kwargs);
            }
        };
        RNN.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                var mask = kwargs == null ? null : kwargs['mask'];
                var training = kwargs == null ? null : kwargs['training'];
                var initialState = kwargs == null ? null : kwargs['initialState'];
                inputs = getExactlyOneTensor(inputs);
                if (initialState == null) {
                    if (_this.stateful) {
                        initialState = _this.states;
                    }
                    else {
                        initialState = _this.getInitialState(inputs);
                    }
                }
                if (mask != null) {
                    throw new NotImplementedError('Masking is not implemented for RNN yet');
                }
                var numStates = Array.isArray(_this.cell.stateSize) ? _this.cell.stateSize.length : 1;
                if (initialState.length !== numStates) {
                    throw new ValueError("RNN Layer has " + numStates + " state(s) but was passed " +
                        (initialState.length + " initial state(s)."));
                }
                if (_this.unroll) {
                    console.warn('Ignoring unroll = true for RNN layer, due to imperative backend.');
                }
                var cellCallKwargs = { training: training };
                var step = function (inputs, states) {
                    var outputs = _this.cell.call([inputs].concat(states), cellCallKwargs);
                    return [outputs[0], outputs.slice(1)];
                };
                var rnnOutputs = rnn(step, inputs, initialState, _this.goBackwards, null, null, _this.unroll, _this.returnSequences);
                var lastOutput = rnnOutputs[0];
                var outputs = rnnOutputs[1];
                var states = rnnOutputs[2];
                if (_this.stateful) {
                    _this.resetStates(states, training);
                }
                var output = _this.returnSequences ? outputs : lastOutput;
                if (_this.returnState) {
                    return [output].concat(states);
                }
                else {
                    return output;
                }
            });
        };
        RNN.prototype.getInitialState = function (inputs) {
            var _this = this;
            return tfc.tidy(function () {
                var initialState = tfc.zeros(inputs.shape);
                initialState = tfc.sum(initialState, [1, 2]);
                initialState = expandDims(initialState);
                if (Array.isArray(_this.cell.stateSize)) {
                    return _this.cell.stateSize.map(function (dim) { return dim > 1 ? tile(initialState, [1, dim]) : initialState; });
                }
                else {
                    return _this.cell.stateSize > 1 ?
                        [tile(initialState, [1, _this.cell.stateSize])] :
                        [initialState];
                }
            });
        };
        Object.defineProperty(RNN.prototype, "trainableWeights", {
            get: function () {
                if (!this.trainable) {
                    return [];
                }
                return this.cell.trainableWeights;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RNN.prototype, "nonTrainableWeights", {
            get: function () {
                if (!this.trainable) {
                    return this.cell.weights;
                }
                return this.cell.nonTrainableWeights;
            },
            enumerable: true,
            configurable: true
        });
        RNN.prototype.getConfig = function () {
            var config = {
                returnSequences: this.returnSequences,
                returnState: this.returnState,
                goBackwards: this.goBackwards,
                stateful: this.stateful,
                unroll: this.unroll,
            };
            if (this.numConstants != null) {
                config.numConstants = this.numConstants;
            }
            var cellConfig = this.cell.getConfig();
            config.cell = {
                className: this.cell.getClassName(),
                config: cellConfig,
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        RNN.className = 'RNN';
        return RNN;
    }(Layer));
    tfc.serialization.registerClass(RNN);
    var RNNCell = (function (_super) {
        __extends(RNNCell, _super);
        function RNNCell() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RNNCell;
    }(Layer));
    var SimpleRNNCell = (function (_super) {
        __extends(SimpleRNNCell, _super);
        function SimpleRNNCell(config) {
            var _this = _super.call(this, config) || this;
            _this.DEFAULT_ACTIVATION = 'tanh';
            _this.DEFAULT_KERNEL_INITIALIZER = 'glorotNormal';
            _this.DEFAULT_RECURRENT_INITIALIZER = 'orthogonal';
            _this.DEFAULT_BIAS_INITIALIZER = 'zeros';
            _this.units = config.units;
            _this.activation = getActivation(config.activation == null ? _this.DEFAULT_ACTIVATION :
                config.activation);
            _this.useBias = config.useBias == null ? true : config.useBias;
            _this.kernelInitializer = getInitializer(config.kernelInitializer || _this.DEFAULT_KERNEL_INITIALIZER);
            _this.recurrentInitializer = getInitializer(config.recurrentInitializer || _this.DEFAULT_RECURRENT_INITIALIZER);
            _this.biasInitializer =
                getInitializer(config.biasInitializer || _this.DEFAULT_BIAS_INITIALIZER);
            _this.kernelRegularizer = getRegularizer(config.kernelRegularizer);
            _this.recurrentRegularizer = getRegularizer(config.recurrentRegularizer);
            _this.biasRegularizer = getRegularizer(config.biasRegularizer);
            _this.kernelConstraint = getConstraint(config.kernelConstraint);
            _this.recurrentConstraint = getConstraint(config.recurrentConstraint);
            _this.biasConstraint = getConstraint(config.biasConstraint);
            _this.dropout = min([1, max([0, config.dropout == null ? 0 : config.dropout])]);
            _this.recurrentDropout = min([
                1,
                max([0, config.recurrentDropout == null ? 0 : config.recurrentDropout])
            ]);
            _this.stateSize = _this.units;
            _this.dropoutMask = null;
            _this.recurrentDropoutMask = null;
            return _this;
        }
        SimpleRNNCell.prototype.build = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            this.kernel = this.addWeight('kernel', [inputShape[inputShape.length - 1], this.units], null, this.kernelInitializer, this.kernelRegularizer, true, this.kernelConstraint);
            this.recurrentKernel = this.addWeight('recurrent_kernel', [this.units, this.units], null, this.recurrentInitializer, this.recurrentRegularizer, true, this.recurrentConstraint);
            if (this.useBias) {
                this.bias = this.addWeight('bias', [this.units], null, this.biasInitializer, this.biasRegularizer, true, this.biasConstraint);
            }
            else {
                this.bias = null;
            }
            this.built = true;
        };
        SimpleRNNCell.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                inputs = inputs;
                if (inputs.length !== 2) {
                    throw new ValueError("SimpleRNNCell expects 2 input Tensors, got " + inputs.length + ".");
                }
                var prevOutput = inputs[1];
                inputs = inputs[0];
                var training = kwargs['training'] == null ? false : kwargs['training'];
                if (0 < _this.dropout && _this.dropout < 1 && _this.dropoutMask == null) {
                    _this.dropoutMask = generateDropoutMask(function () { return tfc.onesLike(inputs); }, _this.dropout, training);
                }
                if (0 < _this.recurrentDropout && _this.recurrentDropout < 1 &&
                    _this.recurrentDropoutMask == null) {
                    _this.recurrentDropoutMask =
                        generateDropoutMask(function () { return tfc.onesLike(prevOutput); }, _this.recurrentDropout, training);
                }
                var h;
                var dpMask = _this.dropoutMask;
                var recDpMask = _this.recurrentDropoutMask;
                if (dpMask != null) {
                    h = dot(tfc.mul(inputs, dpMask), _this.kernel.read());
                }
                else {
                    h = dot(inputs, _this.kernel.read());
                }
                if (_this.bias != null) {
                    h = biasAdd(h, _this.bias.read());
                }
                if (recDpMask != null) {
                    prevOutput = tfc.mul(prevOutput, recDpMask);
                }
                var output = tfc.add(h, dot(prevOutput, _this.recurrentKernel.read()));
                if (_this.activation != null) {
                    output = _this.activation.apply(output);
                }
                return [output, output];
            });
        };
        SimpleRNNCell.prototype.getConfig = function () {
            var config = {
                units: this.units,
                activation: serializeActivation(this.activation),
                useBias: this.useBias,
                kernelInitializer: serializeInitializer(this.kernelInitializer),
                recurrentInitializer: serializeInitializer(this.recurrentInitializer),
                biasInitializer: serializeInitializer(this.biasInitializer),
                kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
                recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer),
                biasRegularizer: serializeRegularizer(this.biasRegularizer),
                activityRegularizer: serializeRegularizer(this.activityRegularizer),
                kernelConstraint: serializeConstraint(this.kernelConstraint),
                recurrentConstraint: serializeConstraint(this.recurrentConstraint),
                biasConstraint: serializeConstraint(this.biasConstraint),
                dropout: this.dropout,
                recurrentDropout: this.recurrentDropout,
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        SimpleRNNCell.className = 'SimpleRNNCell';
        return SimpleRNNCell;
    }(RNNCell));
    tfc.serialization.registerClass(SimpleRNNCell);
    var SimpleRNN = (function (_super) {
        __extends(SimpleRNN, _super);
        function SimpleRNN(config) {
            var _this = this;
            config.cell = new SimpleRNNCell(config);
            _this = _super.call(this, config) || this;
            return _this;
        }
        SimpleRNN.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                if (_this.cell.dropoutMask != null) {
                    tfc.dispose(_this.cell.dropoutMask);
                    _this.cell.dropoutMask = null;
                }
                if (_this.cell.recurrentDropoutMask != null) {
                    tfc.dispose(_this.cell.recurrentDropoutMask);
                    _this.cell.recurrentDropoutMask = null;
                }
                var mask = kwargs == null ? null : kwargs['mask'];
                var training = kwargs == null ? null : kwargs['training'];
                var initialState = kwargs == null ? null : kwargs['initialState'];
                return _super.prototype.call.call(_this, inputs, { mask: mask, training: training, initialState: initialState });
            });
        };
        Object.defineProperty(SimpleRNN.prototype, "units", {
            get: function () {
                return this.cell.units;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SimpleRNN.prototype, "activation", {
            get: function () {
                return this.cell.activation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SimpleRNN.prototype, "useBias", {
            get: function () {
                return this.cell.useBias;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SimpleRNN.prototype, "kernelInitializer", {
            get: function () {
                return this.cell.kernelInitializer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SimpleRNN.prototype, "recurrentInitializer", {
            get: function () {
                return this.cell.recurrentInitializer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SimpleRNN.prototype, "biasInitializer", {
            get: function () {
                return this.cell.biasInitializer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SimpleRNN.prototype, "kernelRegularizer", {
            get: function () {
                return this.cell.kernelRegularizer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SimpleRNN.prototype, "recurrentRegularizer", {
            get: function () {
                return this.cell.recurrentRegularizer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SimpleRNN.prototype, "biasRegularizer", {
            get: function () {
                return this.cell.biasRegularizer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SimpleRNN.prototype, "kernelConstraint", {
            get: function () {
                return this.cell.kernelConstraint;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SimpleRNN.prototype, "recurrentConstraint", {
            get: function () {
                return this.cell.recurrentConstraint;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SimpleRNN.prototype, "biasConstraint", {
            get: function () {
                return this.cell.biasConstraint;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SimpleRNN.prototype, "dropout", {
            get: function () {
                return this.cell.dropout;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SimpleRNN.prototype, "recurrentDropout", {
            get: function () {
                return this.cell.recurrentDropout;
            },
            enumerable: true,
            configurable: true
        });
        SimpleRNN.prototype.getConfig = function () {
            var config = {
                units: this.units,
                activation: serializeActivation(this.activation),
                useBias: this.useBias,
                kernelInitializer: serializeInitializer(this.kernelInitializer),
                recurrentInitializer: serializeInitializer(this.recurrentInitializer),
                biasInitializer: serializeInitializer(this.biasInitializer),
                kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
                recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer),
                biasRegularizer: serializeRegularizer(this.biasRegularizer),
                activityRegularizer: serializeRegularizer(this.activityRegularizer),
                kernelConstraint: serializeConstraint(this.kernelConstraint),
                recurrentConstraint: serializeConstraint(this.recurrentConstraint),
                biasConstraint: serializeConstraint(this.biasConstraint),
                dropout: this.dropout,
                recurrentDropout: this.recurrentDropout,
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            delete baseConfig['cell'];
            Object.assign(config, baseConfig);
            return config;
        };
        SimpleRNN.className = 'SimpleRNN';
        return SimpleRNN;
    }(RNN));
    tfc.serialization.registerClass(SimpleRNN);
    var GRUCell = (function (_super) {
        __extends(GRUCell, _super);
        function GRUCell(config) {
            var _this = _super.call(this, config) || this;
            _this.DEFAULT_ACTIVATION = 'tanh';
            _this.DEFAULT_RECURRENT_ACTIVATION = 'hardSigmoid';
            _this.DEFAULT_KERNEL_INITIALIZER = 'glorotNormal';
            _this.DEFAULT_RECURRENT_INITIALIZER = 'orthogonal';
            _this.DEFAULT_BIAS_INITIALIZER = 'zeros';
            _this.units = config.units;
            _this.activation = getActivation(config.activation === undefined ? _this.DEFAULT_ACTIVATION :
                config.activation);
            _this.recurrentActivation = getActivation(config.recurrentActivation === undefined ?
                _this.DEFAULT_RECURRENT_ACTIVATION :
                config.recurrentActivation);
            _this.useBias = config.useBias == null ? true : config.useBias;
            _this.kernelInitializer = getInitializer(config.kernelInitializer || _this.DEFAULT_KERNEL_INITIALIZER);
            _this.recurrentInitializer = getInitializer(config.recurrentInitializer || _this.DEFAULT_RECURRENT_INITIALIZER);
            _this.biasInitializer =
                getInitializer(config.biasInitializer || _this.DEFAULT_BIAS_INITIALIZER);
            _this.kernelRegularizer = getRegularizer(config.kernelRegularizer);
            _this.recurrentRegularizer = getRegularizer(config.recurrentRegularizer);
            _this.biasRegularizer = getRegularizer(config.biasRegularizer);
            _this.kernelConstraint = getConstraint(config.kernelConstraint);
            _this.recurrentConstraint = getConstraint(config.recurrentConstraint);
            _this.biasConstraint = getConstraint(config.biasConstraint);
            _this.dropout = min([1, max([0, config.dropout == null ? 0 : config.dropout])]);
            _this.recurrentDropout = min([
                1,
                max([0, config.recurrentDropout == null ? 0 : config.recurrentDropout])
            ]);
            _this.implementation = config.implementation;
            _this.stateSize = _this.units;
            _this.dropoutMask = null;
            _this.recurrentDropoutMask = null;
            return _this;
        }
        GRUCell.prototype.build = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            var inputDim = inputShape[inputShape.length - 1];
            this.kernel = this.addWeight('kernel', [inputDim, this.units * 3], null, this.kernelInitializer, this.kernelRegularizer, true, this.kernelConstraint);
            this.recurrentKernel = this.addWeight('recurrent_kernel', [this.units, this.units * 3], null, this.recurrentInitializer, this.recurrentRegularizer, true, this.recurrentConstraint);
            if (this.useBias) {
                this.bias = this.addWeight('bias', [this.units * 3], null, this.biasInitializer, this.biasRegularizer, true, this.biasConstraint);
            }
            else {
                this.bias = null;
            }
            this.built = true;
        };
        GRUCell.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                inputs = inputs;
                if (inputs.length !== 2) {
                    throw new ValueError("GRUCell expects 2 input Tensors (inputs, h, c), got " +
                        (inputs.length + "."));
                }
                var training = kwargs['training'] == null ? false : kwargs['training'];
                var hTMinus1 = inputs[1];
                inputs = inputs[0];
                if (0 < _this.dropout && _this.dropout < 1 && _this.dropoutMask == null) {
                    _this.dropoutMask = generateDropoutMask(function () { return tfc.onesLike(inputs); }, _this.dropout, training, 3);
                }
                if (0 < _this.recurrentDropout && _this.recurrentDropout < 1 &&
                    _this.recurrentDropoutMask == null) {
                    _this.recurrentDropoutMask =
                        generateDropoutMask(function () { return tfc.onesLike(hTMinus1); }, _this.recurrentDropout, training, 3);
                }
                var dpMask = _this.dropoutMask;
                var recDpMask = _this.recurrentDropoutMask;
                var z;
                var r;
                var hh;
                if (0 < _this.dropout && _this.dropout < 1) {
                    inputs = tfc.mul(inputs, dpMask[0]);
                }
                var matrixX = dot(inputs, _this.kernel.read());
                if (_this.useBias) {
                    matrixX = biasAdd(matrixX, _this.bias.read());
                }
                if (0 < _this.recurrentDropout && _this.recurrentDropout < 1) {
                    hTMinus1 = tfc.mul(hTMinus1, recDpMask[0]);
                }
                var recurrentKernelValue = _this.recurrentKernel.read();
                var _a = tfc.split(recurrentKernelValue, [2 * _this.units, _this.units], recurrentKernelValue.rank - 1), rk1 = _a[0], rk2 = _a[1];
                var matrixInner = dot(hTMinus1, rk1);
                var _b = tfc.split(matrixX, 3, matrixX.rank - 1), xZ = _b[0], xR = _b[1], xH = _b[2];
                var _c = tfc.split(matrixInner, 2, matrixInner.rank - 1), recurrentZ = _c[0], recurrentR = _c[1];
                z = _this.recurrentActivation.apply(tfc.add(xZ, recurrentZ));
                r = _this.recurrentActivation.apply(tfc.add(xR, recurrentR));
                var recurrentH = dot(tfc.mul(r, hTMinus1), rk2);
                hh = _this.activation.apply(tfc.add(xH, recurrentH));
                var h = tfc.add(tfc.mul(z, hTMinus1), tfc.mul(tfc.add(getScalar(1), tfc.neg(z)), hh));
                return [h, h];
            });
        };
        GRUCell.prototype.getConfig = function () {
            var config = {
                units: this.units,
                activation: serializeActivation(this.activation),
                recurrentActivation: serializeActivation(this.recurrentActivation),
                useBias: this.useBias,
                kernelInitializer: serializeInitializer(this.kernelInitializer),
                recurrentInitializer: serializeInitializer(this.recurrentInitializer),
                biasInitializer: serializeInitializer(this.biasInitializer),
                kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
                recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer),
                biasRegularizer: serializeRegularizer(this.biasRegularizer),
                activityRegularizer: serializeRegularizer(this.activityRegularizer),
                kernelConstraint: serializeConstraint(this.kernelConstraint),
                recurrentConstraint: serializeConstraint(this.recurrentConstraint),
                biasConstraint: serializeConstraint(this.biasConstraint),
                dropout: this.dropout,
                recurrentDropout: this.recurrentDropout,
                implementation: this.implementation,
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        GRUCell.className = 'GRUCell';
        return GRUCell;
    }(RNNCell));
    tfc.serialization.registerClass(GRUCell);
    var GRU = (function (_super) {
        __extends(GRU, _super);
        function GRU(config) {
            var _this = this;
            if (config.implementation === 0) {
                console.warn('`implementation=0` has been deprecated, and now defaults to ' +
                    '`implementation=1`. Please update your layer call.');
            }
            config.cell = new GRUCell(config);
            _this = _super.call(this, config) || this;
            return _this;
        }
        GRU.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                if (_this.cell.dropoutMask != null) {
                    tfc.dispose(_this.cell.dropoutMask);
                    _this.cell.dropoutMask = null;
                }
                if (_this.cell.recurrentDropoutMask != null) {
                    tfc.dispose(_this.cell.recurrentDropoutMask);
                    _this.cell.recurrentDropoutMask = null;
                }
                var mask = kwargs == null ? null : kwargs['mask'];
                var training = kwargs == null ? null : kwargs['training'];
                var initialState = kwargs == null ? null : kwargs['initialState'];
                return _super.prototype.call.call(_this, inputs, { mask: mask, training: training, initialState: initialState });
            });
        };
        Object.defineProperty(GRU.prototype, "units", {
            get: function () {
                return this.cell.units;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRU.prototype, "activation", {
            get: function () {
                return this.cell.activation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRU.prototype, "recurrentActivation", {
            get: function () {
                return this.cell.recurrentActivation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRU.prototype, "useBias", {
            get: function () {
                return this.cell.useBias;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRU.prototype, "kernelInitializer", {
            get: function () {
                return this.cell.kernelInitializer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRU.prototype, "recurrentInitializer", {
            get: function () {
                return this.cell.recurrentInitializer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRU.prototype, "biasInitializer", {
            get: function () {
                return this.cell.biasInitializer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRU.prototype, "kernelRegularizer", {
            get: function () {
                return this.cell.kernelRegularizer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRU.prototype, "recurrentRegularizer", {
            get: function () {
                return this.cell.recurrentRegularizer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRU.prototype, "biasRegularizer", {
            get: function () {
                return this.cell.biasRegularizer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRU.prototype, "kernelConstraint", {
            get: function () {
                return this.cell.kernelConstraint;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRU.prototype, "recurrentConstraint", {
            get: function () {
                return this.cell.recurrentConstraint;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRU.prototype, "biasConstraint", {
            get: function () {
                return this.cell.biasConstraint;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRU.prototype, "dropout", {
            get: function () {
                return this.cell.dropout;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRU.prototype, "recurrentDropout", {
            get: function () {
                return this.cell.recurrentDropout;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GRU.prototype, "implementation", {
            get: function () {
                return this.cell.implementation;
            },
            enumerable: true,
            configurable: true
        });
        GRU.prototype.getConfig = function () {
            var config = {
                units: this.units,
                activation: serializeActivation(this.activation),
                recurrentActivation: serializeActivation(this.recurrentActivation),
                useBias: this.useBias,
                kernelInitializer: serializeInitializer(this.kernelInitializer),
                recurrentInitializer: serializeInitializer(this.recurrentInitializer),
                biasInitializer: serializeInitializer(this.biasInitializer),
                kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
                recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer),
                biasRegularizer: serializeRegularizer(this.biasRegularizer),
                activityRegularizer: serializeRegularizer(this.activityRegularizer),
                kernelConstraint: serializeConstraint(this.kernelConstraint),
                recurrentConstraint: serializeConstraint(this.recurrentConstraint),
                biasConstraint: serializeConstraint(this.biasConstraint),
                dropout: this.dropout,
                recurrentDropout: this.recurrentDropout,
                implementation: this.implementation,
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            delete baseConfig['cell'];
            Object.assign(config, baseConfig);
            return config;
        };
        GRU.fromConfig = function (cls, config) {
            if (config['implmentation'] === 0) {
                config['implementation'] = 1;
            }
            return new cls(config);
        };
        GRU.className = 'GRU';
        return GRU;
    }(RNN));
    tfc.serialization.registerClass(GRU);
    var LSTMCell = (function (_super) {
        __extends(LSTMCell, _super);
        function LSTMCell(config) {
            var _this = _super.call(this, config) || this;
            _this.DEFAULT_ACTIVATION = 'tanh';
            _this.DEFAULT_RECURRENT_ACTIVATION = 'hardSigmoid';
            _this.DEFAULT_KERNEL_INITIALIZER = 'glorotNormal';
            _this.DEFAULT_RECURRENT_INITIALIZER = 'orthogonal';
            _this.DEFAULT_BIAS_INITIALIZER = 'zeros';
            _this.units = config.units;
            _this.activation = getActivation(config.activation === undefined ? _this.DEFAULT_ACTIVATION :
                config.activation);
            _this.recurrentActivation = getActivation(config.recurrentActivation === undefined ?
                _this.DEFAULT_RECURRENT_ACTIVATION :
                config.recurrentActivation);
            _this.useBias = config.useBias == null ? true : config.useBias;
            _this.kernelInitializer = getInitializer(config.kernelInitializer || _this.DEFAULT_KERNEL_INITIALIZER);
            _this.recurrentInitializer = getInitializer(config.recurrentInitializer || _this.DEFAULT_RECURRENT_INITIALIZER);
            _this.biasInitializer =
                getInitializer(config.biasInitializer || _this.DEFAULT_BIAS_INITIALIZER);
            _this.unitForgetBias = config.unitForgetBias;
            _this.kernelRegularizer = getRegularizer(config.kernelRegularizer);
            _this.recurrentRegularizer = getRegularizer(config.recurrentRegularizer);
            _this.biasRegularizer = getRegularizer(config.biasRegularizer);
            _this.kernelConstraint = getConstraint(config.kernelConstraint);
            _this.recurrentConstraint = getConstraint(config.recurrentConstraint);
            _this.biasConstraint = getConstraint(config.biasConstraint);
            _this.dropout = min([1, max([0, config.dropout == null ? 0 : config.dropout])]);
            _this.recurrentDropout = min([
                1,
                max([0, config.recurrentDropout == null ? 0 : config.recurrentDropout])
            ]);
            _this.implementation = config.implementation;
            _this.stateSize = [_this.units, _this.units];
            _this.dropoutMask = null;
            _this.recurrentDropoutMask = null;
            return _this;
        }
        LSTMCell.prototype.build = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            var inputDim = inputShape[inputShape.length - 1];
            this.kernel = this.addWeight('kernel', [inputDim, this.units * 4], null, this.kernelInitializer, this.kernelRegularizer, true, this.kernelConstraint);
            this.recurrentKernel = this.addWeight('recurrent_kernel', [this.units, this.units * 4], null, this.recurrentInitializer, this.recurrentRegularizer, true, this.recurrentConstraint);
            var biasInitializer;
            if (this.useBias) {
                if (this.unitForgetBias) {
                    var capturedBiasInit_1 = this.biasInitializer;
                    var capturedUnits_1 = this.units;
                    biasInitializer = new (_a = (function (_super) {
                            __extends(CustomInit, _super);
                            function CustomInit() {
                                return _super !== null && _super.apply(this, arguments) || this;
                            }
                            CustomInit.prototype.apply = function (shape, dtype) {
                                var bI = capturedBiasInit_1.apply([capturedUnits_1]);
                                var bF = (new Ones()).apply([capturedUnits_1]);
                                var bCAndH = capturedBiasInit_1.apply([capturedUnits_1 * 2]);
                                return concatAlongFirstAxis(concatAlongFirstAxis(bI, bF), bCAndH);
                            };
                            return CustomInit;
                        }(Initializer)),
                        _a.className = 'CustomInit',
                        _a)();
                }
                else {
                    biasInitializer = this.biasInitializer;
                }
                this.bias = this.addWeight('bias', [this.units * 4], null, biasInitializer, this.biasRegularizer, true, this.biasConstraint);
            }
            else {
                this.bias = null;
            }
            this.built = true;
            var _a;
        };
        LSTMCell.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                var training = kwargs['training'] == null ? false : kwargs['training'];
                inputs = inputs;
                if (inputs.length !== 3) {
                    throw new ValueError("LSTMCell expects 3 input Tensors (inputs, h, c), got " +
                        (inputs.length + "."));
                }
                var hTMinus1 = inputs[1];
                var cTMinus1 = inputs[2];
                inputs = inputs[0];
                if (0 < _this.dropout && _this.dropout < 1 && _this.dropoutMask == null) {
                    _this.dropoutMask = generateDropoutMask(function () { return tfc.onesLike(inputs); }, _this.dropout, training, 4);
                }
                if (0 < _this.recurrentDropout && _this.recurrentDropout < 1 &&
                    _this.recurrentDropoutMask == null) {
                    _this.recurrentDropoutMask =
                        generateDropoutMask(function () { return tfc.onesLike(hTMinus1); }, _this.recurrentDropout, training, 4);
                }
                var dpMask = _this.dropoutMask;
                var recDpMask = _this.recurrentDropoutMask;
                var i;
                var f;
                var c;
                var o;
                if (0 < _this.dropout && _this.dropout < 1) {
                    inputs = tfc.mul(inputs, dpMask[0]);
                }
                var z = dot(inputs, _this.kernel.read());
                if (0 < _this.recurrentDropout && _this.recurrentDropout < 1) {
                    hTMinus1 = tfc.mul(hTMinus1, recDpMask[0]);
                }
                z = tfc.add(z, dot(hTMinus1, _this.recurrentKernel.read()));
                if (_this.useBias) {
                    z = biasAdd(z, _this.bias.read());
                }
                var _a = tfc.split(z, 4, z.rank - 1), z0 = _a[0], z1 = _a[1], z2 = _a[2], z3 = _a[3];
                i = _this.recurrentActivation.apply(z0);
                f = _this.recurrentActivation.apply(z1);
                c = tfc.add(tfc.mul(f, cTMinus1), tfc.mul(i, _this.activation.apply(z2)));
                o = _this.recurrentActivation.apply(z3);
                var h = tfc.mul(o, _this.activation.apply(c));
                return [h, h, c];
            });
        };
        LSTMCell.prototype.getConfig = function () {
            var config = {
                units: this.units,
                activation: serializeActivation(this.activation),
                recurrentActivation: serializeActivation(this.recurrentActivation),
                useBias: this.useBias,
                kernelInitializer: serializeInitializer(this.kernelInitializer),
                recurrentInitializer: serializeInitializer(this.recurrentInitializer),
                biasInitializer: serializeInitializer(this.biasInitializer),
                unitForgetBias: this.unitForgetBias,
                kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
                recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer),
                biasRegularizer: serializeRegularizer(this.biasRegularizer),
                activityRegularizer: serializeRegularizer(this.activityRegularizer),
                kernelConstraint: serializeConstraint(this.kernelConstraint),
                recurrentConstraint: serializeConstraint(this.recurrentConstraint),
                biasConstraint: serializeConstraint(this.biasConstraint),
                dropout: this.dropout,
                recurrentDropout: this.recurrentDropout,
                implementation: this.implementation,
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        LSTMCell.className = 'LSTMCell';
        return LSTMCell;
    }(RNNCell));
    tfc.serialization.registerClass(LSTMCell);
    var LSTM = (function (_super) {
        __extends(LSTM, _super);
        function LSTM(config) {
            var _this = this;
            if (config.implementation === 0) {
                console.warn('`implementation=0` has been deprecated, and now defaults to ' +
                    '`implementation=1`. Please update your layer call.');
            }
            config.cell = new LSTMCell(config);
            _this = _super.call(this, config) || this;
            return _this;
        }
        LSTM.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                if (_this.cell.dropoutMask != null) {
                    tfc.dispose(_this.cell.dropoutMask);
                    _this.cell.dropoutMask = null;
                }
                if (_this.cell.recurrentDropoutMask != null) {
                    tfc.dispose(_this.cell.recurrentDropoutMask);
                    _this.cell.recurrentDropoutMask = null;
                }
                var mask = kwargs == null ? null : kwargs['mask'];
                var training = kwargs == null ? null : kwargs['training'];
                var initialState = kwargs == null ? null : kwargs['initialState'];
                return _super.prototype.call.call(_this, inputs, { mask: mask, training: training, initialState: initialState });
            });
        };
        Object.defineProperty(LSTM.prototype, "units", {
            get: function () {
                return this.cell.units;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "activation", {
            get: function () {
                return this.cell.activation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "recurrentActivation", {
            get: function () {
                return this.cell.recurrentActivation;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "useBias", {
            get: function () {
                return this.cell.useBias;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "kernelInitializer", {
            get: function () {
                return this.cell.kernelInitializer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "recurrentInitializer", {
            get: function () {
                return this.cell.recurrentInitializer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "biasInitializer", {
            get: function () {
                return this.cell.biasInitializer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "unitForgetBias", {
            get: function () {
                return this.cell.unitForgetBias;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "kernelRegularizer", {
            get: function () {
                return this.cell.kernelRegularizer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "recurrentRegularizer", {
            get: function () {
                return this.cell.recurrentRegularizer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "biasRegularizer", {
            get: function () {
                return this.cell.biasRegularizer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "kernelConstraint", {
            get: function () {
                return this.cell.kernelConstraint;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "recurrentConstraint", {
            get: function () {
                return this.cell.recurrentConstraint;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "biasConstraint", {
            get: function () {
                return this.cell.biasConstraint;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "dropout", {
            get: function () {
                return this.cell.dropout;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "recurrentDropout", {
            get: function () {
                return this.cell.recurrentDropout;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LSTM.prototype, "implementation", {
            get: function () {
                return this.cell.implementation;
            },
            enumerable: true,
            configurable: true
        });
        LSTM.prototype.getConfig = function () {
            var config = {
                units: this.units,
                activation: serializeActivation(this.activation),
                recurrentActivation: serializeActivation(this.recurrentActivation),
                useBias: this.useBias,
                kernelInitializer: serializeInitializer(this.kernelInitializer),
                recurrentInitializer: serializeInitializer(this.recurrentInitializer),
                biasInitializer: serializeInitializer(this.biasInitializer),
                unitForgetBias: this.unitForgetBias,
                kernelRegularizer: serializeRegularizer(this.kernelRegularizer),
                recurrentRegularizer: serializeRegularizer(this.recurrentRegularizer),
                biasRegularizer: serializeRegularizer(this.biasRegularizer),
                activityRegularizer: serializeRegularizer(this.activityRegularizer),
                kernelConstraint: serializeConstraint(this.kernelConstraint),
                recurrentConstraint: serializeConstraint(this.recurrentConstraint),
                biasConstraint: serializeConstraint(this.biasConstraint),
                dropout: this.dropout,
                recurrentDropout: this.recurrentDropout,
                implementation: this.implementation,
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            delete baseConfig['cell'];
            Object.assign(config, baseConfig);
            return config;
        };
        LSTM.fromConfig = function (cls, config) {
            if (config['implmentation'] === 0) {
                config['implementation'] = 1;
            }
            return new cls(config);
        };
        LSTM.className = 'LSTM';
        return LSTM;
    }(RNN));
    tfc.serialization.registerClass(LSTM);
    var StackedRNNCells = (function (_super) {
        __extends(StackedRNNCells, _super);
        function StackedRNNCells(config) {
            var _this = _super.call(this, config) || this;
            _this.cells = config.cells;
            return _this;
        }
        Object.defineProperty(StackedRNNCells.prototype, "stateSize", {
            get: function () {
                var stateSize = [];
                for (var _i = 0, _a = this.cells.slice().reverse(); _i < _a.length; _i++) {
                    var cell = _a[_i];
                    if (Array.isArray(cell.stateSize)) {
                        stateSize.push.apply(stateSize, cell.stateSize);
                    }
                    else {
                        stateSize.push(cell.stateSize);
                    }
                }
                return stateSize;
            },
            enumerable: true,
            configurable: true
        });
        StackedRNNCells.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                inputs = inputs;
                var states = inputs.slice(1);
                var nestedStates = [];
                for (var _i = 0, _a = _this.cells.slice().reverse(); _i < _a.length; _i++) {
                    var cell = _a[_i];
                    if (Array.isArray(cell.stateSize)) {
                        nestedStates.push(states.splice(0, cell.stateSize.length));
                    }
                    else {
                        nestedStates.push(states.splice(0, 1));
                    }
                }
                nestedStates.reverse();
                var newNestedStates = [];
                var callInputs;
                for (var i = 0; i < _this.cells.length; ++i) {
                    var cell = _this.cells[i];
                    states = nestedStates[i];
                    if (i === 0) {
                        callInputs = [inputs[0]].concat(states);
                    }
                    else {
                        callInputs = [callInputs[0]].concat(states);
                    }
                    callInputs = cell.call(callInputs, kwargs);
                    newNestedStates.push(callInputs.slice(1));
                }
                states = [];
                for (var _b = 0, _c = newNestedStates.slice().reverse(); _b < _c.length; _b++) {
                    var cellStates = _c[_b];
                    states.push.apply(states, cellStates);
                }
                return [callInputs[0]].concat(states);
            });
        };
        StackedRNNCells.prototype.build = function (inputShape) {
            if (isArrayOfShapes(inputShape)) {
                inputShape = inputShape[0];
            }
            inputShape = inputShape;
            var outputDim;
            for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
                var cell = _a[_i];
                cell.build(inputShape);
                if (Array.isArray(cell.stateSize)) {
                    outputDim = cell.stateSize[0];
                }
                else {
                    outputDim = cell.stateSize;
                }
                inputShape = [inputShape[0], outputDim];
            }
            this.built = true;
        };
        StackedRNNCells.prototype.getConfig = function () {
            var cellConfigs = [];
            for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
                var cell = _a[_i];
                cellConfigs.push({
                    'className': this.getClassName(),
                    'config': cell.getConfig(),
                });
            }
            var config = { 'cells': cellConfigs };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        StackedRNNCells.fromConfig = function (cls, config, customObjects) {
            if (customObjects === void 0) { customObjects = {}; }
            var cells = [];
            for (var _i = 0, _a = config['cells']; _i < _a.length; _i++) {
                var cellConfig = _a[_i];
                cells.push(deserialize(cellConfig, customObjects));
            }
            return new cls({ cells: cells });
        };
        Object.defineProperty(StackedRNNCells.prototype, "trainableWeights", {
            get: function () {
                if (!this.trainable) {
                    return [];
                }
                var weights = [];
                for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
                    var cell = _a[_i];
                    weights.push.apply(weights, cell.trainableWeights);
                }
                return weights;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StackedRNNCells.prototype, "nonTrainableWeights", {
            get: function () {
                var weights = [];
                for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
                    var cell = _a[_i];
                    weights.push.apply(weights, cell.nonTrainableWeights);
                }
                if (!this.trainable) {
                    var trainableWeights = [];
                    for (var _b = 0, _c = this.cells; _b < _c.length; _b++) {
                        var cell = _c[_b];
                        trainableWeights.push.apply(trainableWeights, cell.trainableWeights);
                    }
                    return trainableWeights.concat(weights);
                }
                return weights;
            },
            enumerable: true,
            configurable: true
        });
        StackedRNNCells.prototype.getWeights = function () {
            var weights = [];
            for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
                var cell = _a[_i];
                weights.push.apply(weights, cell.weights);
            }
            return batchGetValue(weights);
        };
        StackedRNNCells.prototype.setWeights = function (weights) {
            var tuples = [];
            for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
                var cell = _a[_i];
                var numParams = cell.weights.length;
                var inputWeights = weights.splice(numParams);
                for (var i = 0; i < cell.weights.length; ++i) {
                    tuples.push([cell.weights[i], inputWeights[i]]);
                }
            }
            batchSetValue(tuples);
        };
        StackedRNNCells.className = 'StackedRNNCells';
        return StackedRNNCells;
    }(RNNCell));
    tfc.serialization.registerClass(StackedRNNCells);
    function generateDropoutMask(ones, rate, training, count) {
        if (training === void 0) { training = null; }
        if (count === void 0) { count = 1; }
        function droppedInputs() {
            return dropout(ones(), getScalar(rate));
        }
        if (count > 1) {
            var mask = [];
            for (var i = 0; i < count; i++) {
                mask.push(inTrainPhase(droppedInputs, ones, training));
            }
            mask.forEach(function (m) { return tfc.keep(m); });
            return mask;
        }
        else {
            return tfc.keep(inTrainPhase(droppedInputs, ones, training));
        }
    }

    var Wrapper = (function (_super) {
        __extends(Wrapper, _super);
        function Wrapper(config) {
            var _this = _super.call(this, config) || this;
            _this.layer = config.layer;
            return _this;
        }
        Wrapper.prototype.build = function (inputShape) {
            this.built = true;
        };
        Object.defineProperty(Wrapper.prototype, "trainable", {
            get: function () {
                if (this.layer != null) {
                    return this.layer.trainable;
                }
                else {
                    return false;
                }
            },
            set: function (value) {
                if (this.layer != null) {
                    this.layer.trainable = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Wrapper.prototype, "trainableWeights", {
            get: function () {
                return this.layer.trainableWeights;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Wrapper.prototype, "nonTrainableWeights", {
            get: function () {
                return this.layer.nonTrainableWeights;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Wrapper.prototype, "updates", {
            get: function () {
                return this.layer._updates;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Wrapper.prototype, "losses", {
            get: function () {
                return this.layer.losses;
            },
            enumerable: true,
            configurable: true
        });
        Wrapper.prototype.getWeights = function () {
            return this.layer.getWeights();
        };
        Wrapper.prototype.setWeights = function (weights) {
            this.layer.setWeights(weights);
        };
        Wrapper.prototype.getConfig = function () {
            var config = {
                'layer': {
                    'className': this.layer.getClassName(),
                    'config': this.layer.getConfig(),
                }
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        Wrapper.fromConfig = function (cls, config, customObjects) {
            if (customObjects === void 0) { customObjects = {}; }
            var layerConfig = config['layer'];
            var layer = deserialize(layerConfig, customObjects);
            delete config['layer'];
            var newConfig = { layer: layer };
            Object.assign(newConfig, config);
            return new cls(newConfig);
        };
        return Wrapper;
    }(Layer));
    var TimeDistributed = (function (_super) {
        __extends(TimeDistributed, _super);
        function TimeDistributed(config) {
            var _this = _super.call(this, config) || this;
            _this.supportsMasking = true;
            return _this;
        }
        TimeDistributed.prototype.build = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            if (inputShape.length < 3) {
                throw new ValueError("TimeDistributed layer expects an input shape >= 3D, but received " +
                    ("input shape " + JSON.stringify(inputShape)));
            }
            this.inputSpec = [{ shape: inputShape }];
            var childInputShape = [inputShape[0]].concat(inputShape.slice(2));
            if (!this.layer.built) {
                this.layer.build(childInputShape);
                this.layer.built = true;
            }
            _super.prototype.build.call(this, inputShape);
        };
        TimeDistributed.prototype.computeOutputShape = function (inputShape) {
            inputShape = getExactlyOneShape(inputShape);
            var childInputShape = [inputShape[0]].concat(inputShape.slice(2));
            var childOutputShape = this.layer.computeOutputShape(childInputShape);
            var timesteps = inputShape[1];
            return [childOutputShape[0], timesteps].concat(childOutputShape.slice(1));
        };
        TimeDistributed.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                inputs = getExactlyOneTensor(inputs);
                var step = function (inputs, states) {
                    var output = getExactlyOneTensor(_this.layer.call(inputs, kwargs));
                    return [output, []];
                };
                var rnnOutputs = rnn(step, inputs, [], false, null, null, false, true);
                var y = rnnOutputs[1];
                return y;
            });
        };
        TimeDistributed.className = 'TimeDistributed';
        return TimeDistributed;
    }(Wrapper));
    tfc.serialization.registerClass(TimeDistributed);
    var VALID_BIDIRECTIONAL_MERGE_MODES = ['sum', 'mul', 'concat', 'ave'];
    function checkBidirectionalMergeMode(value) {
        checkStringTypeUnionValue(VALID_BIDIRECTIONAL_MERGE_MODES, 'BidirectionalMergeMode', value);
    }
    var Bidirectional = (function (_super) {
        __extends(Bidirectional, _super);
        function Bidirectional(config) {
            var _this = _super.call(this, config) || this;
            var layerConfig = config.layer.getConfig();
            _this.forwardLayer =
                deserialize({ className: config.layer.getClassName(), config: layerConfig });
            layerConfig['goBackwards'] =
                layerConfig['goBackwards'] === true ? false : true;
            _this.backwardLayer =
                deserialize({ className: config.layer.getClassName(), config: layerConfig });
            _this.forwardLayer.name = 'forward_' + _this.forwardLayer.name;
            _this.backwardLayer.name = 'backward_' + _this.backwardLayer.name;
            checkBidirectionalMergeMode(config.mergeMode);
            _this.mergeMode = config.mergeMode;
            if (config.weights) {
                throw new NotImplementedError('weights support is not implemented for Bidirectional layer yet.');
            }
            _this._stateful = config.layer.stateful;
            _this.returnSequences = config.layer.returnSequences;
            _this.returnState = config.layer.returnState;
            _this.supportsMasking = true;
            _this._trainable = true;
            _this.inputSpec = config.layer.inputSpec;
            _this.numConstants = null;
            return _this;
        }
        Object.defineProperty(Bidirectional.prototype, "trainable", {
            get: function () {
                return this._trainable;
            },
            set: function (value) {
                this._trainable = value;
                if (this.forwardLayer != null) {
                    this.forwardLayer.trainable = value;
                }
                if (this.backwardLayer != null) {
                    this.backwardLayer.trainable = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Bidirectional.prototype.getWeights = function () {
            return this.forwardLayer.getWeights().concat(this.backwardLayer.getWeights());
        };
        Bidirectional.prototype.setWeights = function (weights) {
            var numWeights = weights.length;
            var numeightsOver2 = Math.floor(numWeights / 2);
            this.forwardLayer.setWeights(weights.slice(0, numeightsOver2));
            this.backwardLayer.setWeights(weights.slice(numeightsOver2));
        };
        Bidirectional.prototype.computeOutputShape = function (inputShape) {
            var layerShapes = this.forwardLayer.computeOutputShape(inputShape);
            if (!(Array.isArray(layerShapes) && Array.isArray(layerShapes[0]))) {
                layerShapes = [layerShapes];
            }
            layerShapes = layerShapes;
            var outputShape;
            var outputShapes;
            var stateShape;
            if (this.returnState) {
                stateShape = layerShapes.slice(1);
                outputShape = layerShapes[0];
            }
            else {
                outputShape = layerShapes[0];
            }
            outputShape = outputShape;
            if (this.mergeMode === 'concat') {
                outputShape[outputShape.length - 1] *= 2;
                outputShapes = [outputShape];
            }
            else if (this.mergeMode == null) {
                outputShapes = [outputShape, outputShape.slice()];
            }
            else {
                outputShapes = [outputShape];
            }
            if (this.returnState) {
                if (this.mergeMode == null) {
                    return outputShapes.concat(stateShape).concat(stateShape.slice());
                }
                return [outputShape].concat(stateShape).concat(stateShape.slice());
            }
            return singletonOrArray(outputShapes);
        };
        Bidirectional.prototype.apply = function (inputs, kwargs) {
            var initialState = kwargs == null ? null : kwargs['initialState'];
            var constants = kwargs == null ? null : kwargs['constants'];
            if (kwargs == null) {
                kwargs = {};
            }
            var standardized = standardizeArgs(inputs, initialState, constants, this.numConstants);
            inputs = standardized.inputs;
            initialState = standardized.initialState;
            constants = standardized.constants;
            if (Array.isArray(inputs)) {
                initialState = inputs.slice(1);
                inputs = inputs[0];
            }
            if ((initialState == null || initialState.length === 0) &&
                constants == null) {
                return _super.prototype.apply.call(this, inputs, kwargs);
            }
            var additionalInputs = [];
            var additionalSpecs = [];
            if (initialState != null) {
                var numStates = initialState.length;
                if (numStates % 2 > 0) {
                    throw new ValueError('When passing `initialState` to a Bidrectional RNN, ' +
                        'the state should be an Array containing the states of ' +
                        'the underlying RNNs.');
                }
                kwargs['initialState'] = initialState;
                additionalInputs.push.apply(additionalInputs, initialState);
                var stateSpecs = initialState
                    .map(function (state) { return new InputSpec({ shape: state.shape }); });
                this.forwardLayer.stateSpec = stateSpecs.slice(0, numStates / 2);
                this.backwardLayer.stateSpec = stateSpecs.slice(numStates / 2);
                additionalSpecs.push.apply(additionalSpecs, stateSpecs);
            }
            if (constants != null) {
                throw new NotImplementedError('Support for constants in Bidirectional layers is not ' +
                    'implemented yet.');
            }
            var isSymbolicTensor = additionalInputs[0] instanceof SymbolicTensor;
            for (var _i = 0, additionalInputs_1 = additionalInputs; _i < additionalInputs_1.length; _i++) {
                var tensor = additionalInputs_1[_i];
                if (tensor instanceof SymbolicTensor !== isSymbolicTensor) {
                    throw new ValueError('The initial state of a Bidirectional layer cannot be ' +
                        'specified as a mix of symbolic and non-symbolic tensors');
                }
            }
            if (isSymbolicTensor) {
                var fullInput = [inputs].concat(additionalInputs);
                var fullInputSpec = this.inputSpec.concat(additionalSpecs);
                var originalInputSpec = this.inputSpec;
                this.inputSpec = fullInputSpec;
                var output = _super.prototype.apply.call(this, fullInput, kwargs);
                this.inputSpec = originalInputSpec;
                return output;
            }
            else {
                return _super.prototype.apply.call(this, inputs, kwargs);
            }
        };
        Bidirectional.prototype.call = function (inputs, kwargs) {
            var _this = this;
            return tfc.tidy(function () {
                if (kwargs['mask'] != null) {
                    throw new NotImplementedError('The support for masking is not implemented for ' +
                        'Bidirectional layers yet.');
                }
                var initialState = kwargs['initialState'];
                var y;
                var yRev;
                if (initialState == null) {
                    y = _this.forwardLayer.call(inputs, kwargs);
                    yRev = _this.backwardLayer.call(inputs, kwargs);
                }
                else {
                    var forwardState = initialState.slice(0, initialState.length / 2);
                    var backwardState = initialState.slice(initialState.length / 2);
                    y = _this.forwardLayer.call(inputs, Object.assign(kwargs, { initialState: forwardState }));
                    yRev = _this.backwardLayer.call(inputs, Object.assign(kwargs, { initialState: backwardState }));
                }
                var states;
                if (_this.returnState) {
                    if (Array.isArray(y)) {
                        states = y.slice(1).concat(yRev.slice(1));
                    }
                    y = y[0];
                    yRev = yRev[0];
                }
                if (_this.returnSequences) {
                    yRev = tfc.reverse(yRev, 1);
                }
                var output;
                if (_this.mergeMode === 'concat') {
                    output = concatenate([y, yRev]);
                }
                else if (_this.mergeMode === 'sum') {
                    output = tfc.add(y, yRev);
                }
                else if (_this.mergeMode === 'ave') {
                    output = tfc.mul(getScalar(0.5), tfc.add(y, yRev));
                }
                else if (_this.mergeMode === 'mul') {
                    output = tfc.mul(y, yRev);
                }
                else if (_this.mergeMode == null) {
                    output = [y, yRev];
                }
                if (_this.returnState) {
                    if (_this.mergeMode == null) {
                        return output.concat(states);
                    }
                    return [output].concat(states);
                }
                return output;
            });
        };
        Bidirectional.prototype.resetStates = function (states) {
            this.forwardLayer.resetStates();
            this.backwardLayer.resetStates();
        };
        Bidirectional.prototype.build = function (inputShape) {
            var _this = this;
            nameScope(this.forwardLayer.name, function () {
                _this.forwardLayer.build(inputShape);
            });
            nameScope(this.backwardLayer.name, function () {
                _this.backwardLayer.build(inputShape);
            });
            this.built = true;
        };
        Object.defineProperty(Bidirectional.prototype, "trainableWeights", {
            get: function () {
                return this.forwardLayer.trainableWeights.concat(this.backwardLayer.trainableWeights);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bidirectional.prototype, "nonTrainableWeights", {
            get: function () {
                return this.forwardLayer.nonTrainableWeights.concat(this.backwardLayer.nonTrainableWeights);
            },
            enumerable: true,
            configurable: true
        });
        Bidirectional.prototype.getConfig = function () {
            var config = {
                'mergeMode': this.mergeMode,
            };
            var baseConfig = _super.prototype.getConfig.call(this);
            Object.assign(config, baseConfig);
            return config;
        };
        Bidirectional.fromConfig = function (cls, config) {
            var rnnLayer = deserialize(config['layer']);
            delete config['layer'];
            if (config['numConstants'] != null) {
                throw new NotImplementedError("Deserialization of a Bidirectional layer with numConstants " +
                    "present is not supported yet.");
            }
            var newConfig = config;
            newConfig['layer'] = rnnLayer;
            return new cls(newConfig);
        };
        Bidirectional.className = 'Bidirectional';
        return Bidirectional;
    }(Wrapper));
    tfc.serialization.registerClass(Bidirectional);

    function inputLayer(config) {
        return new InputLayer(config);
    }
    function elu$1(config) {
        return new ELU(config);
    }
    function reLU(config) {
        return new ReLU(config);
    }
    function leakyReLU(config) {
        return new LeakyReLU(config);
    }
    function softmax(config) {
        return new Softmax$1(config);
    }
    function thresholdedReLU(config) {
        return new ThresholdedReLU(config);
    }
    function conv1d$1(config) {
        return new Conv1D(config);
    }
    function conv2d$1(config) {
        return new Conv2D(config);
    }
    function conv2dTranspose(config) {
        return new Conv2DTranspose(config);
    }
    function separableConv2d(config) {
        return new SeparableConv2D(config);
    }
    function cropping2D(config) {
        return new Cropping2D(config);
    }
    function upSampling2d(config) {
        return new UpSampling2D(config);
    }
    function depthwiseConv2d$1(config) {
        return new DepthwiseConv2D(config);
    }
    function activation(config) {
        return new Activation$1(config);
    }
    function dense(config) {
        return new Dense(config);
    }
    function dropout$1(config) {
        return new Dropout(config);
    }
    function flatten$1(config) {
        return new Flatten(config);
    }
    function repeatVector(config) {
        return new RepeatVector(config);
    }
    function reshape(config) {
        return new Reshape(config);
    }
    function permute(config) {
        return new Permute(config);
    }
    function embedding(config) {
        return new Embedding(config);
    }
    function add$1(config) {
        return new Add(config);
    }
    function average$1(config) {
        return new Average(config);
    }
    function concatenate$2(config) {
        return new Concatenate(config);
    }
    function maximum$1(config) {
        return new Maximum(config);
    }
    function minimum$1(config) {
        return new Minimum(config);
    }
    function multiply$1(config) {
        return new Multiply(config);
    }
    function dot$1(config) {
        return new Dot(config);
    }
    function batchNormalization$1(config) {
        return new BatchNormalization(config);
    }
    function zeroPadding2d(config) {
        return new ZeroPadding2D(config);
    }
    function averagePooling1d(config) {
        return new AveragePooling1D(config);
    }
    function avgPool1d(config) {
        return averagePooling1d(config);
    }
    function avgPooling1d(config) {
        return averagePooling1d(config);
    }
    function averagePooling2d(config) {
        return new AveragePooling2D(config);
    }
    function avgPool2d(config) {
        return averagePooling2d(config);
    }
    function avgPooling2d(config) {
        return averagePooling2d(config);
    }
    function globalAveragePooling1d(config) {
        return new GlobalAveragePooling1D(config);
    }
    function globalAveragePooling2d(config) {
        return new GlobalAveragePooling2D(config);
    }
    function globalMaxPooling1d(config) {
        return new GlobalMaxPooling1D(config);
    }
    function globalMaxPooling2d(config) {
        return new GlobalMaxPooling2D(config);
    }
    function maxPooling1d(config) {
        return new MaxPooling1D(config);
    }
    function maxPooling2d(config) {
        return new MaxPooling2D(config);
    }
    function gru(config) {
        return new GRU(config);
    }
    function gruCell(config) {
        return new GRUCell(config);
    }
    function lstm(config) {
        return new LSTM(config);
    }
    function lstmCell(config) {
        return new LSTMCell(config);
    }
    function simpleRNN(config) {
        return new SimpleRNN(config);
    }
    function simpleRNNCell(config) {
        return new SimpleRNNCell(config);
    }
    function rnn$1(config) {
        return new RNN(config);
    }
    function stackedRNNCells(config) {
        return new StackedRNNCells(config);
    }
    function bidirectional(config) {
        return new Bidirectional(config);
    }
    function timeDistributed(config) {
        return new TimeDistributed(config);
    }
    var globalMaxPool1d = globalMaxPooling1d;
    var globalMaxPool2d = globalMaxPooling2d;
    var maxPool1d = maxPooling1d;
    var maxPool2d = maxPooling2d;

    var exports_layers = /*#__PURE__*/Object.freeze({
        inputLayer: inputLayer,
        elu: elu$1,
        reLU: reLU,
        leakyReLU: leakyReLU,
        softmax: softmax,
        thresholdedReLU: thresholdedReLU,
        conv1d: conv1d$1,
        conv2d: conv2d$1,
        conv2dTranspose: conv2dTranspose,
        separableConv2d: separableConv2d,
        cropping2D: cropping2D,
        upSampling2d: upSampling2d,
        depthwiseConv2d: depthwiseConv2d$1,
        activation: activation,
        dense: dense,
        dropout: dropout$1,
        flatten: flatten$1,
        repeatVector: repeatVector,
        reshape: reshape,
        permute: permute,
        embedding: embedding,
        add: add$1,
        average: average$1,
        concatenate: concatenate$2,
        maximum: maximum$1,
        minimum: minimum$1,
        multiply: multiply$1,
        dot: dot$1,
        batchNormalization: batchNormalization$1,
        zeroPadding2d: zeroPadding2d,
        averagePooling1d: averagePooling1d,
        avgPool1d: avgPool1d,
        avgPooling1d: avgPooling1d,
        averagePooling2d: averagePooling2d,
        avgPool2d: avgPool2d,
        avgPooling2d: avgPooling2d,
        globalAveragePooling1d: globalAveragePooling1d,
        globalAveragePooling2d: globalAveragePooling2d,
        globalMaxPooling1d: globalMaxPooling1d,
        globalMaxPooling2d: globalMaxPooling2d,
        maxPooling1d: maxPooling1d,
        maxPooling2d: maxPooling2d,
        gru: gru,
        gruCell: gruCell,
        lstm: lstm,
        lstmCell: lstmCell,
        simpleRNN: simpleRNN,
        simpleRNNCell: simpleRNNCell,
        rnn: rnn$1,
        stackedRNNCells: stackedRNNCells,
        bidirectional: bidirectional,
        timeDistributed: timeDistributed,
        globalMaxPool1d: globalMaxPool1d,
        globalMaxPool2d: globalMaxPool2d,
        maxPool1d: maxPool1d,
        maxPool2d: maxPool2d,
        Layer: Layer,
        RNN: RNN,
        RNNCell: RNNCell,
        input: input
    });



    var exports_models = /*#__PURE__*/Object.freeze({
        modelFromJSON: modelFromJSON
    });

    function binaryAccuracy$1(yTrue, yPred) {
        return binaryAccuracy(yTrue, yPred);
    }
    function binaryCrossentropy$2(yTrue, yPred) {
        return binaryCrossentropy$1(yTrue, yPred);
    }
    function categoricalAccuracy$1(yTrue, yPred) {
        return categoricalAccuracy(yTrue, yPred);
    }
    function categoricalCrossentropy$2(yTrue, yPred) {
        return categoricalCrossentropy$1(yTrue, yPred);
    }
    function precision$1(yTrue, yPred) {
        return precision(yTrue, yPred);
    }
    function recall$1(yTrue, yPred) {
        return recall(yTrue, yPred);
    }
    function cosineProximity$1(yTrue, yPred) {
        return cosineProximity(yTrue, yPred);
    }
    function meanAbsoluteError$1(yTrue, yPred) {
        return meanAbsoluteError(yTrue, yPred);
    }
    function meanAbsolutePercentageError$1(yTrue, yPred) {
        return meanAbsolutePercentageError(yTrue, yPred);
    }
    function MAPE$2(yTrue, yPred) {
        return meanAbsolutePercentageError(yTrue, yPred);
    }
    function mape$2(yTrue, yPred) {
        return meanAbsolutePercentageError(yTrue, yPred);
    }
    function meanSquaredError$1(yTrue, yPred) {
        return meanSquaredError(yTrue, yPred);
    }
    function MSE$2(yTrue, yPred) {
        return meanSquaredError(yTrue, yPred);
    }
    function mse$2(yTrue, yPred) {
        return meanSquaredError(yTrue, yPred);
    }

    var exports_metrics = /*#__PURE__*/Object.freeze({
        binaryAccuracy: binaryAccuracy$1,
        binaryCrossentropy: binaryCrossentropy$2,
        categoricalAccuracy: categoricalAccuracy$1,
        categoricalCrossentropy: categoricalCrossentropy$2,
        precision: precision$1,
        recall: recall$1,
        cosineProximity: cosineProximity$1,
        meanAbsoluteError: meanAbsoluteError$1,
        meanAbsolutePercentageError: meanAbsolutePercentageError$1,
        MAPE: MAPE$2,
        mape: mape$2,
        meanSquaredError: meanSquaredError$1,
        MSE: MSE$2,
        mse: mse$2
    });

    function l1l2(config) {
        return new L1L2(config);
    }
    function l1$1(config) {
        return l1(config);
    }
    function l2$1(config) {
        return l2(config);
    }

    var exports_regularizers = /*#__PURE__*/Object.freeze({
        l1l2: l1l2,
        l1: l1$1,
        l2: l2$1
    });

    var Callback = (function (_super) {
        __extends(Callback, _super);
        function Callback() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.model = null;
            return _this;
        }
        Callback.prototype.setModel = function (model) {
            if (!(model instanceof Model)) {
                throw new Error('model must be a Model, not some other Container');
            }
            this.model = model;
        };
        return Callback;
    }(BaseCallback));

    exports.constraints = exports_constraints;
    exports.initializers = exports_initializers;
    exports.layers = exports_layers;
    exports.models = exports_models;
    exports.metrics = exports_metrics;
    exports.regularizers = exports_regularizers;
    exports.CallbackList = CallbackList;
    exports.CustomCallback = CustomCallback;
    exports.History = History;
    exports.Callback = Callback;
    exports.InputSpec = InputSpec;
    exports.SymbolicTensor = SymbolicTensor;
    exports.Model = Model;
    exports.input = input;
    exports.loadModel = loadModel;
    exports.model = model;
    exports.registerCallbackConstructor = registerCallbackConstructor;
    exports.sequential = sequential;
    exports.RNN = RNN;
    exports.Sequential = Sequential;
    exports.LayerVariable = LayerVariable;
    exports.version_layers = version;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tf-layers.js.map
