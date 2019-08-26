const WIDTH = 480;
const HEIGHT = 320;
const ASSET_BG = "images/bg_space.jpg";

// init
let app = new PIXI.Application({
	width: WIDTH,
	height: HEIGHT
});
let canvas = document.getElementById("canvas");
canvas.appendChild(app.view);
app.renderer.backgroundColor = 0x000000;
app.stage.interactive = true;
let bg;
let anim, anim2;
let anim_speed = 0.5;

let container_bg = new PIXI.Container();
container_bg.x = 0;
container_bg.y = 0;
app.stage.addChild(container_bg);

let container = new PIXI.Container();
container.width = 480;
container.height = 480;
container.x = 0;
container.y = 0;
container.pivot.x = 0;
container.pivot.y = 0;
container.interactive = true;
app.stage.addChild(container);

PIXI.loader
	.add("bg_data", ASSET_BG)
	.add("texture/test_sequence-1.json")
	.load(onAssetsLoaded);

/**
 * Asset load Complete
 * @param { object } loader object
 * @param { object } res asset data
 */
function onAssetsLoaded(loader, res) {
	// BG
	bg = new PIXI.Sprite(res.bg_data.texture);
	container_bg.addChild(bg);
	bg.x = 0;
	bg.y = 0;
	bg.interactive = true;
	bg.on("tap", (event) => {
		console.log("onTap"); // Desktop(Touch)
	});
	bg.on("click", (event) => {
		console.log("click"); // Desktop
	});

	// Text
	let text = new PIXI.Text("Touch the BG !", {
		fontFamily: "Arial",
		fontSize: 30,
		fill: 0x666666,
		align: "center",
		fontWeight: "bold",
		stroke: "#333333",
		strokeThickness: 3,
		dropShadow: false,
		dropShadowColor: "#666666"
	});
	container.addChild(text);
	text.x = 120;
	text.y = 20;

	// Particle animation
	let frames = [];
	let frames_length = 26;
	for (let i = 1; i <= frames_length; i++) {
		// if (i <= 9) {
		// 	i = "0" + i;
		// }
		let id = PIXI.loader.resources["texture/test_sequence-1.json"].textures;
		frames.push(PIXI.Texture.from(id[`test1_seq${i}.png`]));
	}

	anim = new PIXI.extras.AnimatedSprite(frames); // ver.4 need .extra
	anim.x = 263;
	anim.y = 190;
	anim.anchor.set(0.5);
	anim.animationSpeed = 1;
	anim.loop = false;
	// anim.tint = 0x000000;
	anim.visible = true;
	anim.stop();
	anim.onComplete = function() {
		console.log("anim.totalFrames: ", anim.totalFrames);
		console.log("animation end");
		anim.interactive = true;
	};

	anim.interactive = true;
	anim.click = function() {
		console.log("click cat");
		anim.interactive = false;
		anim.animationSpeed = anim_speed;
		anim.gotoAndPlay(1);
	};
	anim.tap = function() {
		console.log("touch cat");
		anim.interactive = false;
		anim.animationSpeed = anim_speed;
		anim.gotoAndPlay(1);
	};

	container.addChild(anim);

	// Enter Frame
	app.ticker.add((delta) => {
		//
	});
}

function testAnimation(num) {
	switch (num) {
		case 1:
			anim.animationSpeed = 0.1;
			anim.gotoAndPlay(1);
			break;

		case 2:
			anim.animationSpeed = anim_speed * 2;
			anim.gotoAndPlay(1);
			break;

		default:
			break;
	}
}
