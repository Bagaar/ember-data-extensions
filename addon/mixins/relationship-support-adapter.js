import { getRelationshipName } from '@bagaaravel/ember-data-extensions/-private/utils'
import Mixin from '@ember/object/mixin'

export default Mixin.create({
  // Bagaaravel only allows hasMany relationships of an existing record to be updated via a separate url.
  // BelongsTo relationships are allowed to be updated via the record AND via a separate url.
  urlForUpdateRecord (id, modelName, snapshot) {
    const urlForUpdateRecord = this._super(...arguments)
    const relationshipName = getRelationshipName(snapshot.adapterOptions)
    const isSavingRelationship = Boolean(relationshipName)

    if (isSavingRelationship) {
      return `${urlForUpdateRecord}/relationships/${relationshipName}`
    }

    return urlForUpdateRecord
  }
})
