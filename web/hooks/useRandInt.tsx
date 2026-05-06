import { useState } from "react";

export const useRandInt = (min: number, max: number) => {
  const [randInt, setRandInt] = useState(() =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );

    return { randInt, setRandInt };
};