import { assert } from '@ember/debug'
import saveRelationship from './save-relationship'

export default function saveRelationships (record, ...relationshipNames) {
  assert(
    '@bagaaravel/ember-data-extensions: Cannot save relationships of a newly created record.',
    !record.isNew
  )

  let promises = relationshipNames.map(relationshipName =>
    saveRelationship(record, relationshipName)
  )

  return Promise.all(promises)
}
