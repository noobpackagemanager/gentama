"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = [
    {
        'tfOpName': 'NonMaxSuppressionV2',
        'dlOpName': 'nonMaxSuppression',
        'category': 'dynamic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'boxes', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'scores', 'type': 'tensor' },
            { 'tfInputIndex': 2, 'dlParamName': 'maxOutputSize', 'type': 'number' },
            { 'tfInputIndex': 3, 'dlParamName': 'iouThreshold', 'type': 'number' }
        ]
    },
    {
        'tfOpName': 'NonMaxSuppressionV3',
        'dlOpName': 'nonMaxSuppression',
        'category': 'dynamic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'boxes', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'scores', 'type': 'tensor' },
            { 'tfInputIndex': 2, 'dlParamName': 'maxOutputSize', 'type': 'number' },
            { 'tfInputIndex': 3, 'dlParamName': 'iouThreshold', 'type': 'number' },
            { 'tfInputIndex': 4, 'dlParamName': 'scoreThreshold', 'type': 'number' }
        ]
    },
    {
        'tfOpName': 'Where',
        'dlOpName': 'whereAsync',
        'category': 'dynamic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'condition', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'ListDiff',
        'dlOpName': 'setdiff1dAsync',
        'category': 'dynamic',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'y', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    }
];
//# sourceMappingURL=dynamic.js.map