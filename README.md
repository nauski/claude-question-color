# question-color

A Claude Code mod that draws the lines of Claude's replies that ask you something in bold yellow (the theme's warning color), so a question buried in long prose stands out when you run several sessions.

A line counts as a question when it starts with `Q:` or has a sentence ending in `?`. A `?` inside inline code or a URL query does not count. Lines inside code fences are skipped. Only the drawing changes; the stored message stays as written (ctrl+o shows it).

Tip: add this to your CLAUDE.md so questions always land on their own line:

> When you need a decision from me, put it on its own line at the end of the turn, starting with `Q:`.

## Install

At the prompt of a terminal session:

```
/plugin install question-color --marketplace nauski/claude-question-color
```

From a shell:

```
claude plugin install question-color --marketplace nauski/claude-question-color
```

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `nauski/claude-question-color`, then Add plugin.
