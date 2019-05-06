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

  // DELETE CARD THAT HAS BEEN ALREADY SEEN

  saveAd(ad) {
    this.totalSeenAds += 1;
    this.actualAd = ad;
    // this.visitedFlatIDs.push(ad.id);
    EthanService.removeData('ad', ad.id);
  }

  saveAdventure(adventure) {
    // sauvegarder les choix ici
    EthanService.removeData('adventure', adventure.id);
  }

  saveEvent(event) {
    EthanService.removeData('event', event.id);
  }

  saveQuestion(question) {
    EthanService.removeData('question', question.id);
  }

  saveVisit(visit) {
    this.actualVisit = visit;
    EthanService.removeData('visit', visit.id);
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
