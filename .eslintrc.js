module.exports = {
  "extends": "airbnb-base",
  "plugins": [
    "mocha",
  ],
  "rules": {
    "mocha/no-exclusive-tests": "error",
    "no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "should|expect",
      },
    ],
  },
  "env": {
    "mocha": true,
  }
};
