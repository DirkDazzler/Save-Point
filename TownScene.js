class TownScene extends Phaser.Scene {
	constructor() {
		super({ key: 'TownScene' })
	}

    preload() {
        this.load.image('grass', 'grass.png');
        this.load.image('grass_flowers', 'grass_flowers.png');
        this.load.image('grass2', 'grass2.png');
        this.load.image('grass3', 'grass3.png');
        this.load.image('grass3_flowers', 'grass3_flowers.png');
        this.load.image('rock', 'rock.png');
        this.load.image('rock2', 'rock2.png');

        this.load.image('frame', 'frame.png');
        this.load.image('player_borf', 'player_borf.png');

        //this.load.audio('menu', 'menu.wav');
    }
    
    create() {

        gameState.player.moving = false;

        gameState.townMap = null;
        gameState.townMap = this.physics.add.staticGroup();
        this.bg = this.physics.add.staticGroup();
        this.ui = this.physics.add.staticGroup();

        gameState.testText = this.add.text(640, 100, '', statsStyle).setOrigin(0.5, 0.5).setDepth(181);
        this.frame = this.ui.create(540, 320, 'frame').setDepth(200);;
        
        gameState.player.townSprite = this.physics.add.sprite(640, 360, `${gameState.player.sprite}`).setDepth(150);
        gameState.player.townSprite.setInteractive();

        townCreate();
        
        //SYSTEM
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        gameState.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        gameState.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        gameState.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        gameState.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        gameState.keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

        this.bg = this.physics.add.staticGroup();

        //CAMERA
        this.physics.world.setBounds(0, 0, 1536, 1024);
        this.cameras.main.setBounds(0, 0, 1536, 1024).setViewport(0, 0, 1080, 640);
        this.cameras.main.x = 40;
        this.cameras.main.y = 40;
        this.cameras.main.startFollow(this.frame, true);
        gameState.player.townSprite.setCollideWorldBounds(true);

    }

    update() {

        gameState.testText.text = `${gameState.player.direction}`

        if (gameState.player.townSprite.x <= 540) {
            this.frame.x = 540;
        } else if (gameState.player.townSprite.x >= 996) {
            this.frame.x = 996;
        } else {
            this.frame.x = gameState.player.townSprite.x;
        }

        if (gameState.player.townSprite.y <= 320) {
            this.frame.y = 320;
        } else if (gameState.player.townSprite.y >= 704) {
            this.frame.y = 704;
        } else {
            this.frame.y = gameState.player.townSprite.y;
        }
        
        //--Left
        if (gameState.cursors.left.isDown || gameState.keyA.isDown) {
            gameState.player.moving = true;
            gameState.player.direction = 'W';
            if (gameState.player.velocityX > -200) {
                gameState.player.velocityX -= 20;
            }
        
        //--Right
        } else if (gameState.cursors.right.isDown || gameState.keyD.isDown) {
            gameState.player.moving = true;
            gameState.player.direction = 'E';
            if (gameState.player.velocityX < 200) {
                gameState.player.velocityX += 20;
            }       

        //--Up
        } else if (gameState.cursors.up.isDown || gameState.keyW.isDown) {
            gameState.player.moving = true;
            gameState.player.direction = 'N';
            if (gameState.player.velocityY > -200) {
                gameState.player.velocityY -= 20;
            }       
        
        //--Down
        } else if (gameState.cursors.down.isDown || gameState.keyS.isDown) {
            
            gameState.player.direction = 'S';
            if (gameState.player.velocityY < 200) {
                gameState.player.velocityY += 20;
            }       
            
        //--Neutral
        } else if ((gameState.cursors.left.isUp && gameState.keyA.isUp) && (gameState.cursors.right.isUp && gameState.keyD.isUp) && (gameState.cursors.up.isUp && gameState.keyW.isUp) && (gameState.cursors.down.isUp && gameState.keyS.isUp)) {
            
            if (gameState.player.velocityX > 0) {
                gameState.player.velocityX -= 20;
            } else if (gameState.player.velocityX < 0) {
                gameState.player.velocityX += 20;
            }
            
            if (gameState.player.velocityY > 0) {
                gameState.player.velocityY -= 20;
            } else if (gameState.player.velocityY < 0) {
                gameState.player.velocityY += 20;
            }
        }

        gameState.player.townSprite.setVelocityX(gameState.player.velocityX);
        gameState.player.townSprite.setVelocityY(gameState.player.velocityY);

        /*
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
        */
    }
}