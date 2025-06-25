const penguin = document.getElementById("penguin");
const broccoli = document.getElementById("broccoli");
const bgm = document.getElementById("bgm");

let isJumping = false;
const jumpSound = new Audio("assets/jump.mp3");

function jump() {
  if (isJumping) return;
  isJumping = true;
  jumpSound.play();
  let position = 0;

  const upInterval = setInterval(() => {
    if (position >= 200) {
      clearInterval(upInterval);
      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 10;
          penguin.style.bottom = position + "px";
        }
      }, 20);
    } else {
      position += 10;
      penguin.style.bottom = position + "px";
    }
  }, 20);
}

document.addEventListener("click", jump);
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});

setInterval(() => {
  const penguinRect = penguin.getBoundingClientRect();
  const broccoliRect = broccoli.getBoundingClientRect();

  if (
    broccoliRect.left < penguinRect.right &&
    broccoliRect.right > penguinRect.left &&
    penguinRect.bottom > broccoliRect.top
  ) {
    document.body.innerHTML = `
      <h1 style="font-size:3em; transform:rotate(15deg); color:red;">💀 おわったな 💀</h1>
      <p>ペンギンは宇宙ブロッコリーにやられた...</p>
    `;
    bgm.pause();
  }
}, 10);
