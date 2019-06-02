/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { Howl, Howler } from 'howler';
import { interaction, loop } from 'assets/sounds';

let instance = null;

class MozartServices {
  constructor() {
    const names = Object.keys(interaction);
    names.forEach((element) => {
      this[element] = new Howl({
        src: [interaction[element]],
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
      console.error(`The sound ${name} doesn't exist maybe it's a typo ;)`);
      console.error('If you want to add a sound put it in assets sounds and call is name');
    }
  }

  loopSound = name => new Howl({
    src: [loop[name]],
    loop: true,
    volume: 0.2,
  })
}

export const MozartService = new MozartServices();
