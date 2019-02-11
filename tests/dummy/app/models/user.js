import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  /**
   * Attributes
   */

  firstName: attr(),

  /**
   * Relationships
   */

  projects: hasMany('project'),
});
