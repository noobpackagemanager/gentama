import { Tensor } from '@tensorflow/tfjs-core';
import { LossOrMetricFn } from './types';
export declare function l2Normalize(x: Tensor, axis?: number): Tensor;
export declare function meanSquaredError(yTrue: Tensor, yPred: Tensor): Tensor;
export declare function meanAbsoluteError(yTrue: Tensor, yPred: Tensor): Tensor;
export declare function meanAbsolutePercentageError(yTrue: Tensor, yPred: Tensor): Tensor;
export declare function meanSquaredLogarithmicError(yTrue: Tensor, yPred: Tensor): Tensor;
export declare function squaredHinge(yTrue: Tensor, yPred: Tensor): Tensor;
export declare function hinge(yTrue: Tensor, yPred: Tensor): Tensor;
export declare function categoricalHinge(yTrue: Tensor, yPred: Tensor): Tensor;
export declare function logcosh(yTrue: Tensor, yPred: Tensor): Tensor;
export declare function categoricalCrossentropy(target: Tensor, output: Tensor, fromLogits?: boolean): Tensor;
export declare function sparseCategoricalCrossentropy(target: Tensor, output: Tensor, fromLogits?: boolean): Tensor;
export declare function sigmoidCrossEntropyWithLogits(target: Tensor, output: Tensor): Tensor;
export declare function binaryCrossentropy(yTrue: Tensor, yPred: Tensor): Tensor;
export declare function kullbackLeiblerDivergence(yTrue: Tensor, yPred: Tensor): Tensor;
export declare function poisson(yTrue: Tensor, yPred: Tensor): Tensor;
export declare function cosineProximity(yTrue: Tensor, yPred: Tensor): Tensor;
export declare const mse: typeof meanSquaredError;
export declare const MSE: typeof meanSquaredError;
export declare const mae: typeof meanAbsoluteError;
export declare const MAE: typeof meanAbsoluteError;
export declare const mape: typeof meanAbsolutePercentageError;
export declare const MAPE: typeof meanAbsolutePercentageError;
export declare const msle: typeof meanSquaredLogarithmicError;
export declare const MSLE: typeof meanSquaredLogarithmicError;
export declare const kld: typeof kullbackLeiblerDivergence;
export declare const KLD: typeof kullbackLeiblerDivergence;
export declare const cosine: typeof cosineProximity;
export declare function get(identifierOrFn: string | LossOrMetricFn): LossOrMetricFn;
