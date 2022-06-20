import {
  getRelationshipDescriptor,
  getRelationshipName,
} from '@bagaaravel/ember-data-extensions/-private/utils';
import { classify, underscore } from '@ember/string';

export function keyForAttribute(key) {
  return underscore(key);
}

export function keyForRelationship(key) {
  return key;
}

export function payloadKeyFromModelName(modelName) {
  return classify(modelName);
}

export function serialize(serialized, snapshot) {
  const relationshipName = getRelationshipName(snapshot.adapterOptions);
  const isSavingRelationship = Boolean(relationshipName);

  if (!isSavingRelationship) {
    return serialized;
  }

  const serializedRelationships = serialized.data.relationships;

  if (serializedRelationships && serializedRelationships[relationshipName]) {
    return serializedRelationships[relationshipName];
  }

  const relationshipDescriptor = getRelationshipDescriptor(
    snapshot.record,
    relationshipName
  );

  if (relationshipDescriptor.kind === 'hasMany') {
    return {
      data: [],
    };
  }

  return {
    data: null,
  };
}

export function shouldSerializeHasMany(
  superCheck,
  snapshot,
  key,
  relationshipDescriptor
) {
  const isRecordNew = snapshot.record.isNew;
  const isRecordSaving = snapshot.record.isSaving;
  const relationshipName = getRelationshipName(snapshot.adapterOptions);
  const shouldSaveRelationship =
    relationshipName === relationshipDescriptor.key;

  return (
    (superCheck && (isRecordNew || !isRecordSaving)) || shouldSaveRelationship
  );
}
