const config = {
  rootMargin: '0px 0px 50px 0px',
  threshold: 0
}

const imgs = document.querySelectorAll('[data-src]')

function setSrc (target, newsrc) {
  target.src = newsrc
  // if (target.dataset.src)
  target.removeAttribute('data-src')
}

function loadFailed (el) {
  const src = el.src
  const fallback = el.dataset.fallback
  setSrc(el, fallback)
  console.log(fallback)
  const failedImgs = document.querySelectorAll(`[data-fallback='${fallback}']`)
  console.log(failedImgs)
  failedImgs.forEach(i => {
    // setSrc(i, fallback)
  })
  // console.log(el.dataset.fallback)
  // console.log(el.src)
}

function preloadImage (target) {
  const targetSrc = target.dataset.src
  if (!targetSrc) return
  target.onload = function () {
    if (target.classList.contains('defer_thumbnail')) {
      target.classList.remove('defer_thumbnail')
    }
    Array.from(imgs)
      .filter(i => i.getAttribute('data-src') === targetSrc)
      .map(i => setSrc(i, targetSrc))
  }
  setSrc(target, targetSrc)
}

const observer = new IntersectionObserver(function (entries, self) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      preloadImage(entry.target)
      self.unobserve(entry.target)
    }
  })
}, config)

console.log(imgs.length)
imgs.forEach(img => {
  observer.observe(img)
})
