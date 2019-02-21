/* eslint-disable ember/no-new-mixins */

import { RELATIONSHIP_ADAPTER_OPTION } from '@bagaaravel/ember-data-extensions/config';
import getRelationshipDescriptor from '@bagaaravel/ember-data-extensions/utils/get-relationship-descriptor';
import { assert } from '@ember/debug';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  /**
   * Methods
   */

  saveRelationship(relationshipName) {
    assert(
      '@bagaaravel/ember-data-extensions: Cannot save a relationship of a newly created record.',
      !this.isNew,
    );

    assert(
      `@bagaaravel/ember-data-extensions: "${relationshipName}" is not a valid relationship name.`,
      getRelationshipDescriptor(this, relationshipName),
    );

    assert(
      `@bagaaravel/ember-data-extensions: "${relationshipName}" relationship can not be serialized.`,
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
      '@bagaaravel/ember-data-extensions: Cannot save relationships of a newly created record.',
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
