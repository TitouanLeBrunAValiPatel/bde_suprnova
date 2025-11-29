import { signOut } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-brand-red">Admin BDE</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/events"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Événements
          </Link>
          <Link
            href="/admin/partners"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Partenaires
          </Link>
        </nav>
        <div className="p-4 border-t">
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant="outline" className="w-full">
              Déconnexion
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
