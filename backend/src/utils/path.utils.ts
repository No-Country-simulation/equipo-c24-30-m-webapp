// LIBRARIES
import { dirname, resolve } from "path";

const currentFilePath = __filename;
const currentDir = dirname(currentFilePath);
const rootPath = resolve(currentDir, "../");

export { rootPath };
