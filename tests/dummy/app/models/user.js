import RelationshipSupportModelMixin from '@bagaaravel/ember-data-extensions/mixins/relationship-support-model'
import Model, { attr, belongsTo, hasMany } from '@ember-data/model'

export default class UserModel extends Model.extend(
  RelationshipSupportModelMixin
) {
  /**
   * Attributes
   */

  @attr firstName

  /**
   * Relationships
   */

  @belongsTo('company') company
  @hasMany('project') projects
  @hasMany('project') favoriteProjects
}
