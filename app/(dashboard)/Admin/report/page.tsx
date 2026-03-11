'use client';

import { useState } from 'react';
import './report.css';

const WireframeCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="wireframe-container">
    <h4>{title}</h4>
    <div className="wireframe-box">{children}</div>
  </div>
);

const PhoneWireframe = ({ title }: { title: string }) => (
  <div className="phone-frame">
    <div className="phone-notch"></div>
    <div className="phone-content">
      <div className="wireframe-bar short"></div>
      <div className="wireframe-bar medium" style={{ marginTop: '12px' }}></div>
      <div className="wireframe-area" style={{ marginTop: '20px' }}></div>
      <div className="wireframe-bar"></div>
      <div className="wireframe-bar"></div>
    </div>
  </div>
);

const DesktopWireframe = ({ title }: { title: string }) => (
  <div className="desktop-frame">
    <div className="frame-header"></div>
    <div className="frame-sidebar"></div>
    <div className="frame-content">
      <div className="wireframe-bar"></div>
      <div className="wireframe-bar short"></div>
      <div className="wireframe-area"></div>
    </div>
  </div>
);

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'objectives', label: 'Objectives' },
    { id: 'tech', label: 'Technologies' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'themes', label: 'Design System' },
    { id: 'structure', label: 'Folder Structure' },
    { id: 'routes', label: 'Routing System' },
    { id: 'components', label: 'UI Components' },
    { id: 'api', label: 'API Documentation' },
    { id: 'database', label: 'Database Design' },
    { id: 'wireframes', label: 'Page Wireframes' },
    { id: 'userflow', label: 'User Flow' },
    { id: 'features', label: 'Key Features' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'future', label: 'Future Improvements' },
    { id: 'conclusion', label: 'Conclusion' },
  ];

  return (
    <div className="report-page">
      {/* Header */}
      <div className="report-header">
        <div>
          <h1>NexEra Project Report</h1>
          <p>Complete Full-Stack Web Application Documentation</p>
        </div>
        <div className="report-meta">
          <div>Version 1.0</div>
          <div>{new Date().toLocaleDateString()}</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="tabs-nav">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`tab-button ${activeTab === section.id ? 'active' : ''}`}
            onClick={() => setActiveTab(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="report-content">

        {/* 1. PROJECT OVERVIEW */}
        {activeTab === 'overview' && (
          <section className="section-content">
            <h2>1. Project Overview</h2>
            
            <div className="content-grid">
              <div className="card">
                <h3>Project Name</h3>
                <p className="value">NexEra</p>
              </div>
              <div className="card">
                <h3>Current Version</h3>
                <p className="value">v1.0</p>
              </div>
              <div className="card">
                <h3>Status</h3>
                <p className="value" style={{ color: '#4ade80' }}>Active Development</p>
              </div>
            </div>

            <div className="section-box">
              <h3>Description</h3>
              <p>NexEra is a comprehensive full-stack web application designed for managing notes, quizzes, projects, and user administration with real-time collaboration features. It combines modern frontend technologies with robust backend infrastructure to provide a seamless user experience.</p>
            </div>

            <div className="section-box">
              <h3>Problem Statement</h3>
              <p>Educational institutions and professionals need a centralized platform that effectively manages multiple resources: note-taking, quiz management, project tracking, and collaborative work—all in one integrated system.</p>
            </div>

            <div className="section-box">
              <h3>Purpose</h3>
              <p>To provide a scalable, user-friendly platform that streamlines learning and collaboration through intuitive interfaces, real-time updates, and secure data management with role-based access control.</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Total Routes</div>
                <div className="stat-value">16</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">API Endpoints</div>
                <div className="stat-value">8+</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Components</div>
                <div className="stat-value">45+</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Database Tables</div>
                <div className="stat-value">12</div>
              </div>
            </div>
          </section>
        )}

        {/* 2. INTRODUCTION */}
        {activeTab === 'objectives' && (
          <section className="section-content">
            <h2>2. Introduction & Objectives</h2>
            
            <div className="section-box">
              <h3>Background</h3>
              <p>NexEra was developed to address the fragmentation of tools used in modern educational and professional environments. Students and professionals often juggle between multiple applications for note-taking, quizzes, project management, and communication. NexEra consolidates these functions into a unified platform.</p>
            </div>

            <div className="section-box">
              <h3>Why This System Was Developed</h3>
              <ul className="bullet-list">
                <li>Reduce tool switching and context-switching fatigue</li>
                <li>Provide real-time collaboration capabilities</li>
                <li>Enable secure role-based access control</li>
                <li>Support scalable data persistence with modern databases</li>
                <li>Create a responsive, modern user interface</li>
              </ul>
            </div>

            <div className="section-box">
              <h3>Target Users</h3>
              <ul className="bullet-list">
                <li><strong>Students:</strong> For managing notes, taking quizzes, and collaborating on projects</li>
                <li><strong>Educators:</strong> For creating and managing quizzes and monitoring student progress</li>
                <li><strong>Administrators:</strong> For system management, user control, and analytics</li>
                <li><strong>Professionals:</strong> For project management and collaborative work</li>
              </ul>
            </div>

            <div className="section-box">
              <h3>Main Objectives</h3>
              <ol className="numbered-list">
                <li>Create a unified platform for notes, quizzes, and project management</li>
                <li>Implement secure authentication and authorization</li>
                <li>Enable real-time data synchronization across multiple users</li>
                <li>Provide an intuitive, responsive user interface</li>
                <li>Ensure scalability and performance optimization</li>
              </ol>
            </div>

            <div className="section-box">
              <h3>Specific Objectives</h3>
              <ul className="bullet-list">
                <li>Build a modular component architecture for code reusability</li>
                <li>Implement comprehensive API endpoints with proper validation</li>
                <li>Setup multi-database integration (Firestore, Supabase)</li>
                <li>Create role-based dashboards and admin panels</li>
                <li>Deploy with automatic scaling capabilities</li>
                <li>Maintain code quality with TypeScript and testing</li>
              </ul>
            </div>
          </section>
        )}

        {/* 3. TECHNOLOGIES USED */}
        {activeTab === 'tech' && (
          <section className="section-content">
            <h2>3. Technologies Used</h2>
            
            <div className="tech-categories">
              <div className="tech-category">
                <h3>Frontend Framework & Libraries</h3>
                <div className="tech-items">
                  <div className="tech-item">
                    <div className="tech-name">Next.js 15</div>
                    <p>React framework with SSR/SSG for production-ready applications, API routes, and optimized performance.</p>
                  </div>
                  <div className="tech-item">
                    <div className="tech-name">React 19</div>
                    <p>JavaScript library for building interactive UIs with hooks, server components, and concurrent features.</p>
                  </div>
                  <div className="tech-item">
                    <div className="tech-name">TypeScript</div>
                    <p>Typed superset of JavaScript providing type safety, better IDE support, and maintainability.</p>
                  </div>
                </div>
              </div>

              <div className="tech-category">
                <h3>Styling & UI</h3>
                <div className="tech-items">
                  <div className="tech-item">
                    <div className="tech-name">Tailwind CSS</div>
                    <p>Utility-first CSS framework for rapid UI development with consistent, responsive designs.</p>
                  </div>
                  <div className="tech-item">
                    <div className="tech-name">shadcn/ui</div>
                    <p>Pre-built component library based on Radix UI and Tailwind for consistent, accessible components.</p>
                  </div>
                </div>
              </div>

              <div className="tech-category">
                <h3>Authentication</h3>
                <div className="tech-items">
                  <div className="tech-item">
                    <div className="tech-name">Clerk</div>
                    <p>Modern authentication platform with sign-in/sign-up flows, social login, and user management.</p>
                  </div>
                </div>
              </div>

              <div className="tech-category">
                <h3>Backend & Database</h3>
                <div className="tech-items">
                  <div className="tech-item">
                    <div className="tech-name">Firebase/Firestore</div>
                    <p>Real-time NoSQL database with authentication, hosting, and cloud functions for rapid backend development.</p>
                  </div>
                  <div className="tech-item">
                    <div className="tech-name">Supabase (PostgreSQL)</div>
                    <p>Open-source PostgreSQL database with real-time subscriptions, row-level security, and REST API.</p>
                  </div>
                </div>
              </div>

              <div className="tech-category">
                <h3>State Management</h3>
                <div className="tech-items">
                  <div className="tech-item">
                    <div className="tech-name">React Context API</div>
                    <p>Built-in React solution for managing global state without external dependencies.</p>
                  </div>
                  <div className="tech-item">
                    <div className="tech-name">SWR</div>
                    <p>Data fetching library with caching, revalidation, and real-time synchronization capabilities.</p>
                  </div>
                </div>
              </div>

              <div className="tech-category">
                <h3>Development & Deployment</h3>
                <div className="tech-items">
                  <div className="tech-item">
                    <div className="tech-name">Vercel</div>
                    <p>Cloud platform for deploying Next.js applications with automatic scaling and CI/CD integration.</p>
                  </div>
                  <div className="tech-item">
                    <div className="tech-name">Git & GitHub</div>
                    <p>Version control and collaboration platform for code management and team coordination.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. SYSTEM ARCHITECTURE */}
        {activeTab === 'architecture' && (
          <section className="section-content">
            <h2>4. System Architecture</h2>
            
            <div className="section-box">
              <h3>Architecture Overview</h3>
              <p>NexEra follows a modern three-tier architecture with separation of concerns between frontend, backend, and data layers.</p>
            </div>

            <div className="arch-diagram">
              <div className="arch-layer">
                <h4>Frontend Layer</h4>
                <div className="arch-content">
                  <div>Next.js Pages & Components</div>
                  <div>React Hooks & Context</div>
                  <div>Tailwind CSS Styling</div>
                </div>
              </div>
              <div className="arch-arrow">↓</div>
              <div className="arch-layer">
                <h4>API Layer</h4>
                <div className="arch-content">
                  <div>Next.js API Routes</div>
                  <div>RESTful Endpoints</div>
                  <div>Authentication Middleware</div>
                </div>
              </div>
              <div className="arch-arrow">↓</div>
              <div className="arch-layer">
                <h4>Backend & Data Layer</h4>
                <div className="arch-content">
                  <div>Clerk Authentication</div>
                  <div>Firebase/Firestore (NoSQL)</div>
                  <div>Supabase PostgreSQL</div>
                  <div>Real-time Subscriptions</div>
                </div>
              </div>
            </div>

            <div className="section-box" style={{ marginTop: '20px' }}>
              <h3>Data Flow</h3>
              <ol className="numbered-list">
                <li>User interacts with React components in the browser</li>
                <li>Component calls Next.js API route or directly queries database via SDK</li>
                <li>API route authenticates request using Clerk tokens</li>
                <li>Backend performs operations on Firestore or Supabase</li>
                <li>Real-time subscriptions notify other users of changes</li>
                <li>Updated data flows back to React components</li>
                <li>UI updates reflect the new state</li>
              </ol>
            </div>

            <div className="section-box">
              <h3>Key Components</h3>
              <div className="component-grid">
                <div className="component-item">
                  <strong>Frontend</strong>
                  <p>Next.js Server/Client Components, React Hooks, Context Providers, Tailwind Styling</p>
                </div>
                <div className="component-item">
                  <strong>API Gateway</strong>
                  <p>Next.js API Routes with middleware for auth validation and request handling</p>
                </div>
                <div className="component-item">
                  <strong>Authentication</strong>
                  <p>Clerk for user identity, session management, and role assignment</p>
                </div>
                <div className="component-item">
                  <strong>Data Store 1</strong>
                  <p>Firebase Firestore for real-time collaborative data and document storage</p>
                </div>
                <div className="component-item">
                  <strong>Data Store 2</strong>
                  <p>Supabase PostgreSQL for relational data, user management, and analytics</p>
                </div>
                <div className="component-item">
                  <strong>File Storage</strong>
                  <p>Firebase Storage or Supabase Blob for managing user uploads and assets</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 5. THEMES & DESIGN SYSTEM */}
        {activeTab === 'themes' && (
          <section className="section-content">
            <h2>5. Themes & Design System</h2>
            
            <div className="section-box">
              <h3>Color Palette System</h3>
              <p>NexEra implements a sophisticated 4-theme system with carefully curated color palettes for accessibility and user preference.</p>
            </div>

            <div className="themes-showcase">
              <div className="theme-section">
                <h4>Light Theme</h4>
                <div className="color-grid">
                  <div className="color-swatch" style={{ backgroundColor: '#f2f1ee' }}>
                    <span>Background</span>
                  </div>
                  <div className="color-swatch" style={{ backgroundColor: '#ffffff', border: '1px solid #d8d5cf' }}>
                    <span>Surface</span>
                  </div>
                  <div className="color-swatch" style={{ backgroundColor: '#2563eb' }}>
                    <span>Accent</span>
                  </div>
                  <div className="color-swatch" style={{ backgroundColor: '#16a34a' }}>
                    <span>Success</span>
                  </div>
                </div>
              </div>

              <div className="theme-section">
                <h4>Dark Theme</h4>
                <div className="color-grid">
                  <div className="color-swatch" style={{ backgroundColor: '#0f1117' }}>
                    <span>Background</span>
                  </div>
                  <div className="color-swatch" style={{ backgroundColor: '#181c27' }}>
                    <span>Surface</span>
                  </div>
                  <div className="color-swatch" style={{ backgroundColor: '#6c63ff' }}>
                    <span>Accent</span>
                  </div>
                  <div className="color-swatch" style={{ backgroundColor: '#4ade80' }}>
                    <span>Success</span>
                  </div>
                </div>
              </div>

              <div className="theme-section">
                <h4>Contrast Theme</h4>
                <div className="color-grid">
                  <div className="color-swatch" style={{ backgroundColor: '#000000' }}>
                    <span>Background</span>
                  </div>
                  <div className="color-swatch" style={{ backgroundColor: '#0a0a0a' }}>
                    <span>Surface</span>
                  </div>
                  <div className="color-swatch" style={{ backgroundColor: '#ffff00' }}>
                    <span>Accent</span>
                  </div>
                  <div className="color-swatch" style={{ backgroundColor: '#00ff88' }}>
                    <span>Success</span>
                  </div>
                </div>
              </div>

              <div className="theme-section">
                <h4>Unique Theme</h4>
                <div className="color-grid">
                  <div className="color-swatch" style={{ backgroundColor: '#1a0f0a' }}>
                    <span>Background</span>
                  </div>
                  <div className="color-swatch" style={{ backgroundColor: '#2c1a10' }}>
                    <span>Surface</span>
                  </div>
                  <div className="color-swatch" style={{ backgroundColor: '#f59e0b' }}>
                    <span>Accent</span>
                  </div>
                  <div className="color-swatch" style={{ backgroundColor: '#84cc16' }}>
                    <span>Success</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-box">
              <h3>Typography</h3>
              <div className="typography-grid">
                <div className="typo-item">
                  <div style={{ fontSize: '28px', fontWeight: 'bold' }}>Heading 1</div>
                  <p>Syne Bold, 28px, used for page titles</p>
                </div>
                <div className="typo-item">
                  <div style={{ fontSize: '20px', fontWeight: '600' }}>Heading 2</div>
                  <p>Syne Semi-Bold, 20px, for section headers</p>
                </div>
                <div className="typo-item">
                  <div style={{ fontSize: '14px' }}>Body Text</div>
                  <p>Syne Regular, 14px, for main content</p>
                </div>
                <div className="typo-item" style={{ fontFamily: 'monospace' }}>
                  <div style={{ fontSize: '12px' }}>Mono Text</div>
                  <p>Space Mono, 12px, for code blocks</p>
                </div>
              </div>
            </div>

            <div className="section-box">
              <h3>Design Principles</h3>
              <ul className="bullet-list">
                <li><strong>Consistency:</strong> Unified component patterns across all pages</li>
                <li><strong>Accessibility:</strong> WCAG compliant color contrasts and keyboard navigation</li>
                <li><strong>Responsiveness:</strong> Mobile-first design that adapts to all screen sizes</li>
                <li><strong>Clarity:</strong> Clear visual hierarchy and intuitive user flows</li>
                <li><strong>Performance:</strong> Optimized CSS with Tailwind and minimal runtime overhead</li>
              </ul>
            </div>
          </section>
        )}

        {/* 6. FOLDER STRUCTURE */}
        {activeTab === 'structure' && (
          <section className="section-content">
            <h2>6. Project Folder Structure</h2>
            
            <div className="folder-structure">
              <div className="folder-item">
                <div className="folder-name">📁 /app</div>
                <div className="folder-desc">Next.js App Router directory containing all pages and layouts</div>
                <div className="sub-items">
                  <div className="sub-item">
                    <strong>/(auth)</strong> - Authentication pages (login, signup, callback)
                  </div>
                  <div className="sub-item">
                    <strong>/(dashboard)</strong> - Protected routes requiring authentication
                  </div>
                  <div className="sub-item">
                    <strong>/api</strong> - API routes for backend logic
                  </div>
                </div>
              </div>

              <div className="folder-item">
                <div className="folder-name">📁 /components</div>
                <div className="folder-desc">Reusable React components organized by functionality</div>
                <div className="sub-items">
                  <div className="sub-item"><strong>ui/</strong> - Base UI components (Button, Card, Modal)</div>
                  <div className="sub-item"><strong>layout/</strong> - Layout components (Navbar, Sidebar)</div>
                  <div className="sub-item"><strong>features/</strong> - Feature-specific components</div>
                </div>
              </div>

              <div className="folder-item">
                <div className="folder-name">📁 /lib</div>
                <div className="folder-desc">Utility functions, helpers, and shared logic</div>
                <div className="sub-items">
                  <div className="sub-item"><strong>utils/</strong> - General utility functions</div>
                  <div className="sub-item"><strong>hooks/</strong> - Custom React hooks</div>
                  <div className="sub-item"><strong>constants/</strong> - Application constants</div>
                </div>
              </div>

              <div className="folder-item">
                <div className="folder-name">📁 /public</div>
                <div className="folder-desc">Static assets including images, icons, fonts</div>
              </div>

              <div className="folder-item">
                <div className="folder-name">📁 /styles</div>
                <div className="folder-desc">Global CSS and Tailwind configuration</div>
              </div>

              <div className="folder-item">
                <div className="folder-name">📁 /docs</div>
                <div className="folder-desc">Project documentation and reports</div>
              </div>
            </div>
          </section>
        )}

        {/* 7. ROUTING SYSTEM */}
        {activeTab === 'routes' && (
          <section className="section-content">
            <h2>7. Routing System</h2>
            
            <div className="routes-container">
              <div className="route-group">
                <h3>Public Routes (Unprotected)</h3>
                <div className="route-list">
                  <div className="route-item">
                    <div className="route-path">/</div>
                    <div className="route-desc">Landing page - introduction to NexEra</div>
                  </div>
                  <div className="route-item">
                    <div className="route-path">/auth/login</div>
                    <div className="route-desc">User login page with Clerk integration</div>
                  </div>
                  <div className="route-item">
                    <div className="route-path">/auth/signup</div>
                    <div className="route-desc">User registration page</div>
                  </div>
                </div>
              </div>

              <div className="route-group">
                <h3>Dashboard Routes (Protected)</h3>
                <div className="route-list">
                  <div className="route-item">
                    <div className="route-path">/dashboard</div>
                    <div className="route-desc">Main dashboard with overview and quick actions</div>
                  </div>
                  <div className="route-item">
                    <div className="route-path">/dashboard/notes</div>
                    <div className="route-desc">Notes management with CRUD operations</div>
                  </div>
                  <div className="route-item">
                    <div className="route-path">/dashboard/notes/[id]</div>
                    <div className="route-desc">Individual note editor and viewer</div>
                  </div>
                </div>
              </div>

              <div className="route-group">
                <h3>Quiz Routes (Protected)</h3>
                <div className="route-list">
                  <div className="route-item">
                    <div className="route-path">/dashboard/quiz</div>
                    <div className="route-desc">Quiz listing and management page</div>
                  </div>
                  <div className="route-item">
                    <div className="route-path">/dashboard/quiz/[id]</div>
                    <div className="route-desc">Quiz attempt and interactive testing</div>
                  </div>
                  <div className="route-item">
                    <div className="route-path">/dashboard/quiz/results</div>
                    <div className="route-desc">Quiz results and performance analytics</div>
                  </div>
                </div>
              </div>

              <div className="route-group">
                <h3>Admin Routes (Admin Only)</h3>
                <div className="route-list">
                  <div className="route-item">
                    <div className="route-path">/admin</div>
                    <div className="route-desc">Admin dashboard with system overview</div>
                  </div>
                  <div className="route-item">
                    <div className="route-path">/admin/users</div>
                    <div className="route-desc">User management and role assignment</div>
                  </div>
                  <div className="route-item">
                    <div className="route-path">/admin/report</div>
                    <div className="route-desc">System report and documentation (this page)</div>
                  </div>
                </div>
              </div>

              <div className="route-group">
                <h3>Account Routes (Protected)</h3>
                <div className="route-list">
                  <div className="route-item">
                    <div className="route-path">/account/settings</div>
                    <div className="route-desc">User profile and account settings</div>
                  </div>
                  <div className="route-item">
                    <div className="route-path">/account/preferences</div>
                    <div className="route-desc">Theme, notification, and privacy preferences</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 8. UI COMPONENTS */}
        {activeTab === 'components' && (
          <section className="section-content">
            <h2>8. UI Components with Wireframes</h2>
            
            <div className="components-grid">
              <WireframeCard title="Navigation Bar">
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ width: '100px', height: '20px', background: '#4a5568' }}></div>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ width: '60px', height: '20px', background: '#4a5568' }}></div>
                </div>
              </WireframeCard>

              <WireframeCard title="Sidebar Menu">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ height: '24px', background: '#4a5568' }}></div>
                  <div style={{ height: '24px', background: '#4a5568' }}></div>
                  <div style={{ height: '24px', background: '#4a5568' }}></div>
                </div>
              </WireframeCard>

              <WireframeCard title="Card Component">
                <div style={{ border: '1px solid #cbd5e0', borderRadius: '4px', padding: '12px' }}>
                  <div style={{ height: '16px', background: '#4a5568', marginBottom: '8px' }}></div>
                  <div style={{ height: '12px', background: '#cbd5e0' }}></div>
                </div>
              </WireframeCard>

              <WireframeCard title="Button Group">
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ height: '36px', flex: 1, background: '#6c63ff', borderRadius: '4px' }}></div>
                  <div style={{ height: '36px', flex: 1, background: '#e2e8f0', borderRadius: '4px' }}></div>
                </div>
              </WireframeCard>

              <WireframeCard title="Form Input">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ height: '12px', background: '#4a5568', width: '60%' }}></div>
                  <div style={{ height: '36px', border: '1px solid #cbd5e0', borderRadius: '4px' }}></div>
                </div>
              </WireframeCard>

              <WireframeCard title="Modal Dialog">
                <div style={{ border: '2px solid #4a5568', borderRadius: '6px', padding: '12px' }}>
                  <div style={{ height: '20px', background: '#4a5568', marginBottom: '12px' }}></div>
                  <div style={{ height: '60px', background: '#e2e8f0', borderRadius: '4px' }}></div>
                </div>
              </WireframeCard>

              <WireframeCard title="Data Table">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ height: '8px', background: '#4a5568' }}></div>
                  <div style={{ height: '8px', background: '#4a5568', width: '80%' }}></div>
                  <div style={{ height: '8px', background: '#4a5568', width: '90%' }}></div>
                </div>
              </WireframeCard>

              <WireframeCard title="Progress Bar">
                <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: '#4ade80', width: '65%' }}></div>
                </div>
              </WireframeCard>

              <WireframeCard title="Notification Alert">
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '8px', background: '#f0fdf4', borderLeft: '4px solid #4ade80' }}>
                  <div style={{ width: '16px', height: '16px', background: '#4ade80' }}></div>
                  <div style={{ height: '12px', background: '#4a5568', flex: 1 }}></div>
                </div>
              </WireframeCard>
            </div>
          </section>
        )}

        {/* 9. API DOCUMENTATION */}
        {activeTab === 'api' && (
          <section className="section-content">
            <h2>9. API Documentation</h2>
            
            <div className="api-endpoints">
              <div className="api-section">
                <h3>Authentication Endpoints</h3>
                <div className="api-item">
                  <div className="api-method get">GET</div>
                  <div className="api-info">
                    <div className="api-path">/api/auth/user</div>
                    <p>Get current authenticated user information</p>
                  </div>
                </div>
                <div className="api-item">
                  <div className="api-method post">POST</div>
                  <div className="api-info">
                    <div className="api-path">/api/auth/logout</div>
                    <p>Logout current user and clear session</p>
                  </div>
                </div>
              </div>

              <div className="api-section">
                <h3>Notes Endpoints</h3>
                <div className="api-item">
                  <div className="api-method get">GET</div>
                  <div className="api-info">
                    <div className="api-path">/api/notes</div>
                    <p>Get all notes for current user</p>
                  </div>
                </div>
                <div className="api-item">
                  <div className="api-method post">POST</div>
                  <div className="api-info">
                    <div className="api-path">/api/notes</div>
                    <p>Create a new note</p>
                  </div>
                </div>
                <div className="api-item">
                  <div className="api-method put">PUT</div>
                  <div className="api-info">
                    <div className="api-path">/api/notes/[id]</div>
                    <p>Update existing note</p>
                  </div>
                </div>
                <div className="api-item">
                  <div className="api-method delete">DELETE</div>
                  <div className="api-info">
                    <div className="api-path">/api/notes/[id]</div>
                    <p>Delete a note permanently</p>
                  </div>
                </div>
              </div>

              <div className="api-section">
                <h3>Quiz Endpoints</h3>
                <div className="api-item">
                  <div className="api-method get">GET</div>
                  <div className="api-info">
                    <div className="api-path">/api/quiz</div>
                    <p>Get all available quizzes</p>
                  </div>
                </div>
                <div className="api-item">
                  <div className="api-method post">POST</div>
                  <div className="api-info">
                    <div className="api-path">/api/quiz/[id]/submit</div>
                    <p>Submit quiz answers and get scoring</p>
                  </div>
                </div>
              </div>

              <div className="api-section">
                <h3>User Endpoints</h3>
                <div className="api-item">
                  <div className="api-method get">GET</div>
                  <div className="api-info">
                    <div className="api-path">/api/users</div>
                    <p>Get all users (admin only)</p>
                  </div>
                </div>
                <div className="api-item">
                  <div className="api-method put">PUT</div>
                  <div className="api-info">
                    <div className="api-path">/api/users/[id]/role</div>
                    <p>Update user role (admin only)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 10. DATABASE DESIGN */}
        {activeTab === 'database' && (
          <section className="section-content">
            <h2>10. Database Design</h2>
            
            <div className="section-box">
              <h3>Firestore Collections (NoSQL)</h3>
              <div className="db-collections">
                <div className="collection-item">
                  <h4>users</h4>
                  <ul className="bullet-list">
                    <li>uid (string) - User ID from Clerk</li>
                    <li>email (string) - User email</li>
                    <li>name (string) - Display name</li>
                    <li>avatar (string) - Profile image URL</li>
                    <li>role (string) - user | educator | admin</li>
                    <li>createdAt (timestamp) - Account creation date</li>
                  </ul>
                </div>

                <div className="collection-item">
                  <h4>notes</h4>
                  <ul className="bullet-list">
                    <li>id (string) - Document ID</li>
                    <li>userId (string) - Owner reference</li>
                    <li>title (string) - Note title</li>
                    <li>content (string) - Note body text</li>
                    <li>tags (array) - Categorization tags</li>
                    <li>collaborators (array) - Shared user IDs</li>
                    <li>createdAt (timestamp) - Creation time</li>
                    <li>updatedAt (timestamp) - Last modification</li>
                  </ul>
                </div>

                <div className="collection-item">
                  <h4>quizzes</h4>
                  <ul className="bullet-list">
                    <li>id (string) - Quiz ID</li>
                    <li>title (string) - Quiz name</li>
                    <li>description (string) - Quiz details</li>
                    <li>questions (array) - Quiz questions</li>
                    <li>authorId (string) - Creator reference</li>
                    <li>isPublished (boolean) - Availability status</li>
                    <li>durationMinutes (number) - Time limit</li>
                    <li>createdAt (timestamp)</li>
                  </ul>
                </div>

                <div className="collection-item">
                  <h4>quiz_attempts</h4>
                  <ul className="bullet-list">
                    <li>id (string) - Attempt ID</li>
                    <li>userId (string) - Test taker reference</li>
                    <li>quizId (string) - Quiz reference</li>
                    <li>answers (array) - User responses</li>
                    <li>score (number) - Total score</li>
                    <li>percentageCorrect (number) - Pass percentage</li>
                    <li>startedAt (timestamp)</li>
                    <li>completedAt (timestamp)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="section-box">
              <h3>Supabase PostgreSQL Tables</h3>
              <div className="db-collections">
                <div className="collection-item">
                  <h4>profiles</h4>
                  <ul className="bullet-list">
                    <li>id (uuid) - Primary key from auth.users</li>
                    <li>email (string) - User email</li>
                    <li>role (enum) - user, educator, admin</li>
                    <li>subscription (string) - Plan type</li>
                    <li>updated_at (timestamp)</li>
                  </ul>
                </div>

                <div className="collection-item">
                  <h4>note_shares</h4>
                  <ul className="bullet-list">
                    <li>id (uuid) - Relationship ID</li>
                    <li>note_id (uuid) - Foreign key</li>
                    <li>user_id (uuid) - Shared with user</li>
                    <li>permission (enum) - view, edit, admin</li>
                    <li>created_at (timestamp)</li>
                  </ul>
                </div>

                <div className="collection-item">
                  <h4>analytics</h4>
                  <ul className="bullet-list">
                    <li>id (uuid)</li>
                    <li>user_id (uuid) - Reference</li>
                    <li>event_type (string) - Action tracked</li>
                    <li>event_data (jsonb) - Event details</li>
                    <li>created_at (timestamp)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="section-box">
              <h3>Relationships & Integrity</h3>
              <ul className="bullet-list">
                <li><strong>Users → Notes:</strong> One-to-Many relationship for ownership</li>
                <li><strong>Users → Quiz Attempts:</strong> One-to-Many for tracking attempts</li>
                <li><strong>Quizzes → Questions:</strong> Embedded array structure</li>
                <li><strong>Notes → Collaborators:</strong> Many-to-Many through shares table</li>
                <li><strong>Row-Level Security (RLS):</strong> Enforced at Supabase level</li>
              </ul>
            </div>
          </section>
        )}

        {/* 11. PAGE WIREFRAMES */}
        {activeTab === 'wireframes' && (
          <section className="section-content">
            <h2>11. Page Wireframes</h2>
            
            <div className="wireframes-container">
              <div className="wireframe-set">
                <h3>Login Page</h3>
                <div className="wireframe-row">
                  <div className="wireframe-col">
                    <h4>Mobile</h4>
                    <PhoneWireframe title="Login Mobile" />
                  </div>
                  <div className="wireframe-col">
                    <h4>Desktop</h4>
                    <DesktopWireframe title="Login Desktop" />
                  </div>
                </div>
              </div>

              <div className="wireframe-set">
                <h3>Dashboard Page</h3>
                <div className="wireframe-row">
                  <div className="wireframe-col">
                    <h4>Mobile</h4>
                    <PhoneWireframe title="Dashboard Mobile" />
                  </div>
                  <div className="wireframe-col">
                    <h4>Desktop</h4>
                    <DesktopWireframe title="Dashboard Desktop" />
                  </div>
                </div>
              </div>

              <div className="wireframe-set">
                <h3>Notes Page</h3>
                <div className="wireframe-row">
                  <div className="wireframe-col">
                    <h4>Mobile</h4>
                    <PhoneWireframe title="Notes Mobile" />
                  </div>
                  <div className="wireframe-col">
                    <h4>Desktop</h4>
                    <DesktopWireframe title="Notes Desktop" />
                  </div>
                </div>
              </div>

              <div className="wireframe-set">
                <h3>Quiz Page</h3>
                <div className="wireframe-row">
                  <div className="wireframe-col">
                    <h4>Mobile</h4>
                    <PhoneWireframe title="Quiz Mobile" />
                  </div>
                  <div className="wireframe-col">
                    <h4>Desktop</h4>
                    <DesktopWireframe title="Quiz Desktop" />
                  </div>
                </div>
              </div>

              <div className="wireframe-set">
                <h3>Admin Dashboard</h3>
                <div className="wireframe-row">
                  <div className="wireframe-col">
                    <h4>Desktop</h4>
                    <DesktopWireframe title="Admin Dashboard" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 12. USER FLOW */}
        {activeTab === 'userflow' && (
          <section className="section-content">
            <h2>12. User Flow</h2>
            
            <div className="user-flows">
              <div className="flow-section">
                <h3>Student User Flow</h3>
                <div className="flow-diagram">
                  <div className="flow-step">1. Sign Up / Login</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step">2. View Dashboard</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step">3. Create / Edit Notes</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step">4. Share Notes with Peers</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step">5. Take Quiz</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step">6. View Results & Analytics</div>
                </div>
              </div>

              <div className="flow-section">
                <h3>Educator User Flow</h3>
                <div className="flow-diagram">
                  <div className="flow-step">1. Sign Up as Educator</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step">2. Create Quiz Questions</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step">3. Publish Quiz</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step">4. Monitor Student Attempts</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step">5. Review Analytics</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step">6. Provide Feedback</div>
                </div>
              </div>

              <div className="flow-section">
                <h3>Admin User Flow</h3>
                <div className="flow-diagram">
                  <div className="flow-step">1. Login to Admin Panel</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step">2. Manage Users & Roles</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step">3. Monitor System Usage</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step">4. Review Analytics</div>
                  <div className="flow-arrow">↓</div>
                  <div className="flow-step">5. Generate Reports</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 13. KEY FEATURES */}
        {activeTab === 'features' && (
          <section className="section-content">
            <h2>13. Key Features</h2>
            
            <div className="features-grid">
              <div className="feature-category">
                <h3>Core Features</h3>
                <ul className="bullet-list">
                  <li>Real-time note-taking and editing with collaborative features</li>
                  <li>Quiz creation and administration with auto-grading</li>
                  <li>User authentication with multiple social login options</li>
                  <li>Role-based access control (Student, Educator, Admin)</li>
                  <li>Progress tracking and analytics dashboard</li>
                  <li>File upload and media management</li>
                  <li>Responsive design for mobile, tablet, and desktop</li>
                  <li>Dark mode with multiple theme options</li>
                </ul>
              </div>

              <div className="feature-category">
                <h3>Advanced Features</h3>
                <ul className="bullet-list">
                  <li>Real-time collaboration with presence indicators</li>
                  <li>Advanced quiz features (timed, randomized, weighted)</li>
                  <li>Rich text editor with formatting and media embedding</li>
                  <li>Note organization with tags, folders, and search</li>
                  <li>Comment and annotation system</li>
                  <li>Notification system for updates and shared items</li>
                  <li>Export functionality (PDF, DOCX)</li>
                  <li>Integration with external tools and APIs</li>
                  <li>Advanced analytics and reporting</li>
                  <li>User activity auditing and logs</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* 14. CHALLENGES FACED */}
        {activeTab === 'challenges' && (
          <section className="section-content">
            <h2>14. Challenges Faced</h2>
            
            <div className="challenges-container">
              <div className="challenge-item">
                <h3>Real-time Synchronization</h3>
                <p>Challenge: Synchronizing data across multiple users in real-time while maintaining consistency and performance.</p>
                <p><strong>Solution:</strong> Implemented Firebase real-time database with Firestore subscriptions and SWR for client-side caching and revalidation.</p>
              </div>

              <div className="challenge-item">
                <h3>Authentication & Authorization</h3>
                <p>Challenge: Managing complex role-based access control across multiple routes and resources.</p>
                <p><strong>Solution:</strong> Integrated Clerk for robust authentication and implemented middleware for authorization checks on protected routes.</p>
              </div>

              <div className="challenge-item">
                <h3>Database Schema Complexity</h3>
                <p>Challenge: Designing schemas that work efficiently for both NoSQL (Firestore) and SQL (Supabase) databases.</p>
                <p><strong>Solution:</strong> Created abstraction layers in the API routes to normalize data between different database systems.</p>
              </div>

              <div className="challenge-item">
                <h3>Performance Optimization</h3>
                <p>Challenge: Handling large documents and quiz datasets without degrading performance.</p>
                <p><strong>Solution:</strong> Implemented pagination, lazy loading, code splitting, and optimized queries with proper indexing.</p>
              </div>

              <div className="challenge-item">
                <h3>State Management</h3>
                <p>Challenge: Managing complex application state across multiple pages and components.</p>
                <p><strong>Solution:</strong> Used React Context API for global state and SWR for server state management with automatic synchronization.</p>
              </div>

              <div className="challenge-item">
                <h3>Responsive Design</h3>
                <p>Challenge: Creating a consistent UI experience across all screen sizes and devices.</p>
                <p><strong>Solution:</strong> Employed mobile-first design approach with Tailwind CSS responsive utilities and tested across multiple breakpoints.</p>
              </div>
            </div>
          </section>
        )}

        {/* 15. FUTURE IMPROVEMENTS */}
        {activeTab === 'future' && (
          <section className="section-content">
            <h2>15. Future Improvements</h2>
            
            <div className="improvements-grid">
              <div className="improvement-item">
                <h4>AI-Powered Features</h4>
                <p>Integrate AI for auto-summarization of notes, intelligent quiz question generation, and personalized learning recommendations.</p>
              </div>

              <div className="improvement-item">
                <h4>Mobile Applications</h4>
                <p>Develop native iOS and Android mobile apps with offline functionality and push notifications.</p>
              </div>

              <div className="improvement-item">
                <h4>Video Integration</h4>
                <p>Support video lectures, screen recording, and video collaboration features for enhanced learning.</p>
              </div>

              <div className="improvement-item">
                <h4>Gamification</h4>
                <p>Add achievement badges, leaderboards, points system, and challenges to increase user engagement.</p>
              </div>

              <div className="improvement-item">
                <h4>Advanced Analytics</h4>
                <p>Implement detailed learning analytics with predictive models for student performance and retention.</p>
              </div>

              <div className="improvement-item">
                <h4>Integration Marketplace</h4>
                <p>Build marketplace for third-party integrations with Slack, Notion, Microsoft Teams, and Google Workspace.</p>
              </div>

              <div className="improvement-item">
                <h4>Accessibility Enhancements</h4>
                <p>Expand WCAG compliance, add more keyboard shortcuts, and implement voice control features.</p>
              </div>

              <div className="improvement-item">
                <h4>Performance Improvements</h4>
                <p>Implement edge caching, service workers for offline support, and further database query optimization.</p>
              </div>

              <div className="improvement-item">
                <h4>Social Features</h4>
                <p>Add user profiles, study groups, discussion forums, and peer-to-peer tutoring marketplace.</p>
              </div>

              <div className="improvement-item">
                <h4>Blockchain Integration</h4>
                <p>Explore blockchain for certificate verification and credential management.</p>
              </div>
            </div>
          </section>
        )}

        {/* 16. CONCLUSION */}
        {activeTab === 'conclusion' && (
          <section className="section-content">
            <h2>16. Conclusion</h2>
            
            <div className="section-box">
              <h3>Project Summary</h3>
              <p>NexEra represents a comprehensive solution for managing educational and collaborative learning activities. By combining modern web technologies with thoughtful UX design, it provides a platform that scales from individual students to large institutions.</p>
            </div>

            <div className="section-box">
              <h3>Key Achievements</h3>
              <ul className="bullet-list">
                <li>Successfully implemented full-stack architecture with Next.js, React, and modern databases</li>
                <li>Created responsive, accessible UI with consistent design system across 4 themes</li>
                <li>Implemented secure authentication and role-based authorization</li>
                <li>Designed scalable database schemas supporting collaboration and real-time updates</li>
                <li>Built comprehensive API documentation and component library</li>
                <li>Established best practices for performance, security, and maintainability</li>
              </ul>
            </div>

            <div className="section-box">
              <h3>Recommendations</h3>
              <ul className="bullet-list">
                <li>Continue regular security audits and dependency updates</li>
                <li>Implement comprehensive monitoring and error tracking (Sentry/LogRocket)</li>
                <li>Establish automated testing with Jest and Cypress for regression prevention</li>
                <li>Plan mobile app development for iOS and Android</li>
                <li>Gather user feedback and iterate on the design based on usage patterns</li>
                <li>Scale infrastructure with load balancing and database replication</li>
                <li>Document API with OpenAPI/Swagger for third-party developers</li>
              </ul>
            </div>

            <div className="section-box">
              <h3>Final Notes</h3>
              <p>NexEra is built on a solid foundation with room for growth and enhancement. The modular architecture allows for easy addition of new features without disrupting existing functionality. With proper maintenance, monitoring, and continuous improvement, NexEra can become an industry-leading platform for collaborative learning and productivity.</p>
            </div>

            <div className="conclusion-footer">
              <p><strong>Report Generated:</strong> {new Date().toLocaleString()}</p>
              <p><strong>Project Status:</strong> Active Development</p>
              <p><strong>Document Version:</strong> 1.0</p>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
