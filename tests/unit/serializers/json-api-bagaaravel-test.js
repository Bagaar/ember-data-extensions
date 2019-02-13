import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | json api bagaaravel', function (hooks) {
  setupTest(hooks);

  test('keyForAttribute', function (assert) {
    let store = this.owner.lookup('service:store');
    let user = store.createRecord('user', { firstName: 'First Name' });
    let serialized = user.serialize();

    assert.equal(serialized.data.attributes.first_name, 'First Name');
  });

  test('payloadKeyFromModelName', function (assert) {
    let store = this.owner.lookup('service:store');
    let user = store.createRecord('user');
    let serialized = user.serialize();

    assert.equal(serialized.data.type, 'User');
  });

  test('shouldSerializeHasMany', function (assert) {
    let store = this.owner.lookup('service:store');
    let project = store.createRecord('project');

    // New user record.
    let newUser = store.createRecord('user');

    newUser.projects.addObject(project);

    let newUserSerialized = newUser.serialize();

    assert.ok(newUserSerialized.data.relationships.projects);

    // Existing user record.
    let existingUser = store.createRecord('user', { id: 1 });

    existingUser.projects.addObject(project);

    store.pushPayload(existingUser.serialize({ includeId: true }));

    let existingUserSerialized = existingUser.serialize();

    assert.notOk(existingUserSerialized.data.relationships);
  });
});
