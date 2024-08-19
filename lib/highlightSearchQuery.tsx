export const highlightSearchQuery = (text?: string, query?: string) => {
  if (!query) return text;

  const lowerCaseQuery = query.toLowerCase();
  const lowerCaseText = text?.toLowerCase();

  if (lowerCaseText?.includes(lowerCaseQuery)) {
    const startIndex = lowerCaseText.indexOf(lowerCaseQuery);
    const endIndex = startIndex + query.length;

    const beforeMatch = text?.slice(0, startIndex);
    const match = text?.slice(startIndex, endIndex);
    const afterMatch = text?.slice(endIndex);

    return (
      <>
        {beforeMatch}
        <p className="rounded-md bg-sky-500/50 p-[.4px]">{match}</p>
        {afterMatch}
      </>
    );
  }

  return text;
};
