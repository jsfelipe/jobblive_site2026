import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { segmentosData } from "./config/segmentos";
import { getSiteUrl } from "./lib/site";

function getStaticRoutes(dir: string, baseRoute = ""): string[] {
  const routes: string[] = [];
  const ignoreDirs = ["api", "components", "config", "lib"];
  const folderName = path.basename(dir);

  if (ignoreDirs.includes(folderName)) {
    return [];
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const isRouteGroup = file.startsWith("(") && file.endsWith(")");
      const nextBaseRoute = isRouteGroup ? baseRoute : `${baseRoute}/${file}`;
      routes.push(...getStaticRoutes(fullPath, nextBaseRoute));
    } else if (file.match(/^page\.(tsx|ts|jsx|js)$/)) {
      if (!baseRoute.includes("[") && !baseRoute.includes("]")) {
        routes.push(baseRoute === "" ? "/" : baseRoute);
      }
    }
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const appDirectory = path.join(process.cwd(), "app");
  const staticPaths = getStaticRoutes(appDirectory);

  const routes = staticPaths.map((routePath) => ({
    url: `${baseUrl}${routePath === "/" ? "" : routePath}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: routePath === "/" ? 1.0 : 0.8,
  }));

  const segmentoRoutes = Object.keys(segmentosData).map((slug) => ({
    url: `${baseUrl}/segmentos/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...segmentoRoutes];
}
