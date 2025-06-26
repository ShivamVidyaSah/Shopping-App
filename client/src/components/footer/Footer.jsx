import styles from '../../styles/footer/footer.module.css';


const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
          <div className={styles.col}>
              <img className={styles.logo} src="/img-assets/logo2.png" alt=""/>
              <h4>Contact</h4>
              <p><strong>Address:</strong> Hatiberia, ICARE Complex, Dist, Haldia, West Bengal 721657</p>
              <p><strong>Phone:</strong>+91 9903759222</p>
              <p><strong>Hours:</strong>10.00 AM - 18.00 PM, Mon - Sat</p>
              <div className={styles.follow}>
                  <h4>Follow Us</h4>
                  <div className={styles.icons}>
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
              <a href="#">Delievery Information</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms &amp; Condition</a>
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

          <div className={`${styles.col} ${styles.install}`}>
              <h4>Install App</h4>
              <p>From App Store or Google Play</p>
              <div className={styles.row}>
                  <img src="/img-assets/app-store.png" alt=""/>
                  <img src="/img-assets/google-play.png" alt=""/>
              </div>
              <p>Payment Gateway</p>
              <img className={styles.pay} src="/img-assets/pay.webp" alt=""/>
          </div>


          <div className={styles.copyright}>
              <p>@Made with <i className="fa fa-heart" style={{color:'red'}} aria-hidden="true"></i> by Shivam. All right reserved</p>
          </div>
      </footer>
        </>    
  );
}

export default Footer; 