module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-css-modules'],
  rules: {
    'media-feature-range-notation': 'prefix',
    'selector-class-pattern': [
      '^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$|^cry.*$|^[a-z]+[a-zA-Z0-9]*$',
      {
        resolveNestedSelectors: true,
      },
      {
        message: (selector) => `Expected class selector "${selector}" to be camelCase`,
      },
    ],
    'value-keyword-case': null,
    'font-family-no-missing-generic-family-keyword': null,
  },
};
