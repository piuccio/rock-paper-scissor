Rock paper scissor

# The rules

Rock paper scissor is a game played between two or more players, in which each player simultaneously selects a shape. The basic version has 3 shapes but the game can be extended with any number of shapes.

## Winning

- "rock crushes scissors", a player who plays rock wins against the player who chooses scissors
- "scissors cuts paper", scissors wins against paper
- "paper cover rocks", paper winds agains rock

If all players choose the same shape, the game is tied and repeated.

If there are more than two players, each selects a shape, players whose shape does not win against any other player are eliminated from the game until there's one winner

## Players

The game can be played as

- human vs computer (any number)
- computer vs computer (any number)

* More than two players might not be implemented yet


# How to play

## Set up

Clone the repo and run `npm install`

## Start the game

* `npm start`
* Visit `http://localhost:5000`


# Development

The code is not using any external dependency or library except for a ES6 transpiler.

* `npm start` to tweak the UI, serves static files in `client`
* `npm run dev` runs karma test runner and waits for your browser to connect for JS unit tests
