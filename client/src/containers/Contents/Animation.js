import * as React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shuffle } from "lodash";

const seedColors = [
  "#0c056d", "#590d82", "#b61aae", "#f25d9c",
];

const spring = {
  type: "spring",
  damping: 25,
  stiffness: 300
};

export const Animation = () => {
  const [colors, setColors] = useState(seedColors);

  useEffect(() => {
    setTimeout(() => setColors(shuffle(colors)), 1000);
  }, [colors]);

  return (
    <ul className="flex flex-wrap relative max-w-xl">
      {colors.map(background => (
        <motion.li
          key={background}
          layoutTransition={spring}
          className="w-32 h-32 rounded-md mr-2 mt-2"
          style={{ background }}
        />
      ))}
    </ul>
  );
};
