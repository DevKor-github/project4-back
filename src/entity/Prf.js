import { EntitySchema } from "typeorm";

const prfSchema = new EntitySchema({
  name: "prf",
  tableName: "prf",
  columns: {
    prfId: {
      type: "varchar",
      primary: true,
    },
    prfName: {
      type: "varchar",
    },
    prfPeriodFrom: {
      type: "date",
    },
    prfPeriodTo: {
      type: "date",
    }, //mt20Id=PF220055
    fcltyName: { type: "varchar" },
    prfGenre: { type: "varchar" },
  },
});

export default prfSchema;
