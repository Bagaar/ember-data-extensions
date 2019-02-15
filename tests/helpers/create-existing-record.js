export default function createExistingRecord(store, modelName, inputProperties = {}) {
  let existingRecord = store.createRecord(modelName, {
    ...inputProperties,
    id: 1,
  });

  store.pushPayload(existingRecord.serialize({ includeId: true }));

  return existingRecord;
}
