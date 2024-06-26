import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardProps {
    summary: string;
    keyData: string;
    insights: string;
}

const Card: React.FC<CardProps> = ({ summary, keyData, insights }) => {
    const [activeTab, setActiveTab] = useState<'summary' | 'keyPhrases' | 'insights'>('summary');

    const keyPhrases = keyData.split(",").map((phrase) => phrase.trim());

    const tabVariants = {
        inactive: { opacity: 0.6, y: 5 },
        active: { opacity: 1, y: 0 },
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className={`max-w-4xl mx-auto p-6 ${summary ? '' : 'hidden'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                <div className="flex justify-around p-4 bg-gray-100 dark:bg-gray-700">
                    {(['summary', 'keyPhrases', 'insights'] as const).map((tab) => (
                        <motion.button
                            key={tab}
                            className={`px-4 py-2 rounded-lg font-medium ${
                                activeTab === tab 
                                    ? 'bg-blue-500 text-white' 
                                    : 'text-gray-700 dark:text-gray-300'
                            }`}
                            onClick={() => setActiveTab(tab)}
                            variants={tabVariants}
                            initial="inactive"
                            animate={activeTab === tab ? "active" : "inactive"}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </motion.button>
                    ))}
                </div>
                <div className="p-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === 'summary' && (
                                <div className="prose dark:prose-invert max-w-none">
                                    <h2 className="text-2xl font-bold mb-4">Summary</h2>
                                    <p>{summary}</p>
                                </div>
                            )}
                            {activeTab === 'keyPhrases' && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Key Phrases</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {keyPhrases.map((phrase, index) => (
                                            <motion.span
                                                key={index}
                                                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                {phrase}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {activeTab === 'insights' && (
                                <div className="prose dark:prose-invert max-w-none">
                                    <h2 className="text-2xl font-bold mb-4">Insights</h2>
                                    <p>{insights}</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default Card;