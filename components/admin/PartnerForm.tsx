"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPartner, updatePartner } from "@/lib/actions-partners";

const partnerSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  category: z.string().min(2, "La catégorie est requise"),
  city: z.string().min(2, "La ville est requise"),
  website: z.string().url().optional().or(z.literal("")),
  address: z.string().optional(),
  conditions: z.string().optional(),
  active: z.boolean().optional(),
  advantages: z.string().optional(), // We'll handle splitting by newline/comma manually
});

type PartnerFormValues = z.infer<typeof partnerSchema>;

interface PartnerFormProps {
  initialData?: any;
}

export function PartnerForm({ initialData }: PartnerFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          advantages: initialData.advantages.join("\n"), // Join array to string for textarea
        }
      : {
          name: "",
          category: "",
          city: "",
          website: "",
          address: "",
          conditions: "",
          active: true,
          advantages: "",
        },
  });

  const onSubmit = async (data: PartnerFormValues) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("city", data.city);
    if (data.website) formData.append("website", data.website);
    if (data.address) formData.append("address", data.address);
    if (data.conditions) formData.append("conditions", data.conditions);
    if (data.active) formData.append("active", "on");
    if (data.advantages) formData.append("advantages", data.advantages);

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files[0]) {
      formData.append("logo", fileInput.files[0]);
    }

    try {
      if (initialData) {
        await updatePartner(initialData.id, formData);
      } else {
        await createPartner(formData);
      }
    } catch (e) {
      setError("Une erreur est survenue.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input
            {...form.register("name")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Catégorie</label>
          <input
            {...form.register("category")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
          />
          {form.formState.errors.category && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ville</label>
          <input
            {...form.register("city")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
          />
          {form.formState.errors.city && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Site Web</label>
          <input
            {...form.register("website")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Adresse</label>
        <input
          {...form.register("address")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Logo</label>
        <input
          type="file"
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-red file:text-white hover:file:bg-brand-red/90"
        />
        {initialData && (
            <p className="text-xs text-gray-500 mt-1">Laisser vide pour conserver le logo actuel.</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Avantages (un par ligne)</label>
        <textarea
          {...form.register("advantages")}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
          placeholder="- 10% sur tout le magasin&#10;- Un verre offert"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Conditions</label>
        <textarea
          {...form.register("conditions")}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-red focus:ring-brand-red sm:text-sm p-2 border"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          {...form.register("active")}
          id="active"
          className="h-4 w-4 text-brand-red focus:ring-brand-red border-gray-300 rounded"
        />
        <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
          Partenaire Actif
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
