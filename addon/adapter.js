import { getRelationshipName } from '@bagaaravel/ember-data-extensions/-private/utils'

export function urlForUpdateRecord (baseUrl, id, modelName, snapshot) {
  const relationshipName = getRelationshipName(snapshot.adapterOptions)
  const isSavingRelationship = Boolean(relationshipName)

  if (isSavingRelationship) {
    return `${baseUrl}/relationships/${relationshipName}`
  }

  return baseUrl
}
