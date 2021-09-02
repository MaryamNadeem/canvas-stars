import './App.css';
import { useEffect } from 'react';

let canvas, ctx, mouse;
const particlesArray = [];
let hue = 0;
export default function App() {
  useEffect(() => {
    canvas = document.getElementById('canvas1');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // ctx.fillStyle = "white";
      // ctx.fillRect(10, 10, 150, 150);
    });

    mouse = { x: undefined, y: undefined };
    canvas.addEventListener('click', e => {
      mouse.x = e.x;
      mouse.y = e.y;
    });
    canvas.addEventListener('mousemove', e => {
      mouse.x = e.x;
      mouse.y = e.y;
      for (let i = 0; i < 10; i++) {
        particlesArray.push(new Particle());
      }
    });
    animate();
    // init();
    console.log(particlesArray);
  }, []);

  const drawCircle = () => {
    ctx.fillStyle = 'white';
    // ctx.fillRect(10, 10, 150, 150);
    // ctx.strokeStyle = "red";
    // ctx.lineWidth = "20";
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
    ctx.fill();
    // ctx.stroke();
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0,0,0,0.02)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    hue += 2;
    handleParticles();
    requestAnimationFrame(animate);
  };

  class Particle {
    constructor() {
      this.x = mouse.x;
      this.y = mouse.y;
      // this.x = Math.random() * canvas.width;
      // this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = 'hsl(' + hue + ',100%,50%)';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const init = () => {
    for (let i = 0; i < 100; i++) {
      particlesArray.push(new Particle());
    }
  };

  const handleParticles = () => {
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
      console.log('in for loop');

      for (let j = i; j < particlesArray.length; j++) {
        const dx = particlesArray[i].x - particlesArray[j].x;
        const dy = particlesArray[i].y - particlesArray[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = particlesArray[i].color;
          ctx.lineWidth = particlesArray[i].size / 20;
          ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
          ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
          ctx.stroke();
        }
      }
      if (particlesArray[i].size <= 0.3) {
        particlesArray.splice(i, 1);
        console.log(particlesArray.length);
        i--;
      }
    }
  };
  return (
    <div className="App">
      <canvas id="canvas1"></canvas>
    </div>
  );
}
