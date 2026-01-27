export interface IImage {
  /** Unique identifier of the image */
  uid: string
  /** Source of the image */
  src: string
  /** Alt text for the image */
  alt: string
  /** Caption for the image */
  caption: string

  name?: string // Optional name for the image, if applicable
  url?: string // Optional URL for the image, if it links to a page
}
