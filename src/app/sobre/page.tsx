
'use client';

import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/common/header';
import { AppFooter } from '@/components/common/footer';
import LetterGlitch from '@/components/common/letter-glitch';
import ProfileCard from '@/components/common/ProfileCard';
import { Skeleton } from '@/components/ui/skeleton';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { convertImgurLink } from '@/lib/utils';
import { ContactSection } from '@/components/sections/contact';

interface AboutData {
    mainParagraph: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    profilePictureUrl: string;
}

export default function SobrePage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const docRef = doc(db, 'about', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data() as AboutData;
            setAboutData({
              ...data,
              profilePictureUrl: convertImgurLink(data.profilePictureUrl) || data.profilePictureUrl,
            });
        } else {
            console.log("No such document!");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Falha ao carregar os dados.');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
       <div className="fixed inset-0 -z-10">
        <LetterGlitch outerVignette={false} glitchColors={['#006400', '#004d00', '#003300']} />
      </div>
      <AppHeader />
      <main className="flex-1">
        <section id="about-page" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            {loading && (
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="flex justify-center items-center">
                  <Skeleton className="h-[80vh] w-full max-w-sm rounded-xl" />
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <Skeleton className="h-12 w-3/4" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-5/6" />
                  <div className="space-y-4 pt-4">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-4/5" />
                  </div>
                </div>
              </div>
            )}
            {error && <p className="text-destructive text-center">{error}</p>}
            {!loading && !error && aboutData && (
              <div className="grid gap-10 lg:grid-cols-2">
                <div className="flex justify-center items-center">
                   <ProfileCard
                      name="Diego Ruan"
                      title="Desenvolvedor"
                      handle="dieego_ruan"
                      status="Online"
                      contactText="Contato"
                      avatarUrl={aboutData.profilePictureUrl}
                      miniAvatarUrl={aboutData.profilePictureUrl}
                      showUserInfo={true}
                      enableTilt={true}
                      onContactClick={handleContactClick}
                    />
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">Sobre Mim</h1>
                    <p className="max-w-[600px] text-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      {aboutData.mainParagraph}
                    </p>
                  </div>
                  <div className="space-y-4 text-foreground">
                      <p>
                          {aboutData.paragraph1}
                      </p>
                      <p>
                          {aboutData.paragraph2}
                      </p>
                      <p>
                          {aboutData.paragraph3}
                      </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
        <ContactSection />
      </main>
      <AppFooter />
    </div>
  );
}
