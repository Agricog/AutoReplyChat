import { useEffect } from 'react';

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;700&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Crimson Pro', serif; }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="font-display text-2xl font-bold">
            <span className="text-amber-500">Auto</span>
            <span className="text-slate-100">ReplyChat</span>
          </a>
          <a 
            href="/" 
            className="text-slate-300 hover:text-amber-500 transition-colors text-sm font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="font-display text-5xl font-bold mb-4">Terms of Service</h1>
        <p className="text-slate-400 mb-12">Last updated: 7 February 2026</p>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">1. Agreement</h2>
            <p>By creating an account or using AutoReplyChat, you agree to these Terms of Service. AutoReplyChat is operated by Autaimate. If you do not agree to these terms, please do not use the service.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">2. Service Description</h2>
            <p>AutoReplyChat provides an AI-powered customer support chatbot platform. You can upload training content, customise a chat widget, and deploy it on your website to automatically respond to customer enquiries. The service uses Claude AI by Anthropic to generate responses based on your training content.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">3. Accounts</h2>
            <p className="mb-2">You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials and for all activity under your account.</p>
            <p>One account per person or business. We reserve the right to suspend or terminate accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">4. Free Trial</h2>
            <p>New accounts receive a 30-day free trial with full access to all features. At the end of the trial period, you will need to subscribe to a paid plan to continue using the service. We will notify you before your trial expires. If you do not subscribe, your account will be paused but your data will be retained for 90 days.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">5. Pricing & Payment</h2>
            <p className="mb-2">The current subscription price is £99 per month. Prices are subject to change with 30 days' notice to existing customers.</p>
            <p>Payments are processed securely through Stripe. You may cancel your subscription at any time, and you will retain access until the end of your current billing period.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">6. Your Content</h2>
            <p className="mb-2">You retain full ownership of all content you upload to AutoReplyChat, including documents, website content, and training materials.</p>
            <p className="mb-2">You grant us a limited licence to process, store, and use your content solely for the purpose of providing the chatbot service — specifically, generating vector embeddings and AI responses for your customers.</p>
            <p>You are responsible for ensuring you have the right to upload and use any content you provide. Do not upload content that is illegal, infringes copyright, or contains sensitive personal data of third parties without consent.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">7. Acceptable Use</h2>
            <p className="mb-3">You agree not to use AutoReplyChat to:</p>
            <p className="mb-2">— Generate or distribute harmful, abusive, or misleading content</p>
            <p className="mb-2">— Impersonate any person or entity</p>
            <p className="mb-2">— Attempt to access other customers' data or accounts</p>
            <p className="mb-2">— Reverse engineer, scrape, or interfere with the platform</p>
            <p>— Use the service for any illegal purpose</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">8. AI Disclaimer</h2>
            <p>AutoReplyChat uses artificial intelligence to generate responses. While we strive for accuracy, AI-generated responses may occasionally be incorrect or incomplete. You are responsible for reviewing the quality of responses your chatbot provides. AutoReplyChat is not liable for any decisions made based on AI-generated content.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">9. Availability</h2>
            <p>We aim to provide a reliable service but do not guarantee 100% uptime. We are not liable for any losses caused by service interruptions, whether planned or unplanned. We will make reasonable efforts to notify you of planned maintenance.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">10. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, AutoReplyChat and Autaimate shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service. Our total liability shall not exceed the amount you have paid us in the 12 months preceding the claim.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">11. Termination</h2>
            <p>You may close your account at any time by contacting us. We may suspend or terminate your account if you violate these terms. Upon termination, your data will be deleted within 30 days unless a longer retention period is required by law.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">12. Changes to Terms</h2>
            <p>We may update these terms from time to time. Material changes will be communicated via email to registered users at least 14 days before they take effect. Continued use of the service after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">13. Governing Law</h2>
            <p>These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-slate-100 mb-4">14. Contact</h2>
            <p>If you have questions about these terms, contact us at:</p>
            <p className="mt-2">Email: <a href="mailto:mick@autoreplychat.com" className="text-amber-500 hover:text-amber-400">mick@autoreplychat.com</a></p>
            <p>Phone: <a href="tel:+447501439406" className="text-amber-500 hover:text-amber-400">07501 439406</a></p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <a href="/" className="font-display text-xl font-bold">
              <span className="text-amber-500">Auto</span>
              <span className="text-slate-100">ReplyChat</span>
            </a>
            <div className="flex gap-8 text-sm text-slate-400">
              <a href="/privacy" className="hover:text-amber-500 transition-colors">Privacy</a>
              <a href="/terms" className="text-amber-500">Terms</a>
            </div>
            <div className="text-sm text-slate-500">
              © 2026 AutoReplyChat. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
