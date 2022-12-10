module.exports = {
  plugins: [
    'babel-plugin-styled-components',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-object-rest-spread',
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
  ],
  presets: ['@babel/preset-env', '@babel/preset-react'],
}
