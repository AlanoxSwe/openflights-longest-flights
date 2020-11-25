const fileDataToArray = data => data
  .toString()
  .split('\n')
  .filter(r => r !== '')
  .map(r => r.split(','));

const fileDataToObj = data => data
  .toString()
  .split('\n')
  .filter(r => r !== '')
  .map(r => r.split(','))
  .map(a => ({
    id: a[0],
    long: a[6],
    lat: a[7],
    name: a[1],
  }));

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
    + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2))
    * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}
function compareDistance(a, b) {
  // a should come before b in the sorted order
  if (a.distance > b.distance) {
    return -1;
  // a should come after b in the sorted order
  } if (a.distance < b.distance) {
    return 1;
  // a and b are the same
  }
  return 0;
}

function longestFlights(arr) {
  return arr.sort(compareDistance).slice(0, 10);
  // const uniq = [...new Set(arr)]; // Remove dupes
  // return sort(uniq).desc().slice(0, 10);
}

module.exports = {
  fileDataToArray, fileDataToObj, getDistance, longestFlights, compareDistance,
};
