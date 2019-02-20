import getRelationshipName from '@bagaar/ember-data-bagaaravel/utils/get-relationship-name';
import { module, test } from 'qunit';

module('Unit | Utility | get-relationship-name', function () {
  test('it returns the relationship name', function (assert) {
    let snapshot = {
      adapterOptions: {
        relationshipName: 'projects',
      },
    };

    let relationshipName = getRelationshipName(snapshot.adapterOptions);

    assert.equal(relationshipName, 'projects');
  });
});
