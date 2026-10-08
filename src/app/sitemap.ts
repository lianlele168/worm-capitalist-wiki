import type { MetadataRoute } from "next";
import { routes, site } from "@/data/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap { return routes.map(path => ({ url: site.baseUrl + path })); }
