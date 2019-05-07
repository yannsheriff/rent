/* eslint-disable no-use-before-define */
/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */

import * as contentful from 'contentful';

let instance = null;

class EthanServices {
  constructor() {
    this.client = contentful.createClient({
      space: 'w1j59qz3nacc',
      accessToken:
        '5f17d0d58028f245cf2e3d2a2144f90c2a5e7afcbe246c28161921c2be4df156',
    });

    this.ad = [];
    this.adventure = [];
    this.event = [];
    this.question = [];
    this.visit = [];
    this.reject = [];
    this.init();

    if (!instance) {
      instance = this;
    }
    return instance;
  }

  init = () => {
  // async getDatas() {
    const list = ['ad', 'adventure', 'reject', 'event', 'question', 'visit'];

    for (let i = 0; i < list.length; i += 1) {
      this.client
        .getEntries({ content_type: list[i] })
        .then((datas) => {
          datas.items.forEach((item) => {
            const data = { id: item.sys.id, ...item.fields };
            this[list[i]].push(data);
          });
        })
        .catch(console.error);
    }
  }

  get = (step, profile) => {
    switch (step) {
      case 'ads':
        return this.getAds(profile);

      case 'visit':
        return this.getVisit(profile);

      case 'adventure':
        return this.getAdventure(profile);

      case 'question':
        return this.getQuestion(profile);

      case 'event':
        return this.getEvent(profile);

      case 'reject':
        return this.getReject(profile);

      default:
        return null;
    }
  };

  checkIfProfileMatch = (card, profile, step) => {
    if (
      (card[`${step}_status`] === 'all' || card[`${step}_status`] === profile.status.ref)
      && (card[`${step}_budget`] === 'all' || card[`${step}_budget`] === profile.budget.ref)
      && (card[`${step}_origin`] === 'all' || card[`${step}_origin`] === profile.origin.ref)
    ) {
      return card;
    }
    return false;
  }

  getAds = (profile) => {
    const filtered = this.ad.filter(
      item => item.ad_budget <= profile.budget.value,
    );
    const rand = getRandomArbitrary(0, filtered.length);
    const ad = filtered[rand];
    return ad;
  };

  getVisit = () => {
    const visitRand = getRandomArbitrary(0, this.visit.length);
    const rejectRand = getRandomArbitrary(0, this.reject.length);
    const visit = this.visit[visitRand];
    const reject = this.reject[rejectRand];
    const payload = {
      visit,
      reject,
    };
    // supprimer visit[rand] de this.visit
    // trier en fonction de agence ou particulier
    return payload;
  };

  getAdventure = (profile) => {
    const matchingAdventures = this.adventure.filter(element => this.checkIfProfileMatch(element, profile, 'adventure'));
    const rand = getRandomArbitrary(0, matchingAdventures.length);
    const payload = matchingAdventures[rand];
    return payload;
  };

  getQuestion = (profile) => {
    const matchingQuestions = this.question.filter(element => this.checkIfProfileMatch(element, profile, 'question'));
    const rand = getRandomArbitrary(0, matchingQuestions.length);
    const payload = matchingQuestions[rand];
    return payload;
  };

  getEvent = (profile) => {
    const matchingEvents = this.event.filter(element => this.checkIfProfileMatch(element, profile, 'event'));
    const rand = getRandomArbitrary(0, matchingEvents.length);
    const payload = matchingEvents[rand];
    return payload;
  };

  getReject = () => {
    const payload = 'depreciated';
    return payload;
  };

  removeData(field, id) {
    this[field] = this[field].filter(el => el.id !== id);
  }
}

export const EthanService = new EthanServices();

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * ((max - 1) - min) + min);
}
