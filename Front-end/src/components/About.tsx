import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "./Provider/ThemeProvider";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
         <div className={`min-h-screen py-16 px-4 bg-${theme === "dark" ? "gray-900" : "gray-100"}`}>
      <div className="max-w-4xl mx-auto">
        <div className={`rounded-2xl overflow-hidden shadow-xl bg-${theme === "dark" ? "gray-800" : "white"} card`}>
          
          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          
          <div className="p-6 md:p-10">
            <h1 className={`text-3xl md:text-4xl font-bold mb-6 text-${theme === "dark" ? "white" : "gray-900"}`}>
              About Us
            </h1>
            
            <p className={`text-lg mb-8 leading-relaxed text-${theme === "dark" ? "gray-300" : "gray-800"}`}>
              Welcome to <strong className="text-blue-600 dark:text-blue-400">AmitBusiness</strong>, your ultimate platform
              for creating and displaying digital business cards. Whether you're a
              professional looking to showcase your contact information or a
              business wanting to create cards for your employees, our site makes
              it easy and efficient to share your details.
            </p>

            <div className="space-y-10">
           
              <section>
                <h2 className={`text-2xl font-semibold mb-3 text-${theme === "dark" ? "white" : "gray-900"}`}>
                  Our Mission
                </h2>
                <p className={`text-lg leading-relaxed text-${theme === "dark" ? "gray-300" : "gray-800"}`}>
                  Our mission is to provide a seamless way for individuals and
                  businesses to create, share, and manage their business cards online.
                  We believe in the power of digital connections, and we aim to make
                  networking easier, faster, and more sustainable.
                </p>
              </section>

             
              <section>
                <h2 className={`text-2xl font-semibold mb-3 text-${theme === "dark" ? "white" : "gray-900"}`}>
                  What We Offer
                </h2>
                <ul className={`list-disc pl-5 space-y-2 text-lg text-${theme === "dark" ? "gray-300" : "gray-800"}`}>
                  <li>Create and customize your own digital business cards.</li>
                  <li>Share your card through links, QR codes, or social media.</li>
                  <li>Search and explore business cards from other users.</li>
                  <li>
                    Manage multiple cards for different business roles or locations.
                  </li>
                </ul>
              </section>

           
              <section>
                <h2 className={`text-2xl font-semibold mb-3 text-${theme === "dark" ? "white" : "gray-900"}`}>
                  Why Choose Us?
                </h2>
                <div className={`grid md:grid-cols-2 gap-4 text-${theme === "dark" ? "gray-300" : "gray-800"}`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p>Easy to use: Create and manage your cards with a few clicks.</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p>Customizable: Tailor your card to match your personal or company branding.</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p>Accessible: Your digital business card is always at your fingertips, available to share anywhere.</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p>Eco-friendly: Go paperless and reduce your carbon footprint with digital cards.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className={`text-2xl font-semibold mb-3 text-${theme === "dark" ? "white" : "gray-900"}`}>
                  Join Us Today
                </h2>
                <p className={`text-lg mb-6 text-${theme === "dark" ? "gray-300" : "gray-800"}`}>
                  Ready to create your digital business card? Sign up now and start
                  building your card today. Let's make connections that matter!
                </p>
              </section>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className={`text-center text-sm text-${theme === "dark" ? "gray-500" : "gray-600"}`}>
                © 2025 AmitBusiness
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
