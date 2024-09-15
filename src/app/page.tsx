"use client";
import Navbar from "@/components/home/Navbar";
import HomeBanner from "@/components/home/HomeScreenBanner";
import Footer from "@/components/Footer";
import HomeDetails from "@/components/home/HomeDetails";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeBanner />
      <HomeDetails />
      <Footer />
    </>
  );
}
