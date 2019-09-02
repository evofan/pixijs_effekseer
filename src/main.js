const WIDTH = 400;
const HEIGHT = 600;
const ASSET_BG = "images/pic_bg_space.jpg";
const ASSET_START = "images/pic_start.png";

// init
let app = new PIXI.Application({
	width: WIDTH,
	height: HEIGHT
});
let canvas = document.getElementById("canvas");
canvas.appendChild(app.view);
app.renderer.backgroundColor = 0x000000;
app.stage.interactive = true;

// PIXI & Stats.js
let pixiHooks = new GStats.PIXIHooks(app);
let stats = new GStats.StatsJSAdapter(pixiHooks);
document.body.appendChild(stats.stats.dom || stats.stats.domElement);

let bg, start;
let anim;
let anim_speed = 0.5;

let container_bg = new PIXI.Container();
container_bg.x = 0;
container_bg.y = 0;
app.stage.addChild(container_bg);

let container = new PIXI.Container();
container.width = 400;
container.height = 600;
container.x = 0;
container.y = 0;
container.pivot.x = 0;
container.pivot.y = 0;
container.interactive = true;
app.stage.addChild(container);

PIXI.loader
	.add("bg_data", ASSET_BG)
	// .add("texture/test_sequence-1.json")
	.add("pic_start", ASSET_START)
	.add("texture/temp3-0.json")
	.add("texture/temp3-1.json")
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

	// start point
	start = new PIXI.Sprite(res.pic_start.texture);
	container_bg.addChild(start);
	start.x = 195;
	start.y = 300;
	start.width = 50;
	start.height = 50;
	start.pivot.x = 25;
	start.pivot.y = 25;

	// Text
	let text = new PIXI.Text("Touch the BG !", {
		fontFamily: "Arial",
		fontSize: 30,
		fill: 0x666666,
		align: "center",
		fontWeight: "bold"
	});
	container.addChild(text);
	text.x = 90;
	text.y = 40;

	// Particle animation(sequence picture)
	let frames = [];
	let frames_length = 29;
	for (let i = 0; i <= frames_length; i++) {
		let id = PIXI.loader.resources["texture/temp3-0.json"].textures;
		frames.push(PIXI.Texture.from(id[`test_seq.${i}.png`]));
	}
	anim = new PIXI.extras.AnimatedSprite(frames); // ver.4 need .extra
	anim.x = 210;
	anim.y = 300;
	anim.scale.x = 2;
	anim.scale.y = 2;
	anim.anchor.set(0.5);
	anim.animationSpeed = 1;
	anim.loop = false;
	// anim.tint = 0x000000;
	anim.visible = true;
	anim.stop();
	anim.onComplete = function() {
		console.log("anim.totalFrames: ", anim.totalFrames);
		console.log("animation end\n\n");
		anim.interactive = true;
	};

	anim.interactive = true;
	anim.click = function() {
		console.log("animation start(click)");
		anim.interactive = false;
		anim.animationSpeed = anim_speed;
		anim.gotoAndPlay(1);
	};
	anim.tap = function() {
		console.log("animation start(touch)");
		anim.interactive = false;
		anim.animationSpeed = anim_speed;
		anim.gotoAndPlay(1);
	};

	container.addChild(anim);

	// Enter Frame
	app.ticker.add((delta) => {
		stats.update();
	});
}
