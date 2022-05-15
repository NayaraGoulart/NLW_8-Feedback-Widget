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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const submit_feedback_use_case_1 = require("./use-cases/submit-feedback-use-case");
const prisma_feedbacks_repository_1 = require("./repositories/prisma/prisma-feedbacks-repository");
const nodemailer_mail_adapter_1 = require("./adapters/nodemailer/nodemailer-mail.adapter");
exports.routes = express_1.default.Router();
exports.routes.post('/feedbacks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, comment, screenshot } = req.body;
    const prismaFeedbacksRepository = new prisma_feedbacks_repository_1.PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new nodemailer_mail_adapter_1.NodemailerMailAdapter();
    const submitFeedbacksUseCase = new submit_feedback_use_case_1.SubmitFeedbacksUseCase(prismaFeedbacksRepository, nodemailerMailAdapter);
    yield submitFeedbacksUseCase.execute({
        type,
        comment,
        screenshot
    });
    return res.status(201).send();
}));
