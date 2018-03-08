const p = r => r;
const compose = (s = []) => (c, n) => {
  const r = i => (s[i] ? s[i] : i === s.length && n ? n : p)(c, () => r(i + 1));
  return r(0);
};
module.exports = compose;
