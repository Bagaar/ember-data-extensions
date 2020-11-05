import { RELATIONSHIP_ADAPTER_OPTION } from '@bagaaravel/ember-data-extensions/-private/config'
import {
  saveRelationship,
  saveRelationships
} from '@bagaaravel/ember-data-extensions/model'
import JSONAPIAdapter from '@ember-data/adapter/json-api'
import JSONAPISerializer from '@ember-data/serializer/json-api'
import { setupTest } from 'ember-qunit'
import { module, test } from 'qunit'
import createExistingRecord from '../helpers/create-existing-record'

module('Unit | Model | save-relationship', function (hooks) {
  setupTest(hooks)

  test('"saveRelationship" throws when the record is new', function (assert) {
    const store = this.owner.lookup('service:store')
    const newUser = store.createRecord('user')

    assert.throws(() => {
      saveRelationship(newUser, 'company')
    })
  })

  test('"saveRelationship" throws when the relationship name is not valid', function (assert) {
    const store = this.owner.lookup('service:store')
    const existingUser = createExistingRecord(store, 'user')

    assert.throws(() => {
      saveRelationship(existingUser, 'invalid-relationship-name')
    })
  })

  test('"saveRelationship" throws when the relationship can not be serialized', function (assert) {
    class UserSerializer extends JSONAPISerializer {
      attrs = {
        company: {
          serialize: false
        }
      }
    }

    this.owner.register('serializer:user', UserSerializer)

    const store = this.owner.lookup('service:store')
    const existingUser = createExistingRecord(store, 'user')

    assert.throws(() => {
      saveRelationship(existingUser, 'company')
    })
  })

  test('"saveRelationship" works', async function (assert) {
    const relationshipName = 'company'

    class UserAdapter extends JSONAPIAdapter {
      ajax () {}

      urlForUpdateRecord (id, modelName, snapshot) {
        assert.equal(
          snapshot.adapterOptions[RELATIONSHIP_ADAPTER_OPTION],
          relationshipName
        )
      }
    }

    this.owner.register('adapter:user', UserAdapter)

    const store = this.owner.lookup('service:store')
    const existingUser = createExistingRecord(store, 'user')

    await saveRelationship(existingUser, relationshipName)
  })
})

module('Unit | Model | save-relationships', function (hooks) {
  setupTest(hooks)

  test('"saveRelationships" throws when the record is new', function (assert) {
    const store = this.owner.lookup('service:store')
    const newUser = store.createRecord('user')

    assert.throws(() => {
      saveRelationships(newUser, 'company', 'projects')
    })
  })

  test('"saveRelationships" works', async function (assert) {
    const relationshipNames = ['company', 'projects']

    assert.expect(relationshipNames.length)

    class UserAdapter extends JSONAPIAdapter {
      ajax () {}

      urlForUpdateRecord (id, modelName, snapshot) {
        assert.ok(
          relationshipNames.includes(
            snapshot.adapterOptions[RELATIONSHIP_ADAPTER_OPTION]
          )
        )
      }
    }

    this.owner.register('adapter:user', UserAdapter)

    const store = this.owner.lookup('service:store')
    const existingUser = createExistingRecord(store, 'user')

    await saveRelationships(existingUser, ...relationshipNames)
  })
})
