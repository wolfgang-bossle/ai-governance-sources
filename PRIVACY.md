# AI Governance Sources: Privacy Policy

## Scope

This policy describes the AI Governance Sources plugin provided by Bossle CPA
for use with compatible Claude, ChatGPT or Codex hosts.

The plugin provides shared research instructions and two source-access paths.
ChatGPT and Codex use the bundled local stdio MCP server. At startup, it
retrieves a release file, source metadata, legal texts and curated entries
over HTTPS from raw.githubusercontent.com/wolfgang-bossle/ai-governance-sources.
It verifies the files and keeps one source commit in memory for its lifetime.

Claude uses the AI host's existing HTTPS tools to read the release, source catalog
and selected Markdown files from the same repository and one pinned source
commit. It does not connect to or start the bundled MCP server. Source texts
are not bundled in the distributed plugin. The local MCP maintains no
persistent source cache; Claude may hold downloaded files in its session workspace under the host's policies.

This policy describes the plugin's own data handling. Processing by the AI host
is governed separately by its applicable terms, settings and workspace controls.

## Personal data and purposes

Ask general research questions. Do not submit personal, confidential or
privileged information, including names, contact details, identification numbers
or credentials.

The skill instructs the model to exclude such information from tool inputs and
answers. This is an instruction to the model, not an automated redaction
guarantee. It does not remove information already entered into the conversation.

The local MCP server processes search terms, provision references, language
preferences and pagination values to search and retrieve verified source content.
Its HTTPS requests use fixed source paths. They do not contain tool parameters,
conversation text or answers and do not use a GitHub account or access token.

For direct retrieval in Claude, the skill instructs the host to use only the
release, catalog and listed source-file URLs, without URL query parameters,
search terms, conversation text or answers. This is a model instruction, not
an automated network filter. The selected paths can identify the source
language and chapter consulted. No GitHub login or access token is required.

The plugin has no mechanism for collecting your input or answers for Bossle CPA
and does not use them for advertising, profiling or analytics.

## Recipients

In ChatGPT and Codex, the AI host sends tool parameters to the local MCP
server and receives source content. In Claude, the host's native HTTPS capability
retrieves source content directly. The host processes the conversation,
tool calls and retrieved content under its applicable privacy terms,
product settings and workspace controls.

GitHub receives source-download requests, their file paths and connection
information such as the requesting IP address and request times. For Claude,
this may be the address of the host's retrieval service. Its processing is described in
the [GitHub General Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
The local MCP does not send tool inputs or answers to GitHub or Bossle CPA.
Claude is instructed not to include conversation content in source URLs;
its HTTPS requests and any associated records are handled by the AI host.

Local operation of the MCP server does not mean that your conversation or the
AI model runs locally.

## Retention

The server processes tool inputs and source results in memory. It does not
persist tool inputs or answers or maintain content logs or a user database.
Downloaded source data is kept only for the lifetime of the server process.
The plugin adds no separate server or content logging for Claude's direct
retrieval; its conversation and retrieval records follow the AI host's policies.

The AI host and GitHub may retain data under their respective policies. The
plugin does not control those retention periods. Disabling or removing it does
not itself delete records held by those providers.

## Your controls

You can choose not to use the plugin, disable it or remove it through your AI
host. Blocking access to raw.githubusercontent.com prevents a new server
process from loading its sources; an already loaded process keeps its sources
until it ends. There is no offline fallback for a new process. In Claude,
blocking that domain prevents direct source retrieval; unavailable or
incomplete original text must be reported as an access limitation.

Use the privacy, data and deletion controls provided by your AI host and, where
applicable, your workspace administrator and GitHub. Conversations, files, tool
records and saved memories may have separate controls.

The plugin provides no tool for deleting records held by your AI host or
GitHub. Bossle CPA cannot delete those records through the plugin.
