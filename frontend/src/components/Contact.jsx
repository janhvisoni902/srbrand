import React, { useState } from 'react';
import { contactInfo } from '../data/contact';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!formData.name || !formData.email) {
      setStatus({ type: 'error', message: 'Name and Email are required.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const rawBaseUrl = import.meta.env.VITE_API_URL || 'https://srbrand.onrender.com';
      const baseUrl = rawBaseUrl.replace(/\/+$/, '');
      const response = await fetch(`${baseUrl}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your inquiry has been submitted successfully.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
      } else {
        setStatus({
          type: 'error',
          message: data.error || `Submission failed (${response.status}). Please try again.`
        });
      }
    } catch (err) {
      console.error('API submission error:', err);
      setStatus({
        type: 'error',
        message: 'Unable to connect to server. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-padding"
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        borderTop: '1px solid rgba(16, 17, 38, 0.05)'
      }}
    >
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '5rem', alignItems: 'start' }}>
          
          {/* Left Column: Contact details */}
          <div style={{ textAlign: 'left' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-small)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-accent-burgundy)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '1rem'
              }}
            >
              Get In Touch
            </span>
            
            <h2 style={{ fontSize: 'var(--fs-h2)', color: 'var(--color-text)', marginBottom: '2.5rem', fontWeight: 300 }}>
              Let’s create something sensation-worthy together.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent-gold)', marginBottom: '0.5rem' }}>
                  Our Location
                </h3>
                <p style={{ opacity: 0.8, fontSize: '0.95rem', lineHeight: 1.5 }}>
                  {contactInfo.address}
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent-gold)', marginBottom: '0.5rem' }}>
                  Call Us
                </h3>
                <a href={`tel:${contactInfo.phone}`} style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--color-text)' }}>
                  +91 {contactInfo.phone}
                </a>
              </div>

              <div>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent-gold)', marginBottom: '0.5rem' }}>
                  Email Us
                </h3>
                <a href={`mailto:${contactInfo.email}`} style={{ fontSize: '1.2rem', fontWeight: 500, color: 'var(--color-text)' }}>
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div style={{ textAlign: 'left', backgroundColor: 'var(--color-white)', padding: '3rem', border: '1px solid rgba(16, 17, 38, 0.05)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 300 }}>
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} noValidate>
              
              {/* Name Field */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label htmlFor="form-name" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Name *
                </label>
                <input
                  type="text"
                  id="form-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid rgba(16, 17, 38, 0.15)',
                    backgroundColor: 'var(--color-bg)',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text)'
                  }}
                />
              </div>

              {/* Email Field */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label htmlFor="form-email" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Email *
                </label>
                <input
                  type="email"
                  id="form-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@domain.com"
                  required
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid rgba(16, 17, 38, 0.15)',
                    backgroundColor: 'var(--color-bg)',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text)'
                  }}
                />
              </div>

              {/* Phone & Company Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem' }}>
                <div>
                  <label htmlFor="form-phone" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="form-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '1px solid rgba(16, 17, 38, 0.15)',
                      backgroundColor: 'var(--color-bg)',
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-text)'
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="form-company" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                    Company
                  </label>
                  <input
                    type="text"
                    id="form-company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Organization"
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '1px solid rgba(16, 17, 38, 0.15)',
                      backgroundColor: 'var(--color-bg)',
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-text)'
                    }}
                  />
                </div>
              </div>

              {/* Service Field */}
              <div style={{ marginBottom: '1.2rem' }}>
                <label htmlFor="form-service" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Service of Interest
                </label>
                <select
                  id="form-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid rgba(16, 17, 38, 0.15)',
                    backgroundColor: 'var(--color-bg)',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text)'
                  }}
                >
                  <option value="">Select a Service</option>
                  <option value="Events & Large Format">Events & Large Format</option>
                  <option value="Promotions & Activations">Promotions & Activations</option>
                  <option value="Retail & BTL Solutions">Retail & BTL Solutions</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                </select>
              </div>

              {/* Message Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="form-message" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  Message
                </label>
                <textarea
                  id="form-message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help your brand flourish?"
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid rgba(16, 17, 38, 0.15)',
                    backgroundColor: 'var(--color-bg)',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-text)',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Status alerts */}
              {status.message && (
                <div
                  role="alert"
                  style={{
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem',
                    backgroundColor: status.type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                    color: status.type === 'success' ? '#2e7d32' : '#c62828',
                    border: `1px solid ${status.type === 'success' ? '#81c784' : '#e57373'}`
                  }}
                >
                  {status.message}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: isSubmitting ? 'gray' : 'var(--color-accent-burgundy)',
                  color: 'var(--color-bg)',
                  border: 'none',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--color-text)';
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) e.currentTarget.style.backgroundColor = 'var(--color-accent-burgundy)';
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
