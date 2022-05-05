export interface FeedbackCreateData { // Pertence a camada de aplicação
    type: string;
    comment: string;
    screenshot?: string;
}

export interface FeedbacksRepository {
    create: (data: FeedbackCreateData) => Promise<void>;
}