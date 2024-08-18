const cache = new Map();

export function getFromCache(key) {
  return cache.get(key);
}

export function setInCache(key, value, ttl = 60000) {
  cache.set(key, value);
  setTimeout(() => cache.delete(key), ttl);
}

export async function fetchWithCache(url, ttl = 60000) {
  const start = Date.now();
  const cachedResponse = getFromCache(url);
  if (cachedResponse) {
    console.log("----> Took " + (Date.now() - start)/1000);
    return cachedResponse;
  }

  const pacificTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: false
  }).format(new Date());

  const formattedTime = pacificTime.replace(/(\d+)\/(\d+)\/(\d+), (\d+)/, '$3-$1-$2-$4');

  const userAgent = `Demo Builder ${formattedTime}`;

  let requestUrl = url;
  if (!url.match(/\?/)) {
    requestUrl += "?";
  }
  requestUrl += "&timezone=" + Intl.DateTimeFormat().resolvedOptions().timeZone;
  requestUrl += "&_200=1";
  console.log("FetchWithCache", requestUrl);
  const response = await fetch(requestUrl, {
    headers: {
      'User-Agent': userAgent
    }
  });
  const data = await response.json();
  setInCache(url, data, ttl);
  console.log("----> Took Fresh " + (Date.now() - start)/1000);
  return data;
}
