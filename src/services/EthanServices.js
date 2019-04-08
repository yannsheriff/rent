/* eslint-disable import/prefer-default-export */
/* eslint-disable */

import * as contentful from "contentful";

let instance = null;

let client = contentful.createClient({
  space: "w1j59qz3nacc",
  accessToken:
    "5f17d0d58028f245cf2e3d2a2144f90c2a5e7afcbe246c28161921c2be4df156"
});

class EthanServices {
  constructor() {
    this.init()

    if (!instance) {
      instance = this;
    }
    return instance;
  }

  init = () => {
    client.getEntries({
      'content_type': 'adventure'
    }).then(entries => {
      entries.items.forEach(entry => {
        if (entry.fields) {
          console.log(entry.fields);
        }
      });
    });
  }

  async get(itemKey) {}
}

export const storeService = new EthanServices();
