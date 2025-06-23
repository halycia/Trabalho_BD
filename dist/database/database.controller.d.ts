import { DatabaseService } from './database.service';
export declare class TestController {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    testConnection(): Promise<{
        success: boolean;
        time: any;
        message?: undefined;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        time?: undefined;
    }>;
}
