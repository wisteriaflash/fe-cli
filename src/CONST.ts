import path from 'path';


const isProd = Boolean(process.env.NODE_ENV === 'prod');

// 根目录路径
export const ROOT_PATH = path.resolve(process.cwd());
