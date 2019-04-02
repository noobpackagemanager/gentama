import * as tf from '@tensorflow/tfjs-core';
import * as chords from '../core/chords';
import * as data from '../core/data';
import { INoteSequence } from '../protobuf/index';
declare class LayerVars {
    kernel: tf.Tensor2D;
    bias: tf.Tensor1D;
    constructor(kernel: tf.Tensor2D, bias: tf.Tensor1D);
}
declare abstract class Encoder {
    abstract readonly zDims: number;
    abstract encode(sequence: tf.Tensor3D, segmentLengths?: number[]): tf.Tensor2D;
}
declare abstract class Decoder {
    abstract readonly outputDims: number;
    abstract readonly zDims: number;
    abstract decode(z: tf.Tensor2D, length: number, initialInput?: tf.Tensor2D, temperature?: number, controls?: tf.Tensor2D): tf.Tensor3D;
}
declare class Nade {
    encWeights: tf.Tensor2D;
    decWeightsT: tf.Tensor2D;
    numDims: number;
    numHidden: number;
    constructor(encWeights: tf.Tensor3D, decWeightsT: tf.Tensor3D);
    sample(encBias: tf.Tensor2D, decBias: tf.Tensor2D): tf.Tensor<tf.Rank.R2>;
}
export interface MusicVAESpec {
    type: 'MusicVAE';
    dataConverter: data.ConverterSpec;
    chordEncoder?: chords.ChordEncoderType;
}
declare class MusicVAE {
    private checkpointURL;
    private spec;
    dataConverter: data.DataConverter;
    private chordEncoder?;
    private encoder;
    private decoder;
    private rawVars;
    initialized: boolean;
    constructor(checkpointURL: string, spec?: MusicVAESpec);
    private instantiateFromSpec;
    dispose(): void;
    private getLstmLayers;
    initialize(): Promise<void>;
    isInitialized(): boolean;
    interpolate(inputSequences: INoteSequence[], numInterps: number | number[], temperature?: number, chordProgression?: string[]): Promise<INoteSequence[]>;
    private getSegmentLengths;
    private encodeChordProgression;
    encode(inputSequences: INoteSequence[], chordProgression?: string[]): Promise<tf.Tensor<tf.Rank.R2>>;
    decode(z: tf.Tensor2D, temperature?: number, chordProgression?: string[], stepsPerQuarter?: number): Promise<INoteSequence[]>;
    private getInterpolatedZs;
    sample(numSamples: number, temperature?: number, chordProgression?: string[], stepsPerQuarter?: number): Promise<INoteSequence[]>;
}
export { LayerVars, Encoder, Decoder, Nade, MusicVAE, };
