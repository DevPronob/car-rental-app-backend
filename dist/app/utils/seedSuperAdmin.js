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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSuperAdmin = void 0;
const user_model_1 = require("../modules/user/user.model");
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;
        console.log(email, password);
        const isAdminExist = yield user_model_1.User.findOne({ email: email });
        if (isAdminExist) {
            console.log('Admin Already Created');
            return;
        }
        const userData = {
            name: 'Admin',
            email: email,
            password: password,
            role: 'ADMIN',
        };
        const superAdminCreated = yield user_model_1.User.create(userData);
        console.log('Super Admin Created Successfuly! \n');
        console.log(superAdminCreated);
    }
    catch (error) {
        console.log(error);
    }
    console.log('admin');
});
exports.seedSuperAdmin = seedSuperAdmin;
