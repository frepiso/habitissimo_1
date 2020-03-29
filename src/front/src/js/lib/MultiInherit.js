'use strict';
/**
 * Class for creating multi inheritance
 * Instead of passing a class to the extend,
 * we pass a static function called inherit,
 * which returns a class after merging properties
 * and methods together of other named classes.
 * Inside the inherit method,
 * we receive a rest parameter with all class names to inherit from.


 */
class MultiInherit {
  /**
  * Static inherit method to compound classes.
  * Copy over properties and methods.
  * @param {class} _classes
  * @return {object}
  */
  static inherit(..._classes) {
    /**
    * CompoundClasses
    */
    class CompoundClasses {
      /**
      * This is a key feature for creating
      * the instances of each class and copying
      * their properties in the constructor method.
      * We forward the parameters from the super() to the constructor.
      * @return {class} _classes
      */
      get base() {
        return _classes;
      }
      /**
      * constructor
      * @param {class} args
      */
      constructor(..._args) {
        let index = 0;
        for (let C of this.base) { // eslint-disable-line
          const obj = new C(_args[index++]);
          MultiInherit.copy(this, obj);
        }
      }
    }

    for (let base of _classes) { // eslint-disable-line
      MultiInherit.copy(CompoundClasses, base);
      MultiInherit.copy(CompoundClasses.prototype, base.prototype);
    }

    return CompoundClasses;
  }

  /**
  * Static copy method.
  * Copies the properties from one class to another
  * @param {string} _target
  * @param {string} _source
  */
  static copy(_target, _source) {
    for (let key of Reflect.ownKeys(_source)) { // eslint-disable-line
      if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
        const desc = Object.getOwnPropertyDescriptor(_source, key);
        Object.defineProperty(_target, key, desc);
      }
    }
  }
}

export default MultiInherit;
