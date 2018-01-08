/**
 * ResponseModel for a UUID request to the MinecraftAPI
 */
export interface UuidResponseModel {
    id: string;
    name: string;
}
/**
 * Return the uuid matching the Username at a given time.
 * @param {string} username
 * @param {number} time
 * @returns {Promise<UuidResponseModel>}
 */
export declare function uuidAt(username: string, time: number): Promise<string>;
/**
 * Get the uuid for a username.
 * @param {string} username
 * @returns {Promise<UuidResponseModel>}
 */
export declare function uuidFromName(username: string): Promise<string>;
/**
 * Return a Array of uuids matched to the given usernames
 * @param {Array<string>} names
 * @returns {Promise<Array<UuidResponseModel>>}
 */
export declare function uuidFromNames(names: Array<string>): Promise<UuidResponseModel[]>;
/**
 * ResponseModel for a NameHistory request to the MinecraftAPI
 */
export interface NameHistoryResponseModel {
    name: string;
    changedTo: string | null;
}
/**
 * Returns the NameHistory for a given UUID
 * @param {string} uuid
 * @returns {Promise<Array<NameHistoryResponseModel>>}
 */
export declare function nameHistoryForUuid(uuid: string): Promise<Array<NameHistoryResponseModel>>;
/**
 * Returns the NameHistory for a given Username
 * @param {string} username
 * @returns {Promise<Array<NameHistoryResponseModel>>}
 */
export declare function nameHistoryForName(username: string): Promise<Array<NameHistoryResponseModel>>;
/**
 * ResponseModel for a Profile request to the MinecraftAPI
 */
export interface ProfileResponseModel {
    id: string;
    name: string;
    properties: Array<Object>;
}
/**
 * Returns the Profile for a given uuid
 * @param {string} uuid
 * @returns {Promise<ProfileResponseModel>}
 */
export declare function profile(uuid: string): Promise<ProfileResponseModel>;
