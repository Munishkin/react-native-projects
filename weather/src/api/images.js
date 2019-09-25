const images = {
  Clear: require('../../assets/clear.png'),
  Hail: require('../../assets/hail.png'),
  'Heavy Cloud': require('../../assets/heavy-cloud.png'),
  'Heavy Rain': require('../../assets/heavy-rain.png'),
  'Light Cloud': require('../../assets/light-cloud.png'),
  'Light Rain': require('../../assets/light-rain.png'),
  Showers: require('../../assets/showers.png'),
  Sleet: require('../../assets/sleet.png'),
  Snow: require('../../assets/snow.png'),
  Splash: require('../../assets/splash.png'),
  Thunder: require('../../assets/thunder.png')
};

export default weather => images[weather];
