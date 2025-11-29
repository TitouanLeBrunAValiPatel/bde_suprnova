
import { prisma } from "@/lib/prisma";
import { Partner, Texts } from './schemas';
import { FALLBACK_TEXTS } from "./fallback-texts";

export async function getPartners() {
  try {
    return await prisma.partner.findMany({
      where: { active: true },
    })
  } catch (error) {
    console.error("Failed to fetch partners:", error);
    return [];
  }
}

export async function getEvents() {
  try {
    return await prisma.event.findMany({
      where: { published: true },
      orderBy: { date: 'asc' },
    })
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export async function getEventBySlug(slug: string) {
  try {
    return await prisma.event.findUnique({
      where: { slug },
    })
  } catch (error) {
    console.error(`Failed to fetch event with slug ${slug}:`, error);
    return null;
  }
}

export async function getTeamMembers() {
  try {
    return await prisma.teamMember.findMany({
      orderBy: { createdAt: 'asc' }, // Or any other order preference
    })
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return [];
  }
}

export async function getSettings() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: 1 },
    });

    if (!settings) {
      throw new Error("Settings not found");
    }
    return settings;
  } catch (error) {
    console.warn("Failed to fetch settings, using defaults:", error);
    return {
      id: 1,
      year: "2024-2025",
      shopUrl: "#",
      email: "contact@bde-sup-rnova.fr",
      instagram: "https://instagram.com/bde_suprnova",
      discord: "https://discord.gg/bde",
      linkedin: "https://linkedin.com/company/bde-sup-rnova",
      facebook: "https://facebook.com/bde-sup-rnova",
      association: "BDE Sup'RNova",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

export async function getUpcomingEvents(limit?: number) {
  try {
    return await prisma.event.findMany({
      where: {
        published: true,
        date: {
          gte: new Date(),
        },
      },
      orderBy: { date: 'asc' },
      take: limit,
    })
  } catch (error) {
    console.error("Failed to fetch upcoming events:", error);
    return [];
  }
}

export async function getPastEvents() {
  try {
    return await prisma.event.findMany({
      where: {
        published: true,
        date: {
          lt: new Date(),
        },
      },
      orderBy: { date: 'desc' },
    })
  } catch (error) {
    console.error("Failed to fetch past events:", error);
    return [];
  }
}

export async function getActivePartners(): Promise<Partner[]> {
  try {
    const partners = await prisma.partner.findMany({
      where: { active: true },
    })
    return partners as Partner[]
  } catch (error) {
    console.error("Failed to fetch active partners:", error);
    return [];
  }
}

function unflattenObject(data: { key: string; value: string }[]): any {
  const result: any = {};
  for (const item of data) {
    const keys = item.key.split('.');
    let current = result;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (i === keys.length - 1) {
        try {
          current[key] = JSON.parse(item.value);
        } catch {
          current[key] = item.value;
        }
      } else {
        current[key] = current[key] || {};
        current = current[key];
      }
    }
  }
  return result;
}

function deepMerge(target: any, source: any): any {
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && !Array.isArray(source[key]) && key in target) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

import { unstable_cache } from "next/cache";

export const getTexts = unstable_cache(
  async (): Promise<Texts> => {
    const { FALLBACK_TEXTS } = await import("./fallback-texts");
    
    try {
      const content = await prisma.siteContent.findMany();
      
      if (content.length === 0) {
        console.warn("No texts found in database, using fallback texts");
        return FALLBACK_TEXTS;
      }

      const dbTexts: any = {};
      
      // Group by section
      const bySection: Record<string, { key: string; value: string }[]> = {};
      for (const item of content) {
        if (!bySection[item.section]) {
          bySection[item.section] = [];
        }
        bySection[item.section].push({ key: item.key, value: item.value });
      }

      // Unflatten each section
      for (const [section, items] of Object.entries(bySection)) {
        dbTexts[section] = unflattenObject(items);
      }

      // Merge database texts with fallback to ensure all keys exist
      const mergedTexts = deepMerge(FALLBACK_TEXTS, dbTexts);
      return mergedTexts as Texts;
      
    } catch (error) {
      console.error("Failed to fetch texts from DB, using fallback:", error);
      return FALLBACK_TEXTS;
    }
  },
  ["site-texts"],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ["site-texts"],
  }
);
