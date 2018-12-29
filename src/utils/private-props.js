const privateProps = new WeakMap();
const classPrivateProps = (key) => {
  if (!privateProps.has(key)) {
    privateProps.set(key, {});
  }

  return privateProps.get(key);
};

module.export = classPrivateProps;
