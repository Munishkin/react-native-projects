import moment from 'moment';

export default timeToHuman = time => {
  return moment.utc(time).format('HH:mm:ss');
}
