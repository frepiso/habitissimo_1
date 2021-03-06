'use strict';

/**
 * Budget Storage
 */
class BudgetStorage {
  /**
   * constructor
   */
  constructor() {
    this.budget = {
      title: '',
      description: '',
      date: '',
      category: '',
      subcategory: '',
      preference: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      status: 'pendiente',
    };
  }

  /**
   * setBudget
   * @param {object} budget
   */
  setBudget(budget) {
    this.budget = budget;
  }

  /**
   * getBudget
   * @return {object}
   */
  getBudget() {
    return this.budget;
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
   * @param {string} key
   * @return {string}
   */
  getBudgetValue(key) {
    return this.budget[key];
  }

  /**
   * clearBudget
   * clear values of the budget
   */
  clearBudget() {
    for (let key in this.budget) { // eslint-disable-line
      if (this.budget.hasOwnProperty(key)) {
        this.budget[key] = '';
      }
    }
    this.budget.status = 'pendiente';
    localStorage.clear();
  }
}

export default BudgetStorage;
