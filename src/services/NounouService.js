import { EthanPromise } from './EthanServices';

let EthanService = {};
EthanPromise.then((ethan) => { EthanService = ethan; });

/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
let instance = null;


// DATA DEBUG
// this.visitsAccepted = [
//   { visit_recap: 'miteux' },
//   { visit_recap: 'avec des rats et des souris' },
// ];
// this.questionsAccepted = [
//   { question_recap: 'Abandonné Fluffy, votre adorable toutou' },
//   { question_recap: 'Dû aller racheter des vêtements pour vous faire bien voir' },
// ];
// this.adventuresRejected = [
//   { adventure_first_choice_recap: 'divertir le propriétaire' },
// ];
// this.adventuresAccepted = [
//   { adventure_second_choice_recap: 'pousser un couple dans les escaliers' },
//   { adventure_second_choice_recap: 'jouer votre loyer à la roulette russe' },
// ];
// this.actualVisit = {
//   visit_recap: 'Avec une tache de sang',
// };
// this.actualFlat = {
//   ad_title: 'Superbe tipi en centre ville',
//   ad_size: 35,
// };

class NounouServices {
  constructor() {
    this.totalSeenAds = 0;
    this.visitsAccepted = [
      { visit_recap: 'miteux' },
      { visit_recap: 'avec des rats et des souris' },
    ];
    this.questionsAccepted = [
      { question_recap: 'Abandonné Fluffy, votre adorable toutou' },
      { question_recap: 'Dû aller racheter des vêtements pour vous faire bien voir' },
    ];
    this.adventuresRejected = [
      { adventure_first_choice_recap: 'divertir le propriétaire pour avoir un loyer' },
    ];
    this.adventuresAccepted = [
      { adventure_second_choice_recap: 'pousser un couple dans les escaliers' },
      { adventure_second_choice_recap: 'jouer votre loyer à la roulette russe' },
    ];
    this.actualVisit = {
      visit_recap: 'Avec une tache de sang',
    };
    this.actualFlat = {
      ad_title: 'Superbe tipi en centre ville',
      ad_size: 35,
    };

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
