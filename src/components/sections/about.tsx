
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import ProfileCard from '../common/ProfileCard';
import '@/components/common/ProfileCard.css';
import { Skeleton } from '@/components/ui/skeleton';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface AboutData {
    mainParagraph: string;
    profilePictureUrl: string;
}

export function AboutSection() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const docRef = doc(db, 'about', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAboutData(docSnap.data() as AboutData);
        }
      } catch (error) {
        console.error("Failed to fetch about data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-card">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Um Pouco Sobre Mim</h2>
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-4/5" />
                  </div>
                ) : (
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      {aboutData?.mainParagraph}
                  </p>
                )}
                <Button asChild>
                    <Link href="/sobre">
                        Saber Mais <MoveRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
             <div className="flex justify-center items-center">
                {loading ? (
                  <Skeleton className="h-[80vh] w-full max-w-sm rounded-xl" />
                ) : (
                  <ProfileCard
                    avatarUrl={aboutData?.profilePictureUrl || "https://placehold.co/600x800.png"}
                    name="Diego Ruan"
                    title="Desenvolvedor"
                    showUserInfo={false}
                    className="w-full max-w-sm"
                  />
                )}
              </div>
        </div>
      </div>
    </section>
  );
}
