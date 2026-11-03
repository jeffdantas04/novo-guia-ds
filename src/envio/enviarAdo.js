export async function enviarParaADO(campos, config) {
  const { org, project, pat, workItemType } = config
  const type = workItemType || 'User Story'
  const url = `https://dev.azure.com/${encodeURIComponent(org)}/${encodeURIComponent(project)}/_apis/wit/workitems/$${encodeURIComponent(type)}?api-version=7.0`

  const body = [
    { op: 'add', path: '/fields/System.Title', value: campos.title },
    { op: 'add', path: '/fields/System.Description', value: campos.descricaoHtml },
    { op: 'add', path: '/fields/Microsoft.VSTS.Common.AcceptanceCriteria', value: campos.acHtml },
    { op: 'add', path: '/fields/System.Tags', value: campos.tags },
  ]

  const token = btoa(`:${pat}`)

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json-patch+json',
      'Authorization': `Basic ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    let msg = `HTTP ${res.status}`
    try {
      const err = await res.json()
      msg = err.message || err.typeKey || msg
    } catch {}
    throw new Error(msg)
  }

  return res.json()
}
