# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.0.0 (2020-11-05)


### ⚠ BREAKING CHANGES

* remove relationship-support-serializer mixin
* remove json-api-bagaaravel-serializer mixin
* remove relationship-support-adapter mixin
* remove deprecated relationship-support-model mixin
* remove deprecated pagination-support-serializer mixin
* update import paths of model utils
* prettier-standard requires node 8

### Features

* add a "save-relationship" util ([42e54c7](https://github.com/Bagaar/ember-data-extensions/commit/42e54c7dda02cdc153b54d28a21a1de7463c8f9d))
* add a "save-relationships" util ([c6f28e9](https://github.com/Bagaar/ember-data-extensions/commit/c6f28e9a5ab0c3e4765edcf22c29eb3a052f9d59))
* Add json-api-bagaaravel-serializer mixin ([89153ac](https://github.com/Bagaar/ember-data-extensions/commit/89153ac088afe0bf560c0a86a746f3892bad5f37))
* Add pagination support serializer mixin ([f0fbd9a](https://github.com/Bagaar/ember-data-extensions/commit/f0fbd9adb21ed54ab9a0e37fc188b73c21db2e99))
* Add relationship support adapter mixin ([ccd6e3f](https://github.com/Bagaar/ember-data-extensions/commit/ccd6e3fb016069277fccb740cef8d6f5dcb31bff))
* Add relationship support for models and serializers ([462bac8](https://github.com/Bagaar/ember-data-extensions/commit/462bac8590c4412f5a2e4eeedd4cd4320a73001a))
* add serialize util and extend shouldSerializeHasMany util ([d159e09](https://github.com/Bagaar/ember-data-extensions/commit/d159e099609948f5e964db34a723a8f0d5ddffc7))
* add serializer utils ([c2609f5](https://github.com/Bagaar/ember-data-extensions/commit/c2609f57c8b0c22b7443b7c7052dca6e5515b415))
* Add the base json-api-bagaaravel serializer ([86018fa](https://github.com/Bagaar/ember-data-extensions/commit/86018fa365adb54412ab7058e00e819b093ad0c9))
* add urlForUpdateRecord adapter util ([a342d9d](https://github.com/Bagaar/ember-data-extensions/commit/a342d9d2d18091a7a3778570ebac36c07ecfe752))
* deprecate the pagination-support-serializer mixin ([a9a314d](https://github.com/Bagaar/ember-data-extensions/commit/a9a314d9bc1546e5b591d94d4c3cd3d63b88d8d4))
* deprecate the relationship-support-model mixin ([e868f3e](https://github.com/Bagaar/ember-data-extensions/commit/e868f3e426bf56391c78711c9cc0b26a26fde539))
* update import paths of model utils ([d944f25](https://github.com/Bagaar/ember-data-extensions/commit/d944f25be4b83a38f3e784bff3b5dec81d711953))


### Bug Fixes

* Only prevent serializing hasMany relationships when actually saving existing records ([7b17bdb](https://github.com/Bagaar/ember-data-extensions/commit/7b17bdbf31ba7e8b7cd7b549a4b1a130e1d8be80))
* Parsing of pagination links in Fastboot ([becc06d](https://github.com/Bagaar/ember-data-extensions/commit/becc06d2f5390a55c6f2c16d02fe682f5f26b6ee))
* Remove re-export of json-api-bagaaravel serializer ([7542b3b](https://github.com/Bagaar/ember-data-extensions/commit/7542b3b0c161ac02e4a251360cc2c828b7663590))
* Use per_page for now ([a420b36](https://github.com/Bagaar/ember-data-extensions/commit/a420b367416cda322bc6924b26ae4edcbc7c008e))


* remove deprecated pagination-support-serializer mixin ([c7456fc](https://github.com/Bagaar/ember-data-extensions/commit/c7456fcb86fa08bd155bd8139753714fa1c62793))
* remove deprecated relationship-support-model mixin ([536e439](https://github.com/Bagaar/ember-data-extensions/commit/536e4397d45155745847b235100e623a9583a283))
* remove json-api-bagaaravel-serializer mixin ([2230586](https://github.com/Bagaar/ember-data-extensions/commit/2230586149f44ba71ccdd47a63001258b6d54827))
* remove relationship-support-adapter mixin ([fc2b317](https://github.com/Bagaar/ember-data-extensions/commit/fc2b317696319f39d3615f1282f1fd45deacaaee))
* remove relationship-support-serializer mixin ([c665e7e](https://github.com/Bagaar/ember-data-extensions/commit/c665e7efee2ca1f5057017c3a79d039c1669efe3))
* Update the linting configuration ([49878fc](https://github.com/Bagaar/ember-data-extensions/commit/49878fc93fd64a985d48b949926e514304922ef6))

## 0.2.0 (2019-11-26)

### Features

* Add a "save-relationship" util ([42e54c7](https://github.com/Bagaar/ember-data-extensions/commit/42e54c7dda02cdc153b54d28a21a1de7463c8f9d))
* Add a "save-relationships" util ([c6f28e9](https://github.com/Bagaar/ember-data-extensions/commit/c6f28e9a5ab0c3e4765edcf22c29eb3a052f9d59))
* Deprecate the "pagination-support-serializer" mixin ([a9a314d](https://github.com/Bagaar/ember-data-extensions/commit/a9a314d9bc1546e5b591d94d4c3cd3d63b88d8d4))
* Deprecate the "relationship-support-model" mixin ([e868f3e](https://github.com/Bagaar/ember-data-extensions/commit/e868f3e426bf56391c78711c9cc0b26a26fde539))

## 0.1.0 (2019-11-12)
