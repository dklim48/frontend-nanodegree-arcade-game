// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = 0;
    this.x = 0;
    this.y = 0;
    this.initialize();
};

Enemy.prototype.initialize = function(){
    this.x = -100;
    this.speed = 25 * (Math.floor(Math.random() * 4) + 2);
    //should spawn a random row between the 2 - 4.
    var rand = Math.floor(Math.random() * 3) + 2;
    if(rand === 2){
        this.y = 60;
    } else if(rand === 3){
        this.y = 143;
    } else {
        this.y = 226;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //collision detection
    if (this.x < player.x + 70 && this.x + 68 > player.x && this.y < player.y + 80 && 65 + this.y > player.y) {
        player.x = 200;
        player.y = 375;
    }

    //If the current enemy is out of bounds, find it, remove it, and add a new one.
    if(this.x > 505){
        for(var enemy in allEnemies){
            if(allEnemies[enemy] === this){
                allEnemies[enemy] = new Enemy();
            }
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Enemies our player must avoid
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 375;
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks -2, 402
Player.prototype.handleInput = function(direction) {
    if(direction.key === "up"){
        if(this.y === 43){
            this.y = 375;
        } else {
            this.y -= 83;
        }
    } else if(direction.key === "down" && this.y !== 375){
        this.y += 83;
    } else if(direction.key === "left"){
        this.x -= 101;
        if(this.x < -2){
            this.x = 402;
        }
    } else if(direction.key === "right"){
        this.x += 101;
        if(this.x > 402){
            this.x = -2;
        }
    }
};

// Update the players's position, required method for game
Player.prototype.update = function() {
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput({key: allowedKeys[e.keyCode]});
});
