"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MinecraftAPI = require("../index");
const chai_1 = require("chai");
const mocha_typescript_1 = require("mocha-typescript");
const USERNAME = 'unaussprechlich';
const UUID = '4064d7ecc2124a1cb252ecc0403a2824';
const USERNAME2 = 'NerfLv00';
let TestMinecraftAPI = class TestMinecraftAPI {
    throwErrorIfUsernameInvalid(done) {
        MinecraftAPI.uuidAt("", Date.now()).catch(done());
    }
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield MinecraftAPI.uuidAt(USERNAME, Date.now());
            chai_1.expect(response).to.equal(UUID);
        });
    }
};
__decorate([
    mocha_typescript_1.test("throws an Error if is not valid")
], TestMinecraftAPI.prototype, "throwErrorIfUsernameInvalid", null);
__decorate([
    mocha_typescript_1.test("should worky correctly")
], TestMinecraftAPI.prototype, "test", null);
TestMinecraftAPI = __decorate([
    mocha_typescript_1.suite
], TestMinecraftAPI);
