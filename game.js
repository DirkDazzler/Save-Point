
//GAMESTATE
const gameState = {
    player: {
        main: null,
        coord: [2, 1],

        sprite: 'player_borf',
        portrait: '',
        
        ability1: '',
        ability2: '',
        ability3: '',

        inventory: [],

        moving: false,
        direction: 'S',
        velocityX: 0,
        velocityY: 0,
    },

    menu: {
        mode: 'main',
        buttonPressed: false,
    },

    cardLibrary: ['card_meadow', 'card_meadow', 'card_meadow', 'card_meadow', 'card_meadow', 
                  'card_meadow', 'card_meadow', 'card_meadow', 'card_meadow', 'card_meadow', 
                  'card_forest', 'card_forest', 'card_forest', 'card_forest', 'card_forest', 
                  'card_forest', 'card_forest', 'card_forest', 'card_forest', 'card_forest'],

    //Card: X, Y, card, name, flipped
    cardMap: [[0, 0, '', null, false], [1, 0, '', null, false], [2, 0, '', null, false], [3, 0, '', null, false], [4, 0, '', null, false],
              [0, 1, '', null, false], [1, 1, '', null, false], [2, 1, '', null,  true], [3, 1, '', null, false], [4, 1, '', null, false],
              [0, 2, '', null, false], [1, 2, '', null, false], [2, 2, '', null, false], [3, 2, '', null, false], [4, 2, '', null, false],
              [0, 3, '', null, false], [1, 3, '', null, false], [2, 3, '', null, false], [3, 3, '', null, false], [4, 3, '', null, false]],

    townMap: null,

};

//FONT STYLE
const statsStyle = {
    font: '24px Helvetica',
    fill: '#FFFFFF',
    padding: {x:0, y:0}
};

const abilityStyle = {
    font: '20px Helvetica',
    fill: '#FFFFFF',
    padding: {x:0, y:0}
};

//CARD SETTER
function cardSelect(mapIndex, card) {

    if (mapIndex <= 4) {
        gameState.cards.create(96 + (mapIndex * 176), 96, `${card}`).setDepth(20);
    } else if (mapIndex > 4 && mapIndex <= 9) {
        gameState.cards.create(96 + ((mapIndex - 5)  * 176), 272, `${card}`).setDepth(20);
    } else if (mapIndex > 9 && mapIndex <= 14) {
        gameState.cards.create(96 + ((mapIndex - 10) * 176), 448, `${card}`).setDepth(20);
    } else if (mapIndex > 14 && mapIndex <= 19) {
        gameState.cards.create(96 + ((mapIndex - 15) * 176), 624, `${card}`).setDepth(20);
    }
}

//MAP RANDOMIZER
function mapCreate() {

    let map = [];

    for (let mapFillIndex = 0; mapFillIndex < 20; mapFillIndex++) {
        let mapRoll = Math.floor(Math.random() * (gameState.cardLibrary.length - 1));
        map.push(gameState.cardLibrary[mapRoll]);
    }

    map[7] = 'card_campsite'

    for (let mapIndex = 0; mapIndex < 20; mapIndex++) {
        gameState.cardMap[mapIndex][2] = map[mapIndex];
        switch (map[mapIndex]) {
            case 'card_campsite':
                gameState.cardMap[mapIndex][3] = 'campsite';
                cardSelect(mapIndex, 'card_campsite');
                break;
            case 'card_meadow':
                gameState.cardMap[mapIndex][3] = meadow();
                cardSelect(mapIndex, 'card_meadow');
                break;
            case 'card_forest':
                gameState.cardMap[mapIndex][3] = forest();
                cardSelect(mapIndex, 'card_forest');
                break;
        }
    }
}

//TOWN RANDOMIZER
function townCreate() {

    /*
    let enterIndex = Math.floor(Math.random() * 5);
    let topIndex = Math.floor(Math.random() * 5);
    let bottomIndex = Math.floor(Math.random() * 5);
    let exitIndex = Math.floor(Math.random() * 5);
    let midMatch = false;

    while (enterIndex === topIndex) {
        topIndex = Math.floor(Math.random() * 5);
    }

    while (exitIndex == bottomIndex) {
        bottomIndex = Math.floor(Math.random() * 5);
    }

    if (topIndex === bottomIndex) {
        midMatch = true;
    }
    */

    const mapTown = [[], []];

    for (var mapFillIndex = 0; mapFillIndex < 2; mapFillIndex++) {
        for (var mapFill = 0; mapFill <  3; mapFill++) {
            var mapRoll = Math.floor(Math.random() * 2);
            if (mapRoll === 0) {
                mapTown[mapFillIndex].push(mapTown0);
            } else if (mapRoll === 1) {
                mapTown[mapFillIndex].push(mapTown0);
            }
        }
    }
    
    /*
    mapTown[0][enterIndex] = cubeEnter0;
    mapTown[0][topIndex] = cubeDown0;
    if (midMatch === false) {
        mapTown[1][topIndex] = cubeUp0;
        mapTown[1][bottomIndex] = cubeDown0;
    } else {
        mapTown[1][topIndex] = cubeUpDown0;
    }
    mapTown[2][bottomIndex] = cubeUp0;
    mapTown[2][exitIndex] = cubeExit0;
    */

    mapTown[1][1] = mapTownSt;

    //create blocks
    for (let mapy = 0; mapy < 2; mapy++) {
        for (let mapx = 0; mapx < 3; mapx++) {
            for (let cubey = 0; cubey < 16; cubey++) {
                for (let cubex = 0; cubex < 16; cubex++) {
                    tileSelect(mapTown[mapy][mapx], mapy, mapx, cubey, cubex);
                }
            }
        }
    }
}

function tileSelect(cubeNumber, mapy, mapx, cubey, cubex) {

    switch (cubeNumber[cubey][cubex]) {
        case 10:
            let grassRoll = Math.floor(Math.random() * 10)
            switch (grassRoll) {
                case 0:
                case 1:
                case 2:
                case 3:
                    gameState.townMap.create(16 + (cubex * 32) + (mapx * 512), 16 + (cubey * 32) + (mapy * 512), 'grass').setDepth(110);
                    break;
                case 4:
                case 5:
                    gameState.townMap.create(16 + (cubex * 32) + (mapx * 512), 16 + (cubey * 32) + (mapy * 512), 'grass_flowers').setDepth(110);
                    break;
                case 6:
                case 7:
                    gameState.townMap.create(16 + (cubex * 32) + (mapx * 512), 16 + (cubey * 32) + (mapy * 512), 'grass2').setDepth(110);
                    break;
                case 8:
                    gameState.townMap.create(16 + (cubex * 32) + (mapx * 512), 16 + (cubey * 32) + (mapy * 512), 'grass3').setDepth(110);
                    break;
                case 9:
                    gameState.townMap.create(16 + (cubex * 32) + (mapx * 512), 16 + (cubey * 32) + (mapy * 512), 'grass3_flowers').setDepth(110);
                    break;
            }
            break;
            
        case 99:
            gameState.townMap.create(16 + (cubex * 32) + (mapx * 512), 16 + (cubey * 32) + (mapy * 512), 'grass').setDepth(110);
            gameState.player.townSprite.x = 16 + (cubex * 32) + (mapx * 512)
            gameState.player.townSprite.y = 16 + (cubey * 32) + (mapy * 512)
            break;
    }
}

//MAP CARD FUNCTIONS

function campsite() {
    gameState.testText = 'campsite'
} 

function meadow() {
    gameState.testText = 'meadow'
} 

function forest() {
    gameState.testText = 'forest'
    let townRoll = Math.floor(Math.random() * 4)
    if (townRoll === 1) {
        gameState.cards.create(gameState.player.mapSprite.x, gameState.player.mapSprite.y, 'card_town').setDepth(21);
    }
    //this.scene.launch('TownScene')
} 

//PHASER SETTINGS
const config = {
    width: 1280,
    height: 720,
    backgroundColor: "FF0000",
    scene: [GameScene, TownScene],
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y:0 },
          debug: false
        }
    }
};

const game = new Phaser.Game(config);

const mapTown0  = [[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],]

const mapTownSt = [[10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,99,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
                   [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],]