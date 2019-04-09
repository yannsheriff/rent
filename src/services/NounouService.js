/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
let instance = null;

class NounouServices {
  constructor() {
    this.totalSeenAds = 0;
    this.visits = [];
    this.adventure = [];
    this.actualVisit = 'Avec une tache de sang';
    this.acutalFlat = {};

    if (!instance) {
      instance = this;
    }
    return instance;
  }

  newAd(ad) {
    this.totalSeenAds++;
    this.actualAd = ad;
  }

  getRecap() {
    return {
      acutalFlat: {
        visit: this.actualVisit,
        flat: this.acutalFlat,
      },
      totalSeenAds: this.totalSeenAds,
      visits: this.visits,
    };
  }
}

export const NounouService = new NounouServices();
