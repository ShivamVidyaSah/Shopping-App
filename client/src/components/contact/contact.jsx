import styles from '../../styles/contact/contact.module.css';

const Contact = () => {
    return (
        <div>
            <section className={styles.aboutHeader}>
                <div className={styles.classNameShade}>
                    <h2>Let's Talk</h2>
                    <p>Talk to Us. We love to hear from you!</p>
                </div>
            </section>

            <section id="contact-details" className={styles.contactDetails}>
                <div className={styles.details}>
                    <span>GET IN TOUCH</span>
                    <h2>Visit our store or contact us today</h2>
                    <h3>Our Office</h3>
                    <div>
                    <ul>
                        <li style={{display:"inline"}}>
                            {/* <i className="fal fa-map" aria-hidden="true"></i> */}
                            <p>Hatiberia, ICARE Complex, Dist, Haldia, West Bengal 721657</p>
                        </li>
                        <li style={{display:"inline"}}>
                            {/* <i className="fal fa-envelope" aria-hidden="true"></i> */}
                            <p>sahahivam10@gmail.com</p>
                        </li>
                        <li style={{display:"inline"}}>
                            {/* <i className="fal fa-phone-alt" aria-hidden="true"></i> */}
                            <p>+91 9903759222</p>
                        </li>
                        <li style={{display:"inline"}}>
                            {/* <i className="fal fa-clock" aria-hidden="true"></i> */}
                            <p>Monday to Saturday: 9.00 AM to 6.00 PM</p>
                        </li>
                    </ul>    
                    </div>
                </div>

                <div className={styles.map}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3697.9738169959287!2d88.07002391396111!3d22.050597057486993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02f0bd0fcacc69%3A0x409c7ac845fe6280!2sHaldia%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1674907327129!5m2!1sen!2sin"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>

            <section id="form-details" className={styles.formDetails}>
                <form action="">
                    <span>Leave a message</span>
                    <h2>We love to hear from you!</h2>
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="E-mail" />
                    <input type="text" placeholder="Subject" />
                    <textarea cols="30" rows="10" placeholder="Your Message"></textarea>
                    <button className={styles.normal}>Submit</button>
                </form>

                {/* <div className={styles.people}>
                    <div>
                        <img src="people/blank-profile.png" alt="" />
                        <p>
                            <span>Shivam Vidya Sah</span> Phone :- +91 9903759222 <br /> Email :- sahahivam10@gmail.com
                        </p>
                    </div>
                </div> */}
            </section>

            <section className={styles.newsletter }>
                <div className={styles.newstext}>
                    <h4>Sign up for Regular Updates</h4>
                    <p>
                        Get E-mail updates on <span>latest trends, new arrivals and special offers</span>
                    </p>
                </div>
                <div className={styles.form}>
                    <input type="text" placeholder="Your email address" />
                    <button className={styles.normal}>Sign Up</button>
                </div>
            </section>

            <footer className={styles.sectionP1}>
                <div className={styles.col}>
                    <img className={styles.logo} src="img/logo2.png" alt="" />
                    <h4>Contact</h4>
                    <p>
                        <strong>Address:</strong> Hatiberia, ICARE Complex, Dist, Haldia, West Bengal 721657
                    </p>
                    <p>
                        <strong>Phone:</strong> +91 9903759222
                    </p>
                    <p>
                        <strong>Hours:</strong> 10.00 AM - 18.00 PM, Mon - Sat
                    </p>
                    <div className={styles.follow}>
                        <h4>Follow Us</h4>
                        <div className={styles.icon}>
                            <i className="fab fa-facebook-f" aria-hidden="true"></i>
                            <i className="fab fa-instagram" aria-hidden="true"></i>
                            <i className="fab fa-twitter" aria-hidden="true"></i>
                            <i className="fab fa-whatsapp" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>

                <div className={styles.col}>
                    <h4>About</h4>
                    <a href="#">About Us</a>
                    <a href="#">Delivery Information</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms &amp; Conditions</a>
                    <a href="#">Contact Us</a>
                </div>

                <div className={styles.col}>
                    <h4>Account</h4>
                    <a href="login.html">Sign In</a>
                    <a href="#">View Cart</a>
                    <a href="#">My Wishlist</a>
                    <a href="#">Track Order</a>
                    <a href="#">Help</a>
                </div>

                <div className={styles.install}>
                    <h4>Install App</h4>
                    <p>From App Store or Google Play</p>
                    <div className={styles.row}>
                        <img src="img/app-store.png" alt="" />
                        <img src="img/google-play.png" alt="" />
                    </div>
                    <p>Payment Gateway</p>
                    <img className={styles.pay} src="img/pay.webp" alt="" />
                </div>

                <div className={styles.copyright}>
                    <p>
                        @Made with <i className="fa fa-heart" style={{ color: 'red' }} aria-hidden="true"></i> by Shivam.
                        All rights reserved
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Contact;
