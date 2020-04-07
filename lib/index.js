#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var figlet_1 = __importDefault(require("figlet"));
var clear_1 = __importDefault(require("clear"));
var commander_1 = __importDefault(require("commander"));
// 
clear_1.default();
console.log(chalk_1.default.red(figlet_1.default.textSync('fe-cli', { horizontalLayout: 'full' })));
commander_1.default
    .version('0.0.1')
    .description('An fe cli for improve development efficiency')
    .option('-l, --list', 'List')
    .parse(process.argv);
