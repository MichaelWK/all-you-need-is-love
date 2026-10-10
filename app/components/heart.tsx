"use client";

import { useState } from "react";
import { useCoordinates } from "../hooks/useCoordinates";
import { useStorage } from "../hooks/useStorage";
import { HeartState } from "../types/common";
import { Connection } from "./connection";

export const Heart = () => {
  const [myLove, setMyLove] = useState<HeartState | null>(null);

  const onChange = (heartState: HeartState | null) => {
    if (heartState && !heartState.isConnected) {
      console.log("Received value from storage:", heartState);
      setMyLove(heartState);
    }
  };

  const [me] = useCoordinates();
  const [getStorageValue, setStorageValue] = useStorage<HeartState>("heartCoordinates", onChange);

  return (
    <div>
      <div className="text-4xl text-red-500 dark:text-red-400 animate-pulse-slow">❤︎</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{`Screen coordinates: (${me?.x}, ${me?.y})`}</div>
      <div>
        {me && (
          <button
            onClick={() => setStorageValue({ window: me, isConnected: false })}
            className="flex flex-col items-center"
          >
            Test
          </button>
        )}
      </div>
      {myLove && me && <Connection myCoordinates={me} myLoveCoordinates={myLove.window} />}
    </div>
  );
};
