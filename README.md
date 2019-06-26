# Mérida SVG

This takes the Mérida TTF file and extracts the chess-piece glyphs to SVG paths. It's a quick-and-dirty script and applies minimal formatting to the SVG output. 

## 🏁 Getting Started

### Prerequisites

You'll need [Node.js](https://nodejs.org/) version 10. It probably runs on other versions too, but it's not tested on them.

### Installing

#### 1: Grab the code

For most people, the easiest method is to click the "Clone or Download" button on [this project's GitHub homepage](https://github.com/johnridesabike/merida-svg).

If you have Git installed, you can also run:
```
git clone https://github.com/johnridesabike/merida-svg.git
```

If you want to make your own changes, then it's recommended to fork the repository on GitHub and clone your forked version.

#### 2: Install the dependencies

Run this command in the project's directory to install its dependencies:
```
npm install
```

## 🎈 Usage

This repository includes the SVG output already, so you can grab the code in the `svg` directory if that's all you need.

You can generate fresh SVGs with the following command:
```
npm run build
```

The output will be in the `svg` directory.

## ⛏️ Built Using

- [Node.js](https://nodejs.org/)
- [opentype.js](https://opentype.js.org/)

## ✍️ Authors

- [@johnridesabike](https://github.com/johnridesabike)

## ⚖️ License

This code is MIT licensed.

The original Merida font, which is located in the `merid_tt` directory, was informally licensed as "freeware."