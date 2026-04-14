import { ReactNode } from "react";
import { useTilt3D } from "@/hooks/useScrollAnimations";

const Tilt3DCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  const ref = useTilt3D();
  return (
    <div ref={ref} data-anim="card" className={className} style={{ willChange: "transform", perspective: "1000px" }}>
      {children}
    </div>
  );
};

export default Tilt3DCard;
