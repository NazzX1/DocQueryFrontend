import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: 'What is DocQuery?',
    answer: 'DocQuery is an AI-powered platform that helps you interact with, summarize, and manage your PDF documents.',
  },
  {
    question: 'How do I use the Chat with Documents feature?',
    answer: 'Upload your PDF or text documents and start a chat to ask questions and extract key insights from the content.',
  },
  {
    question: 'Is my data secure with DocQuery?',
    answer: 'Absolutely. DocQuery is GDPR compliant, ensuring the highest standards of data security and privacy.',
  }
];

const About = () => {
  return (
    <div className="flex w-full max-w-[812px] flex-col gap-10 pt-40 mobile:max-w-full">
      <div className="px-24">
        <div className="space-y-8">
          {faqData.map((item, index) => (
            <div key={index} className="flex flex-col gap-4">
              {/* Question Bubble with Intersection Observer */}
              <QuestionBubble question={item.question} index={index} />

              {/* Answer Bubble with Intersection Observer */}
              <AnswerBubble answer={item.answer} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface QuestionBubbleProps {
  question: string;
  index: number;
}

const QuestionBubble: React.FC<QuestionBubbleProps> = ({ question, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // Trigger when 50% of the element is in view
  });

  return (
    <motion.div
      ref={ref}
      className="flex justify-start"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -40 }}
      exit={{ opacity: 0, x: -40 }} // Added exit animation
      transition={{ duration: 1.2, delay: 0.3 * index }}
    >
      <div className="max-w-[70%] p-4 bg-blue-500 text-white rounded-lg shadow-md">
        <p>{question}</p>
      </div>
    </motion.div>
  );
};

interface AnswerBubbleProps {
  answer: string;
  index: number;
}

const AnswerBubble: React.FC<AnswerBubbleProps> = ({ answer, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      className="flex justify-end"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 40 }}
      exit={{ opacity: 0, x: 40 }} // Added exit animation
      transition={{ duration: 1.2, delay: 0.3 * index + 0.2 }}
    >
      <div className="max-w-[70%] p-4 bg-gray-100 text-black rounded-lg shadow-md">
        <p>{answer}</p>
      </div>
    </motion.div>
  );
};

export default About;
