const convertToImage = (payload) => {
  const result = [];
  if (payload) {
    payload.forEach((item) => {
      result.push({
        uid: item.uid || "",
        src: item.imageName ? `/country/${item.imageName}.jpeg` : "",
        alt: item.name,
        caption: item.name,
        url: `/destinasi-populer/${encodeURIComponent(item.name.trim().replace(/\s+/g, "-").toLowerCase())}_${item.uid}`,
        name: item.name
      });
    });
  }
  return result;
};
const reformattedCountryDetail = (payload) => {
  let countryTrip = [];
  let favoriteLocation = [];
  let uniqueExperience = [];
  if (payload) {
    if (payload.trip && payload.trip.length > 0) {
      countryTrip = convertToImageCountryTrip(payload.trip);
    }
    if (payload.favoriteLocations && payload.favoriteLocations.length > 0) {
      favoriteLocation = convertToImageFavoriteLocation(
        payload.favoriteLocations
      );
    }
    if (payload.uniqueExperience && payload.uniqueExperience.length > 0) {
      uniqueExperience = convertToImageCountryUniqueExperience(
        payload.uniqueExperience
      );
    }
  }
  return { trip: countryTrip, favoriteLocation, uniqueExperience };
};
const convertToImageFavoriteLocation = (payload) => {
  if (payload) {
    return payload.map((item) => ({
      uid: item.uid || "",
      src: item.bannerImages?.[0] ? `/favorite-location/512_${item.bannerImages[0]}.webp` : "",
      alt: item.bannerImages?.[0] || "",
      caption: item.name,
      name: item.name,
      url: `/tempat-favorite/${encodeURIComponent(item.name.trim().replace(/\s+/g, "-").toLowerCase())}_${item.uid}`
    }));
  }
  return [];
};
const convertToImageCountryTrip = (payload) => {
  if (payload) {
    return payload.map((trip) => ({
      imageSrc: trip.tripBanner[0] || "",
      title: trip.name,
      days: trip.days.toString(),
      summary: trip.summary,
      startPrice: trip.startPrice ?? 0,
      url: `/trip/${trip.uid}`,
      tripId: trip.uid
    }));
  }
  return [];
};
const convertToImageCountryUniqueExperience = (payload) => {
  if (payload) {
    return payload.map((item) => ({
      uid: item.uid || "",
      src: item.bannerImages?.[0] ? `/unique-experience/512_${item.bannerImages[0]}.webp` : "",
      alt: item.name,
      caption: item.name,
      url: `/pengalaman-unik/${encodeURIComponent(item.name.trim().replace(/\s+/g, "-").toLowerCase())}_${item.uid}`,
      name: item.name
    }));
  }
  return [];
};

export { convertToImage as c, reformattedCountryDetail as r };
//# sourceMappingURL=formatToImage-C5UWELI9.mjs.map
