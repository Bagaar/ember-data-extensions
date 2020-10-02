import JSONAPIBagaaravelSerializerMixin from '@bagaaravel/ember-data-extensions/mixins/json-api-bagaaravel-serializer'
import RelationshipSupportSerializerMixin from '@bagaaravel/ember-data-extensions/mixins/relationship-support-serializer'
import JSONAPIAdapter from '@ember-data/adapter/json-api'
import JSONAPISerializer from '@ember-data/serializer/json-api'
import { setupTest } from 'ember-qunit'
import { module, test } from 'qunit'
import createExistingRecord from '../../helpers/create-existing-record'

module('Unit | Mixin | relationship-support-serializer', function (hooks) {
  setupTest(hooks)

  test('saving a record', async function (assert) {
    let serialized

    class UserAdapter extends JSONAPIAdapter {
      ajax (url, type, options) {
        serialized = options.data
      }
    }

    class UserSerializer extends JSONAPISerializer.extend(
      JSONAPIBagaaravelSerializerMixin,
      RelationshipSupportSerializerMixin
    ) {}

    this.owner.register('adapter:user', UserAdapter)
    this.owner.register('serializer:user', UserSerializer)

    let store = this.owner.lookup('service:store')
    let existingUser = createExistingRecord(store, 'user', {
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

    class UserSerializer extends JSONAPISerializer.extend(
      JSONAPIBagaaravelSerializerMixin,
      RelationshipSupportSerializerMixin
    ) {}

    this.owner.register('adapter:user', UserAdapter)
    this.owner.register('serializer:user', UserSerializer)

    let store = this.owner.lookup('service:store')
    let existingUser = createExistingRecord(store, 'user')

    await existingUser.saveRelationship('company')

    assert.deepEqual(serialized, {
      data: null
    })

    let existingCompany = createExistingRecord(store, 'company')

    existingUser.set('company', existingCompany)

    await existingUser.saveRelationship('company')

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

    class UserSerializer extends JSONAPISerializer.extend(
      JSONAPIBagaaravelSerializerMixin,
      RelationshipSupportSerializerMixin
    ) {}

    this.owner.register('adapter:user', UserAdapter)
    this.owner.register('serializer:user', UserSerializer)

    let store = this.owner.lookup('service:store')
    let existingUser = createExistingRecord(store, 'user')

    await existingUser.saveRelationship('projects')

    assert.deepEqual(serialized, {
      data: []
    })

    let existingProject = createExistingRecord(store, 'project')

    existingUser.projects.addObject(existingProject)

    await existingUser.saveRelationship('projects')

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
