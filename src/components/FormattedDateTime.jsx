import { formatDateTime } from '../helpers/formatDateTime';

export function FormattedDateTime({ dateTime }) {
  return (
    <span className="inline-block first-letter:uppercase">
      {formatDateTime(dateTime)}
    </span>
  );
}
