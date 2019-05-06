import { EthanService } from './EthanServices';

/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
let instance = null;

class NounouServices {
  constructor() {
    this.totalSeenAds = 0;
    this.visits = [];
    this.adventure = [];
    this.visitedFlatIDs = [];
    this.actualVisit = 'Avec une tache de sang';
    this.actualFlat = {};

    if (!instance) {
      instance = this;
    }
    return instance;
  }

  saveAd(ad) {
    this.totalSeenAds += 1;
    this.visitedFlatIDs.push(ad.id);
    EthanService.removeData('ad', ad.id);
    this.actualAd = ad;
  }

  getVisitedFlat() {
    return this.visitedFlatIDs;
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
