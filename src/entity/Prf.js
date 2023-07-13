import {EntitySchema} from 'typeorm';

const prfSchema = new EntitySchema({
	name: 'prf',
	tableName: 'prf',
	columns: {
		prfId: {
		  type: "varchar",
		  primary: true,
		},
		prfName: {
		  type: "varchar",
		},
		prfSdate: {
		  type: "date",
		},
		prfEdate: {
		  type: "date",
		}, 
		prfStage: { type: "varchar" },
		prfGenre: { type: "varchar" },
	  },
});

export default prfSchema;
