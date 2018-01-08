import * as MinecraftAPI from "../index"

import { expect } from 'chai';
import { suite, test, slow, timeout } from "mocha-typescript";

const USERNAME = 'unaussprechlich';
const UUID = '4064d7ecc2124a1cb252ecc0403a2824';
const USERNAME2 = 'NerfLv00';

@suite class TestMinecraftAPI{

    @test("throws an Error if is not valid")
    public throwErrorIfUsernameInvalid(done){
        MinecraftAPI.uuidAt("",Date.now()).catch(done());
    }

    @test("should worky correctly")
    public async test(){
        const response = await MinecraftAPI.uuidAt(USERNAME,Date.now());
        expect(response).to.equal(UUID);
    }

    //TODO more tests

}