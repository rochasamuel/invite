// Invite codes: 4 letters or digits, typed in any case.
export const CODE_LENGTH = 4

export const normalizeCode = (raw) =>
  String(raw || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, CODE_LENGTH)
