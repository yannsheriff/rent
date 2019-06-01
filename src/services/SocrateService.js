/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import axios from 'axios';

let instance = null;

class SocrateServices {
  constructor() {
    this.apiUrl = 'http://vps.yannischerif.com:4000/api';
    // this.apiUrl = 'http://localhost:4000/api';

    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async saveChoice(card, choice) {
    const Url = `${this.apiUrl}/card/${card.id}`;
    const response = await axios({
      crossdomain: true,
      method: 'post',
      url: Url,
      data: {
        choose: choice,
      },
    });
    console.log(response);
  }

  async sendRecap(time, isVictory, totalFlat, Skills) {
    const Url = `${this.apiUrl}/game`;
    if (
      time
      && isVictory !== undefined
      && totalFlat
      && Skills
    ) {
      const response = await axios({
        crossdomain: true,
        method: 'post',
        url: Url,
        data: {
          time: Math.round(time),
          win: isVictory,
          totalFlat,
          skills: Skills,
        },
      });

      console.log(response);
    }
  }

  async getGeneralRecap() {
    const Url = `${this.apiUrl}/game/recap`;
    const response = await axios({
      method: 'get',
      url: Url,
    });

    return response;
  }

  async getCardStat(id) {
    const Url = `${this.apiUrl}/card/${id}`;
    const response = await axios({
      method: 'get',
      url: Url,
    });

    return response;
  }
}

export const SocrateService = new SocrateServices();
