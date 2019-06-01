/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { Howl, Howler } from 'howler';
import sounds from 'assets/sounds';

let instance = null;

class MozartServices {
  constructor() {
    const names = Object.keys(sounds);
    names.forEach((element) => {
      this[element] = new Howl({
        src: [sounds[element]],
      });
    });

    Howler.volume(0.5);

    if (!instance) {
      instance = this;
    }
    return instance;
  }

  interaction(name) {
    if (this[name]) {
      this[name].play();
    } else {
      throw new Error(`The sound ${name} doesn't exist maybe it's a typo ;)`);
    }
  }
}

export const MozartService = new MozartServices();
