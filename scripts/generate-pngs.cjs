const fs = require('fs');
const zlib = require('zlib');

function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function makePng(width, height) {
  // Signature
  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit depth
  ihdrData.writeUInt8(6, 9); // RGBA
  ihdrData.writeUInt8(0, 10); // deflate
  ihdrData.writeUInt8(0, 11); // filter
  ihdrData.writeUInt8(0, 12); // no interlace

  const ihdr = makeChunk('IHDR', ihdrData);

  // Scanlines with filter byte 0
  const rowLen = 1 + width * 4;
  const rawData = Buffer.alloc(rowLen * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.44;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowLen;
    rawData[rowOffset] = 0; // Filter None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Rounded rect or circle background
      // Check if inside central cross
      const crossW = width * 0.12;
      const crossL = width * 0.50;
      const inVBar = Math.abs(dx) <= crossW / 2 && Math.abs(dy) <= crossL / 2;
      const inHBar = Math.abs(dy) <= crossW / 2 && Math.abs(dx) <= crossL / 2;
      const inCross = inVBar || inHBar;
      const inCenterCircle = dist <= width * 0.08;

      if (inCenterCircle) {
        // White center
        rawData[pxOffset] = 255;
        rawData[pxOffset + 1] = 255;
        rawData[pxOffset + 2] = 255;
        rawData[pxOffset + 3] = 255;
      } else if (inCross) {
        // Terracotta #EC5B38 (236, 91, 56)
        rawData[pxOffset] = 236;
        rawData[pxOffset + 1] = 91;
        rawData[pxOffset + 2] = 56;
        rawData[pxOffset + 3] = 255;
      } else if (Math.abs(dist - radius * 0.82) <= width * 0.02) {
        // Terracotta accent ring
        rawData[pxOffset] = 236;
        rawData[pxOffset + 1] = 91;
        rawData[pxOffset + 2] = 56;
        rawData[pxOffset + 3] = 220;
      } else {
        // Dark background #181514 (24, 21, 20)
        rawData[pxOffset] = 24;
        rawData[pxOffset + 1] = 21;
        rawData[pxOffset + 2] = 20;
        rawData[pxOffset + 3] = 255;
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idat = makeChunk('IDAT', compressed);
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdr, idat, iend]);
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(8 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.slice(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

fs.writeFileSync('public/pwa-192x192.png', makePng(192, 192));
fs.writeFileSync('public/pwa-512x512.png', makePng(512, 512));
fs.writeFileSync('public/apple-touch-icon.png', makePng(180, 180));
console.log('PNG icons created successfully!');
