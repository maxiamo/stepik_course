window.addEventListener("DOMContentLoaded", () => {
  let nav = document.querySelector(".nav")
  document.fonts.ready.then(() => {
    initNav(nav)
  })
})

function initNav(nav) {
  let links = [...nav.querySelectorAll("a")]
  let sections = links.map(link => document.querySelector(
    link.getAttribute("href"))
  )

  links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault()

      let sectionY = sections[index].getBoundingClientRect().y
      let navHeight = nav.getBoundingClientRect().height

      window.scrollTo({
        behavior: "smooth",
        top: window.scrollY + sectionY - navHeight
      })
    })
  })

  let lineIndex = -1
  let atBottom = false
  let observer

  function render() {
    let active = atBottom ? sections.length - 1 : lineIndex
    links.forEach((link, index) => {
      link.classList.toggle("active", index === active)
    })
  }

  function observe() {
    let navHeight = nav.getBoundingClientRect().height
    let top = navHeight + 2
    let bottom = Math.max(window.innerHeight - top - 1, 0)

    observer?.disconnect()
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          lineIndex = sections.indexOf(entry.target)
        }
      })
      render()
    }, {
      rootMargin: `-${top}px 0px -${bottom}px 0px`
    })
    sections.forEach(section => observer.observe(section))
  }

  window.addEventListener("scroll", () => {
    let value = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1
    if (value !== atBottom) {
      atBottom = value
      render()
    }
  }, { passive: true })

  window.addEventListener("resize", observe)
  observe()
}
