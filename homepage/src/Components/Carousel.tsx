// Carousel.tsx
import React, { useRef, useEffect } from "react";

const images = [
  "https://plus.unsplash.com/premium_photo-1667114974806-1b8af9ee8fee?q=80&w=1170&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1661500878852-ca4b0776d056?q=80&w=1170&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1665972824374-9bac6a0862a0?q=80&w=1170&auto=format&fit=crop",
];

const Carousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({
          left: carouselRef.current.offsetWidth,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={carouselRef}
      className="w-full overflow-x-auto flex snap-x snap-mandatory scrollbar-hide "
    >
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          alt={`Slide ${idx + 1}`}
          className="w-full h-[300px] flex-shrink-0 snap-center object-cover rounded-xl"
          style={{ minWidth: "100%" }}
        />
      ))}
    </div>
  );
};

export default Carousel;
