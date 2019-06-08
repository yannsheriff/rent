const ping = ({ url, timeout }) => new Promise((resolve) => {
  const isOnline = () => resolve(true);
  const isOffline = () => resolve(false);

  const xhr = new XMLHttpRequest();

  xhr.onerror = isOffline;
  xhr.ontimeout = isOffline;
  xhr.onreadystatechange = () => {
    if (xhr.readyState === xhr.HEADERS_RECEIVED) {
      if (xhr.status) {
        isOnline();
      } else {
        isOffline();
      }
    }
  };

  xhr.open('HEAD', url);
  xhr.timeout = timeout;
  xhr.send();
});

export default ping;
