/* eslint-disable ember/no-new-mixins */

import addPaginationMeta from '@bagaaravel/ember-data-extensions/utils/add-pagination-meta'
import Mixin from '@ember/object/mixin'

export default Mixin.create({
  /**
   * Hooks
   */

  normalizeQueryResponse () {
    let normalized = this._super(...arguments)

    addPaginationMeta(normalized)

    return normalized
  }
})
