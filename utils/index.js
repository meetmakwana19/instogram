module.exports.randomSecureKey = () => {
  const length = 8;
  // const randomString = parseInt(Math.random() * Math.pow(10, 8)).toString
  //   const randomString = Math.floor(Math.random() * Math.pow(10, length));
  const randomString = Math.floor(Math.random() * 10 ** length);

  return `sma${randomString}`;
};
