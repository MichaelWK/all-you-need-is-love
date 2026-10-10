import { Window } from "../types/common";

type ConnectionProps = {
  myCoordinates: Window;
  myLoveCoordinates: Window;
};

const chrome = (w: Window) => {
  const border = (w.width - window.innerWidth) / 2;
  const top = w.height - window.innerHeight - border;
  return { border, top };
};

const viewportCenter = (w: Window, border: number, top: number) => ({
  x: w.x + border + (w.width - 2 * border) / 2,
  y: w.y + top + (w.height - top - border) / 2,
});

export const Connection = ({ myCoordinates, myLoveCoordinates }: ConnectionProps) => {
  if (typeof window === "undefined") return null;

  const { border, top } = chrome(myCoordinates);
  const me = viewportCenter(myCoordinates, border, top);
  const love = viewportCenter(myLoveCoordinates, border, top);

  const dx = love.x - me.x;
  const dy = love.y - me.y;
  if (dx === 0 && dy === 0) return null;

  const halfW = window.innerWidth / 2;
  const halfH = window.innerHeight / 2;
  const t = Math.min(dx !== 0 ? halfW / Math.abs(dx) : Infinity, dy !== 0 ? halfH / Math.abs(dy) : Infinity, 1);

  const edge = { x: halfW + dx * t, y: halfH + dy * t };

  return (
    <>
      <svg className="pointer-events-none fixed inset-0 h-screen w-screen">
        <line x1={halfW} y1={halfH} x2={edge.x} y2={edge.y} stroke="#d94141" strokeWidth={3} />
      </svg>
    </>
  );
};
