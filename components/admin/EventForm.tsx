"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createEvent, updateEvent } from "@/lib/actions-events";

const eventSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  slug: z.string().min(3, "Le slug est requis"),
  date: z.string(),
  place: z.string().min(3, "Le lieu est requis"),
  description: z.string().min(10, "La description doit être plus détaillée"),
  ticketUrl: z.string().url().optional().or(z.literal("")),
  published: z.boolean().optional(),
});

type EventFormValues = z.infer<typeof eventSchema>;

interface EventFormProps {
  initialData?: any;
}

export function EventForm({ initialData }: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData || {
      title: "",
      slug: "",
      date: new Date().toISOString().split("T")[0],
      place: "",
      description: "",
      ticketUrl: "",
      published: false,
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    formData.append("date", data.date);
    formData.append("place", data.place);
    formData.append("description", data.description);
    if (data.ticketUrl) formData.append("ticketUrl", data.ticketUrl);
    if (data.published) formData.append("published", "on");
    
    // Handle file upload manually since react-hook-form doesn't handle FileList directly well with Zod
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      formData.append("cover", fileInput.files[0]);
    }

    try {
      if (initialData) {
        await updateEvent(initialData.slug, formData);
      } else {
        await createEvent(formData);
      }
      // Redirect is handled in server action
    } catch (e) {
      setError("Une erreur est survenue.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            {...form.register("title")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
          />
          {form.formState.errors.title && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Slug (URL)</label>
          <input
            {...form.register("slug")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
          />
          {form.formState.errors.slug && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.slug.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            {...form.register("date")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lieu</label>
          <input
            {...form.register("place")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image de couverture</label>
        <input
          type="file"
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-red file:text-white hover:file:bg-brand-red/90"
        />
        {initialData && (
            <p className="text-xs text-gray-500 mt-1">Laisser vide pour conserver l&apos;image actuelle.</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...form.register("description")}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Lien Billetterie</label>
        <input
          {...form.register("ticketUrl")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...form.register("published")}
          id="published"
          className="h-4 w-4 text-brand-red focus:ring-brand-red border-gray-300 rounded"
        />
        <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
          Publier l&apos;événement
        </label>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
