import Axios from "axios";

const MojangAxios = Axios.create({
    baseURL: 'https://api.mojang.com/',
    timeout: 1000
})

async function _simpleGet<T>(url: string): Promise<T> {
    return (await MojangAxios.get(url)).data;
}

async function _simplePost<T>(url: string, array : Array<string>): Promise<Array<T>> {
    return (await MojangAxios.post(url, array)).data;
}

/**
 * ResponseModel for a UUID request to the MinecraftAPI
 */
export interface UuidResponseModel {
    id: string,
    name: string
}

/**
 * Return the uuid matching the Username at a given time.
 * @param {string} username
 * @param {number} time
 * @returns {string} uuid
 */
export async function uuidForNameAt(username: string, time: number){
    const response = await _simpleGet<UuidResponseModel>('/users/profiles/minecraft/' + encodeURIComponent(username) + '?at=' + time);
    return response.id
}

/**
 * Get the uuid for a username.
 * @param {string} username
 * @returns {string} uuid
 */
export async function uuidForName(username: string){
    const response = await _simpleGet<UuidResponseModel>('/users/profiles/minecraft/' + encodeURIComponent(username) + '?at=' + Date.now());
    return response.id
}

/**
 * Return a Array of uuids matched to the given usernames
 * @param {Array<string>} names
 * @returns {Promise<Array<UuidResponseModel>>}
 */
export async function uuidForNames(names : Array<string>){
    return _simplePost<UuidResponseModel>('/profiles/minecraft', names);
}

/**
 * ResponseModel for a NameHistory request to the MinecraftAPI
 */
export interface NameHistoryResponseModel {
    name: string,
    changedToAt: number|null
}

/**
 * Returns the NameHistory for a given UUID
 * @param {string} uuid
 * @returns {Promise<Array<NameHistoryResponseModel>>}
 */
export async function nameHistoryForUuid(uuid : string) : Promise<Array<NameHistoryResponseModel>>{
    return _simpleGet<Array<NameHistoryResponseModel>>('/user/profiles/' + encodeURIComponent(uuid) + '/names');
}

/**
 * Returns the NameHistory for a given Username
 * @param {string} username
 * @returns {Promise<Array<NameHistoryResponseModel>>}
 */
export async function nameHistoryForName(username : string) : Promise<Array<NameHistoryResponseModel>>{
    const uuid = await this.uuidForName(username);
    return _simpleGet<Array<NameHistoryResponseModel>>('/user/profiles/' + encodeURIComponent(uuid) + '/names');
}

/**
 * Get the username for a uuid.
 * @param {string} uuid
 * @returns {string} username
 */
export async function nameForUuid(uuid: string){
    const response = await profileForUuid(uuid);
    return response.name
}

/**
 * ResponseModel for a Profile request to the MinecraftAPI
 */
export interface ProfileResponseModel {
    id: string,
    name: string,
    properties : Array<Object>
}

/**
 * Returns the Profile for a given uuid
 * @param {string} uuid
 * @returns {Promise<ProfileResponseModel>}
 */
export async function profileForUuid(uuid : string) : Promise<ProfileResponseModel>{
    return (await Axios.get('https://sessionserver.mojang.com/session/minecraft/profile/' + encodeURIComponent(uuid))).data as ProfileResponseModel;
}
