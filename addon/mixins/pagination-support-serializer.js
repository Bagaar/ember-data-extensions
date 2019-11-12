/* eslint-disable ember/no-new-mixins */

import addPaginationMeta from '@bagaaravel/ember-data-extensions/utils/add-pagination-meta'
import { deprecate } from '@ember/debug'
import Mixin from '@ember/object/mixin'

export default Mixin.create({
  /**
   * Hooks
   */

  init () {
    this._super(...arguments)

    deprecate(
      'Use of the `pagination-support-serializer` mixin has been deprecated. Use the `add-pagination-meta` utility instead.',
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

    addPaginationMeta(normalized)

    return normalized
  }
})
