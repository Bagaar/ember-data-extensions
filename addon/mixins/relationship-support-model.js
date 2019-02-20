import { RELATIONSHIP_ADAPTER_OPTION } from '@bagaar/ember-data-bagaaravel/config';
import getRelationshipDescriptor from '@bagaar/ember-data-bagaaravel/utils/get-relationship-descriptor';
import { assert } from '@ember/debug';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  /**
   * Methods
   */

  saveRelationship(relationshipName) {
    assert(
      'ember-data-bagaaravel: Cannot save a relationship of a newly created record.',
      !this.isNew,
    );

    assert(
      `ember-data-bagaaravel: "${relationshipName}" is not a valid relationship name.`,
      getRelationshipDescriptor(this, relationshipName),
    );

    assert(
      `ember-data-bagaaravel: "${relationshipName}" relationship can not be serialized.`,
      this.canSerializeRelationship(relationshipName),
    );

    return this.save({
      adapterOptions: {
        [RELATIONSHIP_ADAPTER_OPTION]: relationshipName,
      },
    });
  },

  saveRelationships(...relationshipNames) {
    assert(
      'ember-data-bagaaravel: Cannot save relationships of a newly created record.',
      !this.isNew,
    );

    let promises = relationshipNames.map(relationshipName => this.saveRelationship(relationshipName));

    return Promise.all(promises).then(() => this);
  },

  canSerializeRelationship(relationshipName) {
    let serializer = this.store.serializerFor(this.constructor.modelName);
    let { attrs } = serializer;

    return !attrs || !attrs[relationshipName] || attrs[relationshipName].serialize !== false;
  },
});
