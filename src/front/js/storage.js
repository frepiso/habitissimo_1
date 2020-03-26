'use strict';
/**
 * Singleton Storage
 */
class Storage {
  /**
   * constructor
   * @return {object} The instance of the storage
   */
  constructor() {
    this.page = 'home';
    this.step = '0';
    this.next = '1';
    this.budget = {
      description: '',
      date: '',
      category: '',
      subcategory: '',
      preference: '',
      name: '',
      email: '',
      phone: '',
    };

    if (typeof Storage.instance === 'object') {
      return Storage.instance;
    }

    Storage.instance = this;
    return this;
  }
  /**
   * setPage
   * @param {string} page
   */
  setPage(page) {
    this.page = page;
  }

  /**
   * getPage
   * @return {string}
   */
  getPage() {
    return this.page;
  }

  /**
   * setStep
   * @param {string} step
   */
  setStep(step) {
    this.step = step;
  }

  /**
   * getStep
   * @return {string}
   */
  getStep() {
    return this.step;
  }

  /**
   * setNext
   * @param {string} next
   */
  setNext(next) {
    this.next = next;
  }

  /**
   * getNext
   * @return {string}
   */
  getNext() {
    return this.next;
  }

  /**
   * setBudgetValue
   * @param {string} key
   * @param {string} value
   */
  setBudgetValue(key, value) {
    this.budget[key] = value;
  }

  /**
   * getBudgetValue
   * @return {string}
   */
  getBudgetValue(key) {
    return this.budget[key];
  }

  /**
   * getBudget
   * @return {object}
   */
  getBudget() {
    return this.budget;
  }

  /**
   * clearBudget
   * clear values of the budget
   */
  clearBudget() {
    for (key in this.budget) {
      if (this.budget.hasOwnProperty(key)) {
        this.budget[key] = '';
      }
    }
  }
}

export default Storage;
