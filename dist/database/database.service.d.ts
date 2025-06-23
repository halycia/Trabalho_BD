export declare class DatabaseService {
    private pool;
    constructor();
    query(text: string, params?: any[]): Promise<any>;
}
