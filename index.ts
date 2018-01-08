import request = require("request");

async function _simpleGet<T>(url: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        request(url, {json: true}, function (err, res, body) {
            if (typeof body === 'undefined') {
                reject(new Error('body is undefined'));
                return
            }

            if (body.error) {
                reject(new Error(body.error + ": " + body.errorMessage));
                return
            }

            resolve(body);
        });
    })
}

async function _simplePost<T>(url: string, array : Array<string>): Promise<Array<T>> {
    return new Promise<Array<T>>((resolve, reject) => {
        request.post(url, {json: true, body : array }, function (err, res, body) {
            if (typeof body === 'undefined') {
                reject(new Error('body is undefined'));
                return
            }

            if (body.error) {
                reject(new Error(body.error + ": " + body.errorMessage));
                return
            }

            resolve(body);
        });
    })
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
 * @returns {Promise<UuidResponseModel>}
 */
export async function uuidAt(username: string, time: number){
    const response = await _simpleGet<UuidResponseModel>('https://api.mojang.com/users/profiles/minecraft/' + encodeURIComponent(username) + '?at=' + time);
    return response.id
}

/**
 * Get the uuid for a username.
 * @param {string} username
 * @returns {Promise<UuidResponseModel>}
 */
export async function uuidFromName(username: string){
    const response = await _simpleGet<UuidResponseModel>('https://api.mojang.com/users/profiles/minecraft/' + encodeURIComponent(username) + '?at=' + Date.now());
    return response.id
}

/**
 * Return a Array of uuids matched to the given usernames
 * @param {Array<string>} names
 * @returns {Promise<Array<UuidResponseModel>>}
 */
export async function uuidFromNames(names : Array<string>){
    return _simplePost<UuidResponseModel>('https://api.mojang.com/profiles/minecraft', names);
}

/**
 * ResponseModel for a NameHistory request to the MinecraftAPI
 */
export interface NameHistoryResponseModel {
    name: string,
    changedTo: string|null
}

/**
 * Returns the NameHistory for a given UUID
 * @param {string} uuid
 * @returns {Promise<Array<NameHistoryResponseModel>>}
 */
export async function nameHistoryForUuid(uuid : string) : Promise<Array<NameHistoryResponseModel>>{
    return _simpleGet<Array<NameHistoryResponseModel>>('https://api.mojang.com/user/profiles/' + encodeURIComponent(uuid) + '/names');
}

/**
 * Returns the NameHistory for a given Username
 * @param {string} username
 * @returns {Promise<Array<NameHistoryResponseModel>>}
 */
export async function nameHistoryForName(username : string) : Promise<Array<NameHistoryResponseModel>>{
    const uuid = await this.uuid(username);
    return _simpleGet<Array<NameHistoryResponseModel>>('https://api.mojang.com/user/profiles/' + encodeURIComponent(uuid) + '/names');
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
export async function profile(uuid : string) : Promise<ProfileResponseModel>{
    return _simpleGet<ProfileResponseModel>('https://sessionserver.mojang.com/session/minecraft/profile/' + encodeURIComponent(uuid));
}