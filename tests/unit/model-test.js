import { RELATIONSHIP_ADAPTER_OPTION } from '@bagaaravel/ember-data-extensions/-private/config';
import {
  saveRelationship,
  saveRelationships,
} from '@bagaaravel/ember-data-extensions/model';
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import JSONAPISerializer from '@ember-data/serializer/json-api';
import { setupTest } from 'dummy/tests/helpers';
import createExistingRecord from 'dummy/tests/helpers/create-existing-record';
import { module, test } from 'qunit';

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

    let adapterOption;

    class UserAdapter extends JSONAPIAdapter {
      ajax() {}

      urlForUpdateRecord(id, modelName, snapshot) {
        adapterOption = snapshot.adapterOptions[RELATIONSHIP_ADAPTER_OPTION];
      }
    }

    this.owner.register('adapter:user', UserAdapter);

    const existingUser = createExistingRecord(this.store, 'user');

    await saveRelationship(existingUser, relationshipName);

    assert.strictEqual(adapterOption, relationshipName);
  });

  test('saveRelationships: it throws when the record is new', function (assert) {
    const newUser = this.store.createRecord('user');

    assert.throws(() => {
      saveRelationships(newUser, ['company', 'projects']);
    });
  });

  test('saveRelationships: it works', async function (assert) {
    const relationshipNames = ['company', 'projects'];

    class UserAdapter extends JSONAPIAdapter {
      ajax() {}

      urlForUpdateRecord(id, modelName, snapshot) {
        assert.step(snapshot.adapterOptions[RELATIONSHIP_ADAPTER_OPTION]);
      }
    }

    this.owner.register('adapter:user', UserAdapter);

    const existingUser = createExistingRecord(this.store, 'user');

    await saveRelationships(existingUser, relationshipNames);

    assert.verifySteps(relationshipNames);
  });
});
