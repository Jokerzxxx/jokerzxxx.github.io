'use strict'

document.addEventListener('DOMContentLoaded', function () {
  const toc = document.querySelector('#data-toc[collapse="true"]')
  if (!toc) return

  // 默认收起所有有子级的目录项（当前浏览章节及其父级除外）
  const items = toc.querySelectorAll('.toc-item')
  items.forEach(function (item) {
    const child = item.querySelector(':scope > .toc-link + .toc-child')
    if (!child) return
    item.classList.add('toc-has-child')
    // 当前项或子级中有 active 则默认展开
    const hasActive = item.classList.contains('active') || item.querySelector('.active')
    if (!hasActive) {
      item.classList.add('toc-manual-collapsed')
    }
  })

  // 点击切换展开/收起
  toc.addEventListener('click', function (event) {
    const link = event.target.closest('a.toc-link')
    if (!link || !toc.contains(link)) return

    const item = link.parentElement
    const child = link.nextElementSibling
    if (!item || !child || !child.classList.contains('toc-child')) return

    if (item.classList.contains('toc-manual-collapsed')) {
      item.classList.remove('toc-manual-collapsed')
      if (link.classList.contains('active')) {
        event.preventDefault()
      }
      return
    }

    if (window.getComputedStyle(child).display !== 'none') {
      item.classList.add('toc-manual-collapsed')
      event.preventDefault()
    }
  })
})
