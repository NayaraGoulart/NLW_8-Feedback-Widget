import React, { FormEvent, useState } from 'react';
import { ArrowLeft, Camera } from 'phosphor-react';
import { FeedbackType, feedbackTypes } from '..';
import { CloseButton } from '../../CloseButton';
import ScreenshotButton from '../ScreenshotButton';

interface FeedbackContentStepProps {
    feedbackType: FeedbackType;
    onFeedbackSent: () => void;
    onFeedbackRestartRequested: () => void;
}

const FeedbackContentStep: React.FC<FeedbackContentStepProps> = ({
    feedbackType,
    onFeedbackSent,
    onFeedbackRestartRequested
}: FeedbackContentStepProps) => {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState<string >('');
    const feedbackTypeInfo = feedbackTypes[feedbackType];

    function handleSubmitFeedback(event: FormEvent): void {
        event.preventDefault();
        console.log({
            screenshot,
            comment
        });
        onFeedbackSent();
    }

    return (
        <>
            <header>
                <button
                    onClick={onFeedbackRestartRequested}
                    type='button'
                    className='absolute top-5 left-5 text-zinc-400 hover:text-zinc-100'>
                    <ArrowLeft weight='bold' className='w-4 h-5' />
                </button>
                <span className='text-xl leading-6 flex items-center gap-2'>
                    <img className='w-6 h-6' src={feedbackTypeInfo?.image?.src} alt={feedbackTypeInfo?.image?.alt} />
                    {feedbackTypeInfo?.title}
                </span>
                <CloseButton />
            </header>
            <form onSubmit={handleSubmitFeedback} className='my-4 w-full'>
                <textarea
                    className='min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
                    placeholder='Conte com detalhes o que está acontecendo'
                    onChange={(event) => setComment(event.target.value)}
                />
                
                <footer className='flex gap-2 mt-2'>
                    <ScreenshotButton onScreenshotTook={setScreenshot} screenshot={screenshot}/>
                    <button
                        type='submit'
                        className='w-full p-2 bg-brand-500 rounded-md border-transparent flex flex-1 justify-center items-center text-sm hover:bg-brand-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500'
                        disabled={comment.length === 0}
                    >
                        Enviar feeback
                    </button>
                </footer>
            </form>
        </>
    );
};

export default FeedbackContentStep;