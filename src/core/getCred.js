import fetch from 'node-fetch';
import rUserAgent from '../utils/userAgent.js';

// const userAgent = rUserAgent();
const cookie =
  'browserid=NUpyZednrjSz4n9nOQS4rn6fcT4Lqt2uoFlGyUoOtbr7W-iqyiPzrYz_-mM=; lang=en; TSID=oQg7kd3VUrBgaNlVyjK694xf8oJwng2A; __bid_n=18c0fc12089e2988634207; _ga=GA1.1.1709727695.1701156049; csrfToken=NZxIO5Afv_sfY1iEIKtK0RNH; ndut_fmt=6E9F1F2BEA2F0285043D0CCE0ADCDBF950CFD407E9658D24AA4E4F9CB1603D9A; _ga_06ZNKL8C2E=GS1.1.1701419906.5.0.1701419910.56.0.0';
const headers = {
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'Accept-Language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6',
  Connection: 'keep-alive',
  Cookie: cookie,
  DNT: '1',
  Host: 'www.terabox.com',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
  'sec-ch-ua':
    '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
};
const findBetween = (str, start, end) => {
  const startIndex = str.indexOf(start) + start.length;
  const endIndex = str.indexOf(end, startIndex);
  return str.substring(startIndex, endIndex);
};
(async () => {
  try {
    const url = 'https://teraboxapp.com/s/1W8q0RUMGyI3Y_EkfRdPmaw';
    const res = await fetch(url, {
      method: 'GET',
      headers,
      credentials: 'include',
    });
    const data = await res.text();
    const jsToken = findBetween(data, 'fn%28%22', '%22%29');
    const logid = findBetween(data, 'dp-logid=', '&');
    console.log(jsToken);
    console.log(`\n`);
    console.log(logid);
  } catch (error) {
    console.log(error);
    return;
  }
})();
