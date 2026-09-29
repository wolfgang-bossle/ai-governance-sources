# ai-governance-sources

## What it does

Finds the provisions of the GDPR and the EU AI Act that apply to a described situation. For each provision it names who is obliged (controller, processor, provider or deployer), states the obligation in plain words and quotes the wording from the EUR-Lex text bundled with the plugin. For the EU AI Act it also states from when each obligation applies.

It works from a description of the situation, given without personal data. It does not review contracts or other documents and does not give legal advice.

## How to use it

Code execution and file creation must be turned on under Settings > Capabilities. On Team and Enterprise plans, an owner turns it on under Organization settings > Capabilities.

Example descriptions:

- We plan to let a model pre-rank job applications before a recruiter looks at them. Is there an assessment we must do first?
- We want to use an external AI service to summarise our customer support emails. What do we have to put in place with the provider before we start?
- We develop an AI tool that our customers use on their employee data. Are we legally obliged to build in data protection by design?

## How it works

The plugin contains two kinds of files:

- Legal text: the GDPR and the EU AI Act in English as consolidated text from EUR-Lex, one file per chapter, plus the recitals and, for the EU AI Act, the annexes. The version is stated at the top of each file. Only the version published in the Official Journal is authentic; recitals are not binding.
- Curated layer: one table per law in `skills/finding-obligations/assets/`, one row per obligation with addressee, provision and cross-reference. Each row records a checksum of the article version it was checked against. The layers cover selected obligations, not the whole of either law.

For a described situation, the matching rows are looked up in the curated layer, the addressee is checked against the role in the situation, and the wording is quoted from the chapter file, character for character. For the EU AI Act, the date from which an obligation applies comes from the point of Article 113 named in the row. Where the bundled sources do not cover a question, the answer says which part is not covered.

## What data it sends

The plugin sends nothing, fetches nothing and stores nothing. It contains no scripts, no hooks and no server, only text files: the instructions, the curated layers and the legal text. To answer, the model reads these bundled files in the code execution environment, for example with `grep`. The plugin does not ask for personal data; if any is given, it is left out of the answer.

## Troubleshooting

- The answer does not use the plugin: code execution and file creation must be on (see How to use it), and the plugin must be turned on under Customize > Plugins.
- A quotation differs from the text on EUR-Lex: the bundled text is the consolidated version stated at the top of each chapter file; a later amendment is not yet included.
- The answer says a part is not covered: the question falls outside the selected obligations in the curated layers.

## Notes

- Answers are produced with AI. The plugin states this at the start of the first answer and at the end of every answer.
- This is not legal advice. An answer should be reviewed by a qualified professional before it is used or passed on.

## License

- Own work (instructions, curated layers, this README): Creative Commons Attribution 4.0 International (CC BY 4.0), © Bossle CPA.
- Legal text in `skills/finding-obligations/references/`: © European Union, reused under Creative Commons Attribution 4.0 International (CC BY 4.0). Source: EUR-Lex. Changes: split into one file per chapter, with a header and a table of contents added at the top of each file. Only the version published in the Official Journal of the European Union is authentic.

The full terms are in `LICENSE`.

## Contact

Questions, errors in the legal text or the curated layers, and security issues: plugin@bossle.de
