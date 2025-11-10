import { useEffect, useRef } from "react";

interface MarqueeProps {
  text: string;
  className?: string;
}

const Marquee = ({ text, className = "" }: MarqueeProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Clone the content for seamless looping
    const content = marquee.innerHTML;
    marquee.innerHTML = content + content + content;
  }, []);

  return (
    <div className={`overflow-hidden bg-background border-y border-border py-4 ${className}`}>
      <div
        ref={marqueeRef}
        className="flex whitespace-nowrap animate-marquee"
        style={{
          animation: "marquee 40s linear infinite",
        }}
      >
        <span className="text-lg md:text-xl text-muted-foreground px-8">
          ❖ {text}
        </span>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
};

export default Marquee;
