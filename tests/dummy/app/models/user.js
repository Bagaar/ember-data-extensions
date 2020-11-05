import Model, { attr, belongsTo, hasMany } from '@ember-data/model'

export default class UserModel extends Model {
  @attr firstName

  @belongsTo('company') company

  @hasMany('project') favoriteProjects
  @hasMany('project') projects
}
