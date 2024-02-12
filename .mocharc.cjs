module.exports = {
  extension: ["js"],
  spec: ['tests/api/**/*.spec.js'],
  timeout: '10000',
  reporter: 'mochawesome',
  'reporter-options': [
    'reportDir=report',
  ],
}