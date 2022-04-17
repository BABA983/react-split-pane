import { useEffect } from 'react';
export default function (fn: () => void) {
  useEffect(() => {
    fn();
  }, []);
}
