"use strict";
const openType = require("opentype.js");
const path = require("path");
const {pipe} = require("ramda");
const svgPath = require("svgpath");
const {writeFile} = require("fs");

// This separates all of the different sub-paths to their own lines, which can
// make text-editing the SVG much easier.
const formatPath = (indent) => (path) => (
    path.replace(/Z/g, "Z\n" + indent).trim()
);

const path2SVG = (path) => `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<!-- This file was auto-generated. Copy your changes to a new file. -->
<svg
    width="512"
    height="512"
    viewBox="0 0 2048 2048"
    xmlns="http://www.w3.org/2000/svg"
>
<path
    d="
        ${path}
    "
/>
</svg>
`;

function outDir(fileName) {
    return path.join(__dirname, "svg", fileName);
}

function writeGlyphs(fontData) {
    const id2Svg = pipe(
        (number) => fontData.glyphs.get(number).path.toPathData(),
        // Bake the transformations into the path. We're never going to need
        // the pieces upside down or outside the bounding area.
        (data) => svgPath(data).scale(1, -1).translate(0, 2048).toString(),
        formatPath("        "),
        path2SVG
    );
    return function writeGlyphsFromData([name, id]) {
        const fileName = outDir(name + ".svg");
        function logger(err) {
            if (err) {
                throw err;
            }
            console.log("Generated: " + fileName);
        }
        writeFile(fileName, id2Svg(id), logger);
    };
}

// There are several other glyphs, but we're just using the pieces.
const glyphs = {
    whitePawn: 8,
    blackPawn: 9,
    whiteKnight: 10,
    blackKnight: 11,
    whiteBishop: 12,
    blackBishop: 13,
    whiteRook: 14,
    blackRook: 15,
    whiteQueen: 16,
    blackQueen: 17,
    whiteKing: 18,
    blackKing: 19
};
const filePath = path.join(__dirname, "merid_tt", "MERIFONT.TTF");
const merida = openType.loadSync(filePath);
Object.entries(glyphs).forEach(writeGlyphs(merida));