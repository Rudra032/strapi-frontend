import { draftMode } from "next/headers";
import qs from "qs";

export async function fetchArticle(slug) {
  const { isEnabled } = await draftMode(); // ❌ No need for await
  const query = qs.stringify({
    filters: { 
      slug: { $eq: slug },
    },
    status: isEnabled ? "draft" : "published",
    pagination: { page: 1, pageSize: 10 },
    sort: ["title:asc"]
  },{ encodeValuesOnly: true });



  const response = await fetch(`http://localhost:1337/api/articles?${query}`);
  const data = await response.json();
  return data?.data?.[0] || null;
}
