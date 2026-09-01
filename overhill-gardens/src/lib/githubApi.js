export async function getFileContent({ token, path }) {
  const url = `${API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`
  const res = await fetch(url, { headers: authHeaders(token) })
  if (!res.ok) throw new Error(`Could not read ${path} (status ${res.status})`)
  const data = await res.json()
  const content = decodeURIComponent(escape(atob(data.content.replace(/\n/g, ''))))
  return { content, sha: data.sha }
}

export async function commitBinaryFile({ token, path, base64Content, message }) {
  const url = `${API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`

  let sha
  const getRes = await fetch(`${url}?ref=${GITHUB_BRANCH}`, { headers: authHeaders(token) })
  if (getRes.ok) sha = (await getRes.json()).sha
  else if (getRes.status !== 404) throw new Error(`Could not check existing file (status ${getRes.status})`)

  const body = {
    message,
    content: base64Content,
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
    throw new Error(errBody.message || `GitHub rejected the upload (status ${putRes.status})`)
  }

  return putRes.json()
}