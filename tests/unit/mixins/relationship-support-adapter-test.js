import RelationshipSupportAdapterMixin from '@bagaaravel/ember-data-extensions/mixins/relationship-support-adapter'
import { saveRelationship } from '@bagaaravel/ember-data-extensions/model'
import JSONAPIAdapter from '@ember-data/adapter/json-api'
import { setupTest } from 'ember-qunit'
import { module, test } from 'qunit'
import createExistingRecord from '../../helpers/create-existing-record'

module('Unit | Mixin | relationship-support-adapter', function (hooks) {
  setupTest(hooks)

  test('it generates the correct update url', async function (assert) {
    let urlForUpdateRecord

    class UserAdapter extends JSONAPIAdapter.extend(
      RelationshipSupportAdapterMixin
    ) {
      ajax (url) {
        urlForUpdateRecord = url
      }
    }

    this.owner.register('adapter:user', UserAdapter)

    const store = this.owner.lookup('service:store')
    const existingUser = createExistingRecord(store, 'user')

    await saveRelationship(existingUser, 'projects')

    assert.equal(
      urlForUpdateRecord,
      `/users/${existingUser.id}/relationships/projects`
    )
  })
})
