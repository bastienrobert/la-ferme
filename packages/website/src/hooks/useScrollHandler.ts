import { useState, useEffect } from 'react'

export default () => {
  // setting initial value to true
  const [scroll, setScroll] = useState({})
  let slices = { teaser: true, project: false, download: false, contact: false }

  // running on mount
  useEffect(() => {
    const onScroll = () => {
      let sections = Array.from(document.querySelectorAll('section'))
        .filter(el => el.id.length > 0)
        .map(el => el.offsetTop)

      slices = {
        teaser:
          (window.scrollY + 10 > sections[0] && window.scrollY < sections[1]) ||
          window.scrollY <= 0
            ? true
            : false,
        project:
          window.scrollY + 10 > sections[1] && window.scrollY < sections[2]
            ? true
            : false,
        download:
          window.scrollY + 10 > sections[2] &&
          window.scrollY + 400 < sections[3]
            ? true
            : false,
        contact: window.scrollY + 400 > sections[3] ? true : false
      }

      sections.forEach(() => {
        setScroll({ ...scroll, slices })
      })
    }

    // setting the event handler from web API
    document.addEventListener('scroll', onScroll)

    // cleaning up from the web API
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [scroll, setScroll])

  return scroll
}
