export interface UuidResponseModel {
    id: string;
    name: string;
}
export declare function uuidForNameAt(username: string, time: number): Promise<string>;
export declare function uuidForName(username: string): Promise<string>;
export declare function uuidForNames(names: Array<string>): Promise<UuidResponseModel[]>;
export interface NameHistoryResponseModel {
    name: string;
    changedTo: string | null;
}
export declare function nameHistoryForUuid(uuid: string): Promise<Array<NameHistoryResponseModel>>;
export declare function nameHistoryForName(username: string): Promise<Array<NameHistoryResponseModel>>;
export interface ProfileResponseModel {
    id: string;
    name: string;
    properties: Array<Object>;
}
export declare function profileForUuid(uuid: string): Promise<ProfileResponseModel>;
