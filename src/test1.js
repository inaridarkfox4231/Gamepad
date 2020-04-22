let lcx = 280, lcy = 270;
let rcx = 360, rcy = 270;

let buttonInfo = {};
let axesInfo = {};

function setup() {
  createCanvas(640, 360);
  colorMode(HSB, 100);
  noStroke();
  textAlign(CENTER, CENTER);
  prepareGamepadInput();
}

function draw() {
  background(80);
  fill(40);
  rect(80, 120, 480, 200, 40);
  pollGamepads();
  drawL1R1(buttonInfo.l1, buttonInfo.r1);
  drawL2R2(buttonInfo.l2, buttonInfo.r2);
  drawABXY(buttonInfo.a, buttonInfo.b, buttonInfo.x, buttonInfo.y);
  drawCrossKey(buttonInfo.u, buttonInfo.d, buttonInfo.l, buttonInfo.r);
  drawSelectAndStart(buttonInfo.select, buttonInfo.start);
  drawStick(buttonInfo.lstick, buttonInfo.rstick, axesInfo.lx, axesInfo.ly, axesInfo.rx, axesInfo.ry);
}

function prepareGamepadInput(){
  buttonInfo.a = 0;
  buttonInfo.b = 0;
  buttonInfo.x = 0;
  buttonInfo.y = 0;
  buttonInfo.l1 = 0;
  buttonInfo.r1 = 0;
  buttonInfo.l2 = 0.0;
  buttonInfo.r2 = 0.0;
  buttonInfo.select = 0;
  buttonInfo.start = 0;
  buttonInfo.lstick = 0;
  buttonInfo.rstick = 0;
  buttonInfo.u = 0;
  buttonInfo.d = 0;
  buttonInfo.l = 0;
  buttonInfo.r = 0;
  axesInfo.lx = 0.0;
  axesInfo.ly = 0.0;
  axesInfo.rx = 0.0;
  axesInfo.ry = 0.0;
}

function drawL1R1(l1, r1){
  // l1, r1が0のときは薄い水色、1の時は濃い水色。
  if(l1 === 0){ fill(55, 50, 100); }else{ fill(55, 100, 100); }
  rect(100, 65, 120, 45, 10);
  if(r1 === 0){ fill(55, 50, 100); }else{ fill(55, 100, 100); }
  rect(420, 65, 120, 45, 10);
  textSize(30);
  if(l1 === 0){ fill(0, 30); }else{ fill(0); }
  text("L1", 160, 87);
  if(r1 === 0){ fill(0, 30); }else{ fill(0); }
  text("R1", 480, 87);
}

function drawL2R2(l2, r2){
  // l2, r2が0のときは薄い紫。1に近づくにつれて下から色がせりあがって
  // いくイメージ。
  fill(80, 50, 100);
  rect(100, 10, 120, 45); rect(420, 10, 120, 45);
  fill(80, 100, 100);
  rect(100, 10 + 45 * (1 - l2), 120, 45 * l2);
  rect(420, 10 + 45 * (1 - r2), 120, 45 * r2);
  textSize(30);
  fill(0, 30 + 70 * l2);
  text("L2", 160, 32);
  fill(0, 30 + 70 * r2);
  text("R2", 480, 32);
}

function drawABXY(a, b, x, y){
  // a, b, x, yが0か1かでそれぞれ分ける。順に緑赤青黄。
  if(a === 0){ fill(35, 30, 100) }else{ fill(35, 100, 100); }
  circle(480, 240, 50);
  if(b === 0){ fill(0, 30, 100) }else{ fill(0, 100, 100); }
  circle(520, 200, 50);
  if(x === 0){ fill(65, 30, 100); }else{ fill(65, 100, 100); }
  circle(440, 200, 50);
  if(y === 0){ fill(18, 30, 100); }else{ fill(18, 100, 100); }
  circle(480, 160, 50);
  textSize(40);
  if(a === 0){ fill(0, 30); }else{ fill(0); }
  text("A", 480, 240);
  if(b === 0){ fill(0, 30); }else{ fill(0); }
  text("B", 520, 200);
  if(x === 0){ fill(0, 30); }else{ fill(0); }
  text("X", 440, 200);
  if(y === 0){ fill(0, 30); }else{ fill(0); }
  text("Y", 480, 160);
}

function drawCrossKey(u, d, l, r){
  // 上下左右。灰色の薄いのと濃いの。
  fill(80);
  rect(140, 140, 40, 120);
  rect(100, 180, 120, 40);
  fill(20);
  if(u === 1){ rect(140, 140, 40, 40); }
  if(d === 1){ rect(140, 220, 40, 40); }
  if(l === 1){ rect(100, 180, 40, 40); }
  if(r === 1){ rect(180, 180, 40, 40); }
}

function drawSelectAndStart(se, st){
  if(se === 0){ fill(90, 30, 100); }else{ fill(90, 100, 100); }
  rect(245, 160, 70, 20, 5);
  if(st === 0){ fill(90, 30, 100); }else{ fill(90, 100, 100); }
  rect(325, 160, 70, 20, 5);
  textSize(18);
  if(se === 0){ fill(0, 30); }else{ fill(0); }
  text("SELECT", 280, 170);
  if(st === 0){ fill(0, 30); }else{ fill(0); }
  text("START", 360, 170);
}

function drawStick(ls, rs, ax0, ax1, ax2, ax3){
  // 中央のボタンを押したかどうかをls, rsで判定する。
  // ax0～ax3はaxesの情報を取得して、
  // 中央から赤い矢印と青い矢印が出るのでそれで。
  if(ls === 0){ fill(80); }else{ fill(20); }
  circle(lcx, lcy, 70);
  if(rs === 0){ fill(80); }else{ fill(20); }
  circle(rcx, rcy, 70);
  // 矢印～
  strokeWeight(5.0);
  stroke(0, 100, 100);
  line(lcx, lcy, lcx + axesInfo.lx, lcy + axesInfo.ly);
  stroke(65, 100, 100);
  line(rcx, rcy, rcx + axesInfo.rx, rcy + axesInfo.ry);
  noStroke();
}

function pollGamepads(){
  // 下位互換性のため。
  let gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  let gp = gamepads[0];
  if(gp){
  buttonAction(gp.buttons);
  axesAction(gp.axes);
  }
}

function buttonAction(data){
  // pressedを使うと押されているかどうかのbool値が取得できる。
  // 今回はvalueを使う。これはpressedのbool相当の0,1値を取得するが、
  // l2, r2スティックに関しては倒れ具合を0～1の値(float)で取得する。
  buttonInfo.a = data[0].value;
  buttonInfo.b = data[1].value;
  buttonInfo.x = data[2].value;
  buttonInfo.y = data[3].value;
  buttonInfo.l1 = data[4].value;
  buttonInfo.r1 = data[5].value;
  buttonInfo.l2 = data[6].value; // 0.0～1.0.
  buttonInfo.r2 = data[7].value; // 0.0～1.0.
  buttonInfo.select = data[8].value;
  buttonInfo.start = data[9].value;
  buttonInfo.lstick = data[10].value;
  buttonInfo.rstick = data[11].value;
  buttonInfo.u = data[12].value;
  buttonInfo.d = data[13].value;
  buttonInfo.l = data[14].value;
  buttonInfo.r = data[15].value;
}

function axesAction(data){
  // 小さい場合には0.0とする。
  axesInfo.lx = (abs(data[0]) < 0.001 ? 0.0 : 35 * data[0]);
  axesInfo.ly = (abs(data[1]) < 0.001 ? 0.0 : 35 * data[1]);
  axesInfo.rx = (abs(data[2]) < 0.001 ? 0.0 : 35 * data[2]);
  axesInfo.ry = (abs(data[3]) < 0.001 ? 0.0 : 35 * data[3]);
}
