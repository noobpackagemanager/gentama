"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
var profiler_1 = require("./profiler");
var tape_1 = require("./tape");
var tensor_1 = require("./tensor");
var tensor_util_1 = require("./tensor_util");
var util = require("./util");
var util_1 = require("./util");
var Engine = (function () {
    function Engine(backend, safeMode, debugMode) {
        this.backend = backend;
        this.safeMode = safeMode;
        this.debugMode = debugMode;
        this.registeredVariables = {};
        this.nextTapeNodeId = 0;
        this.numBytes = 0;
        this.numTensors = 0;
        this.numDataBuffers = 0;
        this.profiling = false;
        this.gradientScopeCount = 0;
        this.customGradientDepth = 0;
        this.keepTensors = new Set();
        this.tensorInfo = new WeakMap();
        this.activeScope = { track: [], name: 'default scope' };
        this.scopeStack = [this.activeScope];
        this.profiler = new profiler_1.Profiler(backend);
        this.activeProfile =
            { newBytes: 0, newTensors: 0, peakBytes: 0, kernels: [], result: null };
    }
    Engine.prototype.moveData = function (dataId) {
        this.write(dataId, this.readSync(dataId));
    };
    Engine.prototype.tidy = function (nameOrFn, fn, gradMode) {
        var _this = this;
        if (gradMode === void 0) { gradMode = false; }
        var name = null;
        if (fn == null) {
            if (typeof nameOrFn !== 'function') {
                throw new Error('Please provide a function to tidy()');
            }
            fn = nameOrFn;
        }
        else {
            if (typeof nameOrFn !== 'string' && !(nameOrFn instanceof String)) {
                throw new Error('When calling with two arguments, the first argument ' +
                    'to tidy() must be a string');
            }
            if (typeof fn !== 'function') {
                throw new Error('When calling with two arguments, the 2nd argument ' +
                    'to tidy() must be a function');
            }
            name = nameOrFn;
        }
        var result;
        return this.scopedRun(function () { return _this.startScope(name, gradMode); }, function () { return _this.endScope(result, gradMode); }, function () {
            result = fn();
            if (result instanceof Promise) {
                console.error('Cannot return a Promise inside of tidy.');
            }
            return result;
        });
    };
    Engine.prototype.scopedRun = function (start, end, f) {
        start();
        try {
            var res = f();
            end();
            return res;
        }
        catch (ex) {
            end();
            throw ex;
        }
    };
    Engine.prototype.nextTensorId = function () {
        return Engine.nextTensorId++;
    };
    Engine.prototype.nextVariableId = function () {
        return Engine.nextVariableId++;
    };
    Engine.prototype.runKernel = function (forwardFunc, inputs, backwardsFunc) {
        var _this = this;
        var result;
        var saved = [];
        var saveFunc = function (x) {
            saved.push(x);
            return x;
        };
        var scopeName = this.activeScope.name;
        var startingBytecount = this.numBytes;
        var startingNumTensors = this.numTensors;
        this.scopedRun(function () { return _this.customGradientDepth++; }, function () { return _this.customGradientDepth--; }, function () {
            if (!_this.debugMode()) {
                result = forwardFunc(_this.backend, saveFunc);
            }
            else {
                result = _this.profiler.profileKernel(scopeName, function () { return forwardFunc(_this.backend, saveFunc); });
            }
        });
        if (this.shouldRecord()) {
            var tapeNode = {
                id: this.nextTapeNodeId++,
                name: scopeName,
                inputs: inputs,
                outputs: Array.isArray(result) ? result : [result]
            };
            if (backwardsFunc != null) {
                tapeNode.gradient =
                    (function (dy) { return backwardsFunc(dy, saved); });
            }
            this.activeTape.push(tapeNode);
        }
        if (this.profiling) {
            this.activeProfile.kernels.push({
                name: scopeName,
                bytesAdded: this.numBytes - startingBytecount,
                totalBytesSnapshot: this.numBytes,
                tensorsAdded: this.numTensors - startingNumTensors,
                totalTensorsSnapshot: this.numTensors,
                inputShapes: Object.keys(inputs).map(function (key) { return inputs[key].shape; }),
                outputShape: Array.isArray(result) ?
                    result.map(function (item) { return item.shape; }) :
                    result.shape
            });
        }
        return result;
    };
    Engine.prototype.registerTensor = function (a) {
        var refCount = this.tensorInfo.has(a.dataId) ?
            this.tensorInfo.get(a.dataId).refCount :
            0;
        this.numTensors++;
        if (refCount === 0) {
            this.numDataBuffers++;
            if (a.dtype !== 'complex64') {
                this.numBytes +=
                    util.sizeFromShape(a.shape) * util.bytesPerElement(a.dtype);
            }
            this.tensorInfo.set(a.dataId, { backend: this.backend, dtype: a.dtype, shape: a.shape, refCount: 0 });
            this.backend.register(a.dataId, a.shape, a.dtype);
        }
        this.tensorInfo.get(a.dataId).refCount++;
        if (!(a instanceof tensor_1.Variable)) {
            this.track(a);
        }
    };
    Engine.prototype.registerVariable = function (v) {
        if (this.registeredVariables[v.name] != null) {
            throw new Error("Variable with name " + v.name + " was already registered");
        }
        this.registeredVariables[v.name] = v;
    };
    Engine.prototype.disposeTensor = function (a) {
        if (!this.tensorInfo.has(a.dataId)) {
            return;
        }
        if (this.keepTensors.has(a.id)) {
            this.keepTensors.delete(a.id);
        }
        this.numTensors--;
        var refCount = this.tensorInfo.get(a.dataId).refCount;
        if (refCount <= 1) {
            var info = this.tensorInfo.get(a.dataId);
            info.backend.disposeData(a.dataId);
            this.numDataBuffers--;
            if (a.dtype !== 'complex64') {
                this.numBytes -=
                    util.sizeFromShape(a.shape) * util.bytesPerElement(a.dtype);
            }
            this.tensorInfo.delete(a.dataId);
        }
        else {
            this.tensorInfo.get(a.dataId).refCount--;
        }
    };
    Engine.prototype.disposeVariables = function () {
        for (var varName in this.registeredVariables) {
            var v = this.registeredVariables[varName];
            this.disposeTensor(v);
            delete this.registeredVariables[varName];
        }
    };
    Engine.prototype.memory = function () {
        var info = this.backend.memory();
        info.numTensors = this.numTensors;
        info.numDataBuffers = this.numDataBuffers;
        info.numBytes = this.numBytes;
        return info;
    };
    Engine.prototype.profile = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var startBytes, startNumTensors;
            return __generator(this, function (_a) {
                this.profiling = true;
                startBytes = this.numBytes;
                startNumTensors = this.numTensors;
                this.activeProfile.kernels = [];
                this.activeProfile.result = query();
                this.profiling = false;
                this.activeProfile.peakBytes = Math.max.apply(Math, this.activeProfile.kernels.map(function (d) { return d.totalBytesSnapshot; }));
                this.activeProfile.newBytes = this.numBytes - startBytes;
                this.activeProfile.newTensors = this.numTensors - startNumTensors;
                return [2, this.activeProfile];
            });
        });
    };
    Engine.prototype.shouldRecord = function () {
        return this.activeTape != null && this.customGradientDepth === 0;
    };
    Engine.prototype.addTapeNode = function (inputs, result, gradientsFunc) {
        var inputsMap = {};
        inputs.forEach(function (input, idx) {
            inputsMap[idx] = input;
        });
        var gradient = function (dy) {
            var res = gradientsFunc(dy);
            var resMap = {};
            res.forEach(function (r, idx) {
                resMap[idx] = function () { return r; };
            });
            return resMap;
        };
        var tapeNode = {
            id: this.nextTapeNodeId++,
            name: this.activeScope.name,
            inputs: inputsMap,
            outputs: [result],
            gradient: gradient
        };
        this.activeTape.push(tapeNode);
    };
    Engine.prototype.keep = function (result) {
        if (this.scopeStack.length === 1 && this.safeMode) {
            throw new Error('Safe mode is ON. Enclose all tensor operations inside tf.tidy(): ' +
                'tf.tidy(() => {...}) to avoid memory leaks.');
        }
        this.keepTensors.add(result.id);
        return result;
    };
    Engine.prototype.startScope = function (name, gradientsMode) {
        if (gradientsMode === void 0) { gradientsMode = false; }
        if (gradientsMode && this.gradientScopeCount === 0) {
            this.activeTape = [];
        }
        if (gradientsMode) {
            this.gradientScopeCount++;
        }
        var scopeInfo = { track: [], name: 'unnamed scope' };
        if (name) {
            scopeInfo.name = name;
        }
        this.scopeStack.push(scopeInfo);
        this.activeScope = scopeInfo;
    };
    Engine.prototype.endScope = function (result, gradientsMode) {
        var _this = this;
        if (gradientsMode === void 0) { gradientsMode = false; }
        if (gradientsMode) {
            this.gradientScopeCount--;
            if (this.gradientScopeCount === 0) {
                this.activeTape = null;
            }
        }
        var tensorsToKeep = new Set(this.keepTensors);
        var tensorsToTrackInParent = tensor_util_1.getTensorsInContainer(result);
        tensorsToTrackInParent.forEach(function (tensor) { return tensorsToKeep.add(tensor.id); });
        for (var i = 0; i < this.activeScope.track.length; i++) {
            var tensor = this.activeScope.track[i];
            if (tensorsToKeep.has(tensor.id)) {
                continue;
            }
            if (this.activeTape != null) {
                tensorsToTrackInParent.push(tensor);
            }
            else {
                tensor.dispose();
            }
        }
        var oldScope = this.scopeStack.pop();
        this.activeScope = this.scopeStack.length === 0 ?
            { track: [], name: 'default scope' } :
            this.scopeStack[this.scopeStack.length - 1];
        tensorsToTrackInParent.forEach(function (tensor) {
            if (!_this.keepTensors.has(tensor.id) &&
                tensor_util_1.isTensorInList(tensor, oldScope.track)) {
                _this.track(tensor);
            }
        });
    };
    Engine.prototype.gradients = function (f, xs, dy, allowNoGradients) {
        var _this = this;
        if (allowNoGradients === void 0) { allowNoGradients = false; }
        util.assert(xs.length > 0, 'gradients() received an empty list of xs.');
        return this.tidy('gradients', function () {
            var y = f();
            util.assert(y instanceof tensor_1.Tensor, 'The result y returned by f() must be a tensor.');
            var filteredTape = tape_1.getFilteredNodesXToY(_this.activeTape, xs, y);
            if (!allowNoGradients && filteredTape.length === 0 && xs.length > 0) {
                throw new Error('Cannot compute gradient of y=f(x) with respect to x. Make sure ' +
                    'that the f you passed encloses all operations that lead from x ' +
                    'to y.');
            }
            var accumulatedGradientMap = {};
            accumulatedGradientMap[y.id] = (dy == null) ? ones(y.shape) : dy;
            tape_1.backpropagateGradients(accumulatedGradientMap, filteredTape);
            var grads = xs.map(function (x) { return accumulatedGradientMap[x.id]; });
            return { value: y, grads: grads };
        }, true);
    };
    Engine.prototype.customGrad = function (f) {
        var _this = this;
        util.assert(util.isFunction(f), 'The f passed in customGrad(f) must be a function.');
        return function () {
            var inputs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                inputs[_i] = arguments[_i];
            }
            util.assert(inputs.every(function (t) { return t instanceof tensor_1.Tensor; }), 'The args passed in customGrad(f)(x1, x2,...) must all be tensors');
            var gradientsFunc;
            var result;
            _this.scopedRun(function () { return _this.customGradientDepth++; }, function () { return _this.customGradientDepth--; }, function () {
                var gradientsMode = true;
                result = _this.tidy(f.name, function () {
                    var _a = f.apply(void 0, inputs), value = _a.value, gradFunc = _a.gradFunc;
                    util.assert(value instanceof tensor_1.Tensor, 'The function f passed in customGrad(f) must return an ' +
                        'object where `obj.value` is a tensor');
                    util.assert(util.isFunction(gradFunc), 'The function f passed in customGrad(f) must return an ' +
                        'object where `obj.gradFunc` is a function.');
                    gradientsFunc = gradFunc;
                    return value;
                }, gradientsMode);
            });
            if (_this.shouldRecord()) {
                var gradFunc = function (dy) {
                    var res = gradientsFunc(dy);
                    var grads = Array.isArray(res) ? res : [res];
                    util.assert(grads.length === inputs.length, 'The function f passed in customGrad(f) must return an object ' +
                        'where `obj.gradFunc` is a function that returns the same ' +
                        'number of tensors as inputs passed to f(...).');
                    util.assert(grads.every(function (t) { return t instanceof tensor_1.Tensor; }), 'The function f passed in customGrad(f) must return an object ' +
                        'where `obj.gradFunc` is a function that returns a list of ' +
                        'only tensors.');
                    return grads;
                };
                _this.addTapeNode(inputs, result, gradFunc);
            }
            return result;
        };
    };
    Engine.prototype.write = function (dataId, values) {
        var info = this.tensorInfo.get(dataId);
        if (this.backend !== info.backend) {
            info.backend.disposeData(dataId);
            info.backend = this.backend;
            this.backend.register(dataId, info.shape, info.dtype);
        }
        this.backend.write(dataId, values);
    };
    Engine.prototype.readSync = function (dataId) {
        var info = this.tensorInfo.get(dataId);
        return info.backend.readSync(dataId);
    };
    Engine.prototype.read = function (dataId) {
        var info = this.tensorInfo.get(dataId);
        return info.backend.read(dataId);
    };
    Engine.prototype.fromPixels = function (pixels, numChannels) {
        return this.backend.fromPixels(pixels, numChannels);
    };
    Engine.prototype.time = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var start, timingInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = util_1.now();
                        return [4, this.backend.time(query)];
                    case 1:
                        timingInfo = _a.sent();
                        timingInfo.wallMs = util_1.now() - start;
                        return [2, timingInfo];
                }
            });
        });
    };
    Engine.prototype.track = function (result) {
        if (this.scopeStack.length === 1 && this.safeMode) {
            throw new Error('Safe mode is ON. Enclose all tensor operations inside tf.tidy(): ' +
                'tf.tidy(() => {op();...}); to avoid memory leaks.');
        }
        this.activeScope.track.push(result);
        return result;
    };
    Engine.nextTensorId = 0;
    Engine.nextVariableId = 0;
    return Engine;
}());
exports.Engine = Engine;
function ones(shape) {
    var values = util_1.makeOnesTypedArray(util_1.sizeFromShape(shape), 'float32');
    return tensor_1.Tensor.make(shape, { values: values });
}
//# sourceMappingURL=engine.js.map