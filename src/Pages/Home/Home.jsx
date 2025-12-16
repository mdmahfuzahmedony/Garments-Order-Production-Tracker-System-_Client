import React from "react";
import BlogSection from "../../Component/Blog/BlogSection";
import CTASection from "../../Component/CTA/CTAction";
import HeroSection from "../../Component/Hero/HeroSection";
import StatsCounter from "../../Component/StatsCounter/StatsCounter";
import CoreFeatures from "../../Component/CoreFeatures/CoreFeatures";
import WorkProcess from "../../Component/WorkProcess/WorkProcess";
import HomeProduct from "../../Component/HomeProduct/HomeProduct";
import Testimonials from "../../Component/Testimonials/Testimonials";




const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <StatsCounter></StatsCounter>
      <HomeProduct></HomeProduct>
      <CoreFeatures></CoreFeatures>
      <WorkProcess></WorkProcess>
      <BlogSection></BlogSection>
      <Testimonials></Testimonials>
     <CTASection></CTASection>   
    </div>
  );
};

export default Home;
