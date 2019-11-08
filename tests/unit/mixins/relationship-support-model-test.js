/* eslint-disable ember/no-new-mixins */

import JSONAPISerializer from '@ember-data/serializer/json-api'
import { setupTest } from 'ember-qunit'
import { module, test } from 'qunit'
import createExistingRecord from '../../helpers/create-existing-record'

module('Unit | Mixin | relationship-support-model', function (hooks) {
  setupTest(hooks)

  /**
   * saveRelationship
   */

  test('"saveRelationship" throws when the record is new', function (assert) {
    let store = this.owner.lookup('service:store')
    let newUser = store.createRecord('user')

    assert.throws(() => {
      newUser.saveRelationship('company')
    })
  })

  test('"saveRelationship" throws when the relationship name is not valid', function (assert) {
    let store = this.owner.lookup('service:store')
    let existingUser = createExistingRecord(store, 'user')

    assert.throws(() => {
      existingUser.saveRelationship('invalid-relationship-name')
    })
  })

  test('"saveRelationship" throws when the relationship can not be serialized', function (assert) {
    class UserSerializer extends JSONAPISerializer {
      attrs = {
        company: {
          serialize: false
        }
      }
    }

    this.owner.register('serializer:user', UserSerializer)

    let store = this.owner.lookup('service:store')
    let existingUser = createExistingRecord(store, 'user')

    assert.throws(() => {
      existingUser.saveRelationship('company')
    })
  })

  /**
   * saveRelationships
   */

  test('"saveRelationships" throws when the record is new', function (assert) {
    let store = this.owner.lookup('service:store')
    let newUser = store.createRecord('user')

    assert.throws(() => {
      newUser.saveRelationships('company', 'projects')
    })
  })
})
