import RelationshipSupportModelMixin from '@bagaaravel/ember-data-extensions/mixins/relationship-support-model'
import Model, { attr, belongsTo, hasMany } from '@ember-data/model'

export default class UserModel extends Model.extend(
  RelationshipSupportModelMixin
) {
  @attr firstName

  @belongsTo('company') company

  @hasMany('project') favoriteProjects
  @hasMany('project') projects
}
