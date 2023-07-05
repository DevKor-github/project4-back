import { EntitySchema } from "typeorm";

//공연 목록에서 노출되는 공연 정보 schema

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
