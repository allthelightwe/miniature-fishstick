/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"443iKuGRAdXv6UJI","label":"reddit","bookmarks":[{"id":"xWCjNcEkpY5e36gN","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"VeMMxutR6D21TEB7","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"puL5armzO74ZX5Y5","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"ZG5NQSLtroN4ax5P","label":"design tools","bookmarks":[{"id":"RLQf9JiODyEeS91i","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"cseh6Mgxyj8aNhGY","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"R6zUftL5yRi8RtkK","label":"haikei","url":"https://app.haikei.app/"},{"id":"pPU7c4sfG4pF1v1t","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"OrpowZMlcY4HViEZ","label":"worth reading","bookmarks":[{"id":"JzEDZApfqnywXNQ1","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"mVrNEehpnEvvbhKi","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"qbO0BEfYqeGHt1CB","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"ZcZrTxQktB4UuEzN","label":"sources","bookmarks":[{"id":"OOG8quaxL8USyCkx","label":"icons","url":"https://feathericons.com/"},{"id":"Vd4TvBiKkNhCZxjt","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"dBnumtEGznMAR27g","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"XqFe1OzZHC7OgfC4","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
