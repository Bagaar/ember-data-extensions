import { RELATIONSHIP_ADAPTER_OPTION } from '@bagaar/ember-data-bagaaravel/config';

export default function getRelationshipName(adapterOptions) {
  return adapterOptions && adapterOptions[RELATIONSHIP_ADAPTER_OPTION];
}
