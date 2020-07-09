import { useEffect, useRef, useCallback, useState } from 'react'

/**
 * Generic implementation to call a function when clicking
 * outside of an element.
 *
 * @param refs        Reference(s) to the element(s), React's useRef
 * @param callback    Function to call on outside click
 */
export function useOutsideClick(ref, callback) {
  const [refsArr] = useState(Array.isArray(ref) ? ref : [ref])
  const refs = useRef(refsArr)

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (!callback) {
        return null
      }

      if (refs.current.length === 0) {
        return null
      }

      const target = event.target

      const clickedInsideTargets = refs.current.some(
        currentRef => currentRef.current && currentRef.current.contains(target)
      )

      if (clickedInsideTargets) {
        return null
      }

      return callback(event)
    },
    [callback]
  )

  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick)
    }, 0)

    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [handleOutsideClick])
}
