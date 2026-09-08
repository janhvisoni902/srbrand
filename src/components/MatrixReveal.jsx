import React, { useEffect, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@&%*+-?';

export default function MatrixReveal() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  // Mouse coordinates state ref
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // Grid details state ref
  const gridStateRef = useRef({
    cols: 0,
    rows: 0,
    cells: [],
    cellWidth: 10,
    cellHeight: 18,
    isMobileActive: false,
    mobileActiveStart: 0,
    lastTime: 0
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    let isInitialized = false;

    // 1. Grid allocation and brand text mapping setup
    const setupGrid = () => {
      isInitialized = true;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const fontSize = 13;
      ctx.font = `${fontSize}px monospace`;
      
      // Measure single character dimensions accurately
      const metrics = ctx.measureText('A');
      const cellWidth = Math.ceil(metrics.width) + 3;
      const cellHeight = fontSize + 5;

      const cols = Math.floor(rect.width / cellWidth);
      const rows = Math.floor(rect.height / cellHeight);

      if (cols <= 0 || rows <= 0) return;

      const cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({
            char: CHARS[Math.floor(Math.random() * CHARS.length)],
            targetChar: null, // Holds resolved character value
            opacity: 0.15 + Math.random() * 0.25,
            x: c * cellWidth + cellWidth / 2,
            y: r * cellHeight + cellHeight,
            lastScrambleTime: 0,
            resolveOpacity: 0, // Crossfade interpolation
            resolved: false
          });
        }
      }

      // Map "SR BRAND SOLUTIONS" target texts centered in the grid
      const brandText = 'SR BRAND SOLUTIONS';
      
      if (cols >= brandText.length) {
        // Fits on a single row
        const startCol = Math.floor((cols - brandText.length) / 2);
        const targetRow = Math.floor(rows / 2);
        
        for (let i = 0; i < brandText.length; i++) {
          const char = brandText[i];
          if (char !== ' ') {
            const cellIndex = targetRow * cols + (startCol + i);
            if (cells[cellIndex]) {
              cells[cellIndex].targetChar = char;
            }
          }
        }
      } else {
        // Split onto two rows if width is narrow
        const line1 = 'SR BRAND';
        const line2 = 'SOLUTIONS';
        
        const row1 = Math.floor(rows / 2) - 1;
        const row2 = Math.floor(rows / 2) + 1;
        
        const startCol1 = Math.floor((cols - line1.length) / 2);
        const startCol2 = Math.floor((cols - line2.length) / 2);

        // Map line 1
        for (let i = 0; i < line1.length; i++) {
          const char = line1[i];
          if (char !== ' ' && startCol1 + i >= 0 && startCol1 + i < cols) {
            const cellIndex = row1 * cols + (startCol1 + i);
            if (cells[cellIndex]) cells[cellIndex].targetChar = char;
          }
        }

        // Map line 2
        for (let i = 0; i < line2.length; i++) {
          const char = line2[i];
          if (char !== ' ' && startCol2 + i >= 0 && startCol2 + i < cols) {
            const cellIndex = row2 * cols + (startCol2 + i);
            if (cells[cellIndex]) cells[cellIndex].targetChar = char;
          }
        }
      }

      gridStateRef.current = {
        cols,
        rows,
        cells,
        cellWidth,
        cellHeight,
        isMobileActive: false,
        mobileActiveStart: 0,
        lastTime: performance.now()
      };
    };



    // 2. Main Render tick loop
    const tick = (now) => {
      const state = gridStateRef.current;
      const deltaTime = (now - state.lastTime) / 1000;
      state.lastTime = now;

      if (prefersReducedMotion) {
        // Accessibility static state
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '13px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        state.cells.forEach((cell) => {
          if (cell.targetChar) {
            ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
            ctx.fillText(cell.targetChar, cell.x, cell.y);
          }
        });
        return;
      }

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '13px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const mouse = mouseRef.current;
      const radius = 140; // cursor reaction radius bounds

      // Check mobile touch auto-resolve timer states
      let mobileForceResolve = false;
      if (isTouchDevice && state.isMobileActive) {
        const elapsed = now - state.mobileActiveStart;
        if (elapsed < 2800) {
          mobileForceResolve = true;
        } else {
          state.isMobileActive = false;
        }
      }

      state.cells.forEach((cell) => {
        let isClose = false;
        let intensity = 0;
        let pixelOffset = { x: 0, y: 0 };

        if (mobileForceResolve && cell.targetChar) {
          isClose = true;
          intensity = 1.0;
        } else if (!isTouchDevice) {
          const dx = cell.x - mouse.x;
          const dy = cell.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < radius) {
            isClose = true;
            intensity = 1 - dist / radius;
            
            // Random turbulence offsets near cursor
            const displacement = intensity * 4;
            pixelOffset.x = (Math.random() - 0.5) * displacement;
            pixelOffset.y = (Math.random() - 0.5) * displacement;
          }
        }

        // Handle cell text resolution values
        if (cell.targetChar) {
          if (isClose) {
            cell.resolved = true;
            cell.lastScrambleTime = now; // Store resolution mark
            cell.resolveOpacity = Math.min(1.0, cell.resolveOpacity + deltaTime * 5.0); // crossfade in
          } else {
            // Revert delay of 450ms
            if (now - cell.lastScrambleTime > 450) {
              cell.resolved = false;
              cell.resolveOpacity = Math.max(0.0, cell.resolveOpacity - deltaTime * 3.0); // crossfade out
            }
          }
        }

        // Random ambient scrambling probability (3% base, scaled by proximity intensity)
        const scrambleProbability = 0.03 + intensity * 0.95;
        if (Math.random() < scrambleProbability * (deltaTime / 0.016)) {
          cell.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        // Draw character
        if (cell.targetChar) {
          const resVal = cell.resolveOpacity;
          
          if (resVal > 0) {
            // Draw Target resolved letter
            ctx.fillStyle = `rgba(255, 255, 255, ${resVal})`;
            ctx.fillText(cell.targetChar, cell.x + pixelOffset.x, cell.y + pixelOffset.y);
          }
          
          if (resVal < 1) {
            // Draw Scrambled overlay
            ctx.fillStyle = `rgba(180, 141, 87, ${(1 - resVal) * 0.45})`;
            ctx.fillText(cell.char, cell.x + pixelOffset.x, cell.y + pixelOffset.y);
          }
        } else {
          // Draw standard ambient noise grid cell
          const baseAlpha = 0.15 + intensity * 0.5;
          ctx.fillStyle = `rgba(150, 150, 150, ${baseAlpha})`;
          ctx.fillText(cell.char, cell.x + pixelOffset.x, cell.y + pixelOffset.y);
        }
      });

      requestRef.current = requestAnimationFrame(tick);
    };

    // 3. Mouse interactions tracking
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    if (!isTouchDevice) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    // 4. Resize and Visibility handlers
    const handleResize = () => {
      if (!isInitialized) return;
      clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        setupGrid();
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    // Stop ticks when tab goes hidden
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible && isInitialized) {
        gridStateRef.current.lastTime = performance.now();
        requestRef.current = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(requestRef.current);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Stop ticks when section scrolls out of view
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const startLoop = () => {
              if (isTouchDevice) {
                const state = gridStateRef.current;
                state.isMobileActive = true;
                state.mobileActiveStart = performance.now();
              }
              gridStateRef.current.lastTime = performance.now();
              cancelAnimationFrame(requestRef.current);
              requestRef.current = requestAnimationFrame(tick);
            };

            if (!isInitialized) {
              document.fonts.ready.then(() => {
                setupGrid();
                startLoop();
              });
            } else {
              startLoop();
            }
          } else {
            cancelAnimationFrame(requestRef.current);
          }
        });
      },
      { threshold: 0.05 }
    );
    sectionObserver.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(requestRef.current);
      clearTimeout(resizeTimeoutRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        backgroundColor: '#000000',
        padding: '5rem 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <canvas
        ref={canvasRef}
        aria-label="SR Brand Solutions text scrambling interactive matrix grid"
        style={{
          width: '100%',
          height: '420px',
          display: 'block',
          cursor: 'default'
        }}
      />
    </div>
  );
}
