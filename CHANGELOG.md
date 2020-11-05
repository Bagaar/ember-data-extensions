## v1.0.0 (2020-11-05)

### 💥 Breaking Changes

- Remove deprecated `pagination-support-serializer` mixin ([c7456fc](https://github.com/Bagaar/ember-data-extensions/commit/c7456fcb86fa08bd155bd8139753714fa1c62793))
- Remove deprecated `relationship-support-model` mixin ([536e439](https://github.com/Bagaar/ember-data-extensions/commit/536e4397d45155745847b235100e623a9583a283))
- Remove `relationship-support-adapter` mixin ([fc2b317](https://github.com/Bagaar/ember-data-extensions/commit/fc2b317696319f39d3615f1282f1fd45deacaaee))
- Remove `json-api-bagaaravel-serializer` mixin ([2230586](https://github.com/Bagaar/ember-data-extensions/commit/2230586149f44ba71ccdd47a63001258b6d54827))
- Remove `relationship-support-serializer` mixin ([c665e7e](https://github.com/Bagaar/ember-data-extensions/commit/c665e7efee2ca1f5057017c3a79d039c1669efe3))
- `saveRelationships` now only accepts a record and an array of relationships ([740348c](https://github.com/Bagaar/ember-data-extensions/commit/740348c770765d63fe58e8dfeb3847a64f64a176))

### 🚀 Enhancements

- Add new import paths for `saveRelationship` and `saveRelationships` model utils ([d944f25](https://github.com/Bagaar/ember-data-extensions/commit/d944f25be4b83a38f3e784bff3b5dec81d711953))
- Add new `urlForUpdateRecord` adapter util ([a342d9d](https://github.com/Bagaar/ember-data-extensions/commit/a342d9d2d18091a7a3778570ebac36c07ecfe752))
- Add new serializer utils ([c2609f5](https://github.com/Bagaar/ember-data-extensions/commit/c2609f57c8b0c22b7443b7c7052dca6e5515b415) / [d159e09](https://github.com/Bagaar/ember-data-extensions/commit/d159e099609948f5e964db34a723a8f0d5ddffc7))
  - `keyForAttribute`
  - `keyForRelationship`
  - `payloadKeyFromModelName`
  - `serialize`
  - `shouldSerializeHasMany`

## v0.2.0 (2019-11-26)

### 🚀 Enhancements

- Add a `save-relationship` util ([42e54c7](https://github.com/Bagaar/ember-data-extensions/commit/42e54c7dda02cdc153b54d28a21a1de7463c8f9d))
- Add a `save-relationships` util ([c6f28e9](https://github.com/Bagaar/ember-data-extensions/commit/c6f28e9a5ab0c3e4765edcf22c29eb3a052f9d59))
- Deprecate the `pagination-support-serializer` mixin ([a9a314d](https://github.com/Bagaar/ember-data-extensions/commit/a9a314d9bc1546e5b591d94d4c3cd3d63b88d8d4))
- Deprecate the `relationship-support-model` mixin ([e868f3e](https://github.com/Bagaar/ember-data-extensions/commit/e868f3e426bf56391c78711c9cc0b26a26fde539))
