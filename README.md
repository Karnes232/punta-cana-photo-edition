# Sertuin Events Website

<img src="https://sertuinevents.com/_gatsby/image/7e80b5ffc02630f8b0579099aa029a11/aadda68e70952a77b95097eb6e8d4a1d/logotipo%20sertuin%20events.webp?u=https%3A%2F%2Fimages.ctfassets.net%2Fvpskymlp6aa0%2FpKzEbbiqIVQrzq8SeaxPy%2F8fe23dd9429e712b8c681cb2d287056b%2Flogotipo_sertuin_events.png&a=w%3D500%26h%3D516%26fm%3Dwebp%26q%3D75&cd=2025-02-07T22%3A34%3A29.891Z" alt="Sertuin Events" width="200" height="auto">

A comprehensive digital platform for a premier event planning company specializing in weddings, celebrations, and corporate events in Punta Cana.

🌐 **Live Website:** [sertuinevents.com](https://sertuinevents.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Website Structure](#website-structure)
- [Technical Architecture](#technical-architecture)
- [Installation & Setup](#installation--setup)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

## Technical Architecture

## 🛠️ Tech Stack

| Technology       | Purpose              | Details                                          |
| ---------------- | -------------------- | ------------------------------------------------ |
| **GatsbyJS**     | Frontend Framework   | Static site generation, React-based architecture |
| **Netlify**      | Hosting & Deployment | Global CDN, continuous deployment                |
| **Contentful**   | Content Management   | Headless CMS, API-driven content                 |
| **Tailwind CSS** | Styling              | Utility-first CSS framework                      |
| **Firebase**     | Auth & Database      | Google Sign-In, Firestore, Cloud Storage         |
| **React-PDF**    | Document Generation  | Client-side PDF creation                         |
| **Nodemailer**   | Email Service        | Automated email delivery                         |

---

## 🚀 Key Features

### 🌐 Multilingual Support

Complete English and Spanish localization with dynamic language switching and SEO optimization for both languages.

### 📝 Dynamic Content Management

- **Event Packages** - Auto-generated pages from Contentful data models
- **Blog System** - Full-featured blog with build-time generation
  - 📖 [Example: Complete Guide to Organizing Events in Punta Cana](https://sertuinevents.com/blog/complete-guide-to-organizing-events-in-punta-cana/)
- **Equipment Rentals** - Dynamic catalog with real-time inventory
- **Floral Arrangements** - Curated collections with detailed galleries

### 🎯 Interactive Tools

- **Wedding Questionnaire** - Interactive planning tool with dynamic budget calculations
  - 💍 [Wedding Planning Tool](https://sertuinevents.com/weddings-punta-cana/)
- **Quote Generator** - Custom PDF generation using React-PDF
- **Contract System** - Automated legal document creation with email delivery

### 🔐 Client Management System

- **Admin Portal** - Secure, Firebase-authenticated interface
  - 🔒 [Admin Dashboard](https://sertuinevents.com/admin)
- **Client Database** - Comprehensive customer information storage
- **Testimonial System** - Client feedback collection and display
  - 💬 [Share Your Experience](https://sertuinevents.com/share-your-experience/)

### 📄 Document Generation

- **React-PDF** - Client-side PDF creation for professional documents
- **Email Integration** - Automated delivery via Nodemailer
- **Custom Templates** - Branded layouts with dynamic data population

---

## 🏗️ Website Structure

### 🌐 Public Pages

- **🏠 Home** - Company overview and featured services
- **🎉 Event Services** - Detailed pages for weddings, birthdays, proposals
- **📦 Package Catalog** - Dynamic pages built from Contentful
- **📝 Blog** - SEO-optimized articles and guides
- **🛠️ Equipment Rentals** - Searchable catalog with pricing
- **💬 Testimonials** - Client experience sharing system

### 🔐 Administrative System

- **📊 Admin Dashboard** - Secure, authenticated access
- **💰 Quote Management** - Create and send professional proposals
- **📄 Contract Generation** - Legal document creation and delivery
- **👥 Client Database** - Centralized customer information
- **📝 Content Management** - Direct integration with Contentful

---

## ⚙️ Technical Architecture

### 🚀 Performance Optimization

- **Static Site Generation** - Pages pre-built at deploy time for maximum speed
- **Image Optimization** - Automatic WebP conversion, lazy loading
- **Code Splitting** - JavaScript bundles split by route for optimized loading
- **CDN Distribution** - Content served from global edge locations
- **SEO Optimization** - Pre-rendered HTML for excellent search engine indexing

### 🔒 Security Implementation

- **Firebase Authentication** - Enterprise-grade security with Google Sign-In
- **Protected Routes** - Admin-only access to sensitive areas
- **Data Encryption** - Secure storage of sensitive client information
- **CORS Configuration** - Cross-origin request security
- **Input Sanitization** - XSS and SQL injection prevention
- **Security Headers** - CSP, HSTS implementation

### 🔧 Integration Architecture

- **Headless CMS Integration** - Real-time content sync between Contentful and Gatsby
- **Real-time Database** - Live data synchronization using Firebase WebSockets
- **Email Automation** - Professional communication workflows with Nodemailer
- **PDF Generation** - Browser-based document creation with multilingual support

### ✨ Advanced Features

- **Build-time Content Generation** - Extensive page generation from CMS data
- **Multi-language Routing** - URL structure optimization for SEO
- **Form Validation** - Real-time validation with custom error messaging

---

## 💼 Business Value

This technical architecture delivers significant advantages:

- 🔍 **SEO Excellence** - Static generation and optimized content improve search rankings
- 🤖 **Professional Automation** - Reduces manual work in quote and contract generation
- 📈 **Scalable Growth** - Easy to add new services, packages, and content
- 🎯 **Client Experience** - Fast, responsive website with professional tools
- ⚡ **Operational Efficiency** - Streamlined admin workflows and client management
- 🌍 **Global Reach** - Bilingual support and fast international loading

---

### Environment Variables

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
FIREBASE_API_KEY=your_firebase_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
```

---

## 🌐 Deployment

The website is automatically deployed to Netlify when changes are pushed to the main branch.

### Build Process

1. **Content Fetch** - Gatsby pulls content from Contentful at build time
2. **Static Generation** - All pages are pre-built for optimal performance
3. **Asset Optimization** - Images and CSS are automatically optimized
4. **Deployment** - Site is deployed to Netlify's global CDN

---

## 🛠️ Maintenance & Support

The website is built with modern, well-supported technologies that ensure:

- Long-term stability and security
- Easy content updates through Contentful
- Automated deployments and backups
- Scalable hosting that grows with your business

This comprehensive solution represents a significant investment in digital infrastructure that will serve Sertuin Events' growth and client service excellence for years to come.
