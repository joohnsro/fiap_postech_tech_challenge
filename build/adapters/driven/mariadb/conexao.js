"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mariadb_1 = __importDefault(require("mariadb"));
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield mariadb_1.default.createConnection({
        host: process.env.NODE_ENV ? 'localhost' : 'mariadb',
        port: 3306,
        database: 'tech_challenge',
        user: 'admin',
        password: 'OTIsxb71HcC0WyA1UPNIzcvuMJ1Xu6NJ',
        insertIdAsNumber: true
    });
});
