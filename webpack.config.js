module.exports = {
    entry: {
        app: './src/main.ts',
    },
    output: {
        path: __dirname + './dist',
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: ['ts-loader']
            },
            // {
            //     test: /\.ts?$/,
            //     loaders: ['ts-loader']
            // },
        ]
    }
}