import keysTransformer from 'ts-transformer-keys/transformer';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';

import {ENVS} from '../assets/env';

export default {
    client: {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            ENVS.__DEV__ && ({
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    plugins: ['react-hot-loader/babel'],
                },
            }),
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: program => ({
                        before: [
                            createStyledComponentsTransformer(),
                            keysTransformer(program),
                        ],
                    }),
                },
            },
        ],
    },

    ssr: {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
            transpileOnly: true,
        },
    },
};
