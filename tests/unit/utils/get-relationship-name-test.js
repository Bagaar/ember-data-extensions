import { RELATIONSHIP_ADAPTER_OPTION } from '@bagaar/ember-data-bagaaravel/config';
import getRelationshipName from '@bagaar/ember-data-bagaaravel/utils/get-relationship-name';
import { module, test } from 'qunit';

module('Unit | Utility | get-relationship-name', function () {
  test('it returns the relationship name', function (assert) {
    let snapshot = {
      adapterOptions: {
        [RELATIONSHIP_ADAPTER_OPTION]: 'projects',
      },
    };

    let relationshipName = getRelationshipName(snapshot.adapterOptions);

    assert.equal(relationshipName, 'projects');
  });
});
