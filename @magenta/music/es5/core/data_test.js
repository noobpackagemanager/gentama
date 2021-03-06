"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs-core");
var test = require("tape");
var index_1 = require("../protobuf/index");
var data = require("./data");
var sequences = require("./sequences");
var MEL_NS = index_1.NoteSequence.create({
    notes: [
        { pitch: 69, quantizedStartStep: 0, quantizedEndStep: 2 },
        { pitch: 71, quantizedStartStep: 2, quantizedEndStep: 4 },
        { pitch: 73, quantizedStartStep: 4, quantizedEndStep: 6 },
        { pitch: 74, quantizedStartStep: 6, quantizedEndStep: 8 },
        { pitch: 76, quantizedStartStep: 8, quantizedEndStep: 10 },
        { pitch: 81, quantizedStartStep: 12, quantizedEndStep: 16 },
        { pitch: 77, quantizedStartStep: 16, quantizedEndStep: 20 },
        { pitch: 80, quantizedStartStep: 20, quantizedEndStep: 24 },
        { pitch: 75, quantizedStartStep: 24, quantizedEndStep: 28 }
    ],
    quantizationInfo: { stepsPerQuarter: 2 },
    totalQuantizedSteps: 32,
});
var DRUM_NS = index_1.NoteSequence.create({
    notes: [
        { pitch: 36, quantizedStartStep: 0 }, { pitch: 42, quantizedStartStep: 0 },
        { pitch: 36, quantizedStartStep: 4 }, { pitch: 42, quantizedStartStep: 6 },
        { pitch: 36, quantizedStartStep: 8 }, { pitch: 42, quantizedStartStep: 10 },
        { pitch: 36, quantizedStartStep: 12 }, { pitch: 42, quantizedStartStep: 14 },
        { pitch: 36, quantizedStartStep: 16 }, { pitch: 36, quantizedStartStep: 24 },
        { pitch: 36, quantizedStartStep: 28 }, { pitch: 42, quantizedStartStep: 30 }
    ],
    quantizationInfo: { stepsPerQuarter: 2 }
});
DRUM_NS.notes.forEach(function (n) {
    n.isDrum = true;
    n.quantizedEndStep = n.quantizedStartStep + 1;
});
DRUM_NS.totalQuantizedSteps = 32;
var TRIO_NS = index_1.NoteSequence.create();
TRIO_NS.quantizationInfo =
    index_1.NoteSequence.QuantizationInfo.create({ stepsPerQuarter: 2 });
sequences.clone(MEL_NS).notes.forEach(function (n) {
    n.program = 0;
    n.instrument = 0;
    TRIO_NS.notes.push((n));
});
sequences.clone(MEL_NS).notes.forEach(function (n) {
    n.pitch -= 36;
    n.program = 32;
    n.instrument = 1;
    TRIO_NS.notes.push(n);
});
sequences.clone(DRUM_NS).notes.forEach(function (n) {
    n.instrument = 2;
    TRIO_NS.notes.push(n);
});
TRIO_NS.totalQuantizedSteps = 32;
var MULTITRACK_NS = index_1.NoteSequence.create({
    notes: [
        {
            pitch: 60,
            quantizedStartStep: 0,
            quantizedEndStep: 4,
            instrument: 0,
            program: 1,
            isDrum: false
        },
        {
            pitch: 67,
            quantizedStartStep: 2,
            quantizedEndStep: 4,
            instrument: 0,
            program: 1,
            isDrum: false
        },
        {
            pitch: 59,
            quantizedStartStep: 4,
            quantizedEndStep: 8,
            instrument: 0,
            program: 1,
            isDrum: false
        },
        {
            pitch: 67,
            quantizedStartStep: 6,
            quantizedEndStep: 8,
            instrument: 0,
            program: 1,
            isDrum: false
        },
        {
            pitch: 40,
            quantizedStartStep: 0,
            quantizedEndStep: 1,
            instrument: 1,
            program: 0,
            isDrum: true
        },
        {
            pitch: 50,
            quantizedStartStep: 2,
            quantizedEndStep: 3,
            instrument: 1,
            program: 0,
            isDrum: true
        },
        {
            pitch: 40,
            quantizedStartStep: 4,
            quantizedEndStep: 5,
            instrument: 1,
            program: 0,
            isDrum: true
        },
        {
            pitch: 50,
            quantizedStartStep: 6,
            quantizedEndStep: 7,
            instrument: 1,
            program: 0,
            isDrum: true
        },
    ],
    quantizationInfo: { stepsPerQuarter: 1 },
    totalQuantizedSteps: 8
});
var GROOVE_NS = index_1.NoteSequence.create({
    tempos: [{ qpm: 60 }],
    notes: [
        { pitch: 36, startTime: 0, velocity: 80 },
        { pitch: 42, startTime: 0.13, velocity: 10 },
        { pitch: 36, startTime: 1.3, velocity: 15 },
        { pitch: 42, startTime: 1.5, velocity: 8 },
        { pitch: 36, startTime: 2, velocity: 16 },
        { pitch: 42, startTime: 2.45, velocity: 4 },
        { pitch: 36, startTime: 3.1, velocity: 127 },
        { pitch: 42, startTime: 3.6, velocity: 80 },
        { pitch: 36, startTime: 4.1, velocity: 99 },
        { pitch: 36, startTime: 5.99, velocity: 2 },
        { pitch: 36, startTime: 7, velocity: 3 },
        { pitch: 42, startTime: 7.5, velocity: 22 }
    ],
    totalTime: 8.0
});
GROOVE_NS.notes.forEach(function (n) {
    n.endTime = n.startTime + 0.25;
    n.isDrum = true;
});
test('Test MelodyConverter', function (t) {
    var melConverter = new data.MelodyConverter({
        numSteps: 32,
        minPitch: 21,
        maxPitch: 108,
    });
    var melTensor = melConverter.toTensor(MEL_NS);
    t.deepEqual(melTensor.shape, [32, 90]);
    melConverter.toNoteSequence(melTensor, 2).then(function (ns) { return t.deepEqual(ns, MEL_NS); });
    melTensor.dispose();
    t.end();
});
test('Test MelodyConverterWithPolyphonicInput', function (t) {
    var melConverter = new data.MelodyConverter({
        numSteps: 32,
        minPitch: 21,
        maxPitch: 108,
    });
    var polyMelNs = sequences.clone(MEL_NS);
    polyMelNs.notes[0].quantizedEndStep = 6;
    polyMelNs.notes.push(index_1.NoteSequence.Note.create({ pitch: 70, quantizedStartStep: 2, quantizedEndStep: 5 }));
    var melTensor = melConverter.toTensor(polyMelNs);
    t.deepEqual(melTensor.shape, [32, 90]);
    melConverter.toNoteSequence(melTensor, 2).then(function (ns) { return t.deepEqual(ns, MEL_NS); });
    melTensor.dispose();
    var melConverterDisallowsPolyphony = new data.MelodyConverter({
        numSteps: 32,
        minPitch: 21,
        maxPitch: 108,
        ignorePolyphony: false,
    });
    t.throws(function () { return melConverterDisallowsPolyphony.toTensor(polyMelNs); });
    t.end();
});
test('Test DrumConverters', function (t) {
    var drumsConverter = new data.DrumsConverter({ numSteps: 32 });
    var drumsOneHotConverter = new data.DrumsOneHotConverter({ numSteps: 32 });
    var drumRollConverter = new data.DrumRollConverter({ numSteps: 32 });
    var drumRollTensor = drumsConverter.toTensor(DRUM_NS);
    t.deepEqual(drumRollTensor.dataSync(), drumRollConverter.toTensor(DRUM_NS).dataSync());
    t.deepEqual(drumRollTensor.shape, [32, 10]);
    var drumOneHotTensor = drumsOneHotConverter.toTensor(DRUM_NS);
    t.deepEqual(drumOneHotTensor.shape, [32, 512]);
    t.equal(tf.tidy(function () {
        return drumOneHotTensor.sum(1).equal(tf.scalar(1, 'int32')).sum().get();
    }), 32);
    var drumRollTensorOutput = drumRollTensor.slice([0, 0], [32, 9]);
    drumRollConverter.toNoteSequence(drumRollTensorOutput, 2)
        .then(function (ns) { return t.deepEqual(ns, DRUM_NS); });
    drumsConverter.toNoteSequence(drumOneHotTensor, 2)
        .then(function (ns) { return t.deepEqual(ns, DRUM_NS); });
    drumsOneHotConverter.toNoteSequence(drumOneHotTensor, 2)
        .then(function (ns) { return t.deepEqual(ns, DRUM_NS); });
    drumRollTensor.dispose();
    drumRollTensorOutput.dispose();
    drumOneHotTensor.dispose();
    t.end();
});
test('Test TrioConverter', function (t) {
    var trioConverter = new data.TrioConverter({
        numSteps: 32,
        melArgs: { minPitch: 21, maxPitch: 108 },
        bassArgs: { minPitch: 21, maxPitch: 108 },
        drumsArgs: {},
    });
    var trioTensor = trioConverter.toTensor(TRIO_NS);
    t.deepEqual(trioTensor.shape, [32, 90 + 90 + 512]);
    t.equal(tf.tidy(function () { return trioTensor.sum(1).equal(tf.scalar(3, 'int32')).sum().get(); }), 32);
    trioConverter.toNoteSequence(trioTensor, 2)
        .then(function (ns) { return t.deepEqual(ns.toJSON(), TRIO_NS.toJSON()); });
    trioTensor.dispose();
    t.end();
});
test('Test MultitrackConverter', function (t) {
    var multitrackConverter = new data.MultitrackConverter({
        'numSteps': 512,
        'numSegments': 8,
        'stepsPerQuarter': 1,
        'totalSteps': 8,
        'numVelocityBins': 0,
        'minPitch': 21,
        'maxPitch': 108
    });
    var multitrackTensor = multitrackConverter.toTensor(MULTITRACK_NS);
    t.deepEqual(multitrackTensor.shape, [512, multitrackConverter.depth]);
    multitrackConverter.toNoteSequence(multitrackTensor, 1)
        .then(function (ns) { return t.deepEqual(ns, MULTITRACK_NS); });
    multitrackTensor.dispose();
    t.end();
});
function roundNoteTimes(notes, binsPerSecond) {
    if (binsPerSecond === void 0) { binsPerSecond = 1000; }
    notes.forEach(function (n) {
        n.startTime = Math.round(n.startTime * binsPerSecond) / binsPerSecond;
        n.endTime = Math.round(n.endTime * binsPerSecond) / binsPerSecond;
    });
}
test('Test GrooveConverter', function (t) {
    var grooveConverter = new data.GrooveConverter({ numSteps: 32 });
    var grooveTensor = grooveConverter.toTensor(GROOVE_NS);
    t.deepEqual(grooveTensor.shape, [32, 9 * 3]);
    grooveConverter.toNoteSequence(grooveTensor, undefined, 60).then(function (ns) {
        roundNoteTimes(ns.notes);
        t.deepEqual(ns, GROOVE_NS);
    });
    grooveTensor.dispose();
    t.end();
});
test('Test GrooveConverter Split', function (t) {
    var grooveConverter = new data.GrooveConverter({ numSteps: 32, splitInstruments: true });
    var grooveTensor = grooveConverter.toTensor(GROOVE_NS);
    t.deepEqual(grooveTensor.shape, [32 * 9, 3]);
    grooveConverter.toNoteSequence(grooveTensor, undefined, 60).then(function (ns) {
        roundNoteTimes(ns.notes);
        t.deepEqual(ns, GROOVE_NS);
    });
    grooveTensor.dispose();
    t.end();
});
test('Test GrooveConverterHumanize', function (t) {
    var grooveConverter = new data.GrooveConverter({
        numSteps: 32,
        humanize: true,
    });
    var grooveTensor = grooveConverter.toTensor(GROOVE_NS);
    t.deepEqual(grooveTensor.shape, [32, 9 * 3]);
    var expectedNs = sequences.clone(GROOVE_NS);
    expectedNs.notes.forEach(function (n) { return n.velocity = 0; });
    roundNoteTimes(expectedNs.notes, 4);
    grooveConverter.toNoteSequence(grooveTensor, undefined, 60).then(function (ns) {
        t.deepEqual(ns, expectedNs);
    });
    grooveTensor.dispose();
    t.end();
});
test('Test GrooveConverterTapify', function (t) {
    var grooveConverter = new data.GrooveConverter({
        numSteps: 16,
        stepsPerQuarter: 2,
        tapify: true,
    });
    var grooveTensor = grooveConverter.toTensor(GROOVE_NS);
    t.deepEqual(grooveTensor.shape, [16, 9 * 3]);
    var expectedNs = index_1.NoteSequence.create({
        tempos: [{ qpm: 60 }],
        notes: [
            { pitch: 46, startTime: 0 }, { pitch: 46, startTime: 1.3 },
            { pitch: 46, startTime: 2 }, { pitch: 46, startTime: 2.45 },
            { pitch: 46, startTime: 3.1 }, { pitch: 46, startTime: 3.6 },
            { pitch: 46, startTime: 4.1 }, { pitch: 46, startTime: 5.99 },
            { pitch: 46, startTime: 7 }, { pitch: 46, startTime: 7.5 }
        ],
        totalTime: 8.0
    });
    expectedNs.notes.forEach(function (n) {
        n.endTime = n.startTime + 0.5;
        n.velocity = 0;
        n.isDrum = true;
    });
    grooveConverter.toNoteSequence(grooveTensor, undefined, 60).then(function (ns) {
        roundNoteTimes(ns.notes);
        t.deepEqual(ns, expectedNs);
    });
    grooveTensor.dispose();
    t.end();
});
//# sourceMappingURL=data_test.js.map