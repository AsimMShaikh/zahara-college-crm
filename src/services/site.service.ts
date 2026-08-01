import site from "@/data/site.json";

// Central contact configuration. This can later be supplied by the CMS.
export const siteService = {
  getWhatsAppUrl: () => site.whatsAppUrl,
  getInstagramUrl: () => site.instagramUrl,
  getPhone: () => site.phone,
  getEmail: () => site.email,
  getAddress: () => site.address,
  getGoogleMapsUrl: () => site.googleMapsUrl,
  getGoogleMapsEmbedUrl: () => {
    // Extract place ID or coordinates from the Google Maps URL
    // For now, use the address-based embed
    const address = encodeURIComponent(site.address.full);
    return `https://www.google.com/maps?q=${address}&output=embed`;
  }
};
