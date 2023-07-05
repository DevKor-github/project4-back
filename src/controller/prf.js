import * as prfService from '../service/prfService.js';

export const getPrfList = async (req, res, next) => {
	try {
		const prfList = await prfService.getPrfList();
		res.status(200).json(prfList);
	} catch (err) {
		next(err);
	}
};

export const fetchData = async (req, res) => {
	try {
	  await prfService.fetchData(); 
	  console.log("I'm in fetchData");
	  res.json({ message: 'Data fetched and saved successfully.'});
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ error: 'An error occurred' });
	}
  };
  