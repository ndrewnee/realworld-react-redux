export interface Profile {
  username: string
  bio: string | null
  image: string | null
  following: boolean
}

export interface ProfileResponse {
  profile: Profile
}
