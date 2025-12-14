import React from "react";
import BlogSection from "../../Component/Blog/BlogSection";
import CTASection from "../../Component/CTA/CTAction";
import ServicesSection from "../../Component/Service/ServicesSection";
import AboutSection from "../../Component/About/AboutSection";
import HeroSection from "../../Component/Hero/HeroSection";
import StatsCounter from "../../Component/StatsCounter/StatsCounter";
import CoreFeatures from "../../Component/CoreFeatures/CoreFeatures";
import WhyChooseUs from "../../Component/WhyChooseUs/WhyChooseUs";
import WorkProcess from "../../Component/WorkProcess/WorkProcess";
import Testimonials from "../../Component/Testimonials/Testimonials";
import HomeProduct from "../../Component/HomeProduct/HomeProduct";



const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <StatsCounter></StatsCounter>
      <HomeProduct></HomeProduct>
      <CoreFeatures></CoreFeatures>
      <WorkProcess></WorkProcess>
      <BlogSection></BlogSection>
     <CTASection></CTASection>   
    </div>
  );
};

export default Home;
