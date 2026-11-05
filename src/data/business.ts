/** Verified business details. Do not add anything here that has not been confirmed by NCAI. */
export const business = {
  legalName: "NCAI Consultorias e Serviços, EI",
  brandName: "NCAI",
  country: "Mozambique",
  countryCode: "MZ",
  email: "ncai.servicos@gmail.com",
  phoneDisplay: "+258 84 657 1529",
  phoneE164: "+258846571529",
  whatsappNumber: "258846571529",
} as const;

export const contactLinks = {
  email: `mailto:${business.email}`,
  phone: `tel:${business.phoneE164}`,
  whatsapp(text?: string) {
    const base = `https://wa.me/${business.whatsappNumber}`;
    return text ? `${base}?text=${encodeURIComponent(text)}` : base;
  },
};
