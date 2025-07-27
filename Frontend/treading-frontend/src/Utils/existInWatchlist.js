export const existInWatchlist = (items, coin) => {
  if (!Array.isArray(items) || !coin) return false;

  return items.some((item) => item?.id === coin?.id);
};
