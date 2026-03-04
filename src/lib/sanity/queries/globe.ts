export const ALL_PINS_QUERY = `*[_type == "globePin" && approvalStatus == "approved"] {
  _id, title, category, latitude, longitude, locationName, country,
  "dateISO": date, authorName, excerpt,
  "coverImageUrl": coverImage.asset->url + "?w=600&h=400&fit=crop&auto=format",
  videoUrl,
  "relatedLinks": {
    "filmSlug": linkedFilm->slug.current,
    "journalSlug": linkedJournal->slug.current,
    productHandle, projectUrl
  },
  "connectedToId": connectedTo->_id,
  gearUsed
}`;

export const LATEST_PIN_QUERY = `*[
  _type == "globePin" && approvalStatus == "approved" && _createdAt > $since
] | order(_createdAt desc) [0] {
  _id, title, category, latitude, longitude, locationName,
  "coverImageUrl": coverImage.asset->url + "?w=200&h=200&fit=crop&auto=format"
}`;
