import React from 'react';
import "../styles/about.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import profile1 from "../assets/profile1.png";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.png";
import profile4 from "../assets/profile4.png";
import food from "../assets/preparing food.jpg";

const AboutUs = () => {
    return (
        <>
            <NavBar />

            <div className="about-us-page">

                {/* Mission Statement */}
                <section className="mission-statement">
                    <div className="about-container">
                        <div className="mission-content">
                            <div className="mission-text">
                                <h2>Our Mission</h2>
                                <p>We democratize cooking by providing accessible, foolproof recipes for every skill level. Our platform empowers home chefs to create restaurant-quality meals with confidence, transforming kitchen anxiety into culinary triumph.</p>
                                <div className="mission-stats">
                                    <div className="stat-item">
                                        <span className="stat-number">50+</span>
                                        <span className="stat-label">Recipes</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">6</span>
                                        <span className="stat-label">Cuisines</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-number">2.7M+</span>
                                        <span className="stat-label">Happy Cooks</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mission-image">
                                <img src={food} alt="Chef preparing food" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="core-values">
                    <div className="about-container">
                        <h2 className="section-title">Our Cooking Philosophy</h2>
                        <div className="values-grid">

                            <div className="value-card">
                                <h3>Quality First</h3>
                                <p>Every recipe is meticulously tested by our culinary team to ensure perfect results every time.</p>
                            </div>

                            <div className="value-card">
                                <h3>Continuous Innovation</h3>
                                <p>We constantly update our collection with trending and classic recipes from around the world.</p>
                            </div>

                            <div className="value-card">
                                <h3>Community Driven</h3>
                                <p>Our platform thrives on user feedback, ratings, and shared culinary experiences.</p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="team-section">
                    <div className="about-container">
                        <h2 className="section-title">Meet Our Culinary Team</h2>
                        <p className="section-subtitle">Passionate food experts creating your perfect cooking experience</p>
                        <div className="team-grid">


                            <div className="team-member">
                                <div className="member-image">
                                    <img src={profile3} alt="Shriya Ise" />
                                    <div className="social-links">
                                        <a href="#"><i className="fab fa-linkedin"></i></a>
                                        <a href="#"><i className="fab fa-github"></i></a>
                                    </div>
                                </div>
                                <h3>Shriya Ise</h3>
                                <p className="position">Backend Developer</p>
                                <p className="member-bio">Implemented core functionality and database architecture</p>
                            </div>


                            <div className="team-member">
                                <div className="member-image">
                                    <img src={profile4} alt="Shrut Patil" />
                                    <div className="social-links">
                                        <a href="#"><i className="fab fa-linkedin"></i></a>
                                        <a href="#"><i className="fab fa-github"></i></a>
                                    </div>
                                </div>
                                <h3>Shrut Patil</h3>
                                <p className="position">Frontend Developer</p>
                                <p className="member-bio">Built key pages including authentication and about sections</p>
                            </div>


                            <div className="team-member">
                                <div className="member-image">
                                    <img src={profile3} alt="Siddhi Lad" />
                                    <div className="social-links">
                                        <a href="#"><i className="fab fa-linkedin"></i></a>
                                        <a href="#"><i className="fab fa-github"></i></a>
                                    </div>
                                </div>
                                <h3>Siddhi Lad</h3>
                                <p className="position">UI/UX Designer</p>
                                <p className="member-bio">Created intuitive interfaces and user experience flows</p>
                            </div>


                            <div className="team-member">
                                <div className="member-image">
                                    <img src={profile1} alt="Rishikesh Patil" />
                                    <div className="social-links">
                                        <a href="#"><i className="fab fa-linkedin"></i></a>
                                        <a href="#"><i className="fab fa-github"></i></a>
                                    </div>
                                </div>
                                <h3>Rishikesh Patil</h3>
                                <p className="position">Project Lead & Full Stack Developer</p>
                                <p className="member-bio">Orchestrated the entire project and implemented core features</p>


                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <Footer />
            </div>
        </>
    );
};

export default AboutUs;