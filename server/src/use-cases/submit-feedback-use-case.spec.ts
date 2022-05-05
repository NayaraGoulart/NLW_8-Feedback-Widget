import { SubmitFeedbacksUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbacksUseCase(
    { create: async () => {} },
    { sendMail: async () => {} },
);

describe('Submit feedback', () => {
    it('Should be able to submit a feedback', async () => {
        const submitFeedback = new SubmitFeedbacksUseCase(
            // { create: async () => {} }, // Sem spy
            // { sendMail: async () => {} },
            { create: createFeedbackSpy }, // Com spy
            { sendMail: sendMailSpy },
        );
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('Should not be able to submit a feedback without a type', async () => {
        const submitFeedback = new SubmitFeedbacksUseCase(
            { create: async () => {} },
            { sendMail: async () => {} },
        );
        await expect(submitFeedback.execute({
            type: '',
            comment: 'Example comment',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow();
    });

    it('Should not be able to submit a feedback without a comment', async () => {
        const submitFeedback = new SubmitFeedbacksUseCase(
            { create: async () => {} },
            { sendMail: async () => {} },
        );
        await expect(submitFeedback.execute({
            type: 'Example',
            comment: '',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow();
    });

    it('Should not be able to submit a feedback with an invalid screenshot', async () => {
        const submitFeedback = new SubmitFeedbacksUseCase(
            { create: async () => {} },
            { sendMail: async () => {} },
        );
        await expect(submitFeedback.execute({
            type: 'Example',
            comment: 'Example',
            screenshot: 'test.jpg'
        })).rejects.toThrow();
    });

});