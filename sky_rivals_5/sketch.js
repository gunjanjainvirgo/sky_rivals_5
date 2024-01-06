var bg_img, bg_img_play;
var playbutton, aboutbutton;
var health = 200, max_health = 200;
var gameState = 'wait';
var jet, jet_img;
var bullet, bullet_img;
var bulletGroup;
var enemy, enemyGroup, enemy1img, enemy2img, level2bg;
var score = 0;
var bg;
var platform1image, platform1, platform2image, platform2;
var astronaut, astronaut_img;
var star, star_img,starGroup;


function preload() {

    bg_img = loadImage("assets/sky_rivals.gif");
    bg_img_play = loadImage("assets/sky_bg.jpg");
    jet_img = loadImage("assets/jet.png");
    enemy1img = loadImage("assets/asteroid.png");
    enemy2img = loadImage("assets/ufo.png");
    bullet_img = loadImage("assets/bullet.png");
    level2bg = loadImage("assets/bg3.jpg");
    platform1image = loadImage("assets/platform.png");
    astronaut_img = loadImage("assets/astronaut.png");
    star_img = loadImage("assets/star.png");

    // level 2 platforms

    // platform1image



}

function setup() {

    createCanvas(900, 700);
    //createCanvas(windowWidth, windowHeight);
    //playbutton = createButton('Play');
    playbutton = createImg("assets/play_button.png");
    playbutton.position(440, 563);
    playbutton.size(140, 140);
    //playbutton.class("customButton")
    playbutton.hide();

    aboutbutton = createImg("assets/about_button.png");
    aboutbutton.position(10, 10);
    aboutbutton.size(80, 70);
    aboutbutton.hide();

    jet = createSprite(100, 200);
    jet.addImage(jet_img);
    jet.scale = 0.5;
    jet.visible = false;

    astronaut = createSprite(100, 200);
    astronaut.addImage(astronaut_img);
    astronaut.scale = 0.5;
    astronaut.visible = false;



    platform1 = createSprite(300, 300, 200, 20)
    platform1.addImage(platform1image);
    platform1.scale = 0.3;

    platform2 = createSprite(500, 450, 200, 20);
    platform2.addImage(platform1image);
    platform2.scale = 0.3;

    platform3 = createSprite(650, 150, 200, 20);
    platform3.addImage(platform1image);
    platform3.scale = 0.3;

    platform1.visible = false
    platform2.visible = false
    platform3.visible = false


    // parts of spaceship

    p1 = createSprite(300, 200, 20, 20);
    p1.visible = false;


    bulletGroup = new Group();
    enemyGroup = new Group();
    starGroup = new Group();



}

function draw() {

    if (gameState == "wait") {
        background(bg_img);
        playbutton.show()
        aboutbutton.show()
    }

    // arrow function =>
    // ()=>{write the entire task here}
    playbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "play";
    })

    aboutbutton.mousePressed(() => {
        playbutton.hide();
        aboutbutton.hide();
        gameState = "about";

    })

    if (gameState == "about") {
        aboutgame();
    }

    if (gameState == "play") {

        background(bg_img_play);
        //image(bg_img_play,-36000,0,45000,1700);   
        jet.visible = true;
        //camera.position.x =jet.position.x;
        healthlevel1();
        movement();
        spawnEnemies();



        for (var i = 0; i < enemyGroup.length; i++) {
            if (bulletGroup.isTouching(enemyGroup.get(i))) {
                score += 5;
                enemyGroup.get(i).remove()
                bulletGroup.destroyEach()
            }
        }


        for (var i = 0; i < enemyGroup.length; i++) {
            if (jet.isTouching(enemyGroup.get(i))) {
                health -= 10
                enemyGroup.get(i).remove()
                bulletGroup.destroyEach()
            }
        }

        if (health > 0 && score >= 5) {
            gameState = "nextlevelinfo"
            bulletGroup.destroyEach()
            jet.visible = false
            enemyGroup.destroyEach()


        }


        if (gameState == "nextlevelinfo") {


            nextlevelpopup()
        }

    }


    if (gameState == "level2") {

        image(level2bg, -36000, 0, 45000, 1700);
        jet.addImage(astronaut_img);
        jet.scale = 0.2;
        jet.visible = true;
        camera.position.x = jet.position.x;
        platform1.visible = true
        platform2.visible = true
        platform3.visible = true

        //p1.visible = true

        movement();
        spawnEnemies();
        spawnStars();


    }




    drawSprites();
    if (gameState == "play") {
        fill(255);
        textSize(25);
        text("SCORE: " + score, 50, 50);

    }


}


function aboutgame() {

    swal({
        title: "About Game === How to Play!!",
        text: "Fly powerful fighter jets, battle in the sky and win by shooting your enemies !!",
        textAlign: "center",
        imageUrl: "assets/sky_rivals.gif",
        imageSize: "200x200",
        confirmButtonText: "Lets Kill the Enemy!!",
        confirmButtonColor: "brown",
    },
        function () {
            gameState = "wait"
        }

    )


}


function healthlevel1() {

    stroke("lightgreen")
    strokeWeight(7)
    noFill()
    // rectMode(CENTER)
    rect(600, 50, max_health, 20)

    noStroke()
    fill("green")
    // rectMode(CENTER)
    rect(600, 50, health, 20)

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


function movement() {

    if (jet.y <= 10) {
        jet.y = 10
    }


    if (jet.y >= 525) {
        jet.y = 525
    }

    if (keyDown("UP_ARROW")) {
        jet.y = jet.y - 5;
    }

    if (keyDown("DOWN_ARROW")) {
        jet.y = jet.y + 5;
    }

    /* if (keyDown("LEFT_ARROW")) {
         jet.x = jet.x - 5;
     } */

    if (keyDown("RIGHT_ARROW")) {
        jet.x = jet.x + 5;
    }

    if (keyDown("space")) {
        spawnBullets();
    }


}

function spawnBullets() {
    bullet = createSprite(jet.x + 15, jet.y + 13, 20, 20);
    bullet.addImage(bullet_img);
    bullet.scale = 0.2;
    bullet.velocityX = 10;
    //bullet.velocityY = 10;

    bullet.depth = jet.depth;
    jet.depth = jet.depth + 1;

    bulletGroup.add(bullet);

}

function spawnEnemies() {
    if (frameCount % 100 == 0) {
        var randy = Math.round(random(50, 530))
        enemy = createSprite(width, randy);
        enemy.scale = 0.25
        enemy.velocityX = -4;
        // enemy.velocityY = 4;
        enemy.debug = true;

        var randy1 = Math.round(random(0, 30))
        var randx1 = Math.round(random(400, width))

        var randimg = Math.round(random(1, 2))
        switch (randimg) {

            case 1:
                enemy.x = randx1;
                enemy.y = randy1;
                enemy.addImage(enemy1img)
                enemy.velocityY = 4;
                enemy.setCollider("rectangle", 0, 0, 250, 300)
                break;

            case 2:
                enemy.addImage(enemy2img)
                // enemy.setCollider("rectangle",0,0,enemy.width,enemy.height)
                break;

            default: break;

        }


        enemyGroup.add(enemy);



    }
}



function nextlevelpopup() {

    swal({
        title: "HURRAYY!!!!",
        text: "You defeated them:\n Now collect your Space ship parts\n ",
        imageUrl: "assets/level_up.png",
        imageSize: "200x200",
        confirmButtonText: "Let's go back HOME!!",
        confirmButtonColor: "brown",
    },
        function () {
            gameState = "level2"
        }

    )


}


function spawnStars() {

    if (frameCount % 200 == 0) {
        var randy = Math.round(random(50, 530));
        var randx = Math.round(random(200, width));
        star = createSprite(randx, randy);
        star.addImage(star_img);
        star.scale = 0.2;
        

        //bullet.depth = jet.depth;
        //jet.depth = jet.depth + 1;

        starGroup.add(star);

    }

}
