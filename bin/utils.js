"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPoolConnection = void 0;
function isPoolConnection(arg) {
    return 'release' in arg;
}
exports.isPoolConnection = isPoolConnection;
//# sourceMappingURL=utils.js.map