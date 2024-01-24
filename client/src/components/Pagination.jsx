function Pagination({
  totalProperties,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalProperties / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-row justify-center  gap-5  mt-10 text-black">
      {pages.map((page, index) => (
        <div className="items-center w-[40px]" key={index}>
          <button
            type="button"
            className={`p-5 bg-slate-800/35 text-blackp-5 text-black 
             active:border-gray-300   ${page === currentPage
                ? "bg-red-600/50 text-gray-900"
                : "text-white border border-white hover:bg-gray-700 hover:border-gray-700"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Pagination;
