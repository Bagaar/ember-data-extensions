/* eslint-disable ember/no-new-mixins */

import getRelationshipName from '@bagaaravel/ember-data-extensions/utils/get-relationship-name'
import Mixin from '@ember/object/mixin'

export default Mixin.create({
  /**
   * Hooks
   */

  // Bagaaravel only allows hasMany relationships of an existing record to be updated via a separate url.
  // BelongsTo relationships are allowed to be updated via the record AND via a separate url.
  urlForUpdateRecord (id, modelName, snapshot) {
    let urlForUpdateRecord = this._super(...arguments)
    let relationshipName = getRelationshipName(snapshot.adapterOptions)
    let isSavingRelationship = !!relationshipName

    if (isSavingRelationship) {
      return `${urlForUpdateRecord}/relationships/${relationshipName}`
    }

    return urlForUpdateRecord
  }
})
