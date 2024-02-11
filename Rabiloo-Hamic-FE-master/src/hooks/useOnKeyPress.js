import React, { useEffect, useRef } from 'react';

function useOnKeyPress(keyPress, callback) {
  const cbRef = useRef(callback);

  useEffect(() => {
    cbRef.current = callback;
  });

  useEffect(() => {
    window.addEventListener('keypress', (e) => {
      if (e.key == keyPress) {
        cbRef.current();
      }
    });
    return () => {
      window.removeEventListener('keypress', callback, true);
    };
  }, []);
}

export { useOnKeyPress };
