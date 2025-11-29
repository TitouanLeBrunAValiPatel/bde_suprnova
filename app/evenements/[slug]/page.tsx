import { notFound } from "next/navigation";
import Image from "next/image";
import { Hero } from "@/components/ui/Hero";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getEventBySlug, getEvents, getTexts } from "@/lib/data";
import { formatDateTimeRange } from "@/lib/utils";
import { getImageUrl } from "@/lib/image-url";

export async function generateStaticParams() {
  try {
    const events = await getEvents();
    return events.map((event) => ({
      slug: event.slug,
    }));
  } catch (error) {
    console.error("Failed to generate static params for events:", error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);

  if (!event) {
    return {
      title: "Événement introuvable",
    };
  }

  return {
    title: `${event.title} | BDE Sup'RNova`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  const texts = await getTexts();

  if (!event) {
    notFound();
  }

  const isPast = new Date(event.date) < new Date();

  return (
    <>
      <Header texts={texts} />
      <main className="min-h-screen bg-gray-50 pt-20">
        <Section className="pt-8 pb-16">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-64 md:h-96 w-full">
              {event.cover ? (
                <Image
                  src={getImageUrl(event.cover)}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-4xl">📅</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            <div className="p-8 md:p-12">
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="yellow">
                    {tag}
                  </Badge>
                ))}
                {isPast && <Badge variant="default">Terminé</Badge>}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold font-spartan mb-6">{event.title}</h1>

              <div className="flex flex-col sm:flex-row gap-6 mb-8 text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📅</span>
                  <div>
                    <div className="font-semibold">Date</div>
                    <div>{formatDateTimeRange(event.date, event.endDate)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  <div>
                    <div className="font-semibold">Lieu</div>
                    <div>{event.place}</div>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <h2 className="text-2xl font-bold font-spartan mb-4">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
              </div>

              {event.ticketUrl && !isPast && (
                <div className="bg-grad-secondary p-6 rounded-xl text-center">
                  <h3 className="text-2xl font-bold font-spartan text-white mb-4">
                    Réservez votre place !
                  </h3>
                  <Button
                    href={event.ticketUrl}
                    variant="cta"
                    className="bg-white text-brand-red hover:bg-white/90"
                  >
                    Accéder à la billetterie
                  </Button>
                </div>
              )}

              {event.photosUrl && (
                <div className="mt-6 bg-brand-pale/40 p-6 rounded-xl text-center">
                  <h3 className="text-xl font-bold font-spartan text-brand-red mb-3">
                    📸 Galerie photos
                  </h3>
                  <a
                    href={event.photosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={texts.home.past.photos}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-brand-red hover:bg-brand-pale shadow"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" />
                      <path d="M20 6h-2.586l-1.121-1.121A2 2 0 0015.172 4H8.828a2 2 0 00-1.414.586L6.293 6H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2zm0 12H4V8h3.172l1.414-1.414c.188-.188.442-.293.707-.293h6.414c.265 0 .52.105.707.293L16.828 8H20v10z" />
                    </svg>
                  </a>
                </div>
              )}

              <div className="mt-8 text-center">
                <Button href="/#evenements" variant="outline">
                  ← Retour aux événements
                </Button>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
