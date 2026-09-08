import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from '../lib/gsap';

const BRAND_TEXT = 'SR BRAND SOLUTIONS';

export default function ParticleTypography() {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const observerRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  // HTML overlay interactions
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Keep track of Three/GSAP handles to avoid re-creation issues
  const stateRef = useRef({
    renderer: null,
    scene: null,
    camera: null,
    geometry: null,
    points: null,
    proxy: { progress: 0 },
    transitionTimeline: null,
    isTransitioning: false,
    particles: [],
    mouse3D: new THREE.Vector3(-1000, -1000, 0),
    isInitialized: false,
    prefersReducedMotion: false
  });

  useEffect(() => {
    stateRef.current.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsMobile(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const mount = mountRef.current;
    if (!container || !mount) return;

    let isVisible = true;
    let animationFrameId;
    let localLoopCount = 0;

    // Helper: Draw text and sample filled pixel coordinate points
    const sampleTextPoints = (text, width, height) => {
      const offscreen = document.createElement('canvas');
      const octx = offscreen.getContext('2d');
      offscreen.width = 1600;
      offscreen.height = 400;

      const isMobileSize = width < 768;
      const fontSize = isMobileSize ? 100 : 145;
      octx.font = `bold ${fontSize}px Fraunces, serif`;
      octx.fillStyle = '#ffffff';
      octx.textBaseline = 'middle';
      octx.textAlign = 'center';

      let points = [];

      const extractPoints = () => {
        const imgData = octx.getImageData(0, 0, 1600, 400);
        const data = imgData.data;
        const pts = [];
        const step = isMobileSize ? 5 : 4;
        const scale = isMobileSize ? 0.0145 : 0.0185;

        for (let y = 0; y < 400; y += step) {
          for (let x = 0; x < 1600; x += step) {
            const alpha = data[(y * 1600 + x) * 4 + 3];
            if (alpha > 120) {
              pts.push({
                x: (x - 800) * scale,
                y: -(y - 200) * scale,
                z: 0
              });
            }
          }
        }
        return pts;
      };

      // Try sampling with primary font
      if (!isMobileSize) {
        octx.fillText(text, 800, 200);
      } else {
        octx.fillText('SR BRAND', 800, 130);
        octx.fillText('SOLUTIONS', 800, 270);
      }
      points = extractPoints();

      // Fallback 1: if primary font sampling failed to render or find pixels
      if (points.length === 0) {
        octx.clearRect(0, 0, 1600, 400);
        octx.font = `bold ${fontSize}px sans-serif`;
        if (!isMobileSize) {
          octx.fillText(text, 800, 200);
        } else {
          octx.fillText('SR BRAND', 800, 130);
          octx.fillText('SOLUTIONS', 800, 270);
        }
        points = extractPoints();
      }

      // Fallback 2: absolute failsafe (generate standard particle grid)
      if (points.length === 0) {
        console.warn("WebGL text sampling returned 0 points. Activating absolute grid fallback.");
        for (let i = 0; i < 2000; i++) {
          points.push({
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 3,
            z: 0
          });
        }
      }

      // Shuffle points randomly to distribute delays
      for (let i = points.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [points[i], points[j]] = [points[j], points[i]];
      }

      const maxCount = isMobileSize ? 2500 : 4500;
      return points.slice(0, maxCount);
    };

    // Programmatically generate a circular soft-glowing point sprite texture
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.3, 'rgba(255,255,255,0.8)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(canvas);
    };

    // Setup Three.js WebGL rendering environment
    const initScene = () => {
      try {
        const rect = mount.getBoundingClientRect();
        const width = rect.width || mount.clientWidth || window.innerWidth || 1000;
        const height = 420;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000); // Black cinematic bg

        // Perspective Camera centered on the Z=0 interaction layer
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        
        const text3DWidth = width < 768 ? 22 : 27;
        const fovRad = (45 * Math.PI) / 180;
        camera.position.z = Math.max(12, text3DWidth / (2 * Math.tan(fovRad / 2) * (width / height)));

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Explicitly style the canvas to avoid clipping/sliver layout overrides
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.display = 'block';

        mount.appendChild(renderer.domElement);

        // Get WebGL Context diagnostics
        const gl = renderer.getContext();
        const glStatus = gl ? 'SUCCESSFUL' : 'FAILED';

        // Sample particle coordinate states
        const sampled = sampleTextPoints(BRAND_TEXT, width, height);
        const count = sampled.length;

        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        // CPU-side physics properties arrays
        const particles = [];
        const scatterRange = 15;

        for (let i = 0; i < count; i++) {
          const target = sampled[i];
          
          const phi = Math.random() * Math.PI * 2;
          const theta = Math.acos(Math.random() * 2 - 1);
          const radius = 2 + Math.random() * scatterRange;

          const sx = radius * Math.sin(theta) * Math.cos(phi);
          const sy = radius * Math.sin(theta) * Math.sin(phi);
          const sz = (Math.random() - 0.5) * 6;

          particles.push({
            px: target.x,
            py: target.y,
            pz: target.z,
            sx,
            sy,
            sz,
            x: sx,
            y: sy,
            z: sz,
            vx: 0,
            vy: 0,
            vz: 0,
            ox: 0,
            oy: 0,
            oz: 0,
            delay: Math.random() * 0.45,
            sizeVariance: 0.8 + Math.random() * 0.8
          });

          positions[i * 3] = sx;
          positions[i * 3 + 1] = sy;
          positions[i * 3 + 2] = sz;

          colors[i * 3] = 1.0;
          colors[i * 3 + 1] = 0.98;
          colors[i * 3 + 2] = 0.95;

          sizes[i] = particles[i].sizeVariance;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
          size: width < 768 ? 0.16 : 0.13,
          map: createCircleTexture(),
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          vertexColors: true
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        stateRef.current.renderer = renderer;
        stateRef.current.scene = scene;
        stateRef.current.camera = camera;
        stateRef.current.geometry = geometry;
        stateRef.current.points = points;
        stateRef.current.particles = particles;
        stateRef.current.isInitialized = true;
        stateRef.current.lastTime = performance.now();

        if (stateRef.current.prefersReducedMotion) {
          stateRef.current.proxy.progress = 1.0;
        } else {
          stateRef.current.proxy.progress = 0.0;
          gsap.to(stateRef.current.proxy, {
            progress: 1.0,
            duration: 2.2,
            ease: 'power2.out'
          });
        }
      } catch (err) {
        console.error("Crash during initScene:", err);
        setDebugInfo((prev) => ({ ...prev, error: err.toString() }));
      }
    };

    // Clean viewport/scene configurations on resize
    const handleResize = () => {
      const state = stateRef.current;
      if (!state.isInitialized) return;

      const rect = mount.getBoundingClientRect();
      const width = rect.width || mount.clientWidth || window.innerWidth || 1000;
      const height = 420;

      state.camera.aspect = width / height;
      const text3DWidth = width < 768 ? 22 : 27;
      const fovRad = (state.camera.fov * Math.PI) / 180;
      state.camera.position.z = Math.max(12, text3DWidth / (2 * Math.tan(fovRad / 2) * state.camera.aspect));

      state.camera.updateProjectionMatrix();
      state.renderer.setSize(width, height);

      // Re-sample text outlines for clean framing coordinates
      const sampled = sampleTextPoints(BRAND_TEXT, width, height);
      const count = Math.min(sampled.length, state.particles.length);

      for (let i = 0; i < count; i++) {
        const target = sampled[i];
        const p = state.particles[i];
        p.px = target.x;
        p.py = target.y;
        p.pz = target.z;
      }
    };

    // Main WebGL rendering loop
    const tick = (timestamp) => {
      if (!isVisible) return;

      const state = stateRef.current;
      const delta = timestamp - state.lastTime;
      state.lastTime = timestamp;
      const dt = Math.min(2.0, delta / 16.666);

      if (state.isInitialized) {
        const positions = state.geometry.attributes.position.array;
        const count = state.particles.length;
        const progress = state.proxy.progress;

        const prefersReduced = state.prefersReducedMotion;
        const mouse3D = state.mouse3D;

        const R = 2.4;
        const pushStrength = 0.07;
        const springStrength = 0.08;
        const damping = 0.88;

        for (let i = 0; i < count; i++) {
          const p = state.particles[i];

          let baseTransitionP = progress;
          if (!prefersReduced) {
            baseTransitionP = Math.max(0, Math.min(1, (progress - p.delay) / (1.0 - p.delay)));
            baseTransitionP = baseTransitionP * baseTransitionP * (3 - 2 * baseTransitionP);
          }

          const bx = p.sx + (p.px - p.sx) * baseTransitionP;
          const by = p.sy + (p.py - p.sy) * baseTransitionP;
          const bz = p.sz + (p.pz - p.sz) * baseTransitionP;

          if (!prefersReduced) {
            const dx = bx + p.ox - mouse3D.x;
            const dy = by + p.oy - mouse3D.y;
            const dz = bz + p.oz - mouse3D.z;
            const dist = Math.hypot(dx, dy, dz);

            if (dist < R && dist > 0.01) {
              const force = (1.0 - dist / R) * pushStrength;
              p.vx += (dx / dist) * force * dt;
              p.vy += (dy / dist) * force * dt;
              p.vz += (dz / dist) * force * dt;
            }

            p.vx += (0 - p.ox) * springStrength * dt;
            p.vy += (0 - p.oy) * springStrength * dt;
            p.vz += (0 - p.oz) * springStrength * dt;

            p.vx *= Math.pow(damping, dt);
            p.vy *= Math.pow(damping, dt);
            p.vz *= Math.pow(damping, dt);

            p.ox += p.vx * dt;
            p.oy += p.vy * dt;
            p.oz += p.vz * dt;
          } else {
            p.ox = 0;
            p.oy = 0;
            p.oz = 0;
          }

          positions[i * 3] = bx + p.ox;
          positions[i * 3 + 1] = by + p.oy;
          positions[i * 3 + 2] = bz + p.oz;
        }

        state.geometry.attributes.position.needsUpdate = true;
        state.renderer.render(state.scene, state.camera);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    // Initialize scene immediately
    initScene();
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(tick);

    // Re-sample text outlines after fonts are loaded
    document.fonts.ready.then(() => {
      if (stateRef.current.isInitialized) {
        handleResize();
      }
    });

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible = true;
            stateRef.current.lastTime = performance.now();
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(tick);
          } else {
            isVisible = false;
            cancelAnimationFrame(animationFrameId);
          }
        });
      },
      { threshold: 0.05 }
    );
    observerRef.current.observe(container);

    const resizeListener = () => {
      clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(handleResize, 180);
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeListener);
      clearTimeout(resizeTimeoutRef.current);
      if (observerRef.current) observerRef.current.disconnect();

      const state = stateRef.current;
      if (state.renderer) {
        if (state.points) state.scene.remove(state.points);
        if (state.geometry) state.geometry.dispose();
        if (state.points && state.points.material) state.points.material.dispose();
        state.renderer.dispose();
        if (mount.contains(state.renderer.domElement)) {
          mount.removeChild(state.renderer.domElement);
        }
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const mount = mountRef.current;
    const state = stateRef.current;
    if (!mount || !state.camera) return;

    const rect = mount.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    const mx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const my = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const tempV = new THREE.Vector3(mx, my, 0.5);
    tempV.unproject(state.camera);
    
    const dir = tempV.sub(state.camera.position).normalize();
    const distance = -state.camera.position.z / dir.z;
    state.mouse3D.copy(state.camera.position).add(dir.multiplyScalar(distance));
  };

  const triggerDisperseAndReform = () => {
    const state = stateRef.current;
    if (!state.isInitialized || state.isTransitioning) return;

    setHasInteracted(true);

    if (state.prefersReducedMotion) {
      return;
    }

    state.isTransitioning = true;
    
    const tl = gsap.timeline({
      onComplete: () => {
        state.isTransitioning = false;
      }
    });

    state.transitionTimeline = tl;

    tl.to(state.proxy, {
      progress: 0.0,
      duration: 1.1,
      ease: 'power2.inOut'
    });

    tl.to(state.proxy, {
      progress: 1.0,
      duration: 1.6,
      ease: 'power2.out',
      delay: 0.45
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerDisperseAndReform();
    }
  };

  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });

  const handleTouchStart = (e) => {
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

    if (timeDiff < 300 && dist < 10) {
      triggerDisperseAndReform();
    }
  };

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label="Interactive WebGL particle typography: Reveal SR Brand Solutions"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        stateRef.current.mouse3D.set(-1000, -1000, 0);
      }}
      onClick={triggerDisperseAndReform}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        width: '100%',
        backgroundColor: '#000000',
        padding: '2.5rem 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
        outlineOffset: '8px',
        overflow: 'hidden'
      }}
    >
      {/* Visually Hidden Text for screen-readers */}
      <span
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0
        }}
      >
        SR BRAND SOLUTIONS - Interactive WebGL particle typography section. Click or tap to disperse and reform.
      </span>



      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '420px',
          display: 'block'
        }}
      />

      {/* Interactivity prompt labels */}
      {!hasInteracted && (
        <>
          {isMobile ? (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#ffffff',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                pointerEvents: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                padding: '0.8rem 1.6rem',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                zIndex: 10
              }}
            >
              Tap to interact
            </div>
          ) : (
            isHovered && (
              <div
                style={{
                  position: 'absolute',
                  left: `${mousePos.x + 15}px`,
                  top: `${mousePos.y + 15}px`,
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  pointerEvents: 'none',
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  padding: '0.4rem 0.8rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  whiteSpace: 'nowrap',
                  zIndex: 10
                }}
              >
                Click to interact
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}
