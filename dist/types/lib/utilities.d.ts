/**
 * Logs message to console if debug option set to true.
 * @param {Object} options - options object.
 * @param {String} msg     - message to log.
 * @returns {Boolean}
 */
export function debugLog(options: any, msg: string): boolean;
/**
 * Returns true if argument is a function.
 * @returns {Boolean}
 */
export function isFunc(func: any): boolean;
/**
 * Set errorFunc to the same value as successFunc for callback mode.
 * @returns {Function}
 */
export function errorFunc(resolve: any, reject: any): Function;
/**
 * Return a callback function for promise resole/reject args.
 * @returns {Function}
 */
export function promiseCallback(resolve: any, reject: any): Function;
/**
 * Builds instance options from arguments objects(can't be arrow function).
 * @returns {Object} - result options.
 */
export function buildOptions(...args: any[]): any;
/**
 * Builds request fields (using to build req.body and req.files)
 * @param {Object} instance - request object.
 * @param {String} field    - field name.
 * @param value             - field value.
 * @returns {Object}
 */
export function buildFields(instance: any, field: string, value: any): any;
/**
 * Creates a folder for file specified in the path variable
 * @param {Object} fileUploadOptions
 * @param {String} filePath
 * @returns {Boolean}
 */
export function checkAndMakeDir(fileUploadOptions: any, filePath: string): boolean;
/**
 * Delete file.
 * @param {String} file - Path to the file to delete.
 */
export function deleteFile(file: string, callback: any): void;
/**
 * Copy file via streams
 * @param {String} src - Path to the source file
 * @param {String} dst - Path to the destination file.
 */
export function copyFile(src: string, dst: string, callback: any): void;
/**
 * Move file via streams by copieng and the deleteing src.
 * @param {String}   src      - Path to the source file
 * @param {String}   dst      - Path to the destination file.
 * @param {Function} callback - A callback function.
 */
export function moveFile(src: string, dst: string, callback: Function): void;
/**
 * Save buffer data to a file.
 * @param {Buffer} buffer - buffer to save to a file.
 * @param {String} filePath - path to a file.
 */
export function saveBufferToFile(buffer: Buffer, filePath: string, callback: any): any;
/**
 * Parse file name and extension.
 * @param opts {Object}     - middleware options.
 * @param fileName {String} - Uploaded file name.
 * @returns {String}
 */
export function parseFileName(opts: any, fileName: string): string;
/**
 * Generates unique temporary file name like: tmp-5000-156788789789.
 * @param prefix {String} - a prefix for generated unique file name.
 * @returns {String}
 */
export function getTempFilename(prefix: string): string;
/**
 * Decodes uriEncoded file names.
 * @param fileName {String} - file name to decode.
 * @returns {String}
 */
export function uriDecodeFileName(opts: any, fileName: string): string;
