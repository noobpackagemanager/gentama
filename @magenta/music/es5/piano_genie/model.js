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
var tf = require("@tensorflow/tfjs-core");
var DATA_TIME_QUANTIZE_RATE = 31.25;
var DATA_MAX_DISCRETE_TIMES = 32;
var RNN_NLAYERS = 2;
var RNN_NUNITS = 128;
var NUM_BUTTONS = 8;
var NUM_PIANOKEYS = 88;
function createZeroState() {
    var state = { c: [], h: [] };
    for (var i = 0; i < RNN_NLAYERS; ++i) {
        state.c.push(tf.zeros([1, RNN_NUNITS], 'float32'));
        state.h.push(tf.zeros([1, RNN_NUNITS], 'float32'));
    }
    return state;
}
function disposeState(state) {
    for (var i = 0; i < RNN_NLAYERS; ++i) {
        state.c[i].dispose();
        state.h[i].dispose();
    }
}
function sampleLogits(logits, temperature, seed) {
    temperature = temperature !== undefined ? temperature : 1.;
    if (temperature < 0. || temperature > 1.) {
        throw new Error('Invalid temperature specified');
    }
    var result;
    if (temperature === 0) {
        result = tf.argMax(logits, 0);
    }
    else {
        if (temperature < 1) {
            logits = tf.div(logits, tf.scalar(temperature, 'float32'));
        }
        var scores = tf.reshape(tf.softmax(logits, 0), [1, -1]);
        var sample = tf.multinomial(scores, 1, seed, true);
        result = tf.reshape(sample, []);
    }
    return result;
}
var PianoGenie = (function () {
    function PianoGenie(checkpointURL) {
        this.checkpointURL = checkpointURL;
        this.initialized = false;
    }
    PianoGenie.prototype.isInitialized = function () {
        return this.initialized;
    };
    PianoGenie.prototype.initialize = function (staticVars) {
        return __awaiter(this, void 0, void 0, function () {
            var vars, _loop_1, this_1, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.initialized) {
                            this.dispose();
                        }
                        if (this.checkpointURL === undefined && staticVars === undefined) {
                            throw new Error('Need to specify either URI or static variables');
                        }
                        if (!(staticVars === undefined)) return [3, 2];
                        return [4, fetch(this.checkpointURL + "/weights_manifest.json")
                                .then(function (response) { return response.json(); })
                                .then(function (manifest) {
                                return tf.io.loadWeights(manifest, _this.checkpointURL);
                            })];
                    case 1:
                        vars = _a.sent();
                        this.modelVars = vars;
                        return [3, 3];
                    case 2:
                        this.modelVars = staticVars;
                        _a.label = 3;
                    case 3:
                        this.decLSTMCells = [];
                        this.decForgetBias = tf.scalar(1, 'float32');
                        _loop_1 = function (i) {
                            var cellPrefix = "phero_model/decoder/rnn/rnn/multi_rnn_cell/cell_" + i + "/lstm_cell/";
                            this_1.decLSTMCells.push(function (data, c, h) {
                                return tf.basicLSTMCell(_this.decForgetBias, _this.modelVars[cellPrefix + 'kernel'], _this.modelVars[cellPrefix + 'bias'], data, c, h);
                            });
                        };
                        this_1 = this;
                        for (i = 0; i < RNN_NLAYERS; ++i) {
                            _loop_1(i);
                        }
                        this.resetState();
                        this.initialized = true;
                        this.next(0);
                        this.resetState();
                        return [2];
                }
            });
        });
    };
    PianoGenie.prototype.next = function (button, temperature, seed) {
        var sampleFunc = function (logits) {
            return sampleLogits(logits, temperature, seed);
        };
        return this.nextWithCustomSamplingFunction(button, sampleFunc);
    };
    PianoGenie.prototype.nextFromKeyWhitelist = function (button, keyWhitelist, temperature, seed) {
        var sampleFunc = function (logits) {
            var keySubsetTensor = tf.tensor1d(keyWhitelist, 'int32');
            logits = tf.gather(logits, keySubsetTensor);
            var result = sampleLogits(logits, temperature, seed);
            var result1d = tf.gather(keySubsetTensor, tf.reshape(result, [1]));
            result = tf.reshape(result1d, []);
            return result;
        };
        return this.nextWithCustomSamplingFunction(button, sampleFunc);
    };
    PianoGenie.prototype.nextWithCustomSamplingFunction = function (button, sampleFunc) {
        var lastState = this.lastState;
        var lastOutput = this.lastOutput;
        var lastTime = this.lastTime;
        var time = new Date();
        var deltaTime;
        if (this.deltaTimeOverride === undefined) {
            deltaTime = (time.getTime() - lastTime.getTime()) / 1000;
        }
        else {
            deltaTime = this.deltaTimeOverride;
            this.deltaTimeOverride = undefined;
        }
        var _a = this.evaluateModelAndSample(button, lastState, lastOutput, deltaTime, sampleFunc), state = _a[0], output = _a[1];
        disposeState(this.lastState);
        this.lastState = state;
        this.lastOutput = output;
        this.lastTime = time;
        return output;
    };
    PianoGenie.prototype.resetState = function () {
        if (this.lastState !== undefined) {
            disposeState(this.lastState);
        }
        this.lastState = createZeroState();
        this.lastOutput = -1;
        this.lastTime = new Date();
        this.lastTime.setSeconds(this.lastTime.getSeconds() - 100000);
    };
    PianoGenie.prototype.dispose = function () {
        var _this = this;
        if (!this.initialized) {
            return;
        }
        Object.keys(this.modelVars).forEach(function (name) { return _this.modelVars[name].dispose(); });
        this.decForgetBias.dispose();
        disposeState(this.lastState);
        this.initialized = false;
    };
    PianoGenie.prototype.overrideLastOutput = function (lastOutput) {
        this.lastOutput = lastOutput;
    };
    PianoGenie.prototype.overrideDeltaTime = function (deltaTime) {
        this.deltaTimeOverride = deltaTime;
    };
    PianoGenie.prototype.evaluateModelAndSample = function (button, lastState, lastOutput, deltaTime, sampleFunc) {
        var _this = this;
        if (button < 0 || button >= NUM_BUTTONS) {
            throw new Error('Invalid button specified.');
        }
        if (!this.initialized) {
            throw new Error('Model is not initialized.');
        }
        var _a = tf.tidy(function () {
            var decFeatsArr = [];
            var buttonTensor = tf.tensor2d([button], [1, 1], 'float32');
            var buttonScaled = tf.sub(tf.mul(2., tf.div(buttonTensor, NUM_BUTTONS - 1)), 1);
            decFeatsArr.push(buttonScaled);
            var lastOutputTensor = tf.tensor1d([lastOutput], 'int32');
            var lastOutputInc = tf.add(lastOutputTensor, tf.scalar(1, 'int32'));
            var lastOutputOh = tf.cast(tf.oneHot(lastOutputInc, NUM_PIANOKEYS + 1), 'float32');
            decFeatsArr.push(lastOutputOh);
            var deltaTimeTensor = tf.tensor1d([deltaTime], 'float32');
            var deltaTimeBin = tf.round(tf.mul(deltaTimeTensor, DATA_TIME_QUANTIZE_RATE));
            var deltaTimeTrunc = tf.minimum(deltaTimeBin, DATA_MAX_DISCRETE_TIMES);
            var deltaTimeInt = tf.cast(tf.add(deltaTimeTrunc, 1e-4), 'int32');
            var deltaTimeOh = tf.oneHot(deltaTimeInt, DATA_MAX_DISCRETE_TIMES + 1);
            var deltaTimeOhFloat = tf.cast(deltaTimeOh, 'float32');
            decFeatsArr.push(deltaTimeOhFloat);
            var rnnInput = tf.concat(decFeatsArr, 1);
            rnnInput = tf.matMul(rnnInput, _this.modelVars['phero_model/decoder/rnn_input/dense/kernel']);
            rnnInput = tf.add(rnnInput, _this.modelVars['phero_model/decoder/rnn_input/dense/bias']);
            var _a = tf.multiRNNCell(_this.decLSTMCells, rnnInput, lastState.c, lastState.h), c = _a[0], h = _a[1];
            var state = { c: c, h: h };
            var logits = tf.matMul(h[RNN_NLAYERS - 1], _this.modelVars['phero_model/decoder/pitches/dense/kernel']);
            logits = tf.add(logits, _this.modelVars['phero_model/decoder/pitches/dense/bias']);
            var logits1D = tf.reshape(logits, [NUM_PIANOKEYS]);
            var sample = sampleFunc(logits1D);
            var output = sample.dataSync()[0];
            return [state, output];
        }), state = _a[0], output = _a[1];
        return [state, output];
    };
    return PianoGenie;
}());
exports.PianoGenie = PianoGenie;
//# sourceMappingURL=model.js.map