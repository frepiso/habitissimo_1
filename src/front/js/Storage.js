'use strict';
import MultiInherit from './lib/MultiInherit';
import RouterStorage from './lib/RouterStorage';
import BudgetStorage from './lib/BudgetStorage';

/**
 * Singleton Storage
 */
class Storage extends MultiInherit.inherit(RouterStorage, BudgetStorage) {
  /**
   * constructor
   * @return {object} The instance of the storage
   */
  constructor(...args) {
    super(...args);

    if (typeof Storage.instance === 'object') {
      return Storage.instance;
    }

    Storage.instance = this;
    return this;
  }
}

export default Storage;
