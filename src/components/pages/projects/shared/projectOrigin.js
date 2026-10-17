export function projectOrigin(location) {
  return {
    pathname: location.pathname,
    search: location.search,
    hash: location.hash,
    state: location.state,
    createdAt: Date.now(),
  };
}

