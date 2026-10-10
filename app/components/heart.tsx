"use client";

import { useState } from "react";
import { useCoordinates } from "../hooks/useCoordinates";
import { useStorage } from "../hooks/useStorage";
import { HeartState } from "../types/common";

export const Heart = () => {
  const [lonelyHeart, setLonelyHeart] = useState<HeartState | null>(null);

  const onChange = (heartState: HeartState | null) => {
    if (heartState && !heartState.isConnected) {
      console.log("Received value from storage:", heartState);
      setLonelyHeart(heartState);
    }
  };

  const [x, y] = useCoordinates();
  const [getStorageValue, setStorageValue] = useStorage<HeartState>("heartCoordinates", onChange);

  return (
    <>
      <div className="text-4xl text-red-500 dark:text-red-400 animate-pulse-slow">❤︎</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{`Screen coordinates: (${x}, ${y})`}</div>
      <div>
        <button
          onClick={() => setStorageValue({ coordinates: { x, y }, isConnected: false })}
          className="flex flex-col items-center"
        >
          Test
        </button>
        {lonelyHeart && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {`Lonely heart coordinates: (${lonelyHeart.coordinates.x}, ${lonelyHeart.coordinates.y})`}
          </div>
        )}
      </div>
    </>
  );
};
