import dataSource from '../config/dataSource';

const prfRepository = dataSource.getRepository('prf');
const prfService: any = {
  insertPrf: async (prf: any): Promise<void> => {
    const id: string = prf.mt20id._text;
    const name: string = prf.prfnm._text;
    const prfpdfrom: string = prf.prfpdfrom._text;
    const prfpdto: string = prf.prfpdto._text;
    const price: string = prf.pcseguidance._text;
    const runtime: string = prf.prfruntime._text;
    const dtguidance: string = prf.dtguidance._text;

    if (await prfRepository.findOne({ where: { id: id } })) {
      // 이미 저장되어 있으면 업데이트
      await prfRepository.update(
        { id },
        {
          id,
          name,
          prfpdfrom,
          prfpdto,
          price,
          runtime,
          dtguidance,
        }
      );
    } else {
      await prfRepository.insert({
        id,
        name,
        prfpdfrom,
        prfpdto,
        price,
        runtime,
        dtguidance,
      });
    }
  },

  getPrfList: async (): Promise<any> => {
    try {
      const prfList = await prfRepository.find();
      return prfList;
    } catch (err) {
      console.error(err);
    }
  },
};


export default prfService;