import {
  saveRelationship,
  saveRelationships
} from '@bagaaravel/ember-data-extensions/model'
import { deprecate } from '@ember/debug'
import Mixin from '@ember/object/mixin'

export default Mixin.create({
  init () {
    this._super(...arguments)

    deprecate(
      'Use of the `relationship-support-model` mixin has been deprecated. Use the `save-relationship` and `save-relationships` utilities instead.',
      false,
      {
        id:
          '@bagaaravel/ember-data-extensions.relationship-support-model-mixin',
        until: '1.0.0'
      }
    )
  },

  saveRelationship (relationshipName) {
    return saveRelationship(this, relationshipName)
  },

  saveRelationships (...relationshipNames) {
    return saveRelationships(this, ...relationshipNames)
  }
})
