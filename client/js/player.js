export function createPlayer ({
    name, isHuman
}) {
    return {
        name,
        isHuman,
        choose: isHuman ? humanChoose : computerChoose
    };
}

function humanChoose () {

}

function computerChoose () {

}
