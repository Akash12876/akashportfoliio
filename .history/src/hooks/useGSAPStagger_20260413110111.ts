// This file ensures GSAP is available for Next.js/React (client-side only)
import { useEffect, useRef, MutableRefObject } from "react";
import gsap from "gsap";

export function useGSAPStagger(refs: MutableRefObject<HTMLElement[] | null>, options = {}) {
  useEffect(() => {
    if (refs.current && refs.current.length) {
      gsap.fromTo(
        refs.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          ...options,
        }
      );
    }
  }, [refs, options]);
}
