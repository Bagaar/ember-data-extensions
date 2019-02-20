import JSONAPIBagaaravelSerializer from '@bagaar/ember-data-bagaaravel/serializers/json-api-bagaaravel';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import createExistingRecord from '../../helpers/create-existing-record';

module('Unit | Serializer | json api bagaaravel', function (hooks) {
  setupTest(hooks);

  test('it underscores attributes', function (assert) {
    this.owner.register('serializer:user', JSONAPIBagaaravelSerializer);

    let store = this.owner.lookup('service:store');
    let newUser = store.createRecord('user', { firstName: 'First Name' });
    let serialized = newUser.serialize();

    assert.equal(serialized.data.attributes.first_name, 'First Name');
  });

  test('it classifies the model name', function (assert) {
    this.owner.register('serializer:user', JSONAPIBagaaravelSerializer);

    let store = this.owner.lookup('service:store');
    let newUser = store.createRecord('user');
    let serialized = newUser.serialize();

    assert.equal(serialized.data.type, 'User');
  });

  test('it serializes hasMany relationships for new records', function (assert) {
    this.owner.register('serializer:user', JSONAPIBagaaravelSerializer);

    let store = this.owner.lookup('service:store');
    let newUser = store.createRecord('user');
    let newProject = store.createRecord('project');

    newUser.projects.addObject(newProject);

    let serialized = newUser.serialize();

    assert.ok(serialized.data.relationships.projects);
  });

  test('it does not serialize hasMany relationships for existing records', function (assert) {
    this.owner.register('serializer:user', JSONAPIBagaaravelSerializer);

    let store = this.owner.lookup('service:store');
    let existingUser = createExistingRecord(store, 'user');
    let newProject = store.createRecord('project');

    existingUser.projects.addObject(newProject);

    let serialized = existingUser.serialize();

    assert.notOk(serialized.data.relationships);
  });
});
