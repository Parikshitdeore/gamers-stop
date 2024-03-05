import "./home.css";
import { useEffect } from "react";
import { Footer } from "../../components/Footer/Footer";
import { useData } from "../../context/ContextProvider";
import { Categories } from "../../components/Category/Category";
import Carousel from "../../components/Carousel/Carousel";
import { useNavigate } from "react-router-dom";
import brand_logo_1 from "../../assets/brand_logo_1.png";
import brand_logo_2 from "../../assets/brand_logo_2.png";
import brand_logo_3 from "../../assets/brand_logo_3.png";
import brand_logo_4 from "../../assets/brand_logo_4.png";
import brand_logo_5 from "../../assets/brand_logo_5.png";
import brand_logo_6 from "../../assets/brand_logo_6.png";
import brand_logo_7 from "../../assets/brand_logo_7.png";
import { Icon } from "@iconify/react";

export const Home = () => {
  const {
    setTitle,
    state: { products },
  } = useData();
  useEffect(() => setTitle("Home"));
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <section className="carousel-section">
        <Carousel />
      </section>
      <section className="categories-section">
        <Categories />
      </section>
      <section className="empty-section"></section>
      <section className="trending-prod-section">
        <div className="trending-prod-container">
          <h2>Trending Products</h2>
          <div className="trending-prods">
            {products.map((prod) => {
              return prod.trending ? (
                <img
                  className="trending-prod-img"
                  src={prod.image}
                  onClick={() => {
                    navigate(`/product/${prod.id}`);
                  }}
                  alt=""
                />
              ) : (
                <></>
              );
            })}
          </div>
        </div>
      </section>
      <section className="trending-brands-info">
        <div>
          <h2>Trending Brands</h2>
          <p>
            We meticulously select the finest options, ensuring uncompromising
            quality, product excellence, user-friendly experience, and
            long-lasting durability
          </p>
        </div>
      </section>

      <section className="trending-brands-section">
        <div className="trending-brands-container">
          <img src={brand_logo_1} alt="brand logo 1" />
          <img src={brand_logo_2} alt="brand logo 2" />
          <img src={brand_logo_3} alt="brand logo 3" />
          <img src={brand_logo_4} alt="brand logo 4" />
          <img src={brand_logo_5} alt="brand logo 5" />
          <img src={brand_logo_6} alt="brand logo 6" />
          <img src={brand_logo_7} alt="brand logo 7" />
        </div>
      </section>

      <section className="info-section">
        <div className="info-container">
          <div className="info-pros">
            <Icon icon="la:shipping-fast" color="white" width="50px" />
            <h3>Free & Fast Shipping</h3>
            <p>Fast delivery in 5-7 Days</p>
          </div>

          <div className="info-pros">
            <Icon icon="ph:certificate-fill" color="white" width="50px" />
            <h3>Genuine Products</h3>
            <p>Original & Trustworthy products</p>
          </div>

          <div className="info-pros">
            <Icon
              icon="fluent:person-support-20-filled"
              color="white"
              width="50px"
            />
            <h3> Fast Support</h3>
            <p>Dedicated and fast support</p>
          </div>

          <div className="info-pros">
            <Icon icon="mdi:account-secure" color="white" width="50px" />
            <h3>100% secure checkout</h3>
            <p>Netbanking | UPI | Wallet | EM</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
