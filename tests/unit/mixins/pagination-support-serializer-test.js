import PaginationSupportSerializerMixin from '@bagaar/ember-data-bagaaravel/mixins/pagination-support-serializer';
import JSONAPIBagaaravelSerializer from '@bagaar/ember-data-bagaaravel/serializers/json-api-bagaaravel';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Mixin | pagination-support-serializer', function (hooks) {
  setupTest(hooks);

  test('it creates pagination meta', async function (assert) {
    let Adapter = JSONAPIAdapter.extend({
      ajax() {
        return Promise.resolve({
          data: [],
          links: {
            first: 'https://api.com/users?page=1&per_page=15',
            last: 'https://api.com/users?page=9&per_page=15',
            next: 'https://api.com/users?page=2&per_page=15',
            previous: null,
            self: 'https://api.com/users?page=1&per_page=15',
          },
          meta: {
            perPage: 15,
            total: 125,
          },
        });
      },
    });

    let Serializer = JSONAPIBagaaravelSerializer.extend(PaginationSupportSerializerMixin);

    this.owner.register('adapter:application', Adapter);
    this.owner.register('serializer:application', Serializer);

    let store = this.owner.lookup('service:store');
    let users = await store.query('user', {});

    assert.deepEqual(users.meta.pagination, {
      currentPage: 1,
      firstPage: 1,
      lastPage: 9,
      nextPage: 2,
      previousPage: null,
      itemsPerPage: 15,
      totalItems: 125,
    });
  });
});
