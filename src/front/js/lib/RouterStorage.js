'use stric';
/**
 * Router Storage
 */
class RouterStorage {
  /**
   * constructor
   */
  constructor() {
    this.router = {
      page: 'home',
      step: '0',
      next: '1',
      prev: '1',
    };
  }

  /**
   * setRouter
   * @param {object} router
   */
  setRouter(router) {
    return this.router = router;
  }

  /**
   * getBudget
   * @return {object}
   */
  getRouter() {
    return this.router;
  }

  /**
   * setPage
   * @param {string} page
   */
  setPage(page) {
    this.router.page = page;
  }

  /**
   * getPage
   * @return {string}
   */
  getPage() {
    return this.router.page;
  }

  /**
   * setStep
   * @param {string} step
   */
  setStep(step) {
    this.router.step = step;
  }

  /**
   * getStep
   * @return {string}
   */
  getStep() {
    return this.router.step;
  }

  /**
   * setNext
   * @param {string} next
   */
  setNext(next) {
    this.router.next = next;
  }

  /**
   * getNext
   * @return {string}
   */
  getNext() {
    return this.router.next;
  }
  /**
   * setPrev
   * @param {string} prev
   */
  setPrev(prev) {
    this.router.prev = prev;
  }

  /**
   * getPrev
   * @return {string}
   */
  getPrev() {
    return this.router.prev;
  }
}

export default RouterStorage;
