# Bagaaravel Ember Data Extensions

[![CI](https://github.com/Bagaar/ember-data-extensions/workflows/CI/badge.svg)](https://github.com/Bagaar/ember-data-extensions/actions?query=workflow%3ACI)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

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
  // Make sure attribute keys have the correct casing:
  keyForAttribute () {
    return keyForAttribute(...arguments)
  }

  // Make sure relationship keys have the correct casing:
  keyForRelationship () {
    return keyForRelationship(...arguments)
  }

  // Make sure model types have the correct casing:
  payloadKeyFromModelName () {
    return payloadKeyFromModelName(...arguments)
  }

  // Make sure relationships are correctly serialized:
  serialize () {
    const serialized = super.serialize(...arguments)

    return serialize(serialized, ...arguments)
  }

  // Check when 'hasMany' relationships should be serialized:
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
  // Make sure the correct URL is used when only saving a relationship:
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

// Update the user's projects:
saveRelationship(user, 'projects')

// Update the user's company:
saveRelationship(user, 'company')

// Update the user's projects and company:
saveRelationships(user, ['projects', 'company'])
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](./LICENSE.md).

## Maintenance

`@bagaaravel/ember-data-extensions` is built and maintained by [Bagaar](https://bagaar.be).

[![Bagaar Logo](https://bagaar.be/hubfs/logo-bagaar-black.svg)](https://bagaar.be)
