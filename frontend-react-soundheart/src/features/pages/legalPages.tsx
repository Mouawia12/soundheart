import LegalPage from './LegalPage'

export function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="How we handle your information"
      intro="Your privacy matters to us. This policy explains what we collect and how we use it."
      sections={[
        {
          h: 'Information we collect',
          blocks: [
            { p: 'When you contact us, book a consultation, or subscribe to our newsletter, we may collect information you provide, such as your name, email address, phone number, and anything you choose to share in a message or form. Our website may also collect limited technical information automatically, such as your device type and pages viewed, through standard analytics.' },
          ],
        },
        {
          h: 'How we use your information',
          blocks: [
            {
              ul: [
                'To respond to your enquiries and provide the services you request.',
                'To schedule and manage appointments and consultations.',
                'To send newsletters and updates you have asked to receive. You can unsubscribe at any time.',
                'To operate, maintain, and improve our website.',
              ],
            },
          ],
        },
        {
          h: 'Protected health information',
          blocks: [
            { p: 'Clinical records created in the course of therapy are protected health information and are handled under our separate Notice of Privacy Practices and applicable law, including HIPAA where it applies. Please do not include sensitive clinical details in website forms or email.' },
          ],
        },
        {
          h: 'Sharing your information',
          blocks: [
            { p: 'We do not sell your personal information. We share it only with service providers who help us operate, such as scheduling, payment, email, and hosting platforms, and only as needed to provide our services, or where required by law.' },
          ],
        },
        {
          h: 'Your choices',
          blocks: [
            { p: 'You may request access to, correction of, or deletion of your personal information, and you may unsubscribe from our newsletter at any time, by contacting us.' },
          ],
        },
      ]}
    />
  )
}

export function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of Use"
      title="The terms for using this website"
      intro="By using this website, you agree to these terms."
      sections={[
        {
          h: 'Use of this website',
          blocks: [
            { p: 'This website is provided for general information about SoundHeart Counseling and its services. You agree to use it lawfully and not to misuse, disrupt, or attempt to gain unauthorized access to any part of it.' },
          ],
        },
        {
          h: 'No professional relationship',
          blocks: [
            { p: 'Using this website, contacting us, or reading our content does not by itself create a therapist-client or any other professional relationship. A professional relationship begins only when we have both agreed to it and completed the appropriate intake.' },
          ],
        },
        {
          h: 'Intellectual property',
          blocks: [
            { p: 'The content on this website, including text, the NeuroRelational Belonging materials, logos, and design, is owned by SoundHeart Counseling or its licensors and may not be copied or reused without permission.' },
          ],
        },
        {
          h: 'Payments and cancellations',
          blocks: [
            { p: 'Fees, payment, and cancellation terms for consultations, therapy, retreats, and training are provided at the time of booking and in your service agreement.' },
          ],
        },
        {
          h: 'Disclaimers and limitation of liability',
          blocks: [
            { p: 'This website and its content are provided as is, without warranties of any kind. Please also read our Disclaimer. To the fullest extent permitted by law, SoundHeart is not liable for any damages arising from your use of this website.' },
          ],
        },
      ]}
    />
  )
}

export function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Disclaimer"
      title="Important information about this website"
      intro="Please read this carefully before using our website or services."
      sections={[
        {
          h: 'Not emergency or crisis care',
          blocks: [
            { p: 'SoundHeart Counseling is not a crisis or emergency service. If you are in crisis or thinking about harming yourself or others, do not use this website to seek help. Call or text 988 (Suicide and Crisis Lifeline), dial 911, or go to your nearest emergency room.' },
          ],
        },
        {
          h: 'Not medical or clinical advice',
          blocks: [
            { p: 'Information on this website, including articles, guides, audio, and video, is provided for general educational purposes only. It is not a substitute for professional evaluation, diagnosis, or treatment, and it does not create a therapist-client or any other professional relationship. Always seek the advice of a qualified professional with any questions about a medical or mental health condition.' },
          ],
        },
        {
          h: 'Scope of services and location',
          blocks: [
            { p: 'In-person therapy and retreats are provided in the Mat-Su Valley, Alaska, where SoundHeart is licensed to practice. For individuals located elsewhere, SoundHeart may offer services based on the NeuroRelational Belonging model. These model-based services are not a substitute for licensed therapy and are not offered as counseling or psychotherapy in states or jurisdictions where SoundHeart is not licensed. Availability depends on your location.' },
          ],
        },
        {
          h: 'No guarantee of results',
          blocks: [
            { p: 'Every person and relationship is different. We do not and cannot guarantee any particular outcome from therapy, retreats, training, or any resource offered here.' },
          ],
        },
        {
          h: 'Third-party links and tools',
          blocks: [
            { p: 'This website may link to third-party websites and tools, such as scheduling, payment, and content platforms. We are not responsible for the content, policies, or practices of those third parties.' },
          ],
        },
      ]}
    />
  )
}
