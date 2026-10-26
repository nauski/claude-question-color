import type { Register } from 'claude-code'

// ponytail: line heuristic, "Q:" prefix or a "?" ending any sentence on the
// line, outside code fences and inline code
export const isQuestion = (line: string) => {
  const t = line.replace(/`[^`]*`/g, '').trim().replace(/^[>*\-#\s]+/, '')
  return /^[>*\-#\s`]*Q:/.test(line) || /\?[`*_)"']*(\s|$)/.test(t)
}

type Seg = { q: boolean; text: string }

export const split = (text: string): Seg[] => {
  const segs: Seg[] = []
  let fence = false
  for (const line of text.split('\n')) {
    if (line.trim().startsWith('```')) fence = !fence
    const q = !fence && isQuestion(line)
    const last = segs[segs.length - 1]
    if (last && last.q === q && !q) last.text += '\n' + line
    else segs.push({ q, text: line })
  }
  return segs
}

export const register: Register = on => {
  on('ui.render', { component: 'AssistantMessage' }, ($, e, next) => {
    if (e.props.isSummary) return next(e)
    const segs = split(e.props.text)
    if (!segs.some(s => s.q)) return next(e)

    const { Box, Text, Markdown } = $.ui.resolve(e)
    return (
      <Box flexDirection="column">
        {segs.map((s, i) =>
          s.q ? (
            <Text key={String(i)} color="warning" bold>
              {s.text.replace(/`/g, '')}
            </Text>
          ) : (
            <Markdown key={String(i)} text={s.text} />
          ),
        )}
      </Box>
    )
  })
}
