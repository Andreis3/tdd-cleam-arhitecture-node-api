import MockDate from 'mockdate';

import { DbSaveSurveyResult } from '@/data/use-cases/save-survey-result/DbSaveSurveyResult';
import { ISurveyResultModel } from '@/domain/models/survey-result/ISurveyResultModel';
import { ISaveSurveyResultModel } from '@/domain/use-cases/survey-result/ISaveSurveyResult';
import { ISaveSurveyResultRepository } from '@/data/protocols/db/survey/ISaveSurveyResultRepository';

const makeSaveSurveyResultData = (): ISaveSurveyResultModel => ({
    accountId: 'any_account_id',
    surveyId: 'any_survey_id',
    answer: 'any_answer',
    date: new Date(),
});

const makeSaveSurveyResult = (): ISurveyResultModel =>
    Object.assign({}, makeSaveSurveyResultData(), {
        id: 'any_id',
    });

interface ISutTypes {
    sut: DbSaveSurveyResult;
    saveSurveyResultRepositoryStub: ISaveSurveyResultRepository;
}

const makeSaveResultSurveyRepository = (): ISaveSurveyResultRepository => {
    class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
        async save(data: ISaveSurveyResultModel): Promise<ISurveyResultModel> {
            return new Promise(resolve => resolve(makeSaveSurveyResult()));
        }
    }
    return new SaveSurveyResultRepositoryStub();
};

const makeSut = (): ISutTypes => {
    const saveSurveyResultRepositoryStub = makeSaveResultSurveyRepository();
    const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);
    return {
        sut,
        saveSurveyResultRepositoryStub,
    };
};

describe('DbSaveSurveyResult Usecase', () => {
    beforeAll(() => {
        MockDate.set(new Date());
    });

    afterAll(() => {
        MockDate.reset();
    });

    test('Should call SaveSurveyResultRepository with correct values', async () => {
        const { sut, saveSurveyResultRepositoryStub } = makeSut();
        const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
        const surveyData = makeSaveSurveyResultData();
        await sut.save(surveyData);

        expect(saveSpy).toHaveBeenCalledWith(surveyData);
    });

    test('Should throw if SaveSurveyResultRepository throws', async () => {
        const { sut, saveSurveyResultRepositoryStub } = makeSut();
        jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockResolvedValue(
            new Promise((resolve, reject) => reject(new Error())),
        );
        const promise = sut.save(makeSaveSurveyResultData());
        await expect(promise).rejects.toThrow();
    });

    test('Should return SaveSurveyResult on success', async () => {
        const { sut } = makeSut();
        const surveyResult = await sut.save(makeSaveSurveyResultData());
        expect(surveyResult).toEqual(makeSaveSurveyResult());
    });
});
