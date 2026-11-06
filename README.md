# ai-governance-sources

## What it does

Finds provisions, addressees and original wording in the GDPR and EU AI Act sources for general research concerning AI systems and AI governance. A local MCP server retrieves a released source collection from a fixed public GitHub repository over HTTPS, searches its legal texts and curated obligation entries, and retrieves complete provisions with citations and source-version information.

The plugin does not assess individual circumstances, assign legal roles or obligations to the user, review user documents or provide legal or tax advice. Its sources and curated entries have limited coverage and may be outdated.

The source collection covers the GDPR and the EU AI Act. National laws of EU member states and laws of other countries, including US federal and state law, are not included.

## How to use it

Install Node.js 24 LTS before using the plugin. The plugin requires a host that supports its bundled local stdio MCP server. Install and enable the plugin in that host and allow access to its local MCP tools. Internet access to raw.githubusercontent.com is required when the MCP server starts. Restart the server to load a newly released source collection; an already running server keeps its verified source commit.

Ask a general research question concerning AI systems or AI governance. Do not submit personal, confidential or privileged information.

Example questions:

- Which GDPR provisions address the obligations of processors handling personal data for AI systems?
- Which EU AI Act provisions address human oversight?
- What does the GDPR say about data protection by design when developing AI systems?

## Example answer excerpt

Question: What does Article 28(1) GDPR say about a controller's selection of processors, including for processing involving AI systems?

Illustrative excerpt, shortened to one provision. Full answers include the notices described under Notes.

- Provision: Article 28(1) GDPR.
- Addressee: controller.
- Obligation: Use only processors that provide sufficient guarantees to implement appropriate technical and organisational measures.
- Wording: "Where processing is to be carried out on behalf of a controller, the controller shall use only processors providing sufficient guarantees to implement appropriate technical and organisational measures in such a manner that processing will meet the requirements of this Regulation and ensure the protection of the rights of the data subject."
- Source: English consolidated text, 02016R0679-20160504. This consolidated text is a documentation tool; the authentic acts are those published in the Official Journal.
- Original source: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02016R0679-20160504

This excerpt describes the cited provision in general. It does not determine anyone's role or obligations in an individual situation and is not a complete account of the requirements for engaging a processor.

## How it works

The plugin combines instructions and a bundled local MCP server with remotely retrieved legal texts and curated obligation entries.

- `search_sources` searches the included legal texts and curated entries.
- `get_provision` retrieves a complete provision, its citation, source version and any associated curated entries.

The model uses these tools to research the question and retrieve provisions before quoting them. Legal wording and curated analysis remain separate. The curated entries cover selected obligations, not the whole of either law.

If a provision has no curated entry, its legal text can still be quoted with an explicit notice that no curated analysis is available. Missing sources, unavailable language versions and access errors are reported separately.

Answers identify the sources and provisions actually examined. Source-version information describes the retrieved material; it does not establish that the law has been checked for subsequent changes.

## When to use this vs. asking without the plugin

Use this plugin when you want research tied to the included source versions, with provision-level citations, original wording and separately identified curated entries. Its instructions require source retrieval before quotation and explicit reporting of missing material or access errors.

For a broader explanation or a question outside the included sources, the AI host can be used without the plugin. That answer is not constrained to this plugin's source collection and may require other sources.

The plugin does not guarantee a more accurate or complete answer. Both kinds of answer require verification against current authoritative sources; individual decisions require independent professional advice.

## What data it sends

See the [Privacy Policy](PRIVACY.md) for data handling and platform controls.

The local MCP server receives search terms and provision identifiers from the AI host and returns matching source content. At startup it retrieves a release file, source metadata, legal texts and curated entries over HTTPS from raw.githubusercontent.com/wolfgang-bossle/ai-governance-sources. These requests use fixed source paths and do not contain search terms, provision requests, conversation text or answers. GitHub receives connection information such as the requesting IP address and request times; see the Privacy Policy.

The server keeps the verified source collection in memory for its lifetime. It does not persist tool inputs or answers, maintain content logs or send them to Bossle CPA. A failed source download is reported explicitly; there is no fallback to a bundled or previously cached source collection.

Your AI host processes the conversation, tool calls and returned source content under its applicable terms, settings and workspace controls. Local source retrieval does not make the entire AI conversation local.

Do not submit personal, confidential or privileged information. The skill instructs the model to exclude such information from tool inputs and answers; this does not remove it from the conversation.

## Troubleshooting

- A source download fails: check internet access to raw.githubusercontent.com and restart the MCP server after resolving the connection problem.

- The plugin is not used: check that it is enabled in your host and that its local MCP tools are available.
- The MCP server does not start: check that Node.js 24 LTS is installed and accessible to the host.
- A quotation differs from another source: compare the cited version and language. Verify the quotation against the complete retrieved provision and check the current authoritative source.
- No search results: try alternative relevant terms. No results does not mean that no obligation exists.
- No curated analysis: the legal text may still be available; the curated entries cover selected obligations only.
- A source, language version or provision is unavailable: the answer should identify what is missing.
- A source access error occurs: the answer should report the error rather than reconstruct missing content from model knowledge.

## Notes

- Answers are generated by AI. The first substantive answer includes an AI notice and the warning that the plugin and its output are not a substitute for the advice of an attorney.
- The complete disclaimer appears at the end of the first plugin answer in a conversation. Subsequent plugin answers end with a short notice.
- Fixed German notices are used in German conversations; fixed English notices are used in all other conversations.
- The plugin provides general source information, not legal, tax or other professional advice. It does not assess individual circumstances or establish the user's rights, obligations, deadlines or compliance.
- Sources and answers may be incomplete, inaccurate or outdated. Before relying on information, verify it against current authoritative sources and obtain independent advice from a suitably qualified professional.

## License

- Own work (instructions, curated layers, this README): Creative Commons Attribution 4.0 International (CC BY 4.0), © Bossle CPA.
- Legal texts retrieved from the source repository: © European Union, reused under Creative Commons Attribution 4.0 International (CC BY 4.0). Source: EUR-Lex. Changes: split into one file per chapter, with a header and a table of contents added at the top of each file. Only the version published in the Official Journal of the European Union is authentic.

The full terms are in `LICENSE`.

## Contact

Questions, errors in the legal text or the curated layers, and security issues: plugin@bossle.de
