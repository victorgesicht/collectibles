import { readStorage, removeStorage, writeStorage } from './storage'

const USERS_KEY = 'collectibles-ke:users:v1'
const SESSION_KEY = 'collectibles-ke:session:v1'
const PASSWORD_ITERATIONS = 150000

export const PASSWORD_REQUIREMENT =
  'Use at least 8 characters, including one letter and one number.'

export function isPasswordValid(password) {
  return (
    password.length >= 8 &&
    /[A-Za-z]/.test(password) &&
    /[0-9]/.test(password)
  )
}

function getCrypto() {
  if (!globalThis.crypto?.subtle || !globalThis.crypto?.getRandomValues) {
    throw new Error(
      'Secure local accounts are not available in this browser. Try a modern browser over HTTPS.',
    )
  }

  return globalThis.crypto
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join(
    '',
  )
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2)

  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16)
  }

  return bytes
}

function createSalt() {
  const bytes = new Uint8Array(16)
  getCrypto().getRandomValues(bytes)
  return bytesToHex(bytes)
}

function createId() {
  const crypto = getCrypto()

  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return bytesToHex(bytes)
}

async function derivePasswordHash(password, salt) {
  const encoder = new TextEncoder()
  const keyMaterial = await getCrypto().subtle.importKey(
    'raw',
    encoder.encode(password.normalize('NFKC')),
    'PBKDF2',
    false,
    ['deriveBits'],
  )
  const derivedBits = await getCrypto().subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: hexToBytes(salt),
      iterations: PASSWORD_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    256,
  )

  return bytesToHex(new Uint8Array(derivedBits))
}

function hashesMatch(left, right) {
  if (left.length !== right.length) return false

  let difference = 0

  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index)
  }

  return difference === 0
}

function getUsers() {
  const users = readStorage(USERS_KEY, [])
  return Array.isArray(users) ? users : []
}

function toPublicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  }
}

function normalizeEmail(email) {
  return email.trim().toLowerCase()
}

export function getSessionUser() {
  const userId = readStorage(SESSION_KEY, null)
  if (!userId) return null

  const user = getUsers().find((candidate) => candidate.id === userId)
  return user ? toPublicUser(user) : null
}

export async function createAccount({ name, email, password }) {
  const cleanName = name.trim().replace(/\s+/g, ' ')
  const cleanEmail = normalizeEmail(email)

  if (cleanName.length < 2) {
    throw new Error('Please enter your full name.')
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    throw new Error('Please enter a valid email address.')
  }

  if (!isPasswordValid(password)) {
    throw new Error(PASSWORD_REQUIREMENT)
  }

  const users = getUsers()

  if (users.some((user) => user.email === cleanEmail)) {
    throw new Error('An account with that email already exists.')
  }

  const salt = createSalt()
  const passwordHash = await derivePasswordHash(password, salt)
  const record = {
    id: createId(),
    name: cleanName,
    email: cleanEmail,
    salt,
    passwordHash,
    createdAt: new Date().toISOString(),
  }

  if (!writeStorage(USERS_KEY, [...users, record])) {
    throw new Error(
      'This browser could not save your account. Check that storage is enabled.',
    )
  }

  if (!writeStorage(SESSION_KEY, record.id)) {
    throw new Error(
      'This browser could not start your session. Check that storage is enabled.',
    )
  }

  return toPublicUser(record)
}

export async function authenticate({ email, password }) {
  const cleanEmail = normalizeEmail(email)
  const user = getUsers().find((candidate) => candidate.email === cleanEmail)
  const genericError = new Error('Email or password is incorrect.')

  if (!user) throw genericError

  const candidateHash = await derivePasswordHash(password, user.salt)

  if (!hashesMatch(candidateHash, user.passwordHash)) throw genericError

  if (!writeStorage(SESSION_KEY, user.id)) {
    throw new Error(
      'This browser could not start your session. Check that storage is enabled.',
    )
  }

  return toPublicUser(user)
}

export function signOut() {
  removeStorage(SESSION_KEY)
}
