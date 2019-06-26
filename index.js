const path = require("path");
const {writeFile} = require("fs");
const openType = require("opentype.js");

// This separates all of the different sub-paths to their own lines, which can
// make text-editing the SVG much easier.
const formatPath = ({path, indent = ""}) => (
    path.replace(/Z/g, "Z\n" + indent).trim()
);

const svgTemplate = (path) => `<?xml version="1.0" encoding="UTF-8" standalone="no" ?>
<!-- This file was auto-generated. Copy your changes to a new file. -->
<svg
    width="512"
    height="512"
    viewBox="0 0 2048 2048"
    xmlns="http://www.w3.org/2000/svg"
>
<g transform="scale(1, -1) translate(0, -2048)">
    <path
        d="
            ${formatPath({path, indent: "            "})}
        "
    />
</g>
</svg>
`;

function outDir(fileName) {
    return path.join(__dirname, "svg", fileName)
}

function writeGlyphs(fontData) {
    return function writeGlyphsFromData([name, number]) {
        const path = merida.glyphs.get(number).path.toPathData();
        const svg = svgTemplate(path);
        const fileName = outDir(name + ".svg");
        function logger(err) {
            if (err) {
                throw err
            };
            console.log("Generated: " + fileName)
        }
        writeFile(fileName, svg, logger)
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
const merida = openType.loadSync(filePath)
Object.entries(glyphs).forEach(writeGlyphs(merida));