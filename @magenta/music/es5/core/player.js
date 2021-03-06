"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Tone = require("tone");
var _1 = require(".");
var constants = require("./constants");
var data_1 = require("./data");
var soundfont = require("./soundfont");
function compareQuantizedNotes(a, b) {
    if (a.quantizedStartStep < b.quantizedStartStep) {
        return -1;
    }
    if (a.quantizedStartStep > b.quantizedStartStep) {
        return 1;
    }
    if (a.pitch < b.pitch) {
        return -1;
    }
    return 1;
}
var BasePlayerCallback = (function () {
    function BasePlayerCallback() {
    }
    return BasePlayerCallback;
}());
exports.BasePlayerCallback = BasePlayerCallback;
var BasePlayer = (function () {
    function BasePlayer(playClick, callbackObject) {
        if (playClick === void 0) { playClick = false; }
        this.playClick = playClick;
        this.callbackObject = callbackObject;
        this.desiredQPM = undefined;
    }
    BasePlayer.prototype.setTempo = function (qpm) {
        this.desiredQPM = qpm;
        if (Tone.Transport.state === 'started') {
            Tone.Transport.bpm.value = qpm;
        }
    };
    BasePlayer.prototype.makeClickSequence = function (seq) {
        var clickSeq = _1.sequences.clone(seq);
        var sixteenthEnds = clickSeq.notes.map(function (n) { return n.quantizedEndStep; });
        var lastSixteenth = Math.max.apply(Math, sixteenthEnds);
        for (var i = 0; i < lastSixteenth; i += 4) {
            var click = {
                pitch: i % 16 === 0 ? constants.LO_CLICK_PITCH :
                    constants.HI_CLICK_PITCH,
                quantizedStartStep: i,
                isDrum: true,
                quantizedEndStep: i + 1
            };
            clickSeq.notes.push(click);
        }
        clickSeq.notes.sort(compareQuantizedNotes);
        return clickSeq;
    };
    BasePlayer.prototype.resumeContext = function () {
        Tone.context.resume();
    };
    BasePlayer.prototype.start = function (seq, qpm) {
        var _this = this;
        this.resumeContext();
        var isQuantized = _1.sequences.isQuantizedSequence(seq);
        if (this.playClick && isQuantized) {
            seq = this.makeClickSequence(seq);
        }
        if (qpm) {
            Tone.Transport.bpm.value = qpm;
        }
        else if (seq.tempos && seq.tempos.length > 0 && seq.tempos[0].qpm > 0) {
            Tone.Transport.bpm.value = seq.tempos[0].qpm;
        }
        else {
            Tone.Transport.bpm.value = constants.DEFAULT_QUARTERS_PER_MINUTE;
        }
        if (isQuantized) {
            seq = _1.sequences.unquantizeSequence(seq, qpm);
        }
        else if (qpm) {
            throw new Error('Cannot specify a `qpm` for a non-quantized sequence.');
        }
        this.currentPart = new Tone.Part(function (t, n) {
            if (_this.playClick ||
                (n.pitch !== constants.LO_CLICK_PITCH &&
                    n.pitch !== constants.HI_CLICK_PITCH)) {
                _this.playNote(t, n);
            }
            if (_this.callbackObject) {
                Tone.Draw.schedule(function () {
                    _this.callbackObject.run(n, t);
                }, t);
            }
        }, seq.notes.map(function (n) { return [n.startTime, n]; }));
        if (this.desiredQPM) {
            Tone.Transport.bpm.value = this.desiredQPM;
        }
        this.currentPart.start();
        if (Tone.Transport.state !== 'started') {
            Tone.Transport.start();
        }
        return new Promise(function (resolve) {
            _this.scheduledStop = Tone.Transport.schedule(function () {
                _this.stop();
                resolve();
                if (_this.callbackObject) {
                    _this.callbackObject.stop();
                }
            }, "+" + seq.totalTime);
        });
    };
    BasePlayer.prototype.stop = function () {
        if (this.currentPart) {
            this.currentPart.stop();
            Tone.Transport.stop();
            this.currentPart = null;
        }
        Tone.Transport.clear(this.scheduledStop);
        this.scheduledStop = undefined;
        this.desiredQPM = undefined;
    };
    BasePlayer.prototype.pause = function () {
        Tone.Transport.pause();
    };
    BasePlayer.prototype.resume = function () {
        Tone.Transport.start();
    };
    BasePlayer.prototype.isPlaying = function () {
        return !!this.currentPart;
    };
    BasePlayer.prototype.getPlayState = function () {
        return Tone.Transport.state;
    };
    return BasePlayer;
}());
exports.BasePlayer = BasePlayer;
var DrumKit = (function () {
    function DrumKit() {
        var _this = this;
        this.DRUM_PITCH_TO_CLASS = new Map();
        this.kick = new Tone.MembraneSynth().toMaster();
        this.tomLow = new Tone
            .MembraneSynth({
            pitchDecay: 0.008,
            envelope: { attack: 0.01, decay: 0.5, sustain: 0 }
        })
            .toMaster();
        this.tomMid = new Tone
            .MembraneSynth({
            pitchDecay: 0.008,
            envelope: { attack: 0.01, decay: 0.5, sustain: 0 }
        })
            .toMaster();
        this.tomHigh = new Tone
            .MembraneSynth({
            pitchDecay: 0.008,
            envelope: { attack: 0.01, decay: 0.5, sustain: 0 }
        })
            .toMaster();
        this.closedHihat = new Tone
            .MetalSynth({
            frequency: 400,
            envelope: { attack: 0.001, decay: 0.1, release: 0.8 },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1
        })
            .toMaster();
        this.openHihat = new Tone
            .MetalSynth({
            frequency: 400,
            envelope: { attack: 0.001, decay: 0.5, release: 0.8, sustain: 1 },
            harmonicity: 5.1,
            modulationIndex: 32,
            resonance: 4000,
            octaves: 1
        })
            .toMaster();
        this.ride = new Tone.MetalSynth().toMaster();
        this.crash = new Tone
            .MetalSynth({
            frequency: 300,
            envelope: { attack: 0.001, decay: 1, release: 3 },
            harmonicity: 5.1,
            modulationIndex: 64,
            resonance: 4000,
            octaves: 1.5
        })
            .toMaster();
        this.snare = new Tone
            .NoiseSynth({
            noise: { type: 'white' },
            envelope: { attack: 0.005, decay: 0.05, sustain: 0.1, release: 0.4 }
        })
            .toMaster();
        this.loClick = new Tone
            .MembraneSynth({
            pitchDecay: 0.008,
            envelope: { attack: 0.001, decay: 0.3, sustain: 0 }
        })
            .toMaster();
        this.hiClick = new Tone
            .MembraneSynth({
            pitchDecay: 0.008,
            envelope: { attack: 0.001, decay: 0.3, sustain: 0 }
        })
            .toMaster();
        this.pitchPlayers = [
            function (time, velocity) {
                if (velocity === void 0) { velocity = 1; }
                return _this.kick.triggerAttackRelease('C2', '8n', time, velocity);
            },
            function (time, velocity) {
                if (velocity === void 0) { velocity = 1; }
                return _this.snare.triggerAttackRelease('16n', time, velocity);
            },
            function (time, velocity) {
                if (velocity === void 0) { velocity = 1; }
                return _this.closedHihat.triggerAttack(time, 0.3, velocity);
            },
            function (time, velocity) {
                if (velocity === void 0) { velocity = 1; }
                return _this.openHihat.triggerAttack(time, 0.3, velocity);
            },
            function (time, velocity) {
                if (velocity === void 0) { velocity = 0.5; }
                return _this.tomLow.triggerAttack('G3', time, velocity);
            },
            function (time, velocity) {
                if (velocity === void 0) { velocity = 0.5; }
                return _this.tomMid.triggerAttack('C4', time, velocity);
            },
            function (time, velocity) {
                if (velocity === void 0) { velocity = 0.5; }
                return _this.tomHigh.triggerAttack('F4', time, velocity);
            },
            function (time, velocity) {
                if (velocity === void 0) { velocity = 1; }
                return _this.crash.triggerAttack(time, 1.0, velocity);
            },
            function (time, velocity) {
                if (velocity === void 0) { velocity = 1; }
                return _this.ride.triggerAttack(time, 0.5, velocity);
            },
            function (time, velocity) {
                if (velocity === void 0) { velocity = 0.5; }
                return _this.loClick.triggerAttack('G5', time, velocity);
            },
            function (time, velocity) {
                if (velocity === void 0) { velocity = 0.5; }
                return _this.hiClick.triggerAttack('C6', time, velocity);
            }
        ];
        var _loop_1 = function (c) {
            data_1.DEFAULT_DRUM_PITCH_CLASSES[c].forEach(function (p) {
                _this.DRUM_PITCH_TO_CLASS.set(p, c);
            });
        };
        for (var c = 0; c < data_1.DEFAULT_DRUM_PITCH_CLASSES.length; ++c) {
            _loop_1(c);
        }
        this.DRUM_PITCH_TO_CLASS.set(constants.LO_CLICK_PITCH, constants.LO_CLICK_CLASS);
        this.DRUM_PITCH_TO_CLASS.set(constants.HI_CLICK_PITCH, constants.HI_CLICK_CLASS);
    }
    DrumKit.getInstance = function () {
        if (!DrumKit.instance) {
            DrumKit.instance = new DrumKit();
        }
        return DrumKit.instance;
    };
    DrumKit.prototype.playNote = function (pitch, time, velocity) {
        this.pitchPlayers[this.DRUM_PITCH_TO_CLASS.get(pitch)](time, velocity);
    };
    return DrumKit;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.synths = new Map();
        _this.drumKit = DrumKit.getInstance();
        return _this;
    }
    Player.prototype.playNote = function (time, note) {
        var velocity = note.hasOwnProperty('velocity') ?
            note.velocity / constants.MAX_MIDI_VELOCITY :
            undefined;
        if (note.isDrum) {
            this.drumKit.playNote(note.pitch, time, velocity);
        }
        else {
            var freq = new Tone.Frequency(note.pitch, 'midi');
            var dur = note.endTime - note.startTime;
            this.getSynth(note.instrument, note.program)
                .triggerAttackRelease(freq, dur, time, velocity);
        }
    };
    Player.prototype.getSynth = function (instrument, program) {
        if (this.synths.has(instrument)) {
            return this.synths.get(instrument);
        }
        else if (program !== undefined && program >= 32 && program <= 39) {
            var bass = new Tone.Synth({ oscillator: { type: 'triangle' } }).toMaster();
            bass.volume.value = 5;
            this.synths.set(instrument, bass);
        }
        else {
            this.synths.set(instrument, new Tone.PolySynth(10).toMaster());
        }
        return this.synths.get(instrument);
    };
    Player.tone = Tone;
    return Player;
}(BasePlayer));
exports.Player = Player;
var SoundFontPlayer = (function (_super) {
    __extends(SoundFontPlayer, _super);
    function SoundFontPlayer(soundFontURL, output, programOutputs, drumOutputs, callbackObject) {
        if (output === void 0) { output = Tone.Master; }
        var _this = _super.call(this, false, callbackObject) || this;
        _this.soundFont = new soundfont.SoundFont(soundFontURL);
        _this.output = output;
        _this.programOutputs = programOutputs;
        _this.drumOutputs = drumOutputs;
        return _this;
    }
    SoundFontPlayer.prototype.loadSamples = function (seq) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.soundFont.loadSamples(seq.notes.map(function (note) { return ({
                            pitch: note.pitch,
                            velocity: note.velocity,
                            program: note.program || 0,
                            isDrum: note.isDrum || false
                        }); }))];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    SoundFontPlayer.prototype.resumeContext = function () {
        Tone.context.resume();
    };
    SoundFontPlayer.prototype.start = function (seq, qpm) {
        var _this = this;
        this.resumeContext();
        return this.loadSamples(seq).then(function () { return _super.prototype.start.call(_this, seq, qpm); });
    };
    SoundFontPlayer.prototype.playNote = function (time, note) {
        this.soundFont.playNote(note.pitch, note.velocity, time, note.endTime - note.startTime, note.program, note.isDrum, this.getAudioNodeOutput(note));
    };
    SoundFontPlayer.prototype.playNoteDown = function (note) {
        this.soundFont.playNoteDown(note.pitch, note.velocity, note.program, note.isDrum, this.getAudioNodeOutput(note));
    };
    SoundFontPlayer.prototype.playNoteUp = function (note) {
        this.soundFont.playNoteUp(note.pitch, note.velocity, note.program, note.isDrum, this.getAudioNodeOutput(note));
    };
    SoundFontPlayer.prototype.getAudioNodeOutput = function (note) {
        var output = this.output;
        if (this.programOutputs && !note.isDrum) {
            if (this.programOutputs.has(note.program)) {
                output = this.programOutputs.get(note.program);
            }
        }
        else if (this.drumOutputs && note.isDrum) {
            if (this.drumOutputs.has(note.pitch)) {
                output = this.drumOutputs.get(note.pitch);
            }
        }
        return output;
    };
    return SoundFontPlayer;
}(BasePlayer));
exports.SoundFontPlayer = SoundFontPlayer;
var PlayerWithClick = (function (_super) {
    __extends(PlayerWithClick, _super);
    function PlayerWithClick(callbackObject) {
        return _super.call(this, true, callbackObject) || this;
    }
    return PlayerWithClick;
}(Player));
exports.PlayerWithClick = PlayerWithClick;
var MIDIPlayer = (function (_super) {
    __extends(MIDIPlayer, _super);
    function MIDIPlayer(callbackObject) {
        var _this = _super.call(this, false, callbackObject) || this;
        _this.outputs = [];
        _this.availableOutputs = [];
        _this.NOTE_ON = 0x90;
        _this.NOTE_OFF = 0x80;
        return _this;
    }
    MIDIPlayer.prototype.requestMIDIAccess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (navigator.requestMIDIAccess) {
                    return [2, new Promise(function (resolve, reject) {
                            navigator.requestMIDIAccess().then(function (midi) {
                                midi.addEventListener('statechange', function (event) { return _this.initOutputs(midi); });
                                resolve(_this.initOutputs(midi));
                            }, function (err) { return console.log('Something went wrong', reject(err)); });
                        })];
                }
                else {
                    return [2, null];
                }
                return [2];
            });
        });
    };
    MIDIPlayer.prototype.initOutputs = function (midi) {
        var outputs = midi.outputs.values();
        for (var output = outputs.next(); output && !output.done; output = outputs.next()) {
            this.availableOutputs.push(output.value);
        }
        return this.availableOutputs;
    };
    MIDIPlayer.prototype.playNote = function (time, note) {
        var velocity = note.velocity || 100;
        var length = (note.endTime - note.startTime) * 1000;
        var msgOn = [this.NOTE_ON, note.pitch, velocity];
        var msgOff = [this.NOTE_OFF, note.pitch, velocity];
        var outputs = this.outputs ? this.outputs : this.availableOutputs;
        for (var i = 0; i < outputs.length; i++) {
            this.sendMessageToOutput(outputs[i], msgOn);
            this.sendMessageToOutput(outputs[i], msgOff, window.performance.now() + length);
        }
    };
    MIDIPlayer.prototype.sendMessageToOutput = function (output, message, time) {
        if (output) {
            output.send(message, time);
        }
    };
    MIDIPlayer.prototype.playNoteDown = function (note) {
        var msgOn = [this.NOTE_ON, note.pitch, note.velocity];
        var outputs = this.outputs ? this.outputs : this.availableOutputs;
        for (var i = 0; i < outputs.length; i++) {
            this.sendMessageToOutput(outputs[i], msgOn);
        }
    };
    MIDIPlayer.prototype.playNoteUp = function (note) {
        var msgOff = [this.NOTE_OFF, note.pitch, note.velocity];
        var outputs = this.outputs ? this.outputs : this.availableOutputs;
        for (var i = 0; i < outputs.length; i++) {
            this.sendMessageToOutput(outputs[i], msgOff, note.endTime - note.startTime);
        }
    };
    return MIDIPlayer;
}(BasePlayer));
exports.MIDIPlayer = MIDIPlayer;
//# sourceMappingURL=player.js.map