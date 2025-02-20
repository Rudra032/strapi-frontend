import { draftMode } from "next/headers";
import Link from "next/link";
import qs from "qs";


const fetchData = async () => {
    const { isEnabled } = await draftMode();

    const query = qs.stringify({

        status: isEnabled ? "draft" : "published",
        pagination: { page: 1, pageSize: 10 },
        sort: ["title:asc"]
      },{ encodeValuesOnly: true });
  const res = await fetch(`http://localhost:1337/api/articles?${query}&populate=cover`);
  const data = await res.json();
  return data?.data;
};

export default async function Page() {
  const articles = await fetchData();
  console.log("Articles", articles)
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Published Articles</h1>
        <p className="text-lg text-gray-600 mt-2">Explore our latest insights and stories</p>
      </section>

      <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {articles?.length > 0 ? (
          articles.map((article) => {
            const imageUrl = article?.cover?.formats?.small?.url
            ? `http://localhost:1337${article.cover.formats.small.url}`
            : "/placeholder.jpg"; 
            return(
            <div key={article.id} className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img
                src={imageUrl}
                alt={article?.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{article?.title}</h2>
                <p className="text-gray-700 text-sm line-clamp-2">{article?.description || "No description available."}</p>
                <div className="mt-4">
                  <Link
                    href={`/articles/${article?.slug}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          )})
        ) : (
          <p className="text-center text-gray-500 text-lg">No published articles available.</p>
        )}
      </section>
    </div>
  );
}
