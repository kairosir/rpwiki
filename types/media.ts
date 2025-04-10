export interface MediaFormat {
  name: string
  hash: string
  ext: string
  mime: string
  width: number
  height: number
  size: number
  url: string
}

export interface Media {
  id: number
  name: string
  alternativeText?: string
  caption?: string
  width: number
  height: number
  formats: {
    thumbnail?: MediaFormat
    small?: MediaFormat
    medium?: MediaFormat
    large?: MediaFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string
  provider: string
  createdAt: string
  updatedAt: string
} 