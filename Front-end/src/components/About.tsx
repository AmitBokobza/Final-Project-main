
import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "./Provider/ThemeProvider";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className={`min-h-screen py-16 px-4 ${theme === "dark" ? "bg-dark" : "bg-light"}`}>
        <div className="max-w-4xl mx-auto">
          <div className="card rounded-2xl overflow-hidden shadow-xl">
            
            <div className="h-2 gradient-background"></div>
            
            <div className="p-6 md:p-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">
                About Us
              </h1>
              
              <p className="text-lg mb-8 leading-relaxed secondary-text">
                Welcome to <strong className="accent">Recipe Showcase</strong>, your ultimate platform
                for sharing and discovering delicious recipes. Whether you're a
                passionate home cook looking to share your culinary creations or a
                food enthusiast searching for new dishes to try, our site makes
                it easy and enjoyable to connect through food.
              </p>

              <div className="space-y-10">
             
                <section>
                  <h2 className="text-2xl font-semibold mb-3">
                    Our Mission
                  </h2>
                  <p className="text-lg leading-relaxed secondary-text">
                    Our mission is to create a vibrant community where food lovers can
                    share their favorite recipes, discover new culinary inspirations, and
                    connect with fellow cooking enthusiasts. We believe in the power of
                    food to bring people together, and we aim to make recipe sharing
                    easier, more accessible, and more delicious.
                  </p>
                </section>

               
                <section>
                  <h2 className="text-2xl font-semibold mb-3">
                    What We Offer
                  </h2>
                  <ul className="list-disc pl-5 space-y-2 text-lg secondary-text">
                    <li>Upload and showcase your favorite recipes with photos and detailed instructions.</li>
                    <li>Browse and search through a diverse collection of recipes from our community.</li>
                    <li>Save your favorite recipes and create your personal cookbook.</li>
                    <li>
                      Connect with other cooks and share cooking tips and techniques.
                    </li>
                  </ul>
                </section>

             
                <section>
                  <h2 className="text-2xl font-semibold mb-3">
                    Why Choose Us?
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4 secondary-text">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-600 flex items-center justify-center mr-3">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <p>Easy to use: Upload and share your recipes with just a few clicks.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-600 flex items-center justify-center mr-3">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <p>Customizable: Present your recipes with beautiful layouts and personal touches.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-600 flex items-center justify-center mr-3">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <p>Community-driven: Join a passionate community of food lovers and home cooks.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-600 flex items-center justify-center mr-3">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <p>Inspiring: Discover new recipes and expand your culinary horizons every day.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-3">
                    Join Us Today
                  </h2>
                  <p className="text-lg mb-6 secondary-text">
                    Ready to share your culinary creations? Sign up now and start
                    uploading your recipes today. Let's cook up something amazing together!
                  </p>
                </section>
              </div>

              <div className="mt-10 pt-6 border-t border">
                <p className="text-center text-sm secondary-text">
                  © 2025 AmitRecipes
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