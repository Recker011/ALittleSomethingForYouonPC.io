let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  moveX = 0;
  moveY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;
  paperElement = null;

  init(paper) {
    this.paperElement = paper;

    // Check if the device is a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    if (isTouchDevice) {
      paper.addEventListener('touchmove', this.handleMove.bind(this));
      paper.addEventListener('touchstart', this.handleStart.bind(this));
      paper.addEventListener('touchend', this.handleEnd.bind(this));
    } else {
      paper.addEventListener('mousemove', this.handleMove.bind(this));
      paper.addEventListener('mousedown', this.handleStart.bind(this));
      window.addEventListener('mouseup', this.handleEnd.bind(this));
    }
  }

  handleMove(e) {
    if (!this.holdingPaper) return;

    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    this.velX = clientX - this.moveX;
    this.velY = clientY - this.moveY;

    this.moveX = clientX;
    this.moveY = clientY;

    if (!this.rotating) {
      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;
      this.paperElement.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }
  }

  handleStart(e) {
    e.preventDefault();

    this.holdingPaper = true;
    this.paperElement.style.zIndex = highestZ;
    highestZ += 1;

    if (e.touches) {
      this.moveX = e.touches[0].clientX;
      this.moveY = e.touches[0].clientY;
    } else {
      this.moveX = e.clientX;
      this.moveY = e.clientY;
      if (e.button === 2) {
        this.rotating = true;
      }
    }
  }

  handleEnd() {
    this.holdingPaper = false;
    this.rotating = false;
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
