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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let UserService = class UserService {
    constructor(db) {
        this.db = db;
    }
    async findUserByEmail(email) {
        const result = await this.db.query('SELECT * FROM usuario WHERE email = $1', [email]);
        return result.rows[0] ?? null;
    }
    async findUserByUsername(username) {
        const result = await this.db.query('SELECT * FROM usuario WHERE username = $1', [username]);
        return result.rows[0] ?? null;
    }
    async createUser(novoUsuario) {
        const UserEmail = await this.findUserByEmail(novoUsuario.email);
        if (UserEmail) {
            throw new common_1.ConflictException('Email já cadastrado');
        }
        const UserUsername = await this.findUserByUsername(novoUsuario.username);
        if (UserUsername) {
            throw new common_1.ConflictException('Nome de usuário em uso');
        }
        const result = await this.db.query(`INSERT INTO usuario (email, username, nome, senha, telefone)
       VALUES ($1, $2, $3, $4, $5)`, [novoUsuario.email, novoUsuario.username, novoUsuario.nome,
            novoUsuario.senha, novoUsuario.telefone ?? null]);
        return result.rows[0];
    }
    async findAllUsers() {
        const result = await this.db.query('SELECT * FROM usuario');
        return result.rows;
    }
    async updateUser(email, updates) {
        const fields = [];
        const values = [];
        let paramIndex = 1;
        if (updates.email) {
            const UserEmail = await this.findUserByEmail(updates.email);
            if (UserEmail) {
                throw new common_1.ConflictException('Email já cadastrado');
            }
        }
        if (updates.username) {
            const UserUsername = await this.findUserByUsername(updates.username);
            if (UserUsername) {
                throw new common_1.ConflictException('Nome de usuário em uso');
            }
        }
        for (const [key, value] of Object.entries(updates)) {
            if (value !== undefined) {
                fields.push(`${key} = $${paramIndex++}`);
                values.push(value);
            }
        }
        if (fields.length === 0) {
            throw new common_1.BadRequestException('Nenhum dado informado para atualização');
        }
        values.push(email);
        try {
            const userUpdated = await this.findUserByEmail(email);
            if (!userUpdated) {
                throw new common_1.NotFoundException(`Usuário com email ${email} não encontrado`);
            }
            const result = await this.db.query(`UPDATE usuario SET ${fields.join(', ')} WHERE email = $${paramIndex}`, values);
            return result.rows[0];
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Atualização falhou');
        }
    }
    async deleteUser(email) {
        const result = await this.db.query('DELETE FROM usuario WHERE email = $1', [email]);
        const deletedUser = result.rows[0];
        if (!deletedUser) {
            return null;
        }
        return { deletedUser };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UserService);
//# sourceMappingURL=user.service.js.map