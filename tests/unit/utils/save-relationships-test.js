import { RELATIONSHIP_ADAPTER_OPTION } from '@bagaaravel/ember-data-extensions/config'
import saveRelationships from '@bagaaravel/ember-data-extensions/utils/save-relationships'
import JSONAPIAdapter from '@ember-data/adapter/json-api'
import { setupTest } from 'ember-qunit'
import { module, test } from 'qunit'
import createExistingRecord from '../../helpers/create-existing-record'

module('Unit | Utility | save-relationships', function (hooks) {
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
