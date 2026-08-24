"use client";

import { useMemo, useState } from "react";
import { Calculator, RotateCcw } from "lucide-react";

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

export default function ProfitCalculator() {
  const [worms, setWorms] = useState(6);
  const [bites, setBites] = useState(18);
  const [digest, setDigest] = useState(70);
  const [value, setValue] = useState(14);
  const [foodCost, setFoodCost] = useState(180);
  const [collection, setCollection] = useState(85);

  const result = useMemo(() => {
    const gross = worms * bites * (digest / 100) * value * (collection / 100);
    const net = gross - foodCost;
    const hourly = net * 60;
    const nextWormGain = bites * (digest / 100) * value * (collection / 100);
    const fivePercentGain = gross * 0.05;
    return { gross, net, hourly, nextWormGain, fivePercentGain };
  }, [worms, bites, digest, value, foodCost, collection]);

  function reset() {
    setWorms(6);
    setBites(18);
    setDigest(70);
    setValue(14);
    setFoodCost(180);
    setCollection(85);
  }

  return (
    <section className="calculator-panel" aria-label="Worm Capitalist profit calculator">
      <div className="calculator-head">
        <div>
          <p className="eyebrow">Guide-side estimator</p>
          <h2>Profit per minute</h2>
          <p>Compare upgrades without pretending the demo formula is final.</p>
        </div>
        <button type="button" onClick={reset} className="icon-button" aria-label="Reset calculator" title="Reset calculator">
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div className="calculator-grid">
        {[
          ["Worms", worms, setWorms, 1, 40, 1],
          ["Bites / min", bites, setBites, 1, 80, 1],
          ["Digestion %", digest, setDigest, 10, 200, 5],
          ["Resource value", value, setValue, 1, 200, 1],
          ["Food cost / min", foodCost, setFoodCost, 0, 2000, 25],
          ["Collection %", collection, setCollection, 10, 100, 5],
        ].map(([label, current, setter, min, max, step]) => (
          <label key={label as string} className="calc-control">
            <span><strong>{label as string}</strong><small>{current as number}</small></span>
            <input type="range" min={min as number} max={max as number} step={step as number} value={current as number} onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))} />
          </label>
        ))}
      </div>

      <div className="calc-results">
        <div><Calculator className="h-5 w-5" /><span>Gross / min</span><strong>{money(result.gross)}</strong></div>
        <div><span>Net / min</span><strong>{money(result.net)}</strong></div>
        <div><span>Net / hour</span><strong>{money(result.hourly)}</strong></div>
      </div>
      <p className="calculator-note">
        Next worm adds about <strong>{money(result.nextWormGain)}</strong> gross per minute. A 5% broad upgrade adds about <strong>{money(result.fivePercentGain)}</strong>.
      </p>
    </section>
  );
}
