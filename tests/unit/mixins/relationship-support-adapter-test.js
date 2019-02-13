import RelationshipSupportAdapterMixin from '@bagaar/ember-data-bagaaravel/mixins/relationship-support-adapter';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Mixin | relationship-support-adapter', function (hooks) {
  setupTest(hooks);

  test('it generates the correct update url', async function (assert) {
    let urlForUpdateRecord;

    let Adapter = JSONAPIAdapter.extend(RelationshipSupportAdapterMixin, {
      ajax(url) {
        urlForUpdateRecord = url;
      },
    });

    this.owner.register('adapter:application', Adapter);

    let store = this.owner.lookup('service:store');
    let existingUser = store.createRecord('user', { id: 1 });

    store.pushPayload(existingUser.serialize({ includeId: true }));

    await existingUser.save({
      adapterOptions: {
        isSavingRelationship: true,
        relationshipName: 'projects',
      },
    });

    assert.equal(urlForUpdateRecord, '/users/1/relationships/projects');
  });
});
