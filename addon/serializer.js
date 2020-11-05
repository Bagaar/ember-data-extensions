import { classify, underscore } from '@ember/string'

export function keyForAttribute (key) {
  return underscore(key)
}

export function keyForRelationship (key) {
  return key
}

export function payloadKeyFromModelName (modelName) {
  return classify(modelName)
}

export function shouldSerializeHasMany (superCheck, snapshot) {
  const isRecordNew = snapshot.record.isNew
  const isRecordSaving = snapshot.record.isSaving

  return superCheck && (isRecordNew || !isRecordSaving)
}
