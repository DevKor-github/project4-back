import { EntitySchema } from "typeorm";

const prfDetailSchema = new EntitySchema({
  name: "prfDetail",
  tableName: "prfDetail",
  columns: {
    prfId: {
      type: "varchar",
      primary: true,
    },
    fcltyId: {
      type: "varchar",
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
    prfCast: { type: "varchar" },
    prfPrice: { type: "varchar" },
    prfGenre: { type: "varchar" },
    prfRuntime: { type: "varchar" },
  },
});

export default prfDetailSchema;
