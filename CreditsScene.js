class BootScene extends Phaser.Scene {
	constructor() {
		super({ key: 'BootScene' })
	}

    preload() {
        this.load.image('credits_bg', 'credits_bg.png');
        this.load.image('credits_dot', 'credits_dot.png');
        //this.load.audio('menu', 'menu.wav');
    }
    
    create() {

        //SYSTEM
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        gameState.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        
        //BACKGROUND
        gameState.bg = this.physics.add.staticGroup();
        gameState.creditsBg = gameState.bg.create(640, 256, 'credits_bg');
        gameState.muteButton = gameState.bg.create(160, 80, 'credits_dot').setAlpha(0);
        gameState.paletteButton = gameState.bg.create(1048, 80, 'credits_dot');
        //gameState.menuSound = this.sound.add('menu');
    }

    update() {
        

        //MUTE
        if (gameState.keyM.isDown && gameState.muteButtonDown === false) {
            gameState.muteButtonDown = true;
            if (!gameState.mute) {
                gameState.mute = true;
            } else if (gameState.mute) {
                gameState.mute = false;
            }
        }

        if (gameState.mute) {
            gameState.muteButton.setAlpha(1);
            gameState.titleIntro.setVolume(0);
            gameState.titleMusic.setVolume(0);
        } else {
            gameState.muteButton.setAlpha(0);
            gameState.titleIntro.setVolume(1);
            gameState.titleMusic.setVolume(1);
        }
         
        //PALETTE
        if (gameState.keyP.isDown && gameState.paletteButtonDown === false) {
            gameState.paletteButtonDown = true;
            if (gameState.palette === 1) {
                gameState.palette = 2;
            } else if (gameState.palette === 2) {
                gameState.palette = 3;
            } else if (gameState.palette === 3) {
                gameState.palette = 1;
            }
        }
        
        if (gameState.palette === 1) {
            gameState.paletteButton.x = 1048;
            gameState.color = 0xDAA520
        } else if (gameState.palette === 2) {
            gameState.paletteButton.x = 1120;
            gameState.color = 0xEE145B
        } else if (gameState.palette === 3) {
            gameState.paletteButton.x = 1192;
            gameState.color = 0xFFFFFF
        }

        gameState.creditsBg.setTint(gameState.color)

        //NEXT
        if (gameState.cursors.space.isDown && gameState.menuButtonDown === false) {
            //gameState.menuSound.play();
            gameState.menuButtonDown = true;
            gameState.invulnTimer = 0;
            gameState.titleIntro.stop();
            gameState.titleMusic.stop();
            this.scene.start('GameScene');
        }

        if (gameState.cursors.space.isUp) {
            gameState.menuButtonDown = false;
        }

        if (gameState.keyM.isUp) {
            gameState.muteButtonDown = false;
        }

        if (gameState.keyP.isUp) {
            gameState.paletteButtonDown = false;
        }
    }
}