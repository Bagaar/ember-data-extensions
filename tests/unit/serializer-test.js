import { saveRelationship } from '@bagaaravel/ember-data-extensions/model'
import {
  keyForAttribute,
  keyForRelationship,
  payloadKeyFromModelName,
  serialize,
  shouldSerializeHasMany
} from '@bagaaravel/ember-data-extensions/serializer'
import JSONAPIAdapter from '@ember-data/adapter/json-api'
import JSONAPISerializer from '@ember-data/serializer/json-api'
import { setupTest } from 'ember-qunit'
import { module, test } from 'qunit'
import createExistingRecord from '../helpers/create-existing-record'

class UserSerializer extends JSONAPISerializer {
  keyForAttribute () {
    return keyForAttribute(...arguments)
  }

  keyForRelationship () {
    return keyForRelationship(...arguments)
  }

  payloadKeyFromModelName () {
    return payloadKeyFromModelName(...arguments)
  }

  serialize () {
    const serialized = super.serialize(...arguments)

    return serialize(serialized, ...arguments)
  }

  shouldSerializeHasMany () {
    const superCheck = super.shouldSerializeHasMany(...arguments)

    return shouldSerializeHasMany(superCheck, ...arguments)
  }
}

module('Unit | Serializer', function (hooks) {
  setupTest(hooks)

  hooks.beforeEach(function () {
    this.store = this.owner.lookup('service:store')
    this.owner.register('serializer:user', UserSerializer)
  })

  test('it underscores attributes', function (assert) {
    const newUser = this.store.createRecord('user', { firstName: 'First Name' })
    const serialized = newUser.serialize()

    assert.equal(serialized.data.attributes.first_name, 'First Name')
  })

  test('it leaves relationships untouched', function (assert) {
    const newUser = this.store.createRecord('user')
    const newProject = this.store.createRecord('project')

    newUser.favoriteProjects.addObject(newProject)

    const serialized = newUser.serialize()

    assert.ok(serialized.data.relationships.favoriteProjects)
  })

  test('it classifies the model name', function (assert) {
    const newUser = this.store.createRecord('user')
    const serialized = newUser.serialize()

    assert.equal(serialized.data.type, 'User')
  })

  test('it serializes hasMany relationships for new records', function (assert) {
    const newUser = this.store.createRecord('user')
    const newProject = this.store.createRecord('project')

    newUser.projects.addObject(newProject)

    const serialized = newUser.serialize()

    assert.ok(serialized.data.relationships.projects)
  })

  test('it serializes hasMany relationships for existing records', function (assert) {
    const existingUser = createExistingRecord(this.store, 'user')
    const newProject = this.store.createRecord('project')

    existingUser.projects.addObject(newProject)

    const serialized = existingUser.serialize()

    assert.ok(serialized.data.relationships)
  })

  test('it does not serialize hasMany relationships for existing records when saving', async function (assert) {
    class UserAdapter extends JSONAPIAdapter {
      updateRecord (store, type, snapshot) {
        const serialized = snapshot.record.serialize()

        assert.notOk(serialized.data.relationships)
      }
    }

    this.owner.register('adapter:user', UserAdapter)

    const existingUser = createExistingRecord(this.store, 'user')
    const newProject = this.store.createRecord('project')

    existingUser.projects.addObject(newProject)

    await existingUser.save()
  })

  test('saving a record', async function (assert) {
    let serialized

    class UserAdapter extends JSONAPIAdapter {
      ajax (url, type, options) {
        serialized = options.data
      }
    }

    this.owner.register('adapter:user', UserAdapter)

    const existingUser = createExistingRecord(this.store, 'user', {
      firstName: 'First Name'
    })

    await existingUser.save()

    assert.deepEqual(serialized, {
      data: {
        attributes: {
          first_name: 'First Name'
        },
        id: existingUser.id,
        type: 'User'
      }
    })
  })

  test('saving a belongsTo relationship', async function (assert) {
    let serialized

    class UserAdapter extends JSONAPIAdapter {
      ajax (url, type, options) {
        serialized = options.data
      }
    }

    this.owner.register('adapter:user', UserAdapter)

    const existingUser = createExistingRecord(this.store, 'user')

    await saveRelationship(existingUser, 'company')

    assert.deepEqual(serialized, {
      data: null
    })

    const existingCompany = createExistingRecord(this.store, 'company')

    existingUser.set('company', existingCompany)

    await saveRelationship(existingUser, 'company')

    assert.deepEqual(serialized, {
      data: {
        id: existingCompany.id,
        type: 'Company'
      }
    })
  })

  test('saving an hasMany relationship', async function (assert) {
    let serialized

    class UserAdapter extends JSONAPIAdapter {
      ajax (url, type, options) {
        serialized = options.data
      }
    }

    this.owner.register('adapter:user', UserAdapter)

    const existingUser = createExistingRecord(this.store, 'user')

    await saveRelationship(existingUser, 'projects')

    assert.deepEqual(serialized, {
      data: []
    })

    const existingProject = createExistingRecord(this.store, 'project')

    existingUser.projects.addObject(existingProject)

    await saveRelationship(existingUser, 'projects')

    assert.deepEqual(serialized, {
      data: [
        {
          id: existingProject.id,
          type: 'Project'
        }
      ]
    })
  })
})
