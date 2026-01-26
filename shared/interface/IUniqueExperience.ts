export interface IUniqueExperience {
  /** Unique identifier of the experience */
  uid: string;
  /** Name of the experience */
  name: string;
  /** Summary of the experience */
  summary: string;
  /** List of banner image file names */
  bannerList: string[];
}

export interface IUniqueExperienceCategory {
  /** Unique identifier of the category */
  uid: string;
  /** Banner image file name for the category */
  bannerName: string;
  /** Name of the category */
  name: string;
}

export interface IUniqueExperienceDetail {
  /** Unique identifier of the experience detail */
  uid: string;
  /** Name of the experience detail */
  name: string;
  /** Summary of the experience detail */
  summary: string;
  /** List of banner image file names */
  bannerList: string[];
  /** Countries associated with this unique experience detail */
  countries: {
    /** Banner image file name for the country */
    bannerName: string;
    /** Name of the country */
    name: string;
    /** Unique identifier of the country */
    uid: string;
  };
  /** Category of the experience detail */
  category: string;
}
