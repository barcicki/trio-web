# Trio

Completely rewritten version of my [Trio](https://github.com/barcicki/Trio) Android game.
This version is dedicated to work in browsers - on both desktops and mobiles.

## Live version

Available at **[triogame.fun](https://triogame.fun)**

## Game rules

*Basic games rules are based on the game of Set.*

There are 81 tiles in the game, each one has 4 different features with 3 variants per feature. The goal of the game is to find **trios** - three tiles where each feature is either **shared** or **unique**.

### Game modes

#### Single game

The goal is to find all trios in a shuffled deck of 81 unique tiles. The game starts with 12 tiles visible. When trio is found, selected 3 tiles are replaced with new ones from the deck. The game makes sure that at least 1 trio is available on the screen - sometimes it would mean that additional tiles needs to be drawn from the deck. The game ends when deck runs out of card and there are no more trios to be found on the screen.

#### Puzzle

The screen contains exactly 12 tiles with exactly 3 hidden trios - find them as soon as possible.

#### Practice

In this mode you can practice completing trios. The game randomly selects 2 tiles from the deck and then presents you 6 possible choices. Only one of them is right.

## Development

This repository is a [React](http://react.dev/)-based application supported by [Vite](https://vitejs.dev/) tooling.

Install Node.js and project dependencies with `npm install` command. 

Use:
* `npm run dev` - to start dev server with the game
* `npm run build` - to build final deliverables to publish to server (use `npm run preview` to check locally)
* `npm test` - to run unit tests

## License

Licensed under the Apache License, Version 2.0 modified with Commons Clause Restriction
