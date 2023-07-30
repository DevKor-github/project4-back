import dataSource from '../config/dataSource';
import {Prf} from '../entity/Prf';
const prfService = {
  insertPrf: async (prf: Prf) => {
    const new_prf = await dataSource.manager.create(Prf, prf);
    await dataSource.manager.save(new_prf);
  },

  getPrfList: async () => {
    try {
      const prfList = await dataSource.manager.find(Prf);
      return prfList;
    } catch (err) {
      console.error(err);
    }
  },
};


export default prfService;