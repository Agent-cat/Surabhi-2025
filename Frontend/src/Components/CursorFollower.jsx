import { useEffect, useRef } from "react";
import gsap from "gsap";

const CursorFollower = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    let requestId;

    const handleMouseMove = (e) => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }

      requestId = requestAnimationFrame(() => {
        if (cursor) {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true
          });
        }
      });
    };

    const handleClick = () => {
      if (cursor) {
        gsap.to(cursor, {
          scale: 1.5,
          duration: 0.2,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(cursor, {
              scale: 1,
              duration: 0.2,
              ease: "power2.in",
              overwrite: true
            });
          },
          overwrite: true
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);

    return () => {
      if (requestId) {
        cancelAnimationFrame(requestId);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="hidden md:block pointer-events-none fixed w-10 h-10 z-[9999] mix-blend-difference"
      style={{
        border: "2px solid #ad59ce",
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        willChange: "transform"
      }}
    />
  );
};

export default CursorFollower;
