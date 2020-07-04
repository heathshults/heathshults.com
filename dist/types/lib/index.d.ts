declare function _exports(options: any): Function;
declare namespace _exports {
    export { fileFactory };
    export { processNested };
}
export = _exports;
declare const fileFactory: (options: any, fileUploadOptions?: {}) => {
    name: any;
    data: any;
    size: any;
    encoding: any;
    tempFilePath: any;
    truncated: any;
    mimetype: any;
    md5: any;
    mv: (filePath: any, callback: any) => any;
};
declare const processNested: (data: any) => {};
