import { useEffect, useState } from "react";

export const useCoordinates = () => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  useEffect(() => {
    setX(Math.round(window.outerWidth / 2) + window.screenX);
    setY(Math.round(window.outerHeight / 2) + window.screenY);
  }, []);
  return [x, y];
};
