declare function _exports(options: any, fieldname: any, filename: any): {
    dataHandler: (data: any) => void;
    getFilePath: () => string;
    getFileSize: () => number;
    getHash: () => string;
    complete: () => Buffer;
    cleanup: () => void;
};
export = _exports;
