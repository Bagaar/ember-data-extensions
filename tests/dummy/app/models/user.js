import RelationshipSupportModelMixin from '@bagaaravel/ember-data-extensions/mixins/relationship-support-model';
import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend(RelationshipSupportModelMixin, {
  /**
   * Attributes
   */

  firstName: attr(),

  /**
   * Relationships
   */

  company: belongsTo('company'),
  projects: hasMany('project'),
});
