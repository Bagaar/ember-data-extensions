import { getRelationshipDescriptor } from '@bagaaravel/ember-data-extensions/-private/utils'
import { setupTest } from 'ember-qunit'
import { module, test } from 'qunit'

module('Unit | Utility | get-relationship-descriptor', function (hooks) {
  setupTest(hooks)

  test('it returns the relationship descriptor', function (assert) {
    const store = this.owner.lookup('service:store')
    const newUser = store.createRecord('user')
    const relationshipDescriptor = getRelationshipDescriptor(
      newUser,
      'projects'
    )

    assert.equal(relationshipDescriptor.kind, 'hasMany')
  })
})
