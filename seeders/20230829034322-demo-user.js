'use strict';

const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('User', [
			{
				id: uuidv4(),
				first_name: 'John',
				last_name: 'Doe',
				email: 'example@example.com',
				password: bcrypt.hashSync('passw0rd', 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
