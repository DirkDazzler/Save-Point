class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' })
	}

    preload() {
        this.load.image('map_bg', 'map_bg.png');
        this.load.image('map_frame', 'map_frame.png');
        this.load.image('menu_bg', 'menu_bg.png');
        this.load.image('menu_button', 'menu_button.png');
        this.load.image('menu_button_long', 'menu_button_long.png');
        this.load.image('inv_bg', 'inv_bg.png');
        this.load.image('portrait', 'portrait.png');
        this.load.image('ability_icon', 'ability_icon.png');
        this.load.image('item_icon', 'item_icon.png');

        this.load.image('card_campsite', 'card_campsite.png');
        this.load.image('card_meadow', 'card_meadow.png');
        this.load.image('card_forest', 'card_forest.png');
        this.load.image('card_town', 'card_town.png');

        this.load.image('player_borf', 'player_borf.png');

        //this.load.audio('menu', 'menu.wav');
    }
    
    create() {

        //SYSTEM
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        gameState.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        gameState.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        gameState.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        gameState.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        gameState.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        
        //BACKGROUND
        this.bg = this.physics.add.staticGroup();
        this.mapBg = this.bg.create(640, 360, 'map_bg').setDepth(10);
        this.mapFrame = this.bg.create(448, 360, 'map_frame').setDepth(11);
        this.menuBg = this.bg.create(1080, 360, 'menu_bg').setDepth(80);
        this.invBg = this.bg.create(448, 1080, 'inv_bg').setDepth(100);

        this.menuButton1 = this.bg.create(640, 360, 'menu_button').setDepth(81);
        this.menuButton2 = this.bg.create(640, 360, 'menu_button').setDepth(81);
        this.menuButton3 = this.bg.create(640, 360, 'menu_button').setDepth(81);
        this.menuButton4 = this.bg.create(640, 360, 'menu_button').setDepth(81);
        this.menuButton5 = this.bg.create(640, 360, 'menu_button_long').setDepth(81);

        this.portrait = this.bg.create(640, 360, 'portrait').setDepth(81);
        this.invPortrait1 = this.bg.create(640, 360, 'portrait').setDepth(99);
        this.invPortrait2 = this.bg.create(640, 360, 'portrait').setDepth(99);
        this.invPortrait3 = this.bg.create(640, 360, 'portrait').setDepth(99);

        this.abilityIcon1 = this.bg.create(640, 360, 'ability_icon').setDepth(81);
        this.abilityIcon2 = this.bg.create(640, 360, 'ability_icon').setDepth(81);
        this.abilityIcon3 = this.bg.create(640, 360, 'ability_icon').setDepth(81);

        gameState.testText = 'a';

        gameState.cards = this.physics.add.group();

        gameState.player.mapSprite = this.physics.add.sprite(-640, -360, `${gameState.player.sprite}`).setDepth(50);

        /*
        this.menuButton1.setInteractive();
        this.menuButton1.on('pointerdown', function() {
            this.mapBg.setAlpha(0);
        });
        */

        //gameState.menuSound = this.sound.add('menu');

        this.statsText1 = this.add.text(640, 320, 'STA STATS\nSTATS STA', statsStyle).setOrigin(0.5, 0.5).setDepth(81);
        this.statsText2 = this.add.text(640, 320, 'STATS\nSTATS', statsStyle).setOrigin(0.5, 0.5).setDepth(81);
        this.statsText3 = this.add.text(640, 320, 'STATS\nSTATS', statsStyle).setOrigin(0.5, 0.5).setDepth(81);

        this.abilityText1 = this.add.text(640, 320, `${gameState.player.coord[0]}\n${gameState.player.coord[1]}`, statsStyle).setOrigin(0.5, 0.5).setDepth(81);
        this.abilityText2 = this.add.text(640, 320, `${gameState.testText}\n${gameState.player.coordAbs}`, statsStyle).setOrigin(0.5, 0.5).setDepth(81);
        this.abilityText3 = this.add.text(640, 320, 'STATS STATS STATS\nSTATS STATS STATS', statsStyle).setOrigin(0.5, 0.5).setDepth(81);

        mapCreate();
    }

    update() {

        this.abilityText1.text = `${gameState.player.coord[0]}\n${gameState.player.coord[1]}`
        this.abilityText2.text = `${gameState.testText}\n${gameState.player.coordAbs}`;

        //--Left
        if ((gameState.cursors.left.isDown || gameState.keyA.isDown) && !gameState.player.moving) {
            gameState.player.moving = true;
            if (gameState.player.coord[0] > 0) {
                gameState.player.coord[0] -= 1;
            }
        
        //--Right
        } else if ((gameState.cursors.right.isDown || gameState.keyD.isDown) && !gameState.player.moving) {
            gameState.player.moving = true;
            if (gameState.player.coord[0] < 4) {
                gameState.player.coord[0] += 1;
            }

        //--Up
        } else if ((gameState.cursors.up.isDown || gameState.keyW.isDown) && !gameState.player.moving) {
            gameState.player.moving = true;
            if (gameState.player.coord[1] > 0) {
                gameState.player.coord[1] -= 1;
            }
        
        //--Down
        } else if ((gameState.cursors.down.isDown || gameState.keyS.isDown) && !gameState.player.moving) {
            gameState.player.moving = true;
            if (gameState.player.coord[1] < 3) {
                gameState.player.coord[1] += 1;
            }

        //--Neutral
        } else if ((gameState.cursors.left.isUp && gameState.keyA.isUp) && (gameState.cursors.right.isUp && gameState.keyD.isUp) && (gameState.cursors.up.isUp && gameState.keyW.isUp) && (gameState.cursors.down.isUp && gameState.keyS.isUp)) {
            gameState.player.moving = false;
        }
        
        //--Menus 
        if (gameState.keyM.isDown && !gameState.menu.buttonPressed) {
            gameState.menu.buttonPressed = true;
            if (gameState.menu.mode === 'main') {
                gameState.menu.mode = 'none';
            } else {
                gameState.menu.mode = 'main';
            }
        }

        if (gameState.keyI.isDown && !gameState.menu.buttonPressed) {
            gameState.menu.buttonPressed = true;
            if (gameState.menu.mode === 'main' || gameState.menu.mode === 'none') {
                gameState.menu.mode = 'inv';
            } else if (gameState.menu.mode === 'inv'){
                gameState.menu.mode = 'main';
            }
        }

        if (gameState.keyM.isUp && gameState.keyI.isUp) {
            gameState.menu.buttonPressed = false;
        }
        
        gameState.player.coordAbs = gameState.player.coord[0] + (gameState.player.coord[1] * 5)
        gameState.player.mapSprite.x = 96 + (gameState.player.coord[0] * 176);
        gameState.player.mapSprite.y = 96 + (gameState.player.coord[1] * 176);
        
        if (gameState.menu.mode === 'main' || gameState.menu.mode === 'inv') {
            if (this.menuBg.x > 1080) {
                this.menuBg.x -= 4;
            }
        } else {
            if (this.menuBg.x <= 1480) {
                this.menuBg.x += 4;
            }
        }

        if (gameState.menu.mode === 'inv') {
            if (this.invBg.y > 360) {
                this.invBg.y -= 4;
            }
        } else {
            if (this.invBg.y <= 1080) {
                this.invBg.y += 4;
            }
        }

        //Menu rigging
        this.portrait.x = this.menuBg.x - 75;
        this.portrait.y = this.menuBg.y - 136;

        this.statsText1.x = this.menuBg.x + 75;
        this.statsText1.y = this.menuBg.y - 198;

        this.statsText2.x = this.menuBg.x + 75;
        this.statsText2.y = this.menuBg.y - 135;

        this.statsText3.x = this.menuBg.x + 75;
        this.statsText3.y = this.menuBg.y - 73;
        
        this.abilityText1.x = this.menuBg.x + 30;
        this.abilityText1.y = this.menuBg.y + 4;

        this.abilityText2.x = this.menuBg.x + 30;
        this.abilityText2.y = this.menuBg.y + 77;

        this.abilityText3.x = this.menuBg.x + 30;
        this.abilityText3.y = this.menuBg.y + 149;

        this.abilityIcon1.x = this.menuBg.x - 120;
        this.abilityIcon1.y = this.menuBg.y + 4;

        this.abilityIcon2.x = this.menuBg.x - 120;
        this.abilityIcon2.y = this.menuBg.y + 76;

        this.abilityIcon3.x = this.menuBg.x - 120;
        this.abilityIcon3.y = this.menuBg.y + 148;

        this.menuButton1.x = this.menuBg.x - 126;
        this.menuButton1.y = this.menuBg.y + 228;

        this.menuButton2.x = this.menuBg.x - 42;
        this.menuButton2.y = this.menuBg.y + 228;

        this.menuButton3.x = this.menuBg.x + 42;
        this.menuButton3.y = this.menuBg.y + 228;

        this.menuButton4.x = this.menuBg.x + 126;
        this.menuButton4.y = this.menuBg.y + 228;

        this.menuButton5.x = this.menuBg.x;
        this.menuButton5.y = this.menuBg.y + 298;

        //Inventory rigging
        this.invPortrait1.x = this.invBg.x - 225;
        this.invPortrait1.y = this.invBg.y - 136;

        this.invPortrait2.x = this.invBg.x - 1;
        this.invPortrait2.y = this.invBg.y - 136;

        this.invPortrait3.x = this.invBg.x + 223;
        this.invPortrait3.y = this.invBg.y - 136;

        if (!gameState.cardMap[gameState.player.coordAbs][4]) {
            gameState.cardMap[gameState.player.coordAbs][4] = true;
            switch (gameState.cardMap[gameState.player.coordAbs][2]) {
                case 'card_campsite':
                    campsite();
                    break;
                case 'card_meadow':
                    meadow();
                    break;
                case 'card_forest':
                    forest();
                    break;
            }
        }
    }
}