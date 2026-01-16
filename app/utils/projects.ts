import type { Project } from "~/types";

type UnknownRecord = Record<string, any>;

const getNested = (value: any, path: string[]): any => {
  return path.reduce((acc, key) => (acc ? acc[key] : undefined), value);
};

const buildImageUrl = (imageValue: any): string | null => {
  if (!imageValue) return null;

  // Handle Strapi-style image objects.
  const nestedUrl =
    getNested(imageValue, ["url"]) ??
    getNested(imageValue, ["data", "attributes", "url"]) ??
    getNested(imageValue, ["data", "url"]);

  if (typeof nestedUrl === "string") {
    return nestedUrl;
  }

  // Handle plain string paths (e.g. json-server or static assets).
  if (typeof imageValue === "string") {
    return imageValue;
  }

  return null;
};

const normalizeUrl = (value: any): string => {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

export const normalizeProject = (item: UnknownRecord): Project => {
  const source = (item?.attributes ?? item) as UnknownRecord;
  const image = buildImageUrl(source.image);

  return {
    id: String(item?.id ?? source.id ?? ""),
    documentId: String(source.documentId ?? item?.documentId ?? item?.id ?? ""),
    title: String(source.title ?? ""),
    description: String(source.description ?? ""),
    image: image ?? "",
    url: normalizeUrl(source.url),
    date: String(source.date ?? ""),
    category: String(source.category ?? ""),
    featured: Boolean(source.featured),
  };
};

export const extractProjects = (payload: any): Project[] => {
  const items =
    (Array.isArray(payload) && payload) ||
    (Array.isArray(payload?.data) && payload.data) ||
    (Array.isArray(payload?.projects) && payload.projects) ||
    [];

  return items.map((item: UnknownRecord) => normalizeProject(item));
};

export const extractProject = (payload: any): Project => {
  const item = payload?.data ?? payload?.project ?? payload ?? {};
  return normalizeProject(item as UnknownRecord);
};
