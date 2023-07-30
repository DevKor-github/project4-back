import dataSource from '../config/dataSource';
import prfService from './prfService';

const prfRepository = dataSource.getRepository('prf');

import callApi from '../config/callApi';

const prfUpdate = async () => {
  const prfData = await callApi("", "20230706", "20230730");

  prfData.forEach(async (prf: {mt20id:{_text: string,},}) => {
    const prfData_detail = await callApi(prf.mt20id._text, "20230706", "20230730");
    await prfService.insertPrf(prfData_detail);
  });
};

export default prfUpdate;