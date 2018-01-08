"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
function _simpleGet(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            request(url, { json: true }, function (err, res, body) {
                if (typeof body === 'undefined') {
                    reject(new Error('body is undefined'));
                    return;
                }
                if (body.error) {
                    reject(new Error(body.error + ": " + body.errorMessage));
                    return;
                }
                resolve(body);
            });
        });
    });
}
function _simplePost(url, array) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            request.post(url, { json: true, body: array }, function (err, res, body) {
                if (typeof body === 'undefined') {
                    reject(new Error('body is undefined'));
                    return;
                }
                if (body.error) {
                    reject(new Error(body.error + ": " + body.errorMessage));
                    return;
                }
                resolve(body);
            });
        });
    });
}
function uuidForNameAt(username, time) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield _simpleGet('https://api.mojang.com/users/profiles/minecraft/' + encodeURIComponent(username) + '?at=' + time);
        return response.id;
    });
}
exports.uuidForNameAt = uuidForNameAt;
function uuidForName(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield _simpleGet('https://api.mojang.com/users/profiles/minecraft/' + encodeURIComponent(username) + '?at=' + Date.now());
        return response.id;
    });
}
exports.uuidForName = uuidForName;
function uuidForNames(names) {
    return __awaiter(this, void 0, void 0, function* () {
        return _simplePost('https://api.mojang.com/profiles/minecraft', names);
    });
}
exports.uuidForNames = uuidForNames;
function nameHistoryForUuid(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        return _simpleGet('https://api.mojang.com/user/profiles/' + encodeURIComponent(uuid) + '/names');
    });
}
exports.nameHistoryForUuid = nameHistoryForUuid;
function nameHistoryForName(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const uuid = yield this.uuid(username);
        return _simpleGet('https://api.mojang.com/user/profiles/' + encodeURIComponent(uuid) + '/names');
    });
}
exports.nameHistoryForName = nameHistoryForName;
function profileForUuid(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        return _simpleGet('https://sessionserver.mojang.com/session/minecraft/profile/' + encodeURIComponent(uuid));
    });
}
exports.profileForUuid = profileForUuid;
