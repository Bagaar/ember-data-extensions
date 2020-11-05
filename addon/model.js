import { RELATIONSHIP_ADAPTER_OPTION } from '@bagaaravel/ember-data-extensions/-private/config'
import { getRelationshipDescriptor } from '@bagaaravel/ember-data-extensions/-private/utils'
import { assert } from '@ember/debug'

export function saveRelationship (record, relationshipName) {
  assert(
    '@bagaaravel/ember-data-extensions: Cannot save a relationship of a newly created record.',
    !record.isNew
  )

  assert(
    `@bagaaravel/ember-data-extensions: "${relationshipName}" is not a valid relationship name.`,
    getRelationshipDescriptor(record, relationshipName)
  )

  assert(
    `@bagaaravel/ember-data-extensions: "${relationshipName}" relationship can not be serialized.`,
    canSerializeRelationship(record, relationshipName)
  )

  return record.save({
    adapterOptions: {
      [RELATIONSHIP_ADAPTER_OPTION]: relationshipName
    }
  })
}

export function saveRelationships (record, relationshipNames) {
  assert(
    '@bagaaravel/ember-data-extensions: Cannot save relationships of a newly created record.',
    !record.isNew
  )

  const promises = relationshipNames.map(relationshipName =>
    saveRelationship(record, relationshipName)
  )

  return Promise.all(promises)
}

function canSerializeRelationship (record, relationshipName) {
  const serializer = record.store.serializerFor(record.constructor.modelName)
  const { attrs } = serializer

  return (
    !attrs ||
    !attrs[relationshipName] ||
    attrs[relationshipName].serialize !== false
  )
}
