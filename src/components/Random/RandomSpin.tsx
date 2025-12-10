"use client";
import { useEffect, useState, useRef } from "react";
import "./RandomSpin.scss";

type Item = {
  id: string | number;
  name: string;
  image_url: string;
  stars?: number;
  description?: string;
  rarity?: string;
};

type RandomSpinProps = {
  items: Item[];
  result?: Item;
};

export default function RandomSpin({ items, result }: RandomSpinProps) {
  const [position, setPosition] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(30); // tốc độ ban đầu (ms)
  const [running, setRunning] = useState<boolean>(false);
  const itemWidth = 120; // px
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!running) return;

    const currentSpeed = speed;
    let interval: ReturnType<typeof setInterval>;

    const roll = () => {
      interval = setInterval(() => {
        setPosition((prev) => prev - itemWidth);

        // Reset khi chạy quá dài
        if (Math.abs(position) > items.length * itemWidth) {
          setPosition(0);
        }
      }, currentSpeed);
    };

    roll();

    return () => clearInterval(interval);
  }, [running, speed, items.length, position, itemWidth]);

  // Khi có kết quả từ API → slowdown → stop
  useEffect(() => {
    if (!result) return;

    // Start spinning when result arrives
    setTimeout(() => setRunning(true), 0);

    // Slowdown effect
    const slowDownSteps = [60, 90, 130, 180, 260, 360];

    slowDownSteps.forEach((delay, index) => {
      setTimeout(() => setSpeed(delay), index * 400);
    });

    // Stop đúng vị trí kết quả
    setTimeout(() => {
      setRunning(false);

      const index = Array.isArray(items)
        ? items.findIndex((i) => i.id === result.id)
        : -1;
      const offset =
        -index * itemWidth +
        ((containerRef.current?.offsetWidth ?? 0) / 2 - itemWidth / 2);

      setPosition(offset);
    }, slowDownSteps.length * 400 + 700);
  }, [result, items, itemWidth]);

  return (
    <div ref={containerRef} className="random-spin">
      {/* Highlight ô giữa */}
      <div className="random-spin__marker"></div>

      {/* List items */}
      <div
        className="random-spin__list"
        style={{
          transitionDuration: running ? "0ms" : "300ms",
          transform: `translateX(${position}px)`,
        }}>
        {(Array.isArray(items) ? items : []).map((item) => (
          <div key={item.id} className="random-spin__item">
            <img src={item.image_url} className="random-spin__img" />
            <p className="random-spin__name">{item.name}</p>
            {/* Hiển thị thêm thông tin nếu có */}
            {item.stars && (
              <p className="random-spin__stars">⭐ {item.stars}</p>
            )}
            {item.rarity && (
              <p className="random-spin__rarity">{item.rarity}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
