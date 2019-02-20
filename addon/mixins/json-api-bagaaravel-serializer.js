/* eslint-disable ember/no-new-mixins */

import Mixin from '@ember/object/mixin';
import { classify, underscore } from '@ember/string';

export default Mixin.create({
  /**
   * Hooks
   */

  // Bagaaravel uses snake_case for attributes instead of kebab-case.
  // "attributeName" -> "attribute_name"
  keyForAttribute(key) {
    return underscore(key);
  },

  // Bagaaravel uses the singular classified form of a model's name for "type".
  // "model-name" -> "ModelName"
  payloadKeyFromModelName(modelName) {
    return classify(modelName);
  },

  // Bagaaravel only allows hasMany relationships to be saved via the record when it's new.
  shouldSerializeHasMany(snapshot) {
    let isRecordNew = snapshot.record.isNew;
    let shouldSerializeHasMany = this._super(...arguments);

    return isRecordNew && shouldSerializeHasMany;
  },
});
