import fetch from 'node-fetch';
import ruserAgent from '../utils/userAgent.js';

const userAgent = ruserAgent();

const getDlink = async (
  shareid,
  uk,
  sign,
  timestamp,
  fs_id,
  cookie,
  jsToken,
  dpLogid
) => {
  try {
    const queryString = new URLSearchParams({
      app_id: '250528',
      web: '1',
      channel: 'dubox',
      clienttype: '0',
      jsToken: jsToken,
      'dp-logid': dpLogid,
      shareid,
      uk,
      sign,
      timestamp,
      primaryid: shareid,
      product: 'share',
      nozip: '0',
      fid_list: `[${fs_id}]`,
    }).toString();
    const url = `https://www.terabox.com/share/download?${queryString}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Cookie: cookie,
      },
    });
    const data = await res.json();
    if (data.errno !== 0) {
      throw {
        ...data,
      };
    }

    return {
      ok: true,
      dlink: data.dlink,
    };
  } catch (error) {
    return {
      ok: false,
      errno: error.errno,
      errmsg: error.errmsg,
      request_id: error.request_id,
    };
  }
};
const getUrlDownload = async (dlink, userAgent, cookie) => {
  try {
    const response = await fetch(dlink, {
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
        'sec-ch-ua':
          '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
        'Accept-Language': 'en-US,en;q=0.5',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        Cookie: cookie,
      },
    });
    if (!response.redirected) throw new Error('Failed get url download');
    return {
      ok: true,
      downloadLink: response.url,
    };
  } catch (error) {
    console.log(error);
  }
};

const getDownloadUrl = async (shareId, uk, sign, timestamp, fs_id) => {
  try {
    const jsToken =
      '311B9DA4E42D07A8CD4A8C1489CB7849E9AE8765B6F5CFBDF5D86A59C286708570566B58111DCB41458FD37DED09B6B9B19C477CA78865FCA7D024442C760DE5A366AB6D92B580093D28FDFB8BBA9A1F0DC814A3FB3DCB0966F54BE3B6AF49C3';
    const dplogid = '8916216141031424108';
    const cookies =
      'browserid=NUpyZednrjSz4n9nOQS4rn6fcT4Lqt2uoFlGyUoOtbr7W-iqyiPzrYz_-mM=; lang=en; TSID=oQg7kd3VUrBgaNlVyjK694xf8oJwng2A; __bid_n=18c0fc12089e2988634207; _ga=GA1.1.1709727695.1701156049; csrfToken=NZxIO5Afv_sfY1iEIKtK0RNH; ndut_fmt=79CA4094BA5B53E2A105EEBB4A431A6FB971B97629322B9B28C56D382B7EBF46; _ga_06ZNKL8C2E=GS1.1.1701422746.6.1.1701422771.35.0.0';
    const res = await getDlink(
      shareId,
      uk,
      sign,
      timestamp,
      fs_id,
      cookies,
      jsToken,
      dplogid
    );
    if (res.ok == true) {
      const { dlink } = res;
      const data = await getUrlDownload(dlink, userAgent, cookies);
      return data;
    } else {
      throw res;
    }
  } catch (error) {
    return error;
  }
};
export default getDownloadUrl;
