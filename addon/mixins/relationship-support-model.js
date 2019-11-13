/* eslint-disable ember/no-new-mixins */

import saveRelationship from '@bagaaravel/ember-data-extensions/utils/save-relationship'
import { assert } from '@ember/debug'
import Mixin from '@ember/object/mixin'

export default Mixin.create({
  /**
   * Methods
   */

  saveRelationship (relationshipName) {
    return saveRelationship(this, relationshipName)
  },

  saveRelationships (...relationshipNames) {
    assert(
      '@bagaaravel/ember-data-extensions: Cannot save relationships of a newly created record.',
      !this.isNew
    )

    let promises = relationshipNames.map(relationshipName =>
      this.saveRelationship(relationshipName)
    )

    return Promise.all(promises).then(() => this)
  }
})
