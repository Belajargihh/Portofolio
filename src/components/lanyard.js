/* ==========================================================================
   PERFECT HANGING LANYARD ENGINE (Snug Side-by-Side with Wider Terminal)
   ========================================================================== */

export class LanyardPhysicsEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.dpr = window.devicePixelRatio || 1;

    // Load Profile Avatar Image
    this.avatarImg = new Image();
    this.avatarImg.src = '/profile.png';
    this.avatarLoaded = false;
    this.avatarImg.onload = () => {
      this.avatarLoaded = true;
    };

    // 30% Enlarged Card Dimensions (234x364)
    this.cardWidth = 234;
    this.cardHeight = 364;
    this.cardRadius = 18;

    // Fixed Long Rope Settings (1130px Target Offset)
    this.numRopeSegments = 28;
    this.ropeLength = 1130;
    this.segmentLength = this.ropeLength / this.numRopeSegments;

    // Physics Constants
    this.gravity = 0.45;
    this.damping = 0.93;

    // Motion State
    this.cardPos = { x: 0, y: 0 };
    this.cardVel = { x: 0, y: 0 };
    this.cardAngle = 0;
    this.cardAngularVel = 0;

    // Drag State
    this.isDragging = false;
    this.dragOffset = { x: 0, y: 0 };
    this.mousePos = { x: 0, y: 0 };
    this.prevMousePos = { x: 0, y: 0 };
    this.mouseVel = { x: 0, y: 0 };

    this.initCanvasSize();
    this.initPhysicsNodes();
    this.bindEvents();
    this.startLoop();
  }

  calculateTargetRopeLength() {
    const terminal = document.querySelector('.terminal-card');
    if (terminal) {
      const rect = terminal.getBoundingClientRect();
      return Math.max(rect.top + window.scrollY, 400);
    }
    return 780;
  }

  initCanvasSize() {
    const aboutSection = document.getElementById('about');
    const bottomPos = aboutSection ? (aboutSection.offsetTop + aboutSection.offsetHeight + 300) : 2600;

    this.width = window.innerWidth;
    this.height = Math.max(bottomPos, 2400);

    // Sync CSS style height 1-to-1 to prevent canvas squishing
    this.canvas.style.height = `${this.height}px`;

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);

    const isMobile = this.width < 768;
    const zone = document.getElementById('about-lanyard-zone');
    if (!isMobile && zone) {
      const rect = zone.getBoundingClientRect();
      this.anchor = {
        x: rect.left + rect.width / 2 + window.scrollX,
        y: 0
      };
    } else {
      this.anchor = {
        x: isMobile ? this.width * 0.5 : this.width * 0.78,
        y: 0
      };
    }
  }

  initPhysicsNodes() {
    this.ropeLength = this.calculateTargetRopeLength();
    this.segmentLength = this.ropeLength / this.numRopeSegments;

    this.nodes = [];
    for (let i = 0; i <= this.numRopeSegments; i++) {
      const y = (i * this.segmentLength);
      this.nodes.push({
        x: this.anchor.x,
        y: y,
        oldX: this.anchor.x,
        oldY: y
      });
    }

    const lastNode = this.nodes[this.nodes.length - 1];
    this.cardPos = { x: lastNode.x, y: lastNode.y };
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.initCanvasSize();
      this.initPhysicsNodes();
    });

    const getCanvasPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const onStart = (e) => {
      const pos = getCanvasPos(e);
      this.mousePos = pos;
      this.prevMousePos = pos;

      if (this.hitTestCard(pos.x, pos.y)) {
        this.isDragging = true;
        this.canvas.style.pointerEvents = 'auto';
        this.dragOffset = {
          x: pos.x - this.cardPos.x,
          y: pos.y - this.cardPos.y
        };
        document.body.classList.add('dragging-lanyard');
      }
    };

    const onMove = (e) => {
      const pos = getCanvasPos(e);
      this.mouseVel = {
        x: pos.x - this.prevMousePos.x,
        y: pos.y - this.prevMousePos.y
      };
      this.prevMousePos = pos;
      this.mousePos = pos;

      const isOverCard = this.hitTestCard(pos.x, pos.y);

      // Dynamic pointer events toggle
      if (isOverCard || this.isDragging) {
        this.canvas.style.pointerEvents = 'auto';
        this.canvas.style.cursor = this.isDragging ? 'grabbing' : 'grab';
      } else {
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.cursor = 'default';
      }

      const customCursor = document.getElementById('custom-cursor');
      if (customCursor) {
        if (isOverCard) {
          customCursor.classList.add('drag-mode');
        } else if (!this.isDragging) {
          customCursor.classList.remove('drag-mode');
        }
      }
    };

    const onEnd = () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.cardVel.x += this.mouseVel.x * 0.7;
        this.cardVel.y += this.mouseVel.y * 0.7;
        this.cardAngularVel += (this.mouseVel.x * 0.02);
      }
      this.canvas.style.pointerEvents = 'none';
      document.body.classList.remove('dragging-lanyard');
    };

    window.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
  }

  hitTestCard(px, py) {
    const dx = px - this.cardPos.x;
    const dy = py - (this.cardPos.y + this.cardHeight / 2);

    const cos = Math.cos(-this.cardAngle);
    const sin = Math.sin(-this.cardAngle);

    const rx = dx * cos - dy * sin;
    const ry = dx * sin + dy * cos;

    return (
      rx >= -this.cardWidth / 2 - 20 &&
      rx <= this.cardWidth / 2 + 20 &&
      ry >= -this.cardHeight / 2 - 20 &&
      ry <= this.cardHeight / 2 + 20
    );
  }

  updatePhysics() {
    const isMobile = this.width < 768;
    const zone = document.getElementById('about-lanyard-zone');
    if (!isMobile && zone) {
      const rect = zone.getBoundingClientRect();
      this.anchor.x = rect.left + rect.width / 2 + window.scrollX;
    } else {
      this.anchor.x = isMobile ? this.width * 0.5 : this.width * 0.78;
    }
    this.anchor.y = 0;

    if (!this.isDragging) {
      const calculatedLength = this.calculateTargetRopeLength();
      this.ropeLength += (calculatedLength - this.ropeLength) * 0.05;
      this.segmentLength = this.ropeLength / this.numRopeSegments;
    }

    this.nodes[0].x = this.anchor.x;
    this.nodes[0].y = this.anchor.y;

    // 1. Verlet Integration for Long Rope Segments
    for (let i = 1; i < this.nodes.length; i++) {
      const n = this.nodes[i];
      const vx = (n.x - n.oldX) * this.damping;
      const vy = (n.y - n.oldY) * this.damping;

      n.oldX = n.x;
      n.oldY = n.y;

      n.x += vx;
      n.y += vy + this.gravity;
    }

    // 2. Card Motion & Dragging
    const lastNode = this.nodes[this.nodes.length - 1];

    if (this.isDragging) {
      const targetX = this.mousePos.x - this.dragOffset.x;
      const targetY = this.mousePos.y - this.dragOffset.y;

      this.cardVel.x = (targetX - this.cardPos.x) * 0.35;
      this.cardVel.y = (targetY - this.cardPos.y) * 0.35;
      this.cardPos.x += this.cardVel.x;
      this.cardPos.y += this.cardVel.y;

      this.cardAngularVel += (this.dragOffset.x * 0.0018);
      lastNode.x = this.cardPos.x;
      lastNode.y = this.cardPos.y;
    } else {
      this.cardVel.y += this.gravity * 0.5;
      this.cardVel.x *= this.damping;
      this.cardVel.y *= this.damping;

      this.cardPos.x += this.cardVel.x;
      this.cardPos.y += this.cardVel.y;

      const dx = lastNode.x - this.cardPos.x;
      const dy = lastNode.y - this.cardPos.y;

      this.cardVel.x += dx * 0.18;
      this.cardVel.y += dy * 0.18;
      lastNode.x = this.cardPos.x;
      lastNode.y = this.cardPos.y;
    }

    // Angular Damping & Pendulum Torque
    const targetAngle = Math.atan2(
      this.cardPos.x - this.nodes[this.nodes.length - 3].x,
      this.cardPos.y - this.nodes[this.nodes.length - 3].y
    );
    const angleDiff = -targetAngle - this.cardAngle;
    this.cardAngularVel += angleDiff * 0.08;
    this.cardAngularVel *= 0.88;
    this.cardAngle += this.cardAngularVel;

    // 3. Relax Rope Constraints (5 iterations)
    for (let iteration = 0; iteration < 5; iteration++) {
      for (let i = 0; i < this.nodes.length - 1; i++) {
        const n1 = this.nodes[i];
        const n2 = this.nodes[i + 1];

        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.hypot(dx, dy) || 1;
        const diff = (dist - this.segmentLength) / dist;

        const factor = i === 0 ? 1 : 0.5;
        if (i !== 0) {
          n1.x += dx * diff * factor;
          n1.y += dy * diff * factor;
        }
        n2.x -= dx * diff * factor;
        n2.y -= dy * diff * factor;
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Crimson Ribbon Lanyard Strap (Attaches from 0px Window Top Edge)
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(this.nodes[0].x, this.nodes[0].y);

    for (let i = 1; i < this.nodes.length - 1; i++) {
      const xc = (this.nodes[i].x + this.nodes[i + 1].x) / 2;
      const yc = (this.nodes[i].y + this.nodes[i + 1].y) / 2;
      this.ctx.quadraticCurveTo(this.nodes[i].x, this.nodes[i].y, xc, yc);
    }
    this.ctx.lineTo(this.nodes[this.nodes.length - 1].x, this.nodes[this.nodes.length - 1].y);

    this.ctx.shadowColor = 'rgba(220, 38, 38, 0.25)';
    this.ctx.shadowBlur = 8;

    const grad = this.ctx.createLinearGradient(this.anchor.x, 0, this.cardPos.x, this.cardPos.y);
    grad.addColorStop(0, '#ef4444');
    grad.addColorStop(0.5, '#dc2626');
    grad.addColorStop(1, '#991b1b');

    this.ctx.strokeStyle = grad;
    this.ctx.lineWidth = 14;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.stroke();

    // Inner White Stitches
    this.ctx.shadowBlur = 0;
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    this.ctx.lineWidth = 2.5;
    this.ctx.setLineDash([6, 5]);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
    this.ctx.restore();

    // 2. Draw ID Card Badge (FULL-FRAME PHOTO CARD)
    this.ctx.save();
    this.ctx.translate(this.cardPos.x, this.cardPos.y);
    this.ctx.rotate(this.cardAngle);

    // Metal Carabiner Ring
    this.ctx.fillStyle = '#64748b';
    this.ctx.beginPath();
    this.ctx.arc(0, -6, 9, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = '#f8fafc';
    this.ctx.beginPath();
    this.ctx.arc(0, -6, 4.5, 0, Math.PI * 2);
    this.ctx.fill();

    const cw = this.cardWidth;
    const ch = this.cardHeight;
    const cx = -cw / 2;
    const cy = 0;

    // Card Soft Shadow (Box Only)
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    this.ctx.shadowBlur = 20;
    this.ctx.shadowOffsetY = 10;

    // Base Fill for Shadow
    this.ctx.fillStyle = '#ffffff';
    this.drawRoundRect(cx, cy, cw, ch, this.cardRadius, '#ffffff');

    // RESET SHADOW IMMEDIATELY TO PREVENT DOUBLE GHOSTING
    this.ctx.shadowColor = 'transparent';
    this.ctx.shadowBlur = 0;
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;

    // FULL FRAME PHOTO CLIP & DRAWING
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.roundRect(cx, cy, cw, ch, this.cardRadius);
    this.ctx.clip();

    if (this.avatarLoaded) {
      const imgRatio = this.avatarImg.width / this.avatarImg.height;
      const cardRatio = cw / ch;
      let renderW, renderH, renderX, renderY;

      if (imgRatio > cardRatio) {
        renderH = ch;
        renderW = ch * imgRatio;
        renderX = cx - (renderW - cw) / 2;
        renderY = cy;
      } else {
        renderW = cw;
        renderH = cw / imgRatio;
        renderX = cx;
        renderY = cy - (renderH - ch) / 2;
      }
      this.ctx.drawImage(this.avatarImg, renderX, renderY, renderW, renderH);
    } else {
      this.ctx.fillStyle = '#e2e8f0';
      this.ctx.fill();
    }
    this.ctx.restore();

    // Sleek Crimson Acrylic Border Accent
    this.ctx.beginPath();
    this.ctx.roundRect(cx, cy, cw, ch, this.cardRadius);
    this.ctx.strokeStyle = 'rgba(220, 38, 38, 0.65)';
    this.ctx.lineWidth = 2.5;
    this.ctx.stroke();

    // Top Clip Hole Overlay Slot
    this.ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
    this.ctx.beginPath();
    this.ctx.roundRect(-18, 10, 36, 9, 4.5);
    this.ctx.fill();
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    this.ctx.lineWidth = 1.2;
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawRoundRect(x, y, w, h, r, fillColor, strokeColor) {
    this.ctx.beginPath();
    this.ctx.roundRect(x, y, w, h, r);
    this.ctx.fillStyle = fillColor;
    this.ctx.fill();

    if (strokeColor) {
      this.ctx.strokeStyle = strokeColor;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
    }
  }

  startLoop() {
    const loop = () => {
      this.updatePhysics();
      this.draw();
      requestAnimationFrame(loop);
    };
    loop();
  }
}
