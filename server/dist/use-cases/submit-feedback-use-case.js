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
exports.SubmitFeedbacksUseCase = void 0;
class SubmitFeedbacksUseCase {
    constructor(feedbacksRepository, mailAdapter) {
        this.feedbacksRepository = feedbacksRepository;
        this.mailAdapter = mailAdapter;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type, comment, screenshot } = request;
            if (!type) {
                throw new Error('Type is required.');
            }
            if (!comment) {
                throw new Error('Comment is required.');
            }
            if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
                throw new Error('Invalid screenshot format.');
            }
            yield this.feedbacksRepository.create({
                type,
                comment,
                screenshot
            });
            yield this.mailAdapter.sendMail({
                subject: 'Novo feedback',
                body: [
                    `<div style="font-family: sans-serif, font-size: 16px; color: #111;">`,
                    `<p>Tipo do feedback: ${type}</p>`,
                    `<p>Comentário: ${comment}</p>`,
                    screenshot ? `<img src=${screenshot} />` : '',
                    `</div>`
                ].join('\n') // Faz a quebra de linha entre cada elemento
            });
        });
    }
}
exports.SubmitFeedbacksUseCase = SubmitFeedbacksUseCase;
