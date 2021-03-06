"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("@tensorflow/tfjs-core");
var test = require("tape");
var chords = require("./chords");
var ChordQuality = chords.ChordQuality;
var ChordSymbolException = chords.ChordSymbolException;
var ChordEncodingException = chords.ChordEncodingException;
var ChordSymbols = chords.ChordSymbols;
test('Test Chord Pitches', function (t) {
    t.deepEqual(ChordSymbols.pitches('Am').sort(function (x, y) { return x - y; }), [0, 4, 9]);
    t.deepEqual(ChordSymbols.pitches('D7b9').sort(function (x, y) { return x - y; }), [0, 2, 3, 6, 9]);
    t.deepEqual(ChordSymbols.pitches('Fm7b5').sort(function (x, y) { return x - y; }), [3, 5, 8, 11]);
    t.deepEqual(ChordSymbols.pitches('CmM7').sort(function (x, y) { return x - y; }), [0, 3, 7, 11]);
    t.deepEqual(ChordSymbols.pitches('E##13').sort(function (x, y) { return x - y; }), [1, 3, 4, 6, 8, 10]);
    t.deepEqual(ChordSymbols.pitches('G+').sort(function (x, y) { return x - y; }), [3, 7, 11]);
    t.throws(function () { return ChordSymbols.pitches('blah'); }, ChordSymbolException);
    t.throws(function () { return ChordSymbols.pitches('9'); }, ChordSymbolException);
    t.throws(function () { return ChordSymbols.pitches('M'); }, ChordSymbolException);
    t.end();
});
test('Test Chord Root', function (t) {
    t.equal(ChordSymbols.root('Dm9'), 2);
    t.equal(ChordSymbols.root('E/G#'), 4);
    t.equal(ChordSymbols.root('Bsus2'), 11);
    t.equal(ChordSymbols.root('Abmaj7'), 8);
    t.equal(ChordSymbols.root('D##5(add6)'), 4);
    t.equal(ChordSymbols.root('F(b7)(#9)(b13)'), 5);
    t.throws(function () { return ChordSymbols.root(''); }, ChordSymbolException);
    t.throws(function () { return ChordSymbols.root('o'); }, ChordSymbolException);
    t.throws(function () { return ChordSymbols.root('7#9'); }, ChordSymbolException);
    t.end();
});
test('Test Chord Quality', function (t) {
    t.equal(ChordSymbols.quality('B13'), ChordQuality.Major);
    t.equal(ChordSymbols.quality('E7#9'), ChordQuality.Major);
    t.equal(ChordSymbols.quality('FMadd9'), ChordQuality.Major);
    t.equal(ChordSymbols.quality('C6'), ChordQuality.Major);
    t.equal(ChordSymbols.quality('Gmaj13'), ChordQuality.Major);
    t.equal(ChordSymbols.quality('C#m9'), ChordQuality.Minor);
    t.equal(ChordSymbols.quality('Gm7'), ChordQuality.Minor);
    t.equal(ChordSymbols.quality('CbmMaj7'), ChordQuality.Minor);
    t.equal(ChordSymbols.quality('Am6'), ChordQuality.Minor);
    t.equal(ChordSymbols.quality('Bbm'), ChordQuality.Minor);
    t.equal(ChordSymbols.quality('D+add#9'), ChordQuality.Augmented);
    t.equal(ChordSymbols.quality('A+'), ChordQuality.Augmented);
    t.equal(ChordSymbols.quality('G7#5'), ChordQuality.Augmented);
    t.equal(ChordSymbols.quality('Faug'), ChordQuality.Augmented);
    t.equal(ChordSymbols.quality('Am7b5'), ChordQuality.Diminished);
    t.equal(ChordSymbols.quality('Edim7'), ChordQuality.Diminished);
    t.equal(ChordSymbols.quality('Bbmb5'), ChordQuality.Diminished);
    t.equal(ChordSymbols.quality('Fo'), ChordQuality.Diminished);
    t.equal(ChordSymbols.quality('G7no5'), ChordQuality.Other);
    t.equal(ChordSymbols.quality('Bbsus2'), ChordQuality.Other);
    t.equal(ChordSymbols.quality('Dsus'), ChordQuality.Other);
    t.equal(ChordSymbols.quality('Esus24'), ChordQuality.Other);
    t.equal(ChordSymbols.quality('Em7#5'), ChordQuality.Other);
    t.throws(function () { return ChordSymbols.quality('Xdim'); }, ChordSymbolException);
    t.throws(function () { return ChordSymbols.quality('-13'); }, ChordSymbolException);
    t.throws(function () { return ChordSymbols.quality('++'); }, ChordSymbolException);
    t.throws(function () { return ChordSymbols.quality('H#'); }, ChordSymbolException);
    t.end();
});
test('Test Major/Minor Chord Encoder', function (t) {
    var e = chords.chordEncoderFromType('MajorMinorChordEncoder');
    t.equal(e.depth, 25);
    t.deepEqual(e.encode('G').shape, [25]);
    t.equal(tf.argMax(e.encode('N.C.')).dataSync()[0], 0);
    t.equal(tf.argMax(e.encode('C')).dataSync()[0], 1);
    t.equal(tf.argMax(e.encode('Cm')).dataSync()[0], 13);
    t.equal(tf.argMax(e.encode('F7')).dataSync()[0], 6);
    t.equal(tf.argMax(e.encode('Abm9')).dataSync()[0], 21);
    t.throws(function () { return e.encode('Gsus4'); }, ChordEncodingException);
    t.throws(function () { return e.encode('Bbdim'); }, ChordEncodingException);
    t.end();
});
test('Test Triad Chord Encoder', function (t) {
    var e = chords.chordEncoderFromType('TriadChordEncoder');
    t.equal(e.depth, 49);
    t.deepEqual(e.encode('G').shape, [49]);
    t.equal(tf.argMax(e.encode('N.C.')).dataSync()[0], 0);
    t.equal(tf.argMax(e.encode('C13')).dataSync()[0], 1);
    t.equal(tf.argMax(e.encode('CmMaj7')).dataSync()[0], 13);
    t.equal(tf.argMax(e.encode('Faug7')).dataSync()[0], 30);
    t.equal(tf.argMax(e.encode('Abm7b5')).dataSync()[0], 45);
    t.throws(function () { return e.encode('Gsus4'); }, ChordEncodingException);
    t.throws(function () { return e.encode('Bb7no5'); }, ChordEncodingException);
    t.end();
});
test('Test Pitch Chord Encoder', function (t) {
    var e = chords.chordEncoderFromType('PitchChordEncoder');
    t.equal(e.depth, 37);
    t.deepEqual(e.encode('G').shape, [37]);
    t.deepEqual(e.encode('N.C.').dataSync(), [
        1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
    ]);
    t.deepEqual(e.encode('C').dataSync(), [
        0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
    ]);
    t.deepEqual(e.encode('F#m').dataSync(), [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0
    ]);
    t.deepEqual(e.encode('E13').dataSync(), [
        0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
    ]);
    t.deepEqual(e.encode('FmMaj7').dataSync(), [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0
    ]);
    t.end();
});
test('Test Encode Progression', function (t) {
    var e = chords.chordEncoderFromType('MajorMinorChordEncoder');
    var tensors = e.encodeProgression(['C', 'Dm'], 4);
    var splitTensors = tf.split(tensors, 4);
    t.deepEqual(tensors.shape, [4, e.depth]);
    t.deepEqual(splitTensors[0].dataSync(), e.encode('C').dataSync());
    t.deepEqual(splitTensors[1].dataSync(), e.encode('C').dataSync());
    t.deepEqual(splitTensors[2].dataSync(), e.encode('Dm').dataSync());
    t.deepEqual(splitTensors[3].dataSync(), e.encode('Dm').dataSync());
    t.end();
});
//# sourceMappingURL=chords_test.js.map