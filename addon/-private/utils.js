import { RELATIONSHIP_ADAPTER_OPTION } from '@bagaaravel/ember-data-extensions/-private/config';

export function getRelationshipDescriptor(record, relationshipName) {
  return record.constructor.relationshipsByName.get(relationshipName);
}

export function getRelationshipName(adapterOptions) {
  return adapterOptions && adapterOptions[RELATIONSHIP_ADAPTER_OPTION];
}
