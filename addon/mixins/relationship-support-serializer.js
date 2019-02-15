import getAdapterOption from '@bagaar/ember-data-bagaaravel/utils/get-adapter-option';
import getRelationshipDescriptor from '@bagaar/ember-data-bagaaravel/utils/get-relationship-descriptor';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  /**
   * Hooks
   */

  serialize(snapshot) {
    let serialized = this._super(...arguments);
    let relationshipName = getAdapterOption(snapshot, 'relationshipName');

    if (!relationshipName) {
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
    let relationshipName = getAdapterOption(snapshot, 'relationshipName');
    let shouldSaveRelationship = relationshipName === relationshipDescriptor.key;
    let shouldSerializeHasMany = this._super(...arguments);

    return shouldSaveRelationship || shouldSerializeHasMany;
  },
});
