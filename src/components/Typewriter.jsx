import React, { useState, useEffect } from "react";

const Typewriter = () => {
  const texts = [
    "Search for Maharastrian Cuisine...",
    "Search for Gujrathi Cuisine...",
    "Search for Bengali Cuisine...",
    "Search for North Indian Cuisine...",
    "Search for North Eastern Indian Cuisine...",
    "Search for South Indian Cuisine..."
  ];

  const [text, setText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing characters
        const nextText = currentText.substring(0, charIndex + 1);
        setText(nextText);

        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
        } else {
          setCharIndex((prev) => prev + 1);
        }
      } else {
        // Deleting characters
        const nextText = currentText.substring(0, charIndex - 1);
        setText(nextText);

        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);  // important step for looping through array
        }

        setCharIndex((prev) => prev - 1);
      }
    };

    const timeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return <h1 className="typewriter">{text}</h1>;
};

export default Typewriter;
