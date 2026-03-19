export const ALL_ROOMS_QUERY = `
  *[_type == "room"] | order(_createdAt asc) {
    _id,
    "id": slug.current,
    "slug": slug.current,
    name,
    concept,
    size,
    maxGuests,
    pricePerNight,
    pricePerMonth,
    securityDeposit,
    stayType,
    shortDescription,
    shortDescriptionVi,
    gradient,
    accentColor,
    amenities,
    isAvailable,
    pmsRoomId,
    "featuredImage": featuredImage.asset->url,
    featuredImageHotspot: featuredImage.hotspot
  }
`;

export const ROOM_BY_SLUG_QUERY = `
  *[_type == "room" && slug.current == $slug][0] {
    _id,
    "id": slug.current,
    "slug": slug.current,
    name,
    concept,
    tagline,
    size,
    maxGuests,
    bedType,
    pricePerNight,
    weekendPrice,
    pricePerMonth,
    securityDeposit,
    securityDepositNote,
    cleaningFee,
    stayType,
    shortDescription,
    shortDescriptionVi,
    description,
    descriptionVi,
    gradient,
    accentColor,
    amenities,
    isAvailable,
    pmsRoomId,
    "featuredImage": featuredImage.asset->url,
    featuredImageHotspot: featuredImage.hotspot,
    "gallery": gallery[].asset->url,
    seoTitle,
    seoDescription
  }
`;

export const ALL_POSTS_QUERY = `
  *[_type == "post" && isPublished == true] | order(publishedAt desc) {
    _id,
    "id": _id,
    "slug": slug.current,
    title,
    titleEn,
    excerpt,
    excerptEn,
    "category": categories[0]->title,
    "categoryEn": categories[0]->titleEn,
    readTime,
    publishedAt,
    isFeatured,
    gradient,
    "featuredImage": featuredImage.asset->url
  }
`;

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug && isPublished == true][0] {
    _id,
    "id": _id,
    "slug": slug.current,
    title,
    titleEn,
    excerpt,
    excerptEn,
    "category": categories[0]->title,
    "categoryEn": categories[0]->titleEn,
    "author": author->{ name, "image": image.asset->url },
    body,
    readTime,
    publishedAt,
    isFeatured,
    gradient,
    "featuredImage": featuredImage.asset->url,
    imageAlt,
    seoTitle,
    seoDescription,
    "relatedPosts": relatedPosts[]-> {
      "id": _id,
      "slug": slug.current,
      title,
      titleEn,
      excerpt,
      excerptEn,
      "category": categories[0]->title,
      "categoryEn": categories[0]->titleEn,
      readTime,
      publishedAt,
      gradient,
      "featuredImage": featuredImage.asset->url
    }
  }
`;

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0]
`;

export const ACTIVE_PROMO_CODES_QUERY = `
  *[_type == "promoCode" && isActive == true && validUntil > now()] {
    code,
    discountType,
    discountValue,
    minNights,
    validFrom,
    validUntil,
    maxUses,
    usedCount,
    "applicableRooms": applicableRooms[]->slug.current
  }
`;
