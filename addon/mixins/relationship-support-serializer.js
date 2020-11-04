import {
  getRelationshipDescriptor,
  getRelationshipName
} from '@bagaaravel/ember-data-extensions/-private/utils'
import Mixin from '@ember/object/mixin'

export default Mixin.create({
  serialize (snapshot) {
    const serialized = this._super(...arguments)
    const relationshipName = getRelationshipName(snapshot.adapterOptions)
    const isSavingRelationship = Boolean(relationshipName)

    if (!isSavingRelationship) {
      return serialized
    }

    const serializedRelationships = serialized.data.relationships

    if (serializedRelationships && serializedRelationships[relationshipName]) {
      return serializedRelationships[relationshipName]
    }

    const relationshipDescriptor = getRelationshipDescriptor(
      snapshot.record,
      relationshipName
    )

    if (relationshipDescriptor.kind === 'hasMany') {
      return { data: [] }
    }

    return { data: null }
  },

  shouldSerializeHasMany (snapshot, key, relationshipDescriptor) {
    const relationshipName = getRelationshipName(snapshot.adapterOptions)
    const shouldSaveRelationship =
      relationshipName === relationshipDescriptor.key
    const shouldSerializeHasMany = this._super(...arguments)

    return shouldSaveRelationship || shouldSerializeHasMany
  }
})
