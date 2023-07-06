import {EntitySchema} from 'typeorm';

const prfSchema = new EntitySchema({
	name: 'prf',
	tableName: 'prf',
	columns: {
		id: {
			type: 'varchar',
			length: 255,
		},
		name: {
			type: 'varchar',
			length: 255,
		},
		prfpdfrom: {
			type: 'varchar',
			length: 255,
		},
		prfpdto: {
			type: 'varchar',
			length: 255,
		},
		price: {
			type: 'varchar',
			length: 255,
		},
		runtime: {
			type: 'varchar',
			length: 255,
		},
		dtguidance: {
			type: 'varchar',
			length: 255,
		},

	},
});

export default prfSchema;
