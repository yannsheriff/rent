/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { Howl, Howler } from 'howler';
import { interaction, loop } from 'assets/sounds';
import { setTimeout } from 'timers';

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
    this.mainSound = new Howl({
      src: interaction.elevator,
      loop: true,
      volume: 0.1,
    });

    if (!instance) {
      instance = this;
    }
    return instance;
  }

  interaction(name, volume = false) {
    if (this[name]) {
      volume ? this[name].volume(volume).play() : this[name].play();
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

  playMainSound() {
    this.mainSound.play();
    this.mainSound.rate(1);
  }

  accelerateMainSound(value) {
    const acc = setInterval(() => {
      if (this.mainSound._rate <= value) {
        this.mainSound.rate(this.mainSound._rate + 0.05);
      } else {
        clearInterval(acc);
      }
    }, 600);
  }


  stopMainSound() {
    this.mainSound.fade(0.1, 0, 500);
    setTimeout(() => { this.mainSound.stop(); }, 500);
  }
}

export const MozartService = new MozartServices();


window.onblur = () => {
  MozartService.mainSound.pause();
};
