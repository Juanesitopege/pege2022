import kaboom from "kaboom"
import big from "./big"
const protocol = location.protocol === "https:" ? "wss" : "ws";
const ws = new WebSocket(`${protocol}://${location.host}/multiplayer`);

ws.onmessage = (msg) => {
	console.log(msg);
};

kaboom({
	background: [ 0, 0, 0 ]
})
loadSprite("grass","/sprites/grass.png")
loadSprite("marmota", "/sprites/marmota.png") 
loadSprite( "potter", "/sprites/potter.png")
loadSprite("barbosa", "/sprites/barbosa.png")
loadSprite("barbosaflap", "/sprites/barbosaflap.png")
loadSprite("elcoder", "/sprites/elcoder.png")
loadSprite("bean", "/sprites/bean.png");
loadSprite("ghosty", "/sprites/ghosty.png");
loadSprite("spike", "/sprites/spike.png");
loadSprite("grass", "/sprites/grass.png");
loadSprite("prize", "/sprites/potter.png");
loadSprite("apple", "/sprites/apple.png");
loadSprite("portal", "/sprites/portal.png");
loadSprite("persona", "/sprites/persona.png");
loadSprite("coin", "/sprites/coin.png");
loadSprite("background", "/sprites/barbosa.png");
loadSprite("screamerbarbo", "/sprites/screamer.png");
loadSprite("elcodersad", "/sprites/elcodersad.png");
loadSprite("marmotaangry", "/sprites/marmota_angry.png");
loadSound("coin", "/sounds/sound.mp3");
loadSound("powerup", "/sounds/powerup.mp3");
loadSound("blip", "/sounds/blip.mp3");
loadSound("hit", "/sounds/hit.mp3");
loadSound("portal", "/sounds/portal.mp3");
loadSound("bg", "/sounds/bg.mp3");
loadSprite("flappy", "/sprites/bean.png")
loadSound("score", "/sounds/powerup.mp3")
loadSound("wooosh", "/sounds/blip.mp3")
loadSound("hit", "/sounds/hit.mp3")
//loadSound("screamer", "/sounds/screamer.mp3")
scene("dialog", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {

const dialogs = [
	[ "elcoder", "Hello dear chums" ],
	[ "potter", "Chums ni que nada" ],
	[ "barbosa", "Oe respete" ],
	[ "marmota", "Si? ah bueno." ],
	[ "elcoder", "Y ahora que dije..." ],
	[ "marmota", "Nada nada PANA" ],
	[ "elcoder", "Ok...." ],
	[ "marmota", "Sabes que.. te RETO A UNA COMPETENCÍA" ],
  [ "elcoder", "Si? Ah bueno." ],
  [ "elcoder", "Nah, es broma" ],
  [ "marmota", "Si, si hagase" ],
  [ "potter", "Bueno, comiencen *trae palomitas*" ],
  [ "elcoder", "Ok okok DALE ENTER PANA" ],
  [ "marmota", "*Le da enter*" ],
]

let curDialog = 0

// Text bubble
const textbox = add([
	rect(width() - 200, 120, { radius: 32 }),
	origin("center"),
	pos(center().x, height() - 100),
	outline(2),
])

// Text
const txt = add([
	text("", { size: 32, width: width() - 230 }),
	pos(textbox.pos),
	origin("center")
])

// Character avatar
const avatar = add([
	sprite("bean"),
	scale(2),
	origin("center"),
	pos(center().sub(0, 50))
])




onKeyPress("enter", () => {
	// Cycle through the dialogs
	curDialog = (curDialog + 1) % dialogs.length
	updateDialog()
  go("game")
})

onKeyPress("space", () => {
	// Cycle through the dialogs
	curDialog = (curDialog + 1) % dialogs.length
	updateDialog()
})

// Update the on screen sprite & text
function updateDialog() {

	const [ char, dialog ] = dialogs[curDialog]


	avatar.use(sprite(char))

	txt.text = dialog

}

updateDialog()



  
})
  
  export default function patrol(speed = 50, dir = 1) {
	return {
		id: "patrol",
		require: [ "pos", "area", ],
		add() {
			this.on("collide", (obj, col) => {
				if (col.isLeft() || col.isRight()) {
					dir = -dir
				}
			})
		},
		update() {
			this.move(speed * dir, 0)
		},
	}
}



const JUMP_FORCE = 1310
const MOVE_SPEED = 489
const FALL_DEATH = 2400

const LEVELS = [
  [
    "                          $",
    "                          $",
    "                          $",
    "                          $",
    "                          $",
    "           $$         =   $",
    "        ===           =   $",
    "                      =   $",
    "                      =    ",
    "     >     ^^  ^^     > ^^  =   @",
    "===========================",
  ],
  [
    "            ",
    "                ",
    "                      ",
    "                      ",
    "                      ",
    "      =      $      $    ",
    "    =                   ",
    "  =    >^^>^^>^^>^^>^^>^^@",
    "=====================",
  ],
  [
    "    $     $",
    "     $$   ",
    "     $$$   %                  ",
    "                          ",
    "                      ",
    "         ===                ",
    "                           ",
    "   >   ==>^^>^^>^^>^^>^^@",
    "=============================",
  ],
  [
    "                          ",
    "                          ",
    "           %               ",
    "                          ",
    "                          ",
    "           $$                    ==== @",
    "        ====                $   ===",
    "                       $   === ",
    "                     ===   ",
    "         ^^^^^^      = >       ",
    "===========================",
  ],
  [
    "                          ",
    "                          ",
    "           %               ",
    "                          ",
    "                          ",
    "           $$               ====       @",
    "        ====                $   ===",
    "                 $   === ",
    "                ==     ===   ",
    "        ^^      = >       ",
    "==============",
  ],
]
debug.paused = false
debug.inspect = false
const levelConf = {

  width: 64,
  height: 64,

  "=": () => [ //Pasto
    sprite("grass")
    area(),
    solid(),
    origin("bot"),
  ],
  "$": () => [
    sprite("coin"),
    area(),
    pos(0, -9),
    origin("bot"),
    "coin",
  ],
  "%": () => [
    sprite("prize"),
    area(),
    solid(),
    origin("bot"),
    "prize",
  ],
  "^": () => [
    sprite("spike"),
    area(),
    solid(),
    origin("bot"),
    "danger",
  ],
  "#": () => [
    sprite("apple"),
    area(),
    origin("bot"),
    body(),
    "apple",
  ],
  ">": () => [
    sprite("ghosty"),
    area(),
    origin("bot"),
    body(),
    patrol(),
    "enemy",
  ],
  "@": () => [
    sprite("portal"),
    area({ scale: 0.5, }),
    origin("bot"),
    pos(0, -12),
    "portal",
  ],
}

scene("game", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {

  gravity(3150)


  const level = addLevel(LEVELS[levelId ?? 0], levelConf)


  const player = add([
    sprite("persona"),
    pos(0, 0),
    area(),
    scale(1),

    body(),

    big(),
    origin("bot"),
  ])


  player.onUpdate(() => {

    camPos(player.pos)

    if (player.pos.y >= FALL_DEATH) {
      go("lose")
    }
  })


  player.onCollide("danger", () => {
    go("lose")
    play("hit")
    shake(120)
  })

  player.onCollide("portal", () => {
    play("portal")
    if (levelId + 1 < LEVELS.length) {
      go("game", {
        levelId: levelId + 1,
        coins: coins,
      })
    } else {
      go("win")
    }
  })

  player.onGround((l) => {
    if (l.is("enemy")) {
      player.jump(JUMP_FORCE * 1.5)
      destroy(l)
      play("powerup")
    }
  })

  player.onCollide("enemy", (e, col) => {

    if (!col.isBottom()) {
      go("lose")
      play("hit")
    }
  })

  let hasApple = false


  player.onHeadbutt((obj) => {
    if (obj.is("prize") && !hasApple) {
      const apple = level.spawn("#", obj.gridPos.sub(0, 1))
      apple.jump()
      hasApple = false
      play("blip")
    }
  })

  // player grows big onCollide with an "apple" obj
  player.onCollide("apple", (a) => {
    destroy(a)
    // as we defined in the big() component
    player.biggify(3)
    hasApple = true
    play("powerup")
  })

  let coinPitch = 0

  onUpdate(() => {
    if (coinPitch > 0) {
      coinPitch = Math.max(0, coinPitch - dt() * 100)
    }
  })

  player.onCollide("coin", (c) => {
    destroy(c)
    play("coin", {
      detune: coinPitch,
    })
    coinPitch += 100
    coins += 2
    coinsLabel.text = coins
  })

  const coinsLabel = add([
    text(coins),
    pos(24, 24),
    fixed(),
  ])
  onKeyPress("f7", () => {



  })

//bypass

    onKeyPress("q", () => {

    go("flappy")
    })


  onKeyPress("up", () => {

    if (player.isGrounded()) {
      player.jump(JUMP_FORCE)
    }
  })

  onKeyDown("left", () => {
    player.move(-MOVE_SPEED, 0)
  })

  onKeyDown("right", () => {
    player.move(MOVE_SPEED, 0)
  })

  onKeyPress("down", () => {
    player.weight = 3
  })

  onKeyRelease("down", () => {
    player.weight = 1
  })

  onKeyPress("f", () => {
    fullscreen(!fullscreen())
  })

})


onClick("bean", (bean) => go("game"))

scene("lose", () => {
  add([
    text("Lamentablemente Luis no ganó."),
  ])
  onKeyPress(() => go("game"))
})

scene("win", () => {
  add([
    text("Esooo"),
  ])
  onKeyPress(() => go("dialog2"))
})

go("dialog")
scene("dialog2", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {
// Define the dialogue data
const dialogs = [
	[ "marmotaangry", "Ummm RAYOS!! parece que eres muy bueno y ganaste." ],
	[ "marmota", "Pero esto no se queda asi." ],
	[ "marmota", "NADIE ME GANA EN FLAPPY" ],
	[ "elcoder", "Si? ah bueno." ],
	[ "elcoder", "Bromitaaa" ],
	[ "barbosa", "Pues yo si" ],
	[ "elcodersad", "Ok...." ],
	[ "marmota", "Sabes que.. te RETO A UNA COMPETENCIA" ],
  [ "elcodersad", "Aqui viene otra vez.." ],
  [ "barbosa", "Hagale man, de los shitpost aprendí" ],
  [ "marmota", "Si, si hagase" ],
  [ "potter", "Bueno, comiencen *trae palomitas*" ],
  [ "barbosa", "Ok okok DALE a la letra P PANA" ],
  [ "marmota", "*Le da a la letra P*" ],
]

let curDialog = 0

// Text bubble
const textbox = add([
	rect(width() - 200, 120, { radius: 32 }),
	origin("center"),
	pos(center().x, height() - 100),
	outline(2),
])

// Text
const txt = add([
	text("", { size: 32, width: width() - 230 }),
	pos(textbox.pos),
	origin("center")
])

// Character avatar
const avatar = add([
	sprite("bean"),
	scale(3),
	origin("center"),
	pos(center().sub(0, 50))
])




onKeyPress("p", () => {
	// Cycle through the dialogs
	curDialog = (curDialog + 1) % dialogs.length
	updateDialog()
  go("flappy")
})

onKeyPress("space", () => {
	// Cycle through the dialogs
	curDialog = (curDialog + 1) % dialogs.length
	updateDialog()
})

// Update the on screen sprite & text
function updateDialog() {

	const [ char, dialog ] = dialogs[curDialog]

	// Use a new sprite component to replace the old one
	avatar.use(sprite(char))
	// Update the dialog text
	txt.text = dialog

}

updateDialog()



  
})
  scene("flappy", () => {

	const PIPE_OPEN = 240
	const PIPE_MIN = 60
	const JUMP_FORCE = 800
	const SPEED = 320
	const CEILING = -60

	// define gravity
	gravity(3000)

	// a game object consists of a list of components and tags
	const bean = add([
		// sprite() means it's drawn with a sprite of name "bean" (defined above in 'loadSprite')
		sprite("barbosaflap"),
		// give it a position
		pos(width() / 4, 0),
		// give it a collider
		area(),
		// body component enables it to fall and jump in a gravity world
		body(),
	])

	// check for fall death
	bean.onUpdate(() => {
		if (bean.pos.y >= height() || bean.pos.y <= CEILING) {
			// switch to "lose" scene
			go("loseflap", score)
		}
	})

	// jump
	onKeyPress("space", () => {
		bean.jump(JUMP_FORCE)
		play("wooosh")
	})

	// mobile
	onClick(() => {
		bean.jump(JUMP_FORCE)
		play("wooosh")
	})

	function spawnPipe() {

		// calculate pipe positions
		const h1 = rand(PIPE_MIN, height() - PIPE_MIN - PIPE_OPEN)
		const h2 = height() - h1 - PIPE_OPEN

		add([
			pos(width(), 0),
			rect(64, h1),
			color(8, 4, 125),
			outline(4),
			area(),
			move(LEFT, SPEED),
			cleanup(),
			// give it tags to easier define behaviors see below
			"pipe",
		])

		add([
			pos(width(), h1 + PIPE_OPEN),
			rect(64, h2),
			color(0, 127, 255),
			outline(4),
			area(),
			move(LEFT, SPEED),
			cleanup(),
			// give it tags to easier define behaviors see below
			"pipe",
			// raw obj just assigns every field to the game obj
			{ passed: false, },
		])

	}

	// callback when bean onCollide with objects with tag "pipe"
	bean.onCollide("pipe", () => {
		go("loseflap", score)
		play("hit")

	})

	// per frame event for all objects with tag 'pipe'
	onUpdate("pipe", (p) => {
		// check if bean passed the pipe
		if (p.pos.x + p.width <= bean.pos.x && p.passed === false) {
			addScore()
			p.passed = true
		}
	})

	// spawn a pipe every 1 sec
	loop(1, () => {
		spawnPipe()
	})

	let score = 0

	// display score
	const scoreLabel = add([
		text(score),
		origin("center"),
		pos(width() / 2, 80),
		fixed(),
	])

	function addScore() {
		score++
		scoreLabel.text = score
		play("score")
	}

})

scene("loseflap", (score) => {

	add([
		sprite("screamerbarbo"),
		pos(width() / 2, height() / 2 - 108),
		scale(1),
    shake(210),
		origin("center"),
	])

	// display score
	add([
		text(score),
		pos(width() / 2, height() / 2 + 108),
		scale(3),
		origin("center"),
	])

	// go back to game with space is pressed
	onKeyPress("space", () => go("dialog3"))
	onClick(() => go("dialog3"))

  onKeyPress("r", () => go("flappy"))
	onClick(() => go("flappy"))
})
scene("dialog3", ({ levelId, coins } = { levelId: 0, coins: 0 }) => {
// Define the dialogue data
const dialogs = [
	[ "marmota", "No que muy pro? MANCO!!!!!" ],
	[ "potter", "OE NADIE LE DICE MANCO A BOSO EL PAJOSO" ],
	[ "elcodersad", "..." ],
	[ "elcoder", "Si? ah bueno." ],
	[ "elcoder", "Bromitaaa x2" ],
	[ "barbosa", "Manco quien?" ],
	[ "elcoder", "ahora que? una competencía de shooter" ],
	[ "marmota", "Sabes que.. te RETO A UNA COMPETENCÍA" ],
  [ "elcodersad", "Aqui viene otra vez mas.." ],
  [ "potter", "Hagale pana, de harrypotter aprendí" ],
  [ "marmota", "Si, si hagase" ],
  [ "potter", "Bueno, comiencemos *se prepara*" ],
  [ "marmota", "Ok okok DALE a la letra P de PANA" ],
  [ "potter", "*Le da a la letra P*" ],
]

let curDialog = 0

// Text bubble
const textbox = add([
	rect(width() - 200, 120, { radius: 32 }),
	origin("center"),
	pos(center().x, height() - 100),
	outline(2),
])

// Text
const txt = add([
	text("", { size: 32, width: width() - 230 }),
	pos(textbox.pos),
	origin("center")
])

// Character avatar
const avatar = add([
	sprite("bean"),
	scale(3),
	origin("center"),
	pos(center().sub(0, 50))
])




onKeyPress("p", () => {
	// Cycle through the dialogs
	curDialog = (curDialog + 1) % dialogs.length
	updateDialog()
  go("flappy")
})

onKeyPress("space", () => {
	// Cycle through the dialogs
	curDialog = (curDialog + 1) % dialogs.length
	updateDialog()
})

// Update the on screen sprite & text
function updateDialog() {

	const [ char, dialog ] = dialogs[curDialog]

	// Use a new sprite component to replace the old one
	avatar.use(sprite(char))
	// Update the dialog text
	txt.text = dialog

}

updateDialog()



  
})


