const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add polyfill for ReadableStream for Node.js compatibility
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;
