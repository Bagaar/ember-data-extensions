export default function getAdapterOption(snapshot, adapterOptionKey) {
  return snapshot.adapterOptions && snapshot.adapterOptions[adapterOptionKey];
}
