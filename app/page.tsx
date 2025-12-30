"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowRoomieWorks from "@/components/HowRoomieWorks";
import IntegrationTicker from "@/components/IntegrationTicker";
import BenefitsSection from "@/components/BenefitsSection";
import AIDashboardSection from "@/components/AIDashboardSection";
import ROIEstimate from "@/components/ROIEstimate";
import PresentationSection from "@/components/PresentationSection";
import Footer from "@/components/Footer";
import DemoRequestModal from "@/components/DemoRequestModal";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import SEO, { organizationSchema } from "@/components/SEO";

export default function Home() {
    const [demoModalOpen, setDemoModalOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col overflow-x-hidden">
            <SEO
                title="AI-Powered Hotel Guest Communication"
                description="Transform your hotel operations with Roomie, the AI assistant that handles guest communications 24/7 in 100+ languages. Boost efficiency and guest satisfaction."
                structuredData={organizationSchema}
            />
            <Header onDemoClick={() => setDemoModalOpen(true)} />
            <main className="flex-grow">
                <Hero />
                <HowRoomieWorks />
                <IntegrationTicker />
                <BenefitsSection />
                <AIDashboardSection />
                <ROIEstimate />
                <PresentationSection />
            </main>
            <Footer />
            <DemoRequestModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
            <StickyMobileCTA />
        </div>
    );
}
