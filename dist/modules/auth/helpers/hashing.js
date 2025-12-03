"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
const bcrypt = require("bcrypt");
const hash = async (input) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(input, salt);
};
exports.hash = hash;
const compare = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
exports.compare = compare;
