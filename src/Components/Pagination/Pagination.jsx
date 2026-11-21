import { shoperyIcons } from "../../data/data";
import "./Pagination.css";

const PreviousIcon = shoperyIcons.previous;
const NextIcon = shoperyIcons.next;

export default function Pagination({ page, pageCount, onChange }) {
  if (pageCount < 2) return null;
  return (
    <nav className="content-pagination">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        <PreviousIcon />
      </button>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map(
        (number) => (
          <button
            type="button"
            key={number}
            data-current={page === number ? "page" : undefined}
            onClick={() => onChange(number)}
          >
            {number}
          </button>
        ),
      )}
      <button
        type="button"
        disabled={page >= pageCount}
        onClick={() => onChange(page + 1)}
      >
        <NextIcon />
      </button>
    </nav>
  );
}
