import React, { useEffect, useRef } from 'react';

const COLORS = ['#101126', '#B08D57', '#7A2331'];
const SHAPES = ['circle', 'square'];

export default function ConfettiBurst() {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const lastTimeRef = useRef(0);

  // pre-allocate a fixed-size object pool (350 elements) to avoid garbage collection stutters
  const poolRef = useRef([]);

  // Mobile/Low-end device detection
  const isLowerTierRef = useRef(false);

  // Debounced window dimensions
  const dimsRef = useRef({ width: window.innerWidth, height: window.innerHeight });
  const resizeTimeoutRef = useRef(null);

  // Mobile touch tracker states
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    // Detect device performance
    const concurrency = navigator.hardwareConcurrency || 4;
    isLowerTierRef.current = isTouchDevice || concurrency < 4;

    // Initialize object pool once on mount
    poolRef.current = Array.from({ length: 350 }, () => ({
      active: false,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      size: 0,
      color: '',
      shape: '',
      opacity: 0,
      rotation: 0,
      spinSpeed: 0,
      gravity: 0,
      decay: 0,
      spawnTime: 0
    }));

    // 1. Resize canvas backing resolution
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = dimsRef.current.width * dpr;
      canvas.height = dimsRef.current.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();

    // Debounced window resize handler to keep currently-animating targets stable
    const handleResize = () => {
      clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        dimsRef.current = { width: window.innerWidth, height: window.innerHeight };
        resizeCanvas();
      }, 180);
    };

    window.addEventListener('resize', handleResize);

    // 2. Optimized Particle spawner utilizing the pre-allocated pool
    const spawnConfetti = (clickX, clickY) => {
      if (prefersReducedMotion) return;

      const width = dimsRef.current.width;
      const height = dimsRef.current.height;

      // Find the maximum distance from click coordinates to any of the 4 viewport corners
      const maxDist = Math.max(
        Math.hypot(clickX, clickY),
        Math.hypot(width - clickX, clickY),
        Math.hypot(clickX, height - clickY),
        Math.hypot(width - clickX, height - clickY)
      );

      // Scale spawn count based on device profile (approx. 100 on desktop, 55 on mobile)
      const count = isLowerTierRef.current
        ? 45 + Math.floor(Math.random() * 20)
        : 90 + Math.floor(Math.random() * 30);

      const now = performance.now();
      let spawned = 0;

      // Search pool for inactive objects, resetting oldest items if pool is full
      const findFreeParticle = () => {
        let candidate = null;
        let oldestTime = Infinity;

        for (let i = 0; i < 350; i++) {
          const p = poolRef.current[i];
          if (!p.active) {
            return p;
          }
          if (p.spawnTime < oldestTime) {
            oldestTime = p.spawnTime;
            candidate = p;
          }
        }
        // Steal the oldest active particle
        return candidate;
      };

      for (let i = 0; i < count; i++) {
        const p = findFreeParticle();
        if (!p) break;

        // Distribute initial angles evenly around full 360 degrees
        const baseAngle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.15;
        
        // Randomize target distances as a fraction of max viewport distance
        const targetDist = maxDist * (0.15 + Math.random() * 0.85);

        // Lifetime in frames (determines decay)
        const lifetime = 75 + Math.random() * 45; // 1.25s to 2s
        const friction = 0.975;
        
        // Calculate the exact initial velocity required to reach the target distance
        const frictionSum = (1.0 - Math.pow(friction, lifetime)) / (1.0 - friction);
        const speed = targetDist / frictionSum;

        p.active = true;
        p.x = clickX;
        p.y = clickY;
        p.vx = Math.cos(baseAngle) * speed;
        p.vy = Math.sin(baseAngle) * speed - (1 + Math.random() * 3); // upward launch bias
        p.size = 3.5 + Math.random() * 4.5;
        p.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        p.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        p.opacity = 1.0;
        p.rotation = Math.random() * Math.PI * 2;
        p.spinSpeed = (Math.random() - 0.5) * 0.2;
        p.gravity = 0.12 + Math.random() * 0.08;
        p.decay = 1.0 / lifetime;
        p.spawnTime = now;

        spawned++;
      }

      // Start tick animation loop
      if (!requestRef.current) {
        lastTimeRef.current = performance.now();
        requestRef.current = requestAnimationFrame(gridTick);
      }
    };



    // 3. Render tick loop (Delta-time-based calculations + draw batching)
    const gridTick = (timestamp) => {
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Delta factor normalized around 60fps (16.66ms per frame)
      const dt = Math.min(3.0, delta / 16.666);

      const width = dimsRef.current.width;
      const height = dimsRef.current.height;
      let activeCount = 0;

      // Physics pass
      for (let i = 0; i < 350; i++) {
        const p = poolRef.current[i];
        if (!p.active) continue;

        p.vx *= Math.pow(0.975, dt);
        p.vy *= Math.pow(0.975, dt);
        p.vy += p.gravity * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rotation += p.spinSpeed * dt;
        p.opacity -= p.decay * dt;

        // Deactivate if fully transparent
        if (p.opacity <= 0) {
          p.active = false;
          continue;
        }

        activeCount++;
      }

      ctx.clearRect(0, 0, width, height);

      if (activeCount === 0) {
        requestRef.current = null;
        return;
      }

      // Batch draw calls by color to minimize canvas state changes
      COLORS.forEach((color) => {
        ctx.fillStyle = color;

        // Draw Circles directly without translate/rotate matrix overhead
        ctx.beginPath();
        for (let i = 0; i < 350; i++) {
          const p = poolRef.current[i];
          if (!p.active || p.color !== color || p.shape !== 'circle') continue;

          // Graceful border boundary opacity fade
          const distToEdge = Math.min(p.x, p.y, width - p.x, height - p.y);
          const edgeFade = distToEdge < 45 ? Math.max(0, distToEdge / 45) : 1.0;
          ctx.globalAlpha = p.opacity * edgeFade;

          ctx.moveTo(p.x, p.y);
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        }
        ctx.fill();

        // Draw Squares (Requires matrix coordinate translations)
        for (let i = 0; i < 350; i++) {
          const p = poolRef.current[i];
          if (!p.active || p.color !== color || p.shape !== 'square') continue;

          const distToEdge = Math.min(p.x, p.y, width - p.x, height - p.y);
          const edgeFade = distToEdge < 45 ? Math.max(0, distToEdge / 45) : 1.0;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.opacity * edgeFade;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      requestRef.current = requestAnimationFrame(gridTick);
    };

    // 4. Click/Touch listeners on window context
    const handleActionTrigger = (clientX, clientY) => {
      spawnConfetti(clientX, clientY);
    };

    const handleClick = (e) => {
      if (isTouchDevice) return; // Ignore standard clicks on touch screens
      
      // Exclude menu links, CTA elements, buttons, and nav containers
      if (e.target.closest('#main-nav') || e.target.closest('a') || e.target.closest('button')) {
        return;
      }
      handleActionTrigger(e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
      if (e.target.closest('#main-nav') || e.target.closest('a') || e.target.closest('button')) {
        return;
      }
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: performance.now()
      };
    };

    const handleTouchEnd = (e) => {
      const touch = e.changedTouches[0];
      const start = touchStartRef.current;
      
      const timeDiff = performance.now() - start.time;
      const dist = Math.hypot(touch.clientX - start.x, touch.clientY - start.y);

      // Verify strict limits to prevent triggers during swipe scrolling
      if (timeDiff < 300 && dist < 10) {
        handleActionTrigger(touch.clientX, touch.clientY);
      }
    };

    const parent = canvas.parentElement || document.getElementById('home') || window;

    parent.addEventListener('click', handleClick);
    parent.addEventListener('touchstart', handleTouchStart, { passive: true });
    parent.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      clearTimeout(resizeTimeoutRef.current);
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('click', handleClick);
      parent.removeEventListener('touchstart', handleTouchStart);
      parent.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        pointerEvents: 'none',
        display: 'block'
      }}
    />
  );
}
