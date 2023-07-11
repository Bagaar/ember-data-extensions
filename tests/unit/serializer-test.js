import { saveRelationship } from '@bagaaravel/ember-data-extensions/model';
import {
  keyForAttribute,
  keyForRelationship,
  payloadKeyFromModelName,
  serialize,
  shouldSerializeHasMany,
} from '@bagaaravel/ember-data-extensions/serializer';
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import JSONAPISerializer from '@ember-data/serializer/json-api';
import { setupTest } from 'dummy/tests/helpers';
import createExistingRecord from 'dummy/tests/helpers/create-existing-record';
import { module, test } from 'qunit';

class UserSerializer extends JSONAPISerializer {
  keyForAttribute() {
    return keyForAttribute(...arguments);
  }

  keyForRelationship() {
    return keyForRelationship(...arguments);
  }

  payloadKeyFromModelName() {
    return payloadKeyFromModelName(...arguments);
  }

  serialize() {
    const serialized = super.serialize(...arguments);

    return serialize(serialized, ...arguments);
  }

  shouldSerializeHasMany() {
    const superCheck = super.shouldSerializeHasMany(...arguments);

    return shouldSerializeHasMany(superCheck, ...arguments);
  }
}

module('Unit | Serializer', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.store = this.owner.lookup('service:store');
    this.owner.register('serializer:user', UserSerializer);
  });

  test('keyForAttribute: it underscores attributes', function (assert) {
    const newUser = this.store.createRecord('user', {
      firstName: 'First Name',
    });
    const serialized = newUser.serialize();

    assert.strictEqual(serialized.data.attributes.first_name, 'First Name');
  });

  test('keyForRelationship: it leaves relationships untouched', function (assert) {
    const newUser = this.store.createRecord('user');
    const newProject = this.store.createRecord('project');

    newUser.favoriteProjects = [...newUser.favoriteProjects, newProject];

    const serialized = newUser.serialize();

    assert.ok(serialized.data.relationships.favoriteProjects);
  });

  test('payloadKeyFromModelName: it classifies the model name', function (assert) {
    const newUser = this.store.createRecord('user');
    const serialized = newUser.serialize();

    assert.strictEqual(serialized.data.type, 'User');
  });

  test('serialize: saving a record', async function (assert) {
    let serialized;

    class UserAdapter extends JSONAPIAdapter {
      ajax(url, type, options) {
        serialized = options.data;
      }
    }

    this.owner.register('adapter:user', UserAdapter);

    const existingUser = createExistingRecord(this.store, 'user', {
      firstName: 'First Name',
    });

    await existingUser.save();

    assert.deepEqual(serialized, {
      data: {
        attributes: {
          first_name: 'First Name',
        },
        id: existingUser.id,
        type: 'User',
      },
    });
  });

  test('serialize: saving a belongsTo relationship', async function (assert) {
    let serialized;

    class UserAdapter extends JSONAPIAdapter {
      ajax(url, type, options) {
        serialized = options.data;
      }
    }

    this.owner.register('adapter:user', UserAdapter);

    const existingUser = createExistingRecord(this.store, 'user');

    await saveRelationship(existingUser, 'company');

    assert.deepEqual(serialized, {
      data: null,
    });

    const existingCompany = createExistingRecord(this.store, 'company');

    existingUser.set('company', existingCompany);

    await saveRelationship(existingUser, 'company');

    assert.deepEqual(serialized, {
      data: {
        id: existingCompany.id,
        type: 'Company',
      },
    });
  });

  test('serialize: saving an hasMany relationship', async function (assert) {
    let serialized;

    class UserAdapter extends JSONAPIAdapter {
      ajax(url, type, options) {
        serialized = options.data;
      }
    }

    this.owner.register('adapter:user', UserAdapter);

    const existingUser = createExistingRecord(this.store, 'user');

    await saveRelationship(existingUser, 'projects');

    assert.deepEqual(serialized, {
      data: [],
    });

    const existingProject = createExistingRecord(this.store, 'project');

    existingUser.projects = [...existingUser.projects, existingProject];

    await saveRelationship(existingUser, 'projects');

    assert.deepEqual(serialized, {
      data: [
        {
          id: existingProject.id,
          type: 'Project',
        },
      ],
    });
  });

  test('shouldSerializeHasMany: it serializes hasMany relationships for new records', function (assert) {
    const newUser = this.store.createRecord('user');
    const newProject = this.store.createRecord('project');

    newUser.projects = [...newUser.projects, newProject];

    const serialized = newUser.serialize();

    assert.ok(serialized.data.relationships.projects);
  });

  test('shouldSerializeHasMany: it serializes hasMany relationships for existing records', function (assert) {
    const existingUser = createExistingRecord(this.store, 'user');
    const newProject = this.store.createRecord('project');

    existingUser.projects = [...existingUser.projects, newProject];

    const serialized = existingUser.serialize();

    assert.ok(serialized.data.relationships);
  });

  test('shouldSerializeHasMany: it does not serialize hasMany relationships for existing records when saving', async function (assert) {
    let serializedRelationships;

    class UserAdapter extends JSONAPIAdapter {
      updateRecord(store, type, snapshot) {
        const serialized = snapshot.record.serialize();

        serializedRelationships = serialized.data.relationships;
      }
    }

    this.owner.register('adapter:user', UserAdapter);

    const existingUser = createExistingRecord(this.store, 'user');
    const newProject = this.store.createRecord('project');

    existingUser.projects = [...existingUser.projects, newProject];

    await existingUser.save();

    assert.strictEqual(serializedRelationships, undefined);
  });
});
