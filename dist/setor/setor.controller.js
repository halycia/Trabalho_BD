"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetorController = void 0;
const common_1 = require("@nestjs/common");
const setor_service_1 = require("./setor.service");
let SetorController = class SetorController {
    constructor(setorService) {
        this.setorService = setorService;
    }
    async findAll() {
        return await this.setorService.findAllSetores();
    }
    async findOneSetor(id) {
        return this.setorService.findOneSetor(id);
    }
};
exports.SetorController = SetorController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SetorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SetorController.prototype, "findOneSetor", null);
exports.SetorController = SetorController = __decorate([
    (0, common_1.Controller)('setor'),
    __metadata("design:paramtypes", [setor_service_1.SetorService])
], SetorController);
//# sourceMappingURL=setor.controller.js.map