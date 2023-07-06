import dataSource from '../config/dataSource.js';
import prfService from './prfService.js';

const prfRepository = dataSource.getRepository('prf');


import callApi from '../config/callApi.js';

const prfUpdate = async() => {
   const prfData = await callApi("", "20230706", "20230730");// 아이디를 얻어오기 위한 호출

   prfData.forEach(async (prf) => {
        const prfData_detail = await callApi(prf.mt20id._text);// 아이디를 통해 모든 공연의 상세정보 호출
        await prfService.insertPrf(prfData_detail); // 집어넣기

   })

}

export default prfUpdate;