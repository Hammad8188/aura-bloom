import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message Sent!',
      description: 'We\'ll get back to you within 24 hours.',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <span className="text-primary text-sm tracking-widest">GET IN TOUCH</span>
          <h1 className="font-serif text-4xl md:text-5xl text-secondary-foreground mt-2 mb-4">
            Contact Us
          </h1>
          <p className="text-secondary-foreground/70 max-w-2xl mx-auto">
            We're here to help. Reach out to us with any questions or concerns.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gold-gradient text-primary-foreground">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="font-serif text-2xl mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-muted/30 luxury-border">
                  <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Visit Us</h3>
                    <p className="text-muted-foreground">
                      123 Luxury Avenue, Fifth Floor<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted/30 luxury-border">
                  <Phone className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Call Us</h3>
                    <p className="text-muted-foreground">+1 (555) ESSENCE</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-muted/30 luxury-border">
                  <Mail className="h-6 w-6 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Email Us</h3>
                    <p className="text-muted-foreground">hello@noiressence.com</p>
                    <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 mt-8 p-4 bg-green-600 text-white rounded-sm hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
                <div>
                  <p className="font-medium">Chat on WhatsApp</p>
                  <p className="text-sm opacity-90">Quick response guaranteed</p>
                </div>
              </a>

              {/* Social Links */}
              <div className="mt-8">
                <h3 className="font-medium mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {['Facebook', 'Instagram', 'Twitter', 'YouTube'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 flex items-center justify-center bg-muted hover:bg-primary hover:text-primary-foreground transition-colors rounded-full"
                    >
                      {social[0]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
