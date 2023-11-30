import randUserAgent from 'rand-user-agent';

const userAgent = () => {
  try {
    return randUserAgent('desktop', 'mozilla', 'linux');
  } catch (error) {
    return new Error(`error when generating useragent : ${error}`);
  }
};
export default userAgent;
