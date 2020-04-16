import * as MinecraftAPI from "../index"

import { expect } from 'chai';
import { suite, test, slow, timeout } from "mocha-typescript";

const USERNAME = 'unaussprechlich';
const UUID = '4064d7ecc2124a1cb252ecc0403a2824';

@suite(timeout(5000)) class TestMinecraftAPI{

    @test public throwErrorIfUsernameInvalid(done){
        MinecraftAPI.uuidForNameAt("",Date.now()).catch(done());
    }

    @test public async responseWithCorrectUuid(){
        const response = await MinecraftAPI.uuidForNameAt(USERNAME,Date.now());
        expect(response).to.equal(UUID);
    }

    @test public async responseWithCorrectUsername(){
        const response = await MinecraftAPI.nameForUuid(UUID);
        expect(response).to.equal(USERNAME);
    }
}
