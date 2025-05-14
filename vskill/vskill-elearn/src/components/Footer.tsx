import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Branding / Slogan */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              VSkill Arena
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Empowering learning through AI and community.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/odyssey"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Odyssey
                </Link>
              </li>
              <li>
                <Link
                  to="/arena"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Arena
                </Link>
              </li>
              <li>
                <Link
                  to="/tribe"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Tribe
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:graakaysh@gmail.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  graakaysh@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Social Media
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary"
              >
                GitHub
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} VSkill Arena. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
