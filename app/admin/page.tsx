export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p className="text-gray-600">Bienvenue sur l&apos;interface d&apos;administration du BDE.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Événements</h3>
          <p className="text-gray-500 mb-4">Gérer les événements du BDE.</p>
          <a href="/admin/events" className="text-brand-red hover:underline">Gérer &rarr;</a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Partenaires</h3>
          <p className="text-gray-500 mb-4">Gérer les partenaires et avantages.</p>
          <a href="/admin/partners" className="text-brand-red hover:underline">Gérer &rarr;</a>
        </div>
      </div>
    </div>
  );
}
