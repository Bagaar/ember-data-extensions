# Bagaaravel Ember Data Extensions

[![NPM Version](https://badge.fury.io/js/%40bagaaravel%2Fember-data-extensions.svg)](https://badge.fury.io/js/%40bagaaravel%2Fember-data-extensions) [![Build Status](https://travis-ci.com/Bagaar/ember-data-extensions.svg?branch=master)](https://travis-ci.com/Bagaar/ember-data-extensions) [![Ember Observer Score](https://emberobserver.com/badges/-bagaaravel-ember-data-extensions.svg)](https://emberobserver.com/addons/@bagaaravel/ember-data-extensions) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Ember Data extensions to communicate with the Bagaaravel JSON API implementation.

## Table of Contents

- [Introduction](#introduction)
- [Support](#support)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Maintenance](#maintenance)

## Introduction

`@bagaaravel/ember-data-extensions` is an addon that allows you to easily communicate with the Bagaaravel JSON API implementation.

## Support

**`@bagaaravel/ember-data-extensions` supports Ember v3.16 and up.**

## Installation

```shell
ember install @bagaaravel/ember-data-extensions
```

## Usage

### 1\. Basic Support

First, we need to make sure that payloads sent to and received from Bagaaravel are correctly serialized and normalized.

```javascript
// app/serializers/application.js

import JSONAPIBagaaravelSerializerMixin from '@bagaaravel/ember-data-extensions/mixins/json-api-bagaaravel-serializer'
import JSONAPISerializer from '@ember-data/serializer/json-api'

export default class ApplicationSerializer extends JSONAPISerializer.extend(
  JSONAPIBagaaravelSerializerMixin
) {}
```

This will make sure that attribute keys, relationship keys and model types have the correct casing.

This will also prevent serializing `hasMany` relationships when updating records. More info about this in the [Updating Relationships](#2-updating-relationships) section.

### 2\. Updating Relationships

Bagaaravel does not allow updating `hasMany` relationships via the resource record. That is why the `JSONAPIBagaaravelSerializerMixin` does not serialize `hasMany` relationships when updating records. However, Bagaaravel _does_ allow updating `hasMany` relationships by executing a separate `PATCH` request to a [relationship link](https://jsonapi.org/format/#document-resource-object-related-resource-links).

First, we need to update the `application` adapter.

```javascript
// app/adapters/application.js

import RelationshipSupportAdapterMixin from '@bagaaravel/ember-data-extensions/mixins/relationship-support-adapter'
import JSONAPIAdapter from '@ember-data/adapter/json-api'

export default class ApplicationAdapter extends JSONAPIAdapter.extend(
  RelationshipSupportAdapterMixin
) {}
```

Then, we need to update the `application` serializer.

```javascript
// app/serializers/application.js

import JSONAPIBagaaravelSerializerMixin from '@bagaaravel/ember-data-extensions/mixins/json-api-bagaaravel-serializer'
import RelationshipSupportSerializerMixin from '@bagaaravel/ember-data-extensions/mixins/relationship-support-serializer'
import JSONAPISerializer from '@ember-data/serializer/json-api'

export default class ApplicationSerializer extends JSONAPISerializer.extend(
  JSONAPIBagaaravelSerializerMixin,
  RelationshipSupportSerializerMixin
) {}
```

Eventually, we can use the `saveRelationship` and `saveRelationships` utils to update relationships via a separate `PATCH` request.

```javascript
import {
  saveRelationship,
  saveRelationships
} from '@bagaaravel/ember-data-extensions/model'

const user = await this.store.findRecord('user', '1')

saveRelationship(user, 'projects') // Will update the user's projects.
saveRelationship(user, 'company') // Also works for `belongsTo` relationships.
saveRelationships(user, 'projects', 'company') // Shorthand for updating multiple relationships.
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](./LICENSE.md).

## Maintenance

**`@bagaaravel/ember-data-extensions` is built and maintained by [Bagaar](https://bagaar.be).**

![Bagaar Logo](https://bagaar.be/hubfs/logo-bagaar-black.svg)
