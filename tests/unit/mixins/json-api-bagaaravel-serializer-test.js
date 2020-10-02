import JSONAPIBagaaravelSerializerMixin from '@bagaaravel/ember-data-extensions/mixins/json-api-bagaaravel-serializer'
import JSONAPIAdapter from '@ember-data/adapter/json-api'
import JSONAPISerializer from '@ember-data/serializer/json-api'
import { setupTest } from 'ember-qunit'
import { module, test } from 'qunit'
import createExistingRecord from '../../helpers/create-existing-record'

module('Unit | Mixin | json-api-bagaaravel-serializer', function (hooks) {
  setupTest(hooks)

  test('it underscores attributes', function (assert) {
    class UserSerializer extends JSONAPISerializer.extend(
      JSONAPIBagaaravelSerializerMixin
    ) {}

    this.owner.register('serializer:user', UserSerializer)

    let store = this.owner.lookup('service:store')
    let newUser = store.createRecord('user', { firstName: 'First Name' })
    let serialized = newUser.serialize()

    assert.equal(serialized.data.attributes.first_name, 'First Name')
  })

  test('it leaves relationships untouched', function (assert) {
    class UserSerializer extends JSONAPISerializer.extend(
      JSONAPIBagaaravelSerializerMixin
    ) {}

    this.owner.register('serializer:user', UserSerializer)

    let store = this.owner.lookup('service:store')
    let newUser = store.createRecord('user')
    let newProject = store.createRecord('project')

    newUser.favoriteProjects.addObject(newProject)

    let serialized = newUser.serialize()

    assert.ok(serialized.data.relationships.favoriteProjects)
  })

  test('it classifies the model name', function (assert) {
    class UserSerializer extends JSONAPISerializer.extend(
      JSONAPIBagaaravelSerializerMixin
    ) {}

    this.owner.register('serializer:user', UserSerializer)

    let store = this.owner.lookup('service:store')
    let newUser = store.createRecord('user')
    let serialized = newUser.serialize()

    assert.equal(serialized.data.type, 'User')
  })

  test('it serializes hasMany relationships for new records', function (assert) {
    class UserSerializer extends JSONAPISerializer.extend(
      JSONAPIBagaaravelSerializerMixin
    ) {}

    this.owner.register('serializer:user', UserSerializer)

    let store = this.owner.lookup('service:store')
    let newUser = store.createRecord('user')
    let newProject = store.createRecord('project')

    newUser.projects.addObject(newProject)

    let serialized = newUser.serialize()

    assert.ok(serialized.data.relationships.projects)
  })

  test('it serializes hasMany relationships for existing records', function (assert) {
    class UserSerializer extends JSONAPISerializer.extend(
      JSONAPIBagaaravelSerializerMixin
    ) {}

    this.owner.register('serializer:user', UserSerializer)

    let store = this.owner.lookup('service:store')
    let existingUser = createExistingRecord(store, 'user')
    let newProject = store.createRecord('project')

    existingUser.projects.addObject(newProject)

    let serialized = existingUser.serialize()

    assert.ok(serialized.data.relationships)
  })

  test('it does not serialize hasMany relationships for existing records when saving', async function (assert) {
    class UserAdapter extends JSONAPIAdapter {
      updateRecord (store, type, snapshot) {
        let serialized = snapshot.record.serialize()

        assert.notOk(serialized.data.relationships)
      }
    }

    class UserSerializer extends JSONAPISerializer.extend(
      JSONAPIBagaaravelSerializerMixin
    ) {}

    this.owner.register('adapter:user', UserAdapter)
    this.owner.register('serializer:user', UserSerializer)

    let store = this.owner.lookup('service:store')
    let existingUser = createExistingRecord(store, 'user')
    let newProject = store.createRecord('project')

    existingUser.projects.addObject(newProject)
    await existingUser.save()
  })
})
