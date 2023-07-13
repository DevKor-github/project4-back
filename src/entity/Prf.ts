import { EntitySchema } from 'typeorm';

interface Prf {
  id: string;
  name: string;
  prfpdfrom: string;
  prfpdto: string;
  price: string;
  runtime: string;
  dtguidance: string;
}

const prfSchema = new EntitySchema<Prf>({
  name: 'prf',
  tableName: 'prf',
  columns: {
    id: {
      type: 'varchar',
      length: 255,
      primary: true,
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