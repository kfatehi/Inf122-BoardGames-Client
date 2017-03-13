export function session() {
  const DEFAULT_SERVER = "ws://localhost:4567/games";
  return {
    getServer: () => sessionStorage.getItem("PROXY_TARGET") || DEFAULT_SERVER,
    getUsername: () => sessionStorage.getItem("USERNAME") || '',
    setServer: (val) => sessionStorage.setItem("PROXY_TARGET", val),
    setUsername: (val) => sessionStorage.setItem("USERNAME", val)
  }
}

export function getImagePath(imagePath) {
  if (imagePath[0] === '/') {
    // it's a relative path. reuse the websocket host
    let url = new URL(session().getServer())
    url.protocol = "http:";
    url.pathname = imagePath;
    return url.toString();
  } else {
    return imagePath;
  }
}
