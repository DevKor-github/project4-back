import { EntitySchema } from 'typeorm';

const prfSchema = new EntitySchema({
	name: 'prf',
	tableName: 'prf',
	columns: {
		mt20id: {
			type: 'varchar',
			length: 20,
			primary: true,
		},
		mt10id: {
			type: 'varchar',
			length: 20,
		},
		prfnm: {
			type: 'varchar',
			length: 100,
		},
		prfpdfrom: {
			type: 'date',
		},
		prfpdto: {
			type: 'date',
		},
		fcltynm: {
			type: 'varchar',
			length: 100,
		},
		prfcast: {
			type: 'varchar',
			array: true,
			nullable: true,
		},
		prfcrew: {
			type: 'varchar',
			length: 100,
			nullable: true,
		},
		prfruntime: {
			type: 'varchar',
			length: 20,
		},
		prfage: {
			type: 'varchar',
			length: 20,
		},
		entrpsnm: {
			type: 'varchar',
			length: 100,
		},
		pcseguidance: {
			type: 'varchar',
			length: 100,
		},
		poster: {
			type: 'varchar',
			length: 200,
		},
		sty: {
			type: 'varchar',
			array: true,
			nullable: true,
		},
		genrenm: {
			type: 'varchar',
			length: 50,
		},
		prfstate: {
			type: 'enum',
			enum: ['공연중', '예정', '종료'],
			default: '공연중',
		},
		openrun: {
			type: 'varchar',
			length: 10,
		},
		styurls: {
			type: 'varchar',
			array: true,
			nullable: true,
		},
		dtguidance: {
			type: 'varchar',
			length: 100,
		},
	},
});

export default prfSchema;