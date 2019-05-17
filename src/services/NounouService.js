import { EthanPromise } from './EthanServices';

let EthanService = {};
EthanPromise.then((ethan) => { EthanService = ethan; });

/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
let instance = null;

class NounouServices {
  constructor() {
    this.totalSeenAds = 0;
    this.visits = [];
    this.adventure = [];
    this.visitedFlatIDs = [];
    this.actualVisit = { visit_recap: 'Avec une tache de sang' };
    this.actualFlat = {};

    if (!instance) {
      instance = this;
    }
    return instance;
  }

  // DELETE CARD THAT HAS BEEN ALREADY SEEN

  saveAd(ad) {
    this.totalSeenAds += 1;
    this.actualFlat = ad;
    this.visitedFlatIDs.push(ad.id);
    EthanService.removeData('ad', ad.id);
  }

  saveAdventure(adventure) {
    this.actualAdventure = adventure;
    EthanService.removeData('adventure', adventure.id);
  }

  saveEvent(event) {
    EthanService.removeData('event', event.id);
  }

  saveQuestion(question) {
    EthanService.removeData('question', question.id);
  }

  saveVisit(visit) {
    this.visits.push(visit.visit_recap);
    this.actualVisit = visit;
    EthanService.removeData('visit', visit.id);
  }

  getVisitedFlat() {
    return this.visitedFlatIDs;
  }

  getRecap() {
    return {
      actualFlat: {
        visit: this.actualVisit,
        flat: this.actualFlat,
      },
      totalSeenAds: this.totalSeenAds,
      adventure: this.actualAdventure,
      visits: this.visits,
    };
  }
}

export const NounouService = new NounouServices();
