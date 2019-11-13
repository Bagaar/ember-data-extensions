/* eslint-disable ember/no-new-mixins */

import saveRelationship from '@bagaaravel/ember-data-extensions/utils/save-relationship'
import saveRelationships from '@bagaaravel/ember-data-extensions/utils/save-relationships'
import Mixin from '@ember/object/mixin'

export default Mixin.create({
  /**
   * Methods
   */

  saveRelationship (relationshipName) {
    return saveRelationship(this, relationshipName)
  },

  saveRelationships (...relationshipNames) {
    return saveRelationships(this, ...relationshipNames)
  }
})
