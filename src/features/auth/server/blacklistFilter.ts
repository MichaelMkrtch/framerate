import {
  collapseDuplicatesTransformer,
  DataSet,
  englishDataset,
  englishRecommendedTransformers,
  pattern,
  RegExpMatcher,
  resolveConfusablesTransformer,
  resolveLeetSpeakTransformer,
  skipNonAlphabeticTransformer,
  toAsciiLowerCaseTransformer,
} from "obscenity";

function hasReservedWord(string: string) {
  return string.toLowerCase().includes("support") ? true : false;
}

export function blacklistFilter(name: string, username: string) {
  const customDataSet = new DataSet<{ originalWord: string }>()
    .addAll(englishDataset)
    .addPhrase((phrase) =>
      phrase
        .setMetadata({ originalWord: "admin" })
        .addPattern(pattern`admin`)
        .addPattern(pattern`admn`)
        .addPattern(pattern`ad min`)
        .addPattern(pattern`adm in`)
        .addPattern(pattern`a dmin`)
        .addPattern(pattern`admi n`),
    )
    .addPhrase((phrase) =>
      phrase
        .setMetadata({ originalWord: "framerate" })
        .addPattern(pattern`framerate`)
        .addPattern(pattern`frame rate`),
    );

  const matcher = new RegExpMatcher({
    ...customDataSet.build(),
    ...englishRecommendedTransformers,
    blacklistMatcherTransformers: [
      collapseDuplicatesTransformer(),
      resolveConfusablesTransformer(),
      resolveLeetSpeakTransformer(),
      skipNonAlphabeticTransformer(),
      toAsciiLowerCaseTransformer(),
    ],
  });

  const nameMatched = matcher.hasMatch(name);
  const nameIsReserved = hasReservedWord(name);
  const usernameMatched = matcher.hasMatch(username);
  const usernameIsReserved = hasReservedWord(username);

  return [
    {
      field: "name",
      hasBlacklistTerm: nameMatched || nameIsReserved,
    },
    {
      field: "username",
      hasBlacklistTerm: usernameMatched || usernameIsReserved,
    },
  ];
}
