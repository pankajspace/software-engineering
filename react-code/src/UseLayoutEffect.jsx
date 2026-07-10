// https://react.dev/reference/react/useLayoutEffect
// https://kentcdodds.com/blog/useeffect-vs-uselayouteffect
// useLayoutEffect is a version of useEffect that fires before the browser repaints the screen.

import { useEffect, useState, useRef, useLayoutEffect } from 'react'

export default function UseLayoutEffect() {
  const [show, setShow] = useState(false);

  const button = useRef()
  const popup = useRef()

  // // jumpy 
  // useEffect(() => {
  //   if (popup.current == null || button.current == null) { return }
  //   const { bottom } = button.current.getBoundingClientRect();
  //   popup.current.style.top = `${bottom + 25}px`
  // }, [show])

  // smooth
  useLayoutEffect(() => {
    if (popup.current == null || button.current == null) { return }
    const { bottom } = button.current.getBoundingClientRect();
    popup.current.style.top = `${bottom + 25}px`
  }, [show])

  return (
    <main>
      <button ref={button} onClick={() => setShow(!show)}>Toggle</button>
      {show && <div ref={popup} style={{ position: "absolute" }}>Popup</div>}
    </main>
  )
}
