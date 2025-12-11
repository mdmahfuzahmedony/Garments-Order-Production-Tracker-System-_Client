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



const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <StatsCounter></StatsCounter>
      <AboutSection></AboutSection>
      <CoreFeatures></CoreFeatures>
      <WhyChooseUs></WhyChooseUs>
      <WorkProcess></WorkProcess>
      <ServicesSection></ServicesSection>
      <BlogSection></BlogSection>
      <Testimonials></Testimonials>
     <CTASection></CTASection>

    
    </div>
  );
};

export default Home;
