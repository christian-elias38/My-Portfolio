import type { Profile } from '@prisma/client'

export type ProfileLinkKey = 'github' | 'linkedin' | 'email'

export interface ProfileLink {
  key: ProfileLinkKey
  label: string
  href: string
  external: boolean
}

const allKeys: ProfileLinkKey[] = ['github', 'linkedin', 'email']

export function getProfileLinks(
  profile: Profile | null,
  keys: ProfileLinkKey[] = allKeys,
): ProfileLink[] {
  if (!profile) return []

  const links: Record<ProfileLinkKey, ProfileLink | null> = {
    github: profile.github
      ? { key: 'github', label: 'GitHub', href: profile.github, external: true }
      : null,
    linkedin: profile.linkedin
      ? { key: 'linkedin', label: 'LinkedIn', href: profile.linkedin, external: true }
      : null,
    email: profile.email
      ? { key: 'email', label: 'Email', href: `mailto:${profile.email}`, external: false }
      : null,
  }

  return keys.map((key) => links[key]).filter((link): link is ProfileLink => link !== null)
}
