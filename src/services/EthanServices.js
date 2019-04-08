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
    try {
      const dataSaved = await AsyncStorage.getItem(itemKey);
      if (dataSaved !== null && dataSaved) {
        return JSON.parse(dataSaved);
      }
      return false;
    } catch (error) {
      throw error;
    }
  }
}

export const storeService = new EthanServices();
