import { GITHUB_OWNER, GITHUB_REPO, GITHUB_BRANCH } from '../config/github'

const API_BASE = 'https://api.github.com'

function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
  }
}

export async function validateStaffToken(token) {
  const res = await fetch(`${API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}`, {
    headers: authHeaders(token),
  })

  if (res.status === 401) {
    return { ok: false, message: 'That token was rejected by GitHub. Double-check you copied the whole thing.' }
  }
  if (res.status === 404) {
    return { ok: false, message: "Token is valid, but can't see this repository. Make sure it's scoped to Overhill-Gardens-Website." }
  }
  if (!res.ok) {
    return { ok: false, message: `GitHub returned an error (${res.status}). Please try again.` }
  }

  const repoData = await res.json()
  if (!repoData.permissions?.push) {
    return { ok: false, message: "This token doesn't have write access. Ask to be added as a repo collaborator." }
  }

  const userRes = await fetch(`${API_BASE}/user`, { headers: authHeaders(token) })
  const userData = userRes.ok ? await userRes.json() : null

  return { ok: true, username: userData?.login || 'Staff' }
}

export async function commitFile({ token, path, content, message }) {
  const url = `${API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`

  let sha
  const getRes = await fetch(`${url}?ref=${GITHUB_BRANCH}`, { headers: authHeaders(token) })
  if (getRes.ok) {
    sha = (await getRes.json()).sha
  } else if (getRes.status !== 404) {
    throw new Error(`Could not read the current file (status ${getRes.status})`)
  }

  const body = {
    message,
    content: btoa(unescape(encodeURIComponent(content))), // UTF-8 safe base64
    branch: GITHUB_BRANCH,
    ...(sha ? { sha } : {}),
  }

  const putRes = await fetch(url, {
    method: 'PUT',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!putRes.ok) {
    const errBody = await putRes.json().catch(() => ({}))
    throw new Error(errBody.message || `GitHub rejected the update (status ${putRes.status})`)
  }

  return putRes.json()
}