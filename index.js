"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const MojangAxios = axios_1.default.create({
    baseURL: 'https://api.mojang.com/',
    timeout: 1000
});
function _simpleGet(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield MojangAxios.get(url)).data;
    });
}
function _simplePost(url, array) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield MojangAxios.post(url, array)).data;
    });
}
function uuidForNameAt(username, time) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield _simpleGet('/users/profiles/minecraft/' + encodeURIComponent(username) + '?at=' + time);
        return response.id;
    });
}
exports.uuidForNameAt = uuidForNameAt;
function uuidForName(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield _simpleGet('/users/profiles/minecraft/' + encodeURIComponent(username) + '?at=' + Date.now());
        return response.id;
    });
}
exports.uuidForName = uuidForName;
function uuidForNames(names) {
    return __awaiter(this, void 0, void 0, function* () {
        return _simplePost('/profiles/minecraft', names);
    });
}
exports.uuidForNames = uuidForNames;
function nameHistoryForUuid(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        return _simpleGet('/user/profiles/' + encodeURIComponent(uuid) + '/names');
    });
}
exports.nameHistoryForUuid = nameHistoryForUuid;
function nameHistoryForName(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const uuid = yield this.uuidForName(username);
        return _simpleGet('/user/profiles/' + encodeURIComponent(uuid) + '/names');
    });
}
exports.nameHistoryForName = nameHistoryForName;
function nameForUuid(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield profileForUuid(uuid);
        return response.name;
    });
}
exports.nameForUuid = nameForUuid;
function profileForUuid(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield axios_1.default.get('https://sessionserver.mojang.com/session/minecraft/profile/' + encodeURIComponent(uuid))).data;
    });
}
exports.profileForUuid = profileForUuid;
//# sourceMappingURL=index.js.map