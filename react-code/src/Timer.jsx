import { useEffect, useState } from 'react'

function Timer() {
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setCount(c => c + 1);
    }, 1000)

    if (paused) {
      clearTimeout(t);
    }

    return () => {
      clearTimeout(t);
    }
  }, [count, paused])

  const handleClick = (e) => {
    setPaused(paused => !paused);
  }

  return (
    <>
      {count} {"" + paused}
      <br />
      <button onClick={handleClick}>Toggle</button>
    </>
  )
}

export default Timer