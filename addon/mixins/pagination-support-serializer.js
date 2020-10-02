import { deprecate } from '@ember/debug'
import Mixin from '@ember/object/mixin'

const NO_PAGE_NUMBER = null
const PAGE_PARAM_KEY = 'page'

export default Mixin.create({
  init () {
    this._super(...arguments)

    deprecate(
      'Use of the `pagination-support-serializer` mixin has been deprecated.',
      false,
      {
        id:
          '@bagaaravel/ember-data-extensions.pagination-support-serializer-mixin',
        until: '1.0.0'
      }
    )
  },

  normalizeQueryResponse () {
    let normalized = this._super(...arguments)

    if (hasPaginationLinks(normalized.links)) {
      normalized.meta.pagination = createPaginationMeta(
        normalized.links,
        normalized.meta
      )
    }

    return normalized
  }
})

function hasPaginationLinks (links) {
  return !!links && typeof links.first !== 'undefined'
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
