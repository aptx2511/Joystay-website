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
    weekendPrice,
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
    "featuredImage": coalesce(
      featuredImage.asset->url,
      galleryBedroom[0].asset->url,
      galleryLiving[0].asset->url,
      galleryBathroom[0].asset->url,
      galleryOther[0].asset->url
    ),
    "featuredImageHotspot": featuredImage.hotspot,
    // Ảnh vuốt ngang trong khối phòng trên trang chủ (tối đa ~6 ảnh)
    "galleryPreview": [
      ...coalesce(galleryLiving[0..1].asset->url, []),
      ...coalesce(galleryBedroom[0..1].asset->url, []),
      ...coalesce(galleryKitchen[0..0].asset->url, []),
      ...coalesce(galleryBathroom[0..0].asset->url, []),
      ...coalesce(galleryOther[0..0].asset->url, [])
    ]
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
    "featuredImage": coalesce(
      featuredImage.asset->url,
      galleryBedroom[0].asset->url,
      galleryLiving[0].asset->url,
      galleryBathroom[0].asset->url,
      galleryOther[0].asset->url
    ),
    "featuredImageHotspot": featuredImage.hotspot,
    "gallery": {
      "bedroom":  galleryBedroom[]{ "url": asset->url, "alt": alt, "hotspot": hotspot },
      "living":   galleryLiving[]{ "url": asset->url, "alt": alt, "hotspot": hotspot },
      "kitchen":  galleryKitchen[]{ "url": asset->url, "alt": alt, "hotspot": hotspot },
      "bathroom": galleryBathroom[]{ "url": asset->url, "alt": alt, "hotspot": hotspot },
      "other":    galleryOther[]{ "url": asset->url, "alt": alt, "hotspot": hotspot }
    },
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
    "featuredImage": coalesce(featuredImage.asset->url, body[_type == "image"][0].asset->url)
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
    body[]{
      ...,
      _type == "image" => { ..., "url": asset->url, "dims": asset->metadata.dimensions },
      markDefs[]{ ... }
    },
    "bodyEn": bodyEn[]{
      ...,
      _type == "image" => { ..., "url": asset->url, "dims": asset->metadata.dimensions },
      markDefs[]{ ... }
    },
    readTime,
    publishedAt,
    isFeatured,
    gradient,
    "featuredImage": coalesce(featuredImage.asset->url, body[_type == "image"][0].asset->url),
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
      "featuredImage": coalesce(featuredImage.asset->url, body[_type == "image"][0].asset->url)
    }
  }
`;

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    phone,
    email,
    address,
    zaloLink,
    messengerLink,
    googleMapsUrl,
    facebookUrl,
    instagramUrl,
    airbnbUrl,
    bankName,
    bankAccountName,
    bankAccountNumber,
    "bankQRImageUrl": bankQRImage.asset->url,
    defaultSeoTitle,
    defaultSeoDescription,
    "heroBackground": {
      "type": heroBackground.type,
      "imageUrl": heroBackground.image.asset->url,
      "imageHotspot": heroBackground.image.hotspot,
      "videoUrl": heroBackground.video.asset->url,
      "overlayOpacity": coalesce(heroBackground.overlayOpacity, 60)
    }
  }
`;

export const REVIEWS_QUERY = `
  *[_type == "review" && isPublished == true && isFeatured == true]
  | order(sortOrder asc, _createdAt desc) {
    _id,
    guestName,
    flag,
    country,
    rating,
    text,
    textVi,
    stayType,
    roomName,
    source,
    stayDate,
  }
`;

export const ACTIVE_PROMO_CODES_QUERY = `
  *[_type == "promoCode" && isActive == true && validUntil > now() && (!defined(validFrom) || validFrom <= now())] {
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
