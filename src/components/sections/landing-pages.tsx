
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface LandingPage {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  result: string;
  aiHintBefore: string;
  aiHintAfter: string;
  status: 'Publicado' | 'Rascunho';
}

function LandingPageSkeleton() {
    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-24 mt-2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-56 w-full mt-4" />
            </CardContent>
        </Card>
    )
}


export function LandingPagesSection() {
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLandingPages = async () => {
      if (!db) return;
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "landingPages"));
        const pagesData = querySnapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() } as LandingPage))
            .filter(page => page.status === 'Publicado');
        setLandingPages(pagesData);
      } catch (error) {
        console.error("Error fetching landing pages: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingPages();
  }, []);

  return (
    <section id="landing-pages" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Galeria de Landing Pages</h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Exemplos de landing pages que criei, com foco em design e performance para conversão.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 pt-12 sm:grid-cols-1 lg:grid-cols-2">
          {loading ? (
             <>
                <LandingPageSkeleton />
                <LandingPageSkeleton />
             </>
          ) : (
            landingPages.map((page) => (
              <Card key={page.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{page.title}</CardTitle>
                  <CardDescription>{page.description}</CardDescription>
                  <Badge className="w-fit bg-secondary hover:bg-secondary/80">{page.result}</Badge>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="after" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="before">Antes</TabsTrigger>
                      <TabsTrigger value="after">Depois</TabsTrigger>
                    </TabsList>
                    <TabsContent value="before">
                      <Image src={page.beforeImage} alt={`Antes - ${page.title}`} width={600} height={400} className="rounded-md object-cover" data-ai-hint={page.aiHintBefore}/>
                    </TabsContent>
                    <TabsContent value="after">
                      <Image src={page.afterImage} alt={`Depois - ${page.title}`} width={600} height={400} className="rounded-md object-cover" data-ai-hint={page.aiHintAfter}/>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
