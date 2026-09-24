import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AcademyIntro } from '../components/home/AcademyIntro';
import { FeaturedCourses } from '../components/home/FeaturedCourses';
import { PopularCourses } from '../components/home/PopularCourses';
import { UpcomingBatches } from '../components/home/UpcomingBatches';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { FacultyHighlights } from '../components/home/FacultyHighlights';
import { Testimonials } from '../components/home/Testimonials';
import { AchievementsStats } from '../components/home/AchievementsStats';
import { Certifications } from '../components/home/Certifications';
import { UpcomingEvents } from '../components/home/UpcomingEvents';
import { BlogNews } from '../components/home/BlogNews';
import { CallToAction } from '../components/home/CallToAction';
import { ContactInfo } from '../components/home/ContactInfo';

export function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <AcademyIntro />
      <FeaturedCourses />
      <PopularCourses />
      <UpcomingBatches />
      <WhyChooseUs />
      <FacultyHighlights />
      <Testimonials />
      <AchievementsStats />
      <Certifications />
      <UpcomingEvents />
      <BlogNews />
      <CallToAction />
      <ContactInfo />
    </main>
  );
}
