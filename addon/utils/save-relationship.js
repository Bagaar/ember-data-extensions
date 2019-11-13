import { RELATIONSHIP_ADAPTER_OPTION } from '@bagaaravel/ember-data-extensions/config'
import getRelationshipDescriptor from '@bagaaravel/ember-data-extensions/utils/get-relationship-descriptor'
import { assert } from '@ember/debug'

export default function saveRelationship (record, relationshipName) {
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

function canSerializeRelationship (record, relationshipName) {
  let serializer = record.store.serializerFor(record.constructor.modelName)
  let { attrs } = serializer

  return (
    !attrs ||
    !attrs[relationshipName] ||
    attrs[relationshipName].serialize !== false
  )
}
