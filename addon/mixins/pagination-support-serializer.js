/* eslint-disable ember/no-new-mixins */

import Mixin from '@ember/object/mixin';

const NO_PAGE_NUMBER = null;

export default Mixin.create({
  /**
   * Hooks
   */

  normalizeQueryResponse() {
    let normalized = this._super(...arguments);

    if (hasPaginationLinks(normalized.links)) {
      normalized.meta.pagination = createPaginationMeta(normalized.links, normalized.meta);
    }

    return normalized;
  },
});

function hasPaginationLinks(links) {
  return !!links && typeof links.first !== 'undefined';
}

function createPaginationMeta(links, meta) {
  return {
    currentPage: extractPageNumberFromLink(links.self),
    firstPage: extractPageNumberFromLink(links.first),
    lastPage: extractPageNumberFromLink(links.last),
    nextPage: extractPageNumberFromLink(links.next),
    previousPage: extractPageNumberFromLink(links.previous),
    itemsPerPage: meta.per_page,
    totalItems: meta.total,
  };
}

function extractPageNumberFromLink(link) {
  if (!link) {
    return NO_PAGE_NUMBER;
  }

  let url = new URL(link);
  let page = url.searchParams.get('page');

  if (!page) {
    return NO_PAGE_NUMBER;
  }

  return Number(page);
}
