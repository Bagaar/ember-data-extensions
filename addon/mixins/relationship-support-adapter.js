import Mixin from '@ember/object/mixin';

export default Mixin.create({
  /**
   * Hooks
   */

  urlForUpdateRecord(id, modelName, snapshot) {
    let urlForUpdateRecord = this._super(...arguments);
    let adapterOptions = snapshot.adapterOptions || {};

    if (adapterOptions.isSavingRelationship) {
      return `${urlForUpdateRecord}/relationships/${adapterOptions.relationshipName}`;
    }

    return urlForUpdateRecord;
  },
});
