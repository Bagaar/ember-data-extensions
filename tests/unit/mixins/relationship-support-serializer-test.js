import RelationshipSupportSerializerMixin from '@bagaar/ember-data-bagaaravel/mixins/relationship-support-serializer';
import JSONAPIBagaaravelSerializer from '@bagaar/ember-data-bagaaravel/serializers/json-api-bagaaravel';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import createExistingRecord from '../../helpers/create-existing-record';

module('Unit | Mixin | relationship-support-serializer', function (hooks) {
  setupTest(hooks);

  test('saving a record', async function (assert) {
    let serialized;

    let UserAdapter = JSONAPIAdapter.extend({
      ajax(url, type, options) {
        serialized = options.data;
      },
    });

    let UserSerializer = JSONAPIBagaaravelSerializer.extend(
      RelationshipSupportSerializerMixin,
    );

    this.owner.register('adapter:user', UserAdapter);
    this.owner.register('serializer:user', UserSerializer);

    let store = this.owner.lookup('service:store');
    let existingUser = createExistingRecord(store, 'user', {
      firstName: 'First Name',
    });

    await existingUser.save();

    assert.deepEqual(serialized, {
      data: {
        attributes: {
          first_name: 'First Name',
        },
        id: '1',
        type: 'User',
      },
    });
  });

  test('saving a belongsTo relationship', async function (assert) {
    let serialized;

    let UserAdapter = JSONAPIAdapter.extend({
      ajax(url, type, options) {
        serialized = options.data;
      },
    });

    let UserSerializer = JSONAPIBagaaravelSerializer.extend(
      RelationshipSupportSerializerMixin,
    );

    this.owner.register('adapter:user', UserAdapter);
    this.owner.register('serializer:user', UserSerializer);

    let store = this.owner.lookup('service:store');
    let existingUser = createExistingRecord(store, 'user');

    await existingUser.saveRelationship('company');

    assert.deepEqual(serialized, {
      data: null,
    });

    let existingCompany = createExistingRecord(store, 'company');

    existingUser.set('company', existingCompany);

    await existingUser.saveRelationship('company');

    assert.deepEqual(serialized, {
      data: {
        id: '1',
        type: 'Company',
      },
    });
  });

  test('saving an hasMany relationship', async function (assert) {
    let serialized;

    let UserAdapter = JSONAPIAdapter.extend({
      ajax(url, type, options) {
        serialized = options.data;
      },
    });

    let UserSerializer = JSONAPIBagaaravelSerializer.extend(
      RelationshipSupportSerializerMixin,
    );

    this.owner.register('adapter:user', UserAdapter);
    this.owner.register('serializer:user', UserSerializer);

    let store = this.owner.lookup('service:store');
    let existingUser = createExistingRecord(store, 'user');

    await existingUser.saveRelationship('projects');

    assert.deepEqual(serialized, {
      data: [],
    });

    let existingProject = createExistingRecord(store, 'project');

    existingUser.projects.addObject(existingProject);

    await existingUser.saveRelationship('projects');

    assert.deepEqual(serialized, {
      data: [{
        id: '1',
        type: 'Project',
      }],
    });
  });
});
