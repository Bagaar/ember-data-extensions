import { RELATIONSHIP_ADAPTER_OPTION } from '@bagaaravel/ember-data-extensions/-private/config'
import { getRelationshipName } from '@bagaaravel/ember-data-extensions/-private/utils'
import { module, test } from 'qunit'

module('Unit | Utility | get-relationship-name', function () {
  test('it returns the relationship name', function (assert) {
    const snapshot = {
      adapterOptions: {
        [RELATIONSHIP_ADAPTER_OPTION]: 'projects'
      }
    }

    const relationshipName = getRelationshipName(snapshot.adapterOptions)

    assert.equal(relationshipName, 'projects')
  })
})
