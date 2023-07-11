let id = 1;

export default function createExistingRecord(
  store,
  modelName,
  inputProperties = {},
) {
  const existingRecord = store.createRecord(modelName, {
    ...inputProperties,
    id,
  });

  id += 1;

  store.pushPayload(existingRecord.serialize({ includeId: true }));

  return existingRecord;
}
