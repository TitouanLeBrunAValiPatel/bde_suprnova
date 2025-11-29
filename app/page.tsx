import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomePageContent } from "@/components/features/home/HomePageContent";
import { getUpcomingEvents, getPastEvents, getSettings, getTeamMembers, getActivePartners, getTexts } from "@/lib/data";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Accueil | BDE Sup'RNova",
  description:
    "Le Bureau des Étudiants de Sup de Vinci Rennes. Événements, partenaires, carte BDE et bien plus encore !",
};

export default async function HomePage() {
  const upcomingEvents = await getUpcomingEvents(6);
  const pastEvents = (await getPastEvents()).slice(0, 3);
  const settings = await getSettings();
  const team = await getTeamMembers();
  const partnersCount = (await getActivePartners()).length;
  const texts = await getTexts();

  return (
    <>
      <Header texts={texts} />
      <HomePageContent
        upcomingEvents={upcomingEvents}
        pastEvents={pastEvents}
        settings={settings}
        team={team}
        partnersCount={partnersCount}
        texts={texts}
      />
      <Footer />
    </>
  );
}
