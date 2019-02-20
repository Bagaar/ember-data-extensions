import JSONAPISerializer from 'ember-data/serializers/json-api';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import createExistingRecord from '../../helpers/create-existing-record';

module('Unit | Mixin | relationship-support-model', function (hooks) {
  setupTest(hooks);

  /**
   * saveRelationship
   */

  test('"saveRelationship" throws when the record is new', function (assert) {
    let store = this.owner.lookup('service:store');
    let newUser = store.createRecord('user');

    try {
      newUser.saveRelationship('company');
    } catch (error) {
      assert.ok(error);
    }
  });

  test('"saveRelationship" throws when the relationship name is not valid', function (assert) {
    let store = this.owner.lookup('service:store');
    let existingUser = createExistingRecord(store, 'user');

    try {
      existingUser.saveRelationship('invalid-relationship-name');
    } catch (error) {
      assert.ok(error);
    }
  });

  test('"saveRelationship" throws when the relationship can not be serialized', function (assert) {
    let UserSerializer = JSONAPISerializer.extend({
      attrs: {
        company: {
          serialize: false,
        },
      },
    });

    this.owner.register('serializer:user', UserSerializer);

    let store = this.owner.lookup('service:store');
    let existingUser = createExistingRecord(store, 'user');

    try {
      existingUser.saveRelationship('company');
    } catch (error) {
      assert.ok(error);
    }
  });

  /**
   * saveRelationships
   */

  test('"saveRelationships" throws when the record is new', function (assert) {
    let store = this.owner.lookup('service:store');
    let newUser = store.createRecord('user');

    try {
      newUser.saveRelationships('company', 'projects');
    } catch (error) {
      assert.ok(error);
    }
  });
});
