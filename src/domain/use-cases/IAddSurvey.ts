import { ISurveyAnswerModel } from '../models/ISurveyModel';

export interface IAddSurveyModel {
    question: string;
    answers: ISurveyAnswerModel[];
    date: Date;
}

export interface IAddSurvey {
    add(data: IAddSurveyModel): Promise<void>;
}
