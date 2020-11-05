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

`@bagaaravel/ember-data-extensions` supports **Ember v3.16 and up**.

## Installation

```shell
ember install @bagaaravel/ember-data-extensions
```

## Usage

### 1\. Extend the Application Serializer

```javascript
// app/serializers/application.js

import {
  keyForAttribute,
  keyForRelationship,
  payloadKeyFromModelName,
  serialize,
  shouldSerializeHasMany
} from '@bagaaravel/ember-data-extensions/serializer'
import JSONAPISerializer from '@ember-data/serializer/json-api'

export default class ApplicationSerializer extends JSONAPISerializer {
  // Makes sure attribute keys have the correct casing.
  keyForAttribute () {
    return keyForAttribute(...arguments)
  }

  // Makes sure relationship keys have the correct casing.
  keyForRelationship () {
    return keyForRelationship(...arguments)
  }

  // Makes sure model types have the correct casing.
  payloadKeyFromModelName () {
    return payloadKeyFromModelName(...arguments)
  }

  // Makes sure relationships are correctly serialized.
  serialize () {
    const serialized = super.serialize(...arguments)

    return serialize(serialized, ...arguments)
  }

  // Checks when 'hasMany' relationships should be serialized.
  shouldSerializeHasMany () {
    const superCheck = super.shouldSerializeHasMany(...arguments)

    return shouldSerializeHasMany(superCheck, ...arguments)
  }
}
```

### 2\. Extend the Application Adapter

```javascript
// app/adapters/application.js

import { urlForUpdateRecord } from '@bagaaravel/ember-data-extensions/adapter'
import JSONAPIAdapter from '@ember-data/adapter/json-api'

export default class ApplicationAdapter extends JSONAPIAdapter {
  // Makes sure the correct URL is used when only saving a relationship.
  urlForUpdateRecord () {
    const baseUrl = super.urlForUpdateRecord(...arguments)

    return urlForUpdateRecord(baseUrl, ...arguments)
  }
}
```

### 3\. Updating Relationships

```javascript
import {
  saveRelationship,
  saveRelationships
} from '@bagaaravel/ember-data-extensions/model'

const user = await this.store.findRecord('user', '1')

// Will update the user's projects.
saveRelationship(user, 'projects')

// Also works for 'belongsTo' relationships.
saveRelationship(user, 'company')

// Shorthand for updating multiple relationships.
saveRelationships(user, 'projects', 'company')
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](./LICENSE.md).

## Maintenance

`@bagaaravel/ember-data-extensions` is built and maintained by [Bagaar](https://bagaar.be).

![Bagaar Logo](https://bagaar.be/hubfs/logo-bagaar-black.svg)
