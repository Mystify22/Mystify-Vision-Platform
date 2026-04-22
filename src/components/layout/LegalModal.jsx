import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
//hey

const LegalModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const content = {
    privacy: {
      title: "Privacy Policy",
      body: (
        <div className="space-y-4 text-gray-600">
          <p><strong>1. Information Collection:</strong> We collect only the data necessary to provide a deterministic, anonymous experience. We do not store personally identifiable information (PII) linked to your public reel inputs.</p>
          <p><strong>2. Usage:</strong> Your data is used exclusively to train our anti-bully AI models and to process your streak algorithms securely.</p>
          <p><strong>3. Third-Party Sharing:</strong> We never sell your data to third parties. We may share anonymized usage trends with server providers.</p>
          <p><strong>4. Security:</strong> All data is encrypted via industry-standard protocols at rest and in transit.</p>
        </div>
      )
    },
    terms: {
      title: "Terms of Service",
      body: (
        <div className="space-y-4 text-gray-600">
          <p><strong>1. Acceptance:</strong> By using Mystify, you agree to these Terms. If you do not agree, please do not use the platform.</p>
          <p><strong>2. User Conduct:</strong> You agree not to use the platform for harassment, bullying, or sharing illegal content. Our AI moderation will ban violators permanently.</p>
          <p><strong>3. Content Ownership:</strong> You retain ownership of the questions you post. Mystify retains a license to display and distribute this content within your Reel Simulator.</p>
          <p><strong>4. Disclaimer:</strong> The service is provided "as is" without any guarantees regarding uptime or viral reach.</p>
        </div>
      )
    }
  };

  const selectedContent = content[type] || content.privacy;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 max-h-[85vh] flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900">{selectedContent.title}</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 md:p-8 overflow-y-auto flex-1">
              {selectedContent.body}
              <p className="text-sm text-gray-400 mt-8 pt-8 border-t border-gray-100">
                Last updated: January 2026. Mystify operates under the jurisdiction of the global internet.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LegalModal;
