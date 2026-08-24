import { BriefcaseBusiness, Footprints, Shirt } from "lucide-react";

const rows = [
  { label: "Trait", icon: Shirt, values: ["Friendly", "Talented", "Silly", "Strong", "Cool"] },
  { label: "Movement", icon: Footprints, values: ["Wandering", "Quick", "Flying", "Magnetic"] },
  { label: "Occupation", icon: BriefcaseBusiness, values: ["Ghost", "Engineer", "Musician", "Cleaner", "Salesperson"] },
];

export default function OutfitMatrix() {
  return (
    <div className="outfit-matrix">
      {rows.map((row) => {
        const Icon = row.icon;
        return (
          <div key={row.label} className="outfit-row">
            <div className="outfit-label"><Icon className="h-5 w-5" /><strong>{row.label}</strong></div>
            <div className="outfit-options">{row.values.map((value) => <span key={value}>{value}</span>)}</div>
          </div>
        );
      })}
    </div>
  );
}
