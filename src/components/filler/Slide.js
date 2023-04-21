import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

const Slide = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(index => (index + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <Box
      display="flex"
      overflow="hidden"
      height="250px"
    >
      <Box
        display="flex"
        width={`${images.length * 100}%`}
        transform={`translateX(-${index * 100 / images.length}%)`}
        transition="transform 0.5s cubic-bezier(0.2, 0.7, 0.8, 1.2)"
        willChange="transform"
      >
        {images.map((image, i) => (
          <Box
            key={i}
            flex="none"
            width="190px"
            bgImage={`url(${image})`}
            bgPosition="center"
            bgSize="cover"
          />
        ))}
      </Box>
    </Box>
  );
};

export default Slide;
