import { useInView } from "react-intersection-observer"; 

type AnimatedTextProps = {
  firstText: string; 
  secondText: string;
};

export function AnimatedText({ firstText, secondText }: AnimatedTextProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.6, 
  });

  return (
    <div
      ref={ref}
      className={`pt-20 relative text-7xl font-bold text-center p-8 transition-all duration-3000 ease-in-out ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col justify-center items-center space-y-4">
        <span
          className={`transform ${
            inView ? "opacity-100 translate-x-0" : "opacity-30 -translate-x-20"
          } transition-all duration-1000 ease-in-out`}
        >
          {firstText}
        </span>

        <span
          className={`transform ${
            inView ? "opacity-100 translate-x-0" : "opacity-30 translate-x-20"
          } transition-all duration-1000 ease-in-out`}
        >
          {secondText}
        </span>
      </div>
    </div>
  );;
}
