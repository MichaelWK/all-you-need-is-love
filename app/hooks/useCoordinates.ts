import { useEffect, useState } from "react";

export const useCoordinates = () => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  useEffect(() => {
    const updateCoordinates = () => {
      setX(Math.round(window.outerWidth / 2) + window.screenX);
      setY(Math.round(window.outerHeight / 2) + window.screenY);
    };

    window.addEventListener("resize", updateCoordinates);
    const intervalId = window.setInterval(updateCoordinates, 100);

    return () => {
      window.removeEventListener("resize", () => {});
      window.clearInterval(intervalId);
    };
  }, []);
  return [x, y] as const;
};
