import * as prfService from '../service/prfService.js';
import * as prfUpdate from '../service/prfUpdate.js';

export const getPrfList = async (req, res, next) => {
	try {
		const prfList = await prfService.getPrfList();
		res.status(200).json(prfList);
	} catch (error) {
		next(error);
	}
};

export const updateDB = async (req, res, next) => {
	try {
		await prfUpdate.updateDB();
	} catch (error) {
		next(error);
	}
}

export const searchPrf = async (req, res, next) => {
	try {
	  const prfName = req.query.prfName || "";
	  const prfSdate = new Date(req.query.prfSdate || "2000-01-01");
	  const prfEdate = new Date(req.query.prfEdate || "2099-12-31");
	  const prfStage = req.query.prfStage|| "";
	  const prfList = await prfService.searchPrf({
		prfName,
		prfSdate,
		prfEdate,
		prfStage
	});
	  res.status(200).json(prfList);
	} catch (err) {
	  next(err);
	}
}