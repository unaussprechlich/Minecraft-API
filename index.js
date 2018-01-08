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
/**
 * Return the uuid matching the Username at a given time.
 * @param {string} username
 * @param {number} time
 * @returns {Promise<UuidResponseModel>}
 */
function uuidAt(username, time) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield _simpleGet('https://api.mojang.com/users/profiles/minecraft/' + encodeURIComponent(username) + '?at=' + time);
        return response.id;
    });
}
exports.uuidAt = uuidAt;
/**
 * Get the uuid for a username.
 * @param {string} username
 * @returns {Promise<UuidResponseModel>}
 */
function uuidFromName(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield _simpleGet('https://api.mojang.com/users/profiles/minecraft/' + encodeURIComponent(username) + '?at=' + Date.now());
        return response.id;
    });
}
exports.uuidFromName = uuidFromName;
/**
 * Return a Array of uuids matched to the given usernames
 * @param {Array<string>} names
 * @returns {Promise<Array<UuidResponseModel>>}
 */
function uuidFromNames(names) {
    return __awaiter(this, void 0, void 0, function* () {
        return _simplePost('https://api.mojang.com/profiles/minecraft', names);
    });
}
exports.uuidFromNames = uuidFromNames;
/**
 * Returns the NameHistory for a given UUID
 * @param {string} uuid
 * @returns {Promise<Array<NameHistoryResponseModel>>}
 */
function nameHistoryForUuid(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        return _simpleGet('https://api.mojang.com/user/profiles/' + encodeURIComponent(uuid) + '/names');
    });
}
exports.nameHistoryForUuid = nameHistoryForUuid;
/**
 * Returns the NameHistory for a given Username
 * @param {string} username
 * @returns {Promise<Array<NameHistoryResponseModel>>}
 */
function nameHistoryForName(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const uuid = yield this.uuid(username);
        return _simpleGet('https://api.mojang.com/user/profiles/' + encodeURIComponent(uuid) + '/names');
    });
}
exports.nameHistoryForName = nameHistoryForName;
/**
 * Returns the Profile for a given uuid
 * @param {string} uuid
 * @returns {Promise<ProfileResponseModel>}
 */
function profile(uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        return _simpleGet('https://sessionserver.mojang.com/session/minecraft/profile/' + encodeURIComponent(uuid));
    });
}
exports.profile = profile;
