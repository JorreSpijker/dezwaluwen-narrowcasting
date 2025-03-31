'use client'
import Alert from "./components/Alert/Alerts";

export default function HomePage() {
  return (
    <div className="grid grid-cols-2 gap-8 max-w-7xl lg:w-full px-8 lg:mx-auto">
      <div className="col-span-2 lg:col-start-1 lg:w-full lg:max-w-7xl lg:grid-cols-2">
          <Alert label="Let op" content="Ga naar /general om te starten" />
      </div>
    </div>
  );
}
