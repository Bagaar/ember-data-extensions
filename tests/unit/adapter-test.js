import { urlForUpdateRecord } from '@bagaaravel/ember-data-extensions/adapter';
import { saveRelationship } from '@bagaaravel/ember-data-extensions/model';
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { setupTest } from 'dummy/tests/helpers';
import createExistingRecord from 'dummy/tests/helpers/create-existing-record';
import { module, test } from 'qunit';

module('Unit | Adapter', function (hooks) {
  setupTest(hooks);

  test('urlForUpdateRecord: it generates the correct update url', async function (assert) {
    let updateUrl;

    class UserAdapter extends JSONAPIAdapter {
      ajax(url) {
        updateUrl = url;
      }

      urlForUpdateRecord() {
        const baseUrl = super.urlForUpdateRecord(...arguments);

        return urlForUpdateRecord(baseUrl, ...arguments);
      }
    }

    this.owner.register('adapter:user', UserAdapter);

    const store = this.owner.lookup('service:store');
    const existingUser = createExistingRecord(store, 'user');

    await saveRelationship(existingUser, 'projects');

    assert.strictEqual(
      updateUrl,
      `/users/${existingUser.id}/relationships/projects`
    );
  });
});
