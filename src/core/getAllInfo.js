import axios from 'axios';
import fetch from 'node-fetch';

const getInfoRecursive = async (shortUrl, dir = '', root = 0, cookie) => {
  try {
    const queryString = new URLSearchParams({
      app_id: '250528',
      shorturl: shortUrl.slice(1),
      root,
      dir,
    }).toString();
    const r = await fetch(`https://www.terabox.com/share/list?${queryString}`, {
      method: 'GET',
      headers: {
        Cookie: cookie,
      },
    });
    const data = await r.json();
    const childrenPromises = data.list.map(async (e) => ({
      category: e.category,
      fs_id: e.fs_id,
      is_dir: e.isdir,
      size: e.size,
      filename: e.server_filename,
      create_time: e.server_ctime,
      children: e.isdir
        ? await getInfoRecursive(shortUrl, e.path, '0', cookie)
        : undefined,
    }));
    const children = await Promise.all(childrenPromises);
    return children;
  } catch (error) {
    console.log(`Error when get Info Recursive : ${error}`);
  }
};

const getAllInfo = async (url, pwd) => {
  try {
    console.log(`Extracting info from url`);
    const trimmedUrl = url.trimEnd('/');
    const shortUrl = trimmedUrl.split('/').pop();
    let cookie = '';
    if (pwd) {
      cookie = await getCookie(shortUrl, pwd);
    }
    const queryString = new URLSearchParams({
      app_id: '250528',
      shorturl: shortUrl,
      root: '1',
    }).toString();
    const req = await fetch(
      `https://www.terabox.com/api/shorturlinfo?${queryString}`,
      {
        method: 'GET',
        headers: {
          Cookie: cookie,
        },
      }
    );
    const data = await req.json();
    if (data.errno != 0) throw new Error('Failed to get Data');
    const listPromises = data.list.map(async (e) => ({
      category: e.category,
      fs_id: e.fs_id,
      is_dir: e.isdir,
      size: e.size,
      filename: e.server_filename,
      create_time: e.server_ctime,
      children: e.isdir
        ? await getInfoRecursive(shortUrl, e.path, '0', cookie)
        : undefined,
    }));
    const list = await Promise.all(listPromises);
    const final = {
      ok: true,
      shareid: data.shareid,
      uk: data.uk,
      sign: data.sign,
      timestamp: data.timestamp,
      list: list,
    };
    return final;
  } catch (error) {
    console.log(`Error when getInfo : ${error}`);
  }
};
const getCookie = async (shortUrl, pwd) => {
  try {
    const queryString = new URLSearchParams({
      app_id: '250528',
      surl: shortUrl.slice(1),
    }).toString();
    const res = await fetch(
      'https://www.terabox.com/share/verify?' + queryString,
      {
        method: 'POST',
        body: new URLSearchParams({ pwd }),
      }
    );
    const response = await res.json();
    if (response.errno != 0) throw new Error('Wrong password');
    return res.headers['set-cookie']?.split(' ')[0] || '';
  } catch (error) {
    console.log(`ERROR WHEN GET COOKIE : ${error}`);
  }
};
export default getAllInfo;
