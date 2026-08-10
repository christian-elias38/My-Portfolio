"use client";

import { useEffect, useState } from "react";

interface TypeWriterProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

export function TypeWriter({
  texts,
  speed = 80,
  deleteSpeed = 40,
  pauseTime = 2000,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[textIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentFullText.length) {
            setDisplayText(currentFullText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span>
      {displayText}
      <span className="typewriter-cursor" />
    </span>
  );
}
