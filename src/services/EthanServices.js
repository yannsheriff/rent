/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */

import * as contentful from 'contentful';

let instance = null;

const client = contentful.createClient({
  space: 'w1j59qz3nacc',
  accessToken:
      '5f17d0d58028f245cf2e3d2a2144f90c2a5e7afcbe246c28161921c2be4df156',
});

class EthanServices {
  constructor() {
    this.init();

    if (!instance) {
      instance = this;
    }
    return instance;
  }

  init = () => {
    client.getEntries({
      content_type: 'adventure',
    }).then((entries) => {
      entries.items.forEach((entry) => {
        if (entry.fields) {
          console.log(entry.fields);
        }
      });
    });
  }

    get = (step, profil) => {
      switch (step) {
        case 'ads':
          return this.getAds(profil);

        case 'visit':
          return this.getVisit(profil);

        case 'adventure':
          return this.getAdventure(profil);

        case 'reassessment':
          return this.getReassessment(profil);

        case 'event':
          return this.getEvent(profil);

        default:
          return 'ads';
      }
    }

    getAds = (profil) => {
      const use = profil;
      return [{ title: 'lourd' }, { title: 'bo' }];
    }

    getVisit = (profil) => {
      const use = profil;
      return {};
    }

    getAdventure = (profil) => {
      const use = profil;
      return {};
    }

    getReassessment = (profil) => {
      const use = profil;
      return {};
    }

    getEvent = (profil) => {
      const use = profil;
      return {};
    }
}

export const EthanService = new EthanServices();
