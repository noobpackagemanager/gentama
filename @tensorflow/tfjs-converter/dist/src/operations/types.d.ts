import { Tensor } from '@tensorflow/tfjs-core';
export declare type ParamTypes = 'number' | 'string' | 'number[]' | 'bool' | 'shape' | 'tensor' | 'tensors' | 'dtype';
export declare type Category = 'arithmetic' | 'basic_math' | 'control' | 'convolution' | 'dynamic' | 'evaluation' | 'image' | 'creation' | 'graph' | 'logical' | 'matrices' | 'normalization' | 'reduction' | 'slice_join' | 'spectral' | 'transformation';
export interface ParamMapper {
    tfParamName?: string;
    tfParamNameDeprecated?: string;
    tfInputIndex?: number;
    tfInputParamLength?: number;
    dlParamName: string;
    type: ParamTypes;
    converter?: string;
    defaultValue?: string | string[] | number | number[] | boolean | boolean[];
    notSupported?: boolean;
}
export interface OpMapper {
    tfOpName: string;
    dlOpName: string;
    category: Category;
    params: ParamMapper[];
}
export interface Node {
    name: string;
    op: string;
    category: Category;
    inputNames: string[];
    inputs: Node[];
    params: {
        [key: string]: ParamValue;
    };
    children: Node[];
}
export interface Graph {
    nodes: {
        [key: string]: Node;
    };
    placeholders: Node[];
    inputs: Node[];
    outputs: Node[];
    weights: Node[];
    withControlFlow: boolean;
    withDynamicShape: boolean;
}
export declare type ValueType = string | string[] | number | number[] | number[][] | boolean | boolean[] | Tensor | Tensor[];
export interface ParamValue {
    value?: ValueType;
    inputIndex?: number;
    inputParamLength?: number;
    type: ParamTypes;
}
