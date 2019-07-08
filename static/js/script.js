const config = {
  rootMargin: '0px 0px 50px 0px',
  threshold: 0
}

function preloadImage (target) {
  target.setAttribute('src', target.dataset.src)
  target.classList.remove('defer_thumbnail')
}

const observer = new IntersectionObserver(function (entries, self) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      preloadImage(entry.target)
      self.unobserve(entry.target)
    }
  })
}, config)

const imgs = document.querySelectorAll('[data-src]')
imgs.forEach(img => {
  observer.observe(img)
})
