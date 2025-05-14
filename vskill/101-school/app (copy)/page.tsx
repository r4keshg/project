import React from "react";

export default function Home() {
  return (
    <>
      {/* Internal Global Styles */}
      <style>{`
        /* Global button styling */
        .btn {
          display: inline-block;
          padding: 12px 24px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 8px;
          background-color: #2563eb;
          color: white;
          text-decoration: none;
          transition: transform 0.3s;
        }
        .btn:hover {
          transform: scale(1.05);
        }
        /* Feature Card styling */
        .feature-card {
          padding: 24px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          background-color: white;
        }
        /* Responsive grid for features */
        @media (min-width: 768px) {
          .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
            max-width: 800px;
            margin: 0 auto;
          }
        }
      `}</style>

      {/* Outer container with explicit vertical scrolling */}
      <div style={{ position: "relative", overflowY: "auto", height: "auto" }}>
        {/* Full-Screen Hero Section */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "56px 24px 0",
            minHeight: "100vh",
          }}
        >
          <div style={{ maxWidth: "768px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "48px", fontWeight: "bold", lineHeight: "1.2" }}>
              Learn, Create, Conquer
            </h1>
            <p
              style={{
                marginTop: "24px",
                fontSize: "18px",
                color: "#4b5563",
                margin: "24px auto",
                maxWidth: "640px",
              }}
            >
              Join a community of warriors in a gamified learning platform.
              Create courses, share insights, and level up your skills in our interactive Arena.
            </p>
            <div style={{ marginTop: "40px" }}>
              <a href="/courses" className="btn">
                Get Started
              </a>
            </div>
          </div>
        </section>

        {/* Updated Features Section */}
        <section style={{ padding: "64px 0", backgroundColor: "#f9fafb" }}>
          <div style={{ maxWidth: "1120px", padding: "0 24px", margin: "0 auto" }}>
            <h2
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              Discover Our Platform Features
            </h2>
            <div className="features-grid" style={{ display: "block" }}>
              {/* Feature 1: Smart Courses */}
              <div className="feature-card">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ padding: "8px", borderRadius: "8px", backgroundColor: "#dbeafe" }}>
                    <BookOpenIcon />
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Smart Courses</h3>
                </div>
                <p style={{ fontSize: "14px", color: "#4b5563" }}>
                  Experience AI-powered, adaptive courses tailored to your learning style.
                </p>
              </div>
              {/* Feature 2: Real-Time Analytics */}
              <div className="feature-card">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ padding: "8px", borderRadius: "8px", backgroundColor: "#dbeafe" }}>
                    <BrainIcon />
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Real-Time Analytics</h3>
                </div>
                <p style={{ fontSize: "14px", color: "#4b5563" }}>
                  Monitor your progress with detailed insights and analytics in real time.
                </p>
              </div>
              {/* Feature 3: Community Engagement */}
              <div className="feature-card">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ padding: "8px", borderRadius: "8px", backgroundColor: "#dbeafe" }}>
                    <UsersIcon />
                  </div>
                  <h3 style={{ fontSize: "20px", fontWeight: "600" }}>Community Engagement</h3>
                </div>
                <p style={{ fontSize: "14px", color: "#4b5563" }}>
                  Connect with peers, share insights, and collaborate to enhance your learning journey.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
              <a href="/auth" className="btn">
                Get Started
              </a>
            </div>
          </div>
        </section>

        {/* Full-Screen Get Started Section */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(to right, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.05))",
            textAlign: "center",
            padding: "24px",
          }}
        >
          <h2 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "24px" }}>
            Ready to Start Your Learning Journey?
          </h2>
          <p
            style={{
              fontSize: "24px",
              color: "#4b5563",
              maxWidth: "640px",
              margin: "0 auto 32px auto",
            }}
          >
            Join thousands of learners and start mastering new skills today with our AI-powered platform.
            <p>Few words about us </p>
          </p>
          <a
            href="/about/page.tsx"
            className="btn"
            style={{ display: "inline-flex", alignItems: "center" }}
          >
            SAY MY NAME!!🤝
            <span style={{ marginLeft: "8px" }}>
              <ArrowRightIcon />
            </span>
          </a>
        </section>
      </div>
    </>
  );
}

/* Inline SVG Icon Components */
const BookOpenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    stroke="#2563eb"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12L12 2l10 10" />
    <path d="M2 12v8a2 2 0 002 2h4" />
    <path d="M18 22h4a2 2 0 002-2v-8" />
  </svg>
);

const BrainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    stroke="#2563eb"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
    <path d="M12 8v8" />
  </svg>
);

const UsersIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    stroke="#2563eb"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a6.5 6.5 0 0113 0" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    stroke="white"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
