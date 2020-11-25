const fetch = require('node-fetch');
const lab = require('./flightUtils');
const { longestFlights } = require('./flightUtils');

let obj = {};
const data = [];
const rd = [];
console.time('Time');

const getAir = fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat')
  .then(res => res.text())
  .then(d => lab.fileDataToObj(d))
  .then(o => { obj = o; });

const getRoutes = fetch('https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat')
  .then(res => res.text())
  .then(d => ({
    src: lab.fileDataToArray(d).map(item => item[3]),
    des: lab.fileDataToArray(d).map(item => item[5]),
  }));

Promise.all([getRoutes, getAir])
  .then(([routes]) => {
    routes.src.forEach((e, i) => {
      const srcAirport = obj.find(m => m.id === e);
      const desAirport = obj.find(m => m.id === routes.des[i]);
      if (srcAirport && desAirport) {
        data.push({
          src: srcAirport,
          des: desAirport,
        });
      }
    });
    return data;
  })
  .then(r => {
    r.forEach(e => {
      rd.push(
        {
          distance: lab.getDistance(e.src.long, e.src.lat, e.des.long, e.des.lat),
          from: e.src.name,
          to: e.des.name,
        },
      );
    });
    return rd;
  })
  .then(p => console.log(longestFlights(p)))
  .then(() => console.timeEnd('Time'))
  .catch(e => console.error(e));
