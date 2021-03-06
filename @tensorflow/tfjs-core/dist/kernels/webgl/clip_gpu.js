"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClipProgram = (function () {
    function ClipProgram(aShape, min, max) {
        this.variableNames = ['A'];
        this.outputShape = aShape;
        this.userCode = "\n      void main() {\n        float value = getAAtOutCoords();\n        if (isNaN(value)) {\n          setOutput(value);\n          return;\n        }\n\n        setOutput(clamp(value, float(" + min + "), float(" + max + ")));\n      }\n    ";
    }
    return ClipProgram;
}());
exports.ClipProgram = ClipProgram;
//# sourceMappingURL=clip_gpu.js.map