import { useEffect, useState } from "react";
import { Window } from "../types/common";

export const useCoordinates = () => {
  const [point, setPoint] = useState<Window | null>(null);

  useEffect(() => {
    const updateCoordinates = () => {
      setPoint({
        x: window.screenX,
        y: window.screenY,
        width: window.outerWidth,
        height: window.outerHeight,
      });
    };

    window.addEventListener("resize", updateCoordinates);
    const intervalId = window.setInterval(updateCoordinates, 100);

    return () => {
      window.removeEventListener("resize", () => {});
      window.clearInterval(intervalId);
    };
  }, []);
  return [point] as const;
};
