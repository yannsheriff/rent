/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */

let instance = null;
class EthanServices {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }


  async get(itemKey) {

  }
}

export const storeService = new EthanServices();
