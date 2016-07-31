import { intersect } from '../lib/array';

const standard = {
    'rock': {
        looses: {
            'paper': 'paper covers rock'
        }
    },
    'paper': {
        looses: {
            'scissors': 'scissors cut paper'
        }
    },
    'scissors': {
        looses: {
            'rock': 'rock crushes scissors'
        }
    }
};

function createRules (definition) {
    return {
        options () {
            return Object.keys(definition);
        },
        winner (...choices) {
            // Filter out all players that loose agains someone
            const results = choices.map(function(value, position) {
                const looses = Object.keys(definition[value].looses);
                const others = choices.slice(0, position).concat(choices.slice(position + 1));
                const beatedBy = intersect(others, looses);

                if (beatedBy.length > 0) {
                    return {
                        loose: beatedBy.map(against => definition[value].looses[against]),
                        position: position
                    };
                } else {
                    return {
                        loose: false,
                        position: position
                    };
                }
            });
            const winners = results.filter(result => result.loose === false);

            if (winners.length === 0) {
                // In a way or another they all eliminated each other
                return {
                    winner: -1,
                    tieBreakers: results.map(result => result.position),
                    results
                };
            } else if (winners.length === 1) {
                // Congratulations
                return {
                    winner: winners[0].position,
                    tieBreakers: [],
                    results
                };
            } else {
                // Players who never lost are in a tie
                return {
                    winner: -1,
                    tieBreakers: winners.map(result => result.position),
                    results
                };
            }
        }
    };
}

const standardRules = createRules(standard);
export {
    standardRules
};
