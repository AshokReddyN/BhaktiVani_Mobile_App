// Polyfill for ReadableStream for Node.js 16
if (typeof globalThis.ReadableStream === 'undefined') {
  const { ReadableStream } = require('web-streams-polyfill');
  globalThis.ReadableStream = ReadableStream;
}

if (typeof globalThis.WritableStream === 'undefined') {
  const { WritableStream } = require('web-streams-polyfill');
  globalThis.WritableStream = WritableStream;
}

if (typeof globalThis.TransformStream === 'undefined') {
  const { TransformStream } = require('web-streams-polyfill');
  globalThis.TransformStream = TransformStream;
}
