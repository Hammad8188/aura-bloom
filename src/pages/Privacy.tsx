import Layout from '@/components/layout/Layout';

const Privacy = () => (
  <Layout>
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="font-serif text-3xl mb-8">Privacy Policy</h1>
      <div className="prose prose-neutral max-w-none text-muted-foreground space-y-4">
        <p>At NOIR ESSENCE, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.</p>
        <h2 className="font-serif text-xl mt-6 mb-3 text-foreground">Information We Collect</h2>
        <p>We collect information you provide directly, such as name, email, shipping address, and payment details when you make a purchase.</p>
        <h2 className="font-serif text-xl mt-6 mb-3 text-foreground">How We Use Your Information</h2>
        <p>Your information is used to process orders, provide customer support, and send promotional communications (with your consent).</p>
        <h2 className="font-serif text-xl mt-6 mb-3 text-foreground">Data Security</h2>
        <p>We implement industry-standard security measures to protect your personal information.</p>
      </div>
    </div>
  </Layout>
);

export default Privacy;
