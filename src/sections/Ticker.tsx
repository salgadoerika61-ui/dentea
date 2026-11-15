import { ArchMark } from '../components/icons';
import { ticker } from '../content/site';

export function Ticker() {
  const items = [...ticker, ...ticker];
  return (
    <div className="ticker" aria-label="Tratamientos de DENTEA">
      <div className="ticker-track">
        {items.map((t, i) => (
          <span className="ticker-item" key={`${t}-${i}`} aria-hidden={i >= ticker.length}>
            <span className="ticker-mark" aria-hidden="true">
              <ArchMark />
            </span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
