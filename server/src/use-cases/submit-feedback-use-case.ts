import { MailAdapter } from "../adapters/mail.adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repositories";

export interface SubmitFeedbackUseCaseRequest { // Pertence a camada de dados
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbacksUseCase {
    
    constructor(
        private feedbacksRepository: FeedbacksRepository,
        private mailAdapter: MailAdapter
    ) {}


    async execute(request: SubmitFeedbackUseCaseRequest): Promise<void> {
        const {type, comment, screenshot} = request;

        if (!type) {
            throw new Error('Type is required.')
        }

        if (!comment) {
            throw new Error('Comment is required.')
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbacksRepository.create({
            type,
            comment,
            screenshot
        });

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif, font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`
            ].join('\n') // Faz a quebra de linha entre cada elemento
        });
    }
}