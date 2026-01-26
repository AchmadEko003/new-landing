import type {
  ICountry,
  ICountryDetail,
  ICountryFavoriteLocation,
  ICountryTrip,
  ICountryUniqueExperience,
} from "~~/shared/interface/ICountry";
import type { IImage } from "~~/shared/interface/IImage";
import type { ITripCard } from "~~/shared/interface/ITrip";

export const convertToImage = (payload: ICountry[] | undefined) => {
  const result: IImage[] = [];

  if (payload) {
    payload.forEach((item: ICountry) => {
      result.push({
        uid: item.uid || "",
        src: item.imageName ? `/country/${item.imageName}.jpeg` : "",
        alt: item.name,
        caption: item.name,
        url: `/destinasi-populer/${encodeURIComponent(item.name.trim().replace(/\s+/g, "-").toLowerCase())}_${item.uid}`,
        name: item.name,
      });
    });
  }

  return result;
};

export const reformattedCountryDetail = (payload: ICountryDetail) => {
  let countryTrip: ITripCard[] = [];
  let favoriteLocation: IImage[] = [];
  let uniqueExperience: IImage[] = [];

  if (payload) {
    if (payload.trip && payload.trip.length > 0) {
      countryTrip = convertToImageCountryTrip(payload.trip);
    }

    if (payload.favoriteLocations && payload.favoriteLocations.length > 0) {
      favoriteLocation = convertToImageFavoriteLocation(
        payload.favoriteLocations,
      );
    }

    if (payload.uniqueExperience && payload.uniqueExperience.length > 0) {
      uniqueExperience = convertToImageCountryUniqueExperience(
        payload.uniqueExperience,
      );
    }
  }

  return { trip: countryTrip, favoriteLocation, uniqueExperience };
};

const convertToImageFavoriteLocation = (
  payload: ICountryFavoriteLocation[] | undefined,
) => {
  if (payload) {
    return payload.map((item: ICountryFavoriteLocation) => ({
      uid: item.uid || "",
      src: item.bannerImages?.[0]
        ? `/favorite-location/512_${item.bannerImages[0]}.webp`
        : "",
      alt: item.bannerImages?.[0] || "",
      caption: item.name,
      name: item.name,
      url: `/tempat-favorite/${encodeURIComponent(item.name.trim().replace(/\s+/g, "-").toLowerCase())}_${item.uid}`,
    })) as IImage[];
  }

  return [] as IImage[];
};

const convertToImageCountryTrip = (
  payload: ICountryTrip[] | undefined,
): ITripCard[] => {
  if (payload) {
    return payload.map((trip: ICountryTrip) => ({
      imageSrc: trip.tripBanner[0] || "",
      title: trip.name,
      days: trip.days.toString(),
      summary: trip.summary,
      startPrice: trip.startPrice ?? 0,
      url: `/trip/${trip.uid}`,
      tripId: trip.uid,
    })) as ITripCard[];
  }

  return [] as ITripCard[];
};

const convertToImageCountryUniqueExperience = (
  payload: ICountryUniqueExperience[] | undefined,
) => {
  if (payload) {
    return payload.map((item: ICountryUniqueExperience) => ({
      uid: item.uid || "",
      src: item.bannerImages?.[0]
        ? `/unique-experience/512_${item.bannerImages[0]}.webp`
        : "",
      alt: item.name,
      caption: item.name,
      url: `/pengalaman-unik/${encodeURIComponent(item.name.trim().replace(/\s+/g, "-").toLowerCase())}_${item.uid}`,
      name: item.name,
    })) as IImage[];
  }

  return [] as IImage[];
};
