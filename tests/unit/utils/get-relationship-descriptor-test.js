import getRelationshipDescriptor from '@bagaaravel/ember-data-extensions/utils/get-relationship-descriptor';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Utility | get-relationship-descriptor', function (hooks) {
  setupTest(hooks);

  test('it returns the relationship descriptor', function (assert) {
    let store = this.owner.lookup('service:store');
    let newUser = store.createRecord('user');
    let relationshipDescriptor = getRelationshipDescriptor(newUser, 'projects');

    assert.equal(relationshipDescriptor.kind, 'hasMany');
  });
});
