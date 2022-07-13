const streaming_service_data = require('../seed_data/streaming_service_data')

exports.seed = function(knex) {
  return knex('streaming_service').del()
  .then(()=>{
    return knex('streaming_service').insert(streaming_service_data);
  })
};

// const movieData = require('../seed_data/movie-seed-data');
// const userData = require('../seed_data/user-seed-data');

// exports.seed = function (knex) {
//   return knex('movie').del()
//     .then(function () {
//       return knex('movie').insert(movieData);
//     })
//     .then(() => {
//       return knex('user').del();
//     })
//     .then(() => {
//       return knex('user').insert(userData);
//     });
// };