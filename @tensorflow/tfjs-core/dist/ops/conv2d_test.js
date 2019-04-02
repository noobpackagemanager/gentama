"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
jasmine_util_1.describeWithFlags('conv im2row', test_util_1.WEBGL_ENVS, function () {
    var webglConvIm2colSavedFlag = tf.ENV.get('WEBGL_CONV_IM2COL');
    beforeAll(function () {
        tf.ENV.set('WEBGL_CONV_IM2COL', true);
    });
    afterAll(function () {
        tf.ENV.set('WEBGL_CONV_IM2COL', webglConvIm2colSavedFlag);
    });
    it('should not leak memory', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var outputDepth = 1;
        var fSize = 2;
        var pad = 0;
        var stride = 1;
        var dataFormat = 'NHWC';
        var dilation = 1;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        var w = tf.tensor4d([3, 1, 5, 0], [fSize, fSize, inputDepth, outputDepth]);
        var startNumBytes = tf.memory().numBytes;
        tf.conv2d(x, w, stride, pad, dataFormat, dilation);
        var endNumBytes = tf.memory().numBytes;
        expect(endNumBytes - startNumBytes).toEqual(4);
    });
    it('x=[3,3,1] f=[2,2,1,1] s=1 d=1 p=0', function () {
        var inputDepth = 1;
        var inputShape = [3, 3, inputDepth];
        var outputDepth = 1;
        var fSize = 2;
        var pad = 0;
        var stride = 1;
        var dataFormat = 'NHWC';
        var dilation = 1;
        var x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9], inputShape);
        var w = tf.tensor4d([3, 1, 5, 0], [fSize, fSize, inputDepth, outputDepth]);
        var result = tf.conv2d(x, w, stride, pad, dataFormat, dilation);
        test_util_1.expectArraysClose(result, [25, 34, 52, 61]);
    });
    it('x=[2,2,1] f=[2,2,1,1] s=1 d=1 p=0', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var outputDepth = 1;
        var fSize = 2;
        var pad = 0;
        var stride = 1;
        var dataFormat = 'NHWC';
        var dilation = 1;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        var w = tf.tensor4d([3, 1, 5, 0], [fSize, fSize, inputDepth, outputDepth]);
        var result = tf.conv2d(x, w, stride, pad, dataFormat, dilation);
        test_util_1.expectArraysClose(result, [20]);
    });
    it('should work when output texture shape does not equal logical shape', function () {
        var inputDepth = 3;
        var inputSize = 300;
        var filterSize = 3;
        var outputDepth = 24;
        var xData = new Float32Array(1 * inputSize * inputSize * inputDepth);
        var wData = new Float32Array(filterSize * filterSize * inputDepth * outputDepth);
        xData[0] = 1;
        xData[100] = 1;
        wData[0] = 1;
        wData[100] = 1;
        var x = tf.tensor4d(xData, [1, inputSize, inputSize, inputDepth]);
        var w = tf.tensor4d(wData, [filterSize, filterSize, inputDepth, outputDepth]);
        var result = tf.conv2d(x, w, 2, 'same');
        var resultData = result.dataSync();
        expect(resultData[0]).toEqual(1);
        expect(resultData[388]).toEqual(1);
    });
    it('should work when input texture shapes do not equal logical shapes', function () {
        var webglMaxTextureSize = tf.ENV.get('WEBGL_MAX_TEXTURE_SIZE');
        tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', 10);
        var inputDepth = 1;
        var inputSize = 5;
        var filterSize = 2;
        var outputDepth = 1;
        var x = tf.tensor3d([
            0.4, 0.75, 0.65, 0.98, 0.1, 0.41, 0.01, 0.46, 0.49,
            0.4, 0.11, 0.76, 0.73, 0.86, 0.34, 0.34, 0.71, 0.68,
            0.62, 0.87, 0.64, 0.38, 0.29, 0.55, 0.95
        ], [inputSize, inputSize, inputDepth]);
        var w = tf.tensor4d([0.57, 0.64, 0.18, 0.18], [filterSize, filterSize, inputDepth, outputDepth]);
        var result = tf.conv2d(x, w, 1, 'same');
        tf.ENV.set('WEBGL_MAX_TEXTURE_SIZE', webglMaxTextureSize);
        test_util_1.expectArraysClose(result, [
            0.7836, 0.9281, 1.1687, 0.7828, 0.129, 0.3967, 0.5683, 0.862, 0.7513,
            0.2892, 0.7381, 1.1506, 1.2005, 0.976, 0.3504, 0.8318, 0.9605, 0.9356,
            1.1802, 0.6669, 0.608, 0.4022, 0.5173, 0.9215, 0.5415
        ]);
    });
});
jasmine_util_1.describeWithFlags('conv2d', test_util_1.ALL_ENVS, function () {
    it('x=[2,2,1] f=[1,1,1,2] s=1 d=1 p=0', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var outputDepth = 1;
        var fSize = 1;
        var pad = 0;
        var stride = 1;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        var w = tf.tensor4d([2], [fSize, fSize, inputDepth, outputDepth]);
        var result = tf.conv2d(x, w, stride, pad);
        test_util_1.expectArraysClose(result, [2, 4, 6, 8]);
    });
    it('x=[2,2,2,1] f=[1,1,1,1] s=1 d=1 p=0', function () {
        var inputDepth = 1;
        var inShape = [2, 2, 2, inputDepth];
        var outputDepth = 1;
        var fSize = 1;
        var pad = 0;
        var stride = 1;
        var x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8], inShape);
        var w = tf.tensor4d([2], [fSize, fSize, inputDepth, outputDepth]);
        var result = tf.conv2d(x, w, stride, pad);
        expect(result.shape).toEqual([2, 2, 2, 1]);
        var expected = [2, 4, 6, 8, 10, 12, 14, 16];
        test_util_1.expectArraysClose(result, expected);
    });
    it('x=[2,2,1] f=[2,2,1,1] s=1 d=1 p=0', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var outputDepth = 1;
        var fSize = 2;
        var pad = 0;
        var stride = 1;
        var dataFormat = 'NHWC';
        var dilation = 1;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        var w = tf.tensor4d([3, 1, 5, 0], [fSize, fSize, inputDepth, outputDepth]);
        var result = tf.conv2d(x, w, stride, pad, dataFormat, dilation);
        test_util_1.expectArraysClose(result, [20]);
    });
    it('x=[4,4,1] f=[2,2,1,1] s=1 d=2 p=0', function () {
        var inputDepth = 1;
        var inputShape = [4, 4, inputDepth];
        var outputDepth = 1;
        var fSize = 2;
        var fSizeDilated = 3;
        var pad = 0;
        var stride = 1;
        var dataFormat = 'NHWC';
        var dilation = 2;
        var noDilation = 1;
        var x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], inputShape);
        var w = tf.tensor4d([3, 1, 5, 2], [fSize, fSize, inputDepth, outputDepth]);
        var wDilated = tf.tensor4d([3, 0, 1, 0, 0, 0, 5, 0, 2], [fSizeDilated, fSizeDilated, inputDepth, outputDepth]);
        var result = tf.conv2d(x, w, stride, pad, dataFormat, dilation);
        var expectedResult = tf.conv2d(x, wDilated, stride, pad, dataFormat, noDilation);
        expect(result.shape).toEqual(expectedResult.shape);
        test_util_1.expectArraysClose(result, expectedResult);
    });
    it('throws when x is not rank 3', function () {
        var inputDepth = 1;
        var outputDepth = 1;
        var fSize = 2;
        var pad = 0;
        var stride = 1;
        var x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
        var w = tf.tensor4d([3, 1, 5, 0], [fSize, fSize, inputDepth, outputDepth]);
        expect(function () { return tf.conv2d(x, w, stride, pad); }).toThrowError();
    });
    it('throws when weights is not rank 4', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var pad = 0;
        var stride = 1;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        var w = tf.tensor3d([3, 1, 5, 0], [2, 2, 1]);
        expect(function () { return tf.conv2d(x, w, stride, pad); }).toThrowError();
    });
    it('throws when x depth does not match weight depth', function () {
        var inputDepth = 1;
        var wrongInputDepth = 5;
        var inputShape = [2, 2, inputDepth];
        var outputDepth = 1;
        var fSize = 2;
        var pad = 0;
        var stride = 1;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        var w = tf.randomNormal([fSize, fSize, wrongInputDepth, outputDepth]);
        expect(function () { return tf.conv2d(x, w, stride, pad); }).toThrowError();
    });
    it('throws when dimRoundingMode is set and pad is not a number', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var outputDepth = 1;
        var fSize = 2;
        var pad = 'valid';
        var stride = 1;
        var dataFormat = 'NHWC';
        var dilation = 1;
        var dimRoundingMode = 'round';
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        var w = tf.randomNormal([fSize, fSize, inputDepth, outputDepth]);
        expect(function () {
            return tf.conv2d(x, w, stride, pad, dataFormat, dilation, dimRoundingMode);
        })
            .toThrowError();
    });
    it('throws when both stride and dilation are greater than 1', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var outputDepth = 1;
        var fSize = 2;
        var pad = 0;
        var stride = [2, 1];
        var dataFormat = 'NHWC';
        var dilation = [1, 2];
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        var w = tf.tensor4d([3, 1, 5, 0], [fSize, fSize, inputDepth, outputDepth]);
        expect(function () { return tf.conv2d(x, w, stride, pad, dataFormat, dilation); })
            .toThrowError();
    });
    it('gradient input=[3,3,1] f=[2,2,1,1] s=1 p=0', function () {
        var inputDepth = 1;
        var outputDepth = 1;
        var inputShape = [3, 3, inputDepth];
        var filterSize = 2;
        var stride = 1;
        var pad = 0;
        var filterShape = [filterSize, filterSize, inputDepth, outputDepth];
        var filter = tf.ones(filterShape);
        var x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9], inputShape);
        var dy = tf.tensor3d([3, 1, 2, 0], [2, 2, 1]);
        var grads = tf.grads(function (x, filter) { return x.conv2d(filter, stride, pad); });
        var _a = grads([x, filter], dy), dx = _a[0], dfilter = _a[1];
        expect(dx.shape).toEqual(x.shape);
        test_util_1.expectArraysClose(dx, [3, 4, 1, 5, 6, 1, 2, 2, 0]);
        expect(dfilter.shape).toEqual(filterShape);
        test_util_1.expectArraysClose(dfilter, [13, 19, 31, 37]);
    });
    it('gradient x=[2,3,3,1] f=[2,2,1,1] s=1 p=0', function () {
        var inputDepth = 1;
        var outputDepth = 1;
        var inputShape = [2, 3, 3, inputDepth];
        var filterSize = 2;
        var stride = 1;
        var pad = 0;
        var filterShape = [filterSize, filterSize, inputDepth, outputDepth];
        var filter = tf.ones(filterShape);
        var x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9], inputShape);
        var dy = tf.tensor4d([3, 1, 2, 0, 3, 1, 2, 0], [2, 2, 2, 1]);
        var grads = tf.grads(function (x, filter) { return x.conv2d(filter, stride, pad); });
        var _a = grads([x, filter], dy), dx = _a[0], dfilter = _a[1];
        expect(dx.shape).toEqual(x.shape);
        test_util_1.expectArraysClose(dx, [3, 4, 1, 5, 6, 1, 2, 2, 0, 3, 4, 1, 5, 6, 1, 2, 2, 0]);
        expect(dfilter.shape).toEqual(filterShape);
        test_util_1.expectArraysClose(dfilter, [13 * 2, 19 * 2, 31 * 2, 37 * 2]);
    });
    it('throws when passed x as a non-tensor', function () {
        var inputDepth = 1;
        var outputDepth = 1;
        var fSize = 1;
        var pad = 0;
        var stride = 1;
        var w = tf.tensor4d([2], [fSize, fSize, inputDepth, outputDepth]);
        expect(function () { return tf.conv2d({}, w, stride, pad); })
            .toThrowError(/Argument 'x' passed to 'conv2d' must be a Tensor/);
    });
    it('throws when passed filter as a non-tensor', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var pad = 0;
        var stride = 1;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        expect(function () { return tf.conv2d(x, {}, stride, pad); })
            .toThrowError(/Argument 'filter' passed to 'conv2d' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () {
        var pad = 0;
        var stride = 1;
        var x = [[[1], [2]], [[3], [4]]];
        var w = [[[[2]]]];
        var result = tf.conv2d(x, w, stride, pad);
        test_util_1.expectArraysClose(result, [2, 4, 6, 8]);
    });
});
//# sourceMappingURL=conv2d_test.js.map