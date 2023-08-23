import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [ windowSize, setWindowSize ] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize); // important to prevent memory leak
  }, [])

  return windowSize;
}

export default useWindowSize