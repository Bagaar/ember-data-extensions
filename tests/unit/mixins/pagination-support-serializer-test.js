/* eslint-disable ember/no-new-mixins */

import PaginationSupportSerializerMixin from '@bagaar/ember-data-bagaaravel/mixins/pagination-support-serializer';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import JSONAPISerializer from 'ember-data/serializers/json-api';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Mixin | pagination-support-serializer', function (hooks) {
  setupTest(hooks);

  test('it creates pagination meta', async function (assert) {
    let UserAdapter = JSONAPIAdapter.extend({
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
            per_page: 15,
            total: 125,
          },
        });
      },
    });

    let UserSerializer = JSONAPISerializer.extend(
      PaginationSupportSerializerMixin,
    );

    this.owner.register('adapter:user', UserAdapter);
    this.owner.register('serializer:user', UserSerializer);

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
