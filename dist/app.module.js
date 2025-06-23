"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_service_1 = require("./database/database.service");
const database_module_1 = require("./database/database.module");
const database_controller_1 = require("./database/database.controller");
const user_module_1 = require("./user/user.module");
const setor_module_1 = require("./setor/setor.module");
const campus_module_1 = require("./campus/campus.module");
const prato_module_1 = require("./prato/prato.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            database_module_1.DatabaseModule, user_module_1.UserModule, setor_module_1.SetorModule, campus_module_1.CampusModule, prato_module_1.PratoModule
        ],
        controllers: [app_controller_1.AppController, database_controller_1.TestController],
        providers: [app_service_1.AppService, database_service_1.DatabaseService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map