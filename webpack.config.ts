import * as webpack from 'webpack';
import { resolve } from 'path';
import { sync } from 'glob';

/** ビルド対象ルートディレクトリ */
const SRC_PATH = './src/functions';
/** entryとなるファイル名 */
const ENTRY_NAME = 'index.ts';
/** ビルド結果出力先 */
const DIST_PATH = resolve(__dirname, './dist');
/** ビルド種別 */
const NODE_ENV = process.env.NODE_ENV;

/**
 * ビルド対象のentryを解決する
 * @returns {webpack.Entry} entry
 */
const resolveEntry = (): webpack.Entry => {
  const entries: { [key: string]: string } = {};
  const targets: string[] = sync(`${SRC_PATH}/**/${ENTRY_NAME}`);
  const pathRegex = new RegExp(`${SRC_PATH}/(.+?)/${ENTRY_NAME}`);
  targets.forEach((value: string) => {
    let key: string = value;
    switch (NODE_ENV) {
      case 'production':
        key = value.replace(pathRegex, 'prd_$1/index');
        break;
      case 'development':
        key = value.replace(pathRegex, 'dev_$1/index');
        break;
    }
    entries[key] = value;
  });
  return entries;
};

const config: webpack.Configuration = {
  target: 'node',
  mode: NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  entry: resolveEntry(),
  output: {
    filename: '[name].js',
    path: DIST_PATH,
    library: '[name]',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
};

export default config;
