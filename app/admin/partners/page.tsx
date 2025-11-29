import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { getImageUrl } from "@/lib/image-url";

// Removed local pool/adapter/prisma init

export default async function PartnersPage() {
  const partners = await prisma.partner.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Partenaires</h2>
        <Link href="/admin/partners/new">
          <Button>Nouvel Partenaire</Button>
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Logo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ville
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {partners.map((partner) => (
              <tr key={partner.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative h-10 w-16">
                    {partner.logo ? (
                      <Image
                        src={getImageUrl(partner.logo)}
                        alt={partner.name}
                        fill
                        className="object-contain rounded"
                      />
                    ) : (
                      <div className="h-10 w-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                        No Logo
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {partner.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{partner.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{partner.city}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      partner.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {partner.active ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/partners/${partner.id}`}
                    className="text-brand-red hover:text-brand-red/80 mr-4"
                  >
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
