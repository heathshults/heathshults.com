declare const _exports: {
    devtool: string;
    output: {
        filename: string;
    };
    plugins: any[];
    module: {
        loaders: {
            test: RegExp;
            exclude: RegExp;
            loader: string;
            query: {
                presets: string[];
            };
        }[];
    };
    resolve: {
        extensions: string[];
        root: string[];
    };
    stats: {
        colors: boolean;
        modules: boolean;
        reasons: boolean;
        errorDetails: boolean;
    };
};
export = _exports;
