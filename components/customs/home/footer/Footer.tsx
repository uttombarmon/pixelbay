import { InstagramIcon, LinkedinIcon, X } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gradient-to-t from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="mx-auto  px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Branding & Description */}
          <div>
            <h1 className="flex justify-center sm:justify-start text-2xl font-bold font-sans text-gray-900 dark:text-white">
              Pixel<span className="text-red-400">Bay</span>
            </h1>
            <p className="mt-6 max-w-md text-center sm:max-w-xs sm:text-left text-gray-500 dark:text-gray-400 leading-relaxed">
              PixelBay is your ultimate destination for cutting-edge gadgets and
              smart electronics. Explore, shop, and stay ahead of the tech
              curve.
            </p>

            {/* Socials */}
            <ul className="mt-8 flex justify-center gap-6 sm:justify-start">
              <li>
                <a
                  href="https://www.facebook.com/pixelbay"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 dark:text-white hover:text-teal-500 dark:hover:text-teal-400 transition transform hover:scale-105"
                  title="Facebook"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="w-7 h-7 sm:w-6 sm:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/pixelbay"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 dark:text-white hover:text-teal-500 dark:hover:text-teal-400 transition transform hover:scale-105"
                  title="Instagram"
                >
                  <span className="sr-only">Instagram</span>
                  {/* <svg
                    className="w-7 h-7 sm:w-6 sm:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z" />
                  </svg> */}
                  <InstagramIcon className="w-7 h-7 sm:w-6 sm:h-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.x.com/pixelbay"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 dark:text-white hover:text-teal-500 dark:hover:text-teal-400 transition transform hover:scale-105"
                  title="X"
                >
                  <span className="sr-only">X</span>
                  <X className="w-7 h-7 sm:w-6 sm:h-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/pixelbay"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-700 dark:text-white hover:text-teal-500 dark:hover:text-teal-400 transition transform hover:scale-105"
                  title="LinkedIn"
                >
                  <span className="sr-only">LinkedIn</span>
                  <LinkedinIcon className="w-7 h-7 sm:w-6 sm:h-6" />
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Company
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-white hover:text-teal-500 transition"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-white hover:text-teal-500 transition"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-white hover:text-teal-500 transition"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Support
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-white hover:text-teal-500 transition"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-white hover:text-teal-500 transition"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 dark:text-white hover:text-teal-500 transition"
                  >
                    Live Chat
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6 text-center sm:flex sm:justify-between sm:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; 2025 PixelBay. All rights reserved.
          </p>
          <p className="mt-4 sm:mt-0 text-sm text-gray-500 dark:text-gray-400">
            <a
              href="#"
              className="text-teal-600 underline hover:text-teal-500 dark:text-teal-500"
            >
              Terms & Conditions
            </a>{" "}
            &middot;
            <a
              href="#"
              className="text-teal-600 underline hover:text-teal-500 dark:text-teal-500"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
