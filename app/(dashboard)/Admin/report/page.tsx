'use client';

import { useEffect, useState } from 'react';
import './report.css';

interface ReportData {
  overview: {
    name: string;
    version: string;
    description: string;
  };
  stats: {
    totalRoutes: number;
    publicRoutes: number;
    protectedRoutes: number;
    adminRoutes: number;
    apiEndpoints: number;
    components: number;
  };
  technologies: Array<{
    name: string;
    category: string;
    description: string;
  }>;
  routeGroups: Array<{
    id: string;
    name: string;
    color: string;
    count: number;
    routes: Array<{
      path: string;
      description: string;
      protected: boolean;
    }>;
  }>;
  features: {
    core: string[];
    advanced: string[];
  };
  architecture: {
    frontend: string[];
    backend: string[];
    data: string[];
  };
}

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [reportData] = useState<ReportData>({
    overview: {
      name: 'NexEra',
      version: 'v1.0',
      description: 'A comprehensive full-stack web application for managing notes, quizzes, projects, and user administration with real-time collaboration features.',
    },
    stats: {
      totalRoutes: 16,
      publicRoutes: 3,
      protectedRoutes: 10,
      adminRoutes: 3,
      apiEndpoints: 8,
      components: 45,
    },
    technologies: [
      {
        name: 'Next.js 15',
        category: 'Frontend Framework',
        description: 'React-based framework for production-ready applications with SSR/SSG capabilities and API routes.',
      },
      {
        name: 'React 19',
        category: 'UI Library',
        description: 'Modern JavaScript library for building interactive user interfaces with hooks and server components.',
      },
      {
        name: 'TypeScript',
        category: 'Language',
        description: 'Typed superset of JavaScript for safer, more maintainable code with excellent IDE support.',
      },
      {
        name: 'Tailwind CSS',
        category: 'Styling',
        description: 'Utility-first CSS framework for rapid UI development with consistent design patterns.',
      },
      {
        name: 'Firebase',
        category: 'Backend',
        description: 'Real-time database, authentication, and hosting platform for rapid development.',
      },
      {
        name: 'Clerk',
        category: 'Authentication',
        description: 'Modern authentication and user management platform with sign-in/sign-up components.',
      },
      {
        name: 'Supabase',
        category: 'Backend',
        description: 'PostgreSQL database with real-time subscriptions and row-level security.',
      },
      {
        name: 'React Context',
        category: 'State Management',
        description: 'Built-in React state management for application-level data sharing.',
      },
    ],
    routeGroups: [
      {
        id: 'public',
        name: 'Public Routes',
        color: '#38bdf8',
        count: 3,
        routes: [
          { path: '/login', description: 'Custom login page', protected: false },
          { path: '/register', description: 'Custom registration page', protected: false },
          { path: '/sign-in', description: 'Clerk authentication', protected: false },
        ],
      },
      {
        id: 'dashboard',
        name: 'Dashboard Routes',
        color: '#818cf8',
        count: 5,
        routes: [
          { path: '/Home', description: 'Main dashboard', protected: true },
          { path: '/Applications', description: 'Applications management', protected: true },
          { path: '/Projects', description: 'Project management', protected: true },
          { path: '/Info', description: 'Information page', protected: true },
          { path: '/Settings', description: 'User profile & account', protected: true },
        ],
      },
      {
        id: 'notes',
        name: 'Notes Management',
        color: '#34d399',
        count: 6,
        routes: [
          { path: '/Notes', description: 'All notes with filters', protected: true },
          { path: '/Notes/new', description: 'Create new note', protected: true },
          { path: '/Notes/view/note/[id]', description: 'View note content', protected: true },
          { path: '/Notes/view/pdf/[id]', description: 'PDF viewer', protected: true },
          { path: '/Notes/view/quiz/[id]', description: 'Quiz viewer', protected: true },
          { path: '/Notes/(sub)/[subject]', description: 'Subject notes', protected: true },
        ],
      },
      {
        id: 'admin',
        name: 'Admin Routes',
        color: '#fb923c',
        count: 3,
        routes: [
          { path: '/Admin', description: 'Admin dashboard', protected: true },
          { path: '/Admin/report', description: 'Project report', protected: true },
          { path: '/Admin/[adminRoute]', description: 'Dynamic admin pages', protected: true },
        ],
      },
    ],
    features: {
      core: [
        'User authentication (Clerk + Firebase)',
        'Real-time notes management',
        'PDF viewer integration',
        'Quiz system with scoring',
        'Project management',
        'User profiles and settings',
        'Admin dashboard with user management',
        'Subject-based note organization',
      ],
      advanced: [
        'Real-time collaboration',
        'Activity tracking and logging',
        'Advanced search and filtering',
        'Multi-theme support (dark/light/contrast)',
        'Role-based access control (RBAC)',
        'File upload and processing',
        'Quiz analytics and reporting',
        'Mobile-responsive design',
      ],
    },
    architecture: {
      frontend: ['Next.js App Router', 'React Server Components', 'React Client Components', 'Context API State Management', 'Responsive CSS'],
      backend: ['Next.js API Routes', 'Firebase Realtime Database', 'Supabase PostgreSQL', 'Clerk Authentication API'],
      data: ['Firebase Firestore Collections', 'Supabase Tables', 'User Sessions', 'Real-time Subscriptions'],
    },
  });

  return (
    <div className="report-container">
      {/* Header */}
      <header className="report-header">
        <div className="header-content">
          <div>
            <h1>NexEra Project Report</h1>
            <p>Comprehensive Technical Documentation & Analysis</p>
          </div>
          <div className="header-meta">
            <div className="meta-item">
              <span className="meta-label">Version</span>
              <span className="meta-value">{reportData.overview.version}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Routes</span>
              <span className="meta-value">{reportData.stats.totalRoutes}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Components</span>
              <span className="meta-value">{reportData.stats.components}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="report-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === 'statistics' ? 'active' : ''}`}
          onClick={() => setActiveTab('statistics')}
        >
          Statistics
        </button>
        <button
          className={`tab-btn ${activeTab === 'routes' ? 'active' : ''}`}
          onClick={() => setActiveTab('routes')}
        >
          Routes
        </button>
        <button
          className={`tab-btn ${activeTab === 'technologies' ? 'active' : ''}`}
          onClick={() => setActiveTab('technologies')}
        >
          Tech Stack
        </button>
        <button
          className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          className={`tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
          onClick={() => setActiveTab('architecture')}
        >
          Architecture
        </button>
      </nav>

      {/* Content */}
      <main className="report-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <section className="tab-section">
            <div className="section-header">
              <h2>Project Overview</h2>
              <p>Core information about the NexEra application</p>
            </div>

            <div className="card-grid">
              <div className="info-card">
                <div className="card-icon">📋</div>
                <h3>Project Name</h3>
                <p>{reportData.overview.name}</p>
              </div>
              <div className="info-card">
                <div className="card-icon">📌</div>
                <h3>Version</h3>
                <p>{reportData.overview.version}</p>
              </div>
              <div className="info-card">
                <div className="card-icon">🎯</div>
                <h3>Status</h3>
                <p>Active Development</p>
              </div>
              <div className="info-card">
                <div className="card-icon">🌐</div>
                <h3>Framework</h3>
                <p>Next.js 15 + React 19</p>
              </div>
            </div>

            <div className="description-section">
              <h3>Description</h3>
              <p>{reportData.overview.description}</p>
            </div>

            <div className="description-section">
              <h3>Objectives</h3>
              <ul className="objectives-list">
                <li>Provide a unified platform for note management and educational content</li>
                <li>Enable real-time collaboration and content sharing</li>
                <li>Implement comprehensive admin controls and user management</li>
                <li>Support multiple content types (notes, PDFs, quizzes)</li>
                <li>Ensure scalability and performance across all user levels</li>
              </ul>
            </div>
          </section>
        )}

        {/* Statistics Tab */}
        {activeTab === 'statistics' && (
          <section className="tab-section">
            <div className="section-header">
              <h2>Project Statistics</h2>
              <p>Key metrics and counts across the application</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#38bdf8' }}>
                  {reportData.stats.totalRoutes}
                </div>
                <div className="stat-label">Total Routes</div>
                <div className="stat-description">All application routes</div>
              </div>
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#34d399' }}>
                  {reportData.stats.protectedRoutes}
                </div>
                <div className="stat-label">Protected Routes</div>
                <div className="stat-description">Auth required</div>
              </div>
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#fb923c' }}>
                  {reportData.stats.adminRoutes}
                </div>
                <div className="stat-label">Admin Routes</div>
                <div className="stat-description">Admin only access</div>
              </div>
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#818cf8' }}>
                  {reportData.stats.apiEndpoints}
                </div>
                <div className="stat-label">API Endpoints</div>
                <div className="stat-description">Backend routes</div>
              </div>
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#a78bfa' }}>
                  {reportData.stats.components}
                </div>
                <div className="stat-label">Components</div>
                <div className="stat-description">Reusable UI components</div>
              </div>
              <div className="stat-card">
                <div className="stat-number" style={{ color: '#f472b6' }}>
                  4
                </div>
                <div className="stat-label">Route Groups</div>
                <div className="stat-description">Logical grouping</div>
              </div>
            </div>

            <div className="stats-breakdown">
              <h3>Route Breakdown</h3>
              <div className="breakdown-bars">
                <div className="breakdown-item">
                  <div className="breakdown-label">
                    <span>Public Routes</span>
                    <span className="breakdown-count">{reportData.stats.publicRoutes}</span>
                  </div>
                  <div className="breakdown-bar">
                    <div
                      className="breakdown-fill"
                      style={{
                        width: `${(reportData.stats.publicRoutes / reportData.stats.totalRoutes) * 100}%`,
                        backgroundColor: '#38bdf8',
                      }}
                    ></div>
                  </div>
                </div>
                <div className="breakdown-item">
                  <div className="breakdown-label">
                    <span>Dashboard Routes</span>
                    <span className="breakdown-count">5</span>
                  </div>
                  <div className="breakdown-bar">
                    <div
                      className="breakdown-fill"
                      style={{
                        width: `${(5 / reportData.stats.totalRoutes) * 100}%`,
                        backgroundColor: '#818cf8',
                      }}
                    ></div>
                  </div>
                </div>
                <div className="breakdown-item">
                  <div className="breakdown-label">
                    <span>Notes Routes</span>
                    <span className="breakdown-count">6</span>
                  </div>
                  <div className="breakdown-bar">
                    <div
                      className="breakdown-fill"
                      style={{
                        width: `${(6 / reportData.stats.totalRoutes) * 100}%`,
                        backgroundColor: '#34d399',
                      }}
                    ></div>
                  </div>
                </div>
                <div className="breakdown-item">
                  <div className="breakdown-label">
                    <span>Admin Routes</span>
                    <span className="breakdown-count">{reportData.stats.adminRoutes}</span>
                  </div>
                  <div className="breakdown-bar">
                    <div
                      className="breakdown-fill"
                      style={{
                        width: `${(reportData.stats.adminRoutes / reportData.stats.totalRoutes) * 100}%`,
                        backgroundColor: '#fb923c',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Routes Tab */}
        {activeTab === 'routes' && (
          <section className="tab-section">
            <div className="section-header">
              <h2>Application Routes</h2>
              <p>Complete routing structure and organization</p>
            </div>

            <div className="routes-container">
              {reportData.routeGroups.map((group) => (
                <div key={group.id} className="route-group">
                  <div className="group-header" style={{ borderLeftColor: group.color }}>
                    <h3>{group.name}</h3>
                    <span className="group-badge">{group.count} routes</span>
                  </div>
                  <div className="routes-list">
                    {group.routes.map((route, idx) => (
                      <div key={idx} className="route-item">
                        <div className="route-path-wrapper">
                          <code className="route-path">{route.path}</code>
                          {route.protected && <span className="route-badge protected">🔒 Protected</span>}
                        </div>
                        <p className="route-description">{route.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Technologies Tab */}
        {activeTab === 'technologies' && (
          <section className="tab-section">
            <div className="section-header">
              <h2>Technology Stack</h2>
              <p>Tools and libraries powering NexEra</p>
            </div>

            <div className="tech-grid">
              {reportData.technologies.map((tech, idx) => (
                <div key={idx} className="tech-card">
                  <div className="tech-category">{tech.category}</div>
                  <h4>{tech.name}</h4>
                  <p>{tech.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <section className="tab-section">
            <div className="section-header">
              <h2>Key Features</h2>
              <p>Core and advanced functionality</p>
            </div>

            <div className="features-container">
              <div className="features-section">
                <h3>Core Features</h3>
                <ul className="features-list">
                  {reportData.features.core.map((feature, idx) => (
                    <li key={idx}>
                      <span className="feature-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="features-section">
                <h3>Advanced Features</h3>
                <ul className="features-list advanced">
                  {reportData.features.advanced.map((feature, idx) => (
                    <li key={idx}>
                      <span className="feature-icon">⭐</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Architecture Tab */}
        {activeTab === 'architecture' && (
          <section className="tab-section">
            <div className="section-header">
              <h2>System Architecture</h2>
              <p>Application structure and components</p>
            </div>

            <div className="architecture-grid">
              <div className="arch-card">
                <div className="arch-icon">🎨</div>
                <h3>Frontend</h3>
                <ul className="arch-list">
                  {reportData.architecture.frontend.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="arch-card">
                <div className="arch-icon">⚙️</div>
                <h3>Backend</h3>
                <ul className="arch-list">
                  {reportData.architecture.backend.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="arch-card">
                <div className="arch-icon">💾</div>
                <h3>Data Layer</h3>
                <ul className="arch-list">
                  {reportData.architecture.data.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="architecture-flow">
              <h3>Data Flow</h3>
              <div className="flow-diagram">
                <div className="flow-step">
                  <div className="flow-node">Client Browser</div>
                </div>
                <div className="flow-arrow">↓</div>
                <div className="flow-step">
                  <div className="flow-node">Next.js Server</div>
                </div>
                <div className="flow-arrow">↓</div>
                <div className="flow-step">
                  <div className="flow-node">Backend Services</div>
                </div>
                <div className="flow-arrow">↓</div>
                <div className="flow-step">
                  <div className="flow-node">Database (Firebase/Supabase)</div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="report-footer">
        <div className="footer-content">
          <p>&copy; 2024 NexEra Project. All rights reserved.</p>
          <div className="footer-info">
            <span>Generated: {new Date().toLocaleDateString()}</span>
            <span>Version: {reportData.overview.version}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
