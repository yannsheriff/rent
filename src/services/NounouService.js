import { EthanPromise } from './EthanServices';

let EthanService = {};
EthanPromise.then((ethan) => { EthanService = ethan; });

/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
let instance = null;

class NounouServices {
  constructor() {
    this.totalSeenAds = 0;
    this.visitsAccepted = [];
    this.questionsAccepted = [];
    this.adventuresRejected = [];
    this.adventuresAccepted = [];
    // this.visitedFlatIDs = [];
    this.actualVisit = {
      visit_recap: 'Avec une tache de sang',
    };
    this.actualFlat = {};

    if (!instance) {
      instance = this;
    }
    return instance;
  }

  saveAd(ad) {
    this.totalSeenAds += 1;
    this.actualFlat = ad;
    EthanService.removeData('ad', ad.id);
  }

  saveAdventure(adventure, choice) {
    if (choice) {
      this.adventuresAccepted.push(adventure);
    } else {
      this.adventuresRejected.push(adventure);
    }
    EthanService.removeData('adventure', adventure.id);
  }

  saveEvent(event) {
    EthanService.removeData('event', event.id);
  }

  saveQuestion(question, choice) {
    if (choice) {
      this.questionsAccepted.push(question);
    }
    EthanService.removeData('question', question.id);
  }

  saveVisit(visit) {
    if (visit.visit_quality === 'bad') {
      this.visitsAccepted.push(visit);
    }
    this.actualVisit = visit;
    EthanService.removeData('visit', visit.id);
  }

  // getVisitedFlat() {
  //   return this.visitedFlatIDs;
  // }

  getRecap() {
    return {
      actualFlat: {
        visit: this.actualVisit,
        flat: this.actualFlat,
      },
      visitsAccepted: this.visitsAccepted,
      questionsAccepted: this.questionsAccepted,
      adventuresRejected: this.adventuresRejected,
      adventuresAccepted: this.adventuresAccepted,
      totalSeenAds: this.totalSeenAds,
    };
  }
}

export const NounouService = new NounouServices();
