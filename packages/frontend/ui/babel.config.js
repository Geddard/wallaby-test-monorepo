module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
  plugins: [
    'inline-import-data-uri',
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          '@/config': ['./src/config.ts'],
          '@/components': ['./src/components/*'],
        },
      },
    ],
  ],
}
