import { RELATIONSHIP_ADAPTER_OPTION } from '@bagaaravel/ember-data-extensions/-private/config';
import {
  saveRelationship,
  saveRelationships,
} from '@bagaaravel/ember-data-extensions/model';
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import JSONAPISerializer from '@ember-data/serializer/json-api';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import createExistingRecord from '../helpers/create-existing-record';

module('Unit | Model', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.store = this.owner.lookup('service:store');
  });

  test('saveRelationship: it throws when the record is new', function (assert) {
    const newUser = this.store.createRecord('user');

    assert.throws(() => {
      saveRelationship(newUser, 'company');
    });
  });

  test('saveRelationship: it throws when the relationship name is not valid', function (assert) {
    const existingUser = createExistingRecord(this.store, 'user');

    assert.throws(() => {
      saveRelationship(existingUser, 'invalid-relationship-name');
    });
  });

  test('saveRelationship: it throws when the relationship can not be serialized', function (assert) {
    class UserSerializer extends JSONAPISerializer {
      attrs = {
        company: {
          serialize: false,
        },
      };
    }

    this.owner.register('serializer:user', UserSerializer);

    const existingUser = createExistingRecord(this.store, 'user');

    assert.throws(() => {
      saveRelationship(existingUser, 'company');
    });
  });

  test('saveRelationship: it works', async function (assert) {
    const relationshipName = 'company';

    class UserAdapter extends JSONAPIAdapter {
      ajax() {}

      urlForUpdateRecord(id, modelName, snapshot) {
        assert.equal(
          snapshot.adapterOptions[RELATIONSHIP_ADAPTER_OPTION],
          relationshipName
        );
      }
    }

    this.owner.register('adapter:user', UserAdapter);

    const existingUser = createExistingRecord(this.store, 'user');

    await saveRelationship(existingUser, relationshipName);
  });

  test('saveRelationships: it throws when the record is new', function (assert) {
    const newUser = this.store.createRecord('user');

    assert.throws(() => {
      saveRelationships(newUser, ['company', 'projects']);
    });
  });

  test('saveRelationships: it works', async function (assert) {
    const relationshipNames = ['company', 'projects'];

    assert.expect(relationshipNames.length);

    class UserAdapter extends JSONAPIAdapter {
      ajax() {}

      urlForUpdateRecord(id, modelName, snapshot) {
        assert.ok(
          relationshipNames.includes(
            snapshot.adapterOptions[RELATIONSHIP_ADAPTER_OPTION]
          )
        );
      }
    }

    this.owner.register('adapter:user', UserAdapter);

    const existingUser = createExistingRecord(this.store, 'user');

    await saveRelationships(existingUser, relationshipNames);
  });
});
