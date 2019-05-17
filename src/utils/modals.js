export function freezeBackground () {
  const element = document.getElementsByClassName('page-container')[0]
  if (element.classList.contains('prevent-scroll')) {
    return // prevent duplicate calls
  }
  element.style.setProperty('top', - (document.documentElement.scrollTop) + 'px' )
  document.documentElement.scrollTop = parseInt(top) * -1
  element.classList.add('prevent-scroll')
}

export function unfreezeBackground () {
  const element = document.getElementsByClassName('page-container')[0]
  if (!element.classList.contains('prevent-scroll')) {
    return // prevent duplicate calls
  }
  const top = element.style.getPropertyValue('top')
  element.classList.remove('prevent-scroll')
  element.style.removeProperty('top')
  document.documentElement.scrollTop = parseInt(top) * -1
}
