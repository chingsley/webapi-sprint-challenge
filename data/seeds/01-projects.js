exports.seed = function(knex, Promise) {
  return knex('projects').insert([
    {
      name: 'Complete Node.js and Express Challenge',
      description:
        'Build an Awesome API Using Node.js and Express to Manage Projects and Actions GTD Style!',
    },
  ]);
};
