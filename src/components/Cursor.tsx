import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Cursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Smooth spring animation for cursor movement
  const cursorX = useSpring(0, { stiffness: 500, damping: 30 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 30 });

  // Size transformations
  const scale = useTransform(
    useSpring(isHovering ? 1.5 : 1, { stiffness: 500, damping: 30 }),
    [1, 1.5],
    [1, 1.5]
  );

  // Opacity transformations
  const opacity = useTransform(
    useSpring(isHovering ? 0.8 : 1, { stiffness: 500, damping: 30 }),
    [1, 0.8],
    [1, 0.8]
  );

  // Rotation for drag effect
  const rotate = useTransform(
    useSpring(isDragging ? 45 : 0, { stiffness: 500, damping: 30 }),
    [0, 45],
    [0, 45]
  );

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = () => setIsDragging(false);

    // Add event listeners for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => setIsHovering(true));
      element.addEventListener('mouseleave', () => setIsHovering(false));
      element.addEventListener('mousedown', handleDragStart);
      element.addEventListener('mouseup', handleDragEnd);
    });

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', () => setIsHovering(true));
        element.removeEventListener('mouseleave', () => setIsHovering(false));
        element.removeEventListener('mousedown', handleDragStart);
        element.removeEventListener('mouseup', handleDragEnd);
      });
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-50 mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        scale,
        opacity,
        rotate,
        backgroundColor: isHovering ? '#4F46E5' : '#FFFFFF',
        borderRadius: isHovering ? '50%' : '0%',
        transition: 'border-radius 0.3s ease',
      }}
      animate={{
        scale: isClicking ? 0.8 : 1,
        backgroundColor: isHovering ? '#4F46E5' : '#FFFFFF',
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
    >
      {/* Inner cursor dot */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: isHovering ? '#FFFFFF' : '#4F46E5',
          scale: isHovering ? 0.4 : 0.2,
          borderRadius: '50%',
        }}
        animate={{
          scale: isClicking ? 0.6 : isHovering ? 0.4 : 0.2,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
      
      {/* Cursor ring */}
      <motion.div
        className="absolute inset-0 border-2"
        style={{
          borderColor: isHovering ? '#4F46E5' : '#FFFFFF',
          scale: isHovering ? 1.2 : 1,
          borderRadius: '50%',
        }}
        animate={{
          scale: isClicking ? 0.9 : isHovering ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
    </motion.div>
  );
};