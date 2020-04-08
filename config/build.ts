import fs from 'fs-extra';
import path from 'path'
//
import { ROOT_PATH } from '../src/CONST';
const outPath = path.resolve(ROOT_PATH, 'lib');

// clear
fs.removeSync(outPath);
fs.mkdir(outPath);

// copy
const copyPath = path.resolve(ROOT_PATH, 'src/templates/')
const targetPath = path.resolve(ROOT_PATH, 'lib/templates/')
fs.copySync(copyPath, targetPath);
