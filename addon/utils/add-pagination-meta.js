const NO_PAGE_NUMBER = null
const PAGE_PARAM_KEY = 'page'

export default function addPaginationMeta (normalized) {
  if (hasPaginationLinks(normalized.links)) {
    normalized.meta.pagination = createPaginationMeta(
      normalized.links,
      normalized.meta
    )
  }

  return normalized
}

function hasPaginationLinks (links) {
  return (
    typeof links === 'object' &&
    (Object.prototype.hasOwnProperty.call(links, 'first') ||
      Object.prototype.hasOwnProperty.call(links, 'last') ||
      Object.prototype.hasOwnProperty.call(links, 'next') ||
      Object.prototype.hasOwnProperty.call(links, 'previous') ||
      Object.prototype.hasOwnProperty.call(links, 'self'))
  )
}

function createPaginationMeta (links, meta) {
  return {
    currentPage: extractPageNumberFromLink(links.self),
    firstPage: extractPageNumberFromLink(links.first),
    lastPage: extractPageNumberFromLink(links.last),
    nextPage: extractPageNumberFromLink(links.next),
    previousPage: extractPageNumberFromLink(links.previous),
    itemsPerPage: meta.per_page,
    totalItems: meta.total
  }
}

function extractPageNumberFromLink (link) {
  if (!link) {
    return NO_PAGE_NUMBER
  }

  let query = extractQueryFromLink(link)

  if (!query) {
    return NO_PAGE_NUMBER
  }

  let params = splitQueryIntoSeparateParams(query)

  if (params.length === 0) {
    return NO_PAGE_NUMBER
  }

  let page

  params.some(param => {
    let [key, value] = splitParamIntoKeyValue(param)
    let isPageParam = key === PAGE_PARAM_KEY

    if (isPageParam) {
      page = value
    }

    return isPageParam
  })

  if (!page) {
    return NO_PAGE_NUMBER
  }

  return Number(page)
}

function extractQueryFromLink (link) {
  return link.split('?')[1]
}

function splitQueryIntoSeparateParams (query) {
  return query.split('&')
}

function splitParamIntoKeyValue (param) {
  return param.split('=')
}
