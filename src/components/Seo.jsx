import { useEffect } from "react";
import logo from "../assets/RDS Logo final_V04.png";
import studioData from "../data/studioData";

const SITE_URL = "https://realdimensionstudio.com";

function absoluteUrl(path) {
  const origin = typeof window !== "undefined" ? window.location.origin : SITE_URL;
  return new URL(path, origin).href;
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      element.setAttribute(key, value);
    }
  });
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export default function Seo({ title, description, path = "/", schema = [] }) {
  const { studio } = studioData;
  const canonicalUrl = absoluteUrl(path);
  const logoUrl = absoluteUrl(logo);
  const pageTitle = title || studio.seo.title;
  const pageDescription = description || studio.seo.description;

  useEffect(() => {
    document.title = pageTitle;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: pageDescription,
    });
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    });
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: pageTitle,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: pageDescription,
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: studio.name,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: logoUrl,
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: pageTitle,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: pageDescription,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: logoUrl,
    });
    upsertLink("canonical", canonicalUrl);
    upsertLink("icon", logoUrl);
    upsertLink("apple-touch-icon", logoUrl);
  }, [canonicalUrl, logoUrl, pageDescription, pageTitle, studio.name]);

  const socialProfiles = [
    studio.socialProfiles?.instagram,
    studio.socialProfiles?.linkedin,
    studio.socialProfiles?.imdb,
    studio.instagram,
    studio.linkedin,
    studio.owner?.imdb,
  ].filter(Boolean);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: studio.legalName || studio.name,
    url: SITE_URL,
    logo: logoUrl,
    description: studio.description || pageDescription,
    founder: {
      "@type": "Person",
      name: studio.owner?.name || "Ravi Jadaun",
    },
    sameAs: socialProfiles,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: studio.email,
      telephone: studio.phone,
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: studio.owner?.name || "Ravi Jadaun",
    jobTitle: studio.owner?.title || "Founder, VFX Supervisor & Producer",
    worksFor: {
      "@type": "Organization",
      name: studio.name,
      url: SITE_URL,
    },
    sameAs: [studio.owner?.imdb, studio.instagram, studio.linkedin].filter(Boolean),
  };

  const payload = [organizationSchema, personSchema, ...schema];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload),
      }}
    />
  );
}