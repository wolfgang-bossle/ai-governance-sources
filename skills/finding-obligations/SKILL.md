---
name: finding-obligations
description: Finds the GDPR and EU AI Act provisions that apply to a described situation, names who each provision obliges (controller, processor, provider or deployer) and quotes the wording from the EUR-Lex text bundled with the skill. Use when the user describes a plan, product or setup involving personal data or AI systems and asks what they must do, whether an obligation applies to them, or who is responsible, even if they do not mention the GDPR, the AI Act, data protection or privacy. Typical situations: engaging a service provider that handles personal data, evaluating or ranking people with automated means, building software that others use on personal data, developing or using an AI system at work. Does not review contracts or other documents and does not give legal advice.
compatibility: Requires code execution in claude.ai
---

# Finding obligations

## Sources in this skill

- `assets/obligations-gdpr.md`: curated layer for the GDPR, one row per obligation with addressee, provision and cross-reference.
- `assets/obligations-eu-ai-act.md`: curated layer for the EU AI Act, same columns; the cross-reference names the point of Article 113 that sets the application date.
- `references/gdpr/`: GDPR legal text, one file per chapter, table of contents at the top of each file.
- `references/gdpr/recitals.md`: GDPR recitals, Official Journal version, not binding.
- `references/eu-ai-act/`: EU AI Act legal text, one file per chapter, table of contents at the top of each file; annexes in `annexes.md`.
- `references/eu-ai-act/recitals.md`: EU AI Act recitals, Official Journal version, not binding.

## Steps

1. Ask for the situation without personal data, such as names, contact details or identification numbers. If the user gives such data, leave it out of the answer.
2. Find the matching rows in the curated layer of each law.
3. For each row, check the addressee against the user's role in the situation.
4. Find the article in the chapter file with grep, for example `grep -n "^### Article 28:" references/gdpr/*.md`, and read it up to the next heading.
5. For EU AI Act rows, read the point of Article 113 named in the cross-reference and state from when the obligation applies.
6. Quote the wording from the chapter file, character for character.
7. Before answering, check: every quotation matches the chapter file, every provision exists there, every provision has an addressee. Correct any deviation and check again.

## Answer format

For each provision, one block:

- **Provision:** cited as in the Regulation, for example "Article 28(3)" or "point (a) of Article 35(3)"
- **Addressee:** the role named in the curated layer, with the reason in the user's situation
- **Obligation:** in plain words, from the curated layer
- **Wording:** quoted from the chapter file
- **Applies from:** for EU AI Act provisions, with the point of Article 113
- **Cross-reference:** if the row has one

Introduction and summary are free. Cite provisions as in the Regulation throughout the answer, for example "points (a) to (h) of Article 28(3)". Mark own conclusions that go beyond the wording as interpretation. If a recital is cited, state that recitals are not binding. If the bundled sources do not cover a question, say which part is not covered.

Begin the first answer in a conversation with a note that it is produced with AI.

End every answer with: the source (EUR-Lex, consolidated text; only the Official Journal version is authentic; recitals: EUR-Lex, Official Journal version), a note that the answer was produced with AI, and: "This is not legal advice. Have a qualified professional review it before you use or pass it on."
