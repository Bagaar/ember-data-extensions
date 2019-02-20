import RelationshipSupportAdapterMixin from '@bagaar/ember-data-bagaaravel/mixins/relationship-support-adapter';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import createExistingRecord from '../../helpers/create-existing-record';

module('Unit | Mixin | relationship-support-adapter', function (hooks) {
  setupTest(hooks);

  test('it generates the correct update url', async function (assert) {
    let urlForUpdateRecord;

    let UserAdapter = JSONAPIAdapter.extend(RelationshipSupportAdapterMixin, {
      ajax(url) {
        urlForUpdateRecord = url;
      },
    });

    this.owner.register('adapter:user', UserAdapter);

    let store = this.owner.lookup('service:store');
    let existingUser = createExistingRecord(store, 'user');

    await existingUser.saveRelationship('projects');

    assert.equal(urlForUpdateRecord, '/users/1/relationships/projects');
  });
});
