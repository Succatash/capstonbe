'use strict';
require('dotenv').config();
const bcrypt = require('bcrypt');
const {Model} = require('sequelize');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 *
		 *
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}

	User.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUID4,
				allowNull: false,
			},
			firstName: {
				type: DataTypes.STRING(35),
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING(40),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
				  isEmail: {
					msg: "Must be a valid email address",
				  },
			},
		},
			password: {
				type: DataTypes.STRING(100, false),
				allowNull: false,
			},
		},

		{
			sequelize,
			modelName: 'User',
			freezeTableName: true,
			omitNull: true,
			timeStamps: true,
			hooks: {
				beforeCreate: async function(user) {
					const salt = await bcrypt.genSalt(saltRounds);
					user.password = await bcrypt.hash(user.password, salt);
				}
			},
		}
	);

      User.prototype.validPassword = async (password,hash) => {
		const result = await bcrypt.compare(password, hash);
		  return result;
	};

	return User;
};
