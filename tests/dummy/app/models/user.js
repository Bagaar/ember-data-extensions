import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr firstName;

  @belongsTo('company', { async: false, inverse: null }) company;

  @hasMany('project', { async: false, inverse: null }) favoriteProjects;
  @hasMany('project', { async: false, inverse: null }) projects;
}
