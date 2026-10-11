function Pagination({ page, pageCount, onPage }) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav className="mt-6 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPage(page - 1)}
        disabled={page <= 1}
        className="rounded-lg bg-white px-3 py-2 text-sm text-dark-green disabled:opacity-40"
      >
        Previous
      </button>
      {pages.map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => onPage(number)}
          className={`h-10 w-10 rounded-lg text-sm ${
            number === page ? 'bg-dark-green text-light-green' : 'bg-white text-dark-green'
          }`}
          aria-current={number === page ? 'page' : undefined}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPage(page + 1)}
        disabled={page >= pageCount}
        className="rounded-lg bg-white px-3 py-2 text-sm text-dark-green disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
}

export default Pagination;
