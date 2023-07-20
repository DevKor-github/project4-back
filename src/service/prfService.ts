import dataSource from '../config/dataSource.js';
import { LessThanOrEqual, MoreThanOrEqual, Like } from 'typeorm';

const prfRepository = dataSource.getRepository('prf');

export const getPrfList = async () => {
    try {
        const prfList = await prfRepository.find();
        return prfList;
    } catch (error) {
        console.error(error);
    }
};

interface SearchParams {
    prfSdate: Date;
    prfEdate: Date;
    prfName: string;
    prfStage: string;
}

export const searchPrf = async (
    { prfSdate, prfEdate, prfName, prfStage }: SearchParams) => {
    try {
        const data = await prfRepository.find({
            where: {
                prfSdate: MoreThanOrEqual(prfSdate),
                prfEdate: LessThanOrEqual(prfEdate),
                prfName: Like(`%${prfName}%`),
                prfStage: Like(`%${prfStage}%`),
            },
        });

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};