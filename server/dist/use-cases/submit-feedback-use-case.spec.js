"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const submit_feedback_use_case_1 = require("./submit-feedback-use-case");
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedback = new submit_feedback_use_case_1.SubmitFeedbacksUseCase({ create: () => __awaiter(void 0, void 0, void 0, function* () { }) }, { sendMail: () => __awaiter(void 0, void 0, void 0, function* () { }) });
describe('Submit feedback', () => {
    it('Should be able to submit a feedback', () => __awaiter(void 0, void 0, void 0, function* () {
        const submitFeedback = new submit_feedback_use_case_1.SubmitFeedbacksUseCase(
        // { create: async () => {} }, // Sem spy
        // { sendMail: async () => {} },
        { create: createFeedbackSpy }, // Com spy
        { sendMail: sendMailSpy });
        yield expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64'
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    }));
    it('Should not be able to submit a feedback without a type', () => __awaiter(void 0, void 0, void 0, function* () {
        const submitFeedback = new submit_feedback_use_case_1.SubmitFeedbacksUseCase({ create: () => __awaiter(void 0, void 0, void 0, function* () { }) }, { sendMail: () => __awaiter(void 0, void 0, void 0, function* () { }) });
        yield expect(submitFeedback.execute({
            type: '',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow();
    }));
    it('Should not be able to submit a feedback without a comment', () => __awaiter(void 0, void 0, void 0, function* () {
        const submitFeedback = new submit_feedback_use_case_1.SubmitFeedbacksUseCase({ create: () => __awaiter(void 0, void 0, void 0, function* () { }) }, { sendMail: () => __awaiter(void 0, void 0, void 0, function* () { }) });
        yield expect(submitFeedback.execute({
            type: 'Example',
            comment: '',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow();
    }));
    it('Should not be able to submit a feedback with an invalid screenshot', () => __awaiter(void 0, void 0, void 0, function* () {
        const submitFeedback = new submit_feedback_use_case_1.SubmitFeedbacksUseCase({ create: () => __awaiter(void 0, void 0, void 0, function* () { }) }, { sendMail: () => __awaiter(void 0, void 0, void 0, function* () { }) });
        yield expect(submitFeedback.execute({
            type: 'Example',
            comment: 'Example',
            screenshot: 'test.jpg'
        })).rejects.toThrow();
    }));
});
