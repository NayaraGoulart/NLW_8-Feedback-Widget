import React, { useState } from 'react';
import { CloseButton } from '../CloseButton';
import bugImageUrl from '../../images/bug.svg';
import ideaImageUrl from '../../images/idea.svg';
import otherImageUrl from '../../images/other.svg';
import FeedbackTypeStep from './Steps/FeedbackTypeStep';
import FeedbackContentStep from './Steps/FeedbackContentStep';
import FeedbackSuccessStep from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            src: bugImageUrl,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            src: ideaImageUrl,
            alt: 'Imagem de uma lâmpada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            src: otherImageUrl,
            alt: 'Imagem de um balão de pensamento'
        }
    }
};

export type FeedbackType = keyof typeof feedbackTypes;

export const WidgetForm: React.FC = () => {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

    function handleRestartFeedback(): void {
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return (
        <div className='bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto'>
            {feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
            ) : (
                <>
                    {!feedbackType ? (
                        
                        <FeedbackTypeStep onFeedbackTypeChangedProps={setFeedbackType}/>
                    ) : (
                        <FeedbackContentStep
                            feedbackType={feedbackType}
                            onFeedbackRestartRequested={handleRestartFeedback}
                            onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                </>
            )}

            <footer className='text-xs text-neutral-400'>
                Feito com ♥ pela  <a className='underline underline-offset-2' href='https://rocketseat.com.br'>Rocketseat</a>
            </footer>
        </div>
    );
};
