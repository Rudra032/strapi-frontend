import { fetchArticle } from "./fetchArticle";
import { draftMode } from "next/headers";

export default async function ArticlePage({ params }) {
  console.log("🔍 Params object in ArticlePage:", params);

  const { slug } = await params; 
  console.log("📝 Slug from params:", slug);

  const { isEnabled } = await draftMode();
  console.log("🟡 Draft Mode Enabled:", isEnabled);

  // ✅ Pass the awaited slug
  const article = await fetchArticle(slug);

  if (!article) {
    return <div>❌ Article not found</div>;
  }

  return (
    <>
      <article>
        <h1>{article.title}</h1>
        <div>{article.content}</div>
        {isEnabled && !article.publishedAt && (
          <div className="bg-yellow-100 p-2 rounded">
            Draft - Not published
          </div>
        )}
      </article>
    </>
  );
}