import getAdapterOption from '@bagaar/ember-data-bagaaravel/utils/get-adapter-option';
import { module, test } from 'qunit';

module('Unit | Utility | get-adapter-option', function () {
  test('it returns the adapter option', function (assert) {
    let snapshot = {
      adapterOptions: {
        relationshipName: 'projects',
      },
    };

    let relationshipName = getAdapterOption(snapshot, 'relationshipName');

    assert.equal(relationshipName, 'projects');
  });
});
