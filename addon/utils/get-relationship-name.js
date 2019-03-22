import { RELATIONSHIP_ADAPTER_OPTION } from '@bagaaravel/ember-data-extensions/config'

export default function getRelationshipName (adapterOptions) {
  return adapterOptions && adapterOptions[RELATIONSHIP_ADAPTER_OPTION]
}
