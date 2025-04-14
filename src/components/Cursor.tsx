import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);

  // Spring animation for smoother cursor movement
  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(position.x, springConfig);
  const springY = useSpring(position.y, springConfig);

  // Transform for cursor scale based on interaction
  const scale = useTransform(
    springX,
    [0, window.innerWidth],
    [1, isPointer ? 1.5 : 1]
  );

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      
      // Create a more dynamic trail effect
      setTrail(prev => {
        const newTrail = [...prev, newPosition];
        return newTrail.slice(-8); // Keep last 8 positions
      });
      
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.getAttribute('role') === 'button'
      );
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {trail.map((pos, index) => (
        <motion.div
          key={index}
          className="fixed top-0 left-0 w-3 h-3 pointer-events-none z-50 mix-blend-difference"
          initial={{ opacity: 0.1 }}
          animate={{
            x: pos.x - 6,
            y: pos.y - 6,
            opacity: index === trail.length - 1 ? 0.5 : 0.1,
          }}
          transition={{ duration: 0.1 }}
        >
          <div className="w-full h-full bg-white rounded-full blur-sm" />
        </motion.div>
      ))}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 pointer-events-none z-50 mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          scale: isClicking ? 0.8 : scale,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>
    </>
  );
};