"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var constants_1 = require("./constants");
var Visualizer = (function () {
    function Visualizer(sequence, canvas, config) {
        if (config === void 0) { config = {}; }
        this.config = {
            noteHeight: config.noteHeight || 6,
            noteSpacing: config.noteSpacing || 1,
            pixelsPerTimeStep: config.pixelsPerTimeStep || 30,
            noteRGB: config.noteRGB || '8, 41, 64',
            activeNoteRGB: config.activeNoteRGB || '240, 84, 119',
            minPitch: config.minPitch,
            maxPitch: config.maxPitch,
        };
        this.noteSequence = sequence;
        this.sequenceIsQuantized = _1.sequences.isQuantizedSequence(this.noteSequence);
        this.ctx = canvas.getContext('2d');
        this.parentElement = canvas.parentElement;
        var size = this.getCanvasSize();
        this.height = size.height;
        var dpr = window.devicePixelRatio || 1;
        this.ctx.canvas.width = dpr * size.width;
        this.ctx.canvas.height = dpr * size.height;
        canvas.style.width = size.width + "px";
        canvas.style.height = size.height + "px";
        this.ctx.scale(dpr, dpr);
        this.redraw();
    }
    Visualizer.prototype.redraw = function (activeNote, scrollIntoView) {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        var activeNotePosition;
        for (var i = 0; i < this.noteSequence.notes.length; i++) {
            var note = this.noteSequence.notes[i];
            var offset = this.config.noteSpacing * (i + 1);
            var x = (this.getNoteStartTime(note) * this.config.pixelsPerTimeStep) +
                offset;
            var w = (this.getNoteEndTime(note) - this.getNoteStartTime(note)) *
                this.config.pixelsPerTimeStep;
            var y = this.height -
                ((note.pitch - this.config.minPitch) * this.config.noteHeight);
            var opacityBaseline = 0.2;
            var opacity = note.velocity ? note.velocity / 100 + opacityBaseline : 1;
            var isActive = activeNote && this.isPaintingActiveNote(note, activeNote);
            this.ctx.fillStyle =
                "rgba(" + (isActive ? this.config.activeNoteRGB : this.config.noteRGB) + ",\n          " + opacity + ")";
            this.ctx.fillRect(x, y, w, this.config.noteHeight);
            if (isActive) {
                activeNotePosition = x;
            }
        }
        if (scrollIntoView) {
            var containerWidth = this.parentElement.getBoundingClientRect().width;
            if (activeNotePosition >
                (this.parentElement.scrollLeft + containerWidth)) {
                this.parentElement.scrollLeft = activeNotePosition - 20;
            }
        }
        return activeNotePosition;
    };
    Visualizer.prototype.getCanvasSize = function () {
        if (this.config.minPitch === undefined ||
            this.config.maxPitch === undefined) {
            this.config.minPitch = constants_1.MAX_MIDI_PITCH;
            this.config.maxPitch = constants_1.MIN_MIDI_PITCH;
            for (var _i = 0, _a = this.noteSequence.notes; _i < _a.length; _i++) {
                var note = _a[_i];
                this.config.minPitch = Math.min(note.pitch, this.config.minPitch);
                this.config.maxPitch = Math.max(note.pitch, this.config.maxPitch);
            }
            this.config.minPitch -= 2;
            this.config.maxPitch += 2;
        }
        var height = (this.config.maxPitch - this.config.minPitch) * this.config.noteHeight;
        var numNotes = this.noteSequence.notes.length;
        var endTime = this.sequenceIsQuantized ?
            this.noteSequence.totalQuantizedSteps :
            this.noteSequence.totalTime;
        var width = (numNotes * this.config.noteSpacing) +
            (endTime * this.config.pixelsPerTimeStep);
        return { width: width, height: height };
    };
    Visualizer.prototype.getNoteStartTime = function (note) {
        return this.sequenceIsQuantized ? note.quantizedStartStep : note.startTime;
    };
    Visualizer.prototype.getNoteEndTime = function (note) {
        return this.sequenceIsQuantized ? note.quantizedEndStep : note.endTime;
    };
    Visualizer.prototype.isPaintingActiveNote = function (note, playedNote) {
        var isPlayedNote = this.getNoteStartTime(note) === this.getNoteStartTime(playedNote);
        var heldDownDuringPlayedNote = this.getNoteStartTime(note) <= this.getNoteStartTime(playedNote) &&
            this.getNoteEndTime(note) >= this.getNoteEndTime(playedNote);
        return isPlayedNote || heldDownDuringPlayedNote;
    };
    return Visualizer;
}());
exports.Visualizer = Visualizer;
//# sourceMappingURL=visualizer.js.map