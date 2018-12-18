export function freezeBackground () {
  if (document.body.classList.contains('prevent-scroll')) {
    return // prevent duplicate calls
  }
  document.body.style.setProperty('top', - (document.documentElement.scrollTop) + 'px' )
  document.body.classList.add('prevent-scroll')
}

export function unfreezeBackground () {
  if (!document.body.classList.contains('prevent-scroll')) {
    return // prevent duplicate calls
  }
  const top = document.body.style.getPropertyValue('top')
  document.body.classList.remove('prevent-scroll')
  document.body.style.removeProperty('top')
  document.documentElement.scrollTop = parseInt(top) * -1
}
