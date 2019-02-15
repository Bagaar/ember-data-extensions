export default function getRelationshipDescriptor(record, relationshipName) {
  return record.constructor.relationshipsByName.get(relationshipName);
}
