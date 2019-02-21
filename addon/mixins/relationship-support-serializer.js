/* eslint-disable ember/no-new-mixins */

import getRelationshipDescriptor from '@bagaar/ember-data-bagaaravel/utils/get-relationship-descriptor';
import getRelationshipName from '@bagaar/ember-data-bagaaravel/utils/get-relationship-name';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  /**
   * Hooks
   */

  serialize(snapshot) {
    let serialized = this._super(...arguments);
    let relationshipName = getRelationshipName(snapshot.adapterOptions);
    let isSavingRelationship = !!relationshipName;

    if (!isSavingRelationship) {
      return serialized;
    }

    let serializedRelationships = serialized.data.relationships;

    if (serializedRelationships && serializedRelationships[relationshipName]) {
      return serializedRelationships[relationshipName];
    }

    let relationshipDescriptor = getRelationshipDescriptor(snapshot.record, relationshipName);

    if (relationshipDescriptor.kind === 'hasMany') {
      return { data: [] };
    }

    return { data: null };
  },

  shouldSerializeHasMany(snapshot, key, relationshipDescriptor) {
    let relationshipName = getRelationshipName(snapshot.adapterOptions);
    let shouldSaveRelationship = relationshipName === relationshipDescriptor.key;
    let shouldSerializeHasMany = this._super(...arguments);

    return shouldSaveRelationship || shouldSerializeHasMany;
  },
});
