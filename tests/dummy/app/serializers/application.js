import JSONAPIBagaaravelSerializer from '@bagaar/ember-data-bagaaravel/serializers/json-api-bagaaravel';
import PaginationSupportSerializerMixin from '@bagaar/ember-data-bagaaravel/mixins/pagination-support-serializer-mixin';

export default JSONAPIBagaaravelSerializer.extend(PaginationSupportSerializerMixin);
