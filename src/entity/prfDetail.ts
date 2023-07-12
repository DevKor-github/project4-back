import { EntitySchema } from "typeorm";

//공연 상세 schema
const prfDetailSchema: any = new EntitySchema({
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
    prfRuntime: { type: "varchar" },
    prfAge: { type: "varchar" },
    prfPrice: { type: "varchar" },
    prfGenre: { type: "varchar" },
    prfState: { type: "varchar" },
    prfPoster: { type: "varchar" },
  },
});

export default prfDetailSchema;
