/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import axios from 'axios';

let instance = null;

class SocrateServices {
  constructor() {
    this.apiUrl = 'http://localhost:4000/api';

    if (!instance) {
      instance = this;
    }
    return instance;
  }

  // DELETE CARD THAT HAS BEEN ALREADY SEEN

  async sendRecap(time, isVictory, totalFlat, Skills) {
    const Url = `${this.apiUrl}/game`;
    // const send = await axios({
    //   crossdomain: true,
    //   method: 'post',
    //   url: Url,
    //   data: {
    //     time: 290,
    //     win: false,
    //     totalFlat: 3,
    //     skills: ['chance', 'mytho'],
    //   },
    // });

    const response = await axios({
      method: 'get',
      url: Url,
    });
    console.log(response);
  }
}

export const SocrateService = new SocrateServices();
