import addPaginationMeta from '@bagaaravel/ember-data-extensions/utils/add-pagination-meta'
import { module, test } from 'qunit'

module('Unit | Utility | add-pagination-meta', function () {
  test('it works', function (assert) {
    let normalized = {
      links: {
        first: 'https://api.com/users?page=1&per_page=15',
        last: 'https://api.com/users?page=9&per_page=15',
        next: 'https://api.com/users?page=2&per_page=15',
        previous: null,
        self: 'https://api.com/users?page=1&per_page=15'
      },
      meta: {
        per_page: 15,
        total: 125
      }
    }

    addPaginationMeta(normalized)

    assert.deepEqual(normalized.meta.pagination, {
      currentPage: 1,
      firstPage: 1,
      lastPage: 9,
      nextPage: 2,
      previousPage: null,
      itemsPerPage: 15,
      totalItems: 125
    })
  })
})
